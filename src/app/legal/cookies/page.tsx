import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrangeLine } from "@/components/ui/OrangeLine";

export const metadata = {
  title: "Cookie Policy",
  description: "How Africa Sports Unified uses cookies on its website.",
};

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-[#1b3d6e] pt-24 pb-12">
          <div className="mx-auto max-w-3xl px-6">
            <OrangeLine />
            <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-white font-[family-name:var(--font-heading)]">
              Cookie Policy
            </h1>
            <p className="mt-3 text-white/70 text-sm">Last updated: 1 September 2026</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="mx-auto max-w-3xl px-6 prose-none">
            <div className="space-y-10 text-gray-700 leading-relaxed text-[17px]">

              <div>
                <h2 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-3">What are cookies?</h2>
                <p>Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and function correctly across sessions.</p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-3">How we use cookies</h2>
                <p className="mb-3">The Africa Sports Unified website uses a minimal set of cookies:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse rounded-xl overflow-hidden border border-gray-200">
                    <thead>
                      <tr className="bg-[#1b3d6e] text-white">
                        <th className="px-5 py-3 text-left font-bold font-[family-name:var(--font-heading)] text-xs uppercase tracking-wider">Cookie</th>
                        <th className="px-5 py-3 text-left font-bold font-[family-name:var(--font-heading)] text-xs uppercase tracking-wider">Type</th>
                        <th className="px-5 py-3 text-left font-bold font-[family-name:var(--font-heading)] text-xs uppercase tracking-wider">Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white">
                        <td className="px-5 py-3 border-b border-gray-100">Essential session cookies</td>
                        <td className="px-5 py-3 border-b border-gray-100">Strictly necessary</td>
                        <td className="px-5 py-3 border-b border-gray-100">Enable core website functionality</td>
                      </tr>
                      <tr className="bg-[#f4f7fb]">
                        <td className="px-5 py-3 border-b border-gray-100">Vercel deployment</td>
                        <td className="px-5 py-3 border-b border-gray-100">Strictly necessary</td>
                        <td className="px-5 py-3 border-b border-gray-100">Used by our hosting provider to route and serve pages</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">We do not currently use advertising cookies, tracking pixels, or third-party analytics cookies. If this changes, we will update this policy and, where required by law, obtain your consent.</p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-3">Third-party embeds</h2>
                <p>Some pages on our site embed content from YouTube (for video playback). When you interact with an embedded YouTube video, YouTube may set its own cookies on your device. This is governed by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#F37021] underline">Google&apos;s Privacy Policy</a>. We have no control over these cookies.</p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-3">Managing cookies</h2>
                <p>Most browsers allow you to control cookies through their settings. You can instruct your browser to refuse cookies or to alert you when cookies are being sent. Note that disabling strictly necessary cookies may affect the functioning of the Site.</p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)] mb-3">Contact</h2>
                <p>If you have questions about our use of cookies, please contact us at <a href="mailto:info@asunified.com" className="text-[#F37021] underline">info@asunified.com</a>.</p>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
