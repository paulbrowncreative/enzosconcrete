import { services } from "@/content/services";

/** Shared between the form (client) and the API route (server) so rules never drift. */
export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.name })),
  { value: "other", label: "Something else / not sure yet" },
] as const;

export const contactMethods = [
  { value: "phone", label: "Phone call" },
  { value: "text", label: "Text message" },
  { value: "email", label: "Email" },
] as const;

export type EstimateInput = {
  name: string;
  phone: string;
  email: string;
  service: string;
  city: string;
  details: string;
  contactMethod: string;
};

export type FieldErrors = Partial<Record<keyof EstimateInput, string>>;

export const limits = { name: 100, phone: 30, email: 254, city: 100, details: 3000 } as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalize(raw: Record<string, unknown>): EstimateInput {
  const str = (k: string) => (typeof raw[k] === "string" ? (raw[k] as string).trim() : "");
  return {
    name: str("name"),
    phone: str("phone"),
    email: str("email"),
    service: str("service"),
    city: str("city"),
    details: str("details"),
    contactMethod: str("contactMethod") || "phone",
  };
}

export function validate(input: EstimateInput): FieldErrors {
  const errors: FieldErrors = {};
  if (!input.name) errors.name = "Please enter your name.";
  else if (input.name.length > limits.name) errors.name = "Please shorten your name.";

  const digits = input.phone.replace(/\D/g, "");
  if (!input.phone) errors.phone = "Please enter a phone number so we can reach you.";
  else if (digits.length < 10 || digits.length > 15 || input.phone.length > limits.phone)
    errors.phone = "Please enter a valid phone number, including area code.";

  if (input.email && (!emailPattern.test(input.email) || input.email.length > limits.email))
    errors.email = "Please enter a valid email address, like name@example.com.";
  if (input.contactMethod === "email" && !input.email)
    errors.email = "Add your email address, or choose phone or text as your preferred contact method.";

  if (!serviceOptions.some((o) => o.value === input.service)) errors.service = "Please choose the type of project.";

  if (!input.city) errors.city = "Please tell us the city or township where the project is.";
  else if (input.city.length > limits.city) errors.city = "Please shorten the project location.";

  if (input.details.length > limits.details) errors.details = `Please keep project details under ${limits.details} characters.`;

  if (!contactMethods.some((m) => m.value === input.contactMethod))
    errors.contactMethod = "Please choose how you’d like us to contact you.";

  return errors;
}
