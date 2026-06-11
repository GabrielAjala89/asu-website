import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrangeLine } from "@/components/ui/OrangeLine";
import { EngageSection } from "@/components/sections/EngageSection";
import Image from "next/image";

export const revalidate = 60;

export const metadata = {
  title: "About | Africa Sports Unified",
  description: "Africa Sports Unified is the leading Pan-African sport intelligence and advisory firm — connecting decision-makers, investors, and institutions across the continent's sports economy.",
};

const PILLARS = [
  {
    title: "Intelligence",
    description:
      "Original research, data, and analysis tracking the African sports economy — from media rights and sponsorship to infrastructure investment and talent pipelines.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="4" y="24" width="8" height="16" rx="2" fill="#F37021" />
        <rect x="18" y="14" width="8" height="26" rx="2" fill="#F37021" fillOpacity="0.7" />
        <rect x="32" y="4" width="8" height="36" rx="2" fill="#F37021" fillOpacity="0.4" />
      </svg>
    ),
  },
  {
    title: "Community",
    description:
      "ASU Insider connects the professionals, investors, and organisations shaping African sport — creating the conditions for collaboration, deals, and knowledge exchange.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="22" cy="14" r="7" stroke="#F37021" strokeWidth="2.5" />
        <circle cx="8" cy="30" r="5" stroke="#F37021" strokeWidth="2.5" />
        <circle cx="36" cy="30" r="5" stroke="#F37021" strokeWidth="2.5" />
        <line x1="16" y1="20" x2="11" y2="26" stroke="#F37021" strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="20" x2="33" y2="26" stroke="#F37021" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Advisory",
    description:
      "Strategic counsel for federations, investors, sponsors, and governments navigating African sport. We bring on-the-ground expertise and continental relationships.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="6" y="16" width="32" height="22" rx="3" stroke="#F37021" strokeWidth="2.5" />
        <path d="M16 16V12C16 10.3 17.3 9 19 9H25C26.7 9 28 10.3 28 12V16" stroke="#F37021" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="6" y1="26" x2="38" y2="26" stroke="#F37021" strokeWidth="2" strokeLinecap="round" />
        <line x1="22" y1="21" x2="22" y2="31" stroke="#F37021" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

// Replace with real advisory board members when available
const BOARD_MEMBERS = [
  { name: "Advisory Member", role: "Title · Organisation" },
  { name: "Advisory Member", role: "Title · Organisation" },
  { name: "Advisory Member", role: "Title · Organisation" },
  { name: "Advisory Member", role: "Title · Organisation" },
  { name: "Advisory Member", role: "Title · Organisation" },
  { name: "Advisory Member", role: "Title · Organisation" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[75vh] flex items-end overflow-hidden">
          <Image
            src="/images/about-hero.jpg"
            alt="Africa Sports Unified — defining and enabling the African sports economy"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b3d6e]/90 via-[#1b3d6e]/40 to-transparent" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 w-full pb-16 md:pb-24">
            <OrangeLine />
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-tight max-w-3xl">
              Defining and Enabling the African Sports Economy
            </h1>
            <p className="mt-4 text-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
              We bring clarity, coordination, and strategic direction to the organisations shaping sport as an economic sector across Africa.
            </p>
          </div>
        </section>

        {/* ── Our Belief ────────────────────────────────────────────────────── */}
        <section className="py-20 bg-[#f4f7fb]">
          <div className="mx-auto max-w-4xl px-6">
            <OrangeLine />
            <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
              Our Belief
            </h2>
            <p className="mt-5 text-gray-700 leading-relaxed text-base md:text-lg">
              African sport is one of the most significant and most underestimated forces in the global sports economy. Across 54 nations, with a young and growing population, an expanding middle class, and extraordinary athletic talent, the conditions exist for a profound transformation in how sport is organised, financed, and experienced on the continent.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed text-base md:text-lg">
              But that transformation needs clear-eyed intelligence, strategic direction, and the right networks to happen. Without it, the decisions being made now — by investors, governments, federations, and brands — will miss the mark. With it, the opportunity is extraordinary.
            </p>
          </div>
        </section>

        {/* ── Our Mission + 3 pillars ───────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-4xl">
              <OrangeLine />
              <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                Our Mission
              </h2>
              <p className="mt-5 text-gray-700 leading-relaxed text-base md:text-lg">
                Our mission is to build the infrastructure of knowledge and relationships that Africa&apos;s sports economy needs to grow with purpose. We exist to close the information gap — giving decision-makers the intelligence, the analysis, and the connections required to act with confidence.
              </p>
              <p className="mt-6 text-[#1b3d6e] font-bold text-sm uppercase tracking-wider font-[family-name:var(--font-heading)]">
                We do this by:
              </p>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {PILLARS.map((p) => (
                <div key={p.title} className="bg-[#f4f7fb] rounded-2xl p-8">
                  <div className="mb-5">{p.icon}</div>
                  <h3 className="text-lg font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Advisory Board ────────────────────────────────────────────────── */}
        <section className="py-20 bg-[#f4f7fb]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-14">
              <OrangeLine className="mx-auto" />
              <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                Meet our Advisory Board
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
              {BOARD_MEMBERS.map((member, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-[#dde6f0] flex items-center justify-center overflow-hidden relative shrink-0">
                    <Image
                      src={`/images/board-${i + 1}.jpg`}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-3 text-sm font-bold text-[#1b3d6e] font-[family-name:var(--font-heading)] leading-tight">
                    {member.name}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 leading-snug">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <EngageSection />
      </main>
      <Footer />
    </>
  );
}
