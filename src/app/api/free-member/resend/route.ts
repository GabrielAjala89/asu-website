import { Resend } from "resend";
import { createHmac } from "crypto";
import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = `Africa Sports Unified <${process.env.RESEND_FROM_EMAIL ?? "gabriel@asunified.com"}>`;
const SITE   = "https://asunified.com";
const SECRET = process.env.FREE_MEMBER_TOKEN_SECRET!;

const readClient = createClient({
  projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-06-01",
  useCdn:     false,
  token:      process.env.SANITY_API_TOKEN,
});

function createToken(data: object): string {
  const payload = Buffer.from(JSON.stringify({ ...data, exp: Date.now() + 48 * 60 * 60 * 1000 })).toString("base64url");
  const sig     = createHmac("sha256", SECRET).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const member = await readClient.fetch(
      `*[_type == "freeMemberSignup" && email == $email][0]{ firstName, email, company, jobTitle, sector }`,
      { email }
    );

    if (!member) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    const { protocol, host } = new URL(req.url);
    const base      = `${protocol}//${host}`;
    const token     = createToken({ firstName: member.firstName, email: member.email, company: member.company, jobTitle: member.jobTitle, sector: member.sector });
    const verifyUrl = `${base}/api/free-member/verify?token=${token}`;

    await resend.emails.send({
      from: FROM,
      to:   email,
      subject: "Your 2025 ASU Deals Dataset — download link",
      html: resendHtml({ firstName: member.firstName, verifyUrl }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[free-member/resend]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

function resendHtml({ firstName, verifyUrl }: { firstName: string; verifyUrl: string }) {
  return `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">

  <tr><td style="background:#1b3d6e;padding:32px 40px;">
    <p style="margin:0 0 8px;color:#F37021;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Africa Sports Unified</p>
    <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:800;line-height:1.3;">
      Your dataset download link
    </h1>
  </td></tr>

  <tr><td style="padding:40px;">
    <p style="margin:0 0 16px;color:#374151;font-size:16px;">Hi ${firstName},</p>
    <p style="margin:0 0 24px;color:#374151;font-size:16px;line-height:1.6;">
      Here's your fresh download link for the full 2025 ASU Deals Dataset. Click below to download it now.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:0 0 32px;">
        <a href="${verifyUrl}"
           style="display:inline-block;background:#F37021;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:18px 44px;border-radius:50px;">
          Download 2025 Deals Dataset →
        </a>
      </td></tr>
    </table>
    <p style="margin:0;color:#9ca3af;font-size:12px;">
      This link expires in 48 hours. If you didn't request this, you can safely ignore it.
    </p>
  </td></tr>

  <tr><td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:24px 40px;">
    <p style="margin:0 0 4px;color:#374151;font-size:13px;font-weight:700;">Africa Sports Unified</p>
    <p style="margin:0;color:#9ca3af;font-size:12px;">
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
