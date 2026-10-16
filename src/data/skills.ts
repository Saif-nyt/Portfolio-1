import type { SkillGroup } from "@/types/skill";

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "development",
    kind: "build",
    title: "Web Development",
    label: "Organism 01",
    summary:
      "Building interfaces and application logic that stay fast, accessible and easy to maintain.",
    items: [
      {
        name: "Full-stack web development",
        detail: "Frontend, API wiring and database work for complete products.",
      },
      { name: "Next.js", detail: "App Router projects with server-first rendering." },
      { name: "React", detail: "Component systems built for reuse and clarity." },
      { name: "JavaScript", detail: "Modern ES modules, async flows and debugging." },
      { name: "HTML & CSS", detail: "Semantic markup and resilient layout systems." },
      { name: "Tailwind CSS", detail: "Token-driven utility styling across projects." },
    ],
  },
  {
    id: "cms",
    kind: "cms",
    title: "CMS & E-commerce",
    label: "Organism 02",
    summary:
      "Storefronts and content platforms shaped around how customers actually browse and buy.",
    items: [
      { name: "WordPress", detail: "100+ websites built, restructured and maintained." },
      { name: "Elementor", detail: "Editor-friendly page building with clean structure." },
      { name: "Shopify", detail: "Store setup, theme work and collection layouts." },
      { name: "E-commerce development", detail: "Product, cart and checkout journeys." },
    ],
  },
  {
    id: "marketing",
    kind: "marketing",
    title: "Marketing",
    label: "Organism 03",
    summary:
      "Campaign structure and landing experiences built around a clear offer and a single next step.",
    items: [
      { name: "Meta Ads", detail: "Campaign builds across prospecting and retargeting." },
      { name: "Campaign setup & optimization", detail: "Structure, budgets and iteration cycles." },
      { name: "Conversion-focused landing pages", detail: "Message hierarchy with one clear action." },
      { name: "Performance marketing fundamentals", detail: "Offer, audience and measurement basics." },
    ],
  },
  {
    id: "tracking",
    kind: "tracking",
    title: "Tracking & Analytics",
    label: "Organism 04",
    summary:
      "Making customer actions visible and trustworthy so decisions rest on real signal.",
    items: [
      { name: "Facebook Conversion API", detail: "Server events paired with browser events." },
      { name: "Server-side tracking", detail: "First-party event collection setups." },
      { name: "GA4", detail: "Event model, key conversions and reporting views." },
      { name: "Pixel & event tracking", detail: "Purchase, lead and funnel event coverage." },
      { name: "Conversion measurement & debugging", detail: "Event testing, deduplication and fixes." },
    ],
  },
];
