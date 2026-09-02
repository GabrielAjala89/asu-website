import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrangeLine } from "@/components/ui/OrangeLine";
import { EngageSection } from "@/components/sections/EngageSection";
import Image from "next/image";
import { Network, Users, Briefcase } from "lucide-react";

export const revalidate = 60;

export const metadata = {
  title: "About",
  description: "Africa Sports Unified is the leading Pan-African sport intelligence and advisory firm — connecting decision-makers, investors, and institutions across the continent's sports economy.",
};

const PILLARS = [
  {
    title: "Intelligence",
    description:
      "Original research, data, and analysis covering media rights, sponsorship, infrastructure investment, and talent pipelines across the African sports economy.",
    bg: "bg-[#1b3d6e]",
    Icon: Network,
  },
  {
    title: "Ecosystem",
    description:
      "ASU Insider connects the professionals, investors, and organisations shaping African sport, creating the conditions for collaboration, deals, and knowledge exchange.",
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

        {/* ── Why We Built This ─────────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-4xl px-6">
            <OrangeLine />
            <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
              Why We Built This
            </h2>
            <p className="mt-5 text-gray-700 leading-relaxed text-base md:text-lg">
              During a postgraduate research project at Birkbeck University, our founder, Gabriel Ajala, set out to write a dissertation on the Nigerian Professional Football League. The data wasn&apos;t there. The reports didn&apos;t exist. The resources that any stakeholder would take for granted in a mature sports market simply weren&apos;t available for Africa.
            </p>
            <p className="mt-5 text-gray-700 leading-relaxed text-base md:text-lg">
              When he raised this with people working inside the industry, the response was consistent: <span className="font-bold italic text-gray-900">there is no go-to place for this.</span> That gap between the scale of Africa&apos;s sports economy and the quality of intelligence available to navigate it is why Africa Sports Unified exists. Not as a response to a market opportunity, but as a solution to a problem we experienced firsthand.
            </p>
            <p className="mt-5 text-gray-700 leading-relaxed text-base md:text-lg">
              Everything ASU produces is built on that original frustration. The people making decisions about African sport deserve the same quality of intelligence, data, and strategic support available anywhere else in the world. We built ASU to close that gap. And we&apos;re not done yet.
            </p>
          </div>
        </section>

        {/* ── Our Belief + Our Mission (shared gray bg) ─────────────────────── */}
        <section className="py-20 bg-[#f4f7fb]">
          {/* Belief + Mission side by side */}
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid md:grid-cols-2 gap-12">

              <div>
                <OrangeLine />
                <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                  Our Belief
                </h2>
                <p className="mt-5 text-gray-700 leading-relaxed text-base md:text-lg">
                  We believe a thriving Pan-African sports market drives growth across Africa and Abroad. Sport connects people, markets, capital, and ideas. It creates opportunities for investment, employment, and national pride. At ASU, we recognise this potential and are committed to realising it through intelligence, advisory, and ecosystem building.
                </p>
              </div>

              <div>
                <OrangeLine />
                <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                  Our Mission
                </h2>
                <p className="mt-5 text-gray-700 leading-relaxed text-base md:text-lg">
                  Our mission is to shape and support the growth of Africa&apos;s sports economy through intelligence, advisory, and ecosystem access.
                </p>
              </div>

            </div>
          </div>

          {/* Pillar boxes */}
          <div className="mx-auto max-w-7xl px-6 mt-16">
            <p className="text-[#1b3d6e] font-bold text-sm uppercase tracking-wider font-[family-name:var(--font-heading)] mb-8">
              We do this by:
            </p>
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

        {/* Advisory Board — hidden until real members are confirmed */}

        <EngageSection />
      </main>
      <Footer />
    </>
  );
}
