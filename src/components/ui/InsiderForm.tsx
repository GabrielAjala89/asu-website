'use client';

import { useState } from 'react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export function InsiderForm() {
  const [state, setState] = useState<FormState>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');

    const form = e.currentTarget;
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement).value.trim();

    try {
      const res = await fetch('/api/insider-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: get('firstName'),
          lastName: get('lastName'),
          jobTitle: get('jobTitle'),
          organisation: get('organisation'),
          email: get('email'),
        }),
      });
      if (!res.ok) throw new Error();
      setState('success');
    } catch {
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <div className="text-center py-6">
        <div className="w-14 h-14 rounded-full bg-[#F37021] flex items-center justify-center mx-auto mb-5">
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
            <path d="M4 10l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-extrabold text-white font-[family-name:var(--font-heading)] text-xl">You&apos;re on the list</p>
        <p className="text-white/60 text-sm mt-2 leading-relaxed max-w-xs mx-auto">
          We&apos;ll be in touch as soon as ASU Insider goes live.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-left">
      {/* First / Last name */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest font-[family-name:var(--font-heading)] mb-1.5">
            First Name
          </label>
          <input
            name="firstName"
            type="text"
            required
            placeholder="Gabriel"
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 text-white placeholder:text-white/30 border border-white/20 focus:outline-none focus:border-[#F37021] text-sm transition-colors"
          />
        </div>
        <div>
          <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest font-[family-name:var(--font-heading)] mb-1.5">
            Last Name
          </label>
          <input
            name="lastName"
            type="text"
            required
            placeholder="Ajala"
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 text-white placeholder:text-white/30 border border-white/20 focus:outline-none focus:border-[#F37021] text-sm transition-colors"
          />
        </div>
      </div>

      {/* Job Title */}
      <div>
        <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest font-[family-name:var(--font-heading)] mb-1.5">
          Job Title
        </label>
        <input
          name="jobTitle"
          type="text"
          required
          placeholder="Head of Partnerships"
          className="w-full px-4 py-2.5 rounded-xl bg-white/10 text-white placeholder:text-white/30 border border-white/20 focus:outline-none focus:border-[#F37021] text-sm transition-colors"
        />
      </div>

      {/* Organisation */}
      <div>
        <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest font-[family-name:var(--font-heading)] mb-1.5">
          Organisation
        </label>
        <input
          name="organisation"
          type="text"
          required
          placeholder="Africa Sports Unified"
          className="w-full px-4 py-2.5 rounded-xl bg-white/10 text-white placeholder:text-white/30 border border-white/20 focus:outline-none focus:border-[#F37021] text-sm transition-colors"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest font-[family-name:var(--font-heading)] mb-1.5">
          Email Address
        </label>
        <input
          name="email"
          type="email"
          required
          placeholder="you@organisation.com"
          className="w-full px-4 py-2.5 rounded-xl bg-white/10 text-white placeholder:text-white/30 border border-white/20 focus:outline-none focus:border-[#F37021] text-sm transition-colors"
        />
      </div>

      {state === 'error' && (
        <p className="text-red-400 text-xs">Something went wrong — please try again.</p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="mt-2 w-full px-6 py-4 rounded-full bg-[#F37021] text-white font-bold font-[family-name:var(--font-heading)] text-sm hover:bg-[#d65a14] transition-colors disabled:opacity-60"
      >
        {state === 'loading' ? 'Submitting…' : 'Register Your Interest →'}
      </button>
    </form>
  );
}
