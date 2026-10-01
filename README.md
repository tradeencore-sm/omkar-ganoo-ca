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
| Contact | Rendered from `site.config.js` |

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

**All contact details live in one file: [`site.config.js`](site.config.js).**

```js
window.SITE = {
  email:    "omkarganoo@yahoo.com",
  phone:    "+91 84120 09546",
  city:     "Chiplun & Pune, Maharashtra",
  linkedin: "https://www.linkedin.com/in/caomkarganoo",
  address:  "",   // full postal address — blank = show "Based in" city instead
};
```

Any value left as an empty string is **not rendered** — no blank cards, no
placeholder text. The full postal address is deliberately left blank, since the
address on the CV is residential; fill it in to publish an office address.

Everything else — about copy, services, Virtual CFO list, experience timeline —
is plain HTML in [`index.html`](index.html) and can be edited directly.

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
index.html        single page — all content + schema.org Person markup
styles.css        design system + responsive layout
script.js         nav, scroll reveal, contact rendering
site.config.js    ← contact details live here
assets/           favicon + Open Graph share image
vercel.json       headers, clean URLs
robots.txt        crawlable
sitemap.xml
```
