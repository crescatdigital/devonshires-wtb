"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

/*
 * WYSIWYG field used by the admin content editor. Two shapes:
 *
 *  - block  (default) — full toolbar for body copy: bold/italic/underline/strike,
 *    H2 & H3, bullet & numbered lists, blockquote, links. Output is block HTML.
 *  - inline (`inline`) — single-line prose such as headings/titles: bold/italic/
 *    underline and links only. Output is inline HTML (the wrapping <p> is stripped).
 *
 * Both emit HTML strings, which the public site renders through <RichText>. Plain
 * strings authored before this feature are valid HTML, so existing content is
 * shown unchanged until an editor touches it.
 */

/** StarterKit nodes that only make sense in the full (block) editor. */
const BLOCK_ONLY = {
  heading: { levels: [2, 3] as (2 | 3)[] },
};

const INLINE_DISABLED = {
  heading: false as const,
  bulletList: false as const,
  orderedList: false as const,
  listItem: false as const,
  blockquote: false as const,
  codeBlock: false as const,
  code: false as const,
  horizontalRule: false as const,
};

function cleanInline(html: string): string {
  // Collapse the single wrapping paragraph TipTap emits down to inline markup.
  const inner = html
    .replace(/^<p>/, "")
    .replace(/<\/p>\s*$/, "")
    .replace(/<\/p>\s*<p>/g, "<br>");
  return inner === "<p></p>" ? "" : inner;
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`flex h-8 min-w-8 items-center justify-center rounded px-1.5 text-sm font-semibold transition-colors disabled:opacity-30 ${
        active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-200"
      }`}
    >
      {children}
    </button>
  );
}

function LinkControl({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const active = editor.isActive("link");

  function start() {
    setUrl((editor.getAttributes("link").href as string) ?? "");
    setOpen(true);
  }
  function apply() {
    const href = url.trim();
    if (!href) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    }
    setOpen(false);
  }

  return (
    <span className="relative">
      <ToolbarButton onClick={start} active={active} title="Link">
        🔗
      </ToolbarButton>
      {open && (
        <span className="absolute left-0 top-9 z-10 flex w-72 max-w-[80vw] items-center gap-1.5 rounded-lg border border-slate-300 bg-white p-2 shadow-lg">
          <input
            autoFocus
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                apply();
              } else if (e.key === "Escape") {
                setOpen(false);
              }
            }}
            placeholder="https://…  /page  mailto:…"
            className="min-w-0 flex-1 rounded border border-slate-300 px-2 py-1 text-sm"
          />
          <button
            type="button"
            onClick={apply}
            className="rounded bg-slate-900 px-2.5 py-1 text-sm font-medium text-white"
          >
            {url.trim() ? "Apply" : "Remove"}
          </button>
        </span>
      )}
    </span>
  );
}

function Toolbar({ editor, inline }: { editor: Editor; inline: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-0.5 rounded-t-lg border border-slate-300 bg-slate-50 px-1.5 py-1">
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold">
        <span className="font-bold">B</span>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic">
        <span className="italic">I</span>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline">
        <span className="underline">U</span>
      </ToolbarButton>
      {!inline && (
        <>
          <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough">
            <span className="line-through">S</span>
          </ToolbarButton>
          <span className="mx-1 h-5 w-px bg-slate-300" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading">
            H2
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Subheading">
            H3
          </ToolbarButton>
          <span className="mx-1 h-5 w-px bg-slate-300" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet list">
            •
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered list">
            1.
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Quote">
            ❝
          </ToolbarButton>
        </>
      )}
      <span className="mx-1 h-5 w-px bg-slate-300" />
      <LinkControl editor={editor} />
      <span className="mx-1 h-5 w-px bg-slate-300" />
      <ToolbarButton
        onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
        title="Clear formatting"
      >
        ⌫
      </ToolbarButton>
    </div>
  );
}

export default function RichTextEditor({
  value,
  onChange,
  inline = false,
}: {
  value: string;
  onChange: (html: string) => void;
  inline?: boolean;
}) {
  const editor = useEditor({
    immediatelyRender: false, // required under Next SSR to avoid hydration mismatch
    extensions: [
      StarterKit.configure({
        ...(inline ? INLINE_DISABLED : BLOCK_ONLY),
        link: {
          openOnClick: false,
          autolink: true,
          defaultProtocol: "https",
          HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
        },
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(inline ? cleanInline(html) : html === "<p></p>" ? "" : html);
    },
    editorProps: {
      attributes: {
        class: inline
          ? "w-full rounded-b-lg border border-t-0 border-slate-300 bg-white px-3.5 py-2.5 text-base text-slate-900 outline-none focus:border-slate-900 [&_a]:text-blue-600 [&_a]:underline"
          : "min-h-[6rem] w-full rounded-b-lg border border-t-0 border-slate-300 bg-white px-3.5 py-2.5 text-base leading-relaxed text-slate-900 outline-none focus:border-slate-900 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_h2]:mb-1 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:mb-1 [&_h3]:text-lg [&_h3]:font-semibold [&_a]:text-blue-600 [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-slate-300 [&_blockquote]:pl-3 [&_blockquote]:italic",
      },
    },
  });

  // Keep the editor in sync when the value changes from outside (array reorder,
  // reset, etc.) — but not while the user is typing into this instance.
  useEffect(() => {
    if (!editor) return;
    const raw = editor.getHTML();
    const current = inline ? cleanInline(raw) : raw === "<p></p>" ? "" : raw;
    const incoming = value || "";
    if (incoming !== current && !editor.isFocused) {
      editor.commands.setContent(incoming, { emitUpdate: false });
    }
  }, [value, editor, inline]);

  if (!editor) return null;

  return (
    <div>
      <Toolbar editor={editor} inline={inline} />
      <EditorContent editor={editor} />
    </div>
  );
}
