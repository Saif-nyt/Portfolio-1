import fs from "node:fs";
import path from "node:path";

const PAGE_W = 595.28; // A4
const PAGE_H = 841.89;
const MARGIN_X = 56;
const TOP = 64;
const BOTTOM = 60;
const MAX_W = PAGE_W - MARGIN_X * 2;

const F_REG = "F1";
const F_BOLD = "F2";
const F_ITALIC = "F3";

function esc(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function widthOf(text, size) {
  // Approximate Helvetica advance widths.
  let w = 0;
  for (const ch of text) {
    if (ch === " " || ch === "i" || ch === "l" || ch === "I" || ch === "." || ch === "," || ch === ":" || ch === "'" || ch === ";" || ch === "!" || ch === "|") w += 0.28;
    else if (/[fjtrs-]/.test(ch)) w += 0.33;
    else if (/[mwMW]/.test(ch)) w += 0.85;
    else if (ch >= "0" && ch <= "9") w += 0.56;
    else w += 0.53;
  }
  return w * size;
}

function wrap(text, size, maxW) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (widthOf(candidate, size) > maxW && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

const doc = {
  pages: [],
  y: 0,
  current: null,
};

function newPage() {
  doc.current = { ops: [] };
  doc.pages.push(doc.current);
  doc.y = PAGE_H - TOP;
}

function ensure(space) {
  if (!doc.current) newPage();
  if (doc.y - space < BOTTOM) newPage();
}

function text(str, { size = 10, font = F_REG, color = "0.10 0.11 0.10", indent = 0, leading = null, spaceAfter = 0, align = "left" } = {}) {
  const lines = wrap(str, size, MAX_W - indent);
  const step = leading ?? size * 1.45;
  for (const line of lines) {
    ensure(step);
    let x = MARGIN_X + indent;
    if (align === "right") x = PAGE_W - MARGIN_X - widthOf(line, size);
    doc.current.ops.push(
      `BT /${font} ${size} Tf ${color} rg 1 0 0 1 ${x.toFixed(2)} ${doc.y.toFixed(2)} Tm (${esc(line)}) Tj ET`
    );
    doc.y -= step;
  }
  if (spaceAfter) doc.y -= spaceAfter;
}

function rule({ color = "0.77 0.72 0.65", spaceAfter = 14 } = {}) {
  ensure(12);
  doc.current.ops.push(
    `${color} RG 0.8 w ${MARGIN_X} ${doc.y.toFixed(2)} m ${(PAGE_W - MARGIN_X).toFixed(2)} ${doc.y.toFixed(2)} l S`
  );
  doc.y -= spaceAfter;
}

function bullet(str, { size = 9.5, indent = 12 } = {}) {
  const lines = wrap(str, size, MAX_W - indent - 12);
  const step = size * 1.5;
  ensure(step * lines.length);
  // bullet marker
  doc.current.ops.push(
    `0.19 0.74 0.71 rg ${MARGIN_X + 2} ${(doc.y + 2.6).toFixed(2)} 3 3 re f`
  );
  lines.forEach((line) => {
    const x = MARGIN_X + indent + 8;
    doc.current.ops.push(
      `BT /${F_REG} ${size} Tf 0.20 0.23 0.21 rg 1 0 0 1 ${x.toFixed(2)} ${(doc.y).toFixed(2)} Tm (${esc(line)}) Tj ET`
    );
    doc.y -= step;
  });
  doc.y -= 3;
}

function gap(px) {
  ensure(px);
  doc.y -= px;
}

function section(title) {
  ensure(52);
  doc.y -= 8;
  text(title.toUpperCase(), { size: 9, font: F_BOLD, color: "0.07 0.40 0.37", leading: 12 });
  doc.y -= 3;
  rule({ color: "0.77 0.72 0.65", spaceAfter: 12 });
}

// ---------------------------------------------------------------- content

newPage();

// Header block
doc.current.ops.push(
  `0.04 0.06 0.05 rg 0  ${(PAGE_H - 168).toFixed(2)} ${PAGE_W} 168 re f`
);
doc.current.ops.push(
  `0.39 0.91 0.88 RG 0.9 w ${MARGIN_X} ${(PAGE_H - 46).toFixed(2)} m ${MARGIN_X + 46} ${(PAGE_H - 46).toFixed(2)} l S`
);

doc.current.ops.push(
  `BT /${F_BOLD} 27 Tf 0.96 0.98 0.96 rg 1 0 0 1 ${MARGIN_X} ${(PAGE_H - 96).toFixed(2)} Tm (${esc("T. M. SAIFUL ISLAM")}) Tj ET`
);
doc.current.ops.push(
  `BT /${F_REG} 12.5 Tf 0.56 0.85 0.82 rg 1 0 0 1 ${MARGIN_X} ${(PAGE_H - 122).toFixed(2)} Tm (${esc("Full-Stack Web Developer & Digital Growth Specialist")}) Tj ET`
);
doc.current.ops.push(
  `BT /${F_REG} 9.5 Tf 0.72 0.79 0.76 rg 1 0 0 1 ${MARGIN_X} ${(PAGE_H - 148).toFixed(2)} Tm (${esc(
    "saifulislamnyt@gmail.com   |   +880 1576-483920   |   WhatsApp: 8801576483920"
  )}) Tj ET`
);

doc.y = PAGE_H - 168 - 34;

section("Profile");
text(
  "Full-stack web developer and digital growth specialist working across web development, e-commerce, performance marketing and conversion tracking. Focused on building websites and storefronts that look exceptional, work reliably, and can be measured — from the first customer interaction through to the systems that report it.",
  { size: 10, leading: 15.5, spaceAfter: 4 }
);

section("Experience");
text("1.5 years of professional and freelance experience.", {
  size: 10,
  font: F_BOLD,
  leading: 15,
  spaceAfter: 4
});
bullet("100+ WordPress websites completed across business, e-commerce and landing-page projects.");
bullet("Work spanning client-side builds, storefront setup, campaign structure and conversion measurement.");

section("Core Services");
bullet("Full-stack web development — Next.js, React, TypeScript, responsive and performance-focused builds.");
bullet("WordPress development — business sites, e-commerce, landing pages, Elementor, redesigns, speed work.");
bullet("Shopify development — store setup, theme customisation, product and collection layouts, mobile experience.");
bullet("Meta Ads marketing — campaign structure, creative testing plans, pixel and event setup, monitoring.");
bullet("Server-side tracking & Facebook Conversion API — event mapping, deduplication, GA4, validation and debugging.");

section("Tools & Technologies");
text(
  "Next.js · React · JavaScript · TypeScript · HTML & CSS · Tailwind CSS · WordPress · Elementor · Shopify · Meta Pixel · Facebook Conversion API · Server-side tracking · GA4",
  { size: 9.5, leading: 15, spaceAfter: 4 }
);

section("Selected Concept Work");
text(
  "The portfolio includes clearly labelled concept and demonstration projects: a WordPress skincare storefront, a Shopify product store, a Meta Ads and Conversion API tracking architecture, a full-stack business dashboard, a conversion-focused landing page, and an immersive personal portfolio. No client results are claimed for this work.",
  { size: 9.5, leading: 15, spaceAfter: 4 }
);

section("Working Principles");
bullet("Clarity first: structure, copy and interface each answer a question the visitor already has.");
bullet("Practical execution: build what the business needs now, in a shape that can be extended later.");
bullet("Measurement in the plan: tracking requirements are decided before launch, not retrofitted after.");
bullet("Continuous improvement: launch is a checkpoint, not the finish line.");

gap(18);
rule({ color: "0.77 0.72 0.65", spaceAfter: 10 });
text(
  "Generated from verified portfolio profile details only — no education, employment, awards or client results have been added. Replace this file with an official CV at public/cv/t-m-saiful-islam-cv.pdf.",
  { size: 7.6, font: F_ITALIC, color: "0.45 0.47 0.45", leading: 11 }
);

// ---------------------------------------------------------------- assemble

function buildPdf(pages) {
  const objects = [];
  const addObject = (body) => {
    objects.push(body);
    return objects.length; // 1-based object number
  };

  const fontReg = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
  const fontBold = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";
  const fontItalic = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>";

  // object 1: catalog (placeholder, fill later)
  objects.push(null); // 1
  objects.push(null); // 2: pages
  const f1 = addObject(fontReg); // 3
  const f2 = addObject(fontBold); // 4
  const f3 = addObject(fontItalic); // 5

  const pageObjectNumbers = [];
  const contentObjectNumbers = [];

  for (const page of pages) {
    const content = page.ops.join("\n");
    const stream = `<< /Length ${Buffer.byteLength(content, "latin1")} >>\nstream\n${content}\nendstream`;
    contentObjectNumbers.push(addObject(stream));
  }

  const kidsPlaceholder = [];
  for (let i = 0; i < pages.length; i++) {
    const pageNum = addObject("PAGE"); // temporary
    pageObjectNumbers.push(pageNum);
    kidsPlaceholder.push(pageNum);
  }

  // fill page objects
  pageObjectNumbers.forEach((num, i) => {
    objects[num - 1] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
      `/Resources << /Font << /${F_REG} ${f1} 0 R /${F_BOLD} ${f2} 0 R /${F_ITALIC} ${f3} 0 R >> >> ` +
      `/Contents ${contentObjectNumbers[i]} 0 R >>`;
  });

  objects[1] = `<< /Type /Pages /Kids [${kidsPlaceholder.map((n) => `${n} 0 R`).join(" ")}] /Count ${pages.length} >>`;
  objects[0] = "<< /Type /Catalog /Pages 2 0 R /Lang (en) >>";

  let out = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
  const offsets = [0];

  objects.forEach((body, index) => {
    offsets.push(Buffer.byteLength(out, "latin1"));
    out += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xrefStart = Buffer.byteLength(out, "latin1");
  out += `xref\n0 ${objects.length + 1}\n`;
  out += "0000000000 65535 f \n";
  for (let i = 1; i <= objects.length; i++) {
    out += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  out += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

  return Buffer.from(out, "latin1");
}

const outFile = path.join(
  process.cwd(),
  "public",
  "cv",
  "t-m-saiful-islam-cv.pdf"
);
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, buildPdf(doc.pages));
console.log(`Wrote ${outFile} (${doc.pages.length} page(s))`);
