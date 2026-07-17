import content from "@/content/site-content.json";
import { supabaseRead } from "@/lib/supabase/read";

/**
 * CMS access layer.
 *
 * Global settings + the homepage now come from Supabase (see scripts/migrate.cjs
 * and scripts/seed.cjs). Every read falls back to the bundled static JSON if the
 * database is unreachable or a row is missing, so the site never breaks.
 *
 * Service pages and the landing page still read from the static JSON — they will
 * move to Supabase in a later phase. Page components only import from this module.
 */

export type SiteSettings = (typeof content)["site"];
export type HubPageContent = (typeof content)["pages"]["hub"];
export type LandingPageContent = (typeof content)["pages"]["landing"];
export type ServicePageContent = (typeof content)["pages"]["servicePages"][ServiceSlug] & {
  banner: HubPageContent["banner"];
};

type ServicePages = (typeof content)["pages"]["servicePages"];
export type ServiceSlug = keyof ServicePages;

/** Fetch every global row keyed by `key`, or null on any failure. */
async function fetchGlobals(): Promise<Record<string, unknown> | null> {
  try {
    if (!supabaseRead) return null;
    const { data, error } = await supabaseRead.from("globals").select("key,data");
    if (error || !data) return null;
    return Object.fromEntries(data.map((r) => [r.key, r.data]));
  } catch {
    return null;
  }
}

/** Fetch a page's sections keyed by `section_key`, or null on any failure. */
async function fetchSections(pageKey: string): Promise<Record<string, unknown> | null> {
  try {
    if (!supabaseRead) return null;
    const { data, error } = await supabaseRead
      .from("page_sections")
      .select("section_key,data")
      .eq("page_key", pageKey);
    if (error || !data) return null;
    return Object.fromEntries(data.map((r) => [r.section_key, r.data]));
  } catch {
    return null;
  }
}

/** Fetch a single global's `data`, or null on any failure. */
async function fetchGlobal(key: string): Promise<unknown | null> {
  try {
    if (!supabaseRead) return null;
    const { data, error } = await supabaseRead
      .from("globals")
      .select("data")
      .eq("key", key)
      .maybeSingle();
    if (error || !data) return null;
    return data.data;
  } catch {
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const g = await fetchGlobals();
  const need = ["site_general", "header", "footer", "socials", "banner_assets", "mega_menu"];
  if (g && need.every((k) => g[k])) {
    const general = g.site_general as SiteSettings;
    return {
      name: general.name,
      logo: general.logo,
      phone: general.phone,
      email: general.email,
      header: g.header,
      socials: (g.socials as { items: unknown }).items,
      footer: g.footer,
      bannerAssets: g.banner_assets,
      megaMenu: g.mega_menu,
    } as SiteSettings;
  }
  return content.site;
}

export async function getHubPage(): Promise<HubPageContent> {
  const s = await fetchSections("home");
  const need = ["banner", "practiceAreas", "whyItMatters", "whyUs", "faq", "services"];
  if (s && need.every((k) => s[k])) {
    return {
      banner: s.banner,
      practiceAreas: s.practiceAreas,
      whyItMatters: s.whyItMatters,
      whyUs: s.whyUs,
      faq: s.faq,
      services: s.services,
    } as HubPageContent;
  }
  return content.pages.hub;
}

/** The shared "Complete estate planning" grid — the homepage's services section. */
export async function getServicesGrid(): Promise<HubPageContent["services"]> {
  const s = await fetchSections("home");
  if (s && s.services) return s.services as HubPageContent["services"];
  return content.pages.hub.services;
}

export function getServiceSlugs(): ServiceSlug[] {
  return Object.keys(content.pages.servicePages) as ServiceSlug[];
}

export type PageSeo = { metaTitle: string; metaDescription: string; ogImage: string };

/** Editable per-page SEO. Returns null if unset (caller falls back to defaults). */
export async function getPageSeo(refKey: string): Promise<PageSeo | null> {
  try {
    if (!supabaseRead) return null;
    const { data } = await supabaseRead
      .from("seo")
      .select("meta_title,meta_description,og_image")
      .eq("ref_key", refKey)
      .maybeSingle();
    if (!data || !data.meta_title) return null;
    return {
      metaTitle: data.meta_title,
      metaDescription: data.meta_description ?? "",
      ogImage: data.og_image ?? "",
    };
  } catch {
    return null;
  }
}

export async function getLandingPage(): Promise<LandingPageContent> {
  const s = await fetchSections("free-case-assessment");
  const need = ["banner", "trustBadges", "helpWhen", "howItWorks", "whatYouGet", "split", "faq"];
  if (s && need.every((k) => s[k])) {
    return {
      slug: "free-case-assessment",
      banner: s.banner,
      trustBadges: s.trustBadges,
      helpWhen: s.helpWhen,
      howItWorks: s.howItWorks,
      whatYouGet: s.whatYouGet,
      split: s.split,
      faq: s.faq,
    } as LandingPageContent;
  }
  return content.pages.landing;
}

export async function getServicePage(
  slug: ServiceSlug,
): Promise<ServicePageContent | null> {
  // Shared banner artwork (shield, badge, testimonial, review logos) is merged
  // into each service banner so page content stays free of duplication.
  const s = await fetchSections(slug);
  const need = ["banner", "overview", "reasons", "whyUs", "journey", "faq", "services"];
  if (s && need.every((k) => s[k])) {
    const bannerAssets = (await fetchGlobal("banner_assets")) ?? content.site.bannerAssets;
    return {
      slug,
      overview: s.overview,
      reasons: s.reasons,
      whyUs: s.whyUs,
      journey: s.journey,
      faq: s.faq,
      services: s.services,
      banner: { ...(bannerAssets as object), ...(s.banner as object) },
    } as ServicePageContent;
  }
  const page = content.pages.servicePages[slug];
  if (!page) return null;
  return {
    ...page,
    banner: { ...content.site.bannerAssets, ...page.banner },
  } as ServicePageContent;
}
