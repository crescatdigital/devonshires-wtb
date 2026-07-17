// Seeds Supabase from the existing static content JSON.
// Global settings + all pages (homepage, service pages, landing).
// Idempotent — safe to re-run (upserts). Run: node scripts/seed.cjs
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });
const { makeClient } = require("./lib/db.cjs");
const { createClient } = require("@supabase/supabase-js");

const content = require("../src/content/site-content.json");
const site = content.site;
const hub = content.pages.hub;
const sp = content.pages.servicePages;
const landing = content.pages.landing;

const ADMIN_EMAIL = "development@crescatdigital.com";
const ADMIN_PASSWORD = "DWtb@24454";

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

// Build the section list for a service page from its JSON object.
function serviceSections(page) {
  return [
    ["banner", "Hero banner", page.banner],
    ["overview", "Overview", page.overview],
    ["reasons", "Why it matters", page.reasons],
    ["whyUs", "Why Devonshires", page.whyUs],
    ["journey", "The journey", page.journey],
    ["faq", "FAQs", page.faq],
    ["services", "Services grid", page.services],
  ];
}

// key, title, slug, nav_order, sections[], seo{}
const PAGES = [
  {
    key: "home", title: "Homepage", slug: "", nav: 0,
    sections: [
      ["banner", "Hero banner", hub.banner],
      ["practiceAreas", "Practice areas", hub.practiceAreas],
      ["whyItMatters", "Why it matters", hub.whyItMatters],
      ["whyUs", "Why Devonshires", hub.whyUs],
      ["faq", "FAQs", hub.faq],
      ["services", "Services grid", hub.services],
    ],
    seo: {
      meta_title: "Wills, Trusts & Probate | Devonshires Claims",
      meta_description:
        "Plan your legacy with confidence & care. Devonshires Claims is dedicated to protect what matters most to you and your family, with measured advice, fixed fees and a steady hand through life's most personal decisions.",
    },
  },
  {
    key: "wills", title: "Wills", slug: "wills", nav: 1,
    sections: serviceSections(sp.wills),
    seo: { meta_title: `${cap(sp.wills.overview.headingAccent)} | Devonshires Claims`, meta_description: sp.wills.banner.paragraph },
  },
  {
    key: "trusts", title: "Trusts", slug: "trusts", nav: 2,
    sections: serviceSections(sp.trusts),
    seo: { meta_title: `${cap(sp.trusts.overview.headingAccent)} | Devonshires Claims`, meta_description: sp.trusts.banner.paragraph },
  },
  {
    key: "probate", title: "Probate", slug: "probate", nav: 3,
    sections: serviceSections(sp.probate),
    seo: { meta_title: `${cap(sp.probate.overview.headingAccent)} | Devonshires Claims`, meta_description: sp.probate.banner.paragraph },
  },
  {
    key: "power-of-attorney", title: "Power of Attorney", slug: "power-of-attorney", nav: 4,
    sections: serviceSections(sp["power-of-attorney"]),
    seo: {
      meta_title: `${cap(sp["power-of-attorney"].overview.headingAccent)} | Devonshires Claims`,
      meta_description: sp["power-of-attorney"].banner.paragraph,
    },
  },
  {
    key: "free-case-assessment", title: "Free Case Assessment", slug: "free-case-assessment", nav: 5,
    sections: [
      ["banner", "Hero + form", landing.banner],
      ["trustBadges", "Trust badges", landing.trustBadges],
      ["helpWhen", "We help when…", landing.helpWhen],
      ["howItWorks", "How it works", landing.howItWorks],
      ["whatYouGet", "What you get", landing.whatYouGet],
      ["split", "Upfront costs", landing.split],
      ["faq", "Common questions", landing.faq],
    ],
    seo: {
      meta_title: "Free Case Assessment | Wills, Trusts & Probate | Devonshires Claims",
      meta_description:
        "Specialist Wills, Trusts & Probate solicitors. Request a free, no-obligation case assessment — we review your situation, explain your options and outline costs before you decide.",
    },
  },
];

async function seedData(client) {
  const upsertGlobal = (key, label, position, data) =>
    client.query(
      `insert into public.globals (key, label, position, data)
       values ($1,$2,$3,$4::jsonb)
       on conflict (key) do update set label=excluded.label, position=excluded.position, data=excluded.data`,
      [key, label, position, JSON.stringify(data)]
    );

  // ---- Globals (global settings + global sections) ----
  await upsertGlobal("site_general", "General (name, logo, contact)", 0, {
    name: site.name, logo: site.logo, phone: site.phone, email: site.email,
  });
  await upsertGlobal("header", "Header", 1, site.header);
  await upsertGlobal("footer", "Footer", 2, site.footer);
  await upsertGlobal("socials", "Social links", 3, { items: site.socials });
  await upsertGlobal("banner_assets", "Banner assets", 4, site.bannerAssets);
  await upsertGlobal("mega_menu", "Mega menu", 5, site.megaMenu);

  // ---- Pages, sections, SEO ----
  for (const page of PAGES) {
    await client.query(
      `insert into public.pages (key, title, slug, nav_order) values ($1,$2,$3,$4)
       on conflict (key) do update set title=excluded.title, slug=excluded.slug, nav_order=excluded.nav_order`,
      [page.key, page.title, page.slug, page.nav]
    );
    for (let i = 0; i < page.sections.length; i++) {
      const [sKey, label, data] = page.sections[i];
      await client.query(
        `insert into public.page_sections (page_key, section_key, label, position, data)
         values ($1,$2,$3,$4,$5::jsonb)
         on conflict (page_key, section_key) do update set label=excluded.label, position=excluded.position, data=excluded.data`,
        [page.key, sKey, label, i, JSON.stringify(data)]
      );
    }
    await client.query(
      `insert into public.seo (ref_key, meta_title, meta_description) values ($1,$2,$3)
       on conflict (ref_key) do update set meta_title=excluded.meta_title, meta_description=excluded.meta_description`,
      [page.key, page.seo.meta_title, page.seo.meta_description]
    );
  }

  console.log(`Seeded: 6 globals; ${PAGES.length} pages (${PAGES.reduce((n, p) => n + p.sections.length, 0)} sections) + SEO.`);
}

async function seedSupabase() {
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { error: bucketErr } = await admin.storage.createBucket("media", { public: true, fileSizeLimit: "10MB" });
  if (bucketErr && !/already exists/i.test(bucketErr.message)) throw bucketErr;
  console.log(bucketErr ? "Media bucket already exists." : "Created public 'media' bucket.");

  const { error: userErr } = await admin.auth.admin.createUser({
    email: ADMIN_EMAIL, password: ADMIN_PASSWORD, email_confirm: true,
  });
  if (userErr && !/already been registered|already exists/i.test(userErr.message)) throw userErr;
  console.log(userErr ? `Admin user already exists (${ADMIN_EMAIL}).` : `Created admin user ${ADMIN_EMAIL}.`);
}

(async () => {
  const client = makeClient();
  await client.connect();
  try {
    await seedData(client);
  } finally {
    await client.end();
  }
  await seedSupabase();
  console.log("Seed complete.");
})().catch((e) => {
  console.error("Seed failed:", e.message);
  process.exit(1);
});
