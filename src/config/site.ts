export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const SITE = {
  name: "T. M. Saiful Islam",
  initials: "TMS",
  role: "Full-Stack Web Developer & Digital Growth Specialist",
  positioning:
    "Web development, e-commerce, performance marketing and conversion tracking for businesses that want measurable growth.",
  email: "saifulislamnyt@gmail.com",
  phone: "+8801576483920",
  phoneHref: "+8801576483920",
  phoneDisplay: "+880 1576-483920",
  whatsappUrl:
    "https://wa.me/8801576483920?text=Hey%20bro%2C%20you%20available%20to%20chat",
  whatsappLabel: "Chat with Saiful on WhatsApp",
  experience: "1.5 years",
  experienceDetail: "1.5 years of professional & freelance experience",
  portfolioClaim: "100+ WordPress Websites Completed",
  cvPath: "/cv/t-m-saiful-islam-cv.pdf",
  availability: null as string | null,
  footerLine: "Built with curiosity. Designed with purpose.",
} as const;

/** Static fallback rendered until the client resolves the live year. */
export const BUILD_YEAR = 2026;
