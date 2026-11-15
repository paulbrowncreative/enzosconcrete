import { NextResponse } from "next/server";
import { business } from "@/content/business";
import { contactMethods, normalize, serviceOptions, validate, type EstimateInput } from "@/lib/estimate";

export const runtime = "nodejs";

const MIN_FILL_MS = 2500; // Humans don't complete the form faster than this.
const MAX_BODY_BYTES = 20_000;
const RESEND_URL = process.env.RESEND_API_URL || "https://api.resend.com/emails";
/**
 * Resend's shared test sender. It needs no domain verification, but Resend only delivers it to the
 * address that owns the Resend account, so create that account with the lead inbox (business.email).
 * Set LEAD_FROM_EMAIL to an address on a verified domain to send from your own domain instead.
 */
const DEFAULT_FROM = "Enzo's Concrete Website <onboarding@resend.dev>";

/** Delivery settings. Only RESEND_API_KEY is required; the rest fall back to sensible defaults. */
function emailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = (process.env.LEAD_TO_EMAIL || business.email)
    .split(",")
    // Lowercased: Resend matches its test sender's recipient against the account email exactly.
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const from = process.env.LEAD_FROM_EMAIL?.trim() || DEFAULT_FROM;
  return { apiKey, to, from };
}

// Best-effort per-instance rate limit. Serverless instances don't share memory,
// so this only blunts bursts; add a shared store (e.g. Upstash) if abuse appears.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded on long-lived instances
  return recent.length > 5;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Strips CR/LF and trims, for values that end up in email headers (subject). */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

function buildEmail(input: EstimateInput, page: string) {
  const serviceLabel = serviceOptions.find((o) => o.value === input.service)?.label ?? input.service;
  const methodLabel = contactMethods.find((m) => m.value === input.contactMethod)?.label ?? input.contactMethod;
  const digits = input.phone.replace(/[^\d+]/g, "");
  const received = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Detroit",
  }).format(new Date());

  const rows: [label: string, text: string, html?: string][] = [
    ["Name", input.name],
    ["Phone", input.phone, `<a href="tel:${escapeHtml(digits)}">${escapeHtml(input.phone)}</a> · <a href="sms:${escapeHtml(digits)}">Text</a>`],
    ["Email", input.email || "Not provided", input.email ? `<a href="mailto:${escapeHtml(input.email)}">${escapeHtml(input.email)}</a>` : undefined],
    ["Preferred contact", methodLabel],
    ["Project", serviceLabel],
    ["Location", input.city],
    ["Details", input.details || "None provided"],
    ["Received", received],
    ["Sent from", `${business.siteUrl}${page}`],
  ];

  const replyHint = input.email
    ? `Reply to this email to respond to ${input.name}.`
    : `${input.name} didn't leave an email address. Call or text ${input.phone}.`;

  const subject = oneLine(`New estimate request: ${serviceLabel} in ${input.city} (${input.name})`).slice(0, 150);
  const text = [
    `New estimate request from the website`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    replyHint,
  ].join("\n");
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#151515;max-width:600px">
<h2 style="margin:0 0 4px;font-size:20px">New estimate request</h2>
<p style="margin:0 0 16px;color:#555">From the ${escapeHtml(business.shortName)} website</p>
<table cellpadding="8" style="border-collapse:collapse;width:100%">${rows
    .map(
      ([k, v, h]) =>
        `<tr><th align="left" valign="top" style="border-bottom:1px solid #e3e3e3;width:140px;color:#555;font-weight:600">${k}</th><td style="border-bottom:1px solid #e3e3e3;white-space:pre-wrap">${h ?? escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>
<p style="margin:16px 0 0;color:#555">${escapeHtml(replyHint)}</p>
</div>`;

  return { subject, text, html, serviceSlug: input.service };
}

/** Sends through Resend, retrying once on rate limits, server errors and network failures. */
async function send(payload: Record<string, unknown>, apiKey: string, idempotencyKey: string) {
  let last = "";
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(RESEND_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000),
      });
      if (res.ok) {
        const body = (await res.json().catch(() => ({}))) as { id?: string };
        return { ok: true as const, id: body.id };
      }
      last = `${res.status} ${await res.text().catch(() => "")}`.slice(0, 500);
      if (res.status !== 429 && res.status < 500) break; // config problem (bad key, unverified sender): don't retry
    } catch (err) {
      last = String(err);
    }
    if (attempt < 2) await new Promise((r) => setTimeout(r, 800));
  }
  return { ok: false as const, error: last };
}

/** Deployment check: reports whether delivery is configured, without revealing any values. */
export async function GET() {
  const { apiKey, to, from } = emailConfig();
  return NextResponse.json(
    {
      configured: Boolean(apiKey && to.length),
      sender: from === DEFAULT_FROM ? "resend-test-sender" : "custom",
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ message: "That request was too large." }, { status: 413 });
  }

  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
    if (!raw || typeof raw !== "object") throw new Error("not an object");
  } catch {
    return NextResponse.json({ message: "We couldn’t read that request." }, { status: 400 });
  }

  // Spam checks: silently "succeed" so bots get no signal.
  const startedAt = Number(raw.startedAt);
  if ((typeof raw.company === "string" && raw.company.trim()) || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-nf-client-connection-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
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

  const { apiKey, to, from } = emailConfig();
  if (!apiKey || !to.length) {
    console.error("[estimate] Email delivery is not configured: set RESEND_API_KEY.");
    return NextResponse.json({ message: "Online requests are temporarily unavailable." }, { status: 503 });
  }

  const page = typeof raw.page === "string" && /^\/[\w\-/]{0,200}$/.test(raw.page) ? raw.page : "/contact";
  const submissionId =
    typeof raw.submissionId === "string" && /^[\w-]{8,100}$/.test(raw.submissionId)
      ? raw.submissionId
      : crypto.randomUUID();

  const email = buildEmail(input, page);
  const result = await send(
    {
      from,
      to,
      subject: email.subject,
      text: email.text,
      html: email.html,
      ...(input.email ? { reply_to: input.email } : {}),
      tags: [
        { name: "source", value: "website_estimate_form" },
        { name: "service", value: email.serviceSlug.replace(/[^\w-]/g, "_").slice(0, 60) },
      ],
    },
    apiKey,
    `estimate-${submissionId}`,
  );

  if (!result.ok) {
    console.error("[estimate] Resend delivery failed:", result.error);
    return NextResponse.json({ message: "We couldn’t send your request just now." }, { status: 502 });
  }

  console.info("[estimate] Lead delivered", { id: result.id });
  return NextResponse.json({ ok: true });
}
