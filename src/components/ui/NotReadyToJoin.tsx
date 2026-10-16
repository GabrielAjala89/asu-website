'use client';

import { useState } from 'react';
import { FreeMemberModal } from './FreeMemberModal';

export function NotReadyToJoin() {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-20 bg-[#f4f7fb] h-full flex flex-col">
      <div className="mx-auto max-w-7xl px-6 flex-1 flex flex-col">
        <div className="max-w-2xl mx-auto text-center flex-1 flex flex-col">
          <div className="mx-auto w-10 h-[3px] bg-[#F37021] rounded-full mb-6" />
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
            Not ready to join? Start free.
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed flex-1">
            Get the fortnightly ASU newsletter, executive summaries of every ASU report and the 2025 Deals Dataset, free.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="mt-8 inline-block px-8 py-4 rounded-full bg-[#1b3d6e] text-white font-bold font-[family-name:var(--font-heading)] text-sm hover:bg-[#142e54] transition-colors"
          >
            Join ASU free →
          </button>
        </div>
      </div>
      <FreeMemberModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
