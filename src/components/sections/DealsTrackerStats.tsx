import Link from "next/link";

const STATS = [
  { value: "80",    label: "deals tracked in 2026 so far" },
  { value: "$192M+", label: "disclosed value, from 20 of 80 deals" },
  { value: "67",    label: "deals tracked in 2025" },
  { value: "40",    label: "football deals, the most active sport" },
];

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col gap-2">
              <p className="font-[family-name:var(--font-heading)] font-extrabold text-5xl text-[#1b3d6e]">
                {s.value}
              </p>
              <p className="text-base text-[#4A5D7A]">{s.label}</p>
            </div>
          ))}
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
