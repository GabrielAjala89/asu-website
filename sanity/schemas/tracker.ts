import { defineType, defineField } from "sanity";

export const tracker = defineType({
  name: "tracker",
  title: "Trackers",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Tracker title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (R) => R.required() }),
    defineField({ name: "subtitle", title: "Subtitle / badge label", type: "string" }),
    defineField({ name: "coverImage", title: "Cover image (2:3 vertical)", type: "image", options: { hotspot: true }, fields: [
      defineField({ name: "alt", title: "Alt text", type: "string" }),
    ]}),
    defineField({ name: "publishedAt", title: "Published / last updated", type: "datetime" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "features", title: "Feature bullet points", type: "array", of: [{ type: "string" }] }),
    // Airtable
    defineField({ name: "airtableEmbedFull", title: "Airtable embed URL (full — paid access)", description: "The Airtable shared view URL for paid/member users", type: "url" }),
    defineField({ name: "airtableEmbedSample", title: "Airtable embed URL (sample — email gate)", description: "A limited read-only Airtable view for free/email-gated access", type: "url" }),
    // Pricing
    defineField({ name: "pricePaid", title: "Paid price (£)", type: "number" }),
    defineField({ name: "priceMember", title: "Member price (£)", description: "Leave blank until membership launches", type: "number" }),
    defineField({ name: "stripePaymentLink", title: "Stripe Payment Link URL", type: "url" }),
    // Meta
    defineField({ name: "featured", title: "Featured on homepage", type: "boolean", initialValue: false }),
    defineField({ name: "topics", title: "Topics", type: "array", of: [{ type: "reference", to: [{ type: "topic" }] }] }),
  ],
  preview: { select: { title: "title", subtitle: "subtitle", media: "coverImage" } },
});
