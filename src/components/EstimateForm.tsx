"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { business } from "@/content/business";
import { contactMethods, limits, normalize, serviceOptions, validate, type FieldErrors } from "@/lib/estimate";
import { track } from "@/lib/track";
import { Icon } from "./Icon";

type Status = "idle" | "submitting" | "success" | "error";

const fieldOrder = ["name", "phone", "email", "service", "city", "details", "contactMethod"] as const;

export function EstimateForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef(Date.now());
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverMessage, setServerMessage] = useState("");
  const [service, setService] = useState("");

  // Preselect a service when arriving from a service page (?service=slug).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("service");
    if (requested && serviceOptions.some((o) => o.value === requested)) setService(requested);
    // ...and the city when arriving from a local service-area page (?city=Name).
    const city = params.get("city");
    const cityInput = formRef.current?.elements.namedItem("city");
    if (city && cityInput instanceof HTMLInputElement && !cityInput.value) cityInput.value = city.slice(0, limits.city);
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const input = normalize(data);
    const found = validate(input);
    setErrors(found);
    setServerMessage("");

    if (Object.keys(found).length) {
      setStatus("error");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, company: data.company ?? "", startedAt: startedAt.current }),
      });
      const body = (await res.json().catch(() => ({}))) as { errors?: FieldErrors; message?: string };
      if (res.ok) {
        setStatus("success");
        track("generate_lead", { form: "estimate", service: input.service });
        return;
      }
      if (body.errors) setErrors(body.errors);
      setServerMessage(body.message || "Something went wrong sending your request.");
      setStatus("error");
      requestAnimationFrame(() => summaryRef.current?.focus());
    } catch {
      setServerMessage("We couldn’t reach the server. Please check your connection and try again.");
      setStatus("error");
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" ref={successRef} tabIndex={-1} role="status">
        <span className="form-success__icon" aria-hidden="true">
          <Icon name="check" size={28} />
        </span>
        <h2>Thanks, your request is on its way.</h2>
        <p>
          We’ve received your project details and will be in touch soon. If your project is time-sensitive, call us at{" "}
          <a href={business.phone.href}>{business.phone.display}</a>.
        </p>
        <p>
          While you wait, take a look at <Link href="/our-work">our recent work</Link>.
        </p>
      </div>
    );
  }

  const errorList = fieldOrder.filter((f) => errors[f]);
  const describedBy = (field: keyof FieldErrors, hint?: string) =>
    [hint, errors[field] ? `${field}-error` : undefined].filter(Boolean).join(" ") || undefined;

  return (
    <form ref={formRef} className="estimate-form" noValidate onSubmit={onSubmit} aria-describedby="form-required-note">
      {status === "error" && (errorList.length > 0 || serverMessage) && (
        <div className="form-alert" ref={summaryRef} tabIndex={-1} role="alert">
          <h2 className="form-alert__title">
            {errorList.length ? "Please fix the following:" : "Your request wasn’t sent"}
          </h2>
          {errorList.length > 0 && (
            <ul>
              {errorList.map((f) => (
                <li key={f}>
                  <a href={`#${f === "contactMethod" ? "contactMethod-phone" : f}`}>{errors[f]}</a>
                </li>
              ))}
            </ul>
          )}
          {serverMessage && (
            <p>
              {serverMessage} You can also call us directly at <a href={business.phone.href}>{business.phone.display}</a>.
            </p>
          )}
        </div>
      )}

      <p id="form-required-note" className="form-note">
        Fields marked <span aria-hidden="true">*</span>
        <span className="visually-hidden">with an asterisk</span> are required.
      </p>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={limits.name}
            aria-invalid={!!errors.name || undefined}
            aria-describedby={describedBy("name")}
          />
          {errors.name && <p className="field__error" id="name-error">{errors.name}</p>}
        </div>

        <div className="field">
          <label htmlFor="phone">
            Phone number <span aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            maxLength={limits.phone}
            aria-invalid={!!errors.phone || undefined}
            aria-describedby={describedBy("phone")}
          />
          {errors.phone && <p className="field__error" id="phone-error">{errors.phone}</p>}
        </div>

        <div className="field">
          <label htmlFor="email">
            Email <span className="field__optional">(optional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={limits.email}
            aria-invalid={!!errors.email || undefined}
            aria-describedby={describedBy("email")}
          />
          {errors.email && <p className="field__error" id="email-error">{errors.email}</p>}
        </div>

        <div className="field">
          <label htmlFor="city">
            Project city or township <span aria-hidden="true">*</span>
          </label>
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            required
            maxLength={limits.city}
            aria-invalid={!!errors.city || undefined}
            aria-describedby={describedBy("city", "city-hint")}
          />
          <p className="field__hint" id="city-hint">
            For example: New Haven, Chesterfield Township
          </p>
          {errors.city && <p className="field__error" id="city-error">{errors.city}</p>}
        </div>

        <div className="field field--full">
          <label htmlFor="service">
            Type of project <span aria-hidden="true">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            value={service}
            onChange={(e) => setService(e.target.value)}
            aria-invalid={!!errors.service || undefined}
            aria-describedby={describedBy("service")}
          >
            <option value="" disabled>
              Choose a service
            </option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {errors.service && <p className="field__error" id="service-error">{errors.service}</p>}
        </div>

        <div className="field field--full">
          <label htmlFor="details">
            Project details <span className="field__optional">(optional)</span>
          </label>
          <textarea
            id="details"
            name="details"
            rows={5}
            maxLength={limits.details}
            aria-invalid={!!errors.details || undefined}
            aria-describedby={describedBy("details", "details-hint")}
          />
          <p className="field__hint" id="details-hint">
            Approximate size, the finish you like, removal of existing concrete, and when you’d like it done all help.
          </p>
          {errors.details && <p className="field__error" id="details-error">{errors.details}</p>}
        </div>

        <fieldset
          className="field field--full choice-group"
          aria-describedby={errors.contactMethod ? "contactMethod-error" : undefined}
        >
          <legend>Best way to reach you</legend>
          <div className="choice-group__options">
            {contactMethods.map((m, i) => (
              <label key={m.value} className="choice" htmlFor={`contactMethod-${m.value}`}>
                <input
                  type="radio"
                  id={`contactMethod-${m.value}`}
                  name="contactMethod"
                  value={m.value}
                  defaultChecked={i === 0}
                />
                <span>{m.label}</span>
              </label>
            ))}
          </div>
          {errors.contactMethod && (
            <p className="field__error" id="contactMethod-error">
              {errors.contactMethod}
            </p>
          )}
        </fieldset>

        {/* Honeypot: hidden from people and assistive tech; bots that fill it are dropped server-side. */}
        <div className="hp" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <div className="form-submit">
        <button type="submit" className="btn btn--primary btn--lg" disabled={status === "submitting"} aria-disabled={status === "submitting"}>
          {status === "submitting" ? "Sending your request…" : "Send My Estimate Request"}
          {status !== "submitting" && <Icon name="arrow" size={18} />}
        </button>
        <p className="form-privacy">
          We use your details only to respond to your request. See our <Link href="/privacy-policy">privacy policy</Link>.
        </p>
      </div>
      <p className="visually-hidden" aria-live="polite">
        {status === "submitting" ? "Sending your request" : ""}
      </p>
    </form>
  );
}
