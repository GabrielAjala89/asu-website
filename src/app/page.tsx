import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroVideo } from "@/components/sections/HeroVideo";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
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
