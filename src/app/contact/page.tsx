import { social } from "@/lib/metadata";
import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone, Timer } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { Fireflies } from "@/components/fx/Fireflies";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation about a website, storefront, advertising or tracking project. Email saifulislamnyt@gmail.com, call +8801576483920, or send a project enquiry.",
  alternates: { canonical: "/contact" },
  ...social({
    title: "Contact T. M. Saiful Islam",
    description:
      "Tell me what you're building, what isn't working, or where you want to grow.",
    url: "/contact",
  }),
};

const INCLUDE = [
  "What the business does and who it sells to",
  "What you have today — a site, a store, campaigns, or none of it yet",
  "The single outcome that would make this project worth it",
  "Any deadline you are working towards",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Have Something{" "}
            <span className="font-editorial italic text-accent dark:text-bio">
              Ambitious
            </span>{" "}
            in Mind?
          </>
        }
        intro="Tell me what you're building, what isn't working, or where you want to grow. Let's explore how I can help."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        meta={
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[0.84rem] font-medium text-ink transition-colors hover:border-accent hover:text-accent dark:hover:border-bio dark:hover:text-bio"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email
            </a>
            <a
              href={`tel:${SITE.phoneHref}`}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[0.84rem] font-medium text-ink transition-colors hover:border-accent hover:text-accent dark:hover:border-bio dark:hover:text-bio"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call
            </a>
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[0.84rem] font-medium text-ink transition-colors hover:border-accent hover:text-accent dark:hover:border-bio dark:hover:text-bio"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        }
      />

      <section className="bg-surface py-16 sm:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Reveal>
                <ContactForm />
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.08} className="flex flex-col gap-6">
                <div className="group relative overflow-hidden rounded-[1.375rem] border border-line bg-surface-2 p-6 sm:p-7">
                  <Fireflies count={2} />
                  <p className="eyebrow">Direct contact</p>
                  <ul className="mt-5 space-y-4">
                    <li>
                      <a
                        href={`mailto:${SITE.email}`}
                        className="group flex items-start gap-3.5"
                      >
                        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-accent transition-colors group-hover:border-glow/50 dark:text-bio">
                          <Mail className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-[0.72rem] uppercase tracking-[0.16em] text-muted">
                            Email
                          </span>
                          <span className="mt-1 block break-all text-[0.95rem] text-ink transition-colors group-hover:text-accent dark:group-hover:text-bio">
                            {SITE.email}
                          </span>
                        </span>
                      </a>
                    </li>

                    <li>
                      <a
                        href={`tel:${SITE.phoneHref}`}
                        className="group flex items-start gap-3.5"
                      >
                        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-accent transition-colors group-hover:border-glow/50 dark:text-bio">
                          <Phone className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-[0.72rem] uppercase tracking-[0.16em] text-muted">
                            Phone
                          </span>
                          <span className="mt-1 block text-[0.95rem] text-ink transition-colors group-hover:text-accent dark:group-hover:text-bio">
                            {SITE.phoneDisplay}
                          </span>
                        </span>
                      </a>
                    </li>

                    <li>
                      <a
                        href={SITE.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={SITE.whatsappLabel}
                        className="group flex items-start gap-3.5"
                      >
                        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-accent transition-colors group-hover:border-glow/50 dark:text-bio">
                          <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-[0.72rem] uppercase tracking-[0.16em] text-muted">
                            WhatsApp
                          </span>
                          <span className="mt-1 block text-[0.95rem] text-ink transition-colors group-hover:text-accent dark:group-hover:text-bio">
                            Start a direct chat
                          </span>
                        </span>
                      </a>
                    </li>

                    <li className="flex items-start gap-3.5">
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-accent dark:text-bio">
                        <Timer className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-[0.72rem] uppercase tracking-[0.16em] text-muted">
                          Response time
                        </span>
                        <span className="mt-1 block text-[0.95rem] text-ink">
                          Usually within one business day
                        </span>
                      </span>
                    </li>

                    <li className="flex items-start gap-3.5">
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-accent dark:text-bio">
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-[0.72rem] uppercase tracking-[0.16em] text-muted">
                          Location
                        </span>
                        <span className="mt-1 block text-[0.95rem] text-ink">
                          Bangladesh · working remotely with clients worldwide
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="group relative overflow-hidden rounded-[1.375rem] border border-glow/35 bg-glow/[0.06] p-6 sm:p-7">
                  <Fireflies count={3} />
                  <p className="eyebrow">What to include</p>
                  <ul className="mt-5 space-y-3">
                    {INCLUDE.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[0.9rem] leading-relaxed text-ink-soft"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-glow shadow-[0_0_0_4px_var(--glow-soft)]"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 border-t border-line pt-4 text-[0.8rem] leading-relaxed text-muted">
                    Not sure which service you need? Describe the situation and
                    I&apos;ll suggest the smallest useful starting point — even
                    when that means telling you it is not a project I should
                    take on.
                  </p>
                </div>

                <div className="group relative overflow-hidden rounded-[1.375rem] border border-line bg-surface-2 p-6">
                  <Fireflies count={2} />
                  <p className="text-[0.72rem] uppercase tracking-[0.16em] text-muted">
                    Prefer a quick start?
                  </p>
                  <a
                    href={SITE.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-full bg-ink px-6 text-[0.88rem] font-medium text-surface transition-colors hover:bg-accent-strong dark:bg-bio dark:text-forest"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Chat on WhatsApp
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
