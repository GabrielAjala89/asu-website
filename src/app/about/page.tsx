import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

export const metadata = {
  title: "About | Africa Sports Unified",
  description: "Africa Sports Unified is the commercial intelligence and advisory firm for Africa's sports economy, advising governments, brands, investors and rights holders.",
};

const WHAT_WE_DO = [
  {
    title: "Advisory",
    body: "Strategic advice for governments, federations, rights holders, investors and brands — from commercial strategy to policy and investment readiness.",
    href: "/advisory",
    cta: "View Advisory Services",
    highlight: true,
  },
  {
    title: "Intelligence",
    body: "Original research and analysis on deals, media rights, sponsorship and investment across the continent, including the ASU Deals Tracker and market reports.",
    href: "/intelligence",
    cta: "Explore Intelligence",
    highlight: false,
  },
  {
    title: "ASU Insider",
    body: "A membership connecting decision makers with the intelligence and people they need to act with confidence.",
    href: "/asu-insider",
    cta: "Explore ASU Insider",
    highlight: false,
  },
];

const ENGAGE_TILES = [
  { label: "Advisory", href: "/advisory" },
  { label: "ASU Insider", href: "/asu-insider" },
  { label: "Intelligence", href: "/intelligence" },
  { label: "Deals Tracker", href: "/deals-tracker" },
  { label: "Reports", href: "/intelligence?tab=reports" },
  { label: "Insights", href: "/intelligence?tab=articles" },
];

