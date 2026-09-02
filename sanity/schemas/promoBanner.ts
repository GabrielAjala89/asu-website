import { defineType, defineField } from "sanity";

export const promoBanner = defineType({
  name: "promoBanner",
  title: "Promo Banner",
  type: "object",
  fields: [
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, fields: [
      defineField({ name: "alt", title: "Alt text", type: "string" }),
    ]}),
    defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "description", title: "Description (optional)", type: "text", rows: 2 }),
    defineField({ name: "linkUrl", title: "Link URL", type: "url", validation: (R) => R.required() }),
    defineField({ name: "linkText", title: "Button label", type: "string", initialValue: "Listen Now" }),
  ],
  preview: {
    select: { title: "title", subtitle: "linkText", media: "image" },
  },
});
