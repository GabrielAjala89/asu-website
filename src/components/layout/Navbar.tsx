"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

const SPOTIFY_URL = "https://open.spotify.com/show/37o4pqxpyoJzURhSr2dXpe?si=32b40de3ab6d491a";

export function Navbar({ transparent = false }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false);
  const [intelOpen, setIntelOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const intelTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  const isNavy = !transparent || scrolled;

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const isIntelActive =
    pathname === "/intelligence" ||
    pathname.startsWith("/intelligence/") ||
    pathname.startsWith("/articles/") ||
    pathname.startsWith("/trackers/") ||
    pathname.startsWith("/reports/") ||
    pathname.startsWith("/videos/") ||
    pathname.startsWith("/deals-tracker");

  function openIntel() {
    if (intelTimeout.current) clearTimeout(intelTimeout.current);
    setIntelOpen(true);
  }
  function closeIntel() {
    intelTimeout.current = setTimeout(() => setIntelOpen(false), 150);
  }

  const linkCls = (active: boolean) =>
    `text-sm font-semibold font-[family-name:var(--font-heading)] tracking-wide transition-colors ${
      active
        ? "text-[#F4A26B] border-b-2 border-[#E8630A] pb-0.5"
        : "text-white/90 hover:text-white"
    }`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isNavy ? "bg-[#1b3d6e]" : "bg-transparent"}`}>
      <div className="mx-auto max-w-7xl px-6 h-18 flex items-center justify-between py-4">

        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-2.5">
          <div className="relative w-10 h-10 shrink-0">
            <Image
              src="/images/asu-logo-white.png"
              alt=""
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="font-[family-name:var(--font-heading)] font-extrabold leading-none">
            <span className="text-[13px] tracking-tight uppercase text-white">Africa Sports Unified</span>
            <span className="block text-[8px] uppercase tracking-[0.2em] font-medium text-white/60">The Voice of African Sports Business</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          <Link href="/advisory" className={linkCls(isActive("/advisory"))}>
            Advisory
          </Link>

          {/* Intelligence with dropdown */}
          <div className="relative" onMouseEnter={openIntel} onMouseLeave={closeIntel}>
            <Link
              href="/intelligence"
              className={`inline-flex items-center gap-1 ${linkCls(isIntelActive)}`}
            >
              Intelligence
              <ChevronDown size={14} className={`transition-transform duration-200 ${intelOpen ? "rotate-180" : ""}`} />
            </Link>

            {intelOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-52 bg-white rounded shadow-lg border border-gray-100 overflow-hidden z-50"
                onMouseEnter={openIntel}
                onMouseLeave={closeIntel}
              >
                <Link href="/deals-tracker" className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-[#1b3d6e] font-[family-name:var(--font-heading)] hover:bg-[#f4f7fb] border-b border-gray-50">
                  Deals Tracker
                </Link>
                <a
                  href={SPOTIFY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-[#1b3d6e] font-[family-name:var(--font-heading)] hover:bg-[#f4f7fb]"
                >
                  Podcast ↗
                </a>
              </div>
            )}
          </div>

          <Link href="/asu-insider" className={linkCls(isActive("/asu-insider"))}>
            Insider
          </Link>
          <Link href="/about" className={linkCls(isActive("/about"))}>
            About
          </Link>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/asu-insider"
            className="px-5 py-2 rounded text-sm font-bold font-[family-name:var(--font-heading)] bg-[#E8630A] text-[#030000] hover:bg-[#B04A06] hover:text-white transition-colors"
          >
            Join
          </Link>
          <Link
            href="/asu-insider"
            className="px-5 py-2 rounded text-sm font-bold font-[family-name:var(--font-heading)] border-2 border-white text-white hover:bg-white hover:text-[#1b3d6e] transition-colors"
          >
            Log In
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-[#142e54] border-t border-white/10">
          <nav className="px-6 py-4 flex flex-col gap-1">
            {[
              { label: "Advisory", href: "/advisory" },
              { label: "Intelligence", href: "/intelligence" },
              { label: "Deals Tracker", href: "/deals-tracker", indent: true },
              { label: "Podcast ↗", href: SPOTIFY_URL, external: true, indent: true },
              { label: "Insider", href: "/asu-insider" },
              { label: "About", href: "/about" },
            ].map((link) => (
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className={`py-3 text-sm font-semibold text-white/70 hover:text-white font-[family-name:var(--font-heading)] border-b border-white/10 transition-colors ${link.indent ? "pl-4" : ""}`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`py-3 text-sm font-semibold font-[family-name:var(--font-heading)] border-b border-white/10 transition-colors ${
                    link.indent ? "pl-4 text-white/70 hover:text-white" : "text-white hover:text-[#F4A26B]"
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Link
                href="/asu-insider"
                onClick={() => setOpen(false)}
                className="w-full text-center py-3 rounded text-sm font-bold font-[family-name:var(--font-heading)] bg-[#E8630A] text-[#030000]"
              >
                Join
              </Link>
              <Link
                href="/asu-insider"
                onClick={() => setOpen(false)}
                className="w-full text-center py-3 rounded text-sm font-bold font-[family-name:var(--font-heading)] border-2 border-white text-white"
              >
                Log In
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
