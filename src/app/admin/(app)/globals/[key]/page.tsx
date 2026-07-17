import Link from "next/link";
import { notFound } from "next/navigation";
import { getGlobal } from "@/lib/cms-admin";
import Editor from "../../Editor";

export default async function GlobalEditPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const global = await getGlobal(key);
  if (!global) notFound();

  return (
    <div>
      <Link href="/admin/globals" className="mb-4 inline-block text-base text-slate-500 hover:text-slate-900">
        ← Global Settings
      </Link>
      <Editor
        title={global.label}
        description="Edit the fields below, then save. Changes go live immediately."
        initialData={global.data}
        target={{ type: "global", key: global.key }}
      />
    </div>
  );
}
