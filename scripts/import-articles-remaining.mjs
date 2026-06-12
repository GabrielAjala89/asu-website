/**
 * import-articles-remaining.mjs
 * Imports the 12 older articles that blocked Node https — uses curl instead.
 */

import { createClient } from "@sanity/client";
import * as cheerio from "cheerio";
import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";

// Load env
const env = readFileSync(".env.local", "utf8");
for (const line of env.split("\n")) {
  const [k, ...v] = line.split("=");
  if (k && v.length && !k.startsWith("#")) process.env[k.trim()] = v.join("=").trim();
}

const client = createClient({
  projectId: "a6sf0ufw",
  dataset: "production",
  apiVersion: "2024-06-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const REMAINING = [
  { url: "https://asunified.com/news/how-visitrwanda-campaign-successfully-promotes-rwanda-s-unique-attractions", slug: "how-visitrwanda-campaign-successfully-promotes-rwanda-s-unique-attractions" },
  { url: "https://asunified.com/news/women-s-football-landscape-report-2022-2", slug: "women-s-football-landscape-report-2022-2" },
  { url: "https://asunified.com/news/why-we-need-to-move-on-from-the-african-potential-conversation-developing-a-sustainable-african-sports-business-ecosystem-2", slug: "why-we-need-to-move-on-from-the-african-potential-conversation-developing-a-sustainable-african-sports-business-ecosystem-2" },
  { url: "https://asunified.com/news/how-technology-is-impacting-the-pan-african-sports-space", slug: "how-technology-is-impacting-the-pan-african-sports-space" },
  { url: "https://asunified.com/news/the-growth-of-women-in-sports-on-off-the-field", slug: "the-growth-of-women-in-sports-on-off-the-field" },
  { url: "https://asunified.com/news/the-african-nations-championship-chan-spotlight-for-the-domestic-leagues-and-players-9", slug: "the-african-nations-championship-chan-spotlight-for-the-domestic-leagues-and-players-9" },
  { url: "https://asunified.com/news/brexit-what-impact-would-this-have-on-the-african-sports-market-2", slug: "brexit-what-impact-would-this-have-on-the-african-sports-market-2" },
  { url: "https://asunified.com/news/sports-manufacturing-and-the-africa-continental-free-trade-area-a-mechanism-for-growth", slug: "sports-manufacturing-and-the-africa-continental-free-trade-area-a-mechanism-for-growth" },
  { url: "https://asunified.com/news/how-to-plug-the-drain-of-african-talent-from-africa", slug: "how-to-plug-the-drain-of-african-talent-from-africa" },
  { url: "https://asunified.com/news/the-african-nations-championship-chan-spotlight-for-the-domestic-leagues-and-players", slug: "the-african-nations-championship-chan-spotlight-for-the-domestic-leagues-and-players" },
  { url: "https://asunified.com/news/much-ado-about-the-abl-2", slug: "much-ado-about-the-abl-2" },
  { url: "https://asunified.com/news/the-challenges-of-sports-business-in-kenya-2", slug: "the-challenges-of-sports-business-in-kenya-2" },
];

function key() { return randomUUID().replace(/-/g, "").slice(0, 12); }

function fetchWithCurl(url) {
  const result = execSync(
    `curl -s -L --max-time 20 -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "${url}"`,
    { maxBuffer: 10 * 1024 * 1024 }
  );
  return result.toString("utf8");
}

function textBlock(text) {
  return {
    _type: "block", _key: key(), style: "normal", markDefs: [],
    children: [{ _type: "span", _key: key(), text: text.trim(), marks: [] }],
  };
}

function headingBlock(text, style = "h2") {
  return {
    _type: "block", _key: key(), style, markDefs: [],
    children: [{ _type: "span", _key: key(), text: text.trim(), marks: [] }],
  };
}

function parseArticle(html, slug) {
  const $ = cheerio.load(html);
  const title = $("h1").first().text().trim() || $("title").text().replace(" | Africa Sports Unified", "").trim();

  const rawAuthor = $('[class*="author"]').first().text().trim() || "Gabriel Ajala";
  const authorName = rawAuthor.split("\n")[0].trim();

  const rawDate = $("time").attr("datetime") || $("time").first().text().trim() || $('[class*="date"]').first().text().trim() || "";
  const publishedAt = rawDate ? new Date(rawDate).toISOString() : new Date("2022-01-01").toISOString();

  const blocks = [];
  const container = $(".w-richtext, [class*='rich-text'], [class*='post-body'], article .content, .post-content").first();
  const target = container.length ? container : $("article, main").first();

  target.children().each((_, el) => {
    const tag = el.tagName?.toLowerCase();
    const text = $(el).text().trim();
    if (!text || tag === "h1") return;
    if (tag === "h2") blocks.push(headingBlock(text, "h2"));
    else if (tag === "h3") blocks.push(headingBlock(text, "h3"));
    else if (tag === "p") blocks.push(textBlock(text));
    else if (tag === "ul" || tag === "ol") {
      $(el).find("li").each((_, li) => {
        const t = $(li).text().trim();
        if (t) blocks.push(textBlock("• " + t));
      });
    }
  });

  // Fallback
  if (blocks.length < 2) {
    $("p").each((_, el) => {
      const t = $(el).text().trim();
      if (t && t.length > 40) blocks.push(textBlock(t));
    });
  }

  const firstText = blocks.find(b => b.style === "normal")?.children?.[0]?.text || "";
  const excerpt = firstText.slice(0, 280) + (firstText.length > 280 ? "…" : "");
  const words = blocks.flatMap(b => b.children || []).map(c => c.text || "").join(" ").split(/\s+/).length;
  const readTime = Math.max(1, Math.round(words / 200));

  return { title, authorName, publishedAt, excerpt, blocks, readTime };
}

async function main() {
  // Get existing author IDs
  const authors = await client.fetch('*[_type == "author"]{_id, name}');
  const authorMap = Object.fromEntries(authors.map(a => [a.name, a._id]));

  let created = 0;
  for (let i = 0; i < REMAINING.length; i++) {
    const { url, slug } = REMAINING[i];
    process.stdout.write(`[${i + 1}/${REMAINING.length}] ${slug.slice(0, 50)}… `);
    try {
      const html = fetchWithCurl(url);
      const { title, authorName, publishedAt, excerpt, blocks, readTime } = parseArticle(html, slug);

      const existing = await client.fetch(`*[_type == "article" && slug.current == $slug][0]._id`, { slug });
      if (existing) { console.log(`skip`); continue; }

      const authorId = authorMap[authorName] || authorMap["Gabriel Ajala"];
      await client.create({
        _type: "article",
        title,
        slug: { _type: "slug", current: slug },
        publishedAt,
        excerpt: excerpt || title,
        body: blocks,
        tierRequired: "public",
        featured: false,
        readTime,
        ...(authorId ? { author: { _type: "reference", _ref: authorId } } : {}),
      });
      console.log(`✓  "${title.slice(0, 45)}"`);
      created++;
    } catch (err) {
      console.log(`✗  ${err.message.slice(0, 60)}`);
    }
  }
  console.log(`\nDone — ${created} articles created.`);
}

main().catch(console.error);
