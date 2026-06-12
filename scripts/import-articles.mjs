/**
 * import-articles.mjs
 * Fetches all articles from asunified.com and creates them in Sanity.
 * Run: node scripts/import-articles.mjs
 */

import { createClient } from "@sanity/client";
import * as cheerio from "cheerio";
import https from "node:https";
import { randomUUID } from "node:crypto";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "a6sf0ufw",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-06-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const URLS = [
  "https://asunified.com/news/sport-data-and-the-2030-deadline-what-the-commonwealth-s-global-sdg-impact-report-means-for-commonwealth-governments-2",
  "https://asunified.com/news/afcon-2025-attendance-in-context-how-culture-stadium-dynamics-and-regional-mobility-shaped-the-tournament-2",
  "https://asunified.com/news/africa-is-not-one-market-but-it-is-one-strategic-opportunity",
  "https://asunified.com/news/why-morocco-is-setting-the-benchmark-for-sports-led-economic-development-in-africa",
  "https://asunified.com/news/afcon-2025-apparel-landscape-culture-and-market-trends-2",
  "https://asunified.com/news/afcon-2025-more-than-a-tournament-a-maturing-global-sports-property-2",
  "https://asunified.com/news/fifa-master-where-are-they-now-the-importance-of-staying-connected-and-graduate-employability-3",
  "https://asunified.com/news/as-donor-funding-dries-up-africa-must-build-its-sports-future-not-wait-for-aid-2",
  "https://asunified.com/news/you-can-t-sell-what-no-one-sees-the-commercial-case-for-local-sports-development-in-africa",
  "https://asunified.com/news/introducing-asu-insider-founding-circle-a-strategic-membership-platform-for-african-sport-leaders",
  "https://asunified.com/news/disconnected-ministries-disconnected-outcomes-why-government-silos-are-killing-africa-s-sports-economy-2",
  "https://asunified.com/news/2025-african-sports-market-trends",
  "https://asunified.com/news/the-role-of-sports-tourism-in-revitalising-africa-s-economy-opportunities-for-investment-growth-2",
  "https://asunified.com/news/are-african-athletes-set-to-gain-at-least-5-more-medals-at-the-paris-2024-olympics-due-to-new-rules",
  "https://asunified.com/news/essential-tips-for-founders-seeking-investment-in-african-sports-2",
  "https://asunified.com/news/summary-fifa-professional-football-report-2023",
  "https://asunified.com/news/unveiling-the-triumphs-and-twists-of-the-africa-cup-of-nations-2023",
  "https://asunified.com/news/5-key-takeaways-from-the-2023-africa-cup-of-nations-2",
  "https://asunified.com/news/the-africa-cup-of-nations-2023-a-milestone-in-african-football-and-economic-growth-4",
  "https://asunified.com/news/summary-fifa-forward-global-report-on-development-activities-2016-2022",
  "https://asunified.com/news/how-visitrwanda-campaign-successfully-promotes-rwanda-s-unique-attractions",
  "https://asunified.com/news/women-s-football-landscape-report-2022-2",
  "https://asunified.com/news/why-we-need-to-move-on-from-the-african-potential-conversation-developing-a-sustainable-african-sports-business-ecosystem-2",
  "https://asunified.com/news/how-technology-is-impacting-the-pan-african-sports-space",
  "https://asunified.com/news/the-growth-of-women-in-sports-on-off-the-field",
  "https://asunified.com/news/the-african-nations-championship-chan-spotlight-for-the-domestic-leagues-and-players-9",
  "https://asunified.com/news/brexit-what-impact-would-this-have-on-the-african-sports-market-2",
  "https://asunified.com/news/sports-manufacturing-and-the-africa-continental-free-trade-area-a-mechanism-for-growth",
  "https://asunified.com/news/how-to-plug-the-drain-of-african-talent-from-africa",
  "https://asunified.com/news/the-african-nations-championship-chan-spotlight-for-the-domestic-leagues-and-players",
  "https://asunified.com/news/much-ado-about-the-abl-2",
  "https://asunified.com/news/the-challenges-of-sports-business-in-kenya-2",
];

