"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About",         href: "/about" },
  { label: "ASU Insider",   href: "/asu-insider" },
  { label: "Consult",       href: "/consult" },
  { label: "Knowledge Hub", href: "/knowledge-hub" },
];

interface NavbarProps {
  transparent?: boolean; // true = overlay on hero video/image
}

export function Navbar({ transparent = false }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
        transparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 h-18 flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="relative w-10 h-10">
            <Image
              src="/images/asu-logo.png"
              alt="Africa Sports Unified"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className={cn(
            "font-[family-name:var(--font-heading)] font-extrabold leading-none",
            transparent ? "text-white" : "text-[#1b3d6e]"
          )}>
            <span className="text-sm tracking-tight uppercase">Africa Sports Unified</span>
            <span className={cn(
              "block text-[9px] uppercase tracking-[0.18em] font-medium",
              transparent ? "text-white/70" : "text-gray-500"
            )}>
              The Voice of African Sports Business
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-semibold font-[family-name:var(--font-heading)] tracking-wide transition-colors",
                pathname === link.href
                  ? "text-[#F37021]"
                  : transparent
                  ? "text-white/90 hover:text-white"
                  : "text-[#1b3d6e] hover:text-[#F37021]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Button href="/#newsletter" variant={transparent ? "ghost" : "outline"} size="sm">
            Subscribe
          </Button>
          <Button href="/asu-insider" variant="primary" size="sm">
            Login
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(
            "lg:hidden p-2 rounded-lg transition-colors",
            transparent ? "text-white hover:bg-white/10" : "text-[#1b3d6e] hover:bg-gray-100"
          )}
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
                className="py-3 text-sm font-semibold text-[#1b3d6e] hover:text-[#F37021] font-[family-name:var(--font-heading)] border-b border-gray-50 last:border-0 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Button href="/#newsletter" variant="outline" size="sm" className="w-full justify-center">
                Subscribe
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
