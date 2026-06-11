import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { OrangeLine } from "@/components/ui/OrangeLine";
import { Button } from "@/components/ui/Button";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { EngageSection } from "@/components/sections/EngageSection";
import { sanityFetch } from "@/lib/sanity";
import { ALL_TESTIMONIALS_QUERY, ALL_TRUSTED_BY_QUERY } from "@/lib/queries";
import Image from "next/image";

export const revalidate = 60;

export const metadata = {
  title: "About | Africa Sports Unified",
  description: "Africa Sports Unified is the leading Pan-African sport intelligence and advisory firm — connecting decision-makers, investors, and institutions across the continent's sports economy.",
};

const PILLARS = [
  {
    icon: "📊",
    title: "Sport Intelligence",
    body: "Original research, data, and analysis tracking the African sports economy — from media rights and sponsorship to infrastructure investment and talent pipelines.",
  },
  {
    icon: "🤝",
    title: "Advisory",
    body: "Strategic counsel for federations, investors, sponsors, and governments navigating African sport. We bring on-the-ground expertise and continental relationships.",
  },
  {
    icon: "🎙️",
    title: "Media & Content",
    body: "Long-form journalism, podcasts, and video content that cover African sport with the depth and rigour it deserves — read by leaders across the continent and the global diaspora.",
  },
  {
    icon: "🌍",
    title: "Network & Community",
    body: "ASU Insider connects the professionals, investors, and organisations shaping African sport — creating the conditions for collaboration, deals, and knowledge exchange.",
  },
];

const STATS = [
  { value: "54", label: "African markets covered" },
  { value: "10+", label: "Years of sector expertise" },
  { value: "500+", label: "Industry contacts" },
  { value: "3", label: "Languages served" },
];

interface TrustedBy {
  _id: string;
  name: string;
  url?: string;
  logo?: { asset?: { url: string }; alt?: string };
}

export default async function AboutPage() {
  const [testimonials, trustedBy] = await Promise.all([
    sanityFetch<never[]>(ALL_TESTIMONIALS_QUERY).catch(() => []),
    sanityFetch<TrustedBy[]>(ALL_TRUSTED_BY_QUERY).catch(() => []),
  ]);

  return (
    <>
      <Navbar />
      <main className="pt-18">
        <PageHero
          title="About Africa Sports Unified"
          subtitle="The voice of African sports business — intelligence, advisory, and community for the people building the continent's sports economy."
          imageSrc="/images/about-hero.jpg"
          imageAlt="Africa Sports Unified team"
        />

        {/* Mission */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <OrangeLine />
                <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                  Who We Are
                </h2>
                <p className="mt-5 text-gray-600 leading-relaxed text-base">
                  Africa Sports Unified (ASU) is a Pan-African sport intelligence and advisory firm. We exist to close the information gap in African sport — providing the research, analysis, and strategic counsel that investors, federations, sponsors, and governments need to make confident decisions.
                </p>
                <p className="mt-4 text-gray-600 leading-relaxed text-base">
                  Founded by Gabriel Ajala, ASU draws on deep continental networks and a decade of experience spanning football, athletics, basketball, and emerging sports markets across Sub-Saharan Africa and North Africa.
                </p>
                <p className="mt-4 text-gray-600 leading-relaxed text-base">
                  We are not a news wire. We are the briefing room — where the most important people in African sport come to understand what is really happening, what it means, and what to do next.
                </p>
                <div className="mt-8">
                  <Button href="/consult" variant="secondary" size="md">
                    Work With ASU →
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="bg-[#f4f7fb] rounded-2xl p-8 flex flex-col items-center text-center"
                  >
                    <span className="text-4xl font-extrabold text-[#F37021] font-[family-name:var(--font-heading)]">
                      {s.value}
                    </span>
                    <span className="mt-2 text-sm text-[#1b3d6e] font-semibold font-[family-name:var(--font-heading)] uppercase tracking-wide">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What we do */}
        <section className="py-20 bg-[#f4f7fb]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <OrangeLine className="mx-auto" />
              <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                What We Do
              </h2>
              <p className="mt-3 text-gray-600">
                Four interconnected practices that together make ASU the home of African sport business intelligence.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PILLARS.map((p) => (
                <div
                  key={p.title}
                  className="bg-white rounded-2xl p-7 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-3xl">{p.icon}</span>
                  <h3 className="text-base font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted By */}
        {trustedBy.length > 0 && (
          <section className="py-16 bg-white border-y border-gray-100">
            <div className="mx-auto max-w-7xl px-6">
              <p className="text-center text-xs uppercase tracking-[0.25em] font-bold text-gray-400 font-[family-name:var(--font-heading)] mb-10">
                Trusted By
              </p>
              <div className="flex flex-wrap justify-center items-center gap-10">
                {trustedBy.map((org) =>
                  org.logo?.asset?.url ? (
                    <a
                      key={org._id}
                      href={org.url || "#"}
                      target={org.url ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <div className="relative h-8 w-28">
                        <Image
                          src={org.logo.asset.url}
                          alt={org.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </a>
                  ) : null
                )}
              </div>
            </div>
          </section>
        )}

        <TestimonialsCarousel testimonials={testimonials} />
        <EngageSection />
      </main>
      <Footer />
    </>
  );
}
