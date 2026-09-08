import { Resend } from "resend";
import { createHmac } from "crypto";
import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = `Africa Sports Unified <${process.env.RESEND_FROM_EMAIL ?? "gabriel@asunified.com"}>`;
const SITE   = "https://asunified.com";
const SECRET = process.env.FREE_MEMBER_TOKEN_SECRET!;

const HS_PORTAL_ID = "25075380";
const HS_FORM_ID   = "f75cf6de-9bdc-4fcc-b5c2-9ec5236bfa33";

const CSV_2025 =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQwfVa1av_8miAE8shipaI58BjTz98lNXCOoXQPMpu7bY_qCPLjVTcTU9IBjMpcvoV03F-sVLTEvvCc/pub?gid=0&single=true&output=csv";

const writeClient = createClient({
  projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-06-01",
  useCdn:     false,
  token:      process.env.SANITY_API_TOKEN,
});

interface TokenPayload {
  firstName: string;
  email:     string;
  company?:  string;
  jobTitle?: string;
  sector?:   string;
  exp:       number;
}

function verifyToken(token: string): TokenPayload | null {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = createHmac("sha256", SECRET).update(payload).digest("base64url");
  if (expected !== sig) return null;
  const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as TokenPayload;
  if (data.exp < Date.now()) return null;
  return data;
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let field = "", inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { if (inQ && line[i + 1] === '"') { field += '"'; i++; } else inQ = !inQ; }
    else if (c === "," && !inQ) { fields.push(field); field = ""; }
    else field += c;
  }
  fields.push(field);
  return fields;
}

async function build2025Excel(): Promise<Buffer> {
  const res  = await fetch(CSV_2025);
  const text = await res.text();
  const rows = text.split("\n").map((l) => l.trim()).filter(Boolean).map(parseCSVLine);

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws["!cols"] = rows[0]?.map(() => ({ wch: 24 })) ?? [];
  XLSX.utils.book_append_sheet(wb, ws, "ASU Deals 2025");

  return Buffer.from(XLSX.write(wb, { type: "buffer", bookType: "xlsx" }));
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token") ?? "";

  const data = verifyToken(token);
  if (!data) {
    return NextResponse.redirect(`${SITE}/deals-tracker?member=invalid`);
  }

  const { firstName, email, company, jobTitle, sector } = data;

  try {
    // Build Excel, save to Sanity + HubSpot in parallel
    const [excelBuffer] = await Promise.all([
      build2025Excel(),
      writeClient.create({
        _type:     "freeMemberSignup",
        firstName, email, company, jobTitle, sector,
        source:    "deals-tracker-free-member",
        createdAt: new Date().toISOString(),
      }).catch(() => null), // don't block download if Sanity write fails
      fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HS_PORTAL_ID}/${HS_FORM_ID}`,
        {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: [
              { objectTypeId: "0-1", name: "firstname", value: firstName },
              { objectTypeId: "0-1", name: "email",     value: email },
              ...(company  ? [{ objectTypeId: "0-1", name: "company",  value: company }]  : []),
              ...(jobTitle ? [{ objectTypeId: "0-1", name: "jobtitle", value: jobTitle }] : []),
            ],
            context: { pageUri: `${SITE}/deals-tracker`, pageName: "Deals Tracker — Free Member" },
          }),
        }
      ).catch(() => null),
    ]);

    // Fire a brief welcome email in the background — don't await it
    resend.emails.send({
      from: FROM,
      to:   email,
      subject: "Welcome to ASU — you're now a free member",
      html: welcomeHtml({ firstName, company, jobTitle }),
    }).catch(() => null);

    // Serve the Excel file directly
    return new Response(new Uint8Array(excelBuffer), {
      status:  200,
      headers: {
        "Content-Type":        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="ASU-Deals-Dataset-2025.xlsx"',
        "Cache-Control":       "no-store",
      },
    });
  } catch (err) {
    console.error("[free-member/verify]", err);
    return NextResponse.redirect(`${SITE}/deals-tracker?member=invalid`);
  }
}

function welcomeHtml({ firstName, company, jobTitle }: { firstName: string; company?: string; jobTitle?: string }) {
  return `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">

  <tr><td style="background:#1b3d6e;padding:32px 40px;">
    <p style="margin:0 0 8px;color:#F37021;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Africa Sports Unified — Free Member</p>
    <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:800;line-height:1.3;">
      Welcome — you're now a free ASU member
    </h1>
  </td></tr>

  <tr><td style="padding:40px;">
    <p style="margin:0 0 16px;color:#374151;font-size:16px;">Hi ${firstName},</p>
    ${(jobTitle || company) ? `<p style="margin:0 0 16px;color:#9ca3af;font-size:13px;">${[jobTitle, company].filter(Boolean).join(" · ")}</p>` : ""}
    <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">
      Your 2025 Deals Dataset should have downloaded when you clicked the link. If it didn't, reply to this email and we'll send it straight over.
    </p>
    <p style="margin:0 0 32px;color:#374151;font-size:16px;line-height:1.6;">
      As a free member you'll also receive our fortnightly newsletter — curated intelligence on deals, market movements, and opportunities across Africa's sports economy.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:0 0 32px;">
        <a href="${SITE}/trackers/african-sports-market-deals-tracker"
           style="display:inline-block;background:#F37021;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:16px 40px;border-radius:50px;">
          Explore Full Access →
        </a>
      </td></tr>
    </table>
    <p style="margin:0;color:#6b7280;font-size:14px;">— The ASU Team</p>
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
