import { NextResponse } from "next/server";
import { business } from "@/content/business";
import { contactMethods, normalize, serviceOptions, validate } from "@/lib/estimate";

export const runtime = "nodejs";

const MIN_FILL_MS = 2500; // Humans don't complete the form faster than this.
const MAX_BODY_BYTES = 20_000;

// Best-effort per-instance rate limit. Serverless instances don't share memory,
// so this only blunts bursts; add a shared store (e.g. Upstash) if abuse appears.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ message: "That request was too large." }, { status: 413 });
  }

  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ message: "We couldn’t read that request." }, { status: 400 });
  }

  // Spam checks: silently "succeed" so bots get no signal.
  const startedAt = Number(raw.startedAt);
  if ((typeof raw.company === "string" && raw.company.trim()) || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { message: "We’ve received several requests from you in a short time. Please call us instead." },
      { status: 429 },
    );
  }

  const input = normalize(raw);
  const errors = validate(input);
  if (Object.keys(errors).length) {
    return NextResponse.json({ errors, message: "Please correct the highlighted fields." }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("[estimate] Email delivery is not configured (RESEND_API_KEY, LEAD_TO_EMAIL, LEAD_FROM_EMAIL).");
    return NextResponse.json(
      { message: "Online requests are temporarily unavailable." },
      { status: 503 },
    );
  }

  const serviceLabel = serviceOptions.find((o) => o.value === input.service)?.label ?? input.service;
  const methodLabel = contactMethods.find((m) => m.value === input.contactMethod)?.label ?? input.contactMethod;
  const rows: [string, string][] = [
    ["Name", input.name],
    ["Phone", input.phone],
    ["Email", input.email || "—"],
    ["Preferred contact", methodLabel],
    ["Service", serviceLabel],
    ["Project location", input.city],
    ["Details", input.details || "—"],
  ];

  const text = `New estimate request from ${business.siteUrl}\n\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}`;
  const html = `<h2 style="font-family:sans-serif">New estimate request</h2><table cellpadding="6" style="font-family:sans-serif;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><th align="left" valign="top" style="border-bottom:1px solid #ddd">${k}</th><td style="border-bottom:1px solid #ddd;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        subject: `Estimate request: ${serviceLabel} in ${input.city}`.slice(0, 150),
        text,
        html,
        ...(input.email ? { reply_to: input.email } : {}),
      }),
    });
    if (!res.ok) {
      console.error("[estimate] Resend error", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ message: "We couldn’t send your request just now." }, { status: 502 });
    }
  } catch (err) {
    console.error("[estimate] Delivery failed", err);
    return NextResponse.json({ message: "We couldn’t send your request just now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
