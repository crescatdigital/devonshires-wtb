// Shared Postgres connection for one-off migration/seed scripts.
// Reads server-only DB creds from .env.local. Never imported by the Next app.
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env.local") });
const { Client } = require("pg");

function makeClient() {
  const {
    SUPABASE_DB_HOST,
    SUPABASE_DB_PORT,
    SUPABASE_DB_USER,
    SUPABASE_DB_PASSWORD,
    SUPABASE_DB_NAME,
  } = process.env;
  if (!SUPABASE_DB_HOST || !SUPABASE_DB_PASSWORD) {
    throw new Error("Missing SUPABASE_DB_* vars in .env.local");
  }
  return new Client({
    host: SUPABASE_DB_HOST,
    port: Number(SUPABASE_DB_PORT || 5432),
    user: SUPABASE_DB_USER,
    password: SUPABASE_DB_PASSWORD,
    database: SUPABASE_DB_NAME || "postgres",
    ssl: { rejectUnauthorized: false },
  });
}

module.exports = { makeClient };
