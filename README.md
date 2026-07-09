# DevonshiresWTB

Next.js website built from the Figma designs, with a simple CMS layer.

## Pages

- **Hub page** (`/`) — replica of the Figma frame "DC Wills, Trust, Probate Hub Page v3"
  (file `4RQc1E7tLjTOkrGWGw5J4e`, node `13-621`).

## Known placeholders (to swap when CMS/assets are ready)

- The four photos in the "Complete estate planning, under one firm" cards currently reuse
  the duotone shield artwork — the stock photos in the Figma file could not be exported
  (export is disabled on the file and the Figma MCP seat hit its rate limit). Export them
  from Figma (Section 6 - Pre-Footer) and drop them into `public/images/`, then update the
  `services.cards[].image` paths in `src/content/site-content.json`.
- The SRA badge in the footer bottom bar is a styled placeholder — replace with the
  official SRA digital badge embed.
- The reCAPTCHA in the footer form is a visual mock; wire up the real widget together with
  the form backend.
- Only the first FAQ has answer copy in the design; the rest have empty `answer` fields in
  the content JSON.

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

All page content lives in [`src/content/site-content.json`](src/content/site-content.json)
and is accessed exclusively through [`src/lib/cms.ts`](src/lib/cms.ts).

When the Supabase CMS is ready:

1. Copy `.env.example` to `.env.local` and fill in the Supabase URL and anon key.
2. Replace the function bodies in `src/lib/cms.ts` with Supabase queries.

No page or component imports the JSON file directly, so the swap is contained
to that one module.
