import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrangeLine } from "@/components/ui/OrangeLine";
import { TwoWaysToJoin } from "@/components/ui/TwoWaysToJoin";
import { NotReadyToJoin } from "@/components/ui/NotReadyToJoin";
import { sanityFetch } from "@/lib/sanity";
import { ALL_TRUSTED_BY_QUERY } from "@/lib/queries";
import Image from "next/image";
import { InsiderTestimonials } from "@/components/sections/InsiderTestimonials";
import { TrendingUp, Users, CalendarDays, BarChart2, Shield, Landmark } from "lucide-react";

export const revalidate = 60;

export const metadata = {
  title: "ASU Insider",
  description: "ASU Insider — market intelligence and verified access for sponsors, rights holders and investors making commercial decisions in Africa's sports economy.",
};

interface TrustedBy {
  _id: string;
  name: string;
  logo?: { asset?: { url: string }; alt?: string };
}

const BENEFITS = [
  {
    num: "01",
    Icon: TrendingUp,
    title: "Know where the money is moving",
    body: "The monthly Insider Brief, deals and investment intelligence from ASU's trackers, and country market snapshots on the markets that matter to your business.",
  },
  {
    num: "02",
    Icon: Users,
    title: "Reach the people who decide",
    body: "The ASU Directory of organisations across African sport, by country, sport and sector. Tell us who you need to meet: where we know the right person, we will make the introduction.",
  },
  {
    num: "03",
    Icon: CalendarDays,
    title: "Build relationships in the room",
    body: "Invite only member briefings with senior leaders, plus meetups at key industry events.",
  },
];

const WHO_FOR = [
  {
    Icon: TrendingUp,
    title: "Brands and sponsors",
    voice: '"I need evidence to justify spending in Africa."',
    bullets: [
      "Benchmark deals before you sign",
      "See which brands are active, where and in which sports",
      "Shortlist properties worth backing",
    ],
  },
  {
    Icon: BarChart2,
    title: "Investors",
    voice: '"I can\'t invest blind."',
    bullets: [
      "Track deal flow and disclosed values by market",
      "Use country snapshots to size opportunities",
      "Find the operators behind the assets",
    ],
  },
  {
    Icon: Shield,
    title: "Rights holders and federations",
    voice: '"I\'m pricing deals without benchmarks."',
    bullets: [
      "Compare your deals with the market",
      "See which sponsors are spending, and on what",
      "Find the brands that fit your property",
    ],
  },
  {
    Icon: Landmark,
    title: "Government leaders",
    voice: '"We need sport to raise its own revenue."',
    bullets: [
      "See how other markets commercialise sport",
      "Track investment and policy trends across the continent",
      "Meet private sector partners at member briefings",
    ],
  },
];

const HOW_STEPS = [
  {
    num: "1",
    title: "Request a briefing",
    body: "Tell us who you are and what you are working on. We will invite you to the right session.",
  },
  {
    num: "2",
    title: "Join a short group briefing",
    body: "See the intelligence, hear how membership works and ask us anything.",
  },
  {
    num: "3",
    title: "Decide, with the early member rate",
    body: "Early member places close on 30 November 2026.",
  },
];