// ── helpers ────────────────────────────────────────────────────────────────────

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      res.on("error", reject);
    }).on("error", reject);
  });
}

function key() {
  return randomUUID().replace(/-/g, "").slice(0, 12);
}

function textToBlocks(text) {
  if (!text || !text.trim()) return [];
  return [{
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text: text.trim(), marks: [] }],
  }];
}

function headingToBlock(text, level = "h2") {
  if (!text || !text.trim()) return null;
  return {
    _type: "block",
    _key: key(),
    style: level,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text: text.trim(), marks: [] }],
  };
}

function slugify(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 96);
}

function parseDate(raw) {
  if (!raw) return new Date().toISOString();
  // Try to parse common formats
  const d = new Date(raw);
  if (!isNaN(d)) return d.toISOString();
  return new Date().toISOString();
}

function estimateReadTime(blocks) {
  const words = blocks
    .filter(b => b._type === "block")
    .flatMap(b => b.children || [])
    .map(c => c.text || "")
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// ── parse article HTML ─────────────────────────────────────────────────────────

function parseArticle(html, url) {
  const $ = cheerio.load(html);

  // Title — try multiple selectors
  const title =
    $("h1").first().text().trim() ||
    $(".post-title, .article-title, .blog-post-title").first().text().trim() ||
    $("title").text().replace(" | Africa Sports Unified", "").trim();

  // Author — Webflow often puts author in a specific element
  const author =
    $('[class*="author"]').first().text().trim() ||
    $('[class*="writer"]').first().text().trim() ||
    $(".w-author, .post-author").first().text().trim() ||
    "Africa Sports Unified";

  // Date
  const rawDate =
    $("time").attr("datetime") ||
    $("time").first().text().trim() ||
    $('[class*="date"]').first().text().trim() ||
    "";
  const publishedAt = parseDate(rawDate);

  // Slug from URL
  const slug = url.split("/news/")[1]?.replace(/\/$/, "") || slugify(title);

  // Body — Webflow rich text is usually in .w-richtext
  let bodyBlocks = [];
  const richText = $(".w-richtext, [class*='rich-text'], [class*='blog-post-body'], [class*='post-body'], article .content, .post-content, main article").first();

  const container = richText.length ? richText : $("article, main").first();

  container.children().each((_, el) => {
    const tag = el.tagName?.toLowerCase();
    const text = $(el).text().trim();
    if (!text) return;

    if (tag === "h1") {
      // skip — already title
    } else if (tag === "h2") {
      const b = headingToBlock(text, "h2");
      if (b) bodyBlocks.push(b);
    } else if (tag === "h3") {
      const b = headingToBlock(text, "h3");
      if (b) bodyBlocks.push(b);
    } else if (tag === "h4") {
      const b = headingToBlock(text, "h4");
      if (b) bodyBlocks.push(b);
    } else if (tag === "p") {
      bodyBlocks.push(...textToBlocks(text));
    } else if (tag === "ul" || tag === "ol") {
      $(el).find("li").each((_, li) => {
        const liText = $(li).text().trim();
        if (liText) bodyBlocks.push(...textToBlocks("• " + liText));
      });
    } else if (tag === "blockquote") {
      bodyBlocks.push(...textToBlocks(text));
    }
  });

  // Fallback: if we got very little, grab all paragraphs from the page body
  if (bodyBlocks.length < 3) {
    bodyBlocks = [];
    $("p").each((_, el) => {
      const text = $(el).text().trim();
      if (text && text.length > 40) {
        bodyBlocks.push(...textToBlocks(text));
      }
    });
    $("h2, h3").each((_, el) => {
      const text = $(el).text().trim();
      const tag = el.tagName?.toLowerCase();
      if (text && text !== title) {
        const b = headingToBlock(text, tag);
        if (b) bodyBlocks.push(b);
      }
    });
  }

  // Excerpt: first 280 chars of body text
  const firstPara = bodyBlocks.find(b => b.style === "normal")?.children?.[0]?.text || "";
  const excerpt = firstPara.slice(0, 280).replace(/\s+$/, "") + (firstPara.length > 280 ? "…" : "");

  return { title, author, publishedAt, slug, excerpt, bodyBlocks };
}

// ── main ───────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Loading .env.local...");
  const { readFileSync } = await import("node:fs");
  try {
    const env = readFileSync(".env.local", "utf8");
    for (const line of env.split("\n")) {
      const [k, ...v] = line.split("=");
      if (k && v.length && !k.startsWith("#")) {
        process.env[k.trim()] = v.join("=").trim();
      }
    }
    // Re-init client with loaded token
    client.config({ token: process.env.SANITY_API_TOKEN });
  } catch {
    console.log("No .env.local found, using existing env vars");
  }

  // 1. Gather unique authors, create them first
  console.log("\n── Fetching articles ────────────────────────────────");
  const articles = [];

  for (let i = 0; i < URLS.length; i++) {
    const url = URLS[i];
    const slug = url.split("/news/")[1];
    process.stdout.write(`[${i + 1}/${URLS.length}] ${slug.slice(0, 50)}… `);
    try {
      const html = await fetchUrl(url);
      const parsed = parseArticle(html, url);
      articles.push({ ...parsed, url });
      console.log(`✓  "${parsed.title.slice(0, 40)}" by ${parsed.author}`);
    } catch (err) {
      console.log(`✗  ${err.message}`);
    }
    // Small delay to avoid hammering the server
    await new Promise(r => setTimeout(r, 300));
  }

  // 2. Create author documents
  console.log("\n── Creating authors ─────────────────────────────────");
  const authorMap = {};
  const uniqueAuthors = [...new Set(articles.map(a => a.author).filter(Boolean))];

  for (const name of uniqueAuthors) {
    const existing = await client.fetch(`*[_type == "author" && name == $name][0]._id`, { name });
    if (existing) {
      authorMap[name] = existing;
      console.log(`  skip: ${name} (already exists)`);
    } else {
      const doc = await client.create({
        _type: "author",
        name,
        slug: { _type: "slug", current: slugify(name) },
        organisation: "Africa Sports Unified",
      });
      authorMap[name] = doc._id;
      console.log(`  created: ${name} → ${doc._id}`);
    }
  }

  // 3. Create article documents
  console.log("\n── Creating articles ────────────────────────────────");
  let created = 0;
  let skipped = 0;

  for (const art of articles) {
    const existing = await client.fetch(
      `*[_type == "article" && slug.current == $slug][0]._id`,
      { slug: art.slug }
    );
    if (existing) {
      console.log(`  skip: "${art.title.slice(0, 50)}"`);
      skipped++;
      continue;
    }

    const authorId = authorMap[art.author];
    const doc = {
      _type: "article",
      title: art.title,
      slug: { _type: "slug", current: art.slug },
      publishedAt: art.publishedAt,
      excerpt: art.excerpt || art.title,
      body: art.bodyBlocks,
      tierRequired: "public",
      featured: false,
      readTime: estimateReadTime(art.bodyBlocks),
      ...(authorId ? { author: { _type: "reference", _ref: authorId } } : {}),
    };

    try {
      const result = await client.create(doc);
      console.log(`  ✓ "${art.title.slice(0, 50)}" → ${result._id}`);
      created++;
    } catch (err) {
      console.log(`  ✗ "${art.title.slice(0, 50)}": ${err.message}`);
    }
  }

  console.log(`\n── Done ─────────────────────────────────────────────`);
  console.log(`   Articles created: ${created}`);
  console.log(`   Skipped (already exist): ${skipped}`);
  console.log(`   View them at: https://a6sf0ufw.sanity.studio/`);
}

main().catch(console.error);
