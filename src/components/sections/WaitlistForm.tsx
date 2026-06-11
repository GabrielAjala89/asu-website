"use client";

import { useActionState } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/actions/waitlist";

const initial: WaitlistState = { success: false, error: null };

export function WaitlistForm() {
  const [state, action, pending] = useActionState(joinWaitlist, initial);

  if (state.success) {
    return (
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#F37021]/15 mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F37021" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
          You&apos;re on the list
        </h3>
        <p className="mt-2 text-gray-500 text-sm">
          We&apos;ll notify you as soon as ASU Insider launches.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        name="email"
        required
        placeholder="Enter your email address"
        className="flex-1 px-5 py-3.5 rounded-full border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F37021]/40 focus:border-[#F37021]"
      />
      <button
        type="submit"
        disabled={pending}
        className="px-7 py-3.5 rounded-full bg-[#F37021] text-white text-sm font-bold font-[family-name:var(--font-heading)] hover:bg-[#d65a14] transition-colors disabled:opacity-60 whitespace-nowrap"
      >
        {pending ? "Submitting…" : "Notify Me →"}
      </button>
      {state.error && (
        <p className="sm:col-span-2 text-sm text-red-500 text-center mt-1">{state.error}</p>
      )}
    </form>
  );
}
