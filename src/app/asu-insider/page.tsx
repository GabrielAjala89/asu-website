import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrangeLine } from "@/components/ui/OrangeLine";
import { WaitlistForm } from "@/components/sections/WaitlistForm";
import { sanityFetch } from "@/lib/sanity";
import { ALL_TRUSTED_BY_QUERY } from "@/lib/queries";
import Image from "next/image";
import { FileText, Users, BarChart2, Mic } from "lucide-react";

export const revalidate = 60;

export const metadata = {
  title: "ASU Insider | Africa Sports Unified",
  description: "ASU Insider — exclusive intelligence, community access, and advisory insights for decision-makers in Africa's sports economy. Coming soon.",
};

interface TrustedBy {
  _id: string;
  name: string;
  logo?: { asset?: { url: string }; alt?: string };
}

const BENEFITS = [
  {
    Icon: FileText,
    title: "Intelligence & Research",
    body: "Exclusive access to ASU's full library of reports, trackers, and deep-dive analysis on Africa's sports economy.",
  },
  {
    Icon: BarChart2,
    title: "Market Insights",
    body: "Data-driven briefings on deals, investments, media rights, and commercial trends across the continent.",
  },
  {
    Icon: Users,
    title: "Community Access",
    body: "Connect with the investors, federations, brands, and professionals shaping African sport.",
  },
  {
    Icon: Mic,
    title: "Events & Conversations",
    body: "Invitations to ASU roundtables, briefings, and curated conversations that don't happen anywhere else.",
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
              The membership for decision-makers, investors, and institutions shaping Africa&apos;s sports economy. Intelligence, community, and access — in one place.
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
                  ASU Insider is a members-only platform bringing together the professionals, investors, brands, and institutions at the forefront of sport business in Africa. It is where intelligence meets opportunity.
                </p>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Members get exclusive access to ASU&apos;s full research library, priority briefings, curated community connections, and invitations to events that bring the continent&apos;s sports industry together.
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* ── Waitlist CTA ─────────────────────────────────────────────────── */}
        <section className="py-24 bg-[#1b3d6e]">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#F37021] text-white text-xs font-bold font-[family-name:var(--font-heading)] uppercase tracking-widest">
              Coming Soon
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-tight">
              Be first to know when we launch
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Leave your email below and we&apos;ll notify you the moment ASU Insider opens. No spam — just one email when we&apos;re ready.
            </p>
            <div className="mt-8">
              <WaitlistForm />
            </div>
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
