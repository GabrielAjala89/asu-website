'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

type ModalState = 'none' | 'open';
type FormState = 'idle' | 'loading' | 'success' | 'error';
type MembershipType = 'individual' | 'org';

export function TwoWaysToJoin() {
  const [modal, setModal] = useState<ModalState>('none');

  useEffect(() => {
    function handleHash() {
      if (window.location.hash === '#request-briefing') setModal('open');
    }
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  function closeModal() {
    setModal('none');
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  return (
    <>
      <section id="two-ways" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <div className="mx-auto w-10 h-[3px] bg-[#F37021] rounded-full" />
            <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
              Join by invitation
            </h2>
          </div>
          <div className="max-w-lg mx-auto">
            <div id="request-briefing" className="border border-[#dde3ee] rounded-2xl p-8 flex flex-col">
              <p className="text-gray-600 leading-relaxed flex-1">
                We are welcoming a first group of members ahead of opening ASU Insider more widely in 2027. Request an invitation to a private briefing and we will send you everything you need.
              </p>
              <button
                onClick={() => setModal('open')}
                className="mt-8 w-full text-center px-6 py-3.5 rounded-full bg-[#1b3d6e] text-white font-bold font-[family-name:var(--font-heading)] text-sm hover:bg-[#142e54] transition-colors"
              >
                Request a briefing invitation
              </button>
            </div>
          </div>
        </div>
      </section>

      {modal === 'open' && <BriefingModal onClose={closeModal} />}
    </>
  );
}

/* ─────────────────── Unified briefing modal ─────────────────── */

function BriefingModal({ onClose }: { onClose: () => void }) {
  const [state, setState] = useState<FormState>('idle');
  const [membershipType, setMembershipType] = useState<MembershipType>('individual');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');
    const form = e.currentTarget;
    const get = (n: string) =>
      (form.elements.namedItem(n) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value?.trim() ?? '';
    const checked = (n: string) =>
      (form.elements.namedItem(n) as HTMLInputElement)?.checked ?? false;

    try {
      const res = await fetch('/api/briefing-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName:          get('firstName'),
          lastName:           get('lastName'),
          jobTitle:           get('jobTitle'),
          organisation:       get('organisation'),
          email:              get('email'),
          role:               get('role'),
          membershipType,
          preferredDate:      get('preferredDate'),
          orgType:            membershipType === 'org' ? get('orgType') : undefined,
          marketsOfInterest:  membershipType === 'org' ? get('marketsOfInterest') : undefined,
          commercialDecision: membershipType === 'org' ? get('commercialDecision') : undefined,
          privateConversation: membershipType === 'org' ? checked('privateConversation') : undefined,
        }),
      });
      if (!res.ok) throw new Error();
      setState('success');
    } catch {
      setState('error');
    }
  }

  return (
    <Modal title="Request a briefing invitation" onClose={onClose}>
      {state === 'success' ? (
        <SuccessMessage
          heading="Request received"
          body="We will be in touch to confirm your briefing invitation. Check your inbox for a confirmation."
        />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="First name" name="firstName" placeholder="First name" required />
            <Field label="Last name"  name="lastName"  placeholder="Last name"  required />
          </div>
          <Field label="Job title"    name="jobTitle"    placeholder="Your job title"       required />
          <Field label="Organisation" name="organisation" placeholder="Your organisation"   required />
          <Field label="Email address" name="email" type="email" placeholder="you@organisation.com" required />

          {/* Role */}
          <div>
            <label className="block text-[#1b3d6e] text-[10px] font-bold uppercase tracking-widest font-[family-name:var(--font-heading)] mb-1.5">
              Which best describes you?
            </label>
            <select
              name="role"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-[#f4f7fb] text-gray-700 border border-[#dde3ee] focus:outline-none focus:border-[#1b3d6e] text-sm"
            >
              <option value="">Select one…</option>
              <option>Brand or sponsor</option>
              <option>Investor</option>
              <option>Rights holder or federation</option>
              <option>Government</option>
              <option>Other</option>
            </select>
          </div>

          {/* Membership type toggle */}
          <div>
            <p className="block text-[#1b3d6e] text-[10px] font-bold uppercase tracking-widest font-[family-name:var(--font-heading)] mb-2">
              Are you joining as an individual or for your organisation?
            </p>
            <div className="grid grid-cols-2 gap-2">
              {(['individual', 'org'] as MembershipType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setMembershipType(t)}
                  className={`py-2.5 rounded-xl text-sm font-bold font-[family-name:var(--font-heading)] transition-colors ${
                    membershipType === t
                      ? 'bg-[#1b3d6e] text-white'
                      : 'bg-[#f4f7fb] text-[#1b3d6e] border border-[#dde3ee] hover:border-[#1b3d6e]'
                  }`}
                >
                  {t === 'individual' ? 'Individual' : 'Organisation'}
                </button>
              ))}
            </div>
          </div>

          <Field label="Preferred briefing date (optional)" name="preferredDate" placeholder="e.g. early November, week of 18 Nov" />

          {/* Org-only fields */}
          {membershipType === 'org' && (
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-[#1b3d6e] text-[10px] font-bold uppercase tracking-widest font-[family-name:var(--font-heading)] mb-1.5">
                  Organisation type
                </label>
                <select
                  name="orgType"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f4f7fb] text-gray-700 border border-[#dde3ee] focus:outline-none focus:border-[#1b3d6e] text-sm"
                >
                  <option value="">Select one…</option>
                  <option>Sponsor or brand</option>
                  <option>Rights holder</option>
                  <option>Investor</option>
                  <option>Government or IGO</option>
                  <option>Other</option>
                </select>
              </div>
              <Field label="Markets of interest" name="marketsOfInterest" placeholder="e.g. Nigeria, East Africa, MENA…" />
              <div>
                <label className="block text-[#1b3d6e] text-[10px] font-bold uppercase tracking-widest font-[family-name:var(--font-heading)] mb-1.5">
                  What commercial decision are you facing in the next 12 months?
                </label>
                <textarea
                  name="commercialDecision"
                  rows={3}
                  placeholder="Brief description…"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f4f7fb] text-gray-700 border border-[#dde3ee] focus:outline-none focus:border-[#1b3d6e] text-sm resize-none"
                />
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="privateConversation"
                  className="mt-1 h-4 w-4 rounded border-[#dde3ee] accent-[#1b3d6e]"
                />
                <span className="text-sm text-gray-600 font-[family-name:var(--font-body)] leading-snug">
                  I would prefer a private conversation
                </span>
              </label>
            </div>
          )}

          {state === 'error' && (
            <p className="text-red-500 text-xs">Something went wrong — please try again.</p>
          )}
          <button
            type="submit"
            disabled={state === 'loading'}
            className="mt-2 w-full px-6 py-4 rounded-full bg-[#F37021] text-white font-bold font-[family-name:var(--font-heading)] text-sm hover:bg-[#d65a14] transition-colors disabled:opacity-60"
          >
            {state === 'loading' ? 'Submitting…' : 'Request briefing invitation →'}
          </button>
        </form>
      )}
    </Modal>
  );
}

/* ─────────────────── Shared primitives ─────────────────── */

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between px-8 pt-8 pb-5 border-b border-[#dde3ee]">
          <h3 className="text-lg font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="px-8 py-6">{children}</div>
      </div>
    </div>
  );
}

function Field({
  label, name, type = 'text', placeholder, required,
}: {
  label: string; name: string; type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[#1b3d6e] text-[10px] font-bold uppercase tracking-widest font-[family-name:var(--font-heading)] mb-1.5">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl bg-[#f4f7fb] text-gray-700 placeholder:text-gray-400 border border-[#dde3ee] focus:outline-none focus:border-[#1b3d6e] text-sm transition-colors"
      />
    </div>
  );
}

function SuccessMessage({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="text-center py-6">
      <div className="w-14 h-14 rounded-full bg-[#F37021] flex items-center justify-center mx-auto mb-5">
        <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
          <path d="M4 10l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] text-xl">{heading}</p>
      <p className="text-gray-500 text-sm mt-2 leading-relaxed max-w-xs mx-auto">{body}</p>
    </div>
  );
}
