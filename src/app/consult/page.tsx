import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { OrangeLine } from "@/components/ui/OrangeLine";
import { Button } from "@/components/ui/Button";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { sanityFetch } from "@/lib/sanity";
import { ALL_TESTIMONIALS_QUERY, ALL_CASE_STUDIES_QUERY, SITE_SETTINGS_QUERY } from "@/lib/queries";
import Image from "next/image";

export const revalidate = 60;

export const metadata = {
  title: "Advisory | Africa Sports Unified",
  description: "ASU Advisory provides strategic counsel to investors, federations, sponsors, and governments navigating Africa's sports economy.",
};

const SERVICES = [
  {
    number: "01",
    title: "Market Entry & Expansion",
    body: "Helping international brands, leagues, and investors identify the right markets, partners, and timing for entering or scaling in Africa.",
  },
  {
    number: "02",
    title: "Sponsorship Strategy",
    body: "Advising rights holders on packaging and selling sponsorship, and brands on identifying and valuing African sport sponsorship opportunities.",
  },
  {
    number: "03",
    title: "Governance & Institutional Reform",
    body: "Working with federations and national governing bodies on strategy, governance frameworks, and stakeholder engagement.",
  },
  {
    number: "04",
    title: "Media Rights & Content Strategy",
    body: "Supporting broadcasters, OTT platforms, and federations on rights valuation, distribution, and content strategy for African audiences.",
  },
  {
    number: "05",
    title: "Investment Advisory",
    body: "Providing due diligence support, sector mapping, and deal intelligence for private equity, venture, and strategic investors.",
  },
  {
    number: "06",
    title: "Event & Bid Strategy",
    body: "Advising cities, governments, and organisations on hosting bids, event strategy, and the economic case for major sport events.",
  },
];

const PROCESS = [
  {
    step: "1",
    title: "Initial Conversation",
    body: "A free 30-minute call to understand your situation, objectives, and how ASU can help.",
  },
  {
    step: "2",
    title: "Scoping & Proposal",
    body: "We define the scope, timeline, and fee structure — clear, transparent, and tailored to your needs.",
  },
  {
    step: "3",
    title: "Research & Analysis",
    body: "Deep-dive work drawing on ASU's proprietary data, continental networks, and sector expertise.",
  },
  {
    step: "4",
    title: "Delivery & Support",
    body: "A structured output — report, strategy, or ongoing retainer — with continued support as you act on it.",
  },
];

interface CaseStudy {
  _id: string;
  title: string;
  clientName?: string;
  summary?: string;
  outcomes?: string[];
  documentUrl?: string;
  clientLogo?: { asset?: { url: string }; alt?: string };
  heroImage?: { asset?: { url: string } };
}

interface SiteSettings {
  calendlyUrl?: string;
}

