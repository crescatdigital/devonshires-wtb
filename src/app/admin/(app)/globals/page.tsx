import Link from "next/link";
import { getGlobalsList } from "@/lib/cms-admin";

export default async function GlobalsPage() {
  const globals = await getGlobalsList();

  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Global Settings</h1>
        <p className="mt-1.5 text-base text-slate-500">
          Shared content that appears on every page. Pick a group to edit.
        </p>
      </header>

      <ul className="divide-y divide-slate-200 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
        {globals.map((g) => (
          <li key={g.key}>
            <Link
              href={`/admin/globals/${g.key}`}
              className="flex items-center justify-between px-5 py-4 transition hover:bg-slate-50"
            >
              <span className="text-lg font-medium text-slate-800">{g.label}</span>
              <span className="text-lg text-slate-400">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
