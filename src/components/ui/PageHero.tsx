import Image from "next/image";
import { OrangeLine } from "@/components/ui/OrangeLine";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function PageHero({ title, subtitle, imageSrc = "/images/hero-poster.jpg", imageAlt = "" }: PageHeroProps) {
  return (
    <section className="relative h-72 md:h-96 flex items-end overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt || title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1b3d6e]/90 via-[#1b3d6e]/50 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full pb-12">
        <OrangeLine />
        <h1 className="mt-3 text-3xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
