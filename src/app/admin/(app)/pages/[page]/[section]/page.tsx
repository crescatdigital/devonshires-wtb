import Link from "next/link";
import { notFound } from "next/navigation";
import { getSection } from "@/lib/cms-admin";
import Editor from "../../../Editor";

export default async function SectionEditPage({
  params,
}: {
  params: Promise<{ page: string; section: string }>;
}) {
  const { page, section } = await params;
  const row = await getSection(page, section);
  if (!row) notFound();

  return (
    <div>
      <Link href={`/admin/pages/${page}`} className="mb-4 inline-block text-base text-slate-500 hover:text-slate-900">
        ← Back to sections
      </Link>
      <Editor
        title={row.label || row.section_key}
        description="Edit the fields below, then save. Changes go live immediately."
        initialData={row.data}
        target={{ type: "section", pageKey: page, sectionKey: section }}
      />
    </div>
  );
}