const GABRIEL_QUALS = [
  "MBA, SOAS University of London",
  "MSc Sports Management, Birkbeck, University of London",
  "BA Economics and Law, University of Leicester",
  "PRINCE2 Practitioner and Agile Scrum Master",
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative min-h-[70vh] flex items-end overflow-hidden">
          <Image
            src="/images/about-hero.jpg"
            alt="Africa Sports Unified — defining and enabling the African sports economy"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b3d6e]/90 via-[#1b3d6e]/40 to-transparent" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 w-full pb-16 md:pb-20">
            <p className="font-[family-name:var(--font-heading)] text-sm font-bold uppercase tracking-[0.14em] text-[#F4A26B] mb-3">
              About ASU
            </p>
            <h1 className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.1] text-white max-w-[24ch]">
              A unified Pan-African sports market drives growth, in Africa and beyond.
            </h1>
          </div>
        </section>

        {/* ── Gabriel bio ──────────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 flex flex-wrap gap-12 items-start">
            <div className="flex-1 min-w-[280px] max-w-[340px] aspect-[4/5] bg-[#F5F6F8] rounded flex items-center justify-center text-[#4A5D7A] text-sm border-2 border-dashed border-[#C4CAD3]">
              [Photo of Gabriel — coming soon]
            </div>
            <div className="flex-[999] min-w-0 flex flex-col gap-5">
              <p className="font-[family-name:var(--font-heading)] text-sm font-bold uppercase tracking-[0.12em] text-[#B04A06]">Founder</p>
              <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(1.7rem,2.8vw,2.3rem)] text-[#1b3d6e]">Gabriel Ajala</h2>
              <div className="bg-[#F5F6F8] rounded p-7 flex flex-col gap-4">
                <p className="text-[17px] leading-relaxed text-[#4A4A4A]">
                  ASU began with a dissertation. While researching the Nigerian Professional Football League for his postgraduate studies, Gabriel looked for the data and reporting any serious market analysis needs and found very little. When he raised this with people working in the industry, the answer was always the same: &ldquo;there is no go to place for this.&rdquo;
                </p>
                <p className="text-[17px] leading-relaxed text-[#4A4A4A]">
                  That gap — between the scale of Africa&apos;s sports economy and the support available to grow it — is why ASU exists. Gabriel combines sports business expertise with years of programme and project delivery, so advice comes with a plan to deliver it.
                </p>
              </div>
              <ul className="space-y-1.5 pl-5 list-disc text-base text-[#4A4A4A] leading-relaxed">
                {GABRIEL_QUALS.map((q) => <li key={q}>{q}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* ── 0.5% vs 2% ──────────────────────────────────────────────── */}
        <section className="bg-[#F5F6F8] py-20">
          <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-4">
              <p className="font-[family-name:var(--font-heading)] text-sm font-bold uppercase tracking-[0.12em] text-[#B04A06]">The opportunity</p>
              <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(1.7rem,2.8vw,2.3rem)] text-[#1b3d6e] leading-tight">
                Sport contributes 0.5% of Africa&apos;s GDP against a global average of 2%.
              </h2>
              <p className="text-[17px] leading-relaxed text-[#4A4A4A]">
                Closing that gap would quadruple the sector&apos;s economic contribution. Getting there takes more than ambition. It takes reliable market intelligence and the strategic expertise to act on it.
              </p>
              <p className="text-sm text-[#4A5D7A]">Source: African Union Sports Council</p>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-white rounded p-8 flex flex-col gap-2 border-t-4 border-[#4A5D7A]">
                <span className="font-[family-name:var(--font-heading)] font-extrabold text-6xl text-[#1b3d6e]">0.5%</span>
                <span className="text-sm text-[#4A5D7A]">Africa&apos;s current contribution</span>
              </div>
              <div className="bg-white rounded p-8 flex flex-col gap-2 border-t-4 border-[#E8630A]">
                <span className="font-[family-name:var(--font-heading)] font-extrabold text-6xl text-[#1b3d6e]">2%</span>
                <span className="text-sm text-[#4A5D7A]">Global average contribution</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Mission band ─────────────────────────────────────────────── */}
        <section className="bg-[#1b3d6e] py-16">
          <div className="mx-auto max-w-7xl px-6 flex flex-col gap-4">
            <p className="font-[family-name:var(--font-heading)] text-sm font-bold uppercase tracking-[0.12em] text-[#F4A26B]">Our mission</p>
            <p className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(1.5rem,2.8vw,2.2rem)] text-white leading-snug max-w-[36rem]">
              To grow sport&apos;s contribution to Africa&apos;s economy by giving the organisations that shape it the advice, intelligence and connections to succeed.
            </p>
          </div>
        </section>

        {/* ── What we do ───────────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 flex flex-col gap-10">
            <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(1.8rem,3vw,2.5rem)] text-[#1b3d6e] leading-tight">
              What we do
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {WHAT_WE_DO.map((w) => (
                <div
                  key={w.title}
                  className={`rounded p-9 flex flex-col ${w.highlight ? "bg-[#1b3d6e]" : "border border-gray-200"}`}
                >
                  <h3 className={`font-[family-name:var(--font-heading)] font-extrabold text-xl ${w.highlight ? "text-white" : "text-[#1b3d6e]"}`}>
                    {w.title}
                  </h3>
                  <p className={`mt-4 text-sm leading-relaxed flex-1 ${w.highlight ? "text-white/75" : "text-[#4A4A4A]"}`}>
                    {w.body}
                  </p>
                  <Link
                    href={w.href}
                    className={`mt-8 inline-block w-full text-center px-6 py-3.5 rounded font-bold font-[family-name:var(--font-heading)] text-sm transition-colors ${
                      w.highlight
                        ? "bg-[#E8630A] text-[#030000] hover:bg-[#B04A06] hover:text-white"
                        : "bg-[#1b3d6e] text-white hover:bg-[#142e54]"
                    }`}
                  >
                    {w.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Engage section ───────────────────────────────────────────── */}
        <section className="bg-[#F5F6F8] py-20">
          <div className="mx-auto max-w-7xl px-6 flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(1.8rem,3vw,2.5rem)] text-[#1b3d6e] leading-tight">
                Engage with ASU
              </h2>
              <p className="text-lg text-[#4A5D7A]">Explore the ways to work with us and access our intelligence.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {ENGAGE_TILES.map((t) => (
                <Link
                  key={t.label}
                  href={t.href}
                  className="px-5 py-3 rounded border border-[#1b3d6e] text-[#1b3d6e] font-bold font-[family-name:var(--font-heading)] text-sm hover:bg-[#1b3d6e] hover:text-white transition-colors"
                >
                  {t.label}
                </Link>
              ))}
            </div>
            <div>
              <Link
                href="/advisory"
                className="inline-block px-7 py-[18px] rounded font-[family-name:var(--font-heading)] font-bold text-base bg-[#E8630A] text-[#030000] hover:bg-[#B04A06] hover:text-white transition-colors"
              >
                Book a strategy call
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
