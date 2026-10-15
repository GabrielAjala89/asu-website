import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";

export const metadata = {
  title: "Advisory | Africa Sports Unified",
  description: "Strategic advisory for Africa's sports economy. We advise governments, brands, investors and rights holders on how to create and capture value.",
};

const SERVICES = [
  {
    num: "01",
    title: "Governments",
    bullets: [
      "Sports economy strategy and policy",
      "AfCFTA and trade in sport services",
      "Institutional reform and strategic roadmaps",
      "Stakeholder engagement and capacity building",
    ],
  },
  {
    num: "02",
    title: "Brands and investors",
    bullets: [
      "Market entry and market sizing",
      "Partner and property selection",
      "Deal and investment intelligence",
      "Partnerships and market access",
    ],
  },
  {
    num: "03",
    title: "Rights holders and federations",
    bullets: [
      "Commercial strategy and revenue planning",
      "Sponsorship readiness",
      "Long term growth planning",
      "Partnerships and market access",
    ],
  },
];

const HOW_STEPS = [
  {
    num: "01",
    title: "Diagnose",
    body: "Define the decision you need to make and what success looks like.",
    highlight: false,
  },
  {
    num: "02",
    title: "Evidence",
    body: "Research, deal data and conversations with the people on the ground.",
    highlight: false,
  },
  {
    num: "03",
    title: "Strategy",
    body: "Clear recommendations, priorities and a plan you can act on.",
    highlight: false,
  },
  {
    num: "04",
    title: "Delivery support",
    body: "We stay with you through implementation, not just the report.",
    highlight: true,
  },
];

const UNECA_STATS = [
  { value: "2",  label: "research projects" },
  { value: "2",  label: "stakeholder events" },
  { value: "4",  label: "podcasts, 47% average consumption" },
  { value: "14", label: "entrepreneurs mentored over 6 months" },
];

const WAYS_TO_WORK = [
  {
    title: "Project",
    body: "A defined piece of work with a clear scope, timeline and outcome.",
  },
  {
    title: "Retainer",
    body: "Ongoing strategic counsel and intelligence, on call as decisions arise.",
  },
  {
    title: "Commissioned research",
    body: "Market studies, data and reports built around your question.",
  },
];

const GABRIEL_QUALS = [
  "MBA, SOAS University of London",
  "MSc Sports Management, Birkbeck, University of London",
  "BA Economics and Law, University of Leicester",
  "PRINCE2 Practitioner and Agile Scrum Master",
];

