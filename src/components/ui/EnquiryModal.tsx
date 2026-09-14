"use client";

import { useState } from "react";
import { X, CheckCircle } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  subject?: string;
}

export function EnquiryModal({ open, onClose, subject = "" }: Props) {
  const [form, setForm] = useState({ firstName: "", email: "", company: "", message: subject });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setDone(true);
    } catch {
      setError("Something went wrong — please try again or email info@asunified.com directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-[#1b3d6e] px-8 py-7">
          <p className="text-[#F37021] text-[10px] font-bold uppercase tracking-widest font-[family-name:var(--font-heading)] mb-1">
            ASU Advisory
          </p>
          <h2 className="text-white text-xl font-extrabold font-[family-name:var(--font-heading)] leading-snug">
            Send us an enquiry
          </h2>
          <p className="text-white/60 text-sm mt-1">We'll get back to you within one business day.</p>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-7">
          {done ? (
            <div className="flex flex-col items-center text-center py-6 gap-4">
              <CheckCircle size={44} className="text-[#F37021]" />
              <h3 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                Enquiry received
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                Thanks — we'll be in touch shortly. Check your inbox for a confirmation.
              </p>
              <button
                onClick={onClose}
                className="mt-2 text-sm font-bold text-[#1b3d6e] font-[family-name:var(--font-heading)] hover:text-[#F37021] transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 font-[family-name:var(--font-heading)] mb-1.5">
                    First Name <span className="text-[#F37021]">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={form.firstName}
                    onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                    placeholder="Your first name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1b3d6e]/30"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 font-[family-name:var(--font-heading)] mb-1.5">
                    Email <span className="text-[#F37021]">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1b3d6e]/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 font-[family-name:var(--font-heading)] mb-1.5">
                  Company <span className="text-gray-400 font-normal normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  placeholder="Your organisation"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1b3d6e]/30"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 font-[family-name:var(--font-heading)] mb-1.5">
                  Message <span className="text-gray-400 font-normal normal-case tracking-normal">(optional)</span>
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us what you're looking for..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1b3d6e]/30 resize-none"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-[#F37021] text-white font-bold font-[family-name:var(--font-heading)] text-sm hover:bg-[#d65a14] transition-colors disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Enquiry →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
