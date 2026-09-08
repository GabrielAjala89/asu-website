import { defineType, defineField } from "sanity";

export const freeMemberSignup = defineType({
  name: "freeMemberSignup",
  title: "Free Member Signups",
  type: "document",
  fields: [
    defineField({ name: "firstName", title: "First Name", type: "string" }),
    defineField({ name: "email",     title: "Email",      type: "string", validation: (R) => R.required() }),
    defineField({ name: "company",   title: "Company",    type: "string" }),
    defineField({ name: "jobTitle",  title: "Job Title",  type: "string" }),
    defineField({ name: "sector",    title: "Sector",     type: "string" }),
    defineField({ name: "source",    title: "Source",     type: "string" }),
    defineField({ name: "createdAt", title: "Signed Up",  type: "datetime" }),
  ],
  orderings: [{ title: "Newest first", name: "createdAtDesc", by: [{ field: "createdAt", direction: "desc" }] }],
  preview: {
    select: { title: "email", subtitle: "sector" },
    prepare: ({ title, subtitle }: { title?: string; subtitle?: string }) => ({
      title:    title    ?? "—",
      subtitle: subtitle ?? "—",
    }),
  },
});
