"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { sendLeadNotification, type LeadEmailPayload } from "@/lib/email";

async function requireUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

/** Revalidate the whole public site so edits appear immediately. */
function revalidateSite() {
  revalidatePath("/", "layout");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function saveGlobal(key: string, data: unknown) {
  const supabase = await requireUser();
  const { error } = await supabase.from("globals").update({ data }).eq("key", key);
  if (error) return { ok: false, error: error.message };
  revalidateSite();
  return { ok: true };
}

export async function saveSection(pageKey: string, sectionKey: string, data: unknown) {
  const supabase = await requireUser();
  const { error } = await supabase
    .from("page_sections")
    .update({ data })
    .eq("page_key", pageKey)
    .eq("section_key", sectionKey);
  if (error) return { ok: false, error: error.message };
  revalidateSite();
  return { ok: true };
}

export async function saveSeo(
  refKey: string,
  fields: { meta_title: string; meta_description: string; og_image: string },
) {
  const supabase = await requireUser();
  const { error } = await supabase.from("seo").upsert({ ref_key: refKey, ...fields });
  if (error) return { ok: false, error: error.message };
  revalidateSite();
  return { ok: true };
}

/** Update a lead's status (new / read / archived). */
export async function updateLeadStatus(id: string, status: "new" | "read" | "archived") {
  const supabase = await requireUser();
  const { error } = await supabase.from("leads").update({ status }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);
  return { ok: true };
}

/** Re-attempt the notification email for a saved lead and record the outcome. */
export async function resendLeadEmail(id: string) {
  const supabase = await requireUser();
  const { data, error } = await supabase
    .from("leads")
    .select("source,name,email,phone,message,data")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return { ok: false, error: error?.message ?? "Lead not found" };

  const payload: LeadEmailPayload = {
    source: data.source,
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
    data: (data.data as Record<string, string>) ?? {},
  };
  const result = await sendLeadNotification(payload);

  await supabase
    .from("leads")
    .update({
      email_sent: result.ok,
      email_error: result.ok ? null : result.error ?? "unknown error",
      emailed_at: result.ok ? new Date().toISOString() : null,
    })
    .eq("id", id);

  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);
  return result.ok ? { ok: true } : { ok: false, error: result.error };
}
