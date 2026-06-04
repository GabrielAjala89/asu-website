import { defineType, defineField } from "sanity";

export const topic = defineType({
  name: "topic",
  title: "Topics",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Topic name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (R) => R.required() }),
    defineField({ name: "description", title: "Short description", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "title" } },
});
