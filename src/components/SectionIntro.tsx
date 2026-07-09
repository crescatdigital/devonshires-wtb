type Scheme = "light" | "dark";

/**
 * Shared section intro: eyebrow flanked by short lines, two-line heading
 * where the second line uses the Segoe UI Semilight italic accent, and an
 * optional centered intro paragraph. Matches the repeating Figma pattern.
 */
export default function SectionIntro({
  eyebrow,
  headingLine1,
  headingLine2,
  intro,
  scheme,
  align = "center",
  headingSize = "large",
}: {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  intro?: string;
  scheme: Scheme;
  align?: "center" | "left";
  headingSize?: "large" | "medium";
}) {
  const eyebrowColor = scheme === "dark" ? "text-mint" : "text-teal";
  const headingColor = scheme === "dark" ? "text-white" : "text-deep";
  const accentColor = scheme === "dark" ? "text-mint" : "text-teal";
  const introColor = scheme === "dark" ? "text-white" : "text-deep";
  const lineColor = scheme === "dark" ? "bg-mint" : "bg-teal";
  const centered = align === "center";
  const headingClass =
    headingSize === "large"
      ? "text-[44px] lg:text-[68px] xl:text-[92px] leading-[1.14]"
      : "text-[32px] lg:text-[44px] xl:text-[55px] leading-[1.25]";

  return (
    <div className={centered ? "text-center" : ""}>
      <div className={`flex items-center gap-[24px] ${centered ? "justify-center" : ""}`}>
        <span className={`h-px w-[74px] ${lineColor}`} />
        <p className={`font-heading text-[20px] font-semibold uppercase lg:text-[26px] ${eyebrowColor}`}>
          {eyebrow}
        </p>
        <span className={`h-px w-[74px] ${lineColor}`} />
      </div>
      <h2 className={`mt-[28px] font-heading font-semibold ${headingClass} ${headingColor}`}>
        {headingLine1}
        <br />
        <span className={`heading-accent ${accentColor}`}>{headingLine2}</span>
      </h2>
      {intro && (
        <p
          className={`mx-auto mt-[40px] max-w-[1230px] text-[18px] leading-normal lg:text-[24px] ${introColor} ${centered ? "" : "mx-0"}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
