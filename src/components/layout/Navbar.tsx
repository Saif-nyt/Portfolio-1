"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PRIMARY_NAV } from "@/data/navigation";
import { SITE } from "@/config/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Reading window.scrollY inside a scroll handler forces the main thread to
  // flush pending style/layout work on every event of a gesture (~2ms each),
  // which is what makes scrolling feel laggy. A sentinel at the top of the
  // document lets the browser tell us when the threshold is crossed instead.
  useEffect(() => {
    const sentinel = document.querySelector<HTMLElement>("[data-nav-sentinel]");
    if (!sentinel || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Close the menu when the route changes (including history navigation).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-4 sm:pt-5">
        <div className="container-page">
          <div
            className={`pointer-events-auto flex items-center justify-between gap-3 rounded-full border border-line px-2.5 py-2 backdrop-blur-xl transition-all duration-500 sm:px-3 ${
              scrolled
                ? "bg-[color-mix(in_oklab,var(--surface-raised)_88%,transparent)] shadow-[0_18px_40px_-30px_rgba(0,0,0,0.6)]"
                : "bg-[color-mix(in_oklab,var(--surface-raised)_62%,transparent)]"
            }`}
          >
            <Link
              href="/"
              className="group flex items-center gap-2.5 rounded-full py-1 pl-1.5 pr-2"
              aria-label={`${SITE.name} — home`}
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface-2 font-display text-[0.78rem] font-medium tracking-tight text-ink transition-colors duration-300 group-hover:border-accent group-hover:text-accent dark:group-hover:border-bio dark:group-hover:text-bio">
                TS
              </span>
              <span className="hidden font-display text-sm font-medium tracking-tight text-ink sm:block">
                T. M. Saiful Islam
              </span>
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {PRIMARY_NAV.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`relative rounded-full px-3.5 py-2 text-[0.83rem] font-medium transition-colors duration-300 ${
                          active
                            ? "text-ink dark:text-ink"
                            : "text-muted hover:text-ink dark:hover:text-ink"
                        }`}
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-glow transition-transform duration-300 ${
                            active ? "scale-x-100" : "scale-x-0"
                          }`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/contact"
                className="hidden h-10 items-center rounded-full bg-ink px-4 text-[0.8rem] font-medium text-surface transition-colors duration-300 hover:bg-accent-strong dark:bg-bio dark:text-forest dark:hover:bg-bio/85 lg:inline-flex"
              >
                Let&apos;s Work Together
              </Link>
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-accent hover:text-accent lg:hidden dark:hover:border-bio dark:hover:text-bio"
              >
                <span className="relative block h-3.5 w-4">
                  <span
                    className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
                      open ? "top-1.5 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1.5 block h-px w-full bg-current transition-all duration-300 ${
                      open ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
                      open ? "top-1.5 -rotate-45" : "top-3"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        open={open}
        onClose={() => {
          setOpen(false);
          menuButtonRef.current?.focus();
        }}
        currentPath={pathname}
      />
    </>
  );
}
