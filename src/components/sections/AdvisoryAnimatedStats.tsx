"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
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
            setValue(Math.round((1 - Math.pow(1 - p, 3)) * target));
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

function AnimatedStat({ value, label }: { value: number; label: string }) {
  const { value: count, elRef } = useCountUp(value);
  return (
    <div ref={elRef} className="border border-gray-200 rounded p-6 flex flex-col gap-1.5">
      <span className="font-[family-name:var(--font-heading)] font-extrabold text-5xl text-[#1b3d6e] tabular-nums">{count}</span>
      <span className="text-sm text-[#4A5D7A]">{label}</span>
    </div>
  );
}

const UNECA_STATS = [
  { value: 2,  label: "research projects" },
  { value: 2,  label: "stakeholder events" },
  { value: 4,  label: "podcasts" },
  { value: 14, label: "entrepreneurs mentored" },
];

export function AdvisoryAnimatedStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      {UNECA_STATS.map((s) => <AnimatedStat key={s.label} value={s.value} label={s.label} />)}
    </div>
  );
}
