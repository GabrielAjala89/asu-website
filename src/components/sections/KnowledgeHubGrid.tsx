"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

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

interface HubReport {
  _id: string;
  _type: "report";
  title: string;
  slug: { current: string };
  subtitle?: string;
  pricePaid?: number;
  coverImage?: { asset?: { url: string }; alt?: string };
}

interface HubTracker {
  _id: string;
  _type: "tracker";
  title: string;
  slug: { current: string };
  subtitle?: string;
  pricePaid?: number;
  coverImage?: { asset?: { url: string }; alt?: string };
}

type Tab = "all" | "reports" | "trackers" | "articles" | "videos";

interface Props {
  articles: HubArticle[];
  videos: HubVideo[];
  reports: HubReport[];
  trackers: HubTracker[];
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

// ─── Main component ───────────────────────────────────────────────────────────

export function KnowledgeHubGrid({ articles, videos, reports, trackers }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const counts: Record<Tab, number> = {
    all: articles.length + videos.length + reports.length + trackers.length,
    reports: reports.length,
    trackers: trackers.length,
    articles: articles.length,
    videos: videos.length,
  };

  const hasContent = counts.all > 0;

  return (
    <section className="py-14 bg-white min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-6">

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-100 pb-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
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
        </div>

        {/* Content */}
        {!hasContent ? (
          <PlaceholderGrid activeTab={activeTab} />
        ) : (
          <LiveContent
            activeTab={activeTab}
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

function LiveContent({ activeTab, articles, videos, reports, trackers }: Props & { activeTab: Tab }) {
  const showReports  = activeTab === "all" || activeTab === "reports";
  const showTrackers = activeTab === "all" || activeTab === "trackers";
  const showArticles = activeTab === "all" || activeTab === "articles";
  const showVideos   = activeTab === "all" || activeTab === "videos";

  return (
    <div className="space-y-14">
      {showReports && reports.length > 0 && (
        <div>
          {activeTab === "all" && <SectionLabel>Reports</SectionLabel>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reports.map((r) => <ProductCard key={r._id} item={r} ctaLabel="View Report" href={`/reports/${r.slug.current}`} />)}
          </div>
        </div>
      )}

      {showTrackers && trackers.length > 0 && (
        <div>
          {activeTab === "all" && <SectionLabel>Trackers</SectionLabel>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trackers.map((t) => <ProductCard key={t._id} item={t} ctaLabel="Explore Tracker" href={`/trackers/${t.slug.current}`} />)}
          </div>
        </div>
      )}

      {showArticles && articles.length > 0 && (
        <div>
          {activeTab === "all" && <SectionLabel>Articles</SectionLabel>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a) => <ArticleCard key={a._id} article={a} />)}
          </div>
        </div>
      )}

      {showVideos && videos.length > 0 && (
        <div>
          {activeTab === "all" && <SectionLabel>Videos</SectionLabel>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((v) => <VideoCard key={v._id} video={v} />)}
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
                  <div className="mt-3">
                    <p className="text-white text-[10px] font-bold uppercase tracking-wider mb-2 font-[family-name:var(--font-heading)]">Features</p>
                    <ul className="space-y-1">
                      {p.features.map((f) => (
                        <li key={f} className="text-white/80 text-xs flex gap-1.5">
                          <span className="mt-0.5 shrink-0">•</span>{f}
                        </li>
                      ))}
                    </ul>
                  </div>
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
            className="object-cover transition-transform duration-500 group-hover:scale-105"
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
          <h3 className="mt-1 text-sm font-bold text-white/90 font-[family-name:var(--font-heading)] leading-snug line-clamp-2">
            {item.title}
          </h3>
          <div className="mt-5 w-full py-2.5 rounded-full bg-white text-center text-[#1b3d6e] text-xs font-bold font-[family-name:var(--font-heading)] uppercase tracking-wider group-hover:bg-[#F37021] group-hover:text-white transition-colors">
            {ctaLabel}
          </div>
        </div>
      </div>
    </Link>
  );
}

function ArticleCard({ article }: { article: HubArticle }) {
  const isLocked = article.tierRequired && article.tierRequired !== "free";
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
        {isLocked && (
          <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-[#1b3d6e] text-white text-[10px] font-bold font-[family-name:var(--font-heading)] uppercase tracking-wider">
            ASU Insider
          </span>
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
  const isLocked = video.tierRequired && video.tierRequired !== "free";
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
        {isLocked && (
          <span className="absolute top-2 right-2 px-2 py-1 rounded-full bg-[#F37021] text-white text-[10px] font-bold font-[family-name:var(--font-heading)] uppercase tracking-wider">
            ASU Insider
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
