#!/usr/bin/env node
/**
 * Stamp the production domain across every file that hard-codes it.
 *
 *   node scripts/set-site-url.mjs https://omkarganoo.com
 *
 * Absolute URLs are not optional in a few places — a sitemap <loc> MUST be
 * absolute or Search Console rejects the file, and og:url / canonical are read
 * by crawlers that never saw the page's own origin. So the domain is written
 * into the files rather than computed at runtime, and this is how you change
 * it. Run it once when the custom domain is connected.
 *
 * The CURRENT domain is read from index.html's <link rel="canonical">, which is
 * the single source of truth, and replaced as an exact string. That works for
 * any TLD — an earlier version matched a hard-coded list of TLDs and could not
 * find back a domain whose suffix was not on it.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const FILES = [
  "index.html",
  "tools/income-tax-calculator.html",
  "tools/hsn-finder.html",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "AGENTS.md",
  "README.md",
];

const next = (process.argv[2] || "").trim().replace(/\/+$/, "");
if (!/^https?:\/\/[^/\s"']+$/.test(next)) {
  console.error("Usage: node scripts/set-site-url.mjs https://example.com");
  process.exit(1);
}

const indexHtml = readFileSync(join(ROOT, "index.html"), "utf8");
const found = indexHtml.match(/<link rel="canonical" href="(https?:\/\/[^/"]+)/);
if (!found) {
  console.error("Could not find <link rel=\"canonical\"> in index.html — cannot determine the current domain.");
  process.exit(1);
}
const current = found[1];

if (current === next) {
  console.log(`Already set to ${next} — nothing to do.`);
  process.exit(0);
}

let total = 0;
for (const rel of FILES) {
  const path = join(ROOT, rel);
  let src;
  try { src = readFileSync(path, "utf8"); } catch { continue; }

  const hits = src.split(current).length - 1;
  if (!hits) continue;

  writeFileSync(path, src.split(current).join(next));
  console.log(`  ${rel} — ${hits} URL${hits === 1 ? "" : "s"} updated`);
  total += hits;
}

// Refresh sitemap lastmod to the date of the change.
const sm = join(ROOT, "sitemap.xml");
try {
  const today = new Date().toISOString().slice(0, 10);
  writeFileSync(sm, readFileSync(sm, "utf8")
    .replace(/<lastmod>[^<]*<\/lastmod>/g, `<lastmod>${today}</lastmod>`));
} catch {}

console.log(`\n${current}  ->  ${next}   (${total} URLs)`);
