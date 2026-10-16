"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  organisation?: string;
  quote: string;
  photo?: { asset?: { url: string; metadata?: { dimensions?: { width: number; height: number } } } };
  organisationLogo?: { asset?: { url: string }; alt?: string };
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    _id: "1",
    name: "Ben Sadler",
    role: "Former CEO, Alive & Kicking",
    quote: "ASU have been pivotal in AK's growth since our first introduction in 2019. Thanks to ASU's support, AK became the first African manufacturer of FIFA licensed footballs, opening us up to new markets and driving an additional 27,000 ball sales in 2022, an increase of 64% from the previous year.",
  },
  {
    _id: "2",
    name: "Gelson Fernandes",
    role: "Former FIFA Player Representative and International Football Player",
    quote: "Africa Sports Unified is building something important — a credible, evidence-based platform that gives African sport the visibility and strategic support it deserves on the global stage.",
  },
];

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="flex flex-col gap-5">
      <blockquote className="text-white/90 text-lg leading-relaxed italic flex-1">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3 pt-2 border-t border-white/20">
        {item.photo?.asset?.url ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/30 shrink-0">
            <Image src={item.photo.asset.url} alt={item.name} fill className="object-cover object-top" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-white/20 shrink-0 flex items-center justify-center">
            <span className="text-white/60 font-bold text-lg font-[family-name:var(--font-heading)]">
              {item.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="min-w-0">
          <p className="font-[family-name:var(--font-heading)] font-bold text-white text-base leading-snug">{item.name}</p>
          {item.role && <p className="text-white/60 text-sm leading-snug">{item.role}</p>}
        </div>
      </div>
    </div>
  );
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const items = testimonials?.length > 0 ? testimonials : FALLBACK_TESTIMONIALS;
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const next = () => setCurrent((c) => (c + 1) % items.length);

  // Two or fewer: show side by side on desktop
  if (items.length <= 2) {
    return (
      <section className="bg-[#1b3d6e]">
        <div className="mx-auto max-w-7xl px-6 py-16 flex flex-col gap-8">
          <p className="font-[family-name:var(--font-heading)] text-sm font-bold uppercase tracking-[0.12em] text-[#F4A26B]">
            What they say
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {items.map((item) => <TestimonialCard key={item._id} item={item} />)}
          </div>
        </div>
      </section>
    );
  }

  // More than 2: slider
  const item = items[current];

  return (
    <section className="relative overflow-hidden bg-[#1b3d6e] min-h-[480px] flex items-center">
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 w-full">
        <div className="max-w-2xl">
          {item.photo?.asset?.url && (
            <div className="relative w-14 h-14 rounded-full overflow-hidden mb-4 ring-2 ring-white/30">
              <Image src={item.photo.asset.url} alt={item.name} fill className="object-cover object-top" />
            </div>
          )}
          <h3 className="text-2xl md:text-3xl font-extrabold text-white font-[family-name:var(--font-heading)]">
            {item.name}
          </h3>
          {item.role && <p className="text-white/70 text-sm mt-1">{item.role}</p>}
          <blockquote className="mt-6 text-white/90 text-lg leading-relaxed italic">{item.quote}</blockquote>
        </div>
      </div>

      <button type="button" onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/70 hover:text-white" aria-label="Previous">
        <ChevronLeft size={28} />
      </button>
      <button type="button" onClick={next} className="absolute right-12 top-1/2 -translate-y-1/2 z-20 p-2 text-white/70 hover:text-white" aria-label="Next">
        <ChevronRight size={28} />
      </button>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex">
        <span className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold font-[family-name:var(--font-heading)] [writing-mode:vertical-rl] rotate-180">
          What they say about us?
        </span>
      </div>
    </section>
  );
}
