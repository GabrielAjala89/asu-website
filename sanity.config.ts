import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import {
  article, video, report, tracker, caseStudy,
  testimonial, trustedBy, author, topic, siteSettings,
} from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "asu-website",
  title: "Africa Sports Unified CMS",
  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singleton: site settings
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.divider(),
            S.documentTypeListItem("article").title("Articles"),
            S.documentTypeListItem("video").title("Videos"),
            S.divider(),
            S.documentTypeListItem("report").title("Reports"),
            S.documentTypeListItem("tracker").title("Trackers"),
            S.documentTypeListItem("caseStudy").title("Case Studies"),
            S.divider(),
            S.documentTypeListItem("testimonial").title("Testimonials"),
            S.documentTypeListItem("trustedBy").title("Trusted By Logos"),
            S.divider(),
            S.documentTypeListItem("author").title("Authors"),
            S.documentTypeListItem("topic").title("Topics"),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: [
      article, video, report, tracker, caseStudy,
      testimonial, trustedBy, author, topic, siteSettings,
    ],
  },
});
