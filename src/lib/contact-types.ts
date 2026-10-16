import type { ContactFieldErrors, ContactValues } from "@/lib/validation";

export type ContactFormStatus =
  | "idle"
  | "invalid"
  | "spam"
  | "rate-limited"
  | "sent"
  | "unconfigured"
  | "failed";

export interface ContactFormState {
  status: ContactFormStatus;
  message: string;
  fieldErrors: ContactFieldErrors;
  values: ContactValues;
}

export const EMPTY_CONTACT_VALUES: ContactValues = {
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  timeline: "",
  description: "",
};

export const INITIAL_CONTACT_STATE: ContactFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  values: EMPTY_CONTACT_VALUES,
};
