"use client";

import { useActionState, useState } from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { submitContactForm } from "@/lib/actions";
import {
  INITIAL_CONTACT_STATE,
  type ContactFormState,
} from "@/lib/contact-types";
import {
  BUDGET_OPTIONS,
  SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
  type ContactFieldErrors,
  type ContactValues,
} from "@/lib/validation";
import { SITE } from "@/config/site";

type LocalValues = ContactValues;

const EMPTY: LocalValues = {
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  timeline: "",
  description: "",
};

function validateClient(values: LocalValues): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "That does not look like a valid email address.";
  }
  if (!values.service) {
    errors.service = "Please choose the service you need.";
  }
  if (values.description.trim().length < 20) {
    errors.description =
      "Please describe the project in at least 20 characters so I can respond usefully.";
  }
  return errors;
}

const FIELD_CLASSES =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-[0.92rem] text-ink placeholder:text-muted/70 transition-colors duration-300 focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const ERROR_CLASSES =
  "mt-2 block text-[0.78rem] leading-snug text-[#B4462F] dark:text-[#FF9E8A]";

export function ContactForm() {
  const [values, setValues] = useState<LocalValues>(EMPTY);
  const [clientErrors, setClientErrors] = useState<ContactFieldErrors>({});
  const [state, formAction, pending] = useActionState<ContactFormState, FormData>(
    submitContactForm,
    INITIAL_CONTACT_STATE,
  );

  const errors: ContactFieldErrors = { ...state.fieldErrors, ...clientErrors };
  const isSent = state.status === "sent";

  const update = (field: keyof LocalValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const next = { ...values, [field]: event.target.value };
      setValues(next);
      if (clientErrors[field]) {
        setClientErrors((current) => ({ ...current, [field]: undefined }));
      }
    };

  const handleSubmit = (formData: FormData) => {
    const snapshot: LocalValues = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      service: String(formData.get("service") ?? ""),
      budget: String(formData.get("budget") ?? ""),
      timeline: String(formData.get("timeline") ?? ""),
      description: String(formData.get("description") ?? ""),
    };
    const found = validateClient(snapshot);
    if (Object.keys(found).length > 0) {
      setValues(snapshot);
      setClientErrors(found);
      const firstField = Object.keys(found)[0];
      document.getElementById(`contact-${firstField}`)?.focus();
      return;
    }
    setClientErrors({});
    formAction(formData);
  };

  if (isSent) {
    return (
      <div
        role="status"
        className="rounded-[1.375rem] border border-glow/45 bg-glow/[0.08] p-7 sm:p-9"
      >
        <span className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-accent dark:text-bio">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-glow glow-dot"
          />
          Message sent
        </span>
        <p className="mt-4 font-display text-xl font-medium text-ink sm:text-2xl">
          Thanks — your message is on its way.
        </p>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
          {state.message}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[0.84rem] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {SITE.email}
          </a>
          <button
            type="button"
            onClick={() => {
              setValues(EMPTY);
              setClientErrors({});
              window.location.reload();
            }}
            className="inline-flex h-11 items-center rounded-full px-5 text-[0.84rem] font-medium text-muted transition-colors hover:text-ink"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  const statusMessage =
    state.status === "idle" ? null : state.message || null;

  return (
    <form
      action={handleSubmit}
      noValidate
      aria-labelledby="contact-form-heading"
      className="relative rounded-[1.5rem] border border-line bg-surface-2 p-6 sm:p-8"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2
          id="contact-form-heading"
          className="font-display text-xl font-medium tracking-tight text-ink"
        >
          Project enquiry
        </h2>
        <span className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
          * Required
        </span>
      </div>

      {statusMessage ? (
        <p
          role={state.status === "sent" ? "status" : "alert"}
          className={`mt-5 rounded-xl border p-4 text-[0.87rem] leading-relaxed ${
            state.status === "sent"
              ? "border-glow/45 bg-glow/[0.08] text-ink-soft"
              : state.status === "unconfigured"
                ? "border-line-strong bg-surface p-4 text-ink-soft"
                : "border-[#D9A08F] bg-[#FBEEE9] text-[#8A3A26] dark:border-[#7A4234] dark:bg-[#2A1712] dark:text-[#FFC4B4]"
          }`}
        >
          {state.message}
          {state.status === "unconfigured" ? (
            <span className="mt-3 flex flex-wrap gap-3">
              <a
                href={`mailto:${SITE.email}?subject=${encodeURIComponent(
                  `Project enquiry — ${values.service || "General"}`,
                )}`}
                className="inline-flex h-9 items-center gap-2 rounded-full border border-line-strong px-4 text-[0.8rem] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                Email me instead
              </a>
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-full border border-line-strong px-4 text-[0.8rem] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                WhatsApp
              </a>
            </span>
          ) : null}
        </p>
      ) : null}

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-company_fax">Company fax</label>
        <input
          id="contact-company_fax"
          name="company_fax"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field
          id="contact-name"
          label="Name"
          required
          error={errors.name}
        >
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={values.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={FIELD_CLASSES}
            placeholder="Your name"
          />
        </Field>

        <Field
          id="contact-email"
          label="Email"
          required
          error={errors.email}
        >
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={FIELD_CLASSES}
            placeholder="you@company.com"
          />
        </Field>

        <Field
          id="contact-company"
          label="Company or website"
          hint="Optional"
          error={errors.company}
        >
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={update("company")}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={
              errors.company ? "contact-company-error" : undefined
            }
            className={FIELD_CLASSES}
            placeholder="company.com"
          />
        </Field>

        <Field
          id="contact-service"
          label="Service required"
          required
          error={errors.service}
        >
          <select
            id="contact-service"
            name="service"
            required
            value={values.service}
            onChange={update("service")}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={
              errors.service ? "contact-service-error" : undefined
            }
            className={FIELD_CLASSES}
          >
            <option value="">Choose a service…</option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="contact-budget"
          label="Budget range"
          hint="Optional"
          error={errors.budget}
        >
          <select
            id="contact-budget"
            name="budget"
            value={values.budget}
            onChange={update("budget")}
            aria-invalid={Boolean(errors.budget)}
            aria-describedby={
              errors.budget ? "contact-budget-error" : undefined
            }
            className={FIELD_CLASSES}
          >
            <option value="">Choose a range…</option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="contact-timeline"
          label="Project timeline"
          hint="Optional"
          error={errors.timeline}
        >
          <select
            id="contact-timeline"
            name="timeline"
            value={values.timeline}
            onChange={update("timeline")}
            aria-invalid={Boolean(errors.timeline)}
            aria-describedby={
              errors.timeline ? "contact-timeline-error" : undefined
            }
            className={FIELD_CLASSES}
          >
            <option value="">Choose a timeline…</option>
            {TIMELINE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field
            id="contact-description"
            label="Project description"
            required
            error={errors.description}
          >
            <textarea
              id="contact-description"
              name="description"
              required
              rows={6}
              value={values.description}
              onChange={update("description")}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={
                errors.description
                  ? "contact-description-error contact-description-hint"
                  : "contact-description-hint"
              }
              className={`${FIELD_CLASSES} resize-y`}
              placeholder="What are you building, what isn't working, and where do you want to grow?"
            />
          </Field>
          <span
            id="contact-description-hint"
            className="mt-2 block text-[0.76rem] text-muted"
          >
            {values.description.trim().length}/20 characters minimum
          </span>
        </div>
      </div>

      <p className="mt-6 border-t border-line pt-5 text-[0.78rem] leading-relaxed text-muted">
        Your details are used only to reply to this enquiry. Nothing is added to
        a mailing list and nothing is shared with third parties.
      </p>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full bg-ink px-7 text-[0.9rem] font-medium text-surface transition-all duration-300 hover:bg-accent-strong disabled:pointer-events-none disabled:opacity-60 dark:bg-bio dark:text-forest dark:hover:bg-bio/85"
        >
          {pending ? (
            <>
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              />
              Sending…
            </>
          ) : (
            "Send Message"
          )}
        </button>

        <a
          href={`tel:${SITE.phoneHref}`}
          className="inline-flex items-center gap-2 text-[0.84rem] text-muted transition-colors hover:text-ink"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          {SITE.phoneDisplay}
        </a>
      </div>

      <p aria-live="polite" className="sr-only">
        {pending ? "Sending your message" : ""}
      </p>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

function Field({
  id,
  label,
  required = false,
  hint,
  error,
  children,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-baseline gap-2 text-[0.82rem] font-medium text-ink-soft"
      >
        {label}
        {required ? (
          <span aria-hidden="true" className="text-accent dark:text-bio">
            *
          </span>
        ) : hint ? (
          <span className="text-[0.72rem] font-normal text-muted">{hint}</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <span id={`${id}-error`} className={ERROR_CLASSES}>
          {error}
        </span>
      ) : null}
    </div>
  );
}
