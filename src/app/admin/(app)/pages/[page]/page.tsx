import Link from "next/link";
import { getPagesList, getPageSections } from "@/lib/cms-admin";

export default async function PageSectionsPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const [pages, sections] = await Promise.all([getPagesList(), getPageSections(page)]);
  const meta = pages.find((p) => p.key === page);
  const title = meta?.title ?? page;

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin" className="mb-4 inline-block text-base text-slate-500 hover:text-slate-900">
        ← Dashboard
      </Link>
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-1.5 text-base text-slate-500">
          Choose a section to edit. Each section maps to a block on the page.
        </p>
      </header>

      {sections.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center ring-1 ring-slate-200">
          <p className="text-base text-slate-500">This page isn&apos;t managed in the CMS yet.</p>
        </div>
      ) : (
        <ul className="divide-y divide-slate-200 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
          {sections.map((s) => (
            <li key={s.section_key}>
              <Link
                href={`/admin/pages/${page}/${s.section_key}`}
                className="flex items-center justify-between px-5 py-4 transition hover:bg-slate-50"
              >
                <span className="text-lg font-medium text-slate-800">{s.label || s.section_key}</span>
                <span className="text-lg text-slate-400">→</span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={`/admin/pages/${page}/seo`}
              className="flex items-center justify-between px-5 py-4 transition hover:bg-slate-50"
            >
              <span className="text-lg font-medium text-slate-800">SEO / Meta</span>
              <span className="text-lg text-slate-400">→</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
