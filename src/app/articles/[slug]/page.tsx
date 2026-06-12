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
  if (!article) return { title: "Article | Africa Sports Unified" };
  return {
    title: `${article.title} | Africa Sports Unified`,
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

            {/* Topics */}
            {article.topics && article.topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {article.topics.map(t => (
                  <span key={t.slug.current} className="px-3 py-1 rounded-full bg-[#f4f7fb] text-[#1b3d6e] text-xs font-semibold font-[family-name:var(--font-heading)]">
                    {t.title}
                  </span>
                ))}
              </div>
            )}

            {/* Body */}
            {article.body && article.body.length > 0 ? (
              <div className="prose-none">
                {/* @ts-expect-error portabletext types */}
                <PortableText value={article.body} components={portableComponents} />
              </div>
            ) : (
              article.excerpt && <p className="text-gray-700 leading-relaxed text-lg">{article.excerpt}</p>
            )}

            {/* Back link */}
            <div className="mt-14 pt-8 border-t border-gray-100">
              <Link href="/knowledge-hub" className="inline-flex items-center gap-2 text-sm text-[#1b3d6e] font-semibold font-[family-name:var(--font-heading)] hover:text-[#F37021] transition-colors">
                <ArrowLeft size={16} /> Back to Knowledge Hub
              </Link>
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
