import Link from "next/link";
import Image from "next/image";

export function IntelligenceAndPodcast() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs font-bold uppercase tracking-widest text-[#1b3d6e] mb-2 font-[family-name:var(--font-heading)]">
          AFRICA SPORTS UNIFIED
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
          {/* Intelligence & Insights */}
          <div>
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
              <Image
                src="/images/intelligence-placeholder.jpg"
                alt="Intelligence & Insights"
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-5">
              <div className="h-[3px] w-12 bg-[#F37021] rounded-full mb-3" />
              <h3 className="text-xl font-bold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                Intelligence &amp; Insights
              </h3>
              <span className="mt-2 inline-block px-4 py-1 rounded-full bg-[#F37021] text-white text-xs font-bold font-[family-name:var(--font-heading)]">
                Read
              </span>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                Access intelligence shaping Africa&apos;s sports economy
              </p>
              <Link
                href="/knowledge-hub"
                className="inline-block mt-3 text-[#F37021] text-sm font-semibold hover:underline font-[family-name:var(--font-heading)]"
              >
                Read Insights &gt;
              </Link>
            </div>
          </div>

          {/* Conversations That Matter — Podcast */}
          <div>
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#1b3d6e] flex items-center justify-center">
              <div className="text-center p-10">
                <div className="flex justify-center mb-4">
                  <div className="relative w-16 h-16">
                    <Image src="/images/asu-logo-white.png" alt="ASU" fill className="object-contain" />
                  </div>
                </div>
                <p className="text-white font-extrabold text-2xl font-[family-name:var(--font-heading)] leading-tight">
                  Africa Sports Unified Podcast
                </p>
                <p className="text-white/60 text-xs mt-2">www.asunified.com</p>
                {/* Orange stripe decorations */}
                <div className="absolute left-4 top-0 bottom-0 flex gap-1.5">
                  <div className="w-1.5 bg-[#F37021] rounded-full opacity-80" />
                  <div className="w-1.5 bg-[#F37021] rounded-full opacity-50" />
                  <div className="w-1.5 bg-[#F37021] rounded-full opacity-30" />
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="h-[3px] w-12 bg-[#F37021] rounded-full mb-3" />
              <h3 className="text-xl font-bold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
                Conversations That Matter
              </h3>
              <span className="mt-2 inline-block px-4 py-1 rounded-full bg-[#F37021] text-white text-xs font-bold font-[family-name:var(--font-heading)]">
                Listen
              </span>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                Conversations with leaders shaping the Pan-African sports economy
              </p>
              <Link
                href="https://open.spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-[#F37021] text-sm font-semibold hover:underline font-[family-name:var(--font-heading)]"
              >
                Listen to ASU Podcast &gt;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
