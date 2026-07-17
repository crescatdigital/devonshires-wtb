// Creates the CMS schema in Supabase Postgres. Idempotent — safe to re-run.
// Run: node scripts/migrate.cjs
const { makeClient } = require("./lib/db.cjs");

const SQL = `
create extension if not exists pgcrypto;

-- ============================ tables ============================

-- Editable pages (homepage, service pages, landing).
create table if not exists public.pages (
  key        text primary key,
  title      text not null,
  slug       text not null default '',
  nav_order  int  not null default 0,
  updated_at timestamptz not null default now()
);

-- One row per section of a page. 'data' holds that section's fields (structured).
create table if not exists public.page_sections (
  id          uuid primary key default gen_random_uuid(),
  page_key    text not null references public.pages(key) on delete cascade,
  section_key text not null,
  label       text not null default '',
  position    int  not null default 0,
  data        jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now(),
  unique (page_key, section_key)
);
create index if not exists page_sections_page_idx on public.page_sections(page_key, position);

-- Global settings + global sections shared across every page (header, footer, etc.).
create table if not exists public.globals (
  key        text primary key,
  label      text not null default '',
  position   int  not null default 0,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Per-page SEO.
create table if not exists public.seo (
  ref_key          text primary key,           -- page key, e.g. 'home'
  meta_title       text not null default '',
  meta_description text not null default '',
  og_image         text not null default '',
  updated_at       timestamptz not null default now()
);

-- ======================= updated_at trigger =======================
create or replace function public.set_updated_at() returns trigger
language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

do $$
declare t text;
begin
  foreach t in array array['pages','page_sections','globals','seo'] loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format('create trigger set_updated_at before update on public.%I
                    for each row execute function public.set_updated_at()', t);
  end loop;
end $$;

-- ============================== RLS ==============================
alter table public.pages         enable row level security;
alter table public.page_sections enable row level security;
alter table public.globals       enable row level security;
alter table public.seo           enable row level security;

do $$
declare t text;
begin
  foreach t in array array['pages','page_sections','globals','seo'] loop
    execute format('drop policy if exists "public read" on public.%I', t);
    execute format('drop policy if exists "authenticated write" on public.%I', t);
    -- Public site reads content (anon + authenticated).
    execute format('create policy "public read" on public.%I for select to anon, authenticated using (true)', t);
    -- Only signed-in admins can write.
    execute format('create policy "authenticated write" on public.%I for all to authenticated using (true) with check (true)', t);
  end loop;
end $$;

-- ===================== storage (media bucket) =====================
-- Public read; authenticated (admin) upload/update/delete.
do $$
begin
  drop policy if exists "media public read" on storage.objects;
  drop policy if exists "media auth write" on storage.objects;
  create policy "media public read" on storage.objects
    for select to anon, authenticated using (bucket_id = 'media');
  create policy "media auth write" on storage.objects
    for all to authenticated using (bucket_id = 'media') with check (bucket_id = 'media');
exception when insufficient_privilege then
  raise notice 'skipped storage policies (insufficient privilege) — set them in the dashboard';
end $$;
`;

(async () => {
  const client = makeClient();
  await client.connect();
  try {
    await client.query(SQL);
    const { rows } = await client.query(
      "select table_name from information_schema.tables where table_schema='public' and table_name in ('pages','page_sections','globals','seo') order by table_name"
    );
    console.log("Migration OK. Tables:", rows.map((r) => r.table_name).join(", "));
  } finally {
    await client.end();
  }
})().catch((e) => {
  console.error("Migration failed:", e.message);
  process.exit(1);
});
