import { Resend } from 'resend';
import { createClient } from '@sanity/client';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = `Africa Sports Unified <${process.env.RESEND_FROM_EMAIL ?? 'gabriel@asunified.com'}>`;
const NOTIFY = 'gabriel@asunified.com';
const SITE   = 'https://asunified.com';

const HS_PORTAL_ID  = '25075380';
const HS_FORM_ID    = 'f75cf6de-9bdc-4fcc-b5c2-9ec5236bfa33'; // free member form — captures the contact

const sanity = createClient({
  projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-06-01',
  useCdn:     false,
  token:      process.env.SANITY_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const {
      firstName, lastName, jobTitle, organisation, orgType,
      email, marketsOfInterest, commercialDecision,
    } = await req.json();

    if (!email || !firstName || !lastName || !organisation) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save to Sanity
    await sanity.create({
      _type:              'orgEnquiry',
      firstName, lastName, jobTitle, organisation, orgType,
      email, marketsOfInterest, commercialDecision,
      source:             'asu-insider-org-enquiry',
      createdAt:          new Date().toISOString(),
    }).catch((e) => console.error('[org-enquiry] Sanity error:', e));

    // Submit to HubSpot to capture the contact
    fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HS_PORTAL_ID}/${HS_FORM_ID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: [
            { objectTypeId: '0-1', name: 'firstname', value: firstName },
            { objectTypeId: '0-1', name: 'lastname',  value: lastName },
            { objectTypeId: '0-1', name: 'jobtitle',  value: jobTitle  ?? '' },
            { objectTypeId: '0-1', name: 'company',   value: organisation },
            { objectTypeId: '0-1', name: 'email',     value: email },
          ],
          context: { pageUri: `${SITE}/asu-insider`, pageName: 'ASU Insider — Organisation Enquiry' },
        }),
      }
    ).catch((e) => console.error('[org-enquiry] HubSpot error:', e));

    // Notify Gabriel with all the details
    await resend.emails.send({
      from:    FROM,
      to:      NOTIFY,
      subject: `New organisation enquiry — ${organisation}`,
      html:    notifyHtml({ firstName, lastName, jobTitle, organisation, orgType, email, marketsOfInterest, commercialDecision }),
    }).catch((e) => console.error('[org-enquiry] notify email error:', e));

    // Confirmation to enquirer
    await resend.emails.send({
      from:    FROM,
      to:      email,
      subject: 'Your ASU Insider enquiry',
      html:    confirmHtml({ firstName, organisation }),
    }).catch((e) => console.error('[org-enquiry] confirm email error:', e));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[org-enquiry]', err);
    return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 });
  }
}

function row(label: string, value?: string) {
  if (!value) return '';
  return `<tr>
    <td style="padding:8px 0;color:#9ca3af;font-size:13px;width:180px;vertical-align:top">${label}</td>
    <td style="padding:8px 0;color:#374151;font-size:13px;vertical-align:top">${value}</td>
  </tr>`;
}

function notifyHtml(d: {
  firstName: string; lastName: string; jobTitle?: string; organisation: string;
  orgType?: string; email: string; marketsOfInterest?: string; commercialDecision?: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">
  <tr><td style="background:#1b3d6e;padding:28px 40px;">
    <p style="margin:0 0 4px;color:#F37021;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">ASU Insider</p>
    <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:800;">New organisation enquiry</h1>
  </td></tr>
  <tr><td style="padding:32px 40px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      ${row('Name',                `${d.firstName} ${d.lastName}`)}
      ${row('Email',               d.email)}
      ${row('Job title',           d.jobTitle)}
      ${row('Organisation',        d.organisation)}
      ${row('Organisation type',   d.orgType)}
      ${row('Markets of interest', d.marketsOfInterest)}
      ${row('Commercial decision', d.commercialDecision)}
    </table>
  </td></tr>
  <tr><td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 40px;">
    <p style="margin:0;color:#9ca3af;font-size:12px;">ASU Insider · <a href="${SITE}" style="color:#1b3d6e;text-decoration:none;">asunified.com</a></p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function confirmHtml({ firstName, organisation }: { firstName: string; organisation: string }) {
  return `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">
  <tr><td style="background:#1b3d6e;padding:28px 40px;">
    <p style="margin:0 0 4px;color:#F37021;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Africa Sports Unified</p>
    <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:800;">Your enquiry is with us</h1>
  </td></tr>
  <tr><td style="padding:36px 40px;">
    <p style="margin:0 0 16px;color:#374151;font-size:16px;">Hi ${firstName},</p>
    <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">
      Thank you for your interest in ASU Insider for ${organisation}. We have received your enquiry and will be in touch shortly to discuss how we can tailor access to your organisation&apos;s needs.
    </p>
    <p style="margin:0 0 32px;color:#374151;font-size:16px;line-height:1.6;">
      In the meantime, you are welcome to explore our Knowledge Hub for free reports and market intelligence.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:0 0 32px;">
        <a href="${SITE}/knowledge-hub"
           style="display:inline-block;background:#F37021;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:16px 40px;border-radius:50px;">
          Explore the Knowledge Hub →
        </a>
      </td></tr>
    </table>
    <p style="margin:0;color:#6b7280;font-size:14px;">— Gabriel</p>
  </td></tr>
  <tr><td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 40px;">
    <p style="margin:0;color:#9ca3af;font-size:12px;">Gabriel Ajala · Africa Sports Unified · <a href="${SITE}" style="color:#1b3d6e;text-decoration:none;">asunified.com</a></p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}