export default function AdvisoryPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="bg-[#1b3d6e] text-white">
          <div className="mx-auto max-w-7xl px-6 py-24 md:py-28 flex flex-col gap-6">
            <p className="font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-[0.14em] text-[#F4A26B]">
              ASU Advisory
            </p>
            <h1 className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(2.2rem,4.8vw,4rem)] leading-[1.1] max-w-[17ch]">
              Strategic Advisory for Africa&apos;s Sports Economy
            </h1>
            <p className="text-[clamp(1.1rem,1.6vw,1.3rem)] leading-relaxed text-[#E3E9F2] max-w-[46rem]">
              We advise governments, brands, investors and rights holders on how to create and capture value in Africa&apos;s sports economy.
            </p>
            <div className="mt-2">
              <a
                href="#call"
                className="inline-block px-7 py-[18px] rounded font-[family-name:var(--font-heading)] font-bold text-base bg-[#E8630A] text-[#030000] hover:bg-[#B04A06] hover:text-white transition-colors"
              >
                Book a strategy call
              </a>
            </div>
          </div>
        </section>

        {/* ── What we do ───────────────────────────────────────────────── */}
        <section id="services" className="py-24">
          <div className="mx-auto max-w-7xl px-6 flex flex-col gap-11">
            <div className="flex flex-col gap-3">
              <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(1.8rem,3vw,2.5rem)] text-[#1b3d6e] leading-tight">
                What we do
              </h2>
              <p className="text-lg text-[#4A5D7A]">Advice shaped around who you are and what you need to decide.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SERVICES.map((s) => (
                <div key={s.num} className="bg-[#F5F6F8] rounded p-8 flex flex-col gap-4">
                  <p className="font-[family-name:var(--font-heading)] font-bold text-sm text-[#B04A06]">{s.num}</p>
                  <h3 className="font-[family-name:var(--font-heading)] font-bold text-xl text-[#1b3d6e]">{s.title}</h3>
                  <ul className="space-y-1 pl-5 list-disc text-base text-[#4A4A4A] leading-relaxed">
                    {s.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How we work ──────────────────────────────────────────────── */}
        <section className="bg-[#1b3d6e] py-24">
          <div className="mx-auto max-w-7xl px-6 flex flex-col gap-11">
            <div className="flex flex-col gap-3">
              <p className="font-[family-name:var(--font-heading)] text-sm font-bold uppercase tracking-[0.12em] text-[#F4A26B]">
                How we work
              </p>
              <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(1.8rem,3.2vw,2.7rem)] text-white leading-tight max-w-[24ch]">
                We build the evidence base before we give the counsel.
              </h2>
            </div>
            <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 list-none p-0 m-0">
              {HOW_STEPS.map((s) => (
                <li key={s.num} className={`flex flex-col gap-3 border-t-2 pt-5 ${s.highlight ? "border-[#E8630A]" : "border-[#6F86A8]"}`}>
                  <span className="font-[family-name:var(--font-heading)] font-extrabold text-sm text-[#F4A26B]">{s.num}</span>
                  <h3 className="font-[family-name:var(--font-heading)] font-bold text-xl text-white">{s.title}</h3>
                  <p className="text-base leading-relaxed text-[#E3E9F2]">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── UNECA case study ─────────────────────────────────────────── */}
        <section id="work" className="py-24">
          <div className="mx-auto max-w-7xl px-6 flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <div className="relative h-16 w-44">
                <Image src="/images/trusted-by/uneca.webp" alt="UNECA" fill className="object-contain object-left" />
              </div>
              <p className="font-[family-name:var(--font-heading)] text-sm font-bold uppercase tracking-[0.12em] text-[#B04A06]">Case study</p>
              <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(1.7rem,2.8vw,2.3rem)] text-[#1b3d6e] leading-tight max-w-[30ch]">
                Leveraging Sport to Support the Inclusive Implementation of the AfCFTA
              </h2>
              <p className="text-[17px] text-[#4A5D7A]">
                For the UN Economic Commission for Africa and its African Trade Policy Centre. Led by Gabriel Ajala.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {UNECA_STATS.map((s) => (
                <div key={s.label} className="border border-gray-200 rounded p-6 flex flex-col gap-1.5">
                  <span className="font-[family-name:var(--font-heading)] font-extrabold text-5xl text-[#1b3d6e]">{s.value}</span>
                  <span className="text-sm text-[#4A5D7A]">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#F5F6F8] rounded p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <h3 className="font-[family-name:var(--font-heading)] font-bold text-lg text-[#1b3d6e]">Delivered</h3>
                <p className="text-base leading-relaxed text-[#4A4A4A]">Research, stakeholder events, a podcast series, a mentorship programme and policy recommendations to UNECA.</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-[family-name:var(--font-heading)] font-bold text-lg text-[#1b3d6e]">Results</h3>
                <p className="text-base leading-relaxed text-[#4A4A4A]">Every mentee rated the programme positively, every mentor would take part again, and a third of event attendees were women.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Alive & Kicking ──────────────────────────────────────────── */}
        <section className="bg-[#F5F6F8] py-24">
          <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="flex flex-col gap-5">
              <div className="h-16 w-44 bg-white rounded flex items-center justify-center px-4">
                <span className="font-[family-name:var(--font-heading)] font-bold text-base text-[#1b3d6e]">Alive &amp; Kicking</span>
              </div>
              <p className="font-[family-name:var(--font-heading)] text-sm font-bold uppercase tracking-[0.12em] text-[#B04A06]">Partnership brokering</p>
              <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(1.7rem,2.8vw,2.3rem)] text-[#1b3d6e] leading-tight">
                Alive &amp; Kicking
              </h2>
              <p className="text-[17px] leading-relaxed text-[#4A4A4A]">
                Alive &amp; Kicking presented at an ASU webinar, where FIFA first saw their work. The relationship that followed made AK the first African manufacturer of FIFA licensed footballs.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-white rounded p-6 flex flex-col gap-1.5">
                  <span className="font-[family-name:var(--font-heading)] font-extrabold text-4xl text-[#1b3d6e]">27,000</span>
                  <span className="text-sm text-[#4A5D7A]">additional ball sales in 2022</span>
                </div>
                <div className="bg-white rounded p-6 flex flex-col gap-1.5">
                  <span className="font-[family-name:var(--font-heading)] font-extrabold text-4xl text-[#1b3d6e]">64%</span>
                  <span className="text-sm text-[#4A5D7A]">increase on the previous year</span>
                </div>
              </div>
            </div>
            <figure className="m-0 bg-white border-t-4 border-[#E8630A] rounded p-9 flex flex-col gap-6">
              <blockquote className="m-0 text-xl leading-relaxed italic text-[#4A4A4A]">
                &ldquo;ASU have been pivotal in AK&apos;s growth since our first introduction in 2019. Thanks to ASU&apos;s support, AK became the first African manufacturer of FIFA licensed footballs, opening us up to new markets and driving an additional 27,000 ball sales in 2022, an increase of 64% from the previous year.&rdquo;
              </blockquote>
              <figcaption className="flex flex-col gap-1">
                <span className="font-[family-name:var(--font-heading)] font-bold text-base text-[#1b3d6e]">Ben Sadler</span>
                <span className="text-sm text-[#4A5D7A]">Former CEO, Alive &amp; Kicking</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ── Led by ───────────────────────────────────────────────────── */}
        <section id="lead" className="py-24">
          <div className="mx-auto max-w-7xl px-6 flex flex-wrap gap-12 items-center">
            <div className="flex-1 min-w-[280px] max-w-[360px] aspect-[4/5] bg-[#F5F6F8] rounded flex items-center justify-center text-[#4A5D7A] text-sm border-2 border-dashed border-[#C4CAD3]">
              [Photo of Gabriel — coming soon]
            </div>
            <div className="flex-[999] min-w-0 flex flex-col gap-5">
              <p className="font-[family-name:var(--font-heading)] text-sm font-bold uppercase tracking-[0.12em] text-[#B04A06]">Led by</p>
              <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(1.7rem,2.8vw,2.3rem)] text-[#1b3d6e]">Gabriel Ajala</h2>
              <p className="text-[17px] text-[#4A5D7A]">Founder and Lead Partner, Africa Sports Unified</p>
              <p className="text-[17px] leading-relaxed text-[#4A4A4A]">
                Gabriel founded ASU after finding there was no reliable data on Africa&apos;s sports markets. He combines sports business expertise with years of programme and project delivery, so advice comes with a plan to deliver it.
              </p>
              <ul className="space-y-1.5 pl-5 list-disc text-base text-[#4A4A4A] leading-relaxed">
                {GABRIEL_QUALS.map((q) => <li key={q}>{q}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Ways to work ─────────────────────────────────────────────── */}
        <section id="engage" className="border-t border-gray-100 py-24">
          <div className="mx-auto max-w-7xl px-6 flex flex-col gap-10">
            <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(1.8rem,3vw,2.5rem)] text-[#1b3d6e] leading-tight">
              Ways to work with us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {WAYS_TO_WORK.map((w) => (
                <div key={w.title} className="border border-gray-200 rounded p-8 flex flex-col gap-3">
                  <h3 className="font-[family-name:var(--font-heading)] font-bold text-xl text-[#1b3d6e]">{w.title}</h3>
                  <p className="text-base leading-relaxed text-[#4A4A4A]">{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Black CTA ────────────────────────────────────────────────── */}
        <section id="call" className="bg-[#030000]">
          <div className="mx-auto max-w-7xl px-6 py-14 flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-col gap-2 flex-1 min-w-[280px]">
              <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(1.5rem,2.4vw,2rem)] text-white">
                Let&apos;s talk
              </h2>
              <p className="text-[17px] leading-snug text-[#E3E9F2]">
                Tell us what you are trying to decide. A 30 minute call is the best place to start.
              </p>
            </div>
            <a
              href="mailto:info@asunified.com"
              className="px-7 py-[18px] rounded font-[family-name:var(--font-heading)] font-bold text-base bg-[#E8630A] text-[#030000] hover:bg-[#B04A06] hover:text-white transition-colors whitespace-nowrap"
            >
              Book a strategy call
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