export default async function AsuInsiderPage() {
  const trustedBy = await sanityFetch<TrustedBy[]>(ALL_TRUSTED_BY_QUERY).catch(() => []);

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative min-h-[75vh] flex items-end overflow-hidden">
          <Image
            src="/images/asu-insider-hero.jpg"
            alt="ASU Insider — community of Africa's sports industry leaders"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b3d6e]/90 via-[#1b3d6e]/50 to-transparent" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 w-full pb-16 md:pb-24">
            <div className="flex flex-wrap gap-2 mb-5 font-[family-name:var(--font-heading)]">
              <span className="px-3 py-1.5 rounded-sm bg-[#E8630A] text-[#030000] text-xs font-bold uppercase tracking-widest">
                Private briefings now open
              </span>
              <span className="px-3 py-1.5 rounded-sm border border-white/60 text-white text-xs font-bold uppercase tracking-widest">
                Early member places close 30 November
              </span>
            </div>
            <OrangeLine />
            <p className="mt-4 text-base font-bold text-[#F4A26B] font-[family-name:var(--font-heading)] uppercase tracking-[0.14em]">ASU Insider</p>
            <h1 className="mt-2 text-4xl md:text-6xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-tight max-w-[18ch]">
              Make commercial decisions in African sport with data and people you can trust.
            </h1>
            <p className="mt-4 text-white/80 text-base md:text-xl max-w-[46rem] leading-relaxed">
              ASU Insider gives sponsors, rights holders and investors the market intelligence and verified access they need to act with confidence across Africa&apos;s sports economy.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#request-briefing"
                className="inline-block px-7 py-[18px] rounded bg-[#E8630A] text-[#030000] font-bold font-[family-name:var(--font-heading)] text-base hover:bg-[#B04A06] hover:text-white transition-colors"
              >
                Request a briefing invitation
              </a>
              <a
                href="#free"
                className="inline-block px-7 py-[18px] rounded border-2 border-white text-white font-bold font-[family-name:var(--font-heading)] text-base hover:bg-white hover:text-[#1b3d6e] transition-colors"
              >
                Join ASU Insider – free
              </a>
            </div>
          </div>
        </section>

        {/* ── How ASU Insider helps you decide ────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(1.8rem,3vw,2.5rem)] text-[#1b3d6e] mb-12 leading-tight">
              How ASU Insider helps you decide
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BENEFITS.map((b) => (
                <div key={b.num} className="bg-[#F5F6F8] rounded p-9 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#E8630A]/10 flex items-center justify-center shrink-0">
                      <b.Icon size={20} className="text-[#E8630A]" strokeWidth={1.5} />
                    </div>
                    <p className="font-[family-name:var(--font-heading)] font-bold text-sm text-[#B04A06]">{b.num}</p>
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] font-bold text-xl text-[#1b3d6e]">{b.title}</h3>
                  <p className="text-[17px] leading-relaxed text-[#4A4A4A]">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Who it is for ───────────────────────────────────────────── */}
        <section className="py-24 bg-[#F5F6F8]">
          <div className="mx-auto max-w-7xl px-6 flex flex-col gap-10">
            <div className="relative rounded-xl overflow-hidden h-56 md:h-72">
              <Image
                src="/images/asu-insider-page.jpg"
                alt="ASU Insider community"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1b3d6e]/70 via-[#1b3d6e]/30 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-center px-10 max-w-[32rem]">
                <p className="font-[family-name:var(--font-heading)] font-bold text-sm uppercase tracking-[0.12em] text-[#F4A26B] mb-2">ASU Insider</p>
                <p className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(1.4rem,2.4vw,2rem)] text-white leading-tight">
                  Intelligence built for the people who make commercial decisions.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(1.8rem,3vw,2.5rem)] text-[#1b3d6e] leading-tight">
                Who it is for
              </h2>
              <p className="text-lg text-[#4A5D7A]">Find your role. Here is what membership does for you.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {WHO_FOR.map((w) => (
                <div key={w.title} className="bg-white rounded p-8 flex flex-col gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[#E8630A]/10 flex items-center justify-center">
                    <w.Icon size={22} className="text-[#E8630A]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] font-bold text-xl text-[#1b3d6e]">{w.title}</h3>
                  <p className="text-base text-[#4A4A4A] italic">{w.voice}</p>
                  <ul className="space-y-1 pl-5 list-disc text-base text-[#4A4A4A] leading-relaxed">
                    {w.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-center text-base text-[#4A5D7A]">
              Need support for your whole institution?{" "}
              <a href="/advisory" className="font-[family-name:var(--font-heading)] font-bold text-[#1b3d6e] hover:text-[#E8630A] transition-colors">
                See ASU Advisory
              </a>
            </p>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────────────── */}
        <InsiderTestimonials />

        {/* ── How joining works ────────────────────────────────────────── */}
        <section className="py-24 bg-[#1b3d6e]">
          <div className="mx-auto max-w-7xl px-6 flex flex-col gap-11">
            <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(1.8rem,3vw,2.5rem)] text-white leading-tight">
              How joining works
            </h2>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 list-none p-0 m-0">
              {HOW_STEPS.map((s) => (
                <li key={s.num} className="flex flex-col gap-3">
                  <span className="font-[family-name:var(--font-heading)] font-extrabold text-5xl text-[#F4A26B]">{s.num}</span>
                  <h3 className="font-[family-name:var(--font-heading)] font-bold text-xl text-white">{s.title}</h3>
                  <p className="text-[17px] leading-relaxed text-[#E3E9F2]">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Join + Free — side by side 60/40 ─────────────────────────── */}
        <div className="grid md:grid-cols-[3fr_2fr] items-stretch" id="request-briefing-section">
          <TwoWaysToJoin />
          <div id="free">
            <NotReadyToJoin />
          </div>
        </div>

        {/* ── Network line ─────────────────────────────────────────────── */}
        <section className="py-10 bg-white border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <p className="text-sm font-bold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
              Built on a network of 4,300+ industry leaders across 10+ countries.
            </p>
          </div>
        </section>

        {/* ── Trusted By ───────────────────────────────────────────────── */}
        {trustedBy.length > 0 && (
          <section className="py-14 bg-white border-t border-gray-100">
            <div className="mx-auto max-w-7xl px-6">
              <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 font-[family-name:var(--font-heading)] mb-8">
                Trusted by leaders across African sport
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
                {(trustedBy as TrustedBy[]).map((org) =>
                  org.logo?.asset?.url ? (
                    <div key={org._id} className="relative h-10 w-28">
                      <Image
                        src={org.logo.asset.url}
                        alt={org.logo.alt || org.name}
                        fill
                        className="object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all"
                      />
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  );
}
