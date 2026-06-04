import Link from "next/link";
import Image from "next/image";
import { OrangeLine } from "@/components/ui/OrangeLine";

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "ASU Insider", href: "/asu-insider" },
  { label: "Consult", href: "/consult" },
  { label: "Knowledge Hub", href: "/knowledge-hub" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Use", href: "/legal/terms" },
  { label: "Cookie Policy", href: "/legal/cookies" },
];

export function Footer() {
  return (
    <footer className="bg-[#1b3d6e] text-white">
      {/* Newsletter strip */}
      <div id="newsletter" className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-md">
              <OrangeLine />
              <h3 className="mt-3 text-2xl font-extrabold text-white font-[family-name:var(--font-heading)]">
                Stay ahead of Africa&apos;s sports economy
              </h3>
              <p className="mt-2 text-sm text-white/70">
                Free intelligence delivered to your inbox. No spam.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full md:max-w-sm" action="/api/subscribe" method="POST">
              <input
                type="email"
                name="email"
                required
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#F37021] focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#F37021] text-white font-semibold rounded-full text-sm font-[family-name:var(--font-heading)] hover:bg-[#d65a14] transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-9 h-9">
                <Image
                  src="/images/asu-logo-white.png"
                  alt="Africa Sports Unified"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-[family-name:var(--font-heading)] font-extrabold text-sm uppercase tracking-tight">
                Africa Sports Unified
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Intelligence, advisory, and ecosystem access for organisations
              shaping Africa&apos;s sports economy.
            </p>
            {/* Social icons */}
            <div className="mt-5 flex gap-3">
              {[
                { label: "LinkedIn", href: "https://linkedin.com/company/africa-sports-unified", icon: "in" },
                { label: "Twitter", href: "https://twitter.com/asunified", icon: "𝕏" },
                { label: "Spotify", href: "https://open.spotify.com", icon: "♫" },
                { label: "YouTube", href: "https://youtube.com", icon: "▶" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs text-white/70 hover:border-[#F37021] hover:text-[#F37021] transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] font-bold text-sm uppercase tracking-wider text-white/50 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 hover:text-[#F37021] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] font-bold text-sm uppercase tracking-wider text-white/50 mb-4">
              Content
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Articles & Insights", href: "/knowledge-hub" },
                { label: "Reports", href: "/knowledge-hub?type=reports" },
                { label: "Trackers", href: "/knowledge-hub?type=trackers" },
                { label: "Videos", href: "/knowledge-hub?type=videos" },
                { label: "Podcast", href: "https://open.spotify.com", external: true },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-sm text-white/70 hover:text-[#F37021] transition-colors"
                  >
                    {l.label}
                    {l.external && <span className="ml-1 text-xs opacity-50">↗</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <span>© {new Date().getFullYear()} Africa Sports Unified. All rights reserved.</span>
          <div className="flex gap-4">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white/70 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
