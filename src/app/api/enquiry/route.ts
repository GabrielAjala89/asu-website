import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = `Africa Sports Unified <${process.env.RESEND_FROM_EMAIL ?? "gabriel@asunified.com"}>`;
const NOTIFY = "info@asunified.com";

const HS_PORTAL_ID = "25075380";
const HS_FORM_ID   = "f75cf6de-9bdc-4fcc-b5c2-9ec5236bfa33";

export async function POST(req: Request) {
  try {
    const { firstName, email, company, message } = await req.json();

    if (!email || !firstName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await Promise.all([
      // Save contact to HubSpot CRM
      fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HS_PORTAL_ID}/${HS_FORM_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: [
              { objectTypeId: "0-1", name: "firstname", value: firstName },
              { objectTypeId: "0-1", name: "email",     value: email },
              ...(company ? [{ objectTypeId: "0-1", name: "company", value: company }] : []),
            ],
            context: { pageUri: "https://asunified.com/consult", pageName: "ASU Advisory — Enquiry" },
          }),
        }
      ).catch(() => null),

      // Notify Gabriel
      resend.emails.send({
        from: FROM,
        to:   NOTIFY,
        replyTo: email,
        subject: `New enquiry from ${firstName}${company ? ` · ${company}` : ""}`,
        html: notifyHtml({ firstName, email, company, message }),
      }),

      // Confirmation to enquirer
      resend.emails.send({
        from: FROM,
        to:   email,
        subject: "We've received your enquiry — ASU Advisory",
        html: confirmHtml({ firstName }),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[enquiry]", err);
    return NextResponse.json({ error: "Failed to send enquiry" }, { status: 500 });
  }
}

function notifyHtml({ firstName, email, company, message }: {
  firstName: string; email: string; company?: string; message?: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">
  <tr><td style="background:#1b3d6e;padding:28px 40px;">
    <p style="margin:0 0 6px;color:#F37021;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">ASU Advisory — New Enquiry</p>
    <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:800;line-height:1.3;">
      ${firstName}${company ? ` · ${company}` : ""} has sent an enquiry
    </h1>
  </td></tr>
  <tr><td style="padding:32px 40px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <tr><td style="padding:12px 16px;background:#f9fafb;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">Name</td>
          <td style="padding:12px 16px;background:#ffffff;font-size:14px;color:#374151;">${firstName}</td></tr>
      <tr><td style="padding:12px 16px;background:#f9fafb;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">Email</td>
          <td style="padding:12px 16px;background:#ffffff;font-size:14px;color:#374151;"><a href="mailto:${email}" style="color:#1b3d6e;">${email}</a></td></tr>
      ${company ? `<tr><td style="padding:12px 16px;background:#f9fafb;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">Company</td>
          <td style="padding:12px 16px;background:#ffffff;font-size:14px;color:#374151;">${company}</td></tr>` : ""}
      ${message ? `<tr><td style="padding:12px 16px;background:#f9fafb;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">Message</td>
          <td style="padding:12px 16px;background:#ffffff;font-size:14px;color:#374151;line-height:1.6;">${message.replace(/\n/g, "<br/>")}</td></tr>` : ""}
    </table>
    <a href="mailto:${email}" style="display:inline-block;background:#F37021;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:14px 32px;border-radius:50px;">
      Reply to ${firstName} →
    </a>
  </td></tr>
  <tr><td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 40px;">
    <p style="margin:0;color:#9ca3af;font-size:12px;">Africa Sports Unified · <a href="https://asunified.com" style="color:#1b3d6e;text-decoration:none;">asunified.com</a></p>
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
  <tr><td style="background:#1b3d6e;padding:32px 40px;">
    <p style="margin:0 0 8px;color:#F37021;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">ASU Advisory</p>
    <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:800;line-height:1.3;">We've received your enquiry</h1>
  </td></tr>
  <tr><td style="padding:40px;">
    <p style="margin:0 0 16px;color:#374151;font-size:16px;">Hi ${firstName},</p>
    <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">
      Thanks for reaching out to ASU Advisory. We've received your enquiry and will get back to you within one business day.
    </p>
    <p style="margin:0 0 32px;color:#374151;font-size:16px;line-height:1.6;">
      In the meantime, feel free to explore our knowledge hub or learn more about what we do.
    </p>
    <a href="https://asunified.com/knowledge-hub" style="display:inline-block;background:#F37021;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:16px 40px;border-radius:50px;">
      Explore Knowledge Hub →
    </a>
    <p style="margin:32px 0 4px;color:#374151;font-size:14px;font-weight:700;">The ASU Team</p>
  </td></tr>
  <tr><td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:24px 40px;">
    <p style="margin:0 0 4px;color:#374151;font-size:13px;font-weight:700;">Africa Sports Unified</p>
    <p style="margin:0;color:#9ca3af;font-size:12px;">Pan-African Focused. Globally Connected. · <a href="https://asunified.com" style="color:#1b3d6e;text-decoration:none;">asunified.com</a></p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}
