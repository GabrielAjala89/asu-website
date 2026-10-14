import Link from "next/link";
import { OrangeLine } from "@/components/ui/OrangeLine";

interface MarketOpportunityProps {
  stat?: string;
  line1: string;
  line2?: string;
  button?: { label: string; href: string };
}

export function MarketOpportunity({ stat, line1, line2, button }: MarketOpportunityProps) {
  return (
    <section className="bg-[#1b3d6e] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end gap-10">
          <div className="flex-1">
            <span className="inline-block mb-5 px-3 py-1 rounded-full border border-[#F37021]/60 text-[#F37021] text-[10px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-heading)]">
              Market Opportunity
            </span>
            {stat && (
              <p className="text-5xl md:text-6xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-none mb-6">
                {stat}
              </p>
            )}
            <OrangeLine />
            <p className="mt-4 text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl">
              {line1}
            </p>
            {line2 && (
              <p className="mt-3 text-white/70 text-base leading-relaxed max-w-2xl">
                {line2}
              </p>
            )}
            <p className="mt-6 text-white/35 text-xs font-[family-name:var(--font-heading)]">
              Source: African Union Sports Council
            </p>
          </div>
          {button && (
            <div className="flex-shrink-0">
              <Link
                href={button.href}
                className="inline-block px-8 py-4 rounded-full bg-[#F37021] text-white font-bold font-[family-name:var(--font-heading)] text-sm hover:bg-[#d65a14] transition-colors whitespace-nowrap"
              >
                {button.label} →
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
