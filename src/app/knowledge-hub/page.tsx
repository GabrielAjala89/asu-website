import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrangeLine } from "@/components/ui/OrangeLine";
import { KnowledgeHubGrid } from "@/components/sections/KnowledgeHubGrid";
import { sanityFetch } from "@/lib/sanity";
import { KNOWLEDGE_HUB_QUERY } from "@/lib/queries";
import Image from "next/image";

export const revalidate = 60;

export const metadata = {
  title: "Knowledge Hub",
  description: "Decision-grade intelligence on Africa's sports economy — reports, trackers, articles, and video content from ASU.",
};

interface HubData {
  articles: never[];
  videos: never[];
  reports: never[];
  trackers: never[];
}

const VALID_TABS = ["all", "reports", "trackers", "articles", "videos"] as const;
type Tab = (typeof VALID_TABS)[number];

export default async function KnowledgeHubPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const params = await searchParams;
  const initialTab: Tab = VALID_TABS.includes(params.tab as Tab) ? (params.tab as Tab) : "all";

  const hub = await sanityFetch<HubData>(KNOWLEDGE_HUB_QUERY).catch(() => ({
    articles: [],
    videos: [],
    reports: [],
    trackers: [],
  }));

  const { articles = [], videos = [], reports = [], trackers = [] } = hub as HubData;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative bg-[#1b3d6e] pt-28 pb-16 overflow-hidden">
          {/* Subtle background text */}
          <span className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 text-[160px] md:text-[220px] font-extrabold text-white/[0.04] font-[family-name:var(--font-heading)] leading-none whitespace-nowrap pr-8">
            KNOWLEDGE
          </span>
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <OrangeLine />
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-tight max-w-3xl">
              Intelligence, Insights &amp; Ideas Driving Africa&apos;s Sports Economy
            </h1>
            <p className="mt-4 text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
              Research, analysis, and sector intelligence for the organisations and decision-makers navigating Africa&apos;s sports economy.
            </p>
          </div>
        </section>

        <KnowledgeHubGrid
          articles={articles}
          videos={videos}
          reports={reports}
          trackers={trackers}
          initialTab={initialTab}
        />
      </main>
      <Footer />
    </>
  );
}
