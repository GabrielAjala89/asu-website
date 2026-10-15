"use client";

import { useState } from "react";

const TESTIMONIALS = [
  {
    quote: "Africa Sports Unified is creating an important platform for African sport, one that gives stakeholders the opportunity to showcase what is being done across the continent and engage in meaningful conversations around development. A lot is being done in Africa, but we do not always have the spaces to share this with the world. Platforms like the ASU Connex Summit are therefore critical in shaping visibility, mindset, and collaboration. If we manage to be unified, we will manage to succeed and initiatives like ASU play an important role in making that happen.",
    name: "Kenny Jean-Marie",
    role: "Former Head of Member Associations Division, FIFA",
  },
  {
    quote: "Africa Sports Unified is bringing the right people into the room to have the conversations that are often avoided but critical to the growth of sport across the continent. Real progress will depend on better alignment across stakeholders, and ASU is helping to move that forward.",
    name: "Abiola Ijasanmi",
    role: "Former Chief Operating Officer, CAF",
  },
];

export function InsiderTestimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  const item = TESTIMONIALS[current];

  return (
    <section className="relative overflow-hidden bg-[#1b3d6e] min-h-[480px] flex items-center">
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 w-full">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white font-[family-name:var(--font-heading)]">
            {item.name}
          </h2>
          <p className="text-white/70 text-sm mt-1">{item.role}</p>
          <blockquote className="mt-6 text-white/90 text-lg leading-relaxed italic">
            {item.quote}
          </blockquote>
        </div>
      </div>

      {/* Navigation */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/70 hover:text-white transition-colors"
        aria-label="Previous"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-12 top-1/2 -translate-y-1/2 z-20 p-2 text-white/70 hover:text-white transition-colors"
        aria-label="Next"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex">
        <span className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold font-[family-name:var(--font-heading)] [writing-mode:vertical-rl] rotate-180">
          What they say about us?
        </span>
      </div>
    </section>
  );
}
