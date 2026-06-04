import { defineType, defineField } from "sanity";

export const video = defineType({
  name: "video",
  title: "Videos",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (R) => R.required() }),
    defineField({ name: "author", title: "Author / Host", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "publishedAt", title: "Published date", type: "datetime" }),
    defineField({ name: "duration", title: "Duration (e.g. 12:30)", type: "string" }),
    defineField({ name: "youtubeUrl", title: "YouTube embed URL", description: "Paste the full YouTube URL — e.g. https://www.youtube.com/watch?v=XXXXXXX", type: "url", validation: (R) => R.required() }),
    defineField({ name: "thumbnail", title: "Thumbnail image", type: "image", options: { hotspot: true }, fields: [
      defineField({ name: "alt", title: "Alt text", type: "string" }),
    ]}),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "topics", title: "Topics", type: "array", of: [{ type: "reference", to: [{ type: "topic" }] }] }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "tierRequired", title: "Access tier required", type: "string",
      options: { list: [
        { title: "Public (free)", value: "public" },
        { title: "Community (email gate)", value: "community" },
        { title: "ASU Insider", value: "insider" },
      ], layout: "radio" },
      initialValue: "public",
    }),
  ],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "thumbnail" } },
});
