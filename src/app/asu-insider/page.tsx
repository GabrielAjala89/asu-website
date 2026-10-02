import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrangeLine } from "@/components/ui/OrangeLine";
import { TwoWaysToJoin } from "@/components/ui/TwoWaysToJoin";
import { sanityFetch } from "@/lib/sanity";
import { ALL_TRUSTED_BY_QUERY } from "@/lib/queries";
import Image from "next/image";
import { BarChart2, Globe, Users, Bell, Calendar } from "lucide-react";

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
    Icon: BarChart2,
    title: "Know where the money is moving",
    body: "A monthly Insider Brief and quarterly deals and investment intelligence briefings, drawn from ASU's trackers.",
  },
  {
    Icon: Globe,
    title: "Enter new markets with confidence",
    body: "Market reports and insights on the countries and sectors that matter to your business.",
  },
  {
    Icon: Users,
    title: "Reach the people who decide",
    body: "A verified members directory and introduction requests, so you know who to approach and how to reach them.",
  },
  {
    Icon: Bell,
    title: "Act on opportunities first",
    body: "Regular alerts on tenders, partnerships and senior appointments across the continent.",
  },
  {
    Icon: Calendar,
    title: "Build relationships in the room",
    body: "Member meetups at key industry events.",
  },
];

const AUDIENCES = [
  {
    label: "Sponsors and brands",
    body: "Justify your African investment with real deal comparables and market entry intelligence, not guesswork.",
  },
  {
    label: "Rights holders",
    body: "Price and package your rights against what the market is actually paying, and find the sponsors most likely to buy.",
  },
  {
    label: "Investors",
    body: "See where capital is moving across African sport before you commit your own.",
  },
  {
    label: "Governments and IGOs",
    body: "Understand the commercial landscape your federations operate in, and find the partners and investment to grow sport beyond public budgets.",
  },
];

export default async function AsuInsiderPage() {
  const trustedBy = await sanityFetch<TrustedBy[]>(ALL_TRUSTED_BY_QUERY).catch(() => []);

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
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
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#F37021] text-white text-xs font-bold font-[family-name:var(--font-heading)] uppercase tracking-widest">
              ASU Insider &nbsp;|&nbsp; Founding membership now open
            </span>
            <OrangeLine />
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-tight max-w-3xl">
              Make commercial decisions in African sport with data and people you can trust.
            </h1>
            <p className="mt-4 text-white/80 text-base md:text-xl max-w-2xl leading-relaxed">
              ASU Insider gives sponsors, rights holders and investors the market intelligence and verified access they need to act with confidence across Africa&apos;s sports economy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#two-ways"
                className="inline-block px-6 py-3.5 rounded-full bg-[#F37021] text-white font-bold font-[family-name:var(--font-heading)] text-sm hover:bg-[#d65a14] transition-colors"
              >
                Join as an individual
              </a>
              <a
                href="#two-ways"
                className="inline-block px-6 py-3.5 rounded-full border border-white/60 text-white font-bold font-[family-name:var(--font-heading)] text-sm hover:bg-white/10 transition-colors"
              >
                Enquire for your organisation
              </a>
            </div>
          </div>
        </section>

        {/* ── What changes when you join ───────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <OrangeLine />
                <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                  What changes when you join
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Africa&apos;s sports economy is growing faster than the information available to navigate it. Decisions worth millions are still made on instinct and personal networks. ASU Insider closes that gap.
                </p>
                <div className="mt-6 space-y-5">
                  {AUDIENCES.map((a) => (
                    <div key={a.label}>
                      <p className="font-bold text-[#1b3d6e] font-[family-name:var(--font-heading)] text-sm">{a.label}</p>
                      <p className="mt-1 text-gray-600 text-sm leading-relaxed">{a.body}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden">
                <Image
                  src="/images/asu-insider-page.jpg"
                  alt="ASU Insider networking event"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── How ASU Insider helps you decide ────────────────────────────── */}
        <section className="py-20 bg-[#f4f7fb]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12">
              <OrangeLine className="mx-auto" />
              <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                How ASU Insider helps you decide
              </h2>
            </div>
            {/* 6-col grid: top 3 cards each span 2 cols, bottom 2 staggered by 1 col — W shape */}
            <div className="grid grid-cols-6 gap-6 max-w-5xl mx-auto">
              {BENEFITS.slice(0, 3).map((b) => (
                <div key={b.title} className="col-span-6 sm:col-span-3 lg:col-span-2 bg-white rounded-2xl p-8">
                  <b.Icon size={36} className="text-[#F37021]" strokeWidth={1.5} />
                  <h3 className="mt-4 text-base font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{b.body}</p>
                </div>
              ))}
              {/* 4th card: offset right by 1 col so it sits under the gap between card 1 and 2 */}
              {(() => { const b = BENEFITS[3]; const Icon = b.Icon; return (
                <div className="col-span-6 sm:col-span-3 lg:col-start-2 lg:col-span-2 bg-white rounded-2xl p-8">
                  <Icon size={36} className="text-[#F37021]" strokeWidth={1.5} />
                  <h3 className="mt-4 text-base font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">{b.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{b.body}</p>
                </div>
              ); })()}
              {/* 5th card: offset right by 3 cols so it sits under the gap between card 2 and 3 */}
              {(() => { const b = BENEFITS[4]; const Icon = b.Icon; return (
                <div className="col-span-6 sm:col-span-3 lg:col-start-4 lg:col-span-2 bg-white rounded-2xl p-8">
                  <Icon size={36} className="text-[#F37021]" strokeWidth={1.5} />
                  <h3 className="mt-4 text-base font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">{b.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{b.body}</p>
                </div>
              ); })()}
            </div>
          </div>
        </section>

        {/* ── Two ways to join ─────────────────────────────────────────────── */}
        <TwoWaysToJoin />

        {/* ── Trusted By ───────────────────────────────────────────────────── */}
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
