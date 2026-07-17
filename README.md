# DevonshiresWTB

Next.js website built from the Figma designs, with a simple CMS layer.

## Pages

All pages are built from the Figma file `4RQc1E7tLjTOkrGWGw5J4e` and driven by the
static CMS in `src/content/site-content.json` (see below).

- **Hub page** (`/`) — "DC Wills, Trust, Probate Hub Page v3" (node `13-621`).
- **Service pages** — one dynamic route (`src/app/[service]`) renders all four from the
  `pages.servicePages` content:
  - `/wills` — "DC Wills Service Page v3"
  - `/trusts` — "DC Trusts Service Page v3"
  - `/probate` — "DC Probate Service Page v3"
  - `/power-of-attorney` — "DC Power of Attorney Service Page v3"
- **Landing page** (`/free-case-assessment`) — "DC Wills, Trusts & Probate Landing Page".

The header "WHAT WE DO" item opens a **mega-menu** ("DC Wills, Trust, Probate Temporary
Menu") — an Information Hub search, the parent firm's compensation-claims list, and the
four Wills/Trusts/Probate service links. Content lives in `site.megaMenu`
([`MegaMenu.tsx`](src/components/MegaMenu.tsx)); on mobile it collapses into the menu
under "WHAT WE DO". The compensation links point at the live devonshiresclaims.co.uk site.

## Desktop scaling

The Figma source is a 1920px canvas, so component sizes are literal design pixels. A
single rule in `globals.css` scales the whole design to 75% on viewports ≥1024px
(`body { zoom: 0.75 }`) so it reads at a comfortable size at 100% browser zoom; mobile
and tablet keep their own responsive sizes.

## Known placeholders (to swap when CMS/assets are ready)

- Every service-page banner reuses the hub's duotone shield artwork
  (`hero-shield.png`); each page has its own shield photo in Figma that should be
  exported and wired into `site.bannerAssets` / per-page banners.
- The four photos in the "Complete estate planning, under one firm" cards currently reuse
  the duotone shield artwork — the stock photos in the Figma file could not be exported
  (export is disabled on the file and the Figma MCP seat hit its rate limit). Export them
  from Figma (Section 6 - Pre-Footer) and drop them into `public/images/`, then update the
  `services.cards[].image` paths in `src/content/site-content.json`.
- The landing page's trust badges (SRA, The Law Society, Legal500, The Times) render as
  text placeholders — swap for the official logos.
- The landing "split" section and "what you get" image use gradient/shield placeholders in
  place of the Figma lifestyle photography.
- The SRA badge in the footer bottom bar is a styled placeholder — replace with the
  official SRA digital badge embed.
- The reCAPTCHA in the footer form is a visual mock; wire up the real widget together with
  the form backend. The hero/contact forms are visual mocks pending a backend.
- Journey checklists on the Trusts/Probate/LPA pages were placeholders in the comps and are
  filled with sensible domain copy. Only the first FAQ per page has answer copy in the
  design; the rest have empty `answer` fields.

## Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript)
- Tailwind CSS
- CMS: currently a static JSON file, to be replaced with Supabase

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content / CMS

Page content is served from a **Supabase** database and edited through the admin
panel at [`/admin`](http://localhost:3000/admin). All reads go through
[`src/lib/cms.ts`](src/lib/cms.ts), which queries Supabase and falls back to the
bundled [`src/content/site-content.json`](src/content/site-content.json) if the
database is unreachable or the env vars are unset — so the site never breaks.

### Setup

1. Copy `.env.example` to `.env.local` and fill in `NEXT_PUBLIC_SUPABASE_URL` and
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` (add `SUPABASE_SERVICE_ROLE_KEY` +
   `SUPABASE_DB_*` only to run the seed scripts locally).
2. Provision the schema and seed content:
   ```bash
   node scripts/migrate.cjs   # creates tables + RLS (idempotent)
   node scripts/seed.cjs      # loads site-content.json → Supabase, creates the admin user + media bucket
   ```
3. `npm run dev`, then sign in at `/admin`.

### Structure

- `globals` — shared settings/sections (header, footer, socials, banner assets, mega menu).
- `page_sections` — one row per section of each page (`home`, `wills`, `trusts`,
  `probate`, `power-of-attorney`, `free-case-assessment`).
- `seo` — per-page meta title/description.

The static JSON remains only as a fallback. No page or component imports it
directly — everything flows through `cms.ts`.

### Deploying (Vercel)

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the project's
environment variables (Production + Preview). Do **not** add the service-role or
`SUPABASE_DB_*` values — they're only used by the local seed scripts.
