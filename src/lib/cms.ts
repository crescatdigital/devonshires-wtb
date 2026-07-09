import content from "@/content/site-content.json";

/**
 * CMS access layer.
 *
 * Currently backed by a static JSON file (src/content/site-content.json).
 * When the Supabase CMS is ready, replace the implementations below with
 * Supabase queries — page components only ever import from this module,
 * so nothing else needs to change.
 */

export type NavItem = {
  label: string;
  href: string;
};

export type SiteSettings = {
  name: string;
  tagline: string;
  navigation: NavItem[];
  footer: {
    copyright: string;
    links: NavItem[];
  };
};

export type HomePageContent = (typeof content)["pages"]["home"];

export async function getSiteSettings(): Promise<SiteSettings> {
  return content.site;
}

export async function getHomePage(): Promise<HomePageContent> {
  return content.pages.home;
}
