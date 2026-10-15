import Link from "next/link";

const CLIENTS = [
  {
    num: "01",
    title: "Governments",
    body: "Sports economy strategy, policy and commercial frameworks that turn sport into investment, jobs and trade.",
  },
  {
    num: "02",
    title: "Brands and investors",
    body: "Market entry, partner selection and deal intelligence to know where African sport is moving and who to back.",
  },
  {
    num: "03",
    title: "Rights holders and federations",
    body: "Commercial strategy, data and sponsor readiness for federations, leagues, clubs and events building revenue.",
  },
];

export function AdvisoryWhoWeWorkWith() {
  return (
    <section className="bg-[#F5F6F8]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24 flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <p className="font-[family-name:var(--font-heading)] text-[14px] font-bold uppercase tracking-[0.12em] text-[#1b3d6e]">
            Who we work with
          </p>
          <div className="font-[family-name:var(--font-heading)] font-extrabold text-[clamp(3rem,6vw,5rem)] leading-none text-[#1b3d6e]">
            0.5% <span className="text-[#B04A06]">vs</span> 2%
          </div>
          <p className="text-xl leading-relaxed text-[#4A4A4A] max-w-[46rem]">
            Sport contributes 0.5% of Africa&apos;s GDP. The global average is 2%. That gap is the opportunity. The question is whether you are positioned to capture it.
          </p>
          <p className="text-sm text-[#4A5D7A]">Source: African Union Sports Council</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CLIENTS.map((c) => (
            <div key={c.num} className="bg-white rounded p-8 flex flex-col gap-3">
              <p className="font-[family-name:var(--font-heading)] font-bold text-sm text-[#B04A06]">{c.num}</p>
              <h3 className="font-[family-name:var(--font-heading)] font-bold text-xl text-[#1b3d6e]">{c.title}</h3>
              <p className="text-[17px] leading-relaxed text-[#4A4A4A]">{c.body}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/advisory"
            className="px-8 py-[18px] rounded font-[family-name:var(--font-heading)] font-bold text-base bg-[#E8630A] text-[#030000] hover:bg-[#B04A06] hover:text-white transition-colors"
          >
            Book a strategy call
          </Link>
        </div>
      </div>
    </section>
  );
}
