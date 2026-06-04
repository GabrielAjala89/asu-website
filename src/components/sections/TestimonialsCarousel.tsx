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
  photo?: { asset?: { url: string } };
  organisationLogo?: { asset?: { url: string }; alt?: string };
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    _id: "1",
    name: "Testimonial coming soon",
    role: "Role",
    organisation: "Organisation",
    quote: "We are gathering testimonials from industry leaders. Check back soon.",
  },
];

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const items = testimonials?.length > 0 ? testimonials : FALLBACK_TESTIMONIALS;
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const next = () => setCurrent((c) => (c + 1) % items.length);

  const item = items[current];

  return (
    <section className="relative overflow-hidden bg-[#1b3d6e] min-h-[480px] flex items-center">
      {/* Background photo */}
      {item.photo?.asset?.url && (
        <>
          <Image
            src={item.photo.asset.url}
            alt={item.name}
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1b3d6e]/90 via-[#1b3d6e]/60 to-transparent" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 w-full">
        <div className="max-w-2xl">
          {/* Org logo */}
          {item.organisationLogo?.asset?.url && (
            <div className="relative h-8 w-24 mb-5">
              <Image
                src={item.organisationLogo.asset.url}
                alt={item.organisationLogo.alt || item.organisation || ""}
                fill
                className="object-contain object-left brightness-0 invert"
              />
            </div>
          )}
          {!item.organisationLogo && item.organisation && (
            <p className="text-white/60 font-bold text-sm uppercase tracking-wider mb-5 font-[family-name:var(--font-heading)]">
              {item.organisation}
            </p>
          )}

          <h3 className="text-2xl md:text-3xl font-extrabold text-white font-[family-name:var(--font-heading)]">
            {item.name}
          </h3>
          {item.role && (
            <p className="text-white/70 text-sm mt-1">{item.role}</p>
          )}

          <blockquote className="mt-6 text-white/90 text-lg leading-relaxed italic">
            {item.quote}
          </blockquote>
        </div>
      </div>

      {/* Navigation arrows */}
      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-12 top-1/2 -translate-y-1/2 z-20 p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

      {/* "What they say about us" vertical label */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex">
        <span className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold font-[family-name:var(--font-heading)] [writing-mode:vertical-rl] rotate-180">
          What they say about us?
        </span>
      </div>
    </section>
  );
}
