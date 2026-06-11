import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrangeLine } from "@/components/ui/OrangeLine";
import { Button } from "@/components/ui/Button";
import { sanityFetch } from "@/lib/sanity";
import { ALL_CASE_STUDIES_QUERY } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { Globe, Lock, Map, BarChart2 } from "lucide-react";

export const revalidate = 60;

export const metadata = {
  title: "Consulting | Africa Sports Unified",
  description: "ASU Advisory — strategic counsel for the organisations shaping Africa's sports economy.",
};

interface CaseStudy {
  _id: string;
  title: string;
  clientName?: string;
  summary?: string;
  documentUrl?: string;
  clientLogo?: { asset?: { url: string }; alt?: string };
}

export default async function ConsultPage() {
  const caseStudies = await sanityFetch<CaseStudy[]>(ALL_CASE_STUDIES_QUERY).catch(() => []);
  const primaryCase = (caseStudies as CaseStudy[])?.[0];

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section>
          {/* Cream subtitle strip (navbar overlays this) */}
          <div className="bg-[#faf3e7] pt-20 pb-6 text-center px-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 font-[family-name:var(--font-heading)]">
              Turn Sport Into Economic Value
            </p>
          </div>
          {/* Full-bleed image */}
          <div className="relative h-[65vh] min-h-[420px]">
            <Image
              src="/images/consult-hero.jpg"
              alt="ASU Consulting"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full px-6 pb-14 lg:px-16 lg:pb-20 max-w-4xl">
              <h1 className="text-3xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-tight">
                Using Sport as a driver for economic growth, investment, and long-term value.
              </h1>
              <div className="mt-8">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1b3d6e] text-white text-sm font-bold font-[family-name:var(--font-heading)] hover:bg-[#122a4b] transition-colors"
                >
                  Work with ASU →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Who We Work With ─────────────────────────────────────────────── */}
        <section className="py-20 bg-[#faf3e7]">
          <div className="mx-auto max-w-7xl px-6">
            <OrangeLine />
            <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
              Who We Work With
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
              We partner with leaders in both the public and private sector who are using sport as a lever for growth, investment, and national development.
            </p>

            <div className="mt-10 grid md:grid-cols-2 gap-6">
              {/* Public Sector */}
              <div className="rounded-2xl bg-[#F37021] p-12 flex flex-col items-center justify-center text-center min-h-[260px]">
                <Globe size={48} className="text-white" strokeWidth={1.5} />
                <h3 className="mt-6 text-2xl font-extrabold text-white font-[family-name:var(--font-heading)]">
                  Public Sector
                </h3>
                <p className="mt-3 text-white/85 text-sm leading-relaxed max-w-sm">
                  Governments, ministries, national sports federations, development agencies, and multilateral institutions shaping sport policy and infrastructure.
                </p>
              </div>
              {/* Private Sector */}
              <div className="rounded-2xl bg-[#1b3d6e] p-12 flex flex-col items-center justify-center text-center min-h-[260px]">
                <Lock size={48} className="text-white" strokeWidth={1.5} />
                <h3 className="mt-6 text-2xl font-extrabold text-white font-[family-name:var(--font-heading)]">
                  Private Sector
                </h3>
                <p className="mt-3 text-white/85 text-sm leading-relaxed max-w-sm">
                  Investors, brands, media companies, leagues, clubs, and sponsors seeking to enter, expand, or deepen their position in Africa&apos;s sports economy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── What We Offer ────────────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <OrangeLine />
            <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
              What We Offer
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
              Our advisory work spans two core disciplines — strategic guidance and data-driven intelligence.
            </p>

            <div className="mt-10 grid md:grid-cols-2 gap-6">
              {/* Advisory & Roadmapping */}
              <div className="rounded-2xl bg-[#F37021] p-12 flex flex-col items-center justify-center text-center min-h-[260px]">
                <Map size={48} className="text-white" strokeWidth={1.5} />
                <h3 className="mt-6 text-2xl font-extrabold text-white font-[family-name:var(--font-heading)]">
                  Advisory &amp; Roadmapping
                </h3>
                <p className="mt-3 text-white/85 text-sm leading-relaxed max-w-sm">
                  Strategic counsel to help you navigate market entry, institutional reform, sponsorship strategy, and event or bid planning with clarity and confidence.
                </p>
              </div>
              {/* Decision Support */}
              <div className="rounded-2xl bg-[#1b3d6e] p-12 flex flex-col items-center justify-center text-center min-h-[260px]">
                <BarChart2 size={48} className="text-white" strokeWidth={1.5} />
                <h3 className="mt-6 text-xl font-extrabold text-white font-[family-name:var(--font-heading)]">
                  Decision Support &amp; Market Intelligence
                </h3>
                <p className="mt-3 text-white/85 text-sm leading-relaxed max-w-sm">
                  Bespoke research, sector mapping, deal intelligence, and data analysis that gives investors and institutions the information edge they need.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Who We Have Worked With ──────────────────────────────────────── */}
        <section className="py-20 bg-[#f4f7fb]">
          <div className="mx-auto max-w-7xl px-6">
            <OrangeLine />
            <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
              Who we have worked with
            </h2>

            <div className="mt-12 flex flex-col md:flex-row items-center gap-12">
              {/* Logo */}
              <div className="shrink-0">
                {primaryCase?.clientLogo?.asset?.url ? (
                  <div className="relative w-48 h-28">
                    <Image
                      src={primaryCase.clientLogo.asset.url}
                      alt={primaryCase.clientLogo.alt || primaryCase.clientName || "Client"}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="relative w-52 h-32">
                    <Image
                      src="/images/uneca-logo.png"
                      alt="United Nations Economic Commission for Africa"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
              {/* Text */}
              <div className="flex-1 max-w-2xl">
                <h3 className="text-lg font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                  {primaryCase?.title || "United Nations Economic Commission for Africa (UNECA)"}
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {primaryCase?.summary ||
                    "ASU supported UNECA in developing a sport and economic development framework for the African continent, providing strategic intelligence and market analysis to inform policy recommendations across member states."}
                </p>
                <div className="mt-6">
                  <Link
                    href={primaryCase?.documentUrl || "#"}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#1b3d6e] text-white text-sm font-bold font-[family-name:var(--font-heading)] hover:bg-[#122a4b] transition-colors"
                  >
                    View Case Study →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Let's Talk ──────────────────────────────────────────────────── */}
        <section id="contact" className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div>
                <OrangeLine />
                <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] leading-tight">
                  Let&apos;s Talk
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  If you&apos;re looking for strategic counsel, a trusted intelligence partner, or simply want to explore how ASU Advisory can support your objectives — we&apos;d welcome the conversation.
                </p>
                <div className="mt-8">
                  <Button href="mailto:info@asunified.com" variant="secondary" size="lg">
                    Work with ASU →
                  </Button>
                </div>
              </div>
              {/* Right */}
              <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden">
                <Image
                  src="/images/consult-cta-bg.jpg"
                  alt="ASU consulting team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
