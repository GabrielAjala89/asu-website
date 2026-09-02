"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SPOTIFY_URL = "https://open.spotify.com/show/37o4pqxpyoJzURhSr2dXpe?si=aea0cf5f72184b5a";

// ─── Types ────────────────────────────────────────────────────────────────────

interface HubArticle {
  _id: string;
  _type: "article";
  title: string;
  slug: { current: string };
  publishedAt?: string;
  readTime?: number;
  excerpt?: string;
  tierRequired?: string;
  heroImage?: { asset?: { url: string }; alt?: string };
  topics?: { title: string; slug: { current: string } }[];
}

interface HubVideo {
  _id: string;
  _type: "video";
  title: string;
  slug: { current: string };
  publishedAt?: string;
  duration?: number;
  youtubeUrl?: string;
  tierRequired?: string;
  thumbnail?: { asset?: { url: string }; alt?: string };
  topics?: { title: string; slug: { current: string } }[];
}

interface Topic {
  title: string;
  slug: { current: string };
}

interface HubReport {
  _id: string;
  _type: "report";
  title: string;
  slug: { current: string };
  subtitle?: string;
  pricePaid?: number;
  coverImage?: { asset?: { url: string }; alt?: string };
  topics?: Topic[];
}

interface HubTracker {
  _id: string;
  _type: "tracker";
  title: string;
  slug: { current: string };
  subtitle?: string;
  pricePaid?: number;
  coverImage?: { asset?: { url: string }; alt?: string };
  topics?: Topic[];
}

type Tab = "all" | "reports" | "trackers" | "articles" | "videos";

interface Props {
  articles: HubArticle[];
  videos: HubVideo[];
  reports: HubReport[];
  trackers: HubTracker[];
  initialTab?: Tab;
}

// ─── Placeholder data (shown until Sanity content is added) ──────────────────

const PLACEHOLDER_PRODUCTS = [
  {
    id: "p1", type: "report" as const,
    badge: "2025 AFCON OVERVIEW REPORT", price: "£100",
    features: ["Commercial & Financial Insights", "Media & Broadcast Impact", "Sporting & Competitive Summary", "Host & Infrastructure Evaluation"],
    bg: "from-green-900",
  },
  {
    id: "p2", type: "tracker" as const,
    badge: "AFRICAN SPORTS MARKET DEALS TRACKER", price: "£55",
    features: ["Deal Coverage & Listings", "Market Insights & Trends", "Data for Strategic Decisions", "Contextual Industry Insights"],
    bg: "from-slate-800",
  },
  {
    id: "p3", type: "report" as const,
    badge: "2023 AFCON OVERVIEW REPORT", price: "£145",
    features: ["Tournament Summary & Stats", "Competitive Insights", "Commercial & Media Impact", "Socio-economic Impact"],
    bg: "from-stone-700",
  },
  {
    id: "p4", type: "report" as const,
    badge: "2025 AFRICAN SPORTS MARKET TRENDS REPORT", price: "£25",
    features: ["Digital Transformation", "Investment Trends", "Grassroots Development", "Strategic Insights"],
    bg: "from-orange-900",
  },
];

// ─── Tab config ───────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "reports", label: "Reports" },
  { id: "trackers", label: "Trackers" },
  { id: "articles", label: "Articles" },
  { id: "videos", label: "Videos" },
];

// ─── Topic helpers ────────────────────────────────────────────────────────────

type AnyHubItem = HubArticle | HubVideo | HubReport | HubTracker;

function getTopicsForTab(
  tab: Tab,
  articles: HubArticle[],
  videos: HubVideo[],
  reports: HubReport[],
  trackers: HubTracker[],
): Topic[] {
  const pool: AnyHubItem[] = [];
  if (tab === "all" || tab === "articles") pool.push(...articles);
  if (tab === "all" || tab === "videos")   pool.push(...videos);
  if (tab === "all" || tab === "reports")  pool.push(...reports);
  if (tab === "all" || tab === "trackers") pool.push(...trackers);

  const seen = new Map<string, string>();
  for (const item of pool) {
    for (const t of item.topics ?? []) {
      if (!seen.has(t.slug.current)) seen.set(t.slug.current, t.title);
    }
  }
  return [...seen.entries()].map(([slug, title]) => ({ slug: { current: slug }, title }));
}

