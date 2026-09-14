"use client";

import { useState } from "react";
import { EnquiryModal } from "./EnquiryModal";

export function CaseStudyLink() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-sm font-bold text-[#1b3d6e] font-[family-name:var(--font-heading)] hover:text-[#F37021] transition-colors"
      >
        Request the full case study →
      </button>
      <EnquiryModal
        open={open}
        onClose={() => setOpen(false)}
        subject="I'd like to request the full UNECA AfCFTA case study."
      />
    </>
  );
}

export function WorkWithASUButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-[#1b3d6e] text-[#1b3d6e] font-bold font-[family-name:var(--font-heading)] text-sm hover:bg-[#1b3d6e] hover:text-white transition-colors"
      >
        Work with ASU →
      </button>
      <EnquiryModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
