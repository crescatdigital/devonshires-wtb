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
export type LandingPageContent = (typeof content)["pages"]["landing"];
export type ServicePageContent = (typeof content)["pages"]["servicePages"][ServiceSlug] & {
  banner: HubPageContent["banner"];
};

type ServicePages = (typeof content)["pages"]["servicePages"];
export type ServiceSlug = keyof ServicePages;

export async function getSiteSettings(): Promise<SiteSettings> {
  return content.site;
}

export async function getHubPage(): Promise<HubPageContent> {
  return content.pages.hub;
}

export async function getLandingPage(): Promise<LandingPageContent> {
  return content.pages.landing;
}

/** The shared "Complete estate planning" grid, reused by every service page. */
export async function getServicesGrid(): Promise<HubPageContent["services"]> {
  return content.pages.hub.services;
}

export function getServiceSlugs(): ServiceSlug[] {
  return Object.keys(content.pages.servicePages) as ServiceSlug[];
}

export async function getServicePage(
  slug: ServiceSlug,
): Promise<ServicePageContent | null> {
  const page = content.pages.servicePages[slug];
  if (!page) return null;
  // Merge the shared banner artwork (shield, badge, testimonial, review logos)
  // into each service banner so the content JSON stays free of duplication.
  // Shared assets come first so a page's own banner can override any of them
  // (e.g. a page-specific shield image).
  return {
    ...page,
    banner: { ...content.site.bannerAssets, ...page.banner },
  } as ServicePageContent;
}
