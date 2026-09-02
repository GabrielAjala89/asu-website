import { Resend } from 'resend';
import { createClient } from '@sanity/client';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = `Africa Sports Unified <${process.env.RESEND_FROM_EMAIL ?? 'gabriel@asunified.com'}>`;
const SITE = 'https://asunified.com';
const CONSULT = `${SITE}/consult`;

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-06-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { firstName, lastName, company, jobTitle, email, contentTitle, contentType, pdfUrl, stripeLink } = await req.json();

    if (!email || !firstName) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Save to Sanity
    await writeClient.create({
      _type: 'downloadRequest',
      firstName,
      lastName,
      company,
      jobTitle,
      email,
      contentTitle,
      contentType,
      createdAt: new Date().toISOString(),
    });

    // Immediate delivery email
    await resend.emails.send({
      from: FROM,
      to: email,
      subject:
        contentType === 'tracker'
          ? `Your access details — ${contentTitle}`
          : `Your free report is ready — ${contentTitle}`,
      html: immediateHtml({ firstName, lastName, company, jobTitle, contentTitle, contentType, pdfUrl, stripeLink }),
    });

    // Automated follow-up 3 days later
    const followUpAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: `Quick question about the ${contentTitle}`,
      html: followUpHtml({ firstName, contentTitle }),
      scheduledAt: followUpAt,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[download-request]', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}

function immediateHtml({
  firstName, lastName, company, jobTitle, contentTitle, contentType, pdfUrl, stripeLink,
}: {
  firstName: string;
  lastName?: string;
  company?: string;
  jobTitle?: string;
  contentTitle: string;
  contentType: string;
  pdfUrl?: string;
  stripeLink?: string;
}) {
  const isTracker = contentType === 'tracker';
  const ctaUrl = isTracker ? (stripeLink ?? CONSULT) : (pdfUrl ?? CONSULT);
  const ctaText = isTracker ? 'Get Full Access →' : 'Download Your Report →';
  const bodyLine = isTracker
    ? `Thank you for your interest in the <strong>${contentTitle}</strong>. Click below to get full access.`
    : `Thank you for requesting the <strong>${contentTitle}</strong>. Your download link is ready.`;

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
      ${isTracker ? 'Your access details are inside' : 'Your report is ready to download'}
    </h1>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:40px;">
    <p style="margin:0 0 16px;color:#374151;font-size:16px;">Hi ${firstName},</p>
    ${(company || jobTitle) ? `<p style="margin:0 0 16px;color:#9ca3af;font-size:13px;">${[jobTitle, company].filter(Boolean).join(' · ')}</p>` : ''}
    <p style="margin:0 0 32px;color:#374151;font-size:16px;line-height:1.6;">${bodyLine}</p>

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:8px 0 32px;">
        <a href="${ctaUrl}"
           style="display:inline-block;background:#F37021;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:16px 40px;border-radius:50px;">
          ${ctaText}
        </a>
      </td></tr>
    </table>

    <p style="margin:0;color:#6b7280;font-size:14px;line-height:1.6;">
      If you have any questions about what you read, or want to discuss how it applies to your work, feel free to reply to this email — I read every one.
    </p>
  </td></tr>

  <!-- Divider + footer -->
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

function followUpHtml({ firstName, contentTitle }: { firstName: string; contentTitle: string }) {
  return `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">

  <tr><td style="background:#1b3d6e;padding:32px 40px;">
    <p style="margin:0;color:#F37021;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Africa Sports Unified</p>
  </td></tr>

  <tr><td style="padding:40px;">
    <p style="margin:0 0 16px;color:#374151;font-size:16px;">Hi ${firstName},</p>
    <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">
      I hope you found the <strong>${contentTitle}</strong> useful. These reports take a lot of work to put together and I'd genuinely love to know if it helped — feel free to hit reply.
    </p>
    <p style="margin:0 0 32px;color:#374151;font-size:16px;line-height:1.6;">
      If you're working on something in Africa's sports economy — market entry, investment, sponsorship, policy — I'm happy to point you in the right direction.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:8px 0 32px;">
        <a href="${CONSULT}"
           style="display:inline-block;background:#1b3d6e;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:16px 40px;border-radius:50px;">
          Book a Call with ASU →
        </a>
      </td></tr>
    </table>
    <p style="margin:0;color:#6b7280;font-size:14px;line-height:1.6;">
      — Gabriel
    </p>
  </td></tr>

  <tr><td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:24px 40px;">
    <p style="margin:0;color:#9ca3af;font-size:12px;">
      Africa Sports Unified ·
      <a href="${SITE}" style="color:#1b3d6e;text-decoration:none;">${SITE.replace('https://', '')}</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}
