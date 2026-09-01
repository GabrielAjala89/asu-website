import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrangeLine } from "@/components/ui/OrangeLine";
import { InsiderForm } from "@/components/ui/InsiderForm";
import { sanityFetch } from "@/lib/sanity";
import { ALL_TRUSTED_BY_QUERY } from "@/lib/queries";
import Image from "next/image";
import { BarChart2, Globe, Users } from "lucide-react";

export const revalidate = 60;

export const metadata = {
  title: "ASU Insider",
  description: "ASU Insider — a members-only platform for decision-makers, investors, and institutions shaping Africa's sports economy.",
};

interface TrustedBy {
  _id: string;
  name: string;
  logo?: { asset?: { url: string }; alt?: string };
}

const BENEFITS = [
  {
    Icon: BarChart2,
    title: "Market Intelligence",
    body: "Access to ASU's full library of reports, trackers, and data-driven briefings — covering deals, investments, media rights, and commercial trends across the continent.",
  },
  {
    Icon: Globe,
    title: "Ecosystem Access",
    body: "Direct access to the investors, federations, brands, and institutions shaping sport business in Africa. The right connections, verified.",
  },
  {
    Icon: Users,
    title: "Events & Roundtables",
    body: "Invitations to ASU roundtables, curated briefings, and exclusive conversations with the decision-makers building Africa's sports economy.",
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
              Coming Soon
            </span>
            <OrangeLine />
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-tight max-w-3xl">
              ASU Insider
            </h1>
            <p className="mt-4 text-white/80 text-base md:text-xl max-w-2xl leading-relaxed">
              The membership for decision-makers, investors, and institutions shaping Africa&apos;s sports economy. Intelligence, ecosystem access, and exclusive conversations in one place.
            </p>
          </div>
        </section>

        {/* ── What is ASU Insider ──────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <OrangeLine />
                <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                  Your edge in Africa&apos;s sports economy
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  ASU Insider is a members-only platform built exclusively for the professionals, brands, federations, and institutions at the forefront of sport business in Africa. It is where trusted intelligence meets verified access.
                </p>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Members gain the insights to evaluate markets, identify opportunities, and make better commercial decisions, alongside direct access to the people and conversations that shape Africa&apos;s sports economy.
                </p>
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

        {/* ── What you'll get ──────────────────────────────────────────────── */}
        <section className="py-20 bg-[#f4f7fb]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12">
              <OrangeLine className="mx-auto" />
              <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                What ASU Insider members will get
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {BENEFITS.map((b) => (
                <div key={b.title} className="bg-white rounded-2xl p-8">
                  <b.Icon size={36} className="text-[#F37021]" strokeWidth={1.5} />
                  <h3 className="mt-4 text-base font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Registration CTA ─────────────────────────────────────────────── */}
        <section className="py-24 bg-[#1b3d6e]">
          <div className="mx-auto max-w-xl px-6">
            <div className="text-center mb-10">
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#F37021] text-white text-xs font-bold font-[family-name:var(--font-heading)] uppercase tracking-widest">
                Coming Soon
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-tight">
                Be first to know when we launch
              </h2>
              <p className="mt-4 text-white/70 leading-relaxed">
                Register your interest below and we will be in touch once we go live.
              </p>
            </div>
            <InsiderForm />
          </div>
        </section>

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
