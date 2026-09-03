import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrangeLine } from "@/components/ui/OrangeLine";
import Link from "next/link";

export const revalidate = 3600;

export const metadata = {
  title: "Africa Sports Deals Tracker",
  description:
    "Track the latest signed deals, partnerships, and investments across Africa's sports economy. Verified and updated weekly by ASU.",
};

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQwfVa1av_8miAE8shipaI58BjTz98lNXCOoXQPMpu7bY_qCPLjVTcTU9IBjMpcvoV03F-sVLTEvvCc/pub?gid=900243820&single=true&output=csv";

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
  totalDeals: number;
  topSport: string;
  topSportCount: number;
  topCountry: string;
  topCountryCount: number;
  signedCount: number;
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
  // DD/MM/YYYY (2026 tab format)
  if (raw.includes("/")) {
    const [d, m, y] = raw.split("/").map((p) => p.trim());
    const mNum = parseInt(m, 10);
    if (!isNaN(mNum) && mNum >= 1 && mNum <= 12) {
      return `${parseInt(d, 10)} ${MONTHS[mNum - 1]} ${y}`;
    }
  }
  // DD-MM-YY fallback
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

function topByFrequency(values: string[]): [string, number] {
  const counts: Record<string, number> = {};
  for (const v of values) if (v) counts[v] = (counts[v] ?? 0) + 1;
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  return top ?? ["—", 0];
}

async function getTrackerData(): Promise<{ deals: Deal[]; stats: Stats }> {
  const fallback = { deals: [], stats: { totalDeals: 0, topSport: "—", topSportCount: 0, topCountry: "—", topCountryCount: 0, signedCount: 0 } };
  try {
    const res = await fetch(CSV_URL, { next: { revalidate: 3600 } });
    const text = await res.text();
    const allRows = text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .map(parseCSVLine)
      .slice(1)
      .filter((r) => r.length > 10 && r[1]?.trim());

    const signed = ["signed", "active", "activated", "confirmed", "renewed"];
    const signedCount = allRows.filter((r) =>
      signed.includes((r[11] ?? "").trim().toLowerCase())
    ).length;

    const [topSport, topSportCount]     = topByFrequency(allRows.map((r) => r[3]?.trim() ?? ""));
    // Exclude regional/continental entries from top country
    const countryValues = allRows.map((r) => r[2]?.trim() ?? "").filter(
      (c) => !["sub-saharan africa", "continental", "global", "pan-africa", "mena", "west africa", "east africa"].includes(c.toLowerCase())
    );
    const [topCountry, topCountryCount] = topByFrequency(countryValues);

    const deals = allRows.slice(0, 5).map((r) => ({
      date: formatDate(r[1]?.trim() ?? ""),
      country: r[2]?.trim() ?? "",
      sport: r[3]?.trim() ?? "",
      sectorFocus: r[10]?.trim() ?? "",
    }));

    return {
      deals,
      stats: { totalDeals: allRows.length, topSport, topSportCount, topCountry, topCountryCount, signedCount },
    };
  } catch {
    return fallback;
  }
}

const PERKS = [
  "All fields",
  "Deal value",
  "Parties & sources",
  "Country & sport filters",
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
                  {stats.totalDeals}
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
                  {stats.signedCount}
                </span>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">
                  Signed &amp; confirmed
                </span>
                <span className="text-sm text-gray-500 leading-snug mt-0.5">
                  Active deals in the market
                </span>
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

            {/* Unlock CTA */}
            <div className="mt-6 bg-[#1b3d6e] rounded-2xl p-8 flex flex-col md:flex-row md:items-center gap-6 justify-between">
              <div>
                <h3 className="text-white font-extrabold text-lg font-[family-name:var(--font-heading)] leading-snug">
                  See every deal, not just the headlines
                </h3>
                <p className="mt-2 text-white/70 text-sm leading-relaxed max-w-lg">
                  The full tracker includes all deals, deal value, parties involved, methodology, and source links — with filters by country, sport, and sector.
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
