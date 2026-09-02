import { defineType, defineField } from "sanity";

export const youtubeEmbed = defineType({
  name: "youtubeEmbed",
  title: "YouTube Video",
  type: "object",
  fields: [
    defineField({ name: "url", title: "YouTube URL", type: "url", validation: (R) => R.required() }),
    defineField({ name: "caption", title: "Caption (optional)", type: "string" }),
  ],
  preview: {
    select: { title: "url", subtitle: "caption" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: "YouTube: " + (title ?? ""), subtitle };
    },
  },
});
