import { Resend } from 'resend';
import { createClient } from '@sanity/client';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = `Africa Sports Unified <${process.env.RESEND_FROM_EMAIL ?? 'gabriel@asunified.com'}>`;
const SITE = 'https://asunified.com';

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-06-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { firstName, lastName, jobTitle, organisation, email } = await req.json();

    if (!email || !firstName || !lastName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await Promise.all([
      // Save to Sanity
      writeClient.create({
        _type: 'waitlistEntry',
        firstName,
        lastName,
        jobTitle,
        organisation,
        email,
        source: 'asu-insider-waitlist',
        createdAt: new Date().toISOString(),
      }),
      // Send confirmation email
      resend.emails.send({
        from: FROM,
        to: email,
        subject: "You're on the ASU Insider list",
        html: confirmationHtml({ firstName, jobTitle, organisation }),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[insider-register]', err);
    return NextResponse.json({ error: 'Failed to register' }, { status: 500 });
  }
}

function confirmationHtml({
  firstName,
  jobTitle,
  organisation,
}: {
  firstName: string;
  jobTitle?: string;
  organisation?: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">

  <!-- Header -->
  <tr><td style="background:#1b3d6e;padding:32px 40px;">
    <p style="margin:0 0 8px;color:#F37021;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Africa Sports Unified</p>
    <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:800;line-height:1.3;">
      You're on the ASU Insider list
    </h1>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:40px;">
    <p style="margin:0 0 16px;color:#374151;font-size:16px;">Hi ${firstName},</p>
    ${(jobTitle || organisation) ? `<p style="margin:0 0 16px;color:#9ca3af;font-size:13px;">${[jobTitle, organisation].filter(Boolean).join(' · ')}</p>` : ''}
    <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">
      Thank you for registering your interest in ASU Insider. We&apos;re building a members-only platform for the professionals and institutions shaping Africa&apos;s sports economy — and you&apos;ll be among the first to know when we go live.
    </p>
    <p style="margin:0 0 32px;color:#374151;font-size:16px;line-height:1.6;">
      In the meantime, our Knowledge Hub has free reports and market intelligence you can access right now.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:8px 0 32px;">
        <a href="${SITE}/knowledge-hub"
           style="display:inline-block;background:#F37021;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:16px 40px;border-radius:50px;">
          Explore the Knowledge Hub →
        </a>
      </td></tr>
    </table>

    <p style="margin:0;color:#6b7280;font-size:14px;line-height:1.6;">
      If you have any questions in the meantime, feel free to reply to this email.
    </p>
    <p style="margin:16px 0 0;color:#6b7280;font-size:14px;">— Gabriel</p>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:24px 40px;">
    <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.6;">
      Gabriel Ajala · Africa Sports Unified ·
      <a href="${SITE}" style="color:#1b3d6e;text-decoration:none;">${SITE.replace('https://', '')}</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}
