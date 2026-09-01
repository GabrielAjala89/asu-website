import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrangeLine } from "@/components/ui/OrangeLine";

export const metadata = {
  title: "Terms of Service",
  description: "Terms of use for the Africa Sports Unified website.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-[#1b3d6e] pt-24 pb-12">
          <div className="mx-auto max-w-3xl px-6">
            <OrangeLine />
            <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-white font-[family-name:var(--font-heading)]">
              Terms of Service
            </h1>
            <p className="mt-3 text-white/70 text-sm">Last updated: 1 September 2026</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="mx-auto max-w-3xl px-6 prose-none">
            <div className="space-y-10 text-gray-700 leading-relaxed text-[17px]">

              <div>
                <h2 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-3">Acceptance of terms</h2>
                <p>By accessing or using the Africa Sports Unified website at asunified.com (&quot;the Site&quot;), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Site.</p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-3">Use of the site</h2>
                <p className="mb-3">You may use the Site for lawful purposes only. You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the Site in any way that violates applicable laws or regulations</li>
                  <li>Reproduce, distribute, or commercially exploit any content from the Site without our prior written permission</li>
                  <li>Attempt to gain unauthorised access to any part of the Site or its systems</li>
                  <li>Use automated tools to scrape or collect content from the Site without permission</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-3">Intellectual property</h2>
                <p>All content on the Site — including reports, articles, data, graphics, and brand assets — is the intellectual property of Africa Sports Unified or its content partners, and is protected by applicable copyright and intellectual property laws. You may not reproduce or republish any content without our explicit written permission.</p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-3">Content accuracy</h2>
                <p>We make every effort to ensure the accuracy of the intelligence and analysis we publish. However, all content is provided for informational purposes only and does not constitute financial, investment, or legal advice. Africa Sports Unified accepts no liability for decisions made based on information published on the Site.</p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-3">External links</h2>
                <p>The Site may contain links to third-party websites. These links are provided for convenience only. Africa Sports Unified has no control over the content or practices of those sites and accepts no responsibility for them.</p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-3">Limitation of liability</h2>
                <p>To the maximum extent permitted by law, Africa Sports Unified shall not be liable for any indirect, incidental, or consequential damages arising out of your use of, or inability to use, the Site or its content.</p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-3">Governing law</h2>
                <p>These Terms are governed by and construed in accordance with the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-3">Changes to these terms</h2>
                <p>We may revise these Terms at any time. Continued use of the Site after any changes constitutes your acceptance of the updated Terms.</p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-3">Contact</h2>
                <p>If you have any questions about these Terms, please contact us at <a href="mailto:info@asunified.com" className="text-[#F37021] underline">info@asunified.com</a>.</p>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
