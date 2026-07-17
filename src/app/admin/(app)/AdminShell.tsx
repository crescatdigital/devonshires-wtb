"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "../actions";

type NavItem = { href: string; label: string; soon?: boolean };
type NavGroup = { title: string | null; items: NavItem[] };

const NAV: NavGroup[] = [
  { title: null, items: [{ href: "/admin", label: "Dashboard" }] },
  { title: "Global", items: [{ href: "/admin/globals", label: "Global Settings" }] },
  {
    title: "Pages",
    items: [
      { href: "/admin/pages/home", label: "Homepage" },
      { href: "/admin/pages/wills", label: "Wills" },
      { href: "/admin/pages/trusts", label: "Trusts" },
      { href: "/admin/pages/probate", label: "Probate" },
      { href: "/admin/pages/power-of-attorney", label: "Power of Attorney" },
      { href: "/admin/pages/free-case-assessment", label: "Free Case Assessment" },
    ],
  },
];

export default function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-6 md:flex">
          <div className="px-2">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Devonshires
            </p>
            <p className="text-xl font-bold text-slate-900">Content CMS</p>
          </div>
          <nav className="mt-8 flex-1 space-y-7">
            {NAV.map((group) => (
              <div key={group.title ?? "top"}>
                {group.title && (
                  <p className="mb-2 px-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
                    {group.title}
                  </p>
                )}
                <ul className="space-y-1">
                  {group.items.map((item) =>
                    item.soon ? (
                      <li
                        key={item.href}
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-base text-slate-400"
                      >
                        {item.label}
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium uppercase">
                          soon
                        </span>
                      </li>
                    ) : (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`block rounded-lg px-3 py-2.5 text-base font-medium transition ${
                            isActive(item.href)
                              ? "bg-slate-900 text-white"
                              : "text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </nav>
          <div className="border-t border-slate-200 pt-4">
            <p className="truncate px-2 text-sm text-slate-500">{email}</p>
            <form action={signOut} className="mt-2">
              <button className="w-full rounded-lg px-3 py-2.5 text-left text-base font-medium text-slate-700 transition hover:bg-slate-100">
                Sign out
              </button>
            </form>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 px-5 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
