import { defineType, defineField } from "sanity";

export const articleTable = defineType({
  name: "articleTable",
  title: "Data Table",
  type: "object",
  fields: [
    defineField({ name: "tableTitle", title: "Table title (optional)", type: "string" }),
    defineField({ name: "col1Header", title: "Column 1 Header", type: "string" }),
    defineField({ name: "col2Header", title: "Column 2 Header", type: "string" }),
    defineField({ name: "col3Header", title: "Column 3 Header (optional)", type: "string" }),
    defineField({ name: "col4Header", title: "Column 4 Header (optional)", type: "string" }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [{
        type: "object",
        name: "tableRow",
        title: "Row",
        fields: [
          defineField({ name: "col1", title: "Column 1", type: "string" }),
          defineField({ name: "col2", title: "Column 2", type: "string" }),
          defineField({ name: "col3", title: "Column 3", type: "string" }),
          defineField({ name: "col4", title: "Column 4", type: "string" }),
        ],
        preview: {
          select: { title: "col1", subtitle: "col2" },
        },
      }],
    }),
  ],
  preview: {
    select: { title: "tableTitle", subtitle: "col1Header" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: "Table: " + (title ?? subtitle ?? "—") };
    },
  },
});
