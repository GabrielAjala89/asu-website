"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, AlertCircle } from "lucide-react";
import { FreeMemberModal } from "./FreeMemberModal";

export function FreeMemberCTA() {
  const [modalOpen, setModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const memberParam  = searchParams.get("member");

  // Clear the URL param after showing the banner
  useEffect(() => {
    if (memberParam) {
      const url = new URL(window.location.href);
      url.searchParams.delete("member");
      window.history.replaceState({}, "", url.toString());
    }
  }, [memberParam]);

  return (
    <>
      {/* Success / error banners from email verification redirect */}
      {memberParam === "verified" && (
        <div className="mb-8 flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-4">
          <CheckCircle size={20} className="shrink-0 text-green-600" />
          <p className="text-sm text-green-800 font-semibold">
            Email confirmed — your 2025 Deals Dataset is on its way to your inbox.
          </p>
        </div>
      )}
      {memberParam === "invalid" && (
        <div className="mb-8 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4">
          <AlertCircle size={20} className="shrink-0 text-red-500" />
          <p className="text-sm text-red-700">
            That link has expired or is invalid. Please sign up again below.
          </p>
        </div>
      )}

      {/* Free member CTA card */}
      <div className="bg-white rounded-2xl border border-[#dde3ee] p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex-1">
            <span className="inline-block bg-[#1b3d6e]/10 text-[#1b3d6e] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded font-[family-name:var(--font-heading)] mb-3">
              Free Membership
            </span>
            <h2 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] leading-snug">
              Want the full 2025 dataset?
            </h2>
            <p className="mt-2 text-gray-600 text-sm leading-relaxed max-w-lg">
              Become a free ASU member and get all 70 deals from 2025 — the complete picture of a full year of African sports market activity. Delivered to your inbox as an Excel file, instantly.
            </p>
            <ul className="mt-3 space-y-1">
              {["70 verified deals — full year 2025", "All fields included", "Free — no payment required"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="text-[#F37021] font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-block bg-[#1b3d6e] hover:bg-[#14305a] text-white text-sm font-bold font-[family-name:var(--font-heading)] px-8 py-4 rounded-full transition-colors text-center whitespace-nowrap"
            >
              Become a free member →
            </button>
            <p className="mt-2 text-center text-xs text-gray-400">Confirm email. Download instantly.</p>
          </div>
        </div>
      </div>

      <FreeMemberModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
