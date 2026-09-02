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
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQwfVa1av_8miAE8shipaI58BjTz98lNXCOoXQPMpu7bY_qCPLjVTcTU9IBjMpcvoV03F-sVLTEvvCc/pub?gid=0&single=true&output=csv";

interface Deal {
  date: string;
  country: string;
  sport: string;
  sectorFocus: string;
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

function formatDate(raw: string): string {
  const parts = raw.split("-");
  if (parts.length !== 3) return raw;
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const m = parseInt(parts[1], 10);
  const y = parseInt(parts[2], 10);
  if (isNaN(m) || isNaN(y) || m < 1 || m > 12) return raw;
  return `${months[m - 1]} 20${String(y).padStart(2, "0")}`;
}

async function getDeals(): Promise<Deal[]> {
  try {
    const res = await fetch(CSV_URL, { next: { revalidate: 3600 } });
    const text = await res.text();
    const rows = text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .map(parseCSVLine);
    return rows
      .slice(1) // skip header
      .filter((r) => r.length > 10 && r[1]?.trim())
      .slice(0, 5)
      .map((r) => ({
        date: formatDate(r[1]?.trim() ?? ""),
        country: r[2]?.trim() ?? "",
        sport: r[3]?.trim() ?? "",
        sectorFocus: r[10]?.trim() ?? "",
      }));
  } catch {
    return [];
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
  const deals = await getDeals();

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

        {/* ── Tracker ──────────────────────────────────────────── */}
        <section className="py-16 bg-[#f4f7fb]">
          <div className="mx-auto max-w-7xl px-6">

            <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
              <div>
                <OrangeLine />
                <h2 className="mt-3 text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                  Latest Deals
                </h2>
              </div>
              <p className="text-sm text-gray-400 pb-0.5">
                Showing 5 most recent &middot;{" "}
                <span className="text-[#F37021] font-semibold">Free preview</span>
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
                          <td className="px-5 py-4 text-gray-800 font-semibold">
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
                  ASU Insider members access the full tracker — all deals, deal value, parties involved, and source links, with filters by country, sport, and sector.
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
                href="/asu-insider"
                className="flex-shrink-0 inline-block bg-[#F37021] hover:bg-[#d65a14] text-white text-sm font-bold font-[family-name:var(--font-heading)] px-8 py-4 rounded-full transition-colors text-center whitespace-nowrap"
              >
                Join ASU Insider →
              </Link>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
