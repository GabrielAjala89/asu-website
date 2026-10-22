import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrangeLine } from "@/components/ui/OrangeLine";
import { FreeMemberCTA } from "@/components/ui/FreeMemberCTA";
import { Suspense } from "react";
import Link from "next/link";

export const revalidate = 3600;

export const metadata = {
  title: "Africa Sports Deals Tracker",
  description:
    "Track the latest signed deals, partnerships, and investments across Africa's sports economy. Verified and updated weekly by ASU.",
};

// Published CSV exports — gids unchanged after sheet restructure
const CSV_URL_2026 =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQwfVa1av_8miAE8shipaI58BjTz98lNXCOoXQPMpu7bY_qCPLjVTcTU9IBjMpcvoV03F-sVLTEvvCc/pub?gid=900243820&single=true&output=csv";

const CSV_URL_2025 =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQwfVa1av_8miAE8shipaI58BjTz98lNXCOoXQPMpu7bY_qCPLjVTcTU9IBjMpcvoV03F-sVLTEvvCc/pub?gid=0&single=true&output=csv";

// Column indices (0-based; col A = 0 is always empty)
// Columns B–N are original; O–AD are new; AE (30) is Internal Flag — never expose
const COL = {
  DATE: 1,          // B
  COUNTRY: 2,       // C Country / Region
  SPORT: 3,         // D
  RIGHTS_HOLDER: 4, // E
  BUYER: 5,         // F
  DEAL_TYPE: 6,     // G
  LOCAL_VALUE: 7,   // H
  USD_VALUE: 8,     // I — now a raw number or "Undisclosed" / "In kind"
  DURATION: 9,      // J
  SECTOR: 10,       // K Sector Focus
  STATUS: 11,       // L — "Active" or "Ended"
  NOTES: 12,        // M
  SOURCE: 13,       // N
  DEAL_ID: 14,      // O
  YEAR: 15,         // P Year Announced
  REGION: 20,       // U
  VALUE_BASIS: 28,  // AC — "Total" | "Per year" | "Reserve price" | "Proposed"
  // AE (30) = Internal Flag — NEVER read or display
} as const;

const FLAGS: Record<string, string> = {
  "Algeria": "🇩🇿", "Angola": "🇦🇴", "Botswana": "🇧🇼", "Burkina Faso": "🇧🇫",
  "Cameroon": "🇨🇲", "Chad": "🇹🇩", "Congo": "🇨🇬", "DR Congo": "🇨🇩",
  "Egypt": "🇪🇬", "Ethiopia": "🇪🇹", "Gabon": "🇬🇦", "Ghana": "🇬🇭",
  "Guinea": "🇬🇳", "Ivory Coast": "🇨🇮", "Kenya": "🇰🇪", "Libya": "🇱🇾",
  "Madagascar": "🇲🇬", "Mali": "🇲🇱", "Morocco": "🇲🇦", "Mozambique": "🇲🇿",
  "Namibia": "🇳🇦", "Nigeria": "🇳🇬", "Rwanda": "🇷🇼", "Senegal": "🇸🇳",
  "Sierra Leone": "🇸🇱", "Somalia": "🇸🇴", "South Africa": "🇿🇦", "Sudan": "🇸🇩",
  "Tanzania": "🇹🇿", "Tunisia": "🇹🇳", "Uganda": "🇺🇬", "Zambia": "🇿🇲",
  "Zimbabwe": "🇿🇼",
};

interface Deal {
  date: string;
  country: string;
  sport: string;
  sectorFocus: string;
}

