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
            Pan African focus. Global connections.
          </p>
          <p className="mt-4 text-base text-gray-600 leading-relaxed">
            Africa&apos;s sports economy is growing fast, but reliable data and trusted relationships are hard to find. ASU closes that gap. We help governments, investors, rights holders and brands understand the market, find the right partners and make decisions that create lasting value.
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
            title="Never make an African sports decision blind."
            description="ASU Insider is the membership for brands, rights holders, investors and governments who need trusted data and access to the people who decide."
            ctaLabel="Explore ASU Insider"
            ctaHref="/asu-insider"
            imageSrc="/images/asu-insider-card.jpg"
          />
          <ServiceCard
            tag="Advisory"
            title="Turn sport into economic growth."
            description="Strategic advice for governments, rights holders, investors and brands, designing sport plans that attract investment, unlock commercial revenue and deliver long term value."
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
