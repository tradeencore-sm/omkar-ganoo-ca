# CA Omkar Ganoo — Professional Website

A fast, static, mobile-first site for **CA Omkar Ganoo**, Chartered Accountant —
Virtual CFO, tax, audit and business advisory.

No build step, no dependencies, no framework: plain HTML, CSS and vanilla
JavaScript, deployed as a static site on Vercel.

## Sections

| Section | Content |
| --- | --- |
| Hero | Name, positioning, credentials bar |
| About | Practice summary, training and industry background |
| Services | Income tax, GST, internal audit, advisory, business development, startup advisory, corporate training |
| Virtual CFO | The five CFO function areas and the hybrid engagement model |
| Experience | Practice · COPA-DATA India · Marathe Padhye & Athalye, plus education |
| Tools | Links to the income tax calculator and HSN/SAC finder |
| Training | Corporate lectures and in-house programmes |
| Contact | Email, phone, LinkedIn and location — static HTML |

## Tools

Two standalone pages, both pure client-side with no backend:

**`/tools/income-tax-calculator`** — FY 2026-27 (AY 2027-28). Compares the new and
old regimes side by side. Handles standard deduction, the Section 87A rebate
*including marginal relief above Rs 12 lakh*, age-based exemption limits under the
old regime, surcharge with marginal relief (capped at 25% in the new regime), and
4% health & education cess.

All rates live in one object — `RATES` at the top of
[`tools/tax-engine.js`](tools/tax-engine.js). When the Finance Act changes, edit
that object and nothing else. The engine is pure functions with no DOM, so it can
be unit-tested directly under node.

**`/tools/hsn-finder`** — 144 common HSN and SAC codes with GST 2.0 rates (the
Nil / 5% / 18% / 40% structure in force since 22 September 2025, when 12% and 28%
were withdrawn). Search by code, description or category; filter by rate.

The dataset is a plain array in [`tools/hsn-data.js`](tools/hsn-data.js) — add or
correct a row there. Every entry is labelled indicative, with a link to the
official GST portal search, because classification depends on packaging, value
thresholds and end use.

## Editing the site

Everything is plain HTML — about copy, services, the Virtual CFO list, the
experience timeline and the contact cards are all edited directly in
[`index.html`](index.html).

**Contact details are deliberately written into the HTML**, not injected by
JavaScript. They used to be rendered at runtime from a `site.config.js` file,
which meant the email address and phone number were absent from the page
source — invisible to every crawler that does not execute JavaScript, which is
most AI crawlers. One nice-to-edit config file is not worth being unreachable.

### Changing the domain

The production domain is written into the canonical tags, `og:url`,
`robots.txt`, `sitemap.xml`, `llms.txt` and `AGENTS.md`. A sitemap `<loc>` must
be absolute or Search Console rejects the file, so this cannot be made
relative. One command updates all of them:

```bash
node scripts/set-site-url.mjs https://omkarganoo.com
```

It reads the current domain from `index.html`'s canonical tag and replaces that
exact string everywhere, leaving third-party URLs (LinkedIn, the GST portal,
Google Fonts) alone.

## Search & AI discoverability

- `robots.txt` names 20 crawlers explicitly, including GPTBot, OAI-SearchBot,
  ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended and
  meta-externalagent, so a future blanket "block bots" rule cannot quietly
  remove answer-engine visibility.
- `llms.txt` — a machine-readable summary of the practice, services, Virtual
  CFO scope, both tools and the citation terms.
- `AGENTS.md` — agent-oriented: what the tools do, the exact shape of
  `TaxEngine` and `HSN_DATA`, and **what the tools do not cover**, so an
  assistant declines rather than guessing.
- JSON-LD on every page: `Person` + `ProfessionalService` (with an eight-item
  service catalogue) + `WebSite` on the home page; `WebApplication` +
  `BreadcrumbList` + `FAQPage` on each tool page.
- Canonical tags, `og:*` and Twitter card metadata, `en-IN` locale, and a
  1200x630 Open Graph image at `assets/og.jpg`.

## Optional additions

- [x] A professional photograph for the hero section — `assets/omkar-ganoo.jpg`
- [ ] ICAI membership number, if it should be displayed
- [ ] A firm name and office address, once the practice has one
- [ ] Client logos or testimonials
- [ ] A downloadable PDF profile

## Local preview

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Deploying to Vercel

This is a static site — no framework preset, no build command.

1. Vercel → **Add New → Project** → import this repository.
2. Framework preset: **Other**. Build command: *(leave empty)*.
   Output directory: *(leave empty / root)*.
3. **Deploy.**

`vercel.json` sets clean URLs, long-lived caching for `/assets`, and basic
security headers.

## Custom domain

Vercel project → **Settings → Domains → Add**, then point the domain's DNS at
Vercel as instructed there.

## Structure

```
index.html             home page — all content + JSON-LD
styles.css             design system + responsive layout
script.js              nav, scroll reveal, sticky header
tools/
  income-tax-calculator.html
  hsn-finder.html
  tax-engine.js        all tax rates live in the RATES object here
  tax-engine.test.js   26 cases — `node tools/tax-engine.test.js`
  hsn-data.js          144 HSN/SAC entries
scripts/
  set-site-url.mjs     stamp the production domain everywhere
assets/                favicon, portrait, 1200x630 OG card
robots.txt             20 crawlers named explicitly
sitemap.xml            absolute URLs
llms.txt               machine-readable practice summary
AGENTS.md              agent-oriented tool manifest
vercel.json            clean URLs, caching, headers, markdown MIME type
```
