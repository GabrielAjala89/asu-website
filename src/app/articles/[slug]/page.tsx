import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrangeLine } from "@/components/ui/OrangeLine";
import { sanityFetch } from "@/lib/sanity";
import { ARTICLE_BY_SLUG_QUERY, ALL_ARTICLES_QUERY } from "@/lib/queries";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { ShareBar } from "@/components/ui/ShareBar";

export const revalidate = 60;

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  readTime?: number;
  excerpt?: string;
  tierRequired?: string;
  body?: unknown[];
  heroImage?: { asset?: { url: string }; alt?: string };
  author?: { name: string; role?: string; organisation?: string; photo?: { asset?: { url: string } } };
  topics?: { title: string; slug: { current: string } }[];
}

interface RelatedArticle {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  readTime?: number;
  excerpt?: string;
  heroImage?: { asset?: { url: string }; alt?: string };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await sanityFetch<Article>(ARTICLE_BY_SLUG_QUERY, { slug }).catch(() => null);
  if (!article) return { title: "Article" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

const portableComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-10 mb-4 text-2xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-8 mb-3 text-xl font-bold text-[#1b3d6e] font-[family-name:var(--font-heading)]">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="mt-6 mb-2 text-lg font-bold text-[#1b3d6e] font-[family-name:var(--font-heading)]">{children}</h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-5 text-gray-700 leading-relaxed text-[17px]">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-6 pl-5 border-l-4 border-[#F37021] italic text-gray-600 text-lg">{children}</blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: { children?: React.ReactNode; value?: { href: string; blank?: boolean } }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-[#F37021] underline underline-offset-2 hover:text-[#1b3d6e] transition-colors"
      >
        {children}
      </a>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
  },
  types: {
    youtubeEmbed: ({ value }: { value: { url?: string; caption?: string } }) => {
      const id = value.url?.match(/(?:v=|youtu\.be\/)([^&?/]+)/)?.[1];
      if (!id) return null;
      return (
        <div className="my-8">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${id}`}
              title={value.caption ?? "YouTube video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
          {value.caption && <p className="mt-2 text-sm text-gray-500 text-center italic">{value.caption}</p>}
        </div>
      );
    },
    promoBanner: ({ value }: { value: { image?: { asset?: { url: string }; alt?: string }; title?: string; description?: string; linkUrl?: string; linkText?: string } }) => (
      <div className="my-8 rounded-2xl overflow-hidden border border-gray-200 flex flex-col sm:flex-row">
        {value.image?.asset?.url && (
          <div className="relative sm:w-56 h-40 sm:h-auto shrink-0">
            <Image src={value.image.asset.url} alt={value.image.alt ?? value.title ?? ""} fill className="object-cover" />
          </div>
        )}
        <div className="p-6 flex flex-col justify-center gap-3">
          {value.title && <p className="font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] text-lg leading-snug">{value.title}</p>}
          {value.description && <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>}
          {value.linkUrl && (
            <a href={value.linkUrl} target="_blank" rel="noopener noreferrer"
              className="self-start px-5 py-2.5 rounded-full bg-[#F37021] text-white text-sm font-bold font-[family-name:var(--font-heading)] hover:bg-[#d65a14] transition-colors">
              {value.linkText ?? "Listen Now"} →
            </a>
          )}
        </div>
      </div>
    ),
    articleTable: ({ value }: { value: { tableTitle?: string; col1Header?: string; col2Header?: string; col3Header?: string; col4Header?: string; rows?: { col1?: string; col2?: string; col3?: string; col4?: string; _key?: string }[] } }) => {
      const headers = [value.col1Header, value.col2Header, value.col3Header, value.col4Header].filter(Boolean);
      return (
        <div className="overflow-x-auto my-8">
          {value.tableTitle && <p className="mb-2 text-sm font-bold text-[#1b3d6e] font-[family-name:var(--font-heading)]">{value.tableTitle}</p>}
          <table className="w-full border-collapse text-sm rounded-xl overflow-hidden border border-gray-200">
            <thead>
              <tr className="bg-[#1b3d6e] text-white">
                {headers.map((h, i) => <th key={i} className="px-5 py-3 text-left font-bold font-[family-name:var(--font-heading)] text-xs uppercase tracking-wider">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {value.rows?.map((row, i) => {
                const cells = [row.col1, row.col2, row.col3, row.col4].slice(0, headers.length);
                return (
                  <tr key={row._key ?? i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f4f7fb]'}>
                    {cells.map((c, j) => <td key={j} className="px-5 py-3 border-b border-gray-100 text-gray-700">{c}</td>)}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    },
  },
};

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [article, allArticles] = await Promise.all([
    sanityFetch<Article>(ARTICLE_BY_SLUG_QUERY, { slug }).catch(() => null),
    sanityFetch<RelatedArticle[]>(ALL_ARTICLES_QUERY).catch(() => []),
  ]);

  if (!article || !article.title || article.title === "500 | Server Error") notFound();

  const related = (allArticles as RelatedArticle[])
    .filter(a => a.slug.current !== slug)
    .slice(0, 3);

  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "";

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        {article.heroImage?.asset?.url ? (
          <section className="relative h-[55vh] min-h-[360px] flex items-end overflow-hidden">
            <Image
              src={article.heroImage.asset.url}
              alt={article.heroImage.alt || article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b3d6e]/85 via-[#1b3d6e]/30 to-transparent" />
            <div className="relative z-10 mx-auto max-w-4xl px-6 w-full pb-12">
              <OrangeLine />
              <h1 className="mt-3 text-3xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-tight">
                {article.title}
              </h1>
            </div>
          </section>
        ) : (
          <section className="bg-[#1b3d6e] pt-24 pb-12">
            <div className="mx-auto max-w-4xl px-6">
              <OrangeLine />
              <h1 className="mt-3 text-3xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-tight">
                {article.title}
              </h1>
            </div>
          </section>
        )}

        {/* ── Article body ──────────────────────────────────────────────── */}
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-4xl px-6">

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-5 pb-8 border-b border-gray-100 mb-8">
              {article.author && (
                <div className="flex items-center gap-3">
                  {article.author.photo?.asset?.url && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                      <Image src={article.author.photo.asset.url} alt={article.author.name} fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold text-[#1b3d6e] font-[family-name:var(--font-heading)]">{article.author.name}</p>
                    {article.author.role && <p className="text-xs text-gray-500">{article.author.role}</p>}
                  </div>
                </div>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-400 ml-auto">
                {publishedDate && (
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} /> {publishedDate}
                  </span>
                )}
                {article.readTime && (
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} /> {article.readTime} min read
                  </span>
                )}
              </div>
            </div>

            {/* Topics + share (top) */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              {article.topics && article.topics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.topics.map(t => (
                    <span key={t.slug.current} className="px-3 py-1 rounded-full bg-[#f4f7fb] text-[#1b3d6e] text-xs font-semibold font-[family-name:var(--font-heading)]">
                      {t.title}
                    </span>
                  ))}
                </div>
              )}
              <ShareBar title={article.title} />
            </div>

            {/* Body */}
            {article.body && article.body.length > 0 ? (
              <div className="prose-none">
                {/* @ts-expect-error portabletext types */}
                <PortableText value={article.body} components={portableComponents} />
              </div>
            ) : (
              article.excerpt && <p className="text-gray-700 leading-relaxed text-lg">{article.excerpt}</p>
            )}

            {/* Share (bottom) + back links */}
            <div className="mt-14 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-sm font-semibold font-[family-name:var(--font-heading)]">
                <Link href="/knowledge-hub?tab=articles" className="inline-flex items-center gap-2 text-[#1b3d6e] hover:text-[#F37021] transition-colors">
                  <ArrowLeft size={16} /> Back to Articles
                </Link>
                <span className="text-gray-200">|</span>
                <Link href="/knowledge-hub" className="text-gray-400 hover:text-[#1b3d6e] transition-colors">
                  Knowledge Hub
                </Link>
              </div>
              <ShareBar title={article.title} />
            </div>
          </div>
        </section>

        {/* ── Related articles ──────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="py-16 bg-[#f4f7fb]">
            <div className="mx-auto max-w-7xl px-6">
              <OrangeLine />
              <h2 className="mt-4 text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-8">
                More from the Knowledge Hub
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map(a => (
                  <Link key={a._id} href={`/articles/${a.slug.current}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    {a.heroImage?.asset?.url && (
                      <div className="relative h-44 overflow-hidden">
                        <Image src={a.heroImage.asset.url} alt={a.heroImage.alt || a.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-5">
                      <p className="text-xs text-gray-400 mb-2">{a.publishedAt ? new Date(a.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : ""}</p>
                      <h3 className="text-sm font-bold text-[#1b3d6e] font-[family-name:var(--font-heading)] leading-snug group-hover:text-[#F37021] transition-colors line-clamp-3">
                        {a.title}
                      </h3>
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
