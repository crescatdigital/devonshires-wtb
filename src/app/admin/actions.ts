"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

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
