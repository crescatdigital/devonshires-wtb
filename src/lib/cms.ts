import content from "@/content/site-content.json";

/**
 * CMS access layer.
 *
 * Currently backed by a static JSON file (src/content/site-content.json).
 * When the Supabase CMS is ready, replace the implementations below with
 * Supabase queries — page components only ever import from this module,
 * so nothing else needs to change.
 */

export type SiteSettings = (typeof content)["site"];
export type HubPageContent = (typeof content)["pages"]["hub"];

export async function getSiteSettings(): Promise<SiteSettings> {
  return content.site;
}

export async function getHubPage(): Promise<HubPageContent> {
  return content.pages.hub;
}
