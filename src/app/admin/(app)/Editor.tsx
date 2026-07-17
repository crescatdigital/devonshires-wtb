"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { saveGlobal, saveSection } from "../actions";

/* ----------------------------- helpers ----------------------------- */

type Json = unknown;
type Path = (string | number)[];

type Target =
  | { type: "global"; key: string }
  | { type: "section"; pageKey: string; sectionKey: string };

function humanize(key: string | number): string {
  const s = String(key);
  return s
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
}

function isPlainObject(v: Json): v is Record<string, Json> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

const IMAGE_KEYS = ["src", "alt", "width", "height"];
function isImageObject(v: Json): v is Record<string, Json> {
  return (
    isPlainObject(v) &&
    "src" in v &&
    Object.keys(v).every((k) => IMAGE_KEYS.includes(k))
  );
}

const LONG_KEYS = new Set([
  "paragraph", "text", "intro", "answer", "quote", "subtext",
  "description", "disclaimer", "subtitle", "regulatory",
]);
function isLongText(key: string | number, v: string): boolean {
  return LONG_KEYS.has(String(key)) || v.length > 70;
}

function setAtPath(obj: Json, path: Path, value: Json): Json {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  const base: Json = Array.isArray(obj) ? [...obj] : isPlainObject(obj) ? { ...obj } : {};
  (base as Record<string | number, Json>)[head] = setAtPath(
    (obj as Record<string | number, Json>)?.[head],
    rest,
    value,
  );
  return base;
}

/** A blank template shaped like `sample` (strings/arrays cleared). */
function blankLike(sample: Json): Json {
  if (typeof sample === "string") return "";
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  if (Array.isArray(sample)) return [];
  if (isPlainObject(sample)) {
    const out: Record<string, Json> = {};
    for (const [k, v] of Object.entries(sample)) out[k] = blankLike(v);
    return out;
  }
  return "";
}

/* ------------------------------ fields ------------------------------ */

function ImageField({
  value,
  path,
  update,
}: {
  value: Record<string, Json>;
  path: Path;
  update: (p: Path, v: Json) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const src = typeof value.src === "string" ? value.src : "";

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setErr(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const ext = file.name.split(".").pop() || "png";
      const objectPath = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(objectPath, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) throw error;
      const { data } = supabase.storage.from("media").getPublicUrl(objectPath);
      // natural dimensions (only if the object tracks width/height)
      const dims = await new Promise<{ w: number; h: number }>((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
        img.onerror = () => resolve({ w: 0, h: 0 });
        img.src = URL.createObjectURL(file);
      });
      let next: Record<string, Json> = { ...value, src: data.publicUrl };
      if ("width" in value && dims.w) next = { ...next, width: dims.w };
      if ("height" in value && dims.h) next = { ...next, height: dims.h };
      update(path, next);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <div className="flex gap-3">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt=""
            className="h-16 w-16 shrink-0 rounded border border-slate-200 bg-white object-contain"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded border border-dashed border-slate-300 text-xs text-slate-400">
            no image
          </div>
        )}
        <div className="min-w-0 flex-1 space-y-2.5">
          <input
            value={src}
            onChange={(e) => update([...path, "src"], e.target.value)}
            placeholder="Image path or URL"
            className="w-full rounded border border-slate-300 px-3 py-2 text-base"
          />
          {"alt" in value && (
            <input
              value={typeof value.alt === "string" ? value.alt : ""}
              onChange={(e) => update([...path, "alt"], e.target.value)}
              placeholder="Alt text"
              className="w-full rounded border border-slate-300 px-3 py-2 text-base"
            />
          )}
          <div className="flex items-center gap-3">
            <label className="cursor-pointer rounded bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800">
              {uploading ? "Uploading…" : "Upload"}
              <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={uploading} />
            </label>
            {("width" in value || "height" in value) && (
              <span className="text-sm text-slate-400">
                {String(value.width ?? "?")}×{String(value.height ?? "?")}
              </span>
            )}
          </div>
          {err && <p className="text-sm text-red-600">{err}</p>}
        </div>
      </div>
    </div>
  );
}

