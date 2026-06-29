import type { Metadata } from "next";
import { Montserrat, Lora } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Africa Sports Unified — The Voice of African Sports Business",
    template: "%s | Africa Sports Unified",
  },
  description:
    "Africa's most trusted intelligence and advisory platform for the Pan-African sports economy. Insights, access, and strategy for decision-makers.",
  metadataBase: new URL("https://asunified.com"),
  openGraph: {
    title: "Africa Sports Unified",
    description: "Africa's most trusted intelligence and advisory platform for the Pan-African sports economy. Insights, access, and strategy for decision-makers.",
    url: "https://asunified.com",
    siteName: "Africa Sports Unified",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Africa Sports Unified",
    description: "Africa's most trusted intelligence and advisory platform for the Pan-African sports economy. Insights, access, and strategy for decision-makers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${lora.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
