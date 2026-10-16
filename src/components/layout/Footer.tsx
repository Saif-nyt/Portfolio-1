import Link from "next/link";
import { FOOTER_NAV } from "@/data/navigation";
import { BUILD_YEAR, SITE } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { CopyrightYear } from "@/components/layout/CopyrightYear";
import { FloraBackdrop } from "@/components/hero/FloraBackdrop";

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-line bg-surface-2">
      <FloraBackdrop className="absolute inset-x-0 bottom-0 h-64 opacity-60" />

      <Container className="relative z-10 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-2xl font-medium tracking-tight text-ink">
              {SITE.name}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              {SITE.role}. Building websites, storefronts, campaigns and
              measurement systems for businesses that want clarity as well as
              growth.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex h-11 items-center rounded-full border border-line-strong px-5 text-[0.82rem] font-medium text-ink transition-colors duration-300 hover:border-accent hover:text-accent dark:hover:border-bio dark:hover:text-bio"
            >
              Discuss Your Project
            </Link>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <p className="eyebrow">Navigate</p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors duration-300 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="eyebrow">Contact</p>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-muted transition-colors duration-300 hover:text-ink"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="text-muted transition-colors duration-300 hover:text-ink"
                >
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors duration-300 hover:text-ink"
                >
                  WhatsApp chat
                </a>
              </li>
              <li>
                <a
                  href={SITE.cvPath}
                  className="text-muted transition-colors duration-300 hover:text-ink"
                >
                  Download CV
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="editorial-rule mt-12" />

        <div className="mt-6 flex flex-col gap-3 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear fallback={BUILD_YEAR} /> {SITE.name}. All rights
            reserved.
          </p>
          <p className="font-editorial italic">{SITE.footerLine}</p>
        </div>
      </Container>
    </footer>
  );
}
