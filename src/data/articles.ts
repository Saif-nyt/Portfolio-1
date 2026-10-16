import type { Article } from "@/types/article";

export const ARTICLES: Article[] = [
  {
    slug: "wordpress-vs-shopify",
    title: "WordPress vs. Shopify: Choosing the Right Platform for an E-commerce Business",
    subtitle: "Both can sell products. They fail for different reasons — and the right choice depends on who maintains the store after launch.",
    category: "E-commerce",
    publishedAt: "2026-09-14",
    readingTime: "6 min read",
    excerpt:
      "A practical framework for choosing between WordPress and Shopify based on content needs, team ability, and long-term maintenance rather than feature checklists.",
    related: ["website-speed-and-user-experience", "better-product-page-mobile"],
    blocks: [
      {
        type: "p",
        text: "Platform debates usually start with a feature list, and a feature list is the wrong instrument. WordPress and Shopify can both publish products, take payments, and run a mobile storefront. The useful question is which one will still be easy to operate six months after launch, when the person editing it is not the person who built it.",
      },
      { type: "h2", id: "start-with-content", text: "Start with content, not with products" },
      {
        type: "p",
        text: "If the store is really a content project — guides, editorial pages, category narratives, a publishing calendar — WordPress is the natural home. Content modelling, editorial workflows, and URL structures are mature, and you are not fighting a commerce template to publish an article.",
      },
      {
        type: "p",
        text: "If the store is primarily a catalogue with a marketing layer on top, Shopify's constraints become an advantage. Collections, variants, discount logic, and checkout are handled centrally, and the platform absorbs payment, tax, and security updates on your behalf.",
      },
      { type: "h2", id: "who-maintains-it", text: "Who maintains it after launch?" },
      {
        type: "ul",
        items: [
          "Shopify suits teams with one or two people who will edit products and collections themselves, with no developer in the loop.",
          "WordPress suits teams that already have (or will hire) someone who can manage plugins, hosting, and updates responsibly.",
          "A WordPress store with twelve abandoned plugins is a liability; a Shopify store with a heavily customised theme is the same liability in different clothing.",
        ],
      },
      {
        type: "note",
        title: "The maintenance nobody budgets for",
        text: "Hosting, renewals, plugin licences, theme updates and security patches are real ongoing costs. Price the second year, not just the build.",
      },
      { type: "h2", id: "checkout-and-trust", text: "Checkout, trust, and the cost of customisation" },
      {
        type: "p",
        text: "Shopify's checkout is one of its strongest arguments: consistent, well-tested, and mobile-first. Customising beyond its limits requires Plus or a workaround, which is worth knowing before you design a purchase flow that the platform will not allow.",
      },
      {
        type: "p",
        text: "WordPress with WooCommerce gives you total control over checkout — including every field, hook, and event — and that control is exactly why it needs discipline. Every extension you add is a thing that can break, slow the page, or interfere with tracking.",
      },
      { type: "h2", id: "tracking", text: "Do not forget the measurement layer" },
      {
        type: "p",
        text: "Whichever platform you choose, decide how purchases will be measured before launch. Server-side events and Conversion API setups are easier to configure on a build you control (WordPress), and easier to standardise on a platform with a documented event schema (Shopify). Both are workable; neither is automatic.",
      },
      {
        type: "quote",
        text: "Pick the platform whose boring parts you are willing to own for the next three years.",
      },
      { type: "h2", id: "decision", text: "A simple decision rule" },
      {
        type: "ol",
        items: [
          "Heavy publishing, custom content types, existing WordPress skills → WordPress with WooCommerce.",
          "Catalogue-first, small team, no developer on call, want platform-managed updates → Shopify.",
          "Both matter equally → start on Shopify for speed, and treat a later WordPress content layer as a separate decision rather than a migration you must do now.",
        ],
      },
      {
        type: "p",
        text: "The platform is rarely the hard part. The hard part is agreeing who will run the store, what it has to prove in the first 90 days, and how you will know it is working.",
      },
    ],
  },
  {
    slug: "facebook-conversion-api-deduplication",
    title: "What Facebook Conversion API Does and Why Event Deduplication Matters",
    subtitle: "Browser pixels lose events. Server events recover them — unless the two are counted separately.",
    category: "Tracking",
    publishedAt: "2026-09-21",
    readingTime: "6 min read",
    excerpt:
      "A plain-language explanation of the Conversion API, how browser and server events are matched, and what actually goes wrong when event_id values do not line up.",
    related: ["meta-pixel-tracking-mistakes", "measure-before-scaling"],
    blocks: [
      {
        type: "p",
        text: "The Meta Pixel runs in the browser. It depends on JavaScript executing, cookies being allowed, and the page completing its work before the visitor leaves. When any of those fail — an ad blocker, a slow connection, a redirect that cuts the session short — the event never leaves the device.",
      },
      { type: "h2", id: "what-capi-does", text: "What the Conversion API actually does" },
      {
        type: "p",
        text: "The Facebook Conversion API (CAPI) sends the same events from your server instead of the browser. A purchase happens on your checkout, your server receives the confirmation, and it forwards that event to Meta directly. Nothing depends on the visitor's browser settings.",
      },
      {
        type: "ul",
        items: [
          "It recovers events that browser-side tracking never sees.",
          "It can carry richer parameters, because the data comes from your records rather than the page.",
          "It is not a replacement for the pixel — it is a second source that should describe the same thing.",
        ],
      },
      { type: "h2", id: "deduplication", text: "Now the part everyone misses" },
      {
        type: "p",
        text: "If both the browser and the server report a purchase, and nothing connects them, the platform sees two purchases. Your reported conversions double, your cost per purchase looks halved, and optimisation is fed a number that never existed.",
      },
      {
        type: "p",
        text: "Deduplication is the fix. Both event sends must carry the same event_name and the same event_id — one identifier generated at the moment the action happens and passed to both paths. Meta matches the pair and counts one conversion.",
      },
      {
        type: "note",
        title: "The rule in one line",
        text: "Same event_id, same event_name, sent from browser and server — that is the entire deduplication contract.",
      },
      { type: "h2", id: "what-breaks", text: "What usually breaks it" },
      {
        type: "ol",
        items: [
          "The pixel and the server send different event names — Purchase versus purchase, or InitiateCheckout versus a custom name.",
          "The event_id is generated in the browser but the server invents its own.",
          "The server event is sent on a different page load, so the identifier never matches.",
          "A tag manager change silently removed the parameter after a redesign.",
        ],
      },
      { type: "h2", id: "how-to-verify", text: "How to verify it" },
      {
        type: "p",
        text: "Use Events Manager Test Events. Perform the action once, then check that two events arrive with the same event ID and that the interface reports them as deduplicated. Do this after every checkout, theme, or tag change — deduplication is not a setting you apply once; it is something you maintain.",
      },
      { type: "h2", id: "expectations", text: "What CAPI does not promise" },
      {
        type: "p",
        text: "Better data supports better decisions. It does not automatically improve campaign results, and no configuration guarantees a ROAS. What it guarantees is that the number you are optimising against is closer to the truth.",
      },
      {
        type: "quote",
        text: "Tracking does not create performance. It stops you from optimising against a fiction.",
      },
    ],
  },
  {
    slug: "better-product-page-mobile",
    title: "Building a Better Product Page for Mobile Shoppers",
    subtitle: "Most product pages are designed on a desktop and tolerated on a phone. The order of information is where the money is.",
    category: "E-commerce",
    publishedAt: "2026-09-28",
    readingTime: "5 min read",
    excerpt:
      "A practical structure for mobile product pages: benefit order, image sequence, sticky purchase actions, and the details that should never hide behind hover.",
    related: ["wordpress-vs-shopify", "website-speed-and-user-experience"],
    blocks: [
      {
        type: "p",
        text: "A visitor arriving from a paid social post or a search result is holding the product page in one hand and deciding in seconds. The desktop layout that looks composed — gallery left, details right, tabs underneath — becomes a long scroll where the purchase action disappears halfway down.",
      },
      { type: "h2", id: "order", text: "Fix the order of information first" },
      {
        type: "p",
        text: "Before touching colour or typography, write down what the shopper needs in sequence: what it is, why it is better for them, what it costs, and how to get it. Every element on the page should serve one of those four questions.",
      },
      {
        type: "ol",
        items: [
          "Product name and one-line benefit in the first viewport.",
          "Price visible without scrolling or tapping.",
          "Three to five benefit points before specifications.",
          "Purchase action reachable with one thumb movement.",
        ],
      },
      { type: "h2", id: "gallery", text: "Design the image sequence, not just the gallery" },
      {
        type: "p",
        text: "The first image has one job: show the product clearly in context. Subsequent images should answer objections in order — scale, texture, use case, what is included. Ugly, unordered galleries are one of the most common reasons a page with good traffic still underperforms.",
      },
      {
        type: "note",
        title: "File weight is a design decision",
        text: "Six 3MB images will undo every layout improvement you make. Serve sized, modern formats and lazy-load everything below the first screen.",
      },
      { type: "h2", id: "sticky", text: "Keep the purchase action present" },
      {
        type: "p",
        text: "A sticky purchase bar on mobile — price, variant summary, action — lets the shopper read details without losing the option to buy. It should never cover form fields or cookie controls, and it must not appear twice in the same viewport as another identical button.",
      },
      { type: "h2", id: "hover", text: "Remove hover-only information" },
      {
        type: "ul",
        items: [
          "Variant swatches need text labels, not just colour.",
          "Size guides should open in a modal that closes with the browser back action or an explicit control.",
          "Badges like 'sale' or 'low stock' need a text equivalent for screen readers.",
          "Anything revealed only on desktop hover does not exist on a phone.",
        ],
      },
      { type: "h2", id: "details", text: "Details that reduce returns and support load" },
      {
        type: "p",
        text: "Delivery expectations, return window, what is in the box, and compatibility answers prevent both refunds and support tickets. Placing them near the purchase action — not buried in the footer — is a conversion change and a customer-service change at the same time.",
      },
      { type: "h2", id: "check", text: "A quick page check" },
      {
        type: "ol",
        items: [
          "Open the page at 375px wide. Can you see the product, the price, and the start of the benefits?",
          "Scroll to the bottom. Is there still a way to buy without scrolling back up?",
          "Turn off hover. Is any information missing?",
          "Load it on a throttled connection. Does the first image arrive before the shopper loses interest?",
        ],
      },
      {
        type: "p",
        text: "None of this requires a redesign. It requires deciding what the page is for, and then removing everything that competes with it.",
      },
    ],
  },
  {
    slug: "meta-pixel-tracking-mistakes",
    title: "Common Meta Pixel Tracking Mistakes and How to Debug Them",
    subtitle: "Most 'broken tracking' is actually broken naming, missing parameters, or a duplicate event nobody noticed.",
    category: "Tracking",
    publishedAt: "2026-10-03",
    readingTime: "6 min read",
    excerpt:
      "The five event problems that appear most often in audits, plus a repeatable debugging pass using Test Events before campaigns spend budget.",
    related: ["facebook-conversion-api-deduplication", "measure-before-scaling"],
    blocks: [
      {
        type: "p",
        text: "When conversion numbers look wrong, teams usually blame the algorithm. In practice, the majority of tracking issues found during an audit are structural: an event name that changed, a parameter that stopped being passed, or an event that fires twice.",
      },
      { type: "h2", id: "missing-parameters", text: "1. Events firing without value parameters" },
      {
        type: "p",
        text: "A Purchase event without value and currency is counted as a conversion but cannot be optimised against properly. The same applies to ViewContent without content ids, which quietly degrades product-level reporting.",
      },
      {
        type: "p",
        text: "Debug: open Test Events, perform a purchase, and inspect the incoming parameters. Every key event should carry a stable set of fields — document them once so future changes are visible.",
      },
      { type: "h2", id: "fired-too-often", text: "2. Events that fire too often" },
      {
        type: "p",
        text: "PageView on every route is correct; Purchase on the confirmation page reloading is not. Double-firing commonly comes from a pixel loaded twice — an inline snippet plus a tag manager implementation.",
      },
      {
        type: "note",
        title: "Fast check",
        text: "Search the page source for the pixel ID. Two occurrences in two different scripts is the most common cause of inflated counts.",
      },
      { type: "h2", id: "fired-too-late", text: "3. Events that fire too late — or never" },
      {
        type: "ul",
        items: [
          "Purchase sent on a redirect that the browser cancels.",
          "Lead sent inside an element that fails to render on mobile.",
          "Events attached to a script that loads after the visitor has left.",
        ],
      },
      {
        type: "p",
        text: "Key conversion events belong on the server or on the earliest stable point of the confirmation page, not at the end of a chain of optional components.",
      },
      { type: "h2", id: "inconsistent-names", text: "4. Inconsistent event names" },
      {
        type: "p",
        text: "Purchase, purchase, and CompletePurchase in three different places means three different events in reporting. Choose a naming convention, write it down, and treat any change as a data migration rather than a rename.",
      },
      { type: "h2", id: "no-validation", text: "5. No validation after changes" },
      {
        type: "p",
        text: "Checkout edits, plugin updates, and theme rollouts all move events. If nobody re-tests after a change, the gap is discovered weeks later when reporting looks fine but is quietly incomplete.",
      },
      { type: "h2", id: "debug-pass", text: "A repeatable debug pass" },
      {
        type: "ol",
        items: [
          "Open Events Manager → Test Events and start a session.",
          "Walk the real journey: land, view a product, add to cart, purchase.",
          "Check each event's parameters against your documented list.",
          "Confirm deduplication for any event sent from both browser and server.",
          "Repeat on mobile, where most tracking differences appear.",
          "Save the checklist and run it after every release.",
        ],
      },
      {
        type: "p",
        text: "Debugging is not a heroic activity. It is a checklist you run often enough that problems surface the day they are created, not the month after.",
      },
    ],
  },
  {
    slug: "website-speed-and-user-experience",
    title: "How Website Speed and User Experience Affect E-commerce",
    subtitle: "Speed is not a vanity metric — it sits between your ad spend and your checkout, and it taxes every step in between.",
    category: "Performance",
    publishedAt: "2026-10-07",
    readingTime: "5 min read",
    excerpt:
      "Where load time actually costs e-commerce revenue, which bottlenecks matter most on mobile, and a practical order of fixes for a typical storefront.",
    related: ["better-product-page-mobile", "wordpress-vs-shopify"],
    blocks: [
      {
        type: "p",
        text: "A storefront pays for its speed twice: once in how the page feels, and again in how much of the traffic you already paid for reaches the checkout at all. Every second between an ad click and a usable page is a filter applied to your budget.",
      },
      { type: "h2", id: "where-it-hurts", text: "Where slowness costs the most" },
      {
        type: "ul",
        items: [
          "The landing moment: a hero image that takes a second to appear makes the whole site feel broken before any content is read.",
          "The catalogue: heavy grid pages are the most visited and the most frequently abandoned.",
          "The purchase step: anything that delays the checkout confirmation directly threatens an already-committed buyer.",
        ],
      },
      { type: "h2", id: "mobile", text: "Mobile is the real test" },
      {
        type: "p",
        text: "Desktop masks problems. On a mid-range phone over a normal connection, a 4MB homepage, twelve render-blocking scripts, and unoptimised product images combine into a page that is technically functional and practically unusable.",
      },
      {
        type: "note",
        title: "Measure on a real device",
        text: "Emulation shows layout, not cost. Test on an actual mid-range phone before deciding a page is fast.",
      },
      { type: "h2", id: "order-of-fixes", text: "An order of fixes that works" },
      {
        type: "ol",
        items: [
          "Images: size them for their container, serve modern formats, lazy-load everything below the first viewport.",
          "Fonts: subset what you use and stop loading weights nobody reads.",
          "Scripts: defer everything that is not needed for first paint; audit tag manager containers for tags nobody has looked at in a year.",
          "Theme and plugin weight: a storefront with twenty extensions usually only needs four.",
          "Hosting and caching: full-page caching for catalogue routes, and a CDN close to your actual customers.",
        ],
      },
      { type: "h2", id: "ux-beyond-speed", text: "Experience beyond raw speed" },
      {
        type: "p",
        text: "A page can load quickly and still feel slow if nothing responds to the first tap. Perceived performance comes from immediate feedback: buttons that react, images that hold their space so content does not jump, and skeletons that show where data is arriving.",
      },
      {
        type: "p",
        text: "Layout stability matters more than people expect. Shifting buttons cause mis-taps on mobile, and a mis-tapped purchase action is a lost sale that never appears in your funnel report as an error.",
      },
      { type: "h2", id: "priorities", text: "How to prioritise" },
      {
        type: "p",
        text: "Start with the highest-traffic template that also has the worst experience — usually the product listing or the product page. Fixing one template properly does more for revenue than polishing a rarely visited about page.",
      },
      {
        type: "quote",
        text: "Performance work is conversion work with a different dashboard.",
      },
      {
        type: "p",
        text: "Treat it as an ongoing habit rather than a one-off optimisation sprint: measure after every release, and you will rarely face a rebuild to fix what accumulated quietly.",
      },
    ],
  },
  {
    slug: "measure-before-scaling",
    title: "What to Measure Before Scaling an Advertising Campaign",
    subtitle: "Scaling multiplies whatever is already true — including the gaps in your data.",
    category: "Marketing",
    publishedAt: "2026-10-11",
    readingTime: "6 min read",
    excerpt:
      "The measurement conditions worth confirming before increasing spend: event quality, funnel stages, creative signals, and the questions your dashboard should answer.",
    related: ["facebook-conversion-api-deduplication", "meta-pixel-tracking-mistakes"],
    blocks: [
      {
        type: "p",
        text: "Increasing budget feels like the fastest way to grow, and it is — when the system underneath can absorb it. Scaling a campaign built on incomplete events, untested creative, or an unproven offer usually just buys more of an unclear result.",
      },
      { type: "h2", id: "data-quality", text: "1. Is the data trustworthy at all?" },
      {
        type: "ul",
        items: [
          "Are your key events firing reliably on desktop and mobile?",
          "Are browser and server events deduplicated?",
          "Do purchase events carry value, currency, and content ids?",
          "Do the numbers in the ad platform roughly match your own store records?",
        ],
      },
      {
        type: "p",
        text: "If any answer is 'not sure', that is the first project — not the budget increase.",
      },
      { type: "h2", id: "funnel", text: "2. Which stage actually needs more money?" },
      {
        type: "p",
        text: "A campaign can be limited by reach, by creative fatigue, or by what happens after the click. Scaling reach does nothing for a landing page that loses people at the first form field, and it will not rescue an offer that has not been validated.",
      },
      {
        type: "note",
        title: "Diagnose before you spend",
        text: "Compare click-through, landing behaviour, and completed conversions as three separate questions. The weakest one gets the budget.",
      },
      { type: "h2", id: "creative", text: "3. Do you have creative that earns its keep?" },
      {
        type: "p",
        text: "One winning ad is a fragile system. Before scaling, you want a small set of variations — different hooks, formats, and messages — with enough history to tell which element is doing the work. Scaling a single creative just accelerates fatigue.",
      },
      { type: "h2", id: "unit-economics", text: "4. Do the unit economics hold?" },
      {
        type: "ol",
        items: [
          "What does a customer actually cost across a full week, not a single good day?",
          "What is the realistic first-order margin after fees, shipping, and discounts?",
          "How many purchases does a second order need to change the picture?",
        ],
      },
      {
        type: "p",
        text: "You do not need perfect numbers here. You need numbers you would be willing to defend when a budget decision is questioned.",
      },
      { type: "h2", id: "reporting", text: "5. Can your reporting answer weekly questions?" },
      {
        type: "p",
        text: "A useful dashboard is boring: spend, conversions, cost per conversion, and the same broken down by campaign and creative — consistent definitions, updated on a fixed schedule. If reading the report requires a meeting, the reporting is wrong.",
      },
      { type: "h2", id: "scaling", text: "How to scale responsibly" },
      {
        type: "ul",
        items: [
          "Increase in steps and watch for cost-per-result drift rather than moving everything at once.",
          "Hold creative volume steady while budget changes, so you can tell which change moved the outcome.",
          "Keep one control segment untouched as a reference point.",
          "Re-check event quality after any site release that touches checkout.",
        ],
      },
      {
        type: "p",
        text: "None of this promises a specific return. It makes the return measurable, which is the only honest basis for spending more.",
      },
    ],
  },
  {
    slug: "when-business-needs-nextjs",
    title: "When Does a Business Need a Custom Next.js Website?",
    subtitle: "Most businesses do not. The ones that do usually recognise themselves in three or four of these signs.",
    category: "Development",
    publishedAt: "2026-10-15",
    readingTime: "5 min read",
    excerpt:
      "A candid look at when a custom Next.js build earns its cost — and when a CMS or storefront platform remains the better decision.",
    related: ["wordpress-vs-shopify", "website-speed-and-user-experience"],
    blocks: [
      {
        type: "p",
        text: "A custom build is a commitment: you own the code, the hosting decisions, and every upgrade that follows. For plenty of businesses that is the wrong trade. For others, a template platform quietly costs more in workarounds than a custom build ever would.",
      },
      { type: "h2", id: "signs", text: "Signs a custom build is justified" },
      {
        type: "ul",
        items: [
          "The experience you need does not fit a theme — unusual layouts, interactive tools, configurators, or data-driven pages.",
          "Performance is a competitive requirement and platform overhead is visible in your numbers.",
          "You need a design system that will be extended by a team for years, not a page edited once.",
          "The site is one part of a product: authenticated areas, dashboards, or API integrations.",
          "SEO is central to the business and you need precise control of rendering, metadata, and structured data.",
        ],
      },
      { type: "h2", id: "not-yet", text: "Signs you are not there yet" },
      {
        type: "ol",
        items: [
          "You need a marketing site with under twenty pages and a blog.",
          "The store is a standard catalogue that Shopify handles comfortably.",
          "Nobody on the team will maintain custom code after launch.",
          "The real problem is content or offer strategy — a rebuild will not fix it.",
        ],
      },
      {
        type: "note",
        title: "The maintenance question",
        text: "If the answer to 'who updates this in a year?' is a shrug, choose the platform that a generalist can operate.",
      },
      { type: "h2", id: "what-nextjs-changes", text: "What a Next.js build actually buys you" },
      {
        type: "p",
        text: "Server rendering gives content in the first response rather than after a script bundle, which helps both perceived speed and crawlability. A component system lets a design language be reused across pages instead of redrawn. And the rendering model lets you place dynamic parts precisely instead of choosing between fully static and fully dynamic.",
      },
      {
        type: "p",
        text: "It does not buy you content, offer clarity, or campaign discipline. Those remain the parts only your business can supply.",
      },
      { type: "h2", id: "hybrid", text: "The hybrid option" },
      {
        type: "p",
        text: "You do not have to replace everything. A common, sensible shape is a custom Next.js front-end for the marketing experience, connected to Shopify or WooCommerce for commerce, with a headless CMS for editorial content. You keep the platform's operational strengths and the front-end control you actually needed.",
      },
      { type: "h2", id: "decision", text: "A decision test" },
      {
        type: "ol",
        items: [
          "List the three things your current site cannot do.",
          "Estimate the annual cost of workarounds for each.",
          "Compare that number with the cost of building and maintaining a custom alternative.",
          "If the workarounds win, keep the platform. If they do not, start with one scope — not the whole site.",
        ],
      },
      {
        type: "p",
        text: "The best custom builds start narrow: one template, one journey, one measurable objective, with the architecture chosen so the rest can follow without a rewrite.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

export function getRelatedArticles(slug: string): Article[] {
  const article = getArticle(slug);
  if (!article) return [];
  const related = article.related
    .map((relatedSlug) => getArticle(relatedSlug))
    .filter((item): item is Article => Boolean(item));
  return related;
}

export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
