import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Sanity CDN — for all CMS images
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      // YouTube thumbnails (fallback)
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  // Allow the Sanity Studio to be embedded without CSP issues
  async headers() {
    return [
      {
        source: "/studio/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
