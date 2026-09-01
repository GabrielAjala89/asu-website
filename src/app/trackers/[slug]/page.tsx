import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrangeLine } from "@/components/ui/OrangeLine";
import { sanityFetch } from "@/lib/sanity";
import { TRACKER_BY_SLUG_QUERY } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, ArrowLeft, ExternalLink } from "lucide-react";
import { DownloadForm } from "@/components/ui/DownloadForm";

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
  if (!tracker) return { title: "Tracker" };
  return {
    title: tracker.title,
    description: tracker.description,
  };
}

export default async function TrackerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tracker = await sanityFetch<Tracker>(TRACKER_BY_SLUG_QUERY, { slug }).catch(() => null);

  if (!tracker) notFound();

  const buyLink = tracker.stripePaymentLink || "#";

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="relative min-h-[60vh] flex items-end overflow-hidden">
          {tracker.coverImage?.asset?.url ? (
            <>
              <Image
                src={tracker.coverImage.asset.url}
                alt={tracker.coverImage.alt || tracker.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b3d6e]/90 via-[#1b3d6e]/50 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-[#1b3d6e]" />
          )}
          <div className="relative z-10 mx-auto max-w-7xl px-6 w-full pb-16 pt-28">
            <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#F37021] text-white text-[10px] font-bold font-[family-name:var(--font-heading)] uppercase tracking-widest">
              Tracker
            </span>
            <OrangeLine />
            <h1 className="mt-3 text-3xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-tight max-w-4xl">
              {tracker.subtitle || tracker.title}
            </h1>
            {tracker.description && (
              <p className="mt-4 text-white/80 text-lg max-w-2xl leading-relaxed">
                {tracker.description}
              </p>
            )}
            <a
              href={buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#F37021] text-white font-bold font-[family-name:var(--font-heading)] text-sm hover:bg-[#d65a14] transition-colors"
            >
              Access the Full Tracker <ExternalLink size={15} />
            </a>
          </div>
        </section>

        {/* ── Problem / Solution ────────────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid md:grid-cols-2 gap-8">

              <div className="bg-[#f4f7fb] rounded-2xl p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#F37021] font-[family-name:var(--font-heading)] mb-3">
                  The Problem
                </p>
                <OrangeLine />
                <p className="mt-4 text-gray-700 leading-relaxed text-[17px]">
                  Africa&apos;s sports market is growing, but fragmented and underreported deal activity limits visibility, leaving decision-makers without the structured data needed to act strategically.
                </p>
              </div>

              <div className="bg-[#1b3d6e] rounded-2xl p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#F37021] font-[family-name:var(--font-heading)] mb-3">
                  The Solution
                </p>
                <OrangeLine />
                <p className="mt-4 text-white/85 leading-relaxed text-[17px]">
                  The ASU Deals Tracker provides a centralised, structured database of sports deals across Africa, enabling you to track, analyse, and benchmark commercial activity across the continent.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── What's inside + price card ────────────────────────────────── */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-3 gap-12">

              {/* Left: what's inside */}
              <div className="lg:col-span-2">
                <OrangeLine />
                <h2 className="mt-4 text-2xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                  What&apos;s inside the tracker
                </h2>
                {tracker.features && tracker.features.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {tracker.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <CheckCircle size={18} className="text-[#F37021] mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Who it's for */}
                <div className="mt-10">
                  <OrangeLine />
                  <h3 className="mt-4 text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                    Built for
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {["Investors", "Rights Holders", "Brands & Sponsors", "Policymakers", "Sports Agencies", "Consultants"].map(role => (
                      <span key={role} className="px-4 py-2 rounded-full bg-[#f4f7fb] text-[#1b3d6e] text-sm font-semibold font-[family-name:var(--font-heading)]">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: price card */}
              <div>
                <div className="bg-[#1b3d6e] rounded-2xl p-8 text-white sticky top-24">
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest font-[family-name:var(--font-heading)] mb-2">
                    Full access
                  </p>
                  <p className="text-5xl font-extrabold font-[family-name:var(--font-heading)]">
                    {tracker.pricePaid ? `£${tracker.pricePaid}` : "Free"}
                  </p>
                  <p className="mt-2 text-white/60 text-sm">Annual subscription — instant access</p>

                  <a
                    href={buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 flex items-center justify-center gap-2 w-full px-6 py-4 rounded-full bg-[#F37021] text-white font-bold font-[family-name:var(--font-heading)] text-sm hover:bg-[#d65a14] transition-colors"
                  >
                    Access the Full Tracker <ExternalLink size={15} />
                  </a>

                  <p className="mt-4 text-white/50 text-xs text-center">
                    Secure checkout via Stripe
                  </p>

                  <div className="mt-6 pt-6 border-t border-white/10 space-y-2 text-sm text-white/70">
                    <p>✓ Structured, decision-ready data</p>
                    <p>✓ Continuously updated</p>
                    <p>✓ Covers deals across Africa</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Sample request ────────────────────────────────────────────── */}
        <section className="py-16 bg-[#f4f7fb]">
          <div className="mx-auto max-w-xl px-6">
            <OrangeLine />
            <h2 className="mt-4 text-2xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-2">
              Request a Free Sample
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              See the data before you commit. Enter your details and we&apos;ll send you a sample of the tracker — a structured, decision-ready snapshot of commercial activity across Africa&apos;s sports market.
            </p>
            <div className="bg-[#1b3d6e] rounded-2xl p-8">
              <DownloadForm
                contentTitle={tracker.title}
                contentType="tracker"
                stripeLink={tracker.stripePaymentLink}
              />
            </div>
          </div>
        </section>

        {/* ── Sample data embed ─────────────────────────────────────────── */}
        {tracker.airtableEmbedSample && (
          <section className="py-16 bg-[#f4f7fb]">
            <div className="mx-auto max-w-7xl px-6">
              <OrangeLine />
              <h2 className="mt-4 text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-2">
                Free sample
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Preview a snapshot of the tracker before purchasing.
              </p>
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

        {/* ── Back links ────────────────────────────────────────────────── */}
        <section className="py-10 bg-white border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6 flex items-center gap-4 text-sm font-semibold font-[family-name:var(--font-heading)]">
            <Link href="/knowledge-hub?tab=trackers" className="inline-flex items-center gap-2 text-[#1b3d6e] hover:text-[#F37021] transition-colors">
              <ArrowLeft size={16} /> Back to Trackers
            </Link>
            <span className="text-gray-200">|</span>
            <Link href="/knowledge-hub" className="text-gray-400 hover:text-[#1b3d6e] transition-colors">
              Knowledge Hub
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
