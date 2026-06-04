import { defineType, defineField } from "sanity";

/**
 * Singleton document — one set of global site settings.
 * Access in Sanity Studio under "Site Settings" in the nav.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Singleton: only one document of this type should ever exist
  // (Use Sanity structure builder in sanity.config.ts to limit to one instance)
  fields: [
    defineField({ name: "siteTitle", title: "Site title", type: "string", initialValue: "Africa Sports Unified" }),
    defineField({ name: "siteTagline", title: "Tagline", type: "string", initialValue: "The Voice of African Sports Business" }),
    defineField({ name: "siteDescription", title: "Default SEO description", type: "text", rows: 2 }),
    defineField({ name: "logo", title: "Logo (SVG or PNG)", type: "image" }),
    defineField({ name: "logoWhite", title: "White logo variant (for dark backgrounds)", type: "image" }),
    defineField({ name: "footerTagline", title: "Footer tagline", type: "string" }),
    // Social
    defineField({ name: "socialTwitter", title: "Twitter/X URL", type: "url" }),
    defineField({ name: "socialLinkedin", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "socialInstagram", title: "Instagram URL", type: "url" }),
    defineField({ name: "socialYoutube", title: "YouTube channel URL", type: "url" }),
    defineField({ name: "socialSpotify", title: "Spotify podcast URL", type: "url" }),
    // Newsletter
    defineField({ name: "newsletterHeading", title: "Newsletter signup heading", type: "string", initialValue: "Stay ahead of Africa's sports economy" }),
    defineField({ name: "newsletterSubtext", title: "Newsletter subtext", type: "string" }),
    // Calendly
    defineField({ name: "calendlyUrl", title: "Calendly booking URL (for Consult page)", type: "url" }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
