/**
 * Sanity Studio — embedded at /studio
 * Log in at https://asunified.com/studio with your Sanity credentials.
 * Only accessible to editors who have been given access in the Sanity project.
 */
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
