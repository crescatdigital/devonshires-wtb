"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendLeadNotification, type LeadEmailPayload } from "@/lib/email";

/**
 * Public form submission handler for every website form (footer, landing hero,
 * FAQ). The lead is SAVED to the database first, then the notification email is
 * attempted — so a failed email send never loses an enquiry. The send outcome is
 * recorded on the lead row (email_sent / email_error) for admin follow-up.
 *
 * Called from Client Components via useActionState, so the signature is
 * (prevState, formData).
 */

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const KNOWN_SOURCES = new Set(["footer", "landing", "faq"]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Collect every non-empty text field except framework/internal ones. */
function collectFields(formData: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value !== "string") continue;
    if (key === "source" || key === "company" || key.startsWith("$ACTION")) continue;
    const trimmed = value.trim();
    if (trimmed) out[key] = trimmed;
  }
  return out;
}

/**
 * Derive the normalized name/phone/message columns from the raw fields.
 * `message` is ONLY the free-text message/situation field. The footer form has
 * neither, so its message stays empty and no Message row is shown for footer
 * enquiries. Other structured fields (bestTime, helpWith) are preserved in
 * `data` and rendered as their own labelled rows in the email.
 */
function normalize(fields: Record<string, string>) {
  const name =
    fields.name ||
    [fields.firstName, fields.lastName].filter(Boolean).join(" ").trim();
  const phone = fields.phone || fields.contactNumber || "";
  const email = fields.email || "";
  const message = fields.message || fields.situation || "";
  return { name, email, phone, message };
}

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const source = String(formData.get("source") || "").trim();
  const safeSource = KNOWN_SOURCES.has(source) ? source : "unknown";

  // Honeypot: a real user never fills the hidden "company" field. Pretend it
  // succeeded so bots get no signal.
  const honeypot = String(formData.get("company") || "").trim();
  if (honeypot) {
    return { status: "success", message: "Thank you — we'll be in touch shortly." };
  }

  const fields = collectFields(formData);
  const { name, email, phone, message } = normalize(fields);

  // Minimal validation — a name and a valid email are required.
  if (!name) {
    return { status: "error", message: "Please enter your name." };
  }
  if (!email || !EMAIL_RE.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const emailPayload: LeadEmailPayload = { source: safeSource, name, email, phone, message, data: fields };

  // 1) Save the lead FIRST.
  let leadId: string | null = null;
  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from("leads")
      .insert({ source: safeSource, name, email, phone, message, data: fields })
      .select("id")
      .single();
    if (error) {
      console.error("[leads] failed to save lead:", error.message);
    } else {
      leadId = data.id as string;
    }
  } else {
    console.error("[leads] supabaseAdmin unavailable — SUPABASE_SERVICE_ROLE_KEY missing");
  }

  // 2) Then attempt the notification email.
  const sendResult = await sendLeadNotification(emailPayload);

  // 3) Record the send outcome on the saved row.
  if (leadId && supabaseAdmin) {
    await supabaseAdmin
      .from("leads")
      .update({
        email_sent: sendResult.ok,
        email_error: sendResult.ok ? null : sendResult.error ?? "unknown error",
        emailed_at: sendResult.ok ? new Date().toISOString() : null,
      })
      .eq("id", leadId);
  }

  // As long as the lead was captured (saved) OR emailed, the enquiry is not lost.
  if (leadId || sendResult.ok) {
    return { status: "success", message: "Thank you — we've received your enquiry and will be in touch shortly." };
  }

  console.error("[leads] lead neither saved nor emailed:", sendResult.error);
  return {
    status: "error",
    message: "Sorry, something went wrong. Please try again or call us directly.",
  };
}
