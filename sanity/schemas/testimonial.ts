import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Person's name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "role", title: "Job title", type: "string" }),
    defineField({ name: "organisation", title: "Organisation", type: "string" }),
    defineField({ name: "organisationLogo", title: "Organisation logo (shown on slide)", type: "image", options: { hotspot: true }, fields: [
      defineField({ name: "alt", title: "Alt text", type: "string" }),
    ]}),
    defineField({ name: "photo", title: "Headshot / photo (full-bleed background)", type: "image", options: { hotspot: true }, fields: [
      defineField({ name: "alt", title: "Alt text", type: "string" }),
    ]}),
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4, validation: (R) => R.required() }),
    defineField({ name: "displayOrder", title: "Display order", type: "number", initialValue: 1 }),
  ],
  orderings: [{ title: "Display order", name: "displayOrderAsc", by: [{ field: "displayOrder", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "organisation", media: "photo" },
  },
});
