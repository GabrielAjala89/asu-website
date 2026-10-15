import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroVideo } from "@/components/sections/HeroVideo";
import { DealsTrackerStats } from "@/components/sections/DealsTrackerStats";
import { AdvisoryWhoWeWorkWith } from "@/components/sections/AdvisoryWhoWeWorkWith";
import { DealsTrackerCharts } from "@/components/sections/DealsTrackerCharts";
import { InsiderClosingBand } from "@/components/sections/InsiderClosingBand";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import Image from "next/image";
import { sanityFetch } from "@/lib/sanity";
import { ALL_TESTIMONIALS_QUERY } from "@/lib/queries";

export const revalidate = 60;

const TRUSTED_BY = [
  { src: "/images/trusted-by/fifa.png",   alt: "FIFA",    size: "h-10 w-28" },
  { src: "/images/trusted-by/caf.png",    alt: "CAF",     size: "h-10 w-28" },
  { src: "/images/trusted-by/uneca.webp", alt: "UNECA",   size: "h-20 w-20" },
  { src: "/images/trusted-by/afcfta.jpg", alt: "AfCFTA",  size: "h-16 w-44" },
];

export default async function HomePage() {
  const testimonials = await sanityFetch(ALL_TESTIMONIALS_QUERY).catch(() => []);

  return (
    <>
      <Navbar transparent />
      <main>
        <HeroVideo />

        {/* ── Trusted by ──────────────────────────────────────────────── */}
        <section className="border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col items-center gap-6">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#4A5D7A] font-[family-name:var(--font-heading)]">
              Trusted by
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
              {TRUSTED_BY.map((logo) => (
                <div key={logo.alt} className={`relative grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ${logo.size}`}>
                  <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
                </div>
              ))}
            </div>
            <p className="text-base text-[#4A5D7A]">
              And a network of 4,300 senior leaders across African sport.
            </p>
          </div>
        </section>

        <DealsTrackerStats />
        <AdvisoryWhoWeWorkWith />
        <TestimonialsCarousel testimonials={testimonials as never[]} />
        <DealsTrackerCharts />
        <InsiderClosingBand />
      </main>
      <Footer />
    </>
  );
}
