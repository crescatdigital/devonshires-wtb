import Link from "next/link";
import { getLeads, type LeadRow } from "@/lib/cms-admin";

export const metadata = { title: "Leads · Devonshires CMS" };

const SOURCE_LABELS: Record<string, string> = {
  footer: "Footer",
  landing: "Landing",
  faq: "FAQ",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: "bg-emerald-100 text-emerald-800",
    read: "bg-slate-100 text-slate-600",
    archived: "bg-amber-100 text-amber-800",
  };
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${styles[status] ?? styles.read}`}>
      {status}
    </span>
  );
}

function EmailBadge({ lead }: { lead: LeadRow }) {
  if (lead.email_sent) {
    return <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">Sent</span>;
  }
  return (
    <span
      className="inline-block rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700"
      title={lead.email_error ?? "Not sent"}
    >
      Not sent
    </span>
  );
}

export default async function LeadsPage() {
  const leads = await getLeads();
  const newCount = leads.filter((l) => l.status === "new").length;

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Leads</h1>
        <p className="mt-1.5 text-base text-slate-500">
          Enquiries submitted through the website forms. {leads.length} total
          {newCount > 0 && <span className="font-semibold text-emerald-700"> · {newCount} new</span>}.
        </p>
      </header>

      {leads.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center ring-1 ring-slate-200">
          <p className="text-base text-slate-500">No enquiries yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-[16px]">
              <thead className="border-b border-slate-200 bg-slate-50 text-[14px] uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Received</th>
                  <th className="px-5 py-3 font-semibold">Source</th>
                  <th className="px-5 py-3 font-semibold">Name</th>
                  <th className="px-5 py-3 font-semibold">Email</th>
                  <th className="px-5 py-3 font-semibold">Phone</th>
                  <th className="px-5 py-3 font-semibold">Email</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="group transition hover:bg-slate-50">
                    <td className="whitespace-nowrap px-5 py-3.5 text-slate-500">
                      <Link href={`/admin/leads/${lead.id}`} className="block">
                        {formatDate(lead.created_at)}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5">
                      <Link href={`/admin/leads/${lead.id}`} className="block text-slate-600">
                        {SOURCE_LABELS[lead.source] ?? lead.source}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className={`block ${lead.status === "new" ? "font-semibold text-slate-900" : "text-slate-700"} group-hover:underline`}
                      >
                        {lead.name || "—"}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      <Link href={`/admin/leads/${lead.id}`} className="block">{lead.email || "—"}</Link>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-slate-600">
                      <Link href={`/admin/leads/${lead.id}`} className="block">{lead.phone || "—"}</Link>
                    </td>
                    <td className="px-5 py-3.5"><EmailBadge lead={lead} /></td>
                    <td className="px-5 py-3.5"><StatusBadge status={lead.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
