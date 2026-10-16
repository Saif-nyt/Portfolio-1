import type { Service } from "@/types/service";

export const SERVICES: Service[] = [
  {
    slug: "full-stack-web-development",
    title: "Full-Stack Web Development",
    icon: "code",
    description:
      "Modern, responsive web experiences designed for usability, maintainability, and business growth.",
    deliverables: [
      "Frontend implementation",
      "Backend and API integration",
      "Responsive layouts",
      "Performance optimization",
      "Database integration where appropriate",
    ],
  },
  {
    slug: "wordpress-development",
    title: "WordPress Development",
    icon: "layout",
    description:
      "Conversion-focused WordPress websites built around your brand, customers, and business objectives.",
    deliverables: [
      "Business websites",
      "E-commerce websites",
      "Landing pages",
      "Elementor development",
      "Website redesigns",
      "Speed and usability improvements",
    ],
  },
  {
    slug: "shopify-development",
    title: "Shopify Development",
    icon: "bag",
    description:
      "Customer-focused Shopify storefronts designed to make product discovery and purchasing easier.",
    deliverables: [
      "Store setup and customization",
      "Theme customization",
      "Product and collection layouts",
      "Mobile shopping experience",
      "Storefront optimization",
    ],
  },
  {
    slug: "meta-ads-marketing",
    title: "Meta Ads Marketing",
    icon: "target",
    description:
      "Performance-oriented advertising campaigns designed to reach relevant audiences and support measurable business goals.",
    deliverables: [
      "Campaign structure",
      "Creative testing plans",
      "Pixel and event setup",
      "Campaign monitoring",
      "Conversion-focused landing-page recommendations",
    ],
    notes:
      "Advertising outcomes depend on offer, budget, market and creative. Campaign work is measured against agreed checkpoints — no ROAS, revenue or conversion lift is ever promised without evidence.",
  },
  {
    slug: "server-side-tracking",
    title: "Server-Side Tracking & Facebook Conversion API",
    icon: "activity",
    description:
      "Reliable conversion measurement that helps businesses understand customer actions and improve their advertising decisions.",
    deliverables: [
      "Pixel and Conversion API integration",
      "Event mapping and deduplication",
      "Server-side tracking configuration",
      "GA4 integration where appropriate",
      "Event validation and debugging",
    ],
    notes:
      "Tracking improves the quality of measurement. It does not, by itself, guarantee advertising performance — better data supports better decisions, nothing more is implied.",
  },
  {
    slug: "ecommerce-growth",
    title: "E-commerce Growth Solutions",
    icon: "layers",
    description:
      "Connect the storefront, advertising, and tracking infrastructure into a more coherent customer acquisition system.",
    deliverables: [
      "Storefront and funnel review",
      "Advertising structure alignment",
      "Measurement and event audit",
      "Prioritised improvement roadmap",
      "Phased implementation plan",
    ],
    notes:
      "Offered as a combined package for teams that want storefront, ads and measurement connected. Most businesses start with one focused service instead.",
  },
];
