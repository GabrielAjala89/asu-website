'use client';

import { useState } from 'react';

interface DownloadFormProps {
  contentTitle: string;
  contentType: 'report' | 'tracker';
  pdfUrl?: string;
  stripeLink?: string;
}

type FormState = 'idle' | 'loading' | 'success' | 'error';

export function DownloadForm({ contentTitle, contentType, pdfUrl, stripeLink }: DownloadFormProps) {
  const [state, setState] = useState<FormState>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');

    const form = e.currentTarget;
    const firstName = (form.elements.namedItem('firstName') as HTMLInputElement).value.trim();
    const lastName = (form.elements.namedItem('lastName') as HTMLInputElement | null)?.value.trim();
    const company = (form.elements.namedItem('company') as HTMLInputElement).value.trim();
    const jobTitle = (form.elements.namedItem('jobTitle') as HTMLInputElement | null)?.value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();

    try {
      const res = await fetch('/api/download-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, company, jobTitle, email, contentTitle, contentType, pdfUrl, stripeLink }),
      });
      if (!res.ok) throw new Error();
      setState('success');
    } catch {
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <div className="text-center py-4">
        <div className="w-12 h-12 rounded-full bg-[#F37021] flex items-center justify-center mx-auto mb-4">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-bold text-white font-[family-name:var(--font-heading)] text-lg">Check your inbox</p>
        <p className="text-white/60 text-sm mt-2 leading-relaxed">
          {contentType === 'report'
            ? "Your download link is on its way. Check your spam folder if you don't see it within a minute."
            : "We've sent everything you need to get started. Check your inbox."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* First name / Last name row */}
      <div className={contentType === 'tracker' ? 'grid grid-cols-2 gap-3' : ''}>
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
        {contentType === 'tracker' && (
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
        )}
      </div>
      <div>
        <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest font-[family-name:var(--font-heading)] mb-1.5">
          Company {contentType !== 'tracker' && <span className="normal-case tracking-normal font-normal opacity-60">(optional)</span>}
        </label>
        <input
          name="company"
          type="text"
          required={contentType === 'tracker'}
          placeholder="Africa Sports Unified"
          className="w-full px-4 py-2.5 rounded-xl bg-white/10 text-white placeholder:text-white/30 border border-white/20 focus:outline-none focus:border-[#F37021] text-sm transition-colors"
        />
      </div>
      {contentType === 'tracker' && (
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
      )}
      <div>
        <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest font-[family-name:var(--font-heading)] mb-1.5">
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
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
        {state === 'loading'
          ? 'Sending…'
          : contentType === 'tracker'
          ? 'Get Access Details →'
          : 'Send Me the Report →'}
      </button>
      <p className="text-white/40 text-[11px] text-center">
        We&apos;ll email you the {contentType === 'tracker' ? 'access link' : 'download link'} instantly. No spam.
      </p>
    </form>
  );
}
