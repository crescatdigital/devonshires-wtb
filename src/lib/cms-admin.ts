import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/** Data-access helpers for the admin app (authenticated, always fresh). */

export type GlobalRow = { key: string; label: string; position: number; data: Record<string, unknown> };
export type SectionRow = { section_key: string; label: string; position: number; data: Record<string, unknown> };
export type PageRow = { key: string; title: string; slug: string; nav_order: number };
export type SeoRow = { ref_key: string; meta_title: string; meta_description: string; og_image: string };
export type LeadRow = {
  id: string;
  created_at: string;
  source: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  data: Record<string, string>;
  email_sent: boolean;
  email_error: string | null;
  emailed_at: string | null;
  status: string;
};

const LEAD_COLUMNS =
  "id,created_at,source,name,email,phone,message,data,email_sent,email_error,emailed_at,status";

export async function getGlobalsList(): Promise<GlobalRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("globals").select("key,label,position,data").order("position");
  return (data as GlobalRow[]) ?? [];
}

export async function getGlobal(key: string): Promise<GlobalRow | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("globals").select("key,label,position,data").eq("key", key).maybeSingle();
  return (data as GlobalRow) ?? null;
}

export async function getPagesList(): Promise<PageRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("pages").select("key,title,slug,nav_order").order("nav_order");
  return (data as PageRow[]) ?? [];
}

export async function getPageSections(pageKey: string): Promise<SectionRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("page_sections")
    .select("section_key,label,position,data")
    .eq("page_key", pageKey)
    .order("position");
  return (data as SectionRow[]) ?? [];
}

export async function getSection(pageKey: string, sectionKey: string): Promise<SectionRow | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("page_sections")
    .select("section_key,label,position,data")
    .eq("page_key", pageKey)
    .eq("section_key", sectionKey)
    .maybeSingle();
  return (data as SectionRow) ?? null;
}

export async function getSeo(refKey: string): Promise<SeoRow | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("seo")
    .select("ref_key,meta_title,meta_description,og_image")
    .eq("ref_key", refKey)
    .maybeSingle();
  return (data as SeoRow) ?? null;
}

export async function getLeads(): Promise<LeadRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("leads")
    .select(LEAD_COLUMNS)
    .order("created_at", { ascending: false });
  return (data as LeadRow[]) ?? [];
}

export async function getLead(id: string): Promise<LeadRow | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("leads").select(LEAD_COLUMNS).eq("id", id).maybeSingle();
  return (data as LeadRow) ?? null;
}

/** Count of leads that haven't been opened yet — for the dashboard/nav badge. */
export async function getNewLeadCount(): Promise<number> {
  const supabase = await createSupabaseServerClient();
  const { count } = await supabase
    .from("leads")
    .select("id", { count: "exact", head: true })
    .eq("status", "new");
  return count ?? 0;
}
