"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle } from "lucide-react";

const SECTORS = [
  "Investor",
  "Rights Holder",
  "Government / Public Sector",
  "Sponsor / Brand",
  "Sports Agency",
  "Consultant / Advisor",
  "Media / Journalist",
  "Other",
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function FreeMemberModal({ open, onClose }: Props) {
  const [tab,       setTab]      = useState<"new" | "existing">("new");

  // New member fields
  const [firstName, setFirstName] = useState("");
  const [email,     setEmail]     = useState("");
  const [company,   setCompany]   = useState("");
  const [jobTitle,  setJobTitle]  = useState("");
  const [sector,    setSector]    = useState("");

  // Existing member
  const [resendEmail, setResendEmail] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "not_found">("idle");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Reset state when switching tabs or closing
  useEffect(() => {
    setStatus("idle");
  }, [tab, open]);

  async function handleNewSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/free-member/register", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ firstName, email, company, jobTitle, sector }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  async function handleResendSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/free-member/resend", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email: resendEmail }),
      });
      if (res.status === 404) { setStatus("not_found"); return; }
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Free member sign up"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#1b3d6e] px-8 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-[#F37021] uppercase tracking-widest font-[family-name:var(--font-heading)] mb-1">
                Free ASU Membership
              </p>
              <h2 className="text-xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-snug">
                Join the ASU free tier
              </h2>
              <p className="mt-1.5 text-sm text-white/70">
                Get our fortnightly newsletter, the full 2025 Deals Dataset, and access to free reports — no charge.
              </p>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Tab toggle */}
          <div className="mt-5 flex rounded-xl bg-white/10 p-1 gap-1">
            <button
              onClick={() => setTab("new")}
              className={`flex-1 text-xs font-bold font-[family-name:var(--font-heading)] py-2 rounded-lg transition-colors ${
                tab === "new" ? "bg-white text-[#1b3d6e]" : "text-white/70 hover:text-white"
              }`}
            >
              New member
            </button>
            <button
              onClick={() => setTab("existing")}
              className={`flex-1 text-xs font-bold font-[family-name:var(--font-heading)] py-2 rounded-lg transition-colors ${
                tab === "existing" ? "bg-white text-[#1b3d6e]" : "text-white/70 hover:text-white"
              }`}
            >
              Already a member
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          {status === "success" ? (
            <div className="flex flex-col items-center text-center py-4 gap-3">
              <CheckCircle size={40} className="text-[#F37021]" />
              <h3 className="text-lg font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                {tab === "new" ? "Check your inbox" : "Download link sent"}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                {tab === "new"
                  ? `We've sent a confirmation link to ${email}. Click it and the dataset will be on its way immediately.`
                  : `We've sent your download link to ${resendEmail}. Check your inbox.`}
              </p>
              <button onClick={onClose} className="mt-2 text-sm font-semibold text-[#1b3d6e] hover:text-[#F37021] transition-colors">
                Close
              </button>
            </div>
          ) : tab === "new" ? (
            <form onSubmit={handleNewSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5 font-[family-name:var(--font-heading)]">First name</label>
                  <input
                    type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1b3d6e]/30 focus:border-[#1b3d6e] transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5 font-[family-name:var(--font-heading)]">Email address</label>
                  <input
                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1b3d6e]/30 focus:border-[#1b3d6e] transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5 font-[family-name:var(--font-heading)]">Company</label>
                  <input
                    type="text" required value={company} onChange={(e) => setCompany(e.target.value)}
                    placeholder="Your organisation"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1b3d6e]/30 focus:border-[#1b3d6e] transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5 font-[family-name:var(--font-heading)]">Job title</label>
                  <input
                    type="text" required value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="Your role"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1b3d6e]/30 focus:border-[#1b3d6e] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5 font-[family-name:var(--font-heading)]">
                  I work in <span className="normal-case tracking-normal text-gray-400 font-normal">(optional)</span>
                </label>
                <select
                  value={sector} onChange={(e) => setSector(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1b3d6e]/30 focus:border-[#1b3d6e] transition bg-white"
                >
                  <option value="">Select your sector</option>
                  {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {status === "error" && (
                <p className="text-sm text-red-500">Something went wrong — please try again or email us directly.</p>
              )}

              <button
                type="submit" disabled={status === "loading"}
                className="w-full bg-[#F37021] hover:bg-[#d65a14] disabled:opacity-60 text-white font-bold font-[family-name:var(--font-heading)] text-sm py-3.5 rounded-full transition-colors"
              >
                {status === "loading" ? "Sending confirmation…" : "Join ASU — Free →"}
              </button>

              <p className="text-center text-xs text-gray-400 leading-snug">
                We'll email you a confirmation link. The dataset lands as soon as you click it.
              </p>
            </form>
          ) : (
            /* Already a member tab */
            <form onSubmit={handleResendSubmit} className="flex flex-col gap-4">
              <p className="text-sm text-gray-500 leading-relaxed">
                Enter the email you signed up with and we'll send you a fresh download link for the 2025 Deals Dataset.
              </p>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5 font-[family-name:var(--font-heading)]">Email address</label>
                <input
                  type="email" required value={resendEmail} onChange={(e) => setResendEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1b3d6e]/30 focus:border-[#1b3d6e] transition"
                />
              </div>

              {status === "not_found" && (
                <p className="text-sm text-amber-600">
                  We don't have that email on record. Try signing up as a new member above.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-500">Something went wrong — please try again.</p>
              )}

              <button
                type="submit" disabled={status === "loading"}
                className="w-full bg-[#1b3d6e] hover:bg-[#14305a] disabled:opacity-60 text-white font-bold font-[family-name:var(--font-heading)] text-sm py-3.5 rounded-full transition-colors"
              >
                {status === "loading" ? "Checking…" : "Resend my dataset →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
