"use client";

import { useState } from "react";
import { FreeMemberModal } from "./FreeMemberModal";

export function NewsletterModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-white/80 text-white text-sm font-semibold font-[family-name:var(--font-heading)] hover:bg-white hover:text-[#1b3d6e] transition-colors"
      >
        Join ASU — Free →
      </button>
      <FreeMemberModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
