import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrangeLine } from "@/components/ui/OrangeLine";
import { EngageSection } from "@/components/sections/EngageSection";
import Image from "next/image";
import { Network, Users, Briefcase } from "lucide-react";

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
    bg: "bg-[#1b3d6e]",
    Icon: Network,
  },
  {
    title: "Community",
    description:
      "ASU Insider connects the professionals, investors, and organisations shaping African sport — creating the conditions for collaboration, deals, and knowledge exchange.",
    bg: "bg-[#F37021]",
    Icon: Users,
  },
  {
    title: "Advisory",
    description:
      "Strategic counsel for federations, investors, sponsors, and governments navigating African sport. We bring on-the-ground expertise and continental relationships.",
    bg: "bg-[#1b3d6e]",
    Icon: Briefcase,
  },
];

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

        {/* ── Our Belief + Our Mission (shared gray bg) ─────────────────────── */}
        <section className="py-20 bg-[#f4f7fb]">
          <div className="mx-auto max-w-4xl px-6">

            {/* Belief */}
            <OrangeLine />
            <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
              Our Belief
            </h2>
            <p className="mt-5 text-gray-700 leading-relaxed text-base md:text-lg">
              We believe a thriving Pan-African sports market drives growth across Africa and Abroad. Sport connects people, markets, capital, and ideas. It creates opportunities for investment, employment, and national pride. At ASU, we recognise this potential and are committed to realising it through intelligence, advisory, and ecosystem building.
            </p>

            {/* Mission */}
            <div className="mt-14">
              <OrangeLine />
              <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                Our Mission
              </h2>
              <p className="mt-5 text-gray-700 leading-relaxed text-base md:text-lg">
                Our mission is to shape and support the growth of Africa&apos;s sports economy through intelligence, advisory, and ecosystem access.
              </p>
              <p className="mt-8 text-[#1b3d6e] font-bold text-sm uppercase tracking-wider font-[family-name:var(--font-heading)]">
                We do this by:
              </p>
            </div>
          </div>

          {/* Pillar boxes — full width within container */}
          <div className="mx-auto max-w-7xl px-6 mt-8">
            <div className="grid md:grid-cols-3 gap-6">
              {PILLARS.map((p) => (
                <div key={p.title} className={`${p.bg} rounded-2xl p-10 flex flex-col items-center text-center`}>
                  <p.Icon size={44} className="text-white" strokeWidth={1.5} />
                  <h3 className="mt-5 text-lg font-extrabold text-white font-[family-name:var(--font-heading)]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/80 leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Advisory Board ────────────────────────────────────────────────── */}
        <section className="py-20 bg-white">
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