interface Stats {
  totalDeals2026: number;
  totalDeals2025: number;
  topSport: string;
  topSportCount: number;
  topCountry: string;
  topCountryCount: number;
  activeCount: number;
  sportBreakdown: { sport: string; count: number }[];
  disclosedValue: number;  // exact dollars, Value Basis = "Total", 2026 deals only
  disclosedCount: number;
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { field += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      fields.push(field);
      field = "";
    } else {
      field += ch;
    }
  }
  fields.push(field);
  return fields;
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function formatDate(raw: string): string {
  if (raw.includes("/")) {
    const [d, m, y] = raw.split("/").map((p) => p.trim());
    const mNum = parseInt(m, 10);
    if (!isNaN(mNum) && mNum >= 1 && mNum <= 12) {
      return `${parseInt(d, 10)} ${MONTHS[mNum - 1]} ${y}`;
    }
  }
  if (raw.includes("-")) {
    const [d, m, y] = raw.split("-").map((p) => p.trim());
    const mNum = parseInt(m, 10);
    const yNum = parseInt(y, 10);
    if (!isNaN(mNum) && mNum >= 1 && mNum <= 12) {
      return `${parseInt(d, 10)} ${MONTHS[mNum - 1]} 20${String(yNum).padStart(2, "0")}`;
    }
  }
  return raw;
}

function getFlag(country: string): string {
  return FLAGS[country] ?? "";
}

// Column I is now a raw number (e.g. "7500000") or "Undisclosed" / "In kind"
function parseUSDValue(raw: string): number | null {
  if (!raw) return null;
  const t = raw.trim();
  if (!t) return null;
  const lower = t.toLowerCase();
  if (lower === "undisclosed" || lower === "in kind" || lower === "tbc" || lower === "n/a") return null;
  const n = parseFloat(t.replace(/[$,]/g, ""));
  return isNaN(n) || n <= 0 ? null : n;
}

// Format a dollar amount for display
function formatUSD(dollars: number): string {
  if (dollars >= 1_000_000_000) return `$${(dollars / 1_000_000_000).toFixed(1)}B`;
  if (dollars >= 1_000_000) return `$${Math.round(dollars / 1_000_000)}M`;
  return `$${dollars.toLocaleString()}`;
}

function topByFrequency(values: string[]): [string, number] {
  const counts: Record<string, number> = {};
  for (const v of values) if (v) counts[v] = (counts[v] ?? 0) + 1;
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  return top ?? ["—", 0];
}

function parseRows(text: string) {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .map(parseCSVLine)
    .slice(1)  // skip header row
    .filter((r) => r.length > 10 && r[COL.DATE]?.trim());
}

// Regional values to exclude when finding "top country"
const REGIONAL_VALUES = new Set([
  "sub-saharan africa", "continental", "global", "pan-africa", "pan african",
  "mena", "north africa", "west africa", "east africa", "central africa",
  "southern africa", "multi region",
]);

