import Link from "next/link";
import Image from "next/image";
import { OrangeLine } from "@/components/ui/OrangeLine";
import { Button } from "@/components/ui/Button";

// Type for a Report or Tracker from Sanity
interface Product {
  _id: string;
  _type: "report" | "tracker";
  title: string;
  subtitle?: string;
  pricePaid?: number;
  features?: string[];
  slug: { current: string };
  coverImage?: { asset?: { url: string }; alt?: string };
}

interface KnowledgeHubPreviewProps {
  products: Product[];
}

export function KnowledgeHubPreview({ products }: KnowledgeHubPreviewProps) {
  return (
    <section className="bg-[#faf3e7] py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <OrangeLine className="mx-auto" />
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
            The ASU Knowledge Hub
          </h2>
          <p className="mt-2 text-lg font-bold text-[#1b3d6e] font-[family-name:var(--font-heading)]">
            Decision-grade intelligence shaping Africa&apos;s sports economy.
          </p>
        </div>

        {/* Product cards grid */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          /* Placeholder cards shown when no Sanity content yet */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {placeholders.map((p) => (
              <PlaceholderCard key={p.id} {...p} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Button href="/knowledge-hub" variant="primary" size="lg">
            Explore the Knowledge Hub →
          </Button>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const href = `/${product._type === "tracker" ? "trackers" : "reports"}/${product.slug.current}`;
  const label = product._type === "tracker" ? "EXPLORE TRACKER" : "VIEW REPORT";

  return (
    <Link href={href} className="group block">
      <div className="relative rounded-2xl overflow-hidden aspect-[2/3] flex flex-col justify-between">
        {/* Background image */}
        {product.coverImage?.asset?.url ? (
          <Image
            src={product.coverImage.asset.url}
            alt={product.coverImage.alt || product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-[#1b3d6e]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Top badge */}
        <div className="relative z-10 p-5">
          <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-[#1b3d6e] text-[10px] font-bold font-[family-name:var(--font-heading)] uppercase tracking-wider">
            {product.subtitle || product.title}
          </span>
        </div>

        {/* Bottom content */}
        <div className="relative z-10 p-5">
          <p className="text-2xl font-extrabold text-white font-[family-name:var(--font-heading)]">
            {product.pricePaid ? `£${product.pricePaid}` : "Free"}
          </p>
          {product.features && product.features.length > 0 && (
            <div className="mt-3">
              <p className="text-white text-xs font-bold uppercase tracking-wider mb-2 font-[family-name:var(--font-heading)]">Features</p>
              <ul className="space-y-1">
                {product.features.slice(0, 4).map((f, i) => (
                  <li key={i} className="text-white/80 text-xs flex gap-1.5">
                    <span className="mt-0.5">•</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-5 w-full py-2.5 rounded-full bg-white text-center text-[#1b3d6e] text-xs font-bold font-[family-name:var(--font-heading)] uppercase tracking-wider group-hover:bg-[#F37021] group-hover:text-white transition-colors">
            {label}
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Placeholder cards (shown before real content is added to Sanity) ─────────

const placeholders = [
  {
    id: 1, badge: "2025 AFCON OVERVIEW REPORT", price: "£100",
    description: "Strategic, data-driven analysis of the 2025 Africa Cup of Nations tournament",
    features: ["Commercial & Financial Insights","Media & Broadcast Impact","Sporting & Competitive Summary","Host & Infrastructure Evaluation"],
    label: "VIEW REPORT", bg: "from-green-900/80",
  },
  {
    id: 2, badge: "AFRICAN SPORTS MARKET DEALS TRACKER", price: "£55",
    description: "Database that tracks commercial deals, sponsorships, broadcast, and investments.",
    features: ["Deal Coverage & Listings","Market Insights & Trends","Data for Strategic Decisions","Contextual Industry Insights"],
    label: "EXPLORE TRACKER", bg: "from-slate-800/80",
  },
  {
    id: 3, badge: "2023 AFCON OVERVIEW REPORT", price: "£145",
    description: "Comprehensive analysis of the 2023 Africa Cup of Nations (AFCON)",
    features: ["Tournament Summary & Stats","Competitive Insights","Commercial & Media Impact","Socio-economic Impact"],
    label: "VIEW REPORT", bg: "from-stone-700/80",
  },
  {
    id: 4, badge: "2025 AFRICAN SPORTS MARKET TRENDS REPORT", price: "£25",
    description: "Comprehensive industry analysis released by Africa Sports Unified",
    features: ["Digital Transformation as a Growth Driver","Investment Trends and Challenges","Importance of Grassroots Development","Strategic Insights for Stakeholders"],
    label: "VIEW REPORT", bg: "from-orange-900/80",
  },
];

function PlaceholderCard({ badge, price, description, features, label, bg }: typeof placeholders[0]) {
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-[2/3] flex flex-col justify-between bg-[#1b3d6e]">
      <div className={`absolute inset-0 bg-gradient-to-t ${bg} to-transparent`} />
      <div className="relative z-10 p-5">
        <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-[#1b3d6e] text-[10px] font-bold font-[family-name:var(--font-heading)] uppercase tracking-wider">
          {badge}
        </span>
      </div>
      <div className="relative z-10 p-5">
        <p className="text-2xl font-extrabold text-white font-[family-name:var(--font-heading)]">{price}</p>
        <p className="mt-1 text-white/70 text-xs leading-relaxed">{description}</p>
        <div className="mt-3">
          <p className="text-white text-xs font-bold uppercase tracking-wider mb-2 font-[family-name:var(--font-heading)]">Features</p>
          <ul className="space-y-1">
            {features.map((f, i) => (
              <li key={i} className="text-white/80 text-xs flex gap-1.5"><span className="mt-0.5">•</span>{f}</li>
            ))}
          </ul>
        </div>
        <div className="mt-5 w-full py-2.5 rounded-full bg-white text-center text-[#1b3d6e] text-xs font-bold font-[family-name:var(--font-heading)] uppercase tracking-wider">
          {label}
        </div>
      </div>
    </div>
  );
}
