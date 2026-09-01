import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrangeLine } from "@/components/ui/OrangeLine";
import { sanityFetch } from "@/lib/sanity";
import { VIDEO_BY_SLUG_QUERY, ALL_VIDEOS_QUERY } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, CheckCircle } from "lucide-react";
import { ShareBar } from "@/components/ui/ShareBar";

export const revalidate = 60;

interface Video {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  duration?: string;
  youtubeUrl?: string;
  description?: string;
  keyTakeaways?: string[];
  tierRequired?: string;
  thumbnail?: { asset?: { url: string }; alt?: string };
  author?: { name: string; role?: string; organisation?: string; photo?: { asset?: { url: string } } };
  topics?: { title: string; slug: { current: string } }[];
}

interface RelatedVideo {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  duration?: string;
  thumbnail?: { asset?: { url: string }; alt?: string };
}

function parseInline(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={i} className="font-semibold text-[#1b3d6e] font-[family-name:var(--font-heading)]">{bold[1]}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer" className="text-[#1b3d6e] underline underline-offset-2 hover:text-[#F37021] transition-colors">{link[1]}</a>;
    return part;
  });
}

function renderDescription(text: string): React.ReactNode {
  const blocks = text.split('\n\n');
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        const lines = block.split('\n');
        const listLines = lines.filter(l => l.startsWith('- '));
        const headerLines = lines.filter(l => !l.startsWith('- '));
        if (listLines.length > 0) {
          return (
            <div key={i}>
              {headerLines.map((line, j) => (
                <p key={j} className="text-gray-700 leading-relaxed text-[17px] mb-3">{parseInline(line)}</p>
              ))}
              <ul className="space-y-2">
                {listLines.map((line, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <span className="text-[#F37021] shrink-0 mt-1 text-sm leading-relaxed">•</span>
                    <span className="text-gray-700 leading-relaxed text-[16px]">{parseInline(line.slice(2))}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        return <p key={i} className="text-gray-700 leading-relaxed text-[17px]">{parseInline(block)}</p>;
      })}
    </div>
  );
}

function youtubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const id =
      parsed.searchParams.get("v") ||
      (parsed.hostname === "youtu.be" ? parsed.pathname.slice(1) : null);
    return id ? `https://www.youtube.com/embed/${id}?rel=0` : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const video = await sanityFetch<Video>(VIDEO_BY_SLUG_QUERY, { slug }).catch(() => null);
  if (!video) return { title: "Video" };
  return {
    title: video.title,
    description: video.description,
  };
}