async function getTrackerData(): Promise<{ deals: Deal[]; stats: Stats }> {
  const fallback = {
    deals: [],
    stats: {
      totalDeals2026: 0, totalDeals2025: 0,
      topSport: "—", topSportCount: 0,
      topCountry: "—", topCountryCount: 0,
      activeCount: 0, sportBreakdown: [],
      disclosedValue: 0, disclosedCount: 0,
    },
  };
  try {
    const [res2026, res2025] = await Promise.all([
      fetch(CSV_URL_2026, { next: { revalidate: 3600 } }),
      fetch(CSV_URL_2025, { next: { revalidate: 3600 } }),
    ]);
    const [text2026, text2025] = await Promise.all([res2026.text(), res2025.text()]);

    const rows2026 = parseRows(text2026);
    const rows2025 = parseRows(text2025);
    const allDeals = [...rows2026, ...rows2025];

    // Year counts use Year Announced (col P), not the tab name
    const deals2026 = allDeals.filter(r => (r[COL.YEAR] ?? "").trim() === "2026");
    const deals2025 = allDeals.filter(r => (r[COL.YEAR] ?? "").trim() === "2025");

    // Active deals: Status = "Active" across both tabs
    const activeCount = allDeals.filter(r => (r[COL.STATUS] ?? "").trim() === "Active").length;

    // Sport breakdown from 2026 deals
    const sportCounts: Record<string, number> = {};
    for (const r of deals2026) {
      const s = r[COL.SPORT]?.trim();
      if (s) sportCounts[s] = (sportCounts[s] ?? 0) + 1;
    }
    const sportBreakdown = Object.entries(sportCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([sport, count]) => ({ sport, count }));

    const [topSport, topSportCount] = topByFrequency(deals2026.map(r => r[COL.SPORT]?.trim() ?? ""));

    const countryValues = deals2026
      .map(r => r[COL.COUNTRY]?.trim() ?? "")
      .filter(c => !REGIONAL_VALUES.has(c.toLowerCase()));
    const [topCountry, topCountryCount] = topByFrequency(countryValues);

    // Disclosed value: 2026 deals, Value Basis = "Total" only
    let disclosedValue = 0, disclosedCount = 0;
    for (const r of deals2026) {
      if ((r[COL.VALUE_BASIS] ?? "").trim() !== "Total") continue;
      const v = parseUSDValue(r[COL.USD_VALUE] ?? "");
      if (v !== null) { disclosedValue += v; disclosedCount++; }
    }

    // Preview: 5 most recent from 2026 tab (already sorted newest-first by the sheet)
    const deals = rows2026.slice(0, 5).map((r) => ({
      date: formatDate(r[COL.DATE]?.trim() ?? ""),
      country: r[COL.COUNTRY]?.trim() ?? "",
      sport: r[COL.SPORT]?.trim() ?? "",
      sectorFocus: r[COL.SECTOR]?.trim() ?? "",
    }));

    return {
      deals,
      stats: {
        totalDeals2026: deals2026.length,
        totalDeals2025: deals2025.length,
        topSport, topSportCount,
        topCountry, topCountryCount,
        activeCount, sportBreakdown,
        disclosedValue, disclosedCount,
      },
    };
  } catch {
    return fallback;
  }
}

const PERKS = [
  "All fields",
  "Deal value",
  "Parties & sources",
  "Country, region & sport filters",
  "Weekly updates",
];

