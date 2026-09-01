import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrangeLine } from "@/components/ui/OrangeLine";

export const metadata = {
  title: "Privacy Policy",
  description: "How Africa Sports Unified collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-[#1b3d6e] pt-24 pb-12">
          <div className="mx-auto max-w-3xl px-6">
            <OrangeLine />
            <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-white font-[family-name:var(--font-heading)]">
              Privacy Policy
            </h1>
            <p className="mt-3 text-white/70 text-sm">Last updated: 1 September 2026</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="mx-auto max-w-3xl px-6 prose-none">
            <div className="space-y-10 text-gray-700 leading-relaxed text-[17px]">

              <div>
                <h2 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-3">Who we are</h2>
                <p>Africa Sports Unified (&quot;ASU&quot;, &quot;we&quot;, &quot;us&quot;) is an intelligence and advisory platform focused on Africa&apos;s sports economy. We are based in the United Kingdom. You can contact us at <a href="mailto:info@asunified.com" className="text-[#F37021] underline">info@asunified.com</a>.</p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-3">What data we collect and why</h2>
                <p className="mb-3">We only collect personal data when you choose to provide it to us. This happens in two situations:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>ASU Insider registration:</strong> When you register your interest in ASU Insider, we collect your first name, last name, job title, organisation, and email address. We use this to send you a confirmation email and to contact you when ASU Insider launches.</li>
                  <li><strong>Report and tracker downloads:</strong> When you request a report or tracker, we collect your name, company, and email address. We use this to send you the download link and occasional relevant follow-up communications about our research.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-3">Legal basis for processing</h2>
                <p>We process your personal data on the basis of your consent, given when you submit a form on our website. You may withdraw your consent at any time by contacting us at <a href="mailto:info@asunified.com" className="text-[#F37021] underline">info@asunified.com</a>.</p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-3">How we store your data</h2>
                <p>Your data is stored securely using Sanity (our content management system) and processed for email delivery via Resend. Both services are reputable providers with their own privacy policies and appropriate data protection measures. We do not sell or share your personal data with any third parties for marketing purposes.</p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-3">How long we keep your data</h2>
                <p>We retain your data for as long as it is necessary to fulfil the purpose for which it was collected, or until you request deletion. If you wish to have your data removed, please contact us at <a href="mailto:info@asunified.com" className="text-[#F37021] underline">info@asunified.com</a>.</p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-3">Your rights</h2>
                <p className="mb-3">Under UK GDPR, you have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access the personal data we hold about you</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to or restrict how we process your data</li>
                  <li>Data portability</li>
                </ul>
                <p className="mt-3">To exercise any of these rights, please email us at <a href="mailto:info@asunified.com" className="text-[#F37021] underline">info@asunified.com</a>. You also have the right to lodge a complaint with the UK Information Commissioner&apos;s Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#F37021] underline">ico.org.uk</a>.</p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-3">Changes to this policy</h2>
                <p>We may update this policy from time to time. The &quot;last updated&quot; date at the top of this page will reflect any changes. We encourage you to review this page periodically.</p>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
