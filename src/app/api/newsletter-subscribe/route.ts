import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = `Africa Sports Unified <${process.env.RESEND_FROM_EMAIL ?? "gabriel@asunified.com"}>`;
const SITE = "https://asunified.com";

const HS_PORTAL_ID = "25075380";
const HS_FORM_ID = "f75cf6de-9bdc-4fcc-b5c2-9ec5236bfa33";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, company, jobTitle } = await req.json();

    if (!email || !firstName || !lastName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const hsFields = [
      { objectTypeId: "0-1", name: "firstname",  value: firstName },
      { objectTypeId: "0-1", name: "lastname",   value: lastName },
      { objectTypeId: "0-1", name: "email",      value: email },
      ...(company  ? [{ objectTypeId: "0-1", name: "company",   value: company }]  : []),
      ...(jobTitle ? [{ objectTypeId: "0-1", name: "jobtitle",  value: jobTitle }] : []),
    ];

    await Promise.all([
      // Submit to HubSpot Forms API — saves contact to CRM, no token needed
      fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HS_PORTAL_ID}/${HS_FORM_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: hsFields,
            context: {
              pageUri: SITE,
              pageName: "ASU Newsletter",
            },
          }),
        }
      ),
      // Send welcome email via Resend
      resend.emails.send({
        from: FROM,
        to: email,
        subject: "Welcome to ASU — Africa's sports economy, in your inbox",
        html: welcomeHtml({ firstName, jobTitle, company }),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[newsletter-subscribe]", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}

function welcomeHtml({ firstName, jobTitle, company }: { firstName: string; jobTitle?: string; company?: string }) {
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
      Welcome to ASU — Africa's sports economy, in your inbox
    </h1>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:40px;">
    <p style="margin:0 0 16px;color:#374151;font-size:16px;">Hi ${firstName},</p>
    ${(jobTitle || company) ? `<p style="margin:0 0 16px;color:#9ca3af;font-size:13px;">${[jobTitle, company].filter(Boolean).join(" · ")}</p>` : ""}
    <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">
      Thank you for subscribing. You've just joined a community of 4,000+ investors, executives, rights holders, and decision-makers shaping the future of sport across the African continent, and we're glad to have you with us.
    </p>

    <p style="margin:0 0 12px;color:#1b3d6e;font-size:15px;font-weight:700;">Here's what to expect from ASU:</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f0f4fa;color:#374151;font-size:15px;line-height:1.5;">
          <span style="color:#F37021;font-weight:700;">Fortnightly newsletter</span> — curated intelligence on deals, market movements, and emerging opportunities across African sports
        </td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f0f4fa;color:#374151;font-size:15px;line-height:1.5;">
          <span style="color:#F37021;font-weight:700;">Exclusive reports &amp; tools</span> — early or free access to ASU research, trackers, and intelligence pieces as they're released
        </td>
      </tr>
      <tr>
        <td style="padding:10px 0;color:#374151;font-size:15px;line-height:1.5;">
          <span style="color:#F37021;font-weight:700;">Ecosystem updates</span> — offers, partnerships, and opportunities from across the ASU network, relevant to your work in the space
        </td>
      </tr>
    </table>

    <p style="margin:0 0 32px;color:#374151;font-size:16px;line-height:1.6;">
      Our focus is always on giving you the insight you need to stay ahead, no noise, no filler.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:0 0 32px;">
        <a href="${SITE}/knowledge-hub"
           style="display:inline-block;background:#F37021;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:16px 40px;border-radius:50px;">
          Explore the Knowledge Hub →
        </a>
      </td></tr>
    </table>

    <p style="margin:0 0 16px;color:#6b7280;font-size:14px;line-height:1.6;">
      If you have any questions or want to get in touch, reply directly to this email.
    </p>
    <p style="margin:0;color:#6b7280;font-size:14px;">Welcome aboard.</p>
    <p style="margin:16px 0 0;color:#374151;font-size:14px;font-weight:700;">The ASU Team</p>
    <p style="margin:4px 0 0;color:#9ca3af;font-size:12px;line-height:1.6;">
      If this email isn't where you expected it, check your junk or spam folder and mark it as safe.
    </p>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:24px 40px;">
    <p style="margin:0 0 4px;color:#374151;font-size:13px;font-weight:700;">Africa Sports Unified</p>
    <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.6;">
      Pan-African Focused. Globally Connected. ·
      <a href="${SITE}" style="color:#1b3d6e;text-decoration:none;">asunified.com</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}
