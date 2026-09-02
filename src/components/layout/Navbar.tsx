"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const SPOTIFY_URL = "https://open.spotify.com/show/37o4pqxpyoJzURhSr2dXpe?si=32b40de3ab6d491a";

const navLinks = [
  { label: "About",         href: "/about" },
  { label: "ASU Insider",   href: "/asu-insider" },
  { label: "Consult",       href: "/consult" },
];

interface NavbarProps {
  transparent?: boolean;
}

export function Navbar({ transparent = false }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [hubOpen, setHubOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const hubTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isSolid = !transparent || scrolled;

  const linkClass = (href: string) => cn(
    "text-sm font-semibold font-[family-name:var(--font-heading)] tracking-wide transition-colors",
    pathname === href || pathname.startsWith(href + "/")
      ? "text-[#F37021]"
      : isSolid
      ? "text-[#1b3d6e] hover:text-[#F37021]"
      : "text-white/90 hover:text-white"
  );

  const isHubActive = pathname === "/knowledge-hub" || pathname.startsWith("/knowledge-hub/") || pathname.startsWith("/articles/") || pathname.startsWith("/trackers/") || pathname.startsWith("/reports/") || pathname.startsWith("/videos/") || pathname.startsWith("/deals-tracker");

  function openHub() {
    if (hubTimeout.current) clearTimeout(hubTimeout.current);
    setHubOpen(true);
  }
  function closeHub() {
    hubTimeout.current = setTimeout(() => setHubOpen(false), 150);
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isSolid
          ? "bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 h-18 flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="relative w-10 h-10">
            <Image src="/images/asu-logo.png" alt="Africa Sports Unified" fill className="object-contain" priority />
          </div>
          <div className={cn("font-[family-name:var(--font-heading)] font-extrabold leading-none", isSolid ? "text-[#1b3d6e]" : "text-white")}>
            <span className="text-sm tracking-tight uppercase">Africa Sports Unified</span>
            <span className={cn("block text-[9px] uppercase tracking-[0.18em] font-medium", isSolid ? "text-gray-500" : "text-white/70")}>
              The Voice of African Sports Business
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}

          {/* Knowledge Hub with dropdown */}
          <div
            className="relative"
            onMouseEnter={openHub}
            onMouseLeave={closeHub}
          >
            <Link
              href="/knowledge-hub"
              className={cn(
                "inline-flex items-center gap-1 text-sm font-semibold font-[family-name:var(--font-heading)] tracking-wide transition-colors",
                isHubActive
                  ? "text-[#F37021]"
                  : isSolid
                  ? "text-[#1b3d6e] hover:text-[#F37021]"
                  : "text-white/90 hover:text-white"
              )}
            >
              Knowledge Hub
              <ChevronDown size={14} className={cn("transition-transform duration-200", hubOpen ? "rotate-180" : "")} />
            </Link>

            {/* Dropdown */}
            {hubOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                onMouseEnter={openHub}
                onMouseLeave={closeHub}
              >
                <Link
                  href="/deals-tracker"
                  className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[#1b3d6e] font-[family-name:var(--font-heading)] hover:bg-[#f4f7fb] hover:text-[#F37021] transition-colors border-b border-gray-50"
                >
                  Deals Tracker
                </Link>
                <a
                  href={SPOTIFY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[#1b3d6e] font-[family-name:var(--font-heading)] hover:bg-[#f4f7fb] hover:text-[#F37021] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#1DB954]" aria-hidden="true">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  Podcast
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Button href="/asu-insider" variant={isSolid ? "secondary" : "ghost"} size="sm">
            Join
          </Button>
          <Button href="/asu-insider" variant="primary" size="sm">
            Login
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn("lg:hidden p-2 rounded-lg transition-colors", isSolid ? "text-[#1b3d6e] hover:bg-gray-100" : "text-white hover:bg-white/10")}
          aria-label="Toggle navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-semibold text-[#1b3d6e] hover:text-[#F37021] font-[family-name:var(--font-heading)] border-b border-gray-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/knowledge-hub"
              onClick={() => setOpen(false)}
              className="py-3 text-sm font-semibold text-[#1b3d6e] hover:text-[#F37021] font-[family-name:var(--font-heading)] border-b border-gray-50 transition-colors"
            >
              Knowledge Hub
            </Link>
            <Link
              href="/deals-tracker"
              onClick={() => setOpen(false)}
              className="py-3 pl-4 text-sm font-semibold text-gray-500 hover:text-[#F37021] font-[family-name:var(--font-heading)] border-b border-gray-50 transition-colors"
            >
              ↳ Deals Tracker
            </Link>
            <a
              href={SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="py-3 pl-4 text-sm font-semibold text-gray-500 hover:text-[#F37021] font-[family-name:var(--font-heading)] border-b border-gray-50 transition-colors"
            >
              ↳ Podcast
            </a>
            <div className="pt-4 flex flex-col gap-2">
              <Button href="/#newsletter" variant="outline" size="sm" className="w-full justify-center">
                Join
              </Button>
              <Button href="/asu-insider" variant="primary" size="sm" className="w-full justify-center">
                Login
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
