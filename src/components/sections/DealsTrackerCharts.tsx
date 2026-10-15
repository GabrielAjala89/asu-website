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

function Bar({ label, count, pct }: { label: string; count: number; pct: number }) {
  return (
    <div className="grid items-center gap-3" style={{ gridTemplateColumns: "96px 1fr 36px" }}>
      <span className="text-sm text-[#4A4A4A]">{label}</span>
      <span className="h-[18px] bg-[#1b3d6e] rounded-r-sm" style={{ width: `${pct}%` }} />
      <span className="font-[family-name:var(--font-heading)] font-bold text-sm text-[#1b3d6e]">{count}</span>
    </div>
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
          {/* Chart 1 */}
          <figure className="m-0 border border-gray-200 rounded p-7 flex flex-col gap-4">
            <p className="font-[family-name:var(--font-heading)] font-semibold text-[13px] uppercase tracking-[0.1em] text-[#B04A06]">Exhibit 1</p>
            <p className="font-[family-name:var(--font-heading)] font-bold text-xl text-[#1b3d6e]">Deals by sport, 2026 so far</p>
            <div
              className="flex flex-col justify-center gap-3.5 min-h-[220px]"
              role="img"
              aria-label="2026 deals by sport: Football 40, Golf 6, Basketball 5, Cricket 5, Rugby 5"
            >
              {SPORTS.map((s) => <Bar key={s.label} {...s} />)}
            </div>
            <figcaption className="text-sm text-[#4A5D7A]">Source: ASU Deals Tracker, October 2026</figcaption>
          </figure>

          {/* Chart 2 */}
          <figure className="m-0 border border-gray-200 rounded p-7 flex flex-col gap-4">
            <p className="font-[family-name:var(--font-heading)] font-semibold text-[13px] uppercase tracking-[0.1em] text-[#B04A06]">Exhibit 2</p>
            <p className="font-[family-name:var(--font-heading)] font-bold text-xl text-[#1b3d6e]">Deals tracked, 2025 vs 2026</p>
            <div
              className="flex flex-col justify-center gap-5 min-h-[220px]"
              role="img"
              aria-label="Deals tracked: 67 in 2025, 80 in 2026 so far"
            >
              {YEARS.map((y) => <Bar key={y.label} {...y} />)}
              <p className="text-sm text-[#4A4A4A]">2026 has already passed the full 2025 total, with the year still running.</p>
            </div>
            <figcaption className="text-sm text-[#4A5D7A]">Source: ASU Deals Tracker, October 2026</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