function matchesTopic(item: AnyHubItem, activeTopic: string | null): boolean {
  if (!activeTopic) return true;
  return item.topics?.some(t => t.slug.current === activeTopic) ?? false;
}

// ─── Main component ───────────────────────────────────────────────────────────

export function KnowledgeHubGrid({ articles, videos, reports, trackers, initialTab }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab || "all");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const counts: Record<Tab, number> = {
    all: articles.length + videos.length + reports.length + trackers.length,
    reports: reports.length,
    trackers: trackers.length,
    articles: articles.length,
    videos: videos.length,
  };

  const hasContent = counts.all > 0;
  const availableTopics = hasContent
    ? getTopicsForTab(activeTab, articles, videos, reports, trackers)
    : [];

  function handleTabChange(tab: Tab) {
    setActiveTab(tab);
    setActiveTopic(null);
  }

  return (
    <section className="py-14 bg-white min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-6">

        {/* Content-type tabs */}
        <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-100">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-semibold font-[family-name:var(--font-heading)] transition-colors",
                activeTab === tab.id
                  ? "bg-[#1b3d6e] text-white"
                  : "bg-[#f4f7fb] text-[#1b3d6e] hover:bg-[#dde6f0]"
              )}
            >
              {tab.label}
              {hasContent && counts[tab.id] > 0 && (
                <span className={cn(
                  "ml-2 text-xs",
                  activeTab === tab.id ? "text-white/60" : "text-[#F37021] font-bold"
                )}>
                  {counts[tab.id]}
                </span>
              )}
            </button>
          ))}
          {/* Podcasts — external link to Spotify */}
          <a
            href={SPOTIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full text-sm font-semibold font-[family-name:var(--font-heading)] transition-colors bg-[#f4f7fb] text-[#1b3d6e] hover:bg-[#dde6f0] flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#1DB954] shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Podcasts
          </a>
        </div>

        {/* Topic filters — only shown when there are topics to show */}
        {availableTopics.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4 pb-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 font-[family-name:var(--font-heading)] mr-1">
              Topic:
            </span>
            <button
              onClick={() => setActiveTopic(null)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-semibold font-[family-name:var(--font-heading)] transition-colors border",
                activeTopic === null
                  ? "bg-[#F37021] text-white border-[#F37021]"
                  : "bg-white text-gray-500 border-gray-200 hover:border-[#F37021] hover:text-[#F37021]"
              )}
            >
              All Topics
            </button>
            {availableTopics.map(t => (
              <button
                key={t.slug.current}
                onClick={() => setActiveTopic(t.slug.current)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-semibold font-[family-name:var(--font-heading)] transition-colors border",
                  activeTopic === t.slug.current
                    ? "bg-[#F37021] text-white border-[#F37021]"
                    : "bg-white text-gray-500 border-gray-200 hover:border-[#F37021] hover:text-[#F37021]"
                )}
              >
                {t.title}
              </button>
            ))}
          </div>
        )}
        {availableTopics.length === 0 && <div className="mb-10" />}

        {/* Content */}
        {!hasContent ? (
          <PlaceholderGrid activeTab={activeTab} />
        ) : (
          <LiveContent
            activeTab={activeTab}
            activeTopic={activeTopic}
            articles={articles}
            videos={videos}
            reports={reports}
            trackers={trackers}
          />
        )}
      </div>
    </section>
  );
}

// ─── Live content (when Sanity has data) ─────────────────────────────────────

