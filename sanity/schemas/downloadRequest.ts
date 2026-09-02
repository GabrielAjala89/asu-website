import { defineType, defineField } from "sanity";

export const downloadRequest = defineType({
  name: "downloadRequest",
  title: "Download Requests",
  type: "document",
  fields: [
    defineField({ name: "firstName", title: "First Name", type: "string" }),
    defineField({ name: "lastName",  title: "Last Name",  type: "string" }),
    defineField({ name: "company",   title: "Company",    type: "string" }),
    defineField({ name: "jobTitle",  title: "Job Title",  type: "string" }),
    defineField({ name: "email",     title: "Email",      type: "string", validation: (R) => R.required() }),
    defineField({ name: "contentTitle", title: "Content Downloaded", type: "string" }),
    defineField({ name: "contentType",  title: "Content Type",       type: "string" }),
    defineField({ name: "createdAt",    title: "Submitted At",       type: "datetime" }),
  ],
  orderings: [{ title: "Newest first", name: "createdAtDesc", by: [{ field: "createdAt", direction: "desc" }] }],
  preview: {
    select: { title: "email", subtitle: "contentTitle" },
    prepare: ({ title, subtitle }: { title?: string; subtitle?: string }) => ({
      title: title ?? "—",
      subtitle: subtitle ?? "—",
    }),
  },
});
