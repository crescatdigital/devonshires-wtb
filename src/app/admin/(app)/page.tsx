import Link from "next/link";
import { getGlobalsList, getNewLeadCount, getPagesList } from "@/lib/cms-admin";

export default async function DashboardPage() {
  const [globals, pages, newLeads] = await Promise.all([
    getGlobalsList(),
    getPagesList(),
    getNewLeadCount(),
  ]);

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="mt-1.5 text-base text-slate-500">
          Manage the content of the Wills, Trusts &amp; Probate website.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">Enquiries</h2>
        <Link
          href="/admin/leads"
          className="group flex items-center justify-between rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:ring-slate-900"
        >
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Leads</h3>
            <p className="mt-1.5 text-base leading-relaxed text-slate-500">
              Enquiries submitted through the website contact forms.
            </p>
          </div>
          {newLeads > 0 ? (
            <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
              {newLeads} new
            </span>
          ) : (
            <span className="shrink-0 text-sm font-medium text-slate-400">View all</span>
          )}
        </Link>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">Global</h2>
        <Link
          href="/admin/globals"
          className="group flex items-center justify-between rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:ring-slate-900"
        >
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Global Settings</h3>
            <p className="mt-1.5 text-base leading-relaxed text-slate-500">
              Header, footer, contact details, social links and shared sections on every page.
            </p>
          </div>
          <span className="shrink-0 text-sm font-medium text-slate-400">{globals.length} groups</span>
        </Link>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">Pages</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {pages.map((p) => (
            <Link
              key={p.key}
              href={`/admin/pages/${p.key}`}
              className="group rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:ring-slate-900"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-900">{p.title}</h3>
                <span className="text-sm font-medium text-slate-400">/{p.slug || ""}</span>
              </div>
              <span className="mt-4 inline-block text-base font-semibold text-slate-900 group-hover:underline">
                Edit sections →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-8">
        <a href="/" target="_blank" rel="noopener noreferrer" className="text-base font-medium text-slate-500 hover:text-slate-900">
          View live site ↗
        </a>
      </div>
    </div>
  );
}
