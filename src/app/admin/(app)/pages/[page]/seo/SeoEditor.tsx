"use client";

import { useState } from "react";
import { saveSeo } from "@/app/admin/actions";

export default function SeoEditor({
  refKey,
  initial,
}: {
  refKey: string;
  initial: { meta_title: string; meta_description: string; og_image: string };
}) {
  const [fields, setFields] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }));

  async function onSave() {
    setStatus("saving");
    setError(null);
    const res = await saveSeo(refKey, fields);
    if (res?.ok) {
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2500);
    } else {
      setStatus("error");
      setError(res?.error ?? "Save failed");
    }
  }

  return (
    <div className="mx-auto max-w-2xl pb-24">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">SEO / Meta</h1>
        <p className="mt-1.5 text-base text-slate-500">
          Search engine title and description for this page.
        </p>
      </header>

      <div className="space-y-5">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-600">Meta title</span>
          <input
            value={fields.meta_title}
            onChange={set("meta_title")}
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-base outline-none focus:border-slate-900"
          />
          <span className="mt-1.5 block text-sm text-slate-400">{fields.meta_title.length} chars (aim for ≤ 60)</span>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-600">Meta description</span>
          <textarea
            value={fields.meta_description}
            onChange={set("meta_description")}
            rows={3}
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-base leading-relaxed outline-none focus:border-slate-900"
          />
          <span className="mt-1.5 block text-sm text-slate-400">
            {fields.meta_description.length} chars (aim for ≤ 160)
          </span>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-600">OG image URL (optional)</span>
          <input
            value={fields.og_image}
            onChange={set("og_image")}
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-base outline-none focus:border-slate-900"
          />
        </label>
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-slate-200 bg-white/95 backdrop-blur md:left-64">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-5 py-3.5 sm:px-8">
          <span className="text-base">
            {status === "saved" && <span className="text-green-600">Saved ✓</span>}
            {status === "error" && <span className="text-red-600">{error}</span>}
          </span>
          <button
            onClick={onSave}
            disabled={status === "saving"}
            className="rounded-lg bg-slate-900 px-6 py-2.5 text-base font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            {status === "saving" ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
