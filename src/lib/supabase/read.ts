import { createClient } from "@supabase/supabase-js";

/**
 * Server-side, read-only Supabase client for the public site.
 * Uses the anon key; RLS grants public SELECT on content tables.
 * Safe to reuse across requests (no user session).
 */
export const supabaseRead = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } },
);
