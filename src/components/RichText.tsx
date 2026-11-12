import sanitizeHtml from "sanitize-html";

/**
 * Renders CMS rich text (HTML authored in the admin WYSIWYG editor) on the
 * public site. Content is sanitized on every render, so even if the stored
 * value were tampered with it can only ever produce the allowlisted tags below.
 *
 * Two modes:
 *  - block (default) — body copy. Renders a <div> that carries the caller's
 *    typography classes (font size / colour / leading inherit into the HTML) plus
 *    a shared set of prose styles for paragraphs, lists, headings and links.
 *  - inline (`inline`) — headings, titles and list items. Renders a <span> and
 *    strips any block-level tags, so it is always valid inside an existing
 *    <h2>/<p>/<li>.
 *
 * Plain strings (content authored before the WYSIWYG editor) are valid HTML and
 * pass through unchanged.
 *
 * Sanitizing uses sanitize-html (a pure-JS parser that Next bundles), not
 * DOMPurify + jsdom: jsdom is loaded by Next as an external package and its
 * ESM-only dependencies crash Vercel's serverless runtime with ERR_REQUIRE_ESM,
 * which silently broke every on-demand page refresh after a CMS save.
 */

const INLINE_TAGS = ["a", "b", "strong", "i", "em", "u", "s", "strike", "span", "br"];
const BLOCK_TAGS = [...INLINE_TAGS, "p", "ul", "ol", "li", "h2", "h3", "blockquote"];
/** Only links carry attributes. Disallowed tags are dropped but keep their text;
 *  script/style contents are discarded. Link schemes are limited to
 *  http(s)/mailto/tel plus relative URLs, so `javascript:` links are removed. */
const ALLOWED_ATTRIBUTES = { a: ["href", "target", "rel"] };
const ALLOWED_SCHEMES = ["http", "https", "mailto", "tel"];

/** Shared prose styling. `em`-based sizes scale with the caller's font-size; no
 *  colours are set, so links and text inherit the surrounding section's palette. */
const BLOCK_PROSE = [
  "[&_a]:underline [&_a]:underline-offset-2 [&_a]:font-medium",
  "[&_strong]:font-semibold [&_b]:font-semibold [&_em]:italic [&_u]:underline [&_s]:line-through",
  "[&_p]:m-0 [&_p+p]:mt-[0.8em]",
  "[&_ul]:list-disc [&_ul]:pl-[1.4em] [&_ul]:my-[0.6em]",
  "[&_ol]:list-decimal [&_ol]:pl-[1.4em] [&_ol]:my-[0.6em]",
  "[&_li]:mb-[0.2em]",
  "[&_h2]:font-semibold [&_h2]:text-[1.4em] [&_h2]:mt-[0.8em] [&_h2]:mb-[0.3em]",
  "[&_h3]:font-semibold [&_h3]:text-[1.2em] [&_h3]:mt-[0.6em] [&_h3]:mb-[0.2em]",
  "[&_blockquote]:border-l-2 [&_blockquote]:pl-[0.8em] [&_blockquote]:italic [&_blockquote]:opacity-80",
  "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
].join(" ");

const INLINE_PROSE =
  "[&_a]:underline [&_a]:underline-offset-2 [&_a]:font-medium [&_strong]:font-semibold [&_em]:italic";

function sanitize(html: string, inline: boolean): string {
  return sanitizeHtml(html, {
    allowedTags: inline ? INLINE_TAGS : BLOCK_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: ALLOWED_SCHEMES,
  });
}

export default function RichText({
  html,
  inline = false,
  className = "",
}: {
  html?: string | null;
  inline?: boolean;
  className?: string;
}) {
  const raw = (html ?? "").trim();
  if (!raw) return null;
  const clean = sanitize(raw, inline);

  if (inline) {
    return (
      <span
        className={`${INLINE_PROSE} ${className}`.trim()}
        dangerouslySetInnerHTML={{ __html: clean }}
      />
    );
  }
  return (
    <div
      className={`${BLOCK_PROSE} ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
