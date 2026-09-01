import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

const SPOTIFY_URL = "https://open.spotify.com/show/37o4pqxpyoJzURhSr2dXpe?si=aea0cf5f72184b5a";

const QUICK_LINKS = [
  { label: "About",         href: "/about" },
  { label: "Knowledge Hub", href: "/knowledge-hub" },
  { label: "Consulting",    href: "/consult" },
  { label: "ASU Insider",   href: "/asu-insider" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy",   href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Cookies Settings", href: "/legal/cookies" },
];

export function Footer() {
  return (
    <footer className="bg-[#1b3d6e] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">

          {/* ── Left: brand + links + CTA buttons ─────────────────────── */}
          <div className="flex-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="relative w-9 h-9 shrink-0">
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

            {/* Quick Links */}
            <p className="font-[family-name:var(--font-heading)] font-bold text-white text-sm mb-3">
              Quick Links
            </p>
            <nav className="flex flex-wrap gap-x-5 gap-y-2 mb-8">
              {QUICK_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/asu-insider"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-white/80 text-white text-sm font-semibold font-[family-name:var(--font-heading)] hover:bg-white hover:text-[#1b3d6e] transition-colors"
              >
                Subscribe to our Newsletter →
              </Link>
              <a
                href={SPOTIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-white/80 text-white text-sm font-semibold font-[family-name:var(--font-heading)] hover:bg-white hover:text-[#1b3d6e] transition-colors"
              >
                Podcast Sessions
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* ── Right: socials ─────────────────────────────────────────── */}
          <div className="lg:max-w-xs">
            <p className="font-[family-name:var(--font-heading)] font-bold text-base mb-5">
              Our Socials
            </p>
            <div className="flex flex-wrap gap-3 mb-5">
              <SocialIcon href="mailto:info@asunified.com" label="Email us">
                <Mail size={15} />
              </SocialIcon>
              <SocialIcon href="https://www.linkedin.com/company/africa-sports-unified/" label="LinkedIn" external>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="https://x.com/ASUnified" label="Twitter / X" external>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="https://www.instagram.com/asunified" label="Instagram" external>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="https://www.youtube.com/@africasportsunified6950" label="YouTube" external>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href={SPOTIFY_URL} label="Spotify Podcast" external>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </SocialIcon>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Feel free to reach us on any of our social media handles or contact us directly.
            </p>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────── */}
        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex flex-wrap gap-4">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white/80 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
          <span>© 2026 Africa Sports Unified. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href, label, external, children,
}: {
  href: string; label: string; external?: boolean; children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors shrink-0"
    >
      {children}
    </a>
  );
}
