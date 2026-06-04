import Image from "next/image";
import { OrangeLine } from "@/components/ui/OrangeLine";
import { Button } from "@/components/ui/Button";

export function EngageSection() {
  return (
    <section className="bg-[#faf3e7] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background image */}
          <div className="relative h-72 md:h-80">
            <Image
              src="/images/engage-bg.jpg"
              alt="Africa Sports Unified event"
              fill
              className="object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-black/40 rounded-2xl" />
          </div>
        </div>

        {/* Text below image */}
        <div className="mt-10 max-w-2xl">
          <OrangeLine />
          <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
            Engage With Africa Sports Unified
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            We work with decision-makers shaping Africa&apos;s sports economy, providing the
            clarity, access, and insight required to lead with confidence.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/consult" variant="secondary" size="md">
              Work With ASU →
            </Button>
            <Button href="/asu-insider" variant="outline" size="md">
              Join ASU Insider →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
