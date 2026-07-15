import Image from "next/image";
import type { LandingPageContent } from "@/lib/cms";

/* ---------- small inline icon set used only on the landing page ---------- */

function LandingIcon({ name, className }: { name: string; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "user-x":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="4" />
          <path d="M2 21a7 7 0 0 1 12-4.9M16 8l5 5M21 8l-5 5" />
        </svg>
      );
    case "hourglass":
      return (
        <svg {...common}>
          <path d="M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9" />
        </svg>
      );
    case "scales":
      return (
        <svg {...common}>
          <path d="M12 3v18M6 21h12M3 8l3-4 3 4a3 3 0 0 1-6 0ZM15 8l3-4 3 4a3 3 0 0 1-6 0ZM6 4h12" />
        </svg>
      );
    case "document":
      return (
        <svg {...common}>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5M9 13h6M9 17h6" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "folder":
      return (
        <svg {...common}>
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
      );
    default:
      return null;
  }
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-heading text-[16px] uppercase tracking-[0.12em] text-mint lg:text-[26px]">
      {children}
    </p>
  );
}

/** Thin outlined circle-check used for the hero pitch bullets. */
function OutlineCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 44" className={className} fill="none" aria-hidden>
      <circle cx="22" cy="22" r="20" stroke="currentColor" strokeWidth="2.4" />
      <path
        d="M13 22.5 19.5 29 32 15.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------- Hero -------------------------------- */

