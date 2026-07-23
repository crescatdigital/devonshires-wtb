import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client for trusted server-side writes (e.g. inserting
 * public form submissions into `leads`). The service-role key BYPASSES RLS, so
 * this must never be imported into client code — the "server-only" guard above
 * makes such an import a build error.
 *
 * Resolves to `null` when the key is absent so callers can degrade gracefully.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin =
  url && serviceKey
    ? createClient(url, serviceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;