function Node({
  value,
  path,
  keyName,
  update,
}: {
  value: Json;
  path: Path;
  keyName: string | number;
  update: (p: Path, v: Json) => void;
}) {
  const label = humanize(keyName);

  // strings
  if (typeof value === "string") {
    return (
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-slate-600">{label}</span>
        {isLongText(keyName, value) ? (
          <textarea
            value={value}
            onChange={(e) => update(path, e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-base leading-relaxed text-slate-900 outline-none focus:border-slate-900"
          />
        ) : (
          <input
            value={value}
            onChange={(e) => update(path, e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-base text-slate-900 outline-none focus:border-slate-900"
          />
        )}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-slate-600">{label}</span>
        <input
          type="number"
          value={value}
          onChange={(e) => update(path, e.target.value === "" ? 0 : Number(e.target.value))}
          className="w-40 rounded-lg border border-slate-300 px-3.5 py-2.5 text-base text-slate-900 outline-none focus:border-slate-900"
        />
      </label>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2.5">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => update(path, e.target.checked)}
          className="h-5 w-5 rounded border-slate-300"
        />
        <span className="text-base font-medium text-slate-700">{label}</span>
      </label>
    );
  }

  // image object
  if (isImageObject(value)) {
    return (
      <div>
        <span className="mb-1.5 block text-sm font-medium text-slate-600">{label}</span>
        <ImageField value={value} path={path} update={update} />
      </div>
    );
  }

  // arrays
  if (Array.isArray(value)) {
    const template = value.length ? blankLike(value[0]) : "";
    return (
      <div className="rounded-xl border border-slate-200 p-3">
        <p className="mb-3 text-base font-semibold text-slate-700">{label}</p>
        <div className="space-y-3">
          {value.map((item, i) => (
            <div key={i} className="rounded-lg bg-slate-50 p-3">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">
                  {label.replace(/s$/, "")} {i + 1}
                </span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (i === 0) return;
                      const arr = [...value];
                      [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
                      update(path, arr);
                    }}
                    className="rounded px-2 py-1 text-sm text-slate-500 hover:bg-slate-200 disabled:opacity-30"
                    disabled={i === 0}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (i === value.length - 1) return;
                      const arr = [...value];
                      [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]];
                      update(path, arr);
                    }}
                    className="rounded px-2 py-1 text-sm text-slate-500 hover:bg-slate-200 disabled:opacity-30"
                    disabled={i === value.length - 1}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => update(path, value.filter((_, j) => j !== i))}
                    className="rounded px-2 py-1 text-sm text-red-500 hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
              {isPlainObject(item) ? (
                <ObjectFields value={item} path={[...path, i]} update={update} />
              ) : (
                <Node value={item} path={[...path, i]} keyName={i} update={update} />
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => update(path, [...value, template])}
            className="rounded-lg border border-dashed border-slate-300 px-3.5 py-2 text-base font-medium text-slate-600 hover:border-slate-900 hover:text-slate-900"
          >
            + Add {label.replace(/s$/, "").toLowerCase()}
          </button>
        </div>
      </div>
    );
  }

  // nested object
  if (isPlainObject(value)) {
    return (
      <div className="rounded-xl border border-slate-200 p-3">
        <p className="mb-3 text-base font-semibold text-slate-700">{label}</p>
        <ObjectFields value={value} path={path} update={update} />
      </div>
    );
  }

  return null;
}

function ObjectFields({
  value,
  path,
  update,
}: {
  value: Record<string, Json>;
  path: Path;
  update: (p: Path, v: Json) => void;
}) {
  // Render simple fields (text, numbers, images) before long repeatable lists /
  // nested groups, so headings and copy appear first regardless of jsonb key order.
  const isComplex = (v: Json) => Array.isArray(v) || (isPlainObject(v) && !isImageObject(v));
  const entries = Object.entries(value).sort(
    (a, b) => Number(isComplex(a[1])) - Number(isComplex(b[1])),
  );
  return (
    <div className="space-y-4">
      {entries.map(([k, v]) => (
        <Node key={k} value={v} path={[...path, k]} keyName={k} update={update} />
      ))}
    </div>
  );
}

/* --------------------------- top-level editor --------------------------- */

export default function Editor({
  title,
  description,
  initialData,
  target,
}: {
  title: string;
  description?: string;
  initialData: Record<string, Json>;
  target: Target;
}) {
  const [data, setData] = useState<Record<string, Json>>(initialData);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const update = (p: Path, v: Json) => setData((d) => setAtPath(d, p, v) as Record<string, Json>);

  async function onSave() {
    setStatus("saving");
    setError(null);
    const res =
      target.type === "global"
        ? await saveGlobal(target.key, data)
        : await saveSection(target.pageKey, target.sectionKey, data);
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
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {description && <p className="mt-1.5 text-base text-slate-500">{description}</p>}
      </header>

      <div className="space-y-4">
        <ObjectFields value={data} path={[]} update={update} />
      </div>

      {/* Sticky save bar */}
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
