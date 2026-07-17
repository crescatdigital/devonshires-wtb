import Link from "next/link";
import { getSeo } from "@/lib/cms-admin";
import SeoEditor from "./SeoEditor";

export default async function SeoPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const seo = await getSeo(page);

  return (
    <div>
      <Link href={`/admin/pages/${page}`} className="mb-4 inline-block text-base text-slate-500 hover:text-slate-900">
        ← Back to sections
      </Link>
      <SeoEditor
        refKey={page}
        initial={{
          meta_title: seo?.meta_title ?? "",
          meta_description: seo?.meta_description ?? "",
          og_image: seo?.og_image ?? "",
        }}
      />
    </div>
  );
}
