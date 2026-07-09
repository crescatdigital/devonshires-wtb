# Devonshires WTB

Next.js website built from the Figma designs, with a simple CMS layer.

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
