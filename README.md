# T. M. Saiful Islam — Portfolio

Immersive personal portfolio and lead-generation site: a cinematic, bioluminescent
"Pandora"-inspired hero environment combined with a warm beige editorial design
system, full light/dark themes, and honest, conversion-focused content.

Built with the Next.js App Router, TypeScript, Tailwind CSS v4 and Motion.

## About

**T. M. Saiful Islam** — Full-Stack Web Developer & Digital Growth Specialist.
1.5 years of professional & freelance experience and 100+ WordPress websites
completed, working across web development, e-commerce, advertising and
conversion tracking. The site doubles as the live CV:
[download the PDF](public/cv/t-m-saiful-islam-cv.pdf) ·
[saifulislamnyt@gmail.com](mailto:saifulislamnyt@gmail.com) ·
[+880 1576-483920](tel:+8801576483920)

## Features

- Cinematic "Pandora" hero — canvas particle field, parallax flora, luminous
  trails and magnetic CTAs, all reduced-motion aware and paused when off-screen
- Full light/dark themes with a no-flash inline script, persisted in
  `localStorage`
- Six case studies (concept/demo work labelled as such) with filters and
  related-project links
- Seven original articles with sticky table of contents and share links
- Contact form validated on the server (honeypot + per-instance rate limit)
  that never fakes success, plus a floating WhatsApp widget
- SEO and accessibility: per-route metadata, social card, sitemap, robots,
  skip link, labelled form errors, real HTTP 404s for unknown slugs

## Stack

| Layer     | Choice                                                     |
| --------- | ---------------------------------------------------------- |
| Framework | Next.js `16.4.2` (App Router, Cache Components, Turbopack) |
| UI        | React `19.3` + TypeScript                                  |
| Styling   | Tailwind CSS v4 (`@theme` design tokens in `globals.css`)  |
| Motion    | `motion` (framer successor) + CSS keyframes + canvas       |
| Icons     | `lucide-react`                                             |
| Fonts     | Space Grotesk, Inter, DM Serif Display (`next/font/google`) |

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit the values
npm run dev                  # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

## Scripts

| Command            | Purpose                              |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Dev server with hot reload           |
| `npm run build`    | Type-check + optimized production build |
| `npm start`        | Serve the production build           |
| `npm run lint`     | ESLint (zero errors, zero warnings)  |
| `node scripts/generate-cv.mjs` | Regenerate `public/cv/*.pdf` from source |

## Environment variables

See [`.env.example`](.env.example).

- `NEXT_PUBLIC_SITE_URL` — absolute origin used for canonical URLs, Open Graph,
  `sitemap.xml`, `robots.txt` and JSON-LD. **Must** be set to the real domain in
  production (default is a placeholder).
- Contact delivery (optional, pick one):
  - `CONTACT_WEBHOOK_URL` — JSON `POST` endpoint; or
  - `RESEND_API_KEY` + `CONTACT_TO_EMAIL` (+ optional `CONTACT_FROM_EMAIL`).

With no provider configured the contact form returns an honest
"could not be sent" state with direct email/WhatsApp links — it never fakes a
successful submission. Delivery is protected by honeypot + per-instance rate
limiting.

## Project structure

```
src/
  app/                  Routes: /, /about, /services, /work, /work/[slug],
                        /insights, /insights/[slug], /contact
                        + sitemap.ts, robots.ts, opengraph-image.tsx,
                          not-found.tsx, error.tsx
  components/
    hero/               Cinematic hero: EnvironmentScene, ParticleField (canvas),
                        FloraBackdrop, CinematicHero
    sections/           Home sections (about, skills, services, process, CTA)
    projects/           Project cards, filters, explorer, case-study layout
    insights/           Article body, table of contents, share links
    contact/            Contact form + floating WhatsApp widget
    layout/             Navbar, MobileMenu, Footer, theme toggle helpers
    artwork/            Original inline-SVG project artwork (no raster assets)
    ui/                 Button, Container, Reveal, MagneticButton, SectionHeading
  config/site.ts        Site identity, contact details, WhatsApp URL, CV path
  proxy.ts              Rejects unknown /work|/insights slugs with a real 404
                        before rendering (see Quality checklist)
  data/                 Editable content: navigation, services, skills,
                        projects, articles
  lib/                  Server action, validation, rate limit, helpers
  types/                Content model types
public/cv/              Real downloadable CV (PDF)
scripts/generate-cv.mjs CV PDF generator (Node, no dependencies)
```

## Editing content

All copy and data live in `src/data/*` and `src/config/site.ts` — no CMS:

- **Projects** — `src/data/projects.ts` (title, slug, summary, role, stack,
  timeline, links, metrics, case-study sections). Artwork is a key into
  `src/components/artwork/ProjectArtwork.tsx`; add a new SVG there for new keys.
  Concept/demo work must stay labeled as such.
- **Articles** — `src/data/articles.ts` (full original markdown-like blocks,
  headings used by the table of contents).
- **Services / skills** — `src/data/services.ts`, `src/data/skills.ts`.
- **Contact details / WhatsApp** — `src/config/site.ts`. The WhatsApp link is
  used verbatim from `SITE.whatsappUrl` in the widget and footer.

## Design system

Tokens are defined in `src/app/globals.css` under `@theme`:

- **Neutrals** — ivory, cream, sand (light), forest, charcoal (dark).
- **Accents** — bio/turquoise (bioluminescent glow), olive, taupe.
- **Semantic** — `--surface`, `--ink`, `--muted`, `--accent`, `--glow` swap with
  the `.dark` class on `<html>`.

Theme is applied by a no-flash inline script in `src/app/layout.tsx`, persisted
to `localStorage.theme`, and toggled through `ThemeToggle` (an external store, so
SSR and client stay in sync without hydration warnings).

Motion follows a single language: slow parallax depth, staggered reveals,
luminous trails and magnetic CTAs. Everything is disabled or reduced under
`prefers-reduced-motion`, and the canvas particle field pauses when off-screen.

## CV

`public/cv/t-m-saiful-islam-cv.pdf` is a real, generated PDF (2 pages, A4).
Regenerate it after editing `scripts/generate-cv.mjs`:

```bash
node scripts/generate-cv.mjs
```

## Quality checklist

- `npm run lint` and `npm run build` both pass (27 static/PPR routes).
- Every route ships its own metadata; `opengraph-image` renders a social card.
- Skip link, landmarks, focus states, `aria-current` nav, labelled form errors.
- Mobile menu: focus returns to the trigger, `Escape` closes, background scroll locked.
- No horizontal overflow at 320px → 2560px.
- Unknown `/work/…` and `/insights/…` slugs return a real HTTP **404** (not a
  streamed soft 404): `src/proxy.ts` rejects them before render, because
  `notFound()` during streaming can only flush `200 + noindex`. Known slugs are
  prerendered `200`.