export default async function DealsTrackerPage() {
  const { deals, stats } = await getTrackerData();

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="bg-[#1b3d6e] pt-28 pb-16 overflow-hidden relative">
          <span className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 text-[160px] md:text-[220px] font-extrabold text-white/[0.04] font-[family-name:var(--font-heading)] leading-none whitespace-nowrap pr-8">
            DEALS
          </span>
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F37021] font-[family-name:var(--font-heading)]">
              ASU Intelligence
            </p>
            <OrangeLine className="mt-3" />
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-tight max-w-3xl">
              Africa Sports Deals Tracker
            </h1>
            <p className="mt-4 text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
              Tracking signed deals, partnerships, and investment across Africa&apos;s sports economy. Verified and updated weekly by ASU.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Updated weekly", "Verified sources", "Free preview"].map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-white/10 text-white/75 text-xs font-semibold px-4 py-1.5 rounded-full border border-white/15 font-[family-name:var(--font-heading)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats strip ──────────────────────────────────────── */}
        <section className="bg-white border-b border-[#dde3ee]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#dde3ee]">

              <div className="px-6 py-8 flex flex-col gap-1">
                <span className="text-4xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] leading-none tabular-nums">
                  {stats.totalDeals2026}
                </span>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">
                  Deals in 2026
                </span>
                <span className="text-sm text-gray-500 leading-snug mt-0.5">
                  Tracked &amp; verified by ASU
                </span>
              </div>

              <div className="px-6 py-8 flex flex-col gap-1">
                <span className="text-4xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] leading-none">
                  {stats.topSport}
                </span>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">
                  Most active sport
                </span>
                <span className="text-sm text-gray-500 leading-snug mt-0.5">
                  {stats.topSportCount} deals tracked so far
                </span>
              </div>

              <div className="px-6 py-8 flex flex-col gap-1">
                <span className="text-4xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] leading-none">
                  {getFlag(stats.topCountry) || ""}{stats.topCountry}
                </span>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">
                  Most active market
                </span>
                <span className="text-sm text-gray-500 leading-snug mt-0.5">
                  {stats.topCountryCount} deals this year
                </span>
              </div>

              <div className="px-6 py-8 flex flex-col gap-1">
                <span className="text-4xl font-extrabold text-[#F37021] font-[family-name:var(--font-heading)] leading-none tabular-nums">
                  {stats.activeCount}
                </span>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">
                  Active deals
                </span>
                <span className="text-sm text-gray-500 leading-snug mt-0.5">
                  Status active across both years
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* ── Infographics ─────────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <OrangeLine />
            <h2 className="mt-3 mb-10 text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
              Market at a Glance
            </h2>
            {/* Financial headline stat */}
            {stats.disclosedValue > 0 && (
              <div className="mb-8 bg-[#1b3d6e] rounded-2xl p-8 flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-[#F37021]/20 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <circle cx="16" cy="16" r="15" stroke="#F37021" strokeWidth="2"/>
                    <text x="16" y="22" textAnchor="middle" fontSize="18" fontWeight="800" fill="#F37021" fontFamily="inherit">$</text>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#F37021] font-[family-name:var(--font-heading)] mb-1">
                    Disclosed Deal Value — 2026 YTD
                  </p>
                  <p className="text-4xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-none tabular-nums">
                    {formatUSD(stats.disclosedValue)}+
                  </p>
                  <p className="mt-2 text-white/55 text-xs leading-snug max-w-lg">
                    Based on {stats.disclosedCount} of {stats.totalDeals2026} deals where total value has been reported. The remaining {stats.totalDeals2026 - stats.disclosedCount} deals are undisclosed — the true total is significantly higher.
                  </p>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-8">

              {/* Year comparison */}
              <div className="bg-[#f4f7fb] rounded-2xl p-8 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#F37021] font-[family-name:var(--font-heading)] mb-4">
                    Year on Year
                  </p>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">2025 — Full Year</p>
                      <p className="text-5xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] leading-none tabular-nums">
                        {stats.totalDeals2025}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">deals tracked</p>
                    </div>
                    <div className="border-t border-[#dde3ee] pt-6">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">2026 — Year to Date</p>
                      <p className="text-5xl font-extrabold text-[#F37021] font-[family-name:var(--font-heading)] leading-none tabular-nums">
                        {stats.totalDeals2026}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">deals tracked so far</p>
                    </div>
                  </div>
                </div>
                <p className="mt-8 text-xs text-gray-400 leading-snug">
                  2026 figure reflects deals tracked through the current date. Full-year total will grow.
                </p>
              </div>

              {/* Sport breakdown chart */}
              <div className="md:col-span-2 bg-[#f4f7fb] rounded-2xl p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#F37021] font-[family-name:var(--font-heading)] mb-6">
                  2026 Deals by Sport
                </p>
                {stats.sportBreakdown.length > 0 ? (
                  <div className="space-y-4">
                    {stats.sportBreakdown.map(({ sport, count }) => {
                      const pct = Math.round((count / stats.sportBreakdown[0].count) * 100);
                      return (
                        <div key={sport} className="flex items-center gap-4">
                          <span className="w-28 shrink-0 text-sm font-semibold text-gray-700 text-right font-[family-name:var(--font-heading)] truncate">
                            {sport}
                          </span>
                          <div className="flex-1 bg-[#e4eaf5] rounded-full h-3 overflow-hidden">
                            <div
                              className="h-3 rounded-full bg-[#1b3d6e] transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="w-6 shrink-0 text-sm font-bold text-[#1b3d6e] font-[family-name:var(--font-heading)] tabular-nums">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">Data unavailable.</p>
                )}
                <p className="mt-6 text-xs text-gray-400">
                  Based on {stats.totalDeals2026} deals tracked in 2026 year to date. Source: ASU Deals Tracker.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── Tracker ──────────────────────────────────────────── */}
        <section className="py-16 bg-[#f4f7fb]">
          <div className="mx-auto max-w-7xl px-6">

            {/* Free preview notice */}
            <div className="mb-6 flex items-center gap-3 bg-[#F37021]/10 border border-[#F37021]/25 rounded-xl px-5 py-3.5">
              <span className="shrink-0 bg-[#F37021] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded font-[family-name:var(--font-heading)]">
                Free Preview
              </span>
              <p className="text-sm text-gray-600 leading-snug">
                You&apos;re viewing the 5 most recent deals with 4 fields. The full tracker includes all deals, deal values, parties, sources, and advanced filters.{" "}
                <Link href="/trackers/african-sports-market-deals-tracker" className="font-semibold text-[#1b3d6e] hover:text-[#F37021] transition-colors underline underline-offset-2">
                  Get full access →
                </Link>
              </p>
            </div>

            <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
              <div>
                <OrangeLine />
                <h2 className="mt-3 text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                  Latest Deals
                </h2>
              </div>
              <p className="text-sm text-gray-400 pb-0.5">
                Showing 5 most recent &middot; 4 of 9 fields shown
              </p>
            </div>

            {/* Table */}
            <div className="relative">
              <div className="overflow-x-auto rounded-xl border border-[#dde3ee]">
                <table className="w-full text-sm bg-white">
                  <thead>
                    <tr className="bg-[#f0f4fa] border-b border-[#dde3ee]">
                      {["Date", "Country / Region", "Sport", "Sector Focus"].map((h) => (
                        <th
                          key={h}
                          className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {deals.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-5 py-12 text-center text-gray-400">
                          Unable to load deals — please check back shortly.
                        </td>
                      </tr>
                    ) : (
                      deals.map((deal, i) => (
                        <tr
                          key={i}
                          className="border-b border-[#dde3ee] last:border-0 hover:bg-[#f5f8ff] transition-colors"
                        >
                          <td className="px-5 py-4 text-gray-400 whitespace-nowrap text-xs font-[family-name:var(--font-heading)] font-semibold tracking-wide">
                            {deal.date}
                          </td>
                          <td className="px-5 py-4 text-gray-800 font-semibold whitespace-nowrap">
                            {getFlag(deal.country) && (
                              <span className="mr-2">{getFlag(deal.country)}</span>
                            )}
                            {deal.country}
                          </td>
                          <td className="px-5 py-4">
                            <span className="inline-block bg-[#f0f4fa] text-gray-600 text-xs font-semibold px-2.5 py-1 rounded border border-[#dde3ee]">
                              {deal.sport}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-gray-600">
                            {deal.sectorFocus}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {/* Gradient fade suggesting more below */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f4f7fb] to-transparent rounded-b-xl pointer-events-none" />
            </div>

            {/* Free member CTA */}
            <div className="mt-8">
              <Suspense fallback={null}>
                <FreeMemberCTA />
              </Suspense>
            </div>

            {/* Unlock CTA */}
            <div className="mt-6 bg-[#1b3d6e] rounded-2xl p-8 flex flex-col md:flex-row md:items-center gap-6 justify-between">
              <div>
                <h3 className="text-white font-extrabold text-lg font-[family-name:var(--font-heading)] leading-snug">
                  See every deal, not just the headlines
                </h3>
                <p className="mt-2 text-white/70 text-sm leading-relaxed max-w-lg">
                  The full tracker includes all deals, deal value, parties involved, methodology, and source links — with filters by country, region, sport, and sector.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {PERKS.map((p) => (
                    <span
                      key={p}
                      className="text-xs font-semibold text-white/80 bg-white/10 border border-white/15 px-3 py-1 rounded-full font-[family-name:var(--font-heading)]"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href="/trackers/african-sports-market-deals-tracker"
                className="flex-shrink-0 inline-block bg-[#F37021] hover:bg-[#d65a14] text-white text-sm font-bold font-[family-name:var(--font-heading)] px-8 py-4 rounded-full transition-colors text-center whitespace-nowrap"
              >
                Get Full Access →
              </Link>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
