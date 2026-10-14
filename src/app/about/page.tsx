import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrangeLine } from "@/components/ui/OrangeLine";
import { EngageSection } from "@/components/sections/EngageSection";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

export const metadata = {
  title: "About",
  description: "Africa Sports Unified is the leading Pan-African sport intelligence and advisory firm — connecting decision-makers, investors, and institutions across the continent's sports economy.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[75vh] flex items-end overflow-hidden">
          <Image
            src="/images/about-hero.jpg"
            alt="Africa Sports Unified — defining and enabling the African sports economy"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b3d6e]/90 via-[#1b3d6e]/40 to-transparent" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 w-full pb-16 md:pb-24">
            <OrangeLine />
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-tight max-w-3xl">
              Defining and Enabling the African Sports Economy
            </h1>
            <p className="mt-4 text-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
              We bring clarity, coordination, and strategic direction to the organisations shaping sport as an economic sector across Africa.
            </p>
          </div>
        </section>

        {/* ── The Challenge ─────────────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-4xl px-6">
            <OrangeLine />
            <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
              The Challenge
            </h2>
            <p className="mt-5 text-gray-700 leading-relaxed text-base md:text-lg">
              ASU began with a dissertation. While researching the Nigerian Professional Football League for my postgraduate studies, I looked for the data and reporting any serious market analysis needs, and found very little. When I raised this with people working in the industry, the answer was always the same: &ldquo;there is no go to place for this.&rdquo;
            </p>
            <p className="mt-5 text-gray-700 leading-relaxed text-base md:text-lg">
              That gap, between the scale of Africa&apos;s sports economy and the support available to grow it, is why ASU exists.
            </p>
            <p className="mt-8 text-sm font-bold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
              Gabriel Ajala, Founder
            </p>
          </div>
        </section>

        {/* ── Why ASU Exists + Our Mission ──────────────────────────────────── */}
        <section className="py-20 bg-[#f4f7fb]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid md:grid-cols-2 gap-12">

              <div>
                <OrangeLine />
                <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                  Why ASU Exists
                </h2>
                <p className="mt-5 text-gray-700 leading-relaxed text-base md:text-lg">
                  Sport contributes an estimated 0.5% of Africa&apos;s GDP, against a global average of 2%. Closing that gap would quadruple the sector&apos;s economic contribution. Getting there takes more than ambition. It takes reliable market intelligence and the strategic expertise to act on it. ASU brings both, advising governments, investors, rights holders and brands on how to unlock that value.
                </p>
                <p className="mt-4 text-xs text-gray-400 font-[family-name:var(--font-heading)]">
                  Source: African Union Sports Council
                </p>
              </div>

              <div>
                <OrangeLine />
                <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                  Our Mission
                </h2>
                <p className="mt-5 text-gray-700 leading-relaxed text-base md:text-lg">
                  To grow sport&apos;s contribution to Africa&apos;s economy by giving the organisations that shape it the advice, intelligence and connections to succeed.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── What We Do ────────────────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12">
              <OrangeLine className="mx-auto" />
              <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                What We Do
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">

              {/* Advisory */}
              <div className="rounded-2xl bg-[#1b3d6e] p-10 flex flex-col">
                <h3 className="text-xl font-extrabold text-white font-[family-name:var(--font-heading)]">
                  Advisory
                </h3>
                <p className="mt-4 text-white/75 text-sm leading-relaxed flex-1">
                  Strategic advice for governments, federations, rights holders, investors and brands, from commercial strategy to policy and investment readiness.
                </p>
                <Link
                  href="/consult"
                  className="mt-8 inline-block w-full text-center px-6 py-3 rounded-full bg-[#F37021] text-white text-sm font-bold font-[family-name:var(--font-heading)] hover:bg-[#d65a14] transition-colors"
                >
                  View Advisory Services
                </Link>
              </div>

              {/* Intelligence */}
              <div className="rounded-2xl border border-[#dde3ee] p-10 flex flex-col">
                <h3 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                  Intelligence
                </h3>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed flex-1">
                  Original research and analysis on deals, media rights, sponsorship and investment across the continent, including the ASU Deals Tracker and market reports.
                </p>
                <Link
                  href="/knowledge-hub"
                  className="mt-8 inline-block w-full text-center px-6 py-3 rounded-full bg-[#1b3d6e] text-white text-sm font-bold font-[family-name:var(--font-heading)] hover:bg-[#142e54] transition-colors"
                >
                  Explore the Knowledge Hub
                </Link>
              </div>

              {/* ASU Insider */}
              <div className="rounded-2xl border border-[#dde3ee] p-10 flex flex-col">
                <h3 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                  ASU Insider
                </h3>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed flex-1">
                  A membership connecting decision makers with the intelligence and people they need to act with confidence.
                </p>
                <Link
                  href="/asu-insider"
                  className="mt-8 inline-block w-full text-center px-6 py-3 rounded-full bg-[#1b3d6e] text-white text-sm font-bold font-[family-name:var(--font-heading)] hover:bg-[#142e54] transition-colors"
                >
                  Explore ASU Insider
                </Link>
              </div>

            </div>
          </div>
        </section>

        <EngageSection />
      </main>
      <Footer />
    </>
  );
}
