import { createClient } from "@supabase/supabase-js";

/**
 * Server-side, read-only Supabase client for the public site.
 * Uses the anon key; RLS grants public SELECT on content tables.
 *
 * Resolves to `null` when the Supabase env vars are absent (e.g. a deploy that
 * hasn't been configured yet) — callers fall back to the bundled static JSON,
 * so the build and the site never break.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseRead =
  url && anonKey
    ? createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } })
    : null;
