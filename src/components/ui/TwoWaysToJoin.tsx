'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

type ModalState = 'none' | 'individual' | 'org';
type FormState = 'idle' | 'loading' | 'success' | 'error';

export function TwoWaysToJoin() {
  const [modal, setModal] = useState<ModalState>('none');

  return (
    <>
      <section id="two-ways" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <div className="mx-auto w-10 h-[3px] bg-[#F37021] rounded-full" />
            <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
              Two ways to join
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Individual */}
            <div className="border border-[#dde3ee] rounded-2xl p-8 flex flex-col">
              <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#F37021]/10 text-[#F37021] text-xs font-bold font-[family-name:var(--font-heading)] uppercase tracking-widest self-start">
                For individuals
              </span>
              <p className="text-gray-600 leading-relaxed flex-1">
                For professionals who want to make better decisions in African sport. Founding member rates are available for early members.
              </p>
              <button
                onClick={() => setModal('individual')}
                className="mt-8 w-full text-center px-6 py-3.5 rounded-full bg-[#1b3d6e] text-white font-bold font-[family-name:var(--font-heading)] text-sm hover:bg-[#142e54] transition-colors"
              >
                Join the founding list
              </button>
            </div>
            {/* Organisation */}
            <div className="border border-[#dde3ee] rounded-2xl p-8 flex flex-col bg-[#1b3d6e]">
              <span className="inline-block mb-4 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold font-[family-name:var(--font-heading)] uppercase tracking-widest self-start">
                For organisations
              </span>
              <p className="text-white/75 leading-relaxed flex-1">
                For brands, rights holders, investors, governments and institutions that need deeper data, team access and intelligence tailored to their markets. Packages are shaped around your needs.
              </p>
              <p className="mt-4 text-white/40 text-xs leading-relaxed">
                We are working with a small number of founding partners to shape the platform. Places are limited.
              </p>
              <button
                onClick={() => setModal('org')}
                className="mt-8 w-full text-center px-6 py-3.5 rounded-full bg-[#F37021] text-white font-bold font-[family-name:var(--font-heading)] text-sm hover:bg-[#d65a14] transition-colors"
              >
                Enquire about a tailored package
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      {modal === 'individual' && (
        <IndividualModal onClose={() => setModal('none')} />
      )}
      {modal === 'org' && (
        <OrgModal onClose={() => setModal('none')} />
      )}
    </>
  );
}

/* ─────────────────── Individual modal ─────────────────── */

function IndividualModal({ onClose }: { onClose: () => void }) {
  const [state, setState] = useState<FormState>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');
    const form = e.currentTarget;
    const get = (n: string) => (form.elements.namedItem(n) as HTMLInputElement).value.trim();
    try {
      const res = await fetch('/api/insider-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName:    get('firstName'),
          lastName:     get('lastName'),
          email:        get('email'),
          jobTitle:     get('jobTitle'),
          organisation: get('organisation'),
          role:         get('role'),
        }),
      });
      if (!res.ok) throw new Error();
      setState('success');
    } catch {
      setState('error');
    }
  }

  return (
    <Modal title="Join the founding list" onClose={onClose}>
      {state === 'success' ? (
        <SuccessMessage
          heading="You're on the list"
          body="We'll be in touch as soon as ASU Insider opens. Check your inbox for your free dataset."
        />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="First name" name="firstName" placeholder="First name" required />
            <Field label="Last name"  name="lastName"  placeholder="Last name"  required />
          </div>
          <Field label="Email address" name="email" type="email" placeholder="you@organisation.com" required />
          <Field label="Job title"     name="jobTitle"     placeholder="Your job title" required />
          <Field label="Organisation"  name="organisation" placeholder="Your organisation" required />
          <div>
            <label className="block text-[#1b3d6e] text-[10px] font-bold uppercase tracking-widest font-[family-name:var(--font-heading)] mb-1.5">
              What best describes you?
            </label>
            <select
              name="role"
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
          {state === 'error' && <p className="text-red-500 text-xs">Something went wrong — please try again.</p>}
          <button
            type="submit"
            disabled={state === 'loading'}
            className="mt-2 w-full px-6 py-4 rounded-full bg-[#F37021] text-white font-bold font-[family-name:var(--font-heading)] text-sm hover:bg-[#d65a14] transition-colors disabled:opacity-60"
          >
            {state === 'loading' ? 'Submitting…' : 'Join the founding list →'}
          </button>
        </form>
      )}
    </Modal>
  );
}

/* ─────────────────── Organisation modal ─────────────────── */

function OrgModal({ onClose }: { onClose: () => void }) {
  const [state, setState] = useState<FormState>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');
    const form = e.currentTarget;
    const get = (n: string) => (form.elements.namedItem(n) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).value.trim();
    try {
      const res = await fetch('/api/org-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName:          get('firstName'),
          lastName:           get('lastName'),
          jobTitle:           get('jobTitle'),
          organisation:       get('organisation'),
          orgType:            get('orgType'),
          email:              get('email'),
          marketsOfInterest:  get('marketsOfInterest'),
          commercialDecision: get('commercialDecision'),
        }),
      });
      if (!res.ok) throw new Error();
      setState('success');
    } catch {
      setState('error');
    }
  }

  return (
    <Modal title="Enquire about a tailored package" onClose={onClose}>
      {state === 'success' ? (
        <SuccessMessage
          heading="Enquiry received"
          body="We'll be in touch shortly to discuss how ASU Insider can work for your organisation."
        />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="First name" name="firstName" placeholder="First name" required />
            <Field label="Last name"  name="lastName"  placeholder="Last name"  required />
          </div>
          <Field label="Job title"    name="jobTitle"    placeholder="Your job title" required />
          <Field label="Organisation" name="organisation" placeholder="Organisation name" required />
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
          <Field label="Email address" name="email" type="email" placeholder="you@organisation.com" required />
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
          {state === 'error' && <p className="text-red-500 text-xs">Something went wrong — please try again.</p>}
          <button
            type="submit"
            disabled={state === 'loading'}
            className="mt-2 w-full px-6 py-4 rounded-full bg-[#1b3d6e] text-white font-bold font-[family-name:var(--font-heading)] text-sm hover:bg-[#142e54] transition-colors disabled:opacity-60"
          >
            {state === 'loading' ? 'Sending…' : 'Send enquiry →'}
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
