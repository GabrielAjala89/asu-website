"use server";

import { createClient } from "@sanity/client";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-06-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export interface WaitlistState {
  success: boolean;
  error: string | null;
}

export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData
): Promise<WaitlistState> {
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  try {
    await writeClient.create({
      _type: "waitlistEntry",
      email,
      source: "asu-insider-waitlist",
      createdAt: new Date().toISOString(),
    });
    return { success: true, error: null };
  } catch (err) {
    console.error("Waitlist signup error:", err);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
