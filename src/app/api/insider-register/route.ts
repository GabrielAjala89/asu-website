import { Resend } from 'resend';
import { createHmac } from 'crypto';
import { createClient } from '@sanity/client';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = `Africa Sports Unified <${process.env.RESEND_FROM_EMAIL ?? 'gabriel@asunified.com'}>`;
const SITE   = 'https://asunified.com';
const SECRET = process.env.FREE_MEMBER_TOKEN_SECRET!;

const HS_PORTAL_ID       = '25075380';
const HS_INSIDER_FORM_ID = '4ebbab0b-cd45-466b-8bba-e6469b358dfa';

const sanity = createClient({
  projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-06-01',
  useCdn:     false,
  token:      process.env.SANITY_API_TOKEN,
});

function createToken(data: object): string {
  const payload = Buffer.from(JSON.stringify({ ...data, exp: Date.now() + 48 * 60 * 60 * 1000 })).toString('base64url');
  const sig     = createHmac('sha256', SECRET).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

export async function POST(req: Request) {
  try {
    const { firstName, lastName, jobTitle, organisation, email } = await req.json();

    if (!email || !firstName || !lastName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save waitlist entry and check for existing free membership simultaneously
    const [, existingMember] = await Promise.all([
      sanity.create({
        _type:        'waitlistEntry',
        firstName,
        lastName,
        jobTitle,
        organisation,
        email,
        source:       'asu-insider-waitlist',
        createdAt:    new Date().toISOString(),
      }),
      sanity.fetch<{ firstName: string } | null>(
        `*[_type == "freeMemberSignup" && email == $email][0]{ firstName }`,
        { email }
      ),
    ]);

    // Always submit to the Insider HubSpot form — HubSpot deduplicates by email
    fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HS_PORTAL_ID}/${HS_INSIDER_FORM_ID}`,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: [
            { objectTypeId: '0-1', name: 'firstname', value: firstName },
            { objectTypeId: '0-1', name: 'lastname',  value: lastName },
            { objectTypeId: '0-1', name: 'jobtitle',  value: jobTitle  ?? '' },
            { objectTypeId: '0-1', name: 'company',   value: organisation ?? '' },
            { objectTypeId: '0-1', name: 'email',     value: email },
          ],
          context: { pageUri: `${SITE}/asu-insider`, pageName: 'ASU Insider Waitlist' },
        }),
      }
    ).catch((e) => console.error('[insider-register] HubSpot error:', e));

    const { protocol, host } = new URL(req.url);
    const base = `${protocol}//${host}`;

    if (existingMember) {
      // Already a free member — waitlist confirmation only, no dataset
      await resend.emails.send({
        from:    FROM,
        to:      email,
        subject: "You're on the ASU Insider waitlist",
        html:    waitlistOnlyHtml({ firstName, jobTitle, organisation }),
      }).catch((e) => console.error('[insider-register] email error:', e));
    } else {
      // New person — enroll as free member AND confirm waitlist spot
      const token     = createToken({ firstName, email, company: organisation, jobTitle });
      const verifyUrl = `${base}/api/free-member/verify?token=${token}`;

      await Promise.all([
        // Save as free member in Sanity so "Already a member" resend works later
        sanity.create({
          _type:     'freeMemberSignup',
          firstName,
          email,
          company:   organisation,
          jobTitle,
          source:    'asu-insider-waitlist',
          createdAt: new Date().toISOString(),
        }),
        resend.emails.send({
          from:    FROM,
          to:      email,
          subject: "You're on the ASU Insider waitlist — grab your free dataset",
          html:    waitlistWithDatasetHtml({ firstName, jobTitle, organisation, verifyUrl }),
        }),
      ]).catch((e) => console.error('[insider-register] enroll error:', e));
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[insider-register]', err);
    return NextResponse.json({ error: 'Failed to register' }, { status: 500 });
  }
}

function waitlistOnlyHtml({
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

  <tr><td style="background:#1b3d6e;padding:32px 40px;">
    <p style="margin:0 0 8px;color:#F37021;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Africa Sports Unified</p>
    <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:800;line-height:1.3;">
      You're on the ASU Insider waitlist
    </h1>
  </td></tr>

  <tr><td style="padding:40px;">
    <p style="margin:0 0 16px;color:#374151;font-size:16px;">Hi ${firstName},</p>
    ${(jobTitle || organisation) ? `<p style="margin:0 0 16px;color:#9ca3af;font-size:13px;">${[jobTitle, organisation].filter(Boolean).join(' · ')}</p>` : ''}
    <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">
      You're already a free ASU member, so we've added you to the Insider waitlist. You'll be among the first to know when we go live.
    </p>
    <p style="margin:0 0 32px;color:#374151;font-size:16px;line-height:1.6;">
      In the meantime, explore our Knowledge Hub for free reports and market intelligence.
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

  <tr><td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:24px 40px;">
    <p style="margin:0;color:#9ca3af;font-size:12px;">
      Gabriel Ajala · Africa Sports Unified ·
      <a href="${SITE}" style="color:#1b3d6e;text-decoration:none;">asunified.com</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function waitlistWithDatasetHtml({
  firstName,
  jobTitle,
  organisation,
  verifyUrl,
}: {
  firstName: string;
  jobTitle?: string;
  organisation?: string;
  verifyUrl: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">

  <tr><td style="background:#1b3d6e;padding:32px 40px;">
    <p style="margin:0 0 8px;color:#F37021;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Africa Sports Unified</p>
    <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:800;line-height:1.3;">
      You're on the ASU Insider waitlist
    </h1>
  </td></tr>

  <tr><td style="padding:40px;">
    <p style="margin:0 0 16px;color:#374151;font-size:16px;">Hi ${firstName},</p>
    ${(jobTitle || organisation) ? `<p style="margin:0 0 16px;color:#9ca3af;font-size:13px;">${[jobTitle, organisation].filter(Boolean).join(' · ')}</p>` : ''}
    <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">
      We've added you to the ASU Insider waitlist — you'll be among the first to know when we go live.
    </p>
    <p style="margin:0 0 8px;color:#374151;font-size:16px;line-height:1.6;">
      As a new free member, you also get immediate access to the full <strong>2025 ASU Deals Dataset</strong>. Click below to download it now.
    </p>
    <p style="margin:0 0 32px;color:#9ca3af;font-size:13px;">This link expires in 48 hours.</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:0 0 32px;">
        <a href="${verifyUrl}"
           style="display:inline-block;background:#F37021;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:18px 44px;border-radius:50px;">
          Download 2025 Deals Dataset →
        </a>
      </td></tr>
    </table>
    <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.6;">
      You'll also receive our fortnightly newsletter with deals, market movements, and opportunities across Africa's sports economy.
    </p>
    <p style="margin:0;color:#6b7280;font-size:14px;">— Gabriel</p>
  </td></tr>

  <tr><td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:24px 40px;">
    <p style="margin:0;color:#9ca3af;font-size:12px;">
      Gabriel Ajala · Africa Sports Unified ·
      <a href="${SITE}" style="color:#1b3d6e;text-decoration:none;">asunified.com</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}
