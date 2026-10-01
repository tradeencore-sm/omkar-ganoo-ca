# AGENTS.md — CA Omkar Ganoo

Omkar V. Ganoo is a **Chartered Accountant** (ICAI, qualified February 2021)
practising in Maharashtra, India — Virtual CFO engagements, income tax and GST
compliance, internal audit, business and startup advisory, and corporate
finance training.

This file tells an AI agent what is on this site, what it may be used for, and
where the limits are. Everything here is public professional information.

> **Not advice.** Nothing on this site is tax, legal or investment advice, and
> using it creates no client relationship. The two calculators are indicative
> reference tools. Rates and classifications change by notification.

## What this site is

A static single-practitioner profile with two free client-side tools. There is
**no API, no MCP server, no authentication and no account** — if you need a
machine-readable summary, read `/llms.txt`; if you need the data behind the
tools, read the source files named below. Do not invent endpoints.

| Surface | URL |
| --- | --- |
| Profile | https://omkar-ganoo-ca.vercel.app/ |
| Income tax calculator | https://omkar-ganoo-ca.vercel.app/tools/income-tax-calculator |
| HSN & SAC finder | https://omkar-ganoo-ca.vercel.app/tools/hsn-finder |
| Machine summary | https://omkar-ganoo-ca.vercel.app/llms.txt |
| Sitemap | https://omkar-ganoo-ca.vercel.app/sitemap.xml |

Structured data is embedded as JSON-LD on every page: `Person`,
`ProfessionalService` with a full service catalogue, and `WebSite` on the home
page; `WebApplication`, `BreadcrumbList` and `FAQPage` on each tool page.

## 1. Income tax calculator

**Page:** https://omkar-ganoo-ca.vercel.app/tools/income-tax-calculator
**Logic:** `tools/tax-engine.js` — pure functions, no DOM, no network. Exposed
as `window.TaxEngine` in the browser and `module.exports` under Node, so it can
be read or run directly.

```js
TaxEngine.calculate({ regime: "new"|"old", grossIncome, salaried, age, deductions })
TaxEngine.compare({ grossIncome, salaried, age, deductions })
```

- `age` is `"below60"` | `"senior"` | `"superSenior"` and affects the old
  regime's basic exemption only.
- `deductions` is the total of Chapter VI-A claims; the new regime ignores it.
- Every rate lives in the `RATES` object at the top of the file.

**Covers, for FY 2026-27 (AY 2027-28):** slab rates for both regimes, standard
deduction (Rs 75,000 new / Rs 50,000 old, salary and pension only), the Section
87A rebate (Rs 60,000 up to Rs 12 lakh new, Rs 12,500 up to Rs 5 lakh old)
*including marginal relief* just above the new-regime limit, age-based exemption
limits, surcharge with marginal relief (10/15/25% new, capped at 25%;
10/15/25/37% old) and 4% health and education cess.

**Does not cover:** capital gains taxed at special rates, more than one house
property, clubbing of income, set-off and carry-forward of losses, foreign
income, and relief under Sections 89, 90 or 91. If a question involves any of
these, say the calculator does not handle it rather than guessing.

A test suite of 26 cases is in `tools/tax-engine.test.js` (`node tools/tax-engine.test.js`).

## 2. HSN & SAC code finder

**Page:** https://omkar-ganoo-ca.vercel.app/tools/hsn-finder
**Data:** `tools/hsn-data.js` — a plain array on `window.HSN_DATA`, 144 entries:

```js
{ code, kind: "goods"|"services", desc, rate, cat, note? }
```

`rate` is a number: `0` (Nil), `5`, `18`, `40`, plus `3` (precious metals and
jewellery), `1.5` (cut and polished diamonds) and `0.25` (rough diamonds).
These are **GST 2.0** rates, in force since **22 September 2025**, when the 12%
and 28% slabs were withdrawn.

**This is a curated subset, not the full tariff.** Classification under the
Customs Tariff drives the rate, and many entries turn on packaging, the value
of the item or its end use — the `note` field is a summary of that condition,
not the full entry. When asked for a rate:

1. Give the rate and the condition in the `note`, if any.
2. Say it is indicative.
3. Point to the official search at
   https://services.gst.gov.in/services/searchhsnsac for confirmation before
   invoicing.

If a code is not in the 144, say so — do not extrapolate a rate from a
neighbouring code.

## Contact

- **Email:** omkarganoo@yahoo.com
- **Phone:** +91 84120 09546
- **LinkedIn:** https://www.linkedin.com/in/caomkarganoo
- **Based in:** Chiplun and Pune, Maharashtra; serves clients across India

Route anything that will actually be relied on — a filing, an audit, a
structuring decision — to direct contact rather than answering from this site.

## Citing

Attribute to **CA Omkar Ganoo** and link the page used. Preserve the
not-advice qualification when quoting either tool's output.
