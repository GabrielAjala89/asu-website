import { defineType, defineField } from "sanity";

export const article = defineType({
  name: "article",
  title: "Articles",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (R) => R.required() }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "publishedAt", title: "Published date", type: "datetime", validation: (R) => R.required() }),
    defineField({ name: "readTime", title: "Read time (minutes)", type: "number" }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true }, fields: [
      defineField({ name: "caption", title: "Caption", type: "string" }),
      defineField({ name: "alt", title: "Alt text", type: "string" }),
    ]}),
    defineField({ name: "excerpt", title: "Excerpt (for cards + SEO)", type: "text", rows: 3, validation: (R) => R.required().max(300) }),
    defineField({ name: "body", title: "Body", type: "array", of: [
      { type: "block" },
      { type: "image", options: { hotspot: true }, fields: [
        defineField({ name: "caption", title: "Caption", type: "string" }),
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ]},
    ]}),
    defineField({ name: "topics", title: "Topics", type: "array", of: [{ type: "reference", to: [{ type: "topic" }] }] }),
    defineField({ name: "featured", title: "Featured on homepage", type: "boolean", initialValue: false }),
    // Tier field — inert at launch, powers paywall in v2
    defineField({ name: "tierRequired", title: "Access tier required", type: "string",
      options: { list: [
        { title: "Public (free)", value: "public" },
        { title: "Community (email gate)", value: "community" },
        { title: "ASU Insider", value: "insider" },
        { title: "Enterprise", value: "enterprise" },
      ], layout: "radio" },
      initialValue: "public",
    }),
    defineField({ name: "seoTitle", title: "SEO title (optional override)", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description (optional override)", type: "text", rows: 2 }),
  ],
  orderings: [{ title: "Published (newest first)", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "heroImage" },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare: ({ title, subtitle, media }: any) => ({
      title,
      subtitle: subtitle ? new Date(subtitle).toLocaleDateString("en-GB") : "No date",
      media,
    }),
  },
});
