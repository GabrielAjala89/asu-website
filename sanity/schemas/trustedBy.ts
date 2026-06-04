import { defineType, defineField } from "sanity";

export const trustedBy = defineType({
  name: "trustedBy",
  title: "Trusted By Logos",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Organisation name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "logo", title: "Logo (PNG with transparent background or SVG)", type: "image", options: { hotspot: false } }),
    defineField({ name: "url", title: "Website URL (optional)", type: "url" }),
    defineField({ name: "displayOrder", title: "Display order", type: "number", initialValue: 1 }),
  ],
  orderings: [{ title: "Display order", name: "displayOrderAsc", by: [{ field: "displayOrder", direction: "asc" }] }],
  preview: { select: { title: "name", media: "logo" } },
});
