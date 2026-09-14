"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { EnquiryModal } from "./EnquiryModal";

export function FooterEmailButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Email us"
        className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors shrink-0 text-white"
      >
        <Mail size={15} />
      </button>
      <EnquiryModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
