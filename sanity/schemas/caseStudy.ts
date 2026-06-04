import { defineType, defineField } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Studies",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (R) => R.required() }),
    defineField({ name: "clientName", title: "Client name", type: "string" }),
    defineField({ name: "clientLogo", title: "Client logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true } }),
    defineField({ name: "summary", title: "Summary (shown on Consult page inline)", type: "text", rows: 4, validation: (R) => R.required() }),
    defineField({ name: "outcomes", title: "Key outcomes (bullet points)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "document", title: "Full case study document (PDF — gated)", type: "file", options: { accept: ".pdf,.docx" } }),
    defineField({ name: "displayOrder", title: "Display order on Consult page", type: "number", initialValue: 1 }),
  ],
  orderings: [{ title: "Display order", name: "displayOrderAsc", by: [{ field: "displayOrder", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "clientName", media: "heroImage" } },
});
