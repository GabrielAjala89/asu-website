import Image from "next/image";
import { OrangeLine } from "@/components/ui/OrangeLine";
import { Button } from "@/components/ui/Button";

export function EngageSection() {
  return (
    <section className="bg-[#faf3e7] py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Full-width image */}
        <div className="relative h-72 md:h-80 rounded-2xl overflow-hidden">
          <Image
            src="/images/engage-bg.jpg"
            alt="Africa Sports Unified event"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 rounded-2xl" />
        </div>

        {/* Text block */}
        <div className="mt-10 max-w-2xl">
          <OrangeLine />
          <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
            Engage With Africa Sports Unified
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            We work with decision-makers shaping Africa&apos;s sports economy, providing the
            clarity, access, and insight required to lead with confidence.
          </p>
        </div>

        {/* Enquiry CTA */}
        <div className="mt-10 max-w-2xl">
          <p className="text-gray-600 leading-relaxed">
            We welcome enquiries related to strategic partnerships, advisory engagements, media and press, contributing to the ASU Knowledge Hub, sponsorship, and speaking or event opportunities.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/asu-insider" variant="secondary" size="md">
              Explore ASU Insider
            </Button>
            <Button href="/consult" variant="primary" size="md">
              Partner With ASU
            </Button>
          </div>
          <p className="mt-5 text-sm text-gray-500">
            Or contact us directly at{" "}
            <a href="mailto:info@asunified.com" className="text-[#1b3d6e] font-semibold hover:text-[#F37021] transition-colors">
              info@asunified.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
