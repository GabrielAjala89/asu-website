import { defineType, defineField } from "sanity";

export const podcastEmbed = defineType({
  name: "podcastEmbed",
  title: "Podcast Episode",
  type: "object",
  fields: [
    defineField({
      name: "embedUrl",
      title: "Embed URL",
      type: "url",
      description:
        "Paste the embed src URL from Spotify or Apple Podcasts. " +
        "Spotify: open the episode → Share → Embed → copy the URL inside src=\"...\". " +
        "Apple Podcasts: episode → Share → Embed → copy the src URL.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption (optional)",
      type: "string",
      description: "Short label shown beneath the player, e.g. the episode title.",
    }),
  ],
  preview: {
    select: { title: "caption", subtitle: "embedUrl" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title || "Podcast Episode",
        subtitle: subtitle,
      };
    },
  },
});
