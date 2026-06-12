import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrangeLine } from "@/components/ui/OrangeLine";
import { sanityFetch } from "@/lib/sanity";
import { TRACKER_BY_SLUG_QUERY } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, ArrowLeft, ExternalLink } from "lucide-react";

export const revalidate = 60;

interface Tracker {
  _id: string;
  title: string;
  slug: { current: string };
  subtitle?: string;
  publishedAt?: string;
  description?: string;
  features?: string[];
  pricePaid?: number;
  priceMember?: number;
  stripePaymentLink?: string;
  airtableEmbedFull?: string;
  airtableEmbedSample?: string;
  coverImage?: { asset?: { url: string }; alt?: string };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tracker = await sanityFetch<Tracker>(TRACKER_BY_SLUG_QUERY, { slug }).catch(() => null);
  if (!tracker) return { title: "Tracker | Africa Sports Unified" };
  return {
    title: `${tracker.title} | Africa Sports Unified`,
    description: tracker.description,
  };
}

export default async function TrackerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tracker = await sanityFetch<Tracker>(TRACKER_BY_SLUG_QUERY, { slug }).catch(() => null);

  if (!tracker) notFound();

  // ⚠️ OUTSTANDING: Add the Stripe Payment Link to this tracker in Sanity Studio
  // Go to /studio → Trackers → [this tracker] → "Stripe Payment Link" field
  const buyLink = tracker.stripePaymentLink || "#";

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="relative min-h-[55vh] flex items-end overflow-hidden">
          {tracker.coverImage?.asset?.url ? (
            <>
              <Image
                src={tracker.coverImage.asset.url}
                alt={tracker.coverImage.alt || tracker.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b3d6e]/90 via-[#1b3d6e]/40 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-[#1b3d6e]" />
          )}
          <div className="relative z-10 mx-auto max-w-7xl px-6 w-full pb-16">
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#F37021] text-white text-[10px] font-bold font-[family-name:var(--font-heading)] uppercase tracking-widest">
              Tracker
            </span>
            <OrangeLine />
            <h1 className="mt-3 text-3xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-tight max-w-3xl">
              {tracker.title}
            </h1>
            {tracker.subtitle && (
              <p className="mt-3 text-white/80 text-lg max-w-2xl">{tracker.subtitle}</p>
            )}
          </div>
        </section>

        {/* ── Product overview ──────────────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-3 gap-12">

              {/* Left: description + features */}
              <div className="lg:col-span-2">
                <OrangeLine />
                <h2 className="mt-4 text-2xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                  About this tracker
                </h2>
                {tracker.description && (
                  <p className="mt-4 text-gray-600 leading-relaxed text-[17px]">{tracker.description}</p>
                )}
                {tracker.features && tracker.features.length > 0 && (
                  <ul className="mt-8 space-y-3">
                    {tracker.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <CheckCircle size={18} className="text-[#F37021] mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Right: price + CTA card */}
              <div>
                <div className="bg-[#1b3d6e] rounded-2xl p-8 text-white sticky top-24">
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest font-[family-name:var(--font-heading)] mb-2">
                    One-time access
                  </p>
                  <p className="text-5xl font-extrabold font-[family-name:var(--font-heading)]">
                    {tracker.pricePaid ? `$${tracker.pricePaid}` : "Free"}
                  </p>
                  <p className="mt-2 text-white/60 text-sm">One-time payment — instant access</p>

                  <a
                    href={buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 flex items-center justify-center gap-2 w-full px-6 py-4 rounded-full bg-[#F37021] text-white font-bold font-[family-name:var(--font-heading)] text-sm hover:bg-[#d65a14] transition-colors"
                  >
                    Get Access <ExternalLink size={15} />
                  </a>

                  <p className="mt-4 text-white/50 text-xs text-center">
                    Secure checkout via Stripe
                  </p>

                  <div className="mt-6 pt-6 border-t border-white/10 space-y-2 text-sm text-white/70">
                    <p>✓ Instant access after payment</p>
                    <p>✓ Updated regularly</p>
                    <p>✓ Covers deals across Africa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Sample data embed ─────────────────────────────────────────── */}
        {tracker.airtableEmbedSample && (
          <section className="py-16 bg-[#f4f7fb]">
            <div className="mx-auto max-w-7xl px-6">
              <OrangeLine />
              <h2 className="mt-4 text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-8">
                Sample data preview
              </h2>
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <iframe
                  src={tracker.airtableEmbedSample}
                  style={{ width: "100%", height: "533px", border: "none" }}
                  title="Sample tracker data"
                />
              </div>
            </div>
          </section>
        )}

        {/* ── Back link ─────────────────────────────────────────────────── */}
        <section className="py-10 bg-white border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6">
            <Link href="/knowledge-hub" className="inline-flex items-center gap-2 text-sm text-[#1b3d6e] font-semibold font-[family-name:var(--font-heading)] hover:text-[#F37021] transition-colors">
              <ArrowLeft size={16} /> Back to Knowledge Hub
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
