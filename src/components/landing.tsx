import Image from "next/image";
import type { LandingPageContent } from "@/lib/cms";
import { ArrowRightIcon, CheckCircleIcon, StarIcon } from "./icons";

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
    <p className="font-heading text-[18px] font-semibold uppercase tracking-[0.04em] text-mint lg:text-[22px]">
      {children}
    </p>
  );
}

/* ------------------------------- Hero -------------------------------- */

export function LandingHero({ content }: { content: LandingPageContent["banner"] }) {
  const form = content.form;
  return (
    <section id="assessment" className="relative overflow-hidden bg-deep">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-[50px] px-6 py-[60px] lg:grid-cols-[1fr_560px] lg:gap-[70px] lg:px-[80px] lg:py-[80px]">
        {/* Left — pitch */}
        <div>
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h1 className="mt-[20px] font-heading text-[40px] font-semibold leading-[1.15] text-white lg:text-[60px]">
            {content.headingSegments.map((seg, i) => (
              <span key={i}>
                {seg.script ? (
                  <span
                    className={`font-script font-normal text-mint ${
                      "underline" in seg && seg.underline ? "underline underline-offset-[6px]" : ""
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
          <p className="mt-[28px] max-w-[620px] text-[18px] leading-[28px] text-white/90 lg:text-[20px]">
            {content.paragraph}
          </p>
          <ul className="mt-[34px] space-y-[18px]">
            {content.bullets.map((b) => (
              <li key={b} className="flex items-center gap-[16px] text-[18px] text-white lg:text-[20px]">
                <CheckCircleIcon className="size-[30px] shrink-0" />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-[40px] flex items-center gap-[16px]">
            <div className="flex gap-[2px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="size-[26px]" />
              ))}
            </div>
            <span className="text-[20px] font-bold text-mint">4.8/5</span>
            <span className="text-[13px] text-white/70">48 verified reviews</span>
          </div>
        </div>

        {/* Right — assessment form (visual mock) */}
        <form action="#" method="post" className="rounded-[24px] bg-white p-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] lg:p-[40px]">
          <h2 className="font-heading text-[24px] font-semibold text-deep lg:text-[28px]">
            Request Your{" "}
            <span className="text-teal underline underline-offset-[4px]">{form.titleAccent}</span> Case
            Assessment
          </h2>
          <div className="mt-[24px] space-y-[16px]">
            <input placeholder={form.placeholders.name} className="h-[48px] w-full rounded-[14px] border border-teal/40 bg-mint/30 px-[20px] text-[15px] text-deep placeholder:text-deep/60 focus:outline-none" />
            <input placeholder={form.placeholders.phone} className="h-[48px] w-full rounded-[14px] border border-teal/40 bg-mint/30 px-[20px] text-[15px] text-deep placeholder:text-deep/60 focus:outline-none" />
            <input placeholder={form.placeholders.email} className="h-[48px] w-full rounded-[14px] border border-teal/40 bg-mint/30 px-[20px] text-[15px] text-deep placeholder:text-deep/60 focus:outline-none" />
            <fieldset className="rounded-[14px] border border-teal/40 bg-mint/30 px-[20px] py-[10px]">
              <legend className="px-[6px] text-[12px] font-semibold uppercase tracking-wide text-deep/70">
                {form.helpLabel}
              </legend>
              <select className="h-[34px] w-full bg-transparent text-[15px] text-deep focus:outline-none">
                {form.helpOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </fieldset>
            <textarea placeholder={form.placeholders.situation} className="h-[110px] w-full resize-none rounded-[14px] border border-teal/40 bg-mint/30 px-[20px] py-[14px] text-[15px] text-deep placeholder:text-deep/60 focus:outline-none" />
          </div>
          <button type="submit" className="mt-[24px] h-[56px] w-full rounded-full bg-flame text-[16px] font-semibold text-white">
            {form.submitLabel}
          </button>
          <p className="mt-[16px] text-center text-[13px] text-deep/60">{form.disclaimer}</p>
        </form>
      </div>
    </section>
  );
}

/* --------------------------- Trust badges ---------------------------- */

export function TrustBadges({ content }: { content: LandingPageContent["trustBadges"] }) {
  const parts = content.heading.split(content.headingAccent);
  return (
    <section className="bg-white py-[50px]">
      <div className="mx-auto max-w-[1400px] px-6 text-center">
        <p className="text-[18px] text-deep lg:text-[22px]">
          {parts[0]}
          <span className="font-semibold text-teal">{content.headingAccent}</span>
          {parts[1]}
        </p>
        <div className="mt-[32px] grid grid-cols-2 items-center gap-[24px] md:grid-cols-4">
          {content.logos.map((logo) => (
            <div
              key={logo.label}
              className="flex h-[80px] items-center justify-center rounded-[10px] border border-deep/10 px-[20px] text-center font-heading text-[18px] font-semibold text-deep/70"
            >
              {logo.label}
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
    <section className="bg-mint py-[48px] lg:py-[70px]">
      <div className="mx-auto max-w-[1400px] px-6">
        <h2 className="text-center font-heading text-[34px] font-semibold text-deep lg:text-[46px]">
          {content.heading}
        </h2>
        <div className="mt-[44px] grid grid-cols-1 gap-[24px] sm:grid-cols-2 xl:grid-cols-4">
          {content.cards.map((card) => (
            <article key={card.text} className="flex items-start gap-[18px] rounded-[16px] bg-deep p-[28px]">
              <span className="flex size-[54px] shrink-0 items-center justify-center rounded-full bg-teal/20 text-mint">
                <LandingIcon name={card.icon} className="size-[28px]" />
              </span>
              <p className="text-[17px] leading-[26px] text-white">{card.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-[44px] flex justify-center">
          <a href={content.cta.href} className="flex h-[64px] items-center gap-[12px] rounded-full bg-flame px-[36px] text-[18px] font-semibold text-white">
            {content.cta.label}
            <ArrowRightIcon className="size-[28px]" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- How it works --------------------------- */

export function HowItWorks({ content }: { content: LandingPageContent["howItWorks"] }) {
  return (
    <section className="bg-deep py-[48px] lg:py-[80px]">
      <div className="mx-auto max-w-[1300px] px-6">
        <h2 className="text-center font-heading text-[34px] font-semibold text-white lg:text-[46px]">
          {content.heading}
        </h2>
        <div className="mt-[56px] grid grid-cols-1 gap-[40px] md:grid-cols-3">
          {content.steps.map((step) => (
            <div key={step.title} className="flex flex-col items-center text-center">
              <div className="relative">
                <span className="flex size-[110px] items-center justify-center rounded-full bg-mint text-deep">
                  <LandingIcon name={step.icon} className="size-[48px]" />
                </span>
                <span className="absolute -right-1 -top-1 flex size-[40px] items-center justify-center rounded-full border-2 border-mint bg-deep font-numeral text-[20px] text-mint">
                  {step.numeral}
                </span>
              </div>
              <h3 className="mt-[24px] font-heading text-[24px] font-semibold text-white">{step.title}</h3>
              <p className="mt-[14px] max-w-[320px] text-[17px] leading-[26px] text-white/85">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- What you get --------------------------- */

export function WhatYouGet({ content }: { content: LandingPageContent["whatYouGet"] }) {
  return (
    <section className="bg-ice py-[48px] lg:py-[80px]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-[50px] px-6 lg:grid-cols-[1fr_420px]">
        <div>
          <h2 className="font-heading text-[32px] font-semibold leading-[1.2] text-teal lg:text-[42px]">
            {content.headingBefore}
            <span className="text-teal underline underline-offset-[4px]">{content.headingAccent}</span>
            {content.headingAfter}
          </h2>
          <ul className="mt-[36px]">
            {content.items.map((item, i) => (
              <li
                key={item}
                className={`flex items-center gap-[18px] py-[20px] text-[18px] text-deep lg:text-[19px] ${
                  i < content.items.length - 1 ? "border-b border-teal/20" : ""
                }`}
              >
                <CheckCircleIcon className="size-[28px] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:block">
          <Image
            src={content.image.src}
            alt={content.image.alt}
            width={content.image.width}
            height={content.image.height}
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Split section -------------------------- */

export function SplitSection({ content }: { content: LandingPageContent["split"] }) {
  return (
    <section className="relative overflow-hidden bg-deeper py-[48px] lg:py-[70px]">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex justify-center">
          <h2 className="rounded-[10px] bg-deep px-[28px] py-[14px] text-center font-heading text-[26px] font-semibold text-white lg:text-[36px]">
            {content.heading} <span className="bg-mint px-[10px] text-deep">{content.headingHighlight}</span>
          </h2>
        </div>
        <div className="mt-[44px] grid grid-cols-1 gap-[30px] lg:grid-cols-2">
          <div className="rounded-[20px] bg-deep p-[36px]">
            <ul className="space-y-[18px] text-[18px] leading-[26px] text-white">
              {content.bullets.map((b) => (
                <li key={b} className="flex gap-[14px]">
                  <span className="mt-[9px] size-[7px] shrink-0 rounded-full bg-mint" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center rounded-[20px] bg-mint p-[40px]">
            <p className="text-center font-heading text-[24px] font-semibold leading-[1.4] text-deep lg:text-[30px]">
              {content.quote}
            </p>
          </div>
        </div>
        <div className="mt-[44px] flex justify-center">
          <a href={content.cta.href} className="flex h-[62px] items-center gap-[12px] rounded-full bg-flame px-[34px] text-center text-[16px] font-semibold text-white lg:text-[18px]">
            {content.cta.label}
            <ArrowRightIcon className="size-[26px]" />
          </a>
        </div>
      </div>
    </section>
  );
}
