import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrangeLine } from "@/components/ui/OrangeLine";
import { sanityFetch } from "@/lib/sanity";
import { REPORT_BY_SLUG_QUERY } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { DownloadForm } from "@/components/ui/DownloadForm";

export const revalidate = 60;

interface Report {
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
  emailGateUrl?: string;
  pdfFreeUrl?: string;
  pdfFullUrl?: string;
  coverImage?: { asset?: { url: string }; alt?: string };
  topics?: { title: string; slug: { current: string } }[];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = await sanityFetch<Report>(REPORT_BY_SLUG_QUERY, { slug }).catch(() => null);
  if (!report) return { title: "Report" };
  return {
    title: report.title,
    description: report.description,
  };
}

export default async function ReportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = await sanityFetch<Report>(REPORT_BY_SLUG_QUERY, { slug }).catch(() => null);

  if (!report) notFound();

  const isFree = !report.pricePaid;
  const buyLink = report.stripePaymentLink || "#";
  const publishedYear = report.publishedAt ? new Date(report.publishedAt).getFullYear() : null;

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="relative min-h-[60vh] flex items-end overflow-hidden">
          {report.coverImage?.asset?.url ? (
            <>
              <Image
                src={report.coverImage.asset.url}
                alt={report.coverImage.alt || report.title}
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
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[#F37021] text-white text-[10px] font-bold font-[family-name:var(--font-heading)] uppercase tracking-widest">
                Report
              </span>
              {publishedYear && (
                <span className="text-white/60 text-sm font-[family-name:var(--font-heading)]">
                  {publishedYear}
                </span>
              )}
            </div>
            <OrangeLine />
            <h1 className="mt-3 text-3xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-tight max-w-3xl">
              {report.title}
            </h1>
            {report.subtitle && (
              <p className="mt-3 text-white/80 text-lg max-w-2xl">{report.subtitle}</p>
            )}
          </div>
        </section>

        {/* ── Report overview ───────────────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-3 gap-12">

              {/* Left: description + what's inside */}
              <div className="lg:col-span-2">
                {report.topics && report.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {report.topics.map(t => (
                      <span key={t.slug.current} className="px-3 py-1 rounded-full bg-[#f4f7fb] text-[#1b3d6e] text-xs font-semibold font-[family-name:var(--font-heading)]">
                        {t.title}
                      </span>
                    ))}
                  </div>
                )}

                <OrangeLine />
                <h2 className="mt-4 text-2xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                  About this report
                </h2>
                {report.description && (
                  <p className="mt-4 text-gray-600 leading-relaxed text-[17px]">{report.description}</p>
                )}

                {report.features && report.features.length > 0 && (
                  <>
                    <h3 className="mt-10 mb-4 text-lg font-bold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                      What&apos;s inside
                    </h3>
                    <ul className="space-y-3">
                      {report.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700">
                          <CheckCircle size={18} className="text-[#F37021] mt-0.5 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Free preview — only shown for paid reports with a sample, not for email-gated free reports */}
                {report.pdfFreeUrl && !report.emailGateUrl && (
                  <div className="mt-10 p-6 rounded-2xl bg-[#f4f7fb] border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText size={20} className="text-[#1b3d6e]" />
                      <p className="font-bold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                        Free preview available
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      Read the executive summary before purchasing.
                    </p>
                    <a
                      href={report.pdfFreeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#1b3d6e] text-[#1b3d6e] text-sm font-bold font-[family-name:var(--font-heading)] hover:bg-[#1b3d6e] hover:text-white transition-colors"
                    >
                      Download preview <ExternalLink size={14} />
                    </a>
                  </div>
                )}
              </div>

              {/* Right: price + CTA card */}
              <div>
                <div className="bg-[#1b3d6e] rounded-2xl p-8 text-white sticky top-24">
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest font-[family-name:var(--font-heading)] mb-2">
                    Full report
                  </p>
                  <p className="text-5xl font-extrabold font-[family-name:var(--font-heading)]">
                    {isFree ? "Free" : `£${report.pricePaid}`}
                  </p>
                  <p className="mt-2 text-white/60 text-sm">
                    {isFree ? "Free — enter your details to download" : "One-time payment — instant PDF access"}
                  </p>

                  {isFree ? (
                    <div className="mt-8">
                      <DownloadForm
                        contentTitle={report.title}
                        contentType="report"
                        pdfUrl={report.pdfFreeUrl}
                      />
                    </div>
                  ) : (
                    <>
                      <a
                        href={buyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 flex items-center justify-center gap-2 w-full px-6 py-4 rounded-full bg-[#F37021] text-white font-bold font-[family-name:var(--font-heading)] text-sm hover:bg-[#d65a14] transition-colors"
                      >
                        Buy Report <ExternalLink size={15} />
                      </a>
                      <p className="mt-4 text-white/50 text-xs text-center">
                        Secure checkout via Stripe
                      </p>
                    </>
                  )}

                  <div className="mt-6 pt-6 border-t border-white/10 space-y-2 text-sm text-white/70">
                    {isFree ? (
                      <>
                        <p>✓ Delivered to your inbox instantly</p>
                        <p>✓ Written by ASU analysts</p>
                        <p>✓ Data-backed, Africa-focused</p>
                      </>
                    ) : (
                      <>
                        <p>✓ Instant PDF download after payment</p>
                        <p>✓ Written by ASU analysts</p>
                        <p>✓ Data-backed, Africa-focused</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Back links ────────────────────────────────────────────────── */}
        <section className="py-10 bg-white border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6 flex items-center gap-4 text-sm font-semibold font-[family-name:var(--font-heading)]">
            <Link href="/knowledge-hub?tab=reports" className="inline-flex items-center gap-2 text-[#1b3d6e] hover:text-[#F37021] transition-colors">
              <ArrowLeft size={16} /> Back to Reports
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
