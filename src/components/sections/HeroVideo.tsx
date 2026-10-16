"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked — poster image will show instead
      });
    }
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[900px] flex items-end overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark gradient overlay — heavier at bottom where text sits */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* Content */}
      <div className="relative z-10 w-full pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-[#F4A26B] uppercase tracking-[0.14em] font-[family-name:var(--font-heading)] mb-4">
              Africa Sports Unified
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] font-[family-name:var(--font-heading)] max-w-[16ch]">
              Commercial intelligence and advisory for African sport.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-[#E3E9F2] max-w-[46rem] leading-relaxed">
              We advise the governments, federations, brands and investors shaping Africa&apos;s sports economy, backed by the deals and market data we track.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/advisory" variant="primary" size="lg">
                Learn more
              </Button>
              <Button href="/asu-insider" variant="ghost" size="lg">
                Join ASU Insider – free
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator arrow */}
      <div className="absolute bottom-6 right-8 hidden md:flex flex-col items-center gap-1 text-white/60">
        <div className="w-px h-10 bg-white/30" />
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="animate-bounce">
          <path d="M9 2v14M3 10l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
}
