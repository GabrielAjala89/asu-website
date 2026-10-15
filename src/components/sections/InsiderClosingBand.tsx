import Link from "next/link";

export function InsiderClosingBand() {
  return (
    <section className="bg-[#030000]">
      <div className="mx-auto max-w-7xl px-6 py-11 flex flex-wrap items-center justify-between gap-6">
        <div className="flex flex-col gap-2 flex-1 min-w-[280px]">
          <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(1.35rem,2vw,1.75rem)] text-white">
            Not ready for a conversation yet?
          </h2>
          <p className="text-[17px] leading-snug text-[#E3E9F2]">
            Join ASU Insider free and get the fortnightly newsletter: the deals, data and decisions shaping African sport, in your inbox.
          </p>
        </div>
        <Link
          href="/asu-insider"
          className="px-7 py-[18px] rounded font-[family-name:var(--font-heading)] font-bold text-base bg-[#E8630A] text-[#030000] hover:bg-[#B04A06] hover:text-white transition-colors whitespace-nowrap"
        >
          Join ASU Insider – free
        </Link>
      </div>
    </section>
  );
}