export default async function ConsultPage() {
  const [testimonials, caseStudies, settings] = await Promise.all([
    sanityFetch<never[]>(ALL_TESTIMONIALS_QUERY).catch(() => []),
    sanityFetch<CaseStudy[]>(ALL_CASE_STUDIES_QUERY).catch(() => []),
    sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY).catch(() => ({})),
  ]);

  const calendlyUrl = (settings as SiteSettings)?.calendlyUrl || "https://calendly.com/asunified";

  return (
    <>
      <Navbar />
      <main className="pt-18">
        <PageHero
          title="ASU Advisory"
          subtitle="Strategic counsel for the people and organisations shaping Africa's sports economy. We bring the intelligence, the networks, and the experience to help you move with confidence."
          imageSrc="/images/consult-hero.jpg"
          imageAlt="ASU Advisory"
        />

        {/* Intro */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <OrangeLine />
                <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                  The Advisory Firm Built for African Sport
                </h2>
                <p className="mt-5 text-gray-600 leading-relaxed">
                  ASU Advisory is the consulting arm of Africa Sports Unified. We work with a small number of clients at any one time, providing the depth of engagement and quality of thinking that complex African sport challenges require.
                </p>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Our clients include international brands entering African markets, federations navigating reform, investors evaluating opportunities, and governments building sport infrastructure strategies. What they share is a need for counsel grounded in real African sport expertise — not generic consultancy applied to a context the adviser doesn't understand.
                </p>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  We know the people, the politics, and the possibilities. That is what we bring.
                </p>
                <div className="mt-8">
                  <Button href={calendlyUrl} variant="primary" size="lg" external>
                    Book a Free Call →
                  </Button>
                </div>
              </div>

              {/* Right column accent card */}
              <div className="bg-[#1b3d6e] rounded-2xl p-8 text-white">
                <p className="text-[#F37021] font-bold text-xs uppercase tracking-widest font-[family-name:var(--font-heading)]">
                  Who We Work With
                </p>
                <ul className="mt-5 space-y-4">
                  {[
                    "International brands & sponsors entering African sport",
                    "Sports federations & national governing bodies",
                    "Private equity & venture investors",
                    "Broadcasters & media rights holders",
                    "Governments & development agencies",
                    "Football clubs, leagues & rights holders",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/85 leading-relaxed">
                      <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-[#F37021] flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1.5 4L3 5.5L6.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-[#f4f7fb]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <OrangeLine className="mx-auto" />
              <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                Our Advisory Services
              </h2>
              <p className="mt-3 text-gray-600">
                Focused expertise across the areas that matter most in African sport.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s) => (
                <div key={s.number} className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-[#F37021] font-extrabold text-2xl font-[family-name:var(--font-heading)]">
                    {s.number}
                  </span>
                  <h3 className="mt-3 text-base font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        {caseStudies.length > 0 && (
          <section className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-6">
              <div className="mb-12">
                <OrangeLine />
                <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                  Case Studies
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {caseStudies.map((cs) => (
                  <div key={cs._id} className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                    {cs.heroImage?.asset?.url && (
                      <div className="relative h-48">
                        <Image
                          src={cs.heroImage.asset.url}
                          alt={cs.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      {cs.clientName && (
                        <p className="text-[#F37021] text-xs font-bold uppercase tracking-wider font-[family-name:var(--font-heading)] mb-2">
                          {cs.clientName}
                        </p>
                      )}
                      <h3 className="text-base font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                        {cs.title}
                      </h3>
                      {cs.summary && (
                        <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-3">
                          {cs.summary}
                        </p>
                      )}
                      {cs.outcomes && cs.outcomes.length > 0 && (
                        <ul className="mt-4 space-y-1">
                          {cs.outcomes.slice(0, 3).map((o) => (
                            <li key={o} className="text-xs text-gray-500 flex items-start gap-2">
                              <span className="text-[#F37021] mt-0.5">▸</span> {o}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* How We Work */}
        <section className="py-20 bg-[#1b3d6e]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-14">
              <OrangeLine className="mx-auto" />
              <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-white font-[family-name:var(--font-heading)]">
                How We Work
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESS.map((p) => (
                <div key={p.step} className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-9 w-9 shrink-0 rounded-full bg-[#F37021] flex items-center justify-center text-white font-extrabold font-[family-name:var(--font-heading)] text-sm">
                      {p.step}
                    </span>
                    {/* connector line */}
                    <div className="hidden lg:block flex-1 h-px bg-white/20" />
                  </div>
                  <h3 className="text-white font-extrabold font-[family-name:var(--font-heading)] text-sm">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-white/70 text-sm leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <p className="text-white/80 text-base mb-6 max-w-xl mx-auto">
                Ready to explore how ASU Advisory can support your objectives? Start with a free, no-obligation conversation.
              </p>
              <Button href={calendlyUrl} variant="primary" size="lg" external>
                Book a Free 30-Minute Call →
              </Button>
            </div>
          </div>
        </section>

        <TestimonialsCarousel testimonials={testimonials} />
      </main>
      <Footer />
    </>
  );
}