export default async function VideoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [video, allVideos] = await Promise.all([
    sanityFetch<Video>(VIDEO_BY_SLUG_QUERY, { slug }).catch(() => null),
    sanityFetch<RelatedVideo[]>(ALL_VIDEOS_QUERY).catch(() => []),
  ]);

  if (!video || !video.title) notFound();

  const related = (allVideos as RelatedVideo[])
    .filter(v => v.slug.current !== slug)
    .slice(0, 3);

  const embedUrl = video.youtubeUrl ? youtubeEmbedUrl(video.youtubeUrl) : null;

  const publishedDate = video.publishedAt
    ? new Date(video.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "";

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        {video.thumbnail?.asset?.url ? (
          <section className="relative h-[55vh] min-h-[360px] flex items-end overflow-hidden">
            <Image
              src={video.thumbnail.asset.url}
              alt={video.thumbnail.alt || video.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b3d6e]/85 via-[#1b3d6e]/30 to-transparent" />
            <div className="relative z-10 mx-auto max-w-4xl px-6 w-full pb-12">
              <OrangeLine />
              <h1 className="mt-3 text-3xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-tight">
                {video.title}
              </h1>
            </div>
          </section>
        ) : (
          <section className="bg-[#1b3d6e] pt-24 pb-12">
            <div className="mx-auto max-w-4xl px-6">
              <OrangeLine />
              <h1 className="mt-3 text-3xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-tight">
                {video.title}
              </h1>
            </div>
          </section>
        )}

        {/* ── Video body ────────────────────────────────────────────────── */}
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-4xl px-6">

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-5 pb-8 border-b border-gray-100 mb-8">
              {video.author && (
                <div className="flex items-center gap-3">
                  {video.author.photo?.asset?.url && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                      <Image src={video.author.photo.asset.url} alt={video.author.name} fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold text-[#1b3d6e] font-[family-name:var(--font-heading)]">{video.author.name}</p>
                    {video.author.role && <p className="text-xs text-gray-500">{video.author.role}</p>}
                  </div>
                </div>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-400 ml-auto">
                {publishedDate && (
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} /> {publishedDate}
                  </span>
                )}
                {video.duration && (
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} /> {video.duration}
                  </span>
                )}
              </div>
            </div>

            {/* Topics + share (top) */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              {video.topics && video.topics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {video.topics.map(t => (
                    <span key={t.slug.current} className="px-3 py-1 rounded-full bg-[#f4f7fb] text-[#1b3d6e] text-xs font-semibold font-[family-name:var(--font-heading)]">
                      {t.title}
                    </span>
                  ))}
                </div>
              )}
              <ShareBar title={video.title} />
            </div>

            {/* YouTube embed */}
            {embedUrl ? (
              <div className="rounded-2xl overflow-hidden aspect-video w-full bg-black mb-10">
                <iframe
                  src={embedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : video.youtubeUrl ? (
              <div className="mb-10">
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#1b3d6e] text-white text-sm font-bold font-[family-name:var(--font-heading)] hover:bg-[#F37021] transition-colors"
                >
                  Watch on YouTube
                </a>
              </div>
            ) : null}

            {/* Description */}
            {video.description && (
              <div className="mb-10">{renderDescription(video.description)}</div>
            )}

            {/* Key takeaways */}
            {video.keyTakeaways && video.keyTakeaways.length > 0 && (
              <div className="bg-[#f4f7fb] rounded-2xl p-6 mb-10">
                <h2 className="text-base font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-4">
                  Key takeaways
                </h2>
                <ul className="space-y-3">
                  {video.keyTakeaways.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-[#F37021] shrink-0 mt-0.5" />
                      <span className="text-gray-700 leading-relaxed text-[15px]">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Share (bottom) + back links */}
            <div className="mt-6 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-sm font-semibold font-[family-name:var(--font-heading)]">
                <Link href="/knowledge-hub?tab=videos" className="inline-flex items-center gap-2 text-[#1b3d6e] hover:text-[#F37021] transition-colors">
                  <ArrowLeft size={16} /> Back to Videos
                </Link>
                <span className="text-gray-200">|</span>
                <Link href="/knowledge-hub" className="text-gray-400 hover:text-[#1b3d6e] transition-colors">
                  Knowledge Hub
                </Link>
              </div>
              <ShareBar title={video.title} />
            </div>
          </div>
        </section>

        {/* ── Related videos ────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="py-16 bg-[#f4f7fb]">
            <div className="mx-auto max-w-7xl px-6">
              <OrangeLine />
              <h2 className="mt-4 text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-8">
                More from the Knowledge Hub
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map(v => (
                  <Link key={v._id} href={`/videos/${v.slug.current}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative aspect-video bg-[#0f2340]">
                      {v.thumbnail?.asset?.url && (
                        <Image src={v.thumbnail.asset.url} alt={v.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      )}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-[#F37021] transition-colors">
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M4 2.5L13 8L4 13.5V2.5Z" fill="#1b3d6e" className="group-hover:fill-white transition-colors" />
                          </svg>
                        </div>
                      </div>
                      {v.duration && (
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-bold font-[family-name:var(--font-heading)]">
                          {v.duration}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-sm font-bold text-[#1b3d6e] font-[family-name:var(--font-heading)] leading-snug group-hover:text-[#F37021] transition-colors line-clamp-3">
                        {v.title}
                      </h3>
                      {v.publishedAt && (
                        <p className="mt-2 text-xs text-gray-400">
                          {new Date(v.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  );
}
