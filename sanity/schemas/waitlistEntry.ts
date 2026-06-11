import { defineType, defineField } from "sanity";

export const waitlistEntry = defineType({
  name: "waitlistEntry",
  title: "ASU Insider Waitlist",
  type: "document",
  fields: [
    defineField({ name: "email", title: "Email address", type: "string", validation: (R) => R.required().email() }),
    defineField({ name: "source", title: "Source", type: "string", initialValue: "asu-insider-waitlist" }),
    defineField({ name: "createdAt", title: "Signed up at", type: "datetime" }),
  ],
  preview: {
    select: { title: "email", subtitle: "createdAt" },
  },
});
