import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/** Data-access helpers for the admin app (authenticated, always fresh). */

export type GlobalRow = { key: string; label: string; position: number; data: Record<string, unknown> };
export type SectionRow = { section_key: string; label: string; position: number; data: Record<string, unknown> };
export type PageRow = { key: string; title: string; slug: string; nav_order: number };
export type SeoRow = { ref_key: string; meta_title: string; meta_description: string; og_image: string };

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
