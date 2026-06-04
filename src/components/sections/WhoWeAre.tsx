import Link from "next/link";
import Image from "next/image";
import { OrangeLine } from "@/components/ui/OrangeLine";

export function WhoWeAre() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Centred intro */}
        <div className="text-center max-w-3xl mx-auto">
          <OrangeLine className="mx-auto" />
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
            Who We Are
          </h2>
          <p className="mt-2 text-lg font-bold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
            Pan-African focused. Globally Connected.
          </p>
          <p className="mt-4 text-base text-gray-600 leading-relaxed">
            Africa Sports Unified (ASU) is an intelligence and advisory platform shaping how sport is
            understood, valued, and executed as an economic sector across Africa.
          </p>
          <p className="mt-3 text-base text-gray-600 leading-relaxed">
            We work with governments, investors, rights holders and institutions to provide market
            intelligence, strategic advisory, and ecosystem access enabling better decisions, stronger
            partnerships, and long-term growth.
          </p>
          <Link
            href="/about"
            className="inline-block mt-5 text-[#F37021] font-semibold text-sm hover:underline font-[family-name:var(--font-heading)]"
          >
            Learn More &gt;
          </Link>
        </div>

        {/* Two cards: ASU Insider + Advisory */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ServiceCard
            tag="ASU INSIDER"
            title="Your Leverage in the African Sports Market"
            description="A private membership for decision-makers shaping Africa's sports economy. Where strategy, access & influence meet."
            ctaLabel="Join ASU Insider Today"
            ctaHref="/asu-insider"
            imageSrc="/images/asu-insider-card.jpg"
          />
          <ServiceCard
            tag="Advisory"
            title="Strategic Advisory for Sport Led Growth"
            description="Delivering sport-led strategies aligned to economic growth, trade, and long-term value creation for governments, rights holders, investors, brands, and institutions."
            ctaLabel="View Advisory Services"
            ctaHref="/consult"
            imageSrc="/images/advisory-card.jpg"
          />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  tag, title, description, ctaLabel, ctaHref, imageSrc,
}: {
  tag: string; title: string; description: string;
  ctaLabel: string; ctaHref: string; imageSrc: string;
}) {
  return (
    <div className="relative rounded-2xl overflow-hidden min-h-[420px] flex flex-col justify-end group">
      {/* Background image */}
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-8">
        {/* Tag badge */}
        <span className="inline-block mb-3 px-3 py-1 rounded-full border border-white/60 text-white text-xs font-semibold font-[family-name:var(--font-heading)] uppercase tracking-wider">
          {tag}
        </span>
        <p className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 font-[family-name:var(--font-heading)]">
          {tag}
        </p>
        <h3 className="text-xl font-bold text-white font-[family-name:var(--font-heading)] leading-tight">
          {title}
        </h3>
        <p className="mt-2 text-sm text-white/75 leading-relaxed">{description}</p>
        <Link
          href={ctaHref}
          className="mt-5 inline-flex items-center px-6 py-2.5 rounded-full bg-white text-[#1b3d6e] text-sm font-semibold font-[family-name:var(--font-heading)] hover:bg-[#F37021] hover:text-white transition-colors"
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}
