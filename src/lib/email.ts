import "server-only";
import nodemailer from "nodemailer";

/**
 * SMTP mailer for lead notifications.
 *
 * All configuration comes from environment variables (never committed). See
 * .env.example for the full list. When SMTP is not configured the transport
 * resolves to `null` and sends are reported as failures — the lead is still
 * saved to the database, so nothing is lost.
 */

export type LeadEmailPayload = {
  source: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  /** Every submitted field, including source-specific ones. */
  data: Record<string, string>;
};

const SOURCE_LABELS: Record<string, string> = {
  footer: "Footer — Free Case Evaluation",
  landing: "Landing page — Free Case Assessment",
  faq: "FAQ — Contact form",
};

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !port) return null;

  return nodemailer.createTransport({
    host,
    port: Number(port),
    // `secure: true` for port 465 (implicit TLS); STARTTLS is negotiated
    // automatically on 587/25. SMTP_SECURE can override the heuristic.
    secure: process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : Number(port) === 465,
    auth: user && pass ? { user, pass } : undefined,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderRows(entries: [string, string][]): { html: string; text: string } {
  const html = entries
    .filter(([, v]) => v && v.trim())
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 14px 6px 0;font-weight:600;color:#1b3542;vertical-align:top;white-space:nowrap">${escapeHtml(
          k,
        )}</td><td style="padding:6px 0;color:#333;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
  const text = entries
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  return { html, text };
}

/** A human-friendly label for the field keys stored in `data`. */
const FIELD_LABELS: Record<string, string> = {
  firstName: "First name",
  lastName: "Last name",
  name: "Name",
  email: "Email",
  phone: "Phone",
  contactNumber: "Contact number",
  bestTime: "Best time to contact",
  helpWith: "Help needed with",
  situation: "Situation",
  message: "Message",
};

/**
 * Send a lead-notification email. Returns `{ ok, error? }` — it never throws,
 * so the caller can record the outcome on the saved lead row.
 */
export async function sendLeadNotification(
  lead: LeadEmailPayload,
): Promise<{ ok: boolean; error?: string }> {
  const to = process.env.LEAD_NOTIFICATION_TO;
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;

  if (!to) return { ok: false, error: "LEAD_NOTIFICATION_TO is not configured" };
  if (!from) return { ok: false, error: "SMTP_FROM / SMTP_USER is not configured" };

  const transport = getTransport();
  if (!transport) return { ok: false, error: "SMTP is not configured" };

  const sourceLabel = SOURCE_LABELS[lead.source] ?? lead.source;

  // Rows: Name/Email/Phone first, then any extra structured fields (e.g. best
  // time to contact, help needed with), then the free-text message last. Raw
  // fields already represented by Name/Email/Phone/Message are skipped so nothing
  // is duplicated — and forms without a message (footer) get no Message row.
  const represented = new Set([
    "name", "firstName", "lastName", "email", "phone", "contactNumber", "message", "situation",
  ]);
  const ordered: [string, string][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
  ];
  for (const [key, value] of Object.entries(lead.data)) {
    if (represented.has(key)) continue;
    ordered.push([FIELD_LABELS[key] ?? key, value]);
  }
  if (lead.message) ordered.push(["Message", lead.message]);

  const { html: rowsHtml, text: rowsText } = renderRows(ordered);

  const subject = `New enquiry (${sourceLabel})${lead.name ? ` — ${lead.name}` : ""}`;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto">
      <h2 style="color:#1b3542;margin:0 0 4px">New website enquiry</h2>
      <p style="color:#5a6b73;margin:0 0 20px">Source: <strong>${escapeHtml(sourceLabel)}</strong></p>
      <table style="border-collapse:collapse;width:100%;font-size:15px">${rowsHtml}</table>
      <p style="color:#9aa7ad;font-size:12px;margin-top:24px">
        This lead was saved to the admin panel before this email was sent.
      </p>
    </div>`.trim();

  const text = `New website enquiry\nSource: ${sourceLabel}\n\n${rowsText}\n`;

  try {
    await transport.sendMail({
      from,
      to,
      replyTo: lead.email || undefined,
      subject,
      text,
      html,
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
