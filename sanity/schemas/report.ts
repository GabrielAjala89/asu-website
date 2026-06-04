import { defineType, defineField } from "sanity";

export const report = defineType({
  name: "report",
  title: "Reports",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Report title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (R) => R.required() }),
    defineField({ name: "subtitle", title: "Subtitle / short label", description: "Shown as the badge on the card e.g. '2025 AFCON Overview Report'", type: "string" }),
    defineField({ name: "coverImage", title: "Cover image (2:3 vertical)", type: "image", options: { hotspot: true }, fields: [
      defineField({ name: "alt", title: "Alt text", type: "string" }),
    ]}),
    defineField({ name: "publishedAt", title: "Published date", type: "datetime" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "features", title: "Feature bullet points", type: "array", of: [{ type: "string" }] }),
    // Pricing
    defineField({ name: "pricePaid", title: "Paid price (£)", description: "Full price for non-members", type: "number" }),
    defineField({ name: "priceMember", title: "Member price (£)", description: "Discounted price for ASU Insider — leave blank until membership launches", type: "number" }),
    defineField({ name: "stripePaymentLink", title: "Stripe Payment Link URL", description: "Create in Stripe dashboard and paste here", type: "url" }),
    // Files
    defineField({ name: "pdfFull", title: "Full PDF (paid/gated)", type: "file", options: { accept: ".pdf" } }),
    defineField({ name: "pdfFree", title: "Free sample PDF (email-gated)", type: "file", options: { accept: ".pdf" } }),
    // Meta
    defineField({ name: "featured", title: "Featured on homepage", type: "boolean", initialValue: false }),
    defineField({ name: "topics", title: "Topics", type: "array", of: [{ type: "reference", to: [{ type: "topic" }] }] }),
  ],
  orderings: [{ title: "Published (newest first)", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "subtitle", media: "coverImage" },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare: ({ title, subtitle, media }: any) => ({
      title,
      subtitle: subtitle || "Report",
      media,
    }),
  },
});
