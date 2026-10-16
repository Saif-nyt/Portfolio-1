"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { SITE } from "@/config/site";

const GREETING_KEY = "wa-greeting-dismissed";
const storageListeners = new Set<() => void>();

function subscribe(listener: () => void) {
  storageListeners.add(listener);
  return () => {
    storageListeners.delete(listener);
  };
}

function readDismissed() {
  try {
    return sessionStorage.getItem(GREETING_KEY) === "1";
  } catch {
    // Storage is unavailable (private mode policy) — assume dismissed so the
    // greeting never appears without a way to silence it.
    return true;
  }
}

function writeDismissed() {
  try {
    sessionStorage.setItem(GREETING_KEY, "1");
  } catch {
    /* storage unavailable — dismissal lasts for this render only */
  }
  storageListeners.forEach((listener) => listener());
}

export function WhatsAppWidget() {
  const [showGreeting, setShowGreeting] = useState(false);
  const dismissed = useSyncExternalStore(subscribe, readDismissed, () => false);

  useEffect(() => {
    if (dismissed) return;

    const timer = window.setTimeout(() => setShowGreeting(true), 5200);
    const hideTimer = window.setTimeout(() => setShowGreeting(false), 20000);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(hideTimer);
    };
  }, [dismissed]);

  const dismiss = () => {
    setShowGreeting(false);
    writeDismissed();
  };

  return (
    <div
      className="fixed right-4 z-40 flex flex-col items-end gap-3 sm:right-6"
      style={{ bottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
    >
      {showGreeting && !dismissed ? (
        <div className="relative max-w-[15rem] rounded-2xl rounded-br-md border border-line bg-surface-raised px-4 py-3 shadow-[0_20px_45px_-25px_rgba(0,0,0,0.55)]">
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss greeting"
            className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:text-ink"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <p className="text-[0.8rem] leading-relaxed text-ink-soft">
            Working on a project? I usually reply within a few hours.
          </p>
          <span
            aria-hidden="true"
            className="absolute -bottom-1 right-5 h-3 w-3 rotate-45 border-b border-r border-line bg-surface-raised"
          />
        </div>
      ) : null}

      <a
        href={SITE.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={SITE.whatsappLabel}
        className="widget-enter group relative grid h-14 w-14 place-items-center rounded-full border border-line bg-surface-raised text-forest shadow-[0_18px_40px_-22px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-glow/60 hover:text-accent hover:shadow-[0_0_0_6px_var(--glow-soft),0_18px_40px_-22px_rgba(0,0,0,0.6)] dark:text-bio"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, var(--glow-soft), transparent 70%)",
          }}
        />
        <svg
          viewBox="0 0 24 24"
          className="relative h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 11.6a8.4 8.4 0 0 1-12.5 7.3L3 20.5l1.7-5.3A8.4 8.4 0 1 1 21 11.6Z" />
          <path d="M8.6 9.2c.3 2.4 3.1 5.2 5.5 5.5l1.2-1.2 1.7.8-.4 1.4c-3.8.7-8.2-3.7-7.5-7.5l1.4-.4.8 1.7-1.2 1.2" />
        </svg>
        <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-full border border-line bg-surface-raised px-3 py-1.5 text-[0.72rem] font-medium text-ink opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
