import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrangeLine } from "@/components/ui/OrangeLine";
import { Button } from "@/components/ui/Button";
import { sanityFetch } from "@/lib/sanity";
import { ALL_CASE_STUDIES_QUERY } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { Map, BarChart2 } from "lucide-react";

export const revalidate = 60;

export const metadata = {
  title: "Consulting",
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
        <section className="relative min-h-[75vh] flex items-end overflow-hidden">
          <Image
            src="/images/consult-hero.jpg"
            alt="ASU Consulting"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b3d6e]/95 via-[#1b3d6e]/55 to-[#1b3d6e]/20" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 w-full pb-16 md:pb-24">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F37021] font-[family-name:var(--font-heading)] mb-4">
              ASU Advisory
            </p>
            <OrangeLine />
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-tight max-w-3xl">
              Using Sport as a Driver for Economic Growth, Investment, and Long-Term Value.
            </h1>
            <p className="mt-4 text-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
              Strategic counsel for governments, investors, and institutions navigating Africa&apos;s sports economy.
            </p>
            <div className="mt-8">
              <Link
                href="https://calendly.com/gabriel-tpvo/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#F37021] text-white text-sm font-bold font-[family-name:var(--font-heading)] hover:bg-[#d65a14] transition-colors"
              >
                Book a Call →
              </Link>
            </div>
          </div>
        </section>

        {/* ── How We Work ──────────────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <OrangeLine />
            <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
              How We Work
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
              Our advisory is grounded in research and market intelligence. We build the evidence base before we give the counsel. ASU sits at the intersection of Africa&apos;s sports economy and global markets, advising institutions and organisations on both sides.
            </p>

            <div className="mt-10 grid md:grid-cols-2 gap-6">
              {/* Policy Advisory & Strategic Planning */}
              <div className="rounded-2xl bg-[#F37021] p-10 flex flex-col items-center justify-center text-center">
                <Map size={48} className="text-white" strokeWidth={1.5} />
                <h3 className="mt-6 text-2xl font-extrabold text-white font-[family-name:var(--font-heading)]">
                  Policy Advisory &amp; Strategic Planning
                </h3>
                <p className="mt-3 text-white/85 text-sm leading-relaxed max-w-sm">
                  We work with governments, ministries, national sports bodies, and multilateral institutions to shape sport policy and deliver strategic plans that translate objectives into actionable outcomes.
                </p>
                <p className="mt-2 text-white/85 text-sm leading-relaxed max-w-sm">
                  Our work includes sport policy development, AfCFTA implementation, institutional reform, and the design and delivery of strategic roadmaps alongside stakeholder engagement and capacity building programmes.
                </p>
              </div>
              {/* Commercial & Growth Strategy */}
              <div className="rounded-2xl bg-[#1b3d6e] p-10 flex flex-col items-center justify-center text-center">
                <BarChart2 size={48} className="text-white" strokeWidth={1.5} />
                <h3 className="mt-6 text-xl font-extrabold text-white font-[family-name:var(--font-heading)]">
                  Commercial &amp; Growth Strategy
                </h3>
                <p className="mt-3 text-white/85 text-sm leading-relaxed max-w-sm">
                  For global investors, brands, and sponsors, we provide the strategic clarity needed to enter, position, and grow with confidence in Africa&apos;s market.
                </p>
                <p className="mt-2 text-white/85 text-sm leading-relaxed max-w-sm">
                  For African rights holders, federations, and organisations, we support commercial development, partnership strategy, and long-term growth planning.
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
              <div className="flex-1 max-w-2xl space-y-5">
                <div>
                  <h3 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] leading-snug">
                    Leveraging Sport to Support the Inclusive Implementation of the AfCFTA
                  </h3>
                  <p className="mt-1 text-sm text-[#F37021] font-semibold font-[family-name:var(--font-heading)]">
                    The United Nations Economic Commission for Africa &amp; African Trade Policy Centre
                  </p>
                </div>

                <p className="text-gray-600 leading-relaxed text-sm">
                  Gabriel Ajala worked with UNECA and the African Trade Policy Centre to design and deliver a programme using sport as a lever for intra-African trade, regional cooperation, and economic inclusion.
                </p>

                <div>
                  <p className="text-xs font-bold text-[#F37021] uppercase tracking-widest font-[family-name:var(--font-heading)] mb-2">Delivered</p>
                  <ul className="space-y-1.5 text-sm text-gray-600">
                    {[
                      "2 research projects on sport and AfCFTA implementation",
                      "2 stakeholder events featuring FIFA, the African Union, Right to Dream, and the AfCFTA Secretariat",
                      "4 podcasts across Africa, Europe, and North America (avg. 47% consumption rate)",
                      "6-month mentorship programme for 14 entrepreneurs, with mentors from FIFA, BAL, Toronto Raptors, and Catapult Sports",
                      "Policy recommendations delivered to UNECA",
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2.5">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#F37021] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#F37021] uppercase tracking-widest font-[family-name:var(--font-heading)] mb-1">Results</p>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    100% of mentees rated the programme positively. 100% of mentors would participate again. A third of event attendees were women.
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href="mailto:info@asunified.com?subject=Case Study Request: UNECA AfCFTA"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#1b3d6e] font-[family-name:var(--font-heading)] hover:text-[#F37021] transition-colors"
                  >
                    Request the full case study →
                  </a>
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
