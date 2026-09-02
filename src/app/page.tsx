import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroVideo } from "@/components/sections/HeroVideo";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import Image from "next/image";
import { KnowledgeHubPreview } from "@/components/sections/KnowledgeHubPreview";
import { IntelligenceAndPodcast } from "@/components/sections/IntelligenceAndPodcast";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { EngageSection } from "@/components/sections/EngageSection";
import { sanityFetch } from "@/lib/sanity";
import { FEATURED_REPORTS_QUERY, ALL_TESTIMONIALS_QUERY } from "@/lib/queries";

// Revalidate every 60 seconds — fresh content without a full redeploy
export const revalidate = 60;

export default async function HomePage() {
  // Fetch live data from Sanity (returns empty arrays until content is added)
  const [products, testimonials] = await Promise.all([
    sanityFetch(FEATURED_REPORTS_QUERY).catch(() => []),
    sanityFetch(ALL_TESTIMONIALS_QUERY).catch(() => []),
  ]);

  return (
    <>
      <Navbar transparent />
      <main>
        <HeroVideo />

        {/* ── Community stats bar ───────────────────────────────────────── */}
        <section className="bg-[#1b3d6e] py-10">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">

              <div className="flex flex-col items-center text-center py-6 md:py-0 md:px-10">
                <p className="text-4xl font-extrabold text-white font-[family-name:var(--font-heading)]">
                  4,300+
                </p>
                <p className="mt-2 text-white/70 text-sm font-[family-name:var(--font-heading)] font-semibold uppercase tracking-wider">
                  Industry leaders in our network
                </p>
              </div>

              <div className="flex flex-col items-center text-center py-6 md:py-0 md:px-10">
                <p className="text-4xl font-extrabold text-[#F37021] font-[family-name:var(--font-heading)]">
                  22.8%
                </p>
                <p className="mt-2 text-white/70 text-sm font-[family-name:var(--font-heading)] font-semibold uppercase tracking-wider">
                  Newsletter engagement rate
                </p>
                <p className="mt-1 text-white/40 text-xs">
                  vs. 2.64% global average
                </p>
              </div>

              <div className="flex flex-col items-center text-center py-6 md:py-0 md:px-10">
                <p className="text-4xl font-extrabold text-white font-[family-name:var(--font-heading)]">
                  10+
                </p>
                <p className="mt-2 text-white/70 text-sm font-[family-name:var(--font-heading)] font-semibold uppercase tracking-wider">
                  Countries represented across our community
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── Who we've worked with — logo bar ─────────────────────────── */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-6">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 font-[family-name:var(--font-heading)] mb-8">
              Who we&apos;ve worked with
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
              {[
                { src: "/images/trusted-by/fifa.png",      alt: "FIFA",                               size: "h-12 w-32" },
                { src: "/images/trusted-by/caf.png",       alt: "CAF",                                size: "h-12 w-32" },
                { src: "/images/trusted-by/uneca.webp",    alt: "UNECA",                              size: "h-24 w-24" },
                { src: "/images/trusted-by/afcfta.jpg",    alt: "AfCFTA",                             size: "h-20 w-52" },
                { src: "/images/trusted-by/apo-group.png", alt: "APO Group",                          size: "h-12 w-32" },
                { src: "/images/afrosport-logo.avif",       alt: "AfroSport Group",                    size: "h-12 w-36" },
              ].map((logo) => (
                <div key={logo.alt} className={`relative grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ${logo.size}`}>
                  <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <WhoWeAre />
        <KnowledgeHubPreview products={products as never[]} />
        <IntelligenceAndPodcast />
        <TestimonialsCarousel testimonials={testimonials as never[]} />
        <EngageSection />
      </main>
      <Footer />
    </>
  );
}
