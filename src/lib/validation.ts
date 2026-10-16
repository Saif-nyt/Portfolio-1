export const SERVICE_OPTIONS = [
  "Full-Stack Web Development",
  "WordPress Development",
  "Shopify Development",
  "Meta Ads Marketing",
  "Server-Side Tracking & Facebook Conversion API",
  "E-commerce Growth Solutions",
  "Something else",
] as const;

export const BUDGET_OPTIONS = [
  "Not sure yet",
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000+",
] as const;

export const TIMELINE_OPTIONS = [
  "As soon as possible",
  "Within 2–4 weeks",
  "1–2 months",
  "Exploring options",
] as const;

export interface ContactValues {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  description: string;
}

export type ContactFieldErrors = Partial<Record<keyof ContactValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export function parseContactForm(formData: FormData): {
  values: ContactValues;
  errors: ContactFieldErrors;
  honeypot: string;
} {
  const values: ContactValues = {
    name: clean(formData.get("name")),
    email: clean(formData.get("email")),
    company: clean(formData.get("company")),
    service: clean(formData.get("service")),
    budget: clean(formData.get("budget")),
    timeline: clean(formData.get("timeline")),
    description: clean(formData.get("description")),
  };

  const honeypot = clean(formData.get("company_fax"));

  const errors: ContactFieldErrors = {};

  if (values.name.length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  } else if (values.name.length > 120) {
    errors.name = "That name is too long — please keep it under 120 characters.";
  }

  if (!values.email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "That does not look like a valid email address.";
  } else if (values.email.length > 254) {
    errors.email = "That email address is too long.";
  }

  if (values.company.length > 250) {
    errors.company = "Please keep this under 250 characters.";
  }

  if (!values.service) {
    errors.service = "Please choose the service you need.";
  } else if (!(SERVICE_OPTIONS as readonly string[]).includes(values.service)) {
    errors.service = "Please choose a service from the list.";
  }

  if (values.budget && !(BUDGET_OPTIONS as readonly string[]).includes(values.budget)) {
    errors.budget = "Please choose a budget range from the list.";
  }

  if (
    values.timeline &&
    !(TIMELINE_OPTIONS as readonly string[]).includes(values.timeline)
  ) {
    errors.timeline = "Please choose a timeline from the list.";
  }

  if (values.description.length < 20) {
    errors.description =
      "Please describe the project in at least 20 characters so I can respond usefully.";
  } else if (values.description.length > 4000) {
    errors.description = "That description is too long — please keep it under 4000 characters.";
  }

  return { values, errors, honeypot };
}
