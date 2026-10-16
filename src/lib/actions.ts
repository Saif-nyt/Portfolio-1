"use server";

import { headers } from "next/headers";
import { parseContactForm, type ContactValues } from "@/lib/validation";
import {
  EMPTY_CONTACT_VALUES,
  type ContactFormState,
} from "@/lib/contact-types";

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

/** In-memory only: resets on deploy and is per-instance on serverless. */
const rateLimitStore = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (rateLimitStore.get(key) ?? []).filter(
    (timestamp) => now - timestamp < RATE_WINDOW_MS,
  );

  if (recent.length >= RATE_MAX) {
    rateLimitStore.set(key, recent);
    return true;
  }

  recent.push(now);
  rateLimitStore.set(key, recent);

  if (rateLimitStore.size > 500) {
    for (const [entryKey, timestamps] of rateLimitStore) {
      if (timestamps.every((timestamp) => now - timestamp >= RATE_WINDOW_MS)) {
        rateLimitStore.delete(entryKey);
      }
    }
  }

  return false;
}

async function deliver(
  values: ContactValues,
): Promise<{ ok: true } | { ok: false; reason: "unconfigured" | "error" }> {
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  const payload = {
    name: values.name,
    email: values.email,
    company: values.company,
    service: values.service,
    budget: values.budget,
    timeline: values.timeline,
    description: values.description,
    submittedAt: new Date().toISOString(),
  };

  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) return { ok: false, reason: "error" };
      return { ok: true };
    } catch {
      return { ok: false, reason: "error" };
    }
  }

  if (apiKey && to) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
          reply_to: values.email,
          to: [to],
          subject: `New project enquiry — ${values.service}`,
          text: [
            `Name: ${values.name}`,
            `Email: ${values.email}`,
            `Company / website: ${values.company || "—"}`,
            `Service: ${values.service}`,
            `Budget: ${values.budget || "—"}`,
            `Timeline: ${values.timeline || "—"}`,
            "",
            "Project description:",
            values.description,
          ].join("\n"),
        }),
      });
      if (!response.ok) return { ok: false, reason: "error" };
      return { ok: true };
    } catch {
      return { ok: false, reason: "error" };
    }
  }

  return { ok: false, reason: "unconfigured" };
}

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const { values, errors, honeypot } = parseContactForm(formData);

  if (honeypot) {
    return {
      status: "spam",
      message: "That submission could not be processed. Please try again.",
      fieldErrors: {},
      values: EMPTY_CONTACT_VALUES,
    };
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "invalid",
      message: "Please fix the highlighted fields and send again.",
      fieldErrors: errors,
      values,
    };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return {
      status: "rate-limited",
      message:
        "Several submissions were received from this network recently. Please wait about ten minutes, or email me directly.",
      fieldErrors: {},
      values,
    };
  }

  const result = await deliver(values);

  if (result.ok) {
    return {
      status: "sent",
      message:
        "Thanks — your message has been sent. I normally reply within one business day.",
      fieldErrors: {},
      values: EMPTY_CONTACT_VALUES,
    };
  }

  if (result.reason === "unconfigured") {
    return {
      status: "unconfigured",
      message:
        "This form is fully built and validated, but no delivery provider is configured yet — nothing has been sent. Email or WhatsApp me directly and your message will reach me right away.",
      fieldErrors: {},
      values,
    };
  }

  return {
    status: "failed",
    message:
      "The message could not be delivered just now. Please try again shortly, or email me directly.",
    fieldErrors: {},
    values,
  };
}