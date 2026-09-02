import { defineType, defineField } from "sanity";

export const waitlistEntry = defineType({
  name: "waitlistEntry",
  title: "ASU Insider Waitlist",
  type: "document",
  fields: [
    defineField({ name: "firstName", title: "First Name", type: "string" }),
    defineField({ name: "lastName", title: "Last Name", type: "string" }),
    defineField({ name: "jobTitle", title: "Job Title", type: "string" }),
    defineField({ name: "organisation", title: "Organisation", type: "string" }),
    defineField({ name: "email", title: "Email address", type: "string", validation: (R) => R.required().email() }),
    defineField({ name: "source", title: "Source", type: "string", initialValue: "asu-insider-waitlist" }),
    defineField({ name: "createdAt", title: "Signed up at", type: "datetime" }),
  ],
  preview: {
    select: { title: "firstName", subtitle: "email" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: title ?? subtitle ?? "Unknown", subtitle };
    },
  },
});
