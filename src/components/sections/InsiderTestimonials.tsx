"use client";

const TESTIMONIALS = [
  {
    id: "1",
    quote: "Africa Sports Unified is creating an important platform for African sport, one that gives stakeholders the opportunity to showcase what is being done across the continent and engage in meaningful conversations around development. A lot is being done in Africa, but we do not always have the spaces to share this with the world. Platforms like the ASU Connex Summit are therefore critical in shaping visibility, mindset, and collaboration. If we manage to be unified, we will manage to succeed and initiatives like ASU play an important role in making that happen.",
    name: "Kenny Jean-Marie",
    role: "Former Head of Member Associations Division, FIFA",
  },
  {
    id: "2",
    quote: "Africa Sports Unified is bringing the right people into the room to have the conversations that are often avoided but critical to the growth of sport across the continent. Real progress will depend on better alignment across stakeholders, and ASU is helping to move that forward.",
    name: "Abiola Ijasanmi",
    role: "Former Chief Operating Officer, CAF",
  },
];

function TestimonialCard({ item }: { item: typeof TESTIMONIALS[0] }) {
  return (
    <div className="flex flex-col gap-5">
      <blockquote className="text-white/90 text-lg leading-relaxed italic flex-1">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3 pt-2 border-t border-white/20">
        <div className="w-12 h-12 rounded-full bg-white/20 shrink-0 flex items-center justify-center">
          <span className="text-white/70 font-bold text-lg font-[family-name:var(--font-heading)]">
            {item.name.charAt(0)}
          </span>
        </div>
        <div className="min-w-0">
          <p className="font-[family-name:var(--font-heading)] font-bold text-white text-base leading-snug">{item.name}</p>
          <p className="text-white/60 text-sm leading-snug">{item.role}</p>
        </div>
      </div>
    </div>
  );
}

export function InsiderTestimonials() {
  return (
    <section className="bg-[#1b3d6e]">
      <div className="mx-auto max-w-7xl px-6 py-16 flex flex-col gap-8">
        <p className="font-[family-name:var(--font-heading)] text-sm font-bold uppercase tracking-[0.12em] text-[#F4A26B]">
          What they say
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {TESTIMONIALS.map((item) => <TestimonialCard key={item.id} item={item} />)}
        </div>
      </div>
    </section>
  );
}
