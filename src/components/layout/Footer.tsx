import Link from "next/link";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";

const QUICK_LINKS = [
  { label: "About",         href: "/about" },
  { label: "Knowledge Hub", href: "/knowledge-hub" },
  { label: "Consulting",    href: "/consult" },
  { label: "Events",        href: "/events" },
  { label: "Contact Us",    href: "/contact" },
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
                href="/#newsletter"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-white/80 text-white text-sm font-semibold font-[family-name:var(--font-heading)] hover:bg-white hover:text-[#1b3d6e] transition-colors"
              >
                Subscribe to our Newsletter →
              </Link>
              <a
                href="https://open.spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-white/80 text-white text-sm font-semibold font-[family-name:var(--font-heading)] hover:bg-white hover:text-[#1b3d6e] transition-colors"
              >
                Podcast Sessions
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 3a7 7 0 110 14A7 7 0 0112 5zm-1 4v4.5l3.5 2.1-.7 1.2L9 14V9h2z"/>
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
              <SocialIcon href="tel:+44" label="Call us">
                <Phone size={15} />
              </SocialIcon>
              <SocialIcon href="mailto:info@asunified.com" label="Email">
                <Mail size={15} />
              </SocialIcon>
              <SocialIcon href="https://wa.me/" label="WhatsApp" external>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="https://linkedin.com/company/africa-sports-unified" label="LinkedIn" external>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="https://twitter.com/asunified" label="Twitter / X" external>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="https://facebook.com" label="Facebook" external>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </SocialIcon>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Feel Free to reach us on any of our social media handles or call us directly
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
          <span>2025 Africa sport unified. All right reserved.</span>
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
