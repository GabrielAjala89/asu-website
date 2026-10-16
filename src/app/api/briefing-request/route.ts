import { Resend } from 'resend';
import { createClient } from '@sanity/client';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = `Africa Sports Unified <${process.env.RESEND_FROM_EMAIL ?? 'gabriel@asunified.com'}>`;
const NOTIFY = 'info@asunified.com';
const SITE   = 'https://asunified.com';

const HS_PORTAL_ID       = '25075380';
const HS_INSIDER_FORM_ID = '4ebbab0b-cd45-466b-8bba-e6469b358dfa';

const sanity = createClient({
  projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'placeholder',
  dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-06-01',
  useCdn:     false,
  token:      process.env.SANITY_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const {
      firstName, lastName, jobTitle, organisation, email,
      role, membershipType, preferredDate,
      orgType, marketsOfInterest, commercialDecision, privateConversation,
    } = await req.json();

    if (!email || !firstName || !lastName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save to Sanity
    sanity.create({
      _type:               'briefingRequest',
      firstName,
      lastName,
      jobTitle,
      organisation,
      email,
      role:                role || null,
      membershipType:      membershipType ?? 'individual',
      preferredDate:       preferredDate || null,
      orgType:             orgType || null,
      marketsOfInterest:   marketsOfInterest || null,
      commercialDecision:  commercialDecision || null,
      privateConversation: privateConversation ?? false,
      source:              'asu-insider-briefing-request',
      createdAt:           new Date().toISOString(),
    }).catch((e) => console.error('[briefing-request] Sanity error:', e));

    // Submit to HubSpot
    fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HS_PORTAL_ID}/${HS_INSIDER_FORM_ID}`,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: [
            { objectTypeId: '0-1', name: 'firstname',  value: firstName },
            { objectTypeId: '0-1', name: 'lastname',   value: lastName },
            { objectTypeId: '0-1', name: 'jobtitle',   value: jobTitle   ?? '' },
            { objectTypeId: '0-1', name: 'company',    value: organisation ?? '' },
            { objectTypeId: '0-1', name: 'email',      value: email },
            ...(orgType ? [{ objectTypeId: '0-1', name: 'hs_lead_status', value: orgType }] : []),
          ],
          context: { pageUri: `${SITE}/asu-insider`, pageName: 'ASU Insider — Briefing Request' },
        }),
      }
    ).catch((e) => console.error('[briefing-request] HubSpot error:', e));

    // Notification + confirmation emails
    await Promise.all([
      resend.emails.send({
        from:    FROM,
        to:      NOTIFY,
        subject: `New briefing request — ${firstName} ${lastName}`,
        html:    notifyHtml({ firstName, lastName, jobTitle, organisation, email, role, membershipType, preferredDate, orgType, marketsOfInterest, commercialDecision, privateConversation }),
      }),
      resend.emails.send({
        from:    FROM,
        to:      email,
        subject: 'Your ASU Insider briefing request',
        html:    confirmHtml({ firstName }),
      }),
    ]).catch((e) => console.error('[briefing-request] email error:', e));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[briefing-request]', err);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}

function row(label: string, value?: string | boolean | null) {
  if (value === undefined || value === null || value === '') return '';
  const display = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value;
  return `<tr>
    <td style="padding:8px 0;color:#9ca3af;font-size:13px;width:220px;vertical-align:top">${label}</td>
    <td style="padding:8px 0;color:#374151;font-size:13px;vertical-align:top">${display}</td>
  </tr>`;
}

function notifyHtml(d: {
  firstName: string; lastName: string; jobTitle?: string; organisation?: string;
  email: string; role?: string; membershipType?: string; preferredDate?: string;
  orgType?: string; marketsOfInterest?: string; commercialDecision?: string; privateConversation?: boolean;
}) {
  const typeLabel = d.membershipType === 'org' ? 'Organisation' : 'Individual';
  return `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">
  <tr><td style="background:#1b3d6e;padding:28px 40px;">
    <p style="margin:0 0 4px;color:#F37021;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">ASU Insider</p>
    <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:800;">New briefing request — ${typeLabel}</h1>
  </td></tr>
  <tr><td style="padding:32px 40px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      ${row('Name',                `${d.firstName} ${d.lastName}`)}
      ${row('Email',               d.email)}
      ${row('Job title',           d.jobTitle)}
      ${row('Organisation',        d.organisation)}
      ${row('Role type',           d.role)}
      ${row('Joining as',          typeLabel)}
      ${row('Preferred date',      d.preferredDate)}
      ${d.membershipType === 'org' ? `
      ${row('Organisation type',   d.orgType)}
      ${row('Markets of interest', d.marketsOfInterest)}
      ${row('Commercial decision', d.commercialDecision)}
      ${row('Prefers private call', d.privateConversation)}
      ` : ''}
    </table>
  </td></tr>
  <tr><td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 40px;">
    <p style="margin:0;color:#9ca3af;font-size:12px;">ASU Insider &middot; <a href="${SITE}" style="color:#1b3d6e;text-decoration:none;">asunified.com</a></p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function confirmHtml({ firstName }: { firstName: string }) {
  return `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">
  <tr><td style="background:#1b3d6e;padding:28px 40px;">
    <p style="margin:0 0 4px;color:#F37021;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Africa Sports Unified</p>
    <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:800;">Your briefing request is with us</h1>
  </td></tr>
  <tr><td style="padding:36px 40px;">
    <p style="margin:0 0 16px;color:#374151;font-size:16px;">Hi ${firstName},</p>
    <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">
      Thank you for requesting an ASU Insider briefing. We will be in touch shortly to confirm your invitation and share everything you need to know ahead of the session.
    </p>
    <p style="margin:0 0 32px;color:#374151;font-size:16px;line-height:1.6;">
      In the meantime, you are welcome to explore our Knowledge Hub for free reports and market intelligence on Africa's sports economy.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:0 0 32px;">
        <a href="${SITE}/knowledge-hub"
           style="display:inline-block;background:#F37021;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:16px 40px;border-radius:50px;">
          Explore the Knowledge Hub &rarr;
        </a>
      </td></tr>
    </table>
    <p style="margin:0;color:#6b7280;font-size:14px;">— Gabriel</p>
  </td></tr>
  <tr><td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 40px;">
    <p style="margin:0;color:#9ca3af;font-size:12px;">Gabriel Ajala &middot; Africa Sports Unified &middot; <a href="${SITE}" style="color:#1b3d6e;text-decoration:none;">asunified.com</a></p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}
