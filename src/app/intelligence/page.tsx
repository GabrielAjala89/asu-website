import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { KnowledgeHubGrid } from "@/components/sections/KnowledgeHubGrid";
import { DealsTrackerStats } from "@/components/sections/DealsTrackerStats";
import { sanityFetch } from "@/lib/sanity";
import { KNOWLEDGE_HUB_QUERY, FEATURED_REPORTS_QUERY } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

export const metadata = {
  title: "Intelligence | Africa Sports Unified",
  description: "Deals data, reports and market intelligence on Africa's sports economy. Backed by ASU's Deals Tracker and a network of 4,300 senior leaders.",
};

interface HubData {
  articles: never[];
  videos: never[];
  reports: never[];
  trackers: never[];
}

interface FeaturedReport {
  _id: string;
  _type: string;
  title: string;
  slug: { current: string };
  subtitle?: string;
  pricePaid?: number;
  coverImage?: { asset?: { url: string }; alt?: string };
}

const VALID_TABS = ["all", "reports", "trackers", "articles", "videos"] as const;
type Tab = (typeof VALID_TABS)[number];

export default async function IntelligencePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const params = await searchParams;
  const initialTab: Tab = VALID_TABS.includes(params.tab as Tab) ? (params.tab as Tab) : "all";

  const [hub, featuredReports] = await Promise.all([
    sanityFetch<HubData>(KNOWLEDGE_HUB_QUERY).catch(() => ({
      articles: [],
      videos: [],
      reports: [],
      trackers: [],
    })),
    sanityFetch<FeaturedReport[]>(FEATURED_REPORTS_QUERY).catch(() => []),
  ]);

  const { articles = [], videos = [], reports = [], trackers = [] } = hub as HubData;

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="bg-[#1b3d6e] overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <div className="flex flex-col gap-5 max-w-[46rem]">
              <p className="font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-[0.14em] text-[#F4A26B]">
                ASU Intelligence
              </p>
              <h1 className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.1] text-white">
                Data and intelligence on Africa&apos;s sports economy
              </h1>
              <p className="text-[clamp(1.05rem,1.5vw,1.25rem)] leading-relaxed text-[#E3E9F2]">
                Deals tracking, market reports and sector insights built from primary research and a network of 4,300 senior leaders across the continent.
              </p>
            </div>
          </div>
        </section>

        {/* ── Deals Tracker band ───────────────────────────────────────── */}
        <DealsTrackerStats />

        {/* ── Featured Reports ─────────────────────────────────────────── */}
        {featuredReports.length > 0 && (
          <section className="bg-[#F5F6F8] py-20">
            <div className="mx-auto max-w-7xl px-6 flex flex-col gap-10">
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(1.6rem,2.6vw,2.2rem)] text-[#1b3d6e] leading-tight">
                  Reports &amp; trackers
                </h2>
                <Link
                  href="/intelligence?tab=reports"
                  className="text-sm font-bold font-[family-name:var(--font-heading)] text-[#1b3d6e] hover:text-[#E8630A] transition-colors"
                >
                  View all →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {featuredReports.map((r) => (
                  <Link
                    key={r._id}
                    href={`/${r._type === "tracker" ? "deals-tracker" : "reports"}/${r.slug.current}`}
                    className="group bg-white rounded overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                  >
                    {r.coverImage?.asset?.url ? (
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={r.coverImage.asset.url}
                          alt={r.coverImage.alt || r.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[4/3] bg-[#1b3d6e]/10 flex items-center justify-center text-[#1b3d6e]/30">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                      </div>
                    )}
                    <div className="p-6 flex flex-col gap-2 flex-1">
                      <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wider text-[#B04A06]">
                        {r._type === "tracker" ? "Tracker" : "Report"}
                      </p>
                      <h3 className="font-[family-name:var(--font-heading)] font-bold text-lg text-[#1b3d6e] leading-snug group-hover:text-[#E8630A] transition-colors">
                        {r.title}
                      </h3>
                      {r.subtitle && (
                        <p className="text-sm text-[#4A5D7A] leading-snug">{r.subtitle}</p>
                      )}
                      <p className="mt-auto pt-3 text-sm font-bold font-[family-name:var(--font-heading)] text-[#1b3d6e]">
                        {r.pricePaid ? `£${r.pricePaid}` : "Free"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Full content grid ─────────────────────────────────────────── */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 flex flex-col gap-8">
            <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(1.6rem,2.6vw,2.2rem)] text-[#1b3d6e] leading-tight">
              Insights
            </h2>
          </div>
          <KnowledgeHubGrid
            articles={articles}
            videos={videos}
            reports={[]}
            trackers={[]}
            initialTab={initialTab === "reports" || initialTab === "trackers" ? "all" : initialTab}
          />
        </section>

        {/* ── Black closing band ───────────────────────────────────────── */}
        <section className="bg-[#030000]">
          <div className="mx-auto max-w-7xl px-6 py-14 flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-col gap-2 flex-1 min-w-[280px]">
              <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(1.5rem,2.4vw,2rem)] text-white">
                Want intelligence tailored to your decisions?
              </h2>
              <p className="text-[17px] leading-snug text-[#E3E9F2]">
                ASU Insider gives you the briefings, data and introductions you need to act with confidence.
              </p>
            </div>
            <a
              href="/asu-insider"
              className="px-7 py-[18px] rounded font-[family-name:var(--font-heading)] font-bold text-base bg-[#E8630A] text-[#030000] hover:bg-[#B04A06] hover:text-white transition-colors whitespace-nowrap"
            >
              Join ASU Insider – free
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