function LiveContent({ activeTab, activeTopic, articles, videos, reports, trackers }: Props & { activeTab: Tab; activeTopic: string | null }) {
  const showReports  = activeTab === "all" || activeTab === "reports";
  const showTrackers = activeTab === "all" || activeTab === "trackers";
  const showArticles = activeTab === "all" || activeTab === "articles";
  const showVideos   = activeTab === "all" || activeTab === "videos";

  const filteredReports  = reports.filter(r  => matchesTopic(r, activeTopic));
  const filteredTrackers = trackers.filter(t  => matchesTopic(t, activeTopic));
  const filteredArticles = articles.filter(a  => matchesTopic(a, activeTopic));
  const filteredVideos   = videos.filter(v    => matchesTopic(v, activeTopic));

  const nothingVisible =
    (showReports  && filteredReports.length  === 0) &&
    (showTrackers && filteredTrackers.length === 0) &&
    (showArticles && filteredArticles.length === 0) &&
    (showVideos   && filteredVideos.length   === 0);

  if (nothingVisible) {
    return (
      <div className="py-16 text-center text-gray-400">
        <p className="text-sm">No content found for this topic yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-14">
      {showReports && filteredReports.length > 0 && (
        <div>
          {activeTab === "all" && <SectionLabel>Reports</SectionLabel>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredReports.map((r) => <ProductCard key={r._id} item={r} ctaLabel="View Report" href={`/reports/${r.slug.current}`} />)}
          </div>
        </div>
      )}

      {showTrackers && filteredTrackers.length > 0 && (
        <div>
          {activeTab === "all" && <SectionLabel>Trackers</SectionLabel>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredTrackers.map((t) => <ProductCard key={t._id} item={t} ctaLabel="Explore Tracker" href={`/trackers/${t.slug.current}`} />)}
          </div>
        </div>
      )}

      {showArticles && filteredArticles.length > 0 && (
        <div>
          {activeTab === "all" && <SectionLabel>Articles</SectionLabel>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((a) => <ArticleCard key={a._id} article={a} />)}
          </div>
        </div>
      )}

      {showVideos && filteredVideos.length > 0 && (
        <div>
          {activeTab === "all" && <SectionLabel>Videos</SectionLabel>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((v) => <VideoCard key={v._id} video={v} />)}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Placeholder grid (before Sanity content exists) ─────────────────────────

function PlaceholderGrid({ activeTab }: { activeTab: Tab }) {
  const showProducts = activeTab === "all" || activeTab === "reports" || activeTab === "trackers";
  const showEditorial = activeTab === "all" || activeTab === "articles" || activeTab === "videos";

  const filtered = PLACEHOLDER_PRODUCTS.filter((p) =>
    activeTab === "all" ||
    (activeTab === "reports" && p.type === "report") ||
    (activeTab === "trackers" && p.type === "tracker")
  );

  return (
    <div className="space-y-14">
      {showProducts && (
        <div>
          {activeTab === "all" && <SectionLabel>Intelligence Products</SectionLabel>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((p) => (
              <div key={p.id} className="relative rounded-2xl overflow-hidden aspect-[2/3] flex flex-col justify-between bg-[#1b3d6e]">
                <div className={`absolute inset-0 bg-gradient-to-t ${p.bg}/80 to-transparent`} />
                <div className="relative z-10 p-5">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-[#1b3d6e] text-[10px] font-bold font-[family-name:var(--font-heading)] uppercase tracking-wider leading-tight">
                    {p.badge}
                  </span>
                </div>
                <div className="relative z-10 p-5">
                  <p className="text-2xl font-extrabold text-white font-[family-name:var(--font-heading)]">{p.price}</p>
                  <div className="mt-5 w-full py-2.5 rounded-full bg-white text-center text-[#1b3d6e] text-xs font-bold font-[family-name:var(--font-heading)] uppercase tracking-wider">
                    {p.type === "tracker" ? "Explore Tracker" : "View Report"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showEditorial && (activeTab === "articles" || activeTab === "videos") && (
        <EmptyState type={activeTab} />
      )}

      {activeTab === "all" && (
        <EmptyState type="editorial" />
      )}
    </div>
  );
}

function EmptyState({ type }: { type: string }) {
  const labels: Record<string, string> = {
    articles: "articles",
    videos: "videos",
    editorial: "articles and videos",
  };
  return (
    <div className="py-12 text-center text-gray-400">
      <p className="text-sm">No {labels[type] ?? type} published yet — check back soon.</p>
    </div>
  );
}

// ─── Card components ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 font-[family-name:var(--font-heading)]">
      {children}
    </p>
  );
}

function ProductCard({
  item, ctaLabel, href,
}: {
  item: HubReport | HubTracker;
  ctaLabel: string;
  href: string;
}) {
  return (
    <Link href={href} className="group block">
      <div className="relative rounded-2xl overflow-hidden aspect-[2/3] flex flex-col justify-between bg-[#1b3d6e]">
        {item.coverImage?.asset?.url ? (
          <Image
            src={item.coverImage.asset.url}
            alt={item.coverImage.alt || item.title}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="relative z-10 p-5">
          {item.subtitle && (
            <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-[#1b3d6e] text-[10px] font-bold font-[family-name:var(--font-heading)] uppercase tracking-wider leading-tight">
              {item.subtitle}
            </span>
          )}
        </div>
        <div className="relative z-10 p-5">
          <p className="text-2xl font-extrabold text-white font-[family-name:var(--font-heading)]">
            {item.pricePaid ? `£${item.pricePaid}` : "Free"}
          </p>
          <div className="mt-5 w-full py-2.5 rounded-full bg-white text-center text-[#1b3d6e] text-xs font-bold font-[family-name:var(--font-heading)] uppercase tracking-wider group-hover:bg-[#F37021] group-hover:text-white transition-colors">
            {ctaLabel}
          </div>
        </div>
      </div>
    </Link>
  );
}

function ArticleCard({ article }: { article: HubArticle }) {
  return (
    <Link href={`/articles/${article.slug.current}`} className="group block bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-[#f4f7fb]">
        {article.heroImage?.asset?.url ? (
          <Image
            src={article.heroImage.asset.url}
            alt={article.heroImage.alt || article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-[#dde6f0]" />
        )}
      </div>
      <div className="p-5">
        {article.topics && article.topics.length > 0 && (
          <p className="text-[#F37021] text-[10px] font-bold uppercase tracking-wider font-[family-name:var(--font-heading)] mb-2">
            {article.topics[0].title}
          </p>
        )}
        <h3 className="text-base font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] leading-snug line-clamp-2 group-hover:text-[#F37021] transition-colors">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2">{article.excerpt}</p>
        )}
        <div className="mt-4 flex items-center gap-3 text-xs text-gray-400">
          {article.readTime && <span>{article.readTime} min read</span>}
          {article.publishedAt && (
            <span>{new Date(article.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

function VideoCard({ video }: { video: HubVideo }) {
  const mins = video.duration ? Math.floor(video.duration / 60) : null;
  return (
    <Link href={`/videos/${video.slug.current}`} className="group block rounded-2xl overflow-hidden bg-[#1b3d6e] shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-video bg-[#0f2340]">
        {video.thumbnail?.asset?.url ? (
          <Image
            src={video.thumbnail.asset.url}
            alt={video.thumbnail.alt || video.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : null}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-[#F37021] transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 2.5L13 8L4 13.5V2.5Z" fill="#1b3d6e" className="group-hover:fill-white transition-colors" />
            </svg>
          </div>
        </div>
        {mins && (
          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-bold font-[family-name:var(--font-heading)]">
            {mins}m
          </span>
        )}
      </div>
      <div className="p-5">
        {video.topics && video.topics.length > 0 && (
          <p className="text-[#F37021] text-[10px] font-bold uppercase tracking-wider font-[family-name:var(--font-heading)] mb-2">
            {video.topics[0].title}
          </p>
        )}
        <h3 className="text-sm font-extrabold text-white font-[family-name:var(--font-heading)] leading-snug line-clamp-2 group-hover:text-[#F37021] transition-colors">
          {video.title}
        </h3>
        {video.publishedAt && (
          <p className="mt-3 text-xs text-white/40">
            {new Date(video.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </p>
        )}
      </div>
    </Link>
  );
}
