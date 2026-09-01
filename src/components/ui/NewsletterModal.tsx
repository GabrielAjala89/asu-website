"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: Record<string, unknown>) => void;
      };
    };
  }
}

export function NewsletterModal() {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const formCreated = useRef(false);

  useEffect(() => {
    if (!open) return;

    const createForm = () => {
      if (formCreated.current || !formRef.current) return;
      formCreated.current = true;
      window.hbspt!.forms.create({
        region: "eu1",
        portalId: "25075380",
        formId: "f75cf6de-9bdc-4fcc-b5c2-9ec5236bfa33",
        target: "#hs-form-container",
      });
    };

    if (window.hbspt) {
      createForm();
      return;
    }

    const script = document.createElement("script");
    script.src = "//js-eu1.hsforms.net/forms/embed/v2.js";
    script.charset = "utf-8";
    script.type = "text/javascript";
    script.onload = createForm;
    document.head.appendChild(script);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-white/80 text-white text-sm font-semibold font-[family-name:var(--font-heading)] hover:bg-white hover:text-[#1b3d6e] transition-colors"
      >
        Subscribe to our Newsletter →
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Newsletter sign up"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal card */}
          <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-[#1b3d6e] px-8 py-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-[#F37021] uppercase tracking-widest font-[family-name:var(--font-heading)] mb-1">
                    ASU Newsletter
                  </p>
                  <h2 className="text-xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-snug">
                    Africa&apos;s Sports Economy — In Your Inbox
                  </h2>
                  <p className="mt-1.5 text-sm text-white/70">
                    Intelligence, analysis, and industry insight. No spam.
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="shrink-0 p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Form area */}
            <div className="px-8 py-6">
              <div id="hs-form-container" ref={formRef} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
