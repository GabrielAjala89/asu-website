/**
 * Home page — placeholder for v0.1.
 * Real hero (video + nav + sections) lands in Day 2 once the assets folder
 * is wired in and the design system is fully exercised.
 */
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Top bar (placeholder nav) */}
      <header className="border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <div className="font-[family-name:var(--font-heading)] font-extrabold text-asu-blue tracking-tight text-lg">
            AFRICA SPORTS UNIFIED
            <span className="block text-[10px] uppercase tracking-widest text-gray-500 mt-0.5">
              The Voice of African Sports Business
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-asu-blue">
            <span className="opacity-50 cursor-not-allowed">About</span>
            <span className="opacity-50 cursor-not-allowed">ASU Insider</span>
            <span className="opacity-50 cursor-not-allowed">Consult</span>
            <span className="opacity-50 cursor-not-allowed">Knowledge Hub</span>
          </nav>
        </div>
      </header>

      {/* Hero — placeholder, no video yet */}
      <section className="flex-1 flex items-center justify-center bg-asu-cream px-6 py-24">
        <div className="max-w-3xl text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.2em] text-asu-orange font-semibold">
            Site under construction
          </p>
          <h1 className="text-5xl md:text-7xl text-asu-blue font-extrabold">
            Powering the Business of Sport in Africa
          </h1>
          <p className="text-lg md:text-xl text-asu-black/70 leading-relaxed max-w-2xl mx-auto">
            Intelligence, advisory, and ecosystem access for organisations
            shaping Africa&apos;s sports economy.
          </p>
          <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              className="px-7 py-3 bg-asu-orange text-white font-semibold rounded-full hover:bg-asu-orange/90 transition-colors font-[family-name:var(--font-heading)]"
            >
              Join ASU Insider
            </button>
            <button
              type="button"
              className="px-7 py-3 bg-asu-blue text-white font-semibold rounded-full hover:bg-asu-blue/90 transition-colors font-[family-name:var(--font-heading)]"
            >
              Work With ASU
            </button>
          </div>
        </div>
      </section>

      {/* Footer placeholder */}
      <footer className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-xs text-gray-500">
          v0.1 · Africa Sports Unified · {new Date().getFullYear()}
        </div>
      </footer>
    </main>
  );
}
