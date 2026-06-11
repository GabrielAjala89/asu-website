import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrangeLine } from "@/components/ui/OrangeLine";
import { KnowledgeHubGrid } from "@/components/sections/KnowledgeHubGrid";
import { sanityFetch } from "@/lib/sanity";
import { KNOWLEDGE_HUB_QUERY } from "@/lib/queries";
import Image from "next/image";

export const revalidate = 60;

export const metadata = {
  title: "Knowledge Hub | Africa Sports Unified",
  description: "Decision-grade intelligence on Africa's sports economy — reports, trackers, articles, and video content from ASU.",
};

interface HubData {
  articles: never[];
  videos: never[];
  reports: never[];
  trackers: never[];
}

export default async function KnowledgeHubPage() {
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
        <section className="relative min-h-[50vh] flex items-end overflow-hidden">
          <Image
            src="/images/knowledge-hub-hero.jpg"
            alt="ASU Knowledge Hub — intelligence for Africa's sports economy"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b3d6e]/90 via-[#1b3d6e]/40 to-transparent" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 w-full pb-16">
            <OrangeLine />
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-tight">
              Intelligence, Insights &amp; Ideas Driving Africa&apos;s Sports Industry
            </h1>
            <p className="mt-3 text-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
              Decision-grade intelligence on Africa&apos;s sports economy — reports, trackers, articles, and video content.
            </p>
          </div>
        </section>

        <KnowledgeHubGrid
          articles={articles}
          videos={videos}
          reports={reports}
          trackers={trackers}
        />
      </main>
      <Footer />
    </>
  );
}
