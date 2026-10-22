"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(target);
  const elRef = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, elRef };
}

function AnimatedStat({ value, prefix = "", suffix = "", label, large = false }: { value: number; prefix?: string; suffix?: string; label: string; large?: boolean }) {
  const { value: count, elRef } = useCountUp(value);
  return (
    <div ref={elRef} className="flex flex-col gap-2">
      <p className={`font-[family-name:var(--font-heading)] font-extrabold text-[#1b3d6e] tabular-nums ${large ? "text-[clamp(3rem,6vw,5rem)] leading-none" : "text-5xl"}`}>
        {prefix}{count}{suffix}
      </p>
      <p className={`text-[#4A5D7A] ${large ? "text-lg" : "text-base"}`}>{label}</p>
    </div>
  );
}

export function DealsTrackerStats() {
  return (
    <section className="border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-wrap justify-between items-baseline gap-3 mb-8">
          <h2 className="font-[family-name:var(--font-heading)] text-[13px] font-bold uppercase tracking-[0.12em] text-[#1b3d6e]">
            ASU Deals Tracker
          </h2>
          <span className="text-sm text-[#4A5D7A]">Updated fortnightly · Verified by ASU</span>
        </div>
        <div className="mb-10 pb-10 border-b border-gray-100">
          <AnimatedStat value={142} suffix="+" label="deals tracked in total since 2024" large />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <AnimatedStat value={80}   label="deals tracked in 2026 so far" />
          <AnimatedStat value={192}  prefix="$" suffix="M+" label="disclosed value, from 20 of 80 deals" />
          <AnimatedStat value={67}   label="deals tracked in 2025" />
          <AnimatedStat value={40}   label="football deals, the most active sport" />
        </div>
        <Link
          href="/deals-tracker"
          className="text-sm font-bold font-[family-name:var(--font-heading)] text-[#1b3d6e] hover:text-[#E8630A] transition-colors"
        >
          Explore the Deals Tracker →
        </Link>
      </div>
    </section>
  );
}
