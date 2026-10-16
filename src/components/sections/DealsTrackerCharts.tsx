"use client";

import { useEffect, useRef, useState } from "react";

const SPORTS = [
  { label: "Football",   count: 40, pct: 100 },
  { label: "Golf",       count: 6,  pct: 15 },
  { label: "Basketball", count: 5,  pct: 12.5 },
  { label: "Cricket",    count: 5,  pct: 12.5 },
  { label: "Rugby",      count: 5,  pct: 12.5 },
];

const YEARS = [
  { label: "2025",         count: 67, pct: 83.75 },
  { label: "2026 so far",  count: 80, pct: 100 },
];

function useAnimate(duration = 1200) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            setProgress(1 - Math.pow(1 - p, 3));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [duration]);

  return { progress, containerRef };
}

function AnimatedBar({ label, count, pct, progress }: { label: string; count: number; pct: number; progress: number }) {
  const animatedPct = pct * progress;
  const animatedCount = Math.round(count * progress);
  return (
    <div className="grid items-center gap-3" style={{ gridTemplateColumns: "96px 1fr 36px" }}>
      <span className="text-sm text-[#4A4A4A]">{label}</span>
      <div className="h-[18px] bg-gray-100 rounded-r-sm overflow-hidden">
        <div
          className="h-full bg-[#1b3d6e] rounded-r-sm"
          style={{ width: `${animatedPct}%`, transition: "none" }}
        />
      </div>
      <span className="font-[family-name:var(--font-heading)] font-bold text-sm text-[#1b3d6e] tabular-nums">{animatedCount}</span>
    </div>
  );
}

function AnimatedChart({ data, title, exhibit, caption, ariaLabel }: {
  data: { label: string; count: number; pct: number }[];
  title: string;
  exhibit: string;
  caption: string;
  ariaLabel: string;
  children?: React.ReactNode;
}) {
  const { progress, containerRef } = useAnimate();
  return (
    <figure ref={containerRef} className="m-0 border border-gray-200 rounded p-7 flex flex-col gap-4">
      <p className="font-[family-name:var(--font-heading)] font-semibold text-[13px] uppercase tracking-[0.1em] text-[#B04A06]">{exhibit}</p>
      <p className="font-[family-name:var(--font-heading)] font-bold text-xl text-[#1b3d6e]">{title}</p>
      <div
        className="flex flex-col justify-center gap-3.5 min-h-[200px]"
        role="img"
        aria-label={ariaLabel}
      >
        {data.map((d) => <AnimatedBar key={d.label} {...d} progress={progress} />)}
      </div>
      <figcaption className="text-sm text-[#4A5D7A]">{caption}</figcaption>
    </figure>
  );
}

export function DealsTrackerCharts() {
  return (
    <section className="border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-20 flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(1.8rem,3vw,2.5rem)] text-[#1b3d6e] leading-tight">
            From the Deals Tracker
          </h2>
          <p className="text-[18px] text-[#4A5D7A] max-w-[40rem]">
            A sample of what our clients and members see. Every figure sourced and dated.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedChart
            data={SPORTS}
            exhibit="Exhibit 1"
            title="Deals by sport, 2026 so far"
            caption="Source: ASU Deals Tracker, October 2026"
            ariaLabel="2026 deals by sport: Football 40, Golf 6, Basketball 5, Cricket 5, Rugby 5"
          />
          <AnimatedChart
            data={YEARS}
            exhibit="Exhibit 2"
            title="Deals tracked, 2025 vs 2026"
            caption="Source: ASU Deals Tracker, October 2026"
            ariaLabel="Deals tracked: 67 in 2025, 80 in 2026 so far"
          />
        </div>
      </div>
    </section>
  );
}