export function LandingHero({ content }: { content: LandingPageContent["banner"] }) {
  const form = content.form;
  const [titleBefore, titleAfter] = form.title.split(form.titleAccent);
  return (
    <section id="assessment" className="relative overflow-hidden bg-deep">
      {/* Right — halftone panel image (desktop only) */}
      <Image
        src="/images/landing-page-banner-bg.jpg"
        alt=""
        width={697}
        height={1027}
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[697px] object-cover lg:block"
      />

      <div className="relative mx-auto flex max-w-[1920px] flex-col gap-[48px] px-6 py-[52px] lg:flex-row lg:items-start lg:justify-between lg:gap-[80px] lg:py-[90px] lg:pl-[175px] lg:pr-[262px]">
        {/* Left — pitch */}
        <div className="relative lg:flex-1">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h1 className="mt-[20px] font-heading text-[44px] font-semibold leading-[1.4] text-white lg:mt-[10px] lg:text-[70px]">
            {content.headingSegments.map((seg, i) => (
              <span key={i}>
                {seg.script ? (
                  <span
                    className={`font-script font-normal text-mint ${
                      "underline" in seg && seg.underline
                        ? "underline decoration-[3px] underline-offset-[8px]"
                        : ""
                    }`}
                  >
                    {seg.text}
                  </span>
                ) : (
                  seg.text
                )}
                {"break" in seg && seg.break && <br />}
              </span>
            ))}
          </h1>
          <p className="mt-[26px] max-w-[520px] text-[17px] leading-[1.5] text-white lg:mt-[40px] lg:max-w-[760px] lg:text-[24px]">
            {content.paragraph}
          </p>
          <ul className="mt-[34px] space-y-[22px] lg:mt-[50px] lg:space-y-[30px]">
            {content.bullets.map((b) => (
              <li key={b} className="flex items-center gap-[16px] text-[18px] text-white lg:gap-[22px] lg:text-[28px]">
                <OutlineCheck className="size-[36px] shrink-0 text-mint lg:size-[46px]" />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-[36px] h-px w-full max-w-[620px] bg-white/25 lg:mt-[50px]" />
          <div className="mt-[22px]">
            <p className="text-[16px] font-semibold text-white lg:text-[18px]">Devonshires Claims</p>
            <Image
              src="/images/reviews-badge.png"
              alt="Devonshires Claims rated 4.8 out of 5 — 48 verified reviews"
              width={349}
              height={111}
              className="mt-[10px] h-auto w-[280px] lg:w-[320px]"
            />
          </div>
          {/* Award seal */}
          <Image
            src="/images/win-badge.png"
            alt="UK Legal Awards 2023 — Devonshires Claims — Best Solicitors 2023"
            width={200}
            height={168}
            className="hidden lg:absolute lg:bottom-[70px] lg:right-[10px] lg:block lg:w-[200px]"
          />
        </div>

        {/* Right — assessment form (visual mock) */}
        <form
          action="#"
          method="post"
          className="relative w-full shrink-0 rounded-[30px] border-[3px] border-deep bg-lite px-[24px] pb-[42px] pt-[38px] shadow-[2px_4px_4px_2px_rgba(0,0,0,0.25)] lg:w-[571px] lg:px-[25px] lg:pb-[45px] lg:pt-[40px]"
        >
          <h2 className="px-[8px] font-heading text-[24px] font-semibold text-deep lg:text-[30px]">
            {titleBefore}
            <span className="text-teal underline decoration-2 underline-offset-[4px]">{form.titleAccent}</span>
            {titleAfter}
          </h2>
          <div className="mt-[28px] space-y-[18px] lg:mt-[34px] lg:space-y-[20px]">
            <input
              placeholder={form.placeholders.name}
              className="h-[52px] w-full rounded-[20px] border-2 border-deep bg-mint px-[26px] text-[15px] font-semibold text-deep placeholder:font-semibold placeholder:text-deep focus:outline-none lg:h-[56px] lg:text-[17px]"
            />
            <input
              placeholder={form.placeholders.phone}
              className="h-[52px] w-full rounded-[20px] border-2 border-deep bg-mint px-[26px] text-[15px] font-semibold text-deep placeholder:font-semibold placeholder:text-deep focus:outline-none lg:h-[56px] lg:text-[17px]"
            />
            <input
              placeholder={form.placeholders.email}
              className="h-[52px] w-full rounded-[20px] border-2 border-deep bg-mint px-[26px] text-[15px] font-semibold text-deep placeholder:font-semibold placeholder:text-deep focus:outline-none lg:h-[56px] lg:text-[17px]"
            />
            <fieldset className="rounded-[20px] border-2 border-deep px-[24px] pb-[16px] pt-[4px]">
              <legend className="px-[8px] text-[12px] font-bold uppercase tracking-[0.02em] text-deep lg:text-[14px]">
                {form.helpLabel}
              </legend>
              <div className="flex items-center justify-between gap-[16px]">
                <p className="pt-[10px] pr-[20px] pb-[5px] pl-[25px] text-[15px] font-semibold leading-[1.35] text-deep lg:text-[17px]">
                  {form.helpOptions.join(" / ")}
                </p>
                <svg viewBox="0 0 24 24" className="size-[24px] shrink-0 text-deep" fill="none" aria-hidden>
                  <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </fieldset>
            <textarea
              placeholder={form.placeholders.situation}
              className="h-[150px] w-full resize-none rounded-[20px] border-2 border-deep bg-mint px-[26px] py-[18px] text-[15px] font-semibold text-deep placeholder:font-semibold placeholder:text-deep focus:outline-none lg:h-[190px] lg:text-[17px]"
            />
          </div>
          <div className="mt-[26px] px-[20px] lg:px-[33px]">
            <button
              type="submit"
              className="flex h-[60px] w-full items-center justify-center rounded-full bg-flame text-[15px] font-semibold uppercase tracking-[0.03em] text-white lg:h-[64px] lg:text-[20px]"
            >
              {form.submitLabel}
            </button>
          </div>
          <p className="mt-[30px] text-center text-[13px] text-deep lg:text-[16px]">
            <span className="text-teal">*</span>
            {form.disclaimer.startsWith("*") ? form.disclaimer.slice(1) : form.disclaimer}
          </p>
        </form>
      </div>
    </section>
  );
}

/* --------------------------- Trust badges ---------------------------- */

export function TrustBadges({ content }: { content: LandingPageContent["trustBadges"] }) {
  const parts = content.heading.split(content.headingAccent);
  return (
    <section className="bg-lite py-[40px] lg:py-[40px]">
      <div className="mx-auto max-w-[1500px] px-6 text-center">
        <p className="text-[20px] text-teal lg:text-[28px]">
          {parts[0]}
          <span className="font-bold">{content.headingAccent}</span>
          {parts[1]}
        </p>
        <div className="mt-[30px] flex flex-wrap items-center justify-center gap-[24px] lg:mt-[20px] lg:gap-[45px]">
          {content.logos.map((logo) => (
            <div
              key={logo.label}
              className="flex h-[116px] w-[309px] items-center justify-center rounded-[12px] border-2 border-teal/30 bg-white px-[30px] py-[10px] text-center font-heading text-[18px] font-semibold text-deep/75"
            >
              {"image" in logo && logo.image ? (
                <Image
                  src={logo.image.src}
                  alt={logo.image.alt}
                  width={logo.image.width}
                  height={logo.image.height}
                  className="max-h-full w-auto max-w-full object-contain"
                />
              ) : (
                logo.label
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- We help when --------------------------- */

export function HelpWhen({ content }: { content: LandingPageContent["helpWhen"] }) {
  return (
    <section className="bg-mint py-[48px] lg:pt-[30px] lg:pb-[60px]">
      <div className="mx-auto max-w-[1810px] px-6">
        <h2 className="text-center font-heading text-[34px] text-deep lg:text-[42px]">
          {content.heading}
        </h2>
        <div className="mt-[40px] grid grid-cols-1 gap-[22px] sm:grid-cols-2 xl:grid-cols-4">
          {content.cards.map((card) => (
            <article
              key={card.text}
              className="flex items-start gap-[24px] rounded-[30px] border border-3 border-white bg-deep p-[28px] lg:gap-[38px] lg:px-[30px] lg:py-[55px]"
            >
              <span className="flex size-[68px] shrink-0 items-center justify-center rounded-full border-3 border-teal bg-lite text-teal lg:size-[92px]">
                <LandingIcon name={card.icon} className="size-[34px] lg:size-[44px]" />
              </span>
              <p className="text-[18px] leading-[1.35] text-white lg:text-[22px]">{card.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-[44px] flex justify-center lg:mt-[50px]">
          <a
            href={content.cta.href}
            className="flex h-[60px] items-center justify-center rounded-full bg-flame px-[40px] text-[16px] font-bold uppercase tracking-[0.02em] text-white lg:h-[64px] lg:text-[20px]"
          >
            {content.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- How it works --------------------------- */

export function HowItWorks({ content }: { content: LandingPageContent["howItWorks"] }) {
  return (
    <section className="bg-deep py-[48px] lg:pt-[40px] lg:pb-[70px]">
      <div className="mx-auto max-w-[1500px] px-6">
        <h2 className="text-center font-heading text-[34px] text-white lg:text-[42px]">
          {content.heading}
        </h2>
        <div className="mt-[50px] grid grid-cols-1 gap-y-[48px] md:grid-cols-3 md:gap-x-0 lg:mt-[60px]">
          {content.steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col items-center px-[40px] text-center md:border-l md:border-white md:first:border-l-0"
            >
              <div className="relative">
                <span className="flex size-[120px] items-center justify-center rounded-full border-3 border-white bg-mint text-deep lg:size-[150px]">
                  <LandingIcon name={step.icon} className="size-[52px] lg:size-[62px]" />
                </span>
                <span className="absolute -left-[31px] -top-[24px] flex size-[62px] items-center justify-center rounded-full border-3 border-mint bg-deep font-numeral text-[26px] text-mint lg:size-[78px] lg:text-[45px] pb-[10px]">
                  {step.numeral}
                </span>
              </div>
              <h3 className="mt-[24px] font-heading text-[26px] font-semibold text-white lg:mt-[28px]">
                {step.title}
              </h3>
              <p className="mt-[14px] max-w-[340px] text-[18px] leading-[1.4] text-white lg:mt-[16px] lg:text-[22px]">
                {step.text}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-[44px] flex justify-center lg:mt-[56px]">
          <a
            href="#assessment"
            className="flex h-[60px] items-center justify-center rounded-full bg-flame px-[40px] text-[16px] font-bold uppercase tracking-[0.02em] text-white lg:h-[64px] lg:text-[20px]"
          >
            Request Your Free Case Assessment
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- What you get --------------------------- */

export function WhatYouGet({ content }: { content: LandingPageContent["whatYouGet"] }) {
  return (
    <section className="relative overflow-hidden bg-ice py-[48px] lg:py-[70px]">
      {/* Mint background panel behind the shield (desktop) */}
      <div aria-hidden className="absolute inset-y-0 right-0 hidden w-[380px] bg-mint lg:block" />
      {/* Duotone shield (desktop) */}
      <Image
        src={content.image.src}
        alt={content.image.alt}
        width={content.image.width}
        height={content.image.height}
        className="pointer-events-none absolute -right-[0] top-[-48px] hidden w-[815px] lg:block"
      />

      <div className="relative mx-auto max-w-[1920px] px-6 lg:pl-[105px] lg:pr-0">
        <div className="lg:max-w-[1000px]">
          <h2 className="font-heading text-[32px] font-semibold leading-[1.25] text-teal lg:text-[42px]">
            {content.headingBefore}
            <span className="underline decoration-2 underline-offset-[6px] text-deep">{content.headingAccent}</span>
            {content.headingAfter}
          </h2>
          <ul className="mt-[36px] lg:mt-[44px] ml-[25px]">
            {content.items.map((item, i) => (
              <li
                key={item}
                className={`flex items-center gap-[20px] border-t border-teal/60 py-[16px] text-[20px] text-deep lg:gap-[22px] lg:py-[18px] lg:text-[28px] ${
                  i === content.items.length - 1 ? "border-b" : ""
                }`}
              >
                <svg
                  viewBox="0 0 30 30"
                  className="size-[48px] shrink-0 lg:size-[64px]"
                  fill="none"
                  aria-hidden
                >
                  <circle cx="15" cy="15" r="14" fill="#2ab3a3" stroke="#1b3542" strokeWidth="1.2" />
                  <path
                    d="M9 15.5 13 19.5 21.5 11"
                    stroke="#f1fffd"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Shield (mobile) */}
        <div className="mt-[40px] flex justify-center lg:hidden">
          <Image
            src={content.image.src}
            alt={content.image.alt}
            width={content.image.width}
            height={content.image.height}
            className="h-auto w-[320px] max-w-full"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Split section -------------------------- */

export function SplitSection({ content }: { content: LandingPageContent["split"] }) {
  return (
    <section className="relative overflow-hidden bg-deeper py-[56px] lg:py-[80px]">
      {/* Background photo + overlay */}
      <Image
        src="/images/upfront-ctsts-bg.png"
        alt=""
        fill
        aria-hidden
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0" style={{ background: "rgba(27, 53, 66, 0.45)" }} />

      <div className="relative mx-auto max-w-[1623px] px-6">
        {/* Two-tone heading pill */}
        <div className="flex justify-center">
          <div className="inline-flex overflow-hidden rounded-[30px] font-heading text-[22px] leading-[1.15] lg:text-[42px]">
            <span className="bg-deep px-[30px] py-[11px] text-mint lg:pb-[18px] lg:pl-[80px] lg:pr-[15px] lg:pt-[13px]">
              {content.heading}
            </span>
            <span className="bg-mint px-[30px] py-[11px] text-deep lg:pb-[16px] lg:pl-[15px] lg:pr-[80px] lg:pt-[14px]">
              {content.headingHighlight}
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-[64px] grid grid-cols-1 items-stretch gap-[64px] lg:mt-[120px] lg:grid-cols-2 lg:gap-[111px]">
          {/* Left — bullet list */}
          <div className="relative rounded-[30px] border-5 border-white bg-deep px-[36px] pb-[44px] pt-[70px] lg:px-[90px] lg:pb-[60px] lg:pt-[90px]">
            <span className="absolute -top-[60px] left-1/2 flex size-[110px] -translate-x-1/2 items-center justify-center rounded-full border-[7px] border-deep bg-mint text-deep lg:-top-[75px] lg:size-[150px] lg:border-[10px]">
              <svg viewBox="0 0 30 30" className="size-[48px] lg:size-[66px]" fill="none" aria-hidden>
                <rect x="6" y="4" width="18" height="22" rx="2.5" stroke="currentColor" strokeWidth="2" />
                <path d="M10 14l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <ul className="space-y-[20px] text-[19px] font-semibold leading-[1.4] text-white lg:space-y-[24px] lg:text-[28px]">
              {content.bullets.map((b) => (
                <li key={b} className="flex gap-[16px]">
                  <span className="mt-[11px] size-[8px] shrink-0 rounded-full bg-mint lg:mt-[14px]" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — quote */}
          <div className="relative flex items-center justify-center rounded-[30px] border-5 border-deep bg-mint px-[36px] pb-[44px] pt-[70px] lg:px-[90px] lg:pb-[60px] lg:pt-[90px]">
            <span className="absolute -top-[60px] left-1/2 flex size-[110px] -translate-x-1/2 items-center justify-center rounded-full border-[7px] border-mint bg-deep text-mint lg:-top-[75px] lg:size-[150px] lg:border-[10px]">
              <svg viewBox="0 0 40 32" className="size-[52px] lg:size-[66px]" fill="currentColor" aria-hidden>
                <path d="M0 32V19C0 8 6 2 16 0l2 5C11 7 8 10 8 15h6v17H0zm22 0V19C22 8 28 2 38 0l2 5c-7 2-10 5-10 10h6v17H22z" />
              </svg>
            </span>
            <p className="text-center font-heading text-[24px] leading-[1.4] text-deep lg:text-[36px]">
              {content.quote}
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="mt-[44px] flex justify-center lg:mt-[70px]">
          <a
            href={content.cta.href}
            className="flex h-[56px] items-center justify-center rounded-full border-3 border-white bg-flame px-[36px] text-center text-[13px] font-semibold uppercase tracking-[0.02em] text-white lg:h-[64px] lg:px-[44px] lg:text-[20px]"
          >
            {content.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
