"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle } from "lucide-react";

export function NewsletterModal() {
  const [open, setOpen]           = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail]         = useState("");
  const [status, setStatus]       = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

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
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

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

            {/* Form / success */}
            <div className="px-8 py-6">
              {status === "success" ? (
                <div className="flex flex-col items-center text-center py-4 gap-3">
                  <CheckCircle size={40} className="text-[#F37021]" />
                  <h3 className="text-lg font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                    Welcome aboard!
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                    Check your inbox — a welcome email is on its way. If you don&apos;t see it, check your spam folder and mark us as safe.
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-2 text-sm font-semibold text-[#1b3d6e] hover:text-[#F37021] transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5 font-[family-name:var(--font-heading)]">
                      First name
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Your first name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1b3d6e]/30 focus:border-[#1b3d6e] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5 font-[family-name:var(--font-heading)]">
                      Email address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1b3d6e]/30 focus:border-[#1b3d6e] transition"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-500">
                      Something went wrong — please try again or email us directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-[#F37021] hover:bg-[#d65a14] disabled:opacity-60 text-white font-bold font-[family-name:var(--font-heading)] text-sm py-3.5 rounded-full transition-colors"
                  >
                    {status === "loading" ? "Subscribing…" : "Subscribe →"}
                  </button>

                  <p className="text-center text-xs text-gray-400 leading-snug">
                    Fortnightly newsletter. No spam. Unsubscribe any time.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
