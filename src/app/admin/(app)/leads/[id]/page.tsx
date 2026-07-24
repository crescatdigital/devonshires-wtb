import Link from "next/link";
import { notFound } from "next/navigation";
import { getLead } from "@/lib/cms-admin";
import LeadActions from "./LeadActions";

export const metadata = { title: "Lead · Devonshires CMS" };

const SOURCE_LABELS: Record<string, string> = {
  footer: "Footer — Free Case Evaluation",
  landing: "Landing page — Free Case Assessment",
  faq: "FAQ — Contact form",
};

const FIELD_LABELS: Record<string, string> = {
  firstName: "First name",
  lastName: "Last name",
  name: "Name",
  email: "Email",
  phone: "Phone",
  contactNumber: "Contact number",
  bestTime: "Best time to contact",
  helpWith: "Help needed with",
  situation: "Situation",
  message: "Message",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await getLead(id);
  if (!lead) notFound();

  // Name / Phone / Email are shown first from the normalized columns; skip the
  // raw fields they're derived from so nothing is displayed twice. Everything
  // else (help needed with, situation, best time, message, …) follows after.
  const REPRESENTED = new Set(["name", "firstName", "lastName", "phone", "contactNumber", "email"]);
  const otherEntries = Object.entries(lead.data ?? {}).filter(([key]) => !REPRESENTED.has(key));

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/leads" className="mb-4 inline-block text-base text-slate-500 hover:text-slate-900">
        ← All leads
      </Link>

      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{lead.name || "Enquiry"}</h1>
          <p className="mt-1.5 text-base text-slate-500">
            {SOURCE_LABELS[lead.source] ?? lead.source} · {formatDate(lead.created_at)}
          </p>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-[1fr_260px]">
        {/* Submission detail */}
        <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">Submission</h2>
          <dl className="space-y-3.5">
            {lead.name && (
              <div className="flex flex-col gap-0.5">
                <dt className="text-sm font-semibold uppercase tracking-wider text-slate-400">Name</dt>
                <dd className="text-base text-slate-900">{lead.name}</dd>
              </div>
            )}
            {lead.phone && (
              <div className="flex flex-col gap-0.5">
                <dt className="text-sm font-semibold uppercase tracking-wider text-slate-400">Phone</dt>
                <dd className="text-base text-slate-900">
                  <a href={`tel:${lead.phone.replace(/\s/g, "")}`} className="text-slate-900 underline decoration-slate-300 hover:decoration-slate-900">
                    {lead.phone}
                  </a>
                </dd>
              </div>
            )}
            {lead.email && (
              <div className="flex flex-col gap-0.5">
                <dt className="text-sm font-semibold uppercase tracking-wider text-slate-400">Email</dt>
                <dd className="text-base text-slate-900">
                  <a href={`mailto:${lead.email}`} className="text-slate-900 underline decoration-slate-300 hover:decoration-slate-900">
                    {lead.email}
                  </a>
                </dd>
              </div>
            )}

            {/* Remaining submitted fields (help needed with, situation, etc.) */}
            {otherEntries.map(([key, value]) => (
              <div key={key} className="flex flex-col gap-0.5">
                <dt className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  {FIELD_LABELS[key] ?? key}
                </dt>
                <dd className="whitespace-pre-wrap text-base text-slate-900">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Sidebar: status + email + actions */}
        <aside className="space-y-6">
          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">Email delivery</h2>
            {lead.email_sent ? (
              <div>
                <p className="text-sm font-semibold text-emerald-700">Sent successfully</p>
                {lead.emailed_at && (
                  <p className="mt-1 text-sm text-slate-500">{formatDate(lead.emailed_at)}</p>
                )}
              </div>
            ) : (
              <div>
                <p className="text-sm font-semibold text-red-700">Not sent</p>
                {lead.email_error && (
                  <p className="mt-1 break-words text-sm text-slate-500">{lead.email_error}</p>
                )}
                <p className="mt-2 text-sm text-slate-500">The lead is still saved here — retry below.</p>
              </div>
            )}
          </section>

          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <LeadActions id={lead.id} status={lead.status} emailSent={lead.email_sent} />
          </section>
        </aside>
      </div>
    </div>
  );
}
