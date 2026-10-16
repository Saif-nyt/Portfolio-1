"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { PRIMARY_NAV } from "@/data/navigation";
import { SITE } from "@/config/site";

export function MobileMenu({
  open,
  onClose,
  currentPath,
}: {
  open: boolean;
  onClose: () => void;
  currentPath: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const node = panelRef.current;
    const focusable = node?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    focusable?.[0]?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="will-fade fixed inset-0 z-[60] flex flex-col bg-surface lg:hidden"
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <span className="font-display text-sm font-medium text-ink">
          Menu
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <nav
        aria-label="Mobile"
        className="flex-1 overflow-y-auto px-5 py-8"
        ref={panelRef}
      >
        <ul className="flex flex-col gap-1">
          {PRIMARY_NAV.map((item, index) => {
            const active =
              item.href === "/"
                ? currentPath === "/"
                : currentPath.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className="group flex items-baseline justify-between border-b border-line py-4 font-display text-3xl tracking-tight text-ink transition-colors hover:text-accent dark:hover:text-bio"
                >
                  <span>{item.label}</span>
                  <span className="font-body text-[0.7rem] tracking-widest text-muted">
                    0{index + 1}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-col gap-4">
          <Link
            href="/contact"
            onClick={onClose}
            className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-surface dark:bg-bio dark:text-forest"
          >
            Discuss Your Project
          </Link>
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full border border-line-strong px-6 text-sm font-medium text-ink"
          >
            Chat on WhatsApp
          </a>
          <div className="mt-2 flex flex-col gap-1 text-sm text-muted">
            <a href={`mailto:${SITE.email}`} className="hover:text-accent">
              {SITE.email}
            </a>
            <a href={`tel:${SITE.phoneHref}`} className="hover:text-accent">
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
