import { ArrowRightIcon, CheckCircleIcon } from "./icons";

export type JourneyData = {
  eyebrow: string;
  headingBefore: string;
  headingAccent: string;
  headingAfter: string;
  subtext: string;
  checklistTitle: string;
  checklist: string[];
  cta: { label: string; href: string };
  steps: { numeral: string; title: string; meta: string; text: string; last?: boolean }[];
};

export default function ServiceJourney({ content }: { content: JourneyData }) {
  return (
    <section className="bg-lite py-[52px] lg:py-[85px]">
      <div className="mx-auto grid max-w-[1470px] grid-cols-1 gap-[70px] px-6 lg:grid-cols-2 lg:gap-[90px]">
        {/* Left — heading, checklist, CTA */}
        <div>
          <div className="flex items-center gap-[24px]">
            <span className="h-px w-[74px] bg-teal" />
            <p className="font-heading text-[18px] font-semibold uppercase tracking-[0.04em] text-teal lg:text-[22px]">
              {content.eyebrow}
            </p>
          </div>
          <h2 className="mt-[24px] font-heading text-[40px] font-semibold leading-[1.1] text-deep lg:text-[64px]">
            {content.headingBefore}
            <span className="heading-accent text-teal"> {content.headingAccent}</span>
            {content.headingAfter}
          </h2>
          <p className="mt-[28px] max-w-[560px] text-[18px] leading-[28px] text-deep lg:text-[19px]">
            {content.subtext}
          </p>

          <div className="mt-[40px] rounded-[16px] border border-deep/15 bg-white p-[35px]">
            <div className="flex items-center gap-[14px]">
              <span className="flex size-[40px] items-center justify-center rounded-[8px] bg-teal/15 text-teal">
                <svg viewBox="0 0 24 24" className="size-[24px]" fill="none" aria-hidden>
                  <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="m8 11 2.5 2.5L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="font-heading text-[22px] font-semibold text-deep">
                {content.checklistTitle}
              </h3>
            </div>
            <ul className="mt-[22px] space-y-[14px] text-[17px] text-deep">
              {content.checklist.map((item) => (
                <li key={item} className="flex gap-[12px]">
                  <span className="mt-[9px] size-[6px] shrink-0 rounded-full bg-teal" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={content.cta.href}
            className="mt-[36px] inline-flex h-[63px] items-center gap-[12px] rounded-full bg-flame px-[36px] text-[18px] font-semibold text-white lg:text-[20px]"
          >
            {content.cta.label}
            <ArrowRightIcon className="size-[30px]" />
          </a>
        </div>

        {/* Right — vertical step timeline */}
        <ol className="relative space-y-[24px] before:absolute before:bottom-[40px] before:left-[24px] before:top-[40px] before:w-[2px] before:bg-teal/40">
          {content.steps.map((step) => (
            <li key={step.title} className="relative flex gap-[16px] sm:gap-[24px]">
              <span
                className={`relative z-10 flex size-[50px] shrink-0 items-center justify-center rounded-full font-numeral text-[22px] leading-none ${
                  step.last ? "bg-deep text-white" : "border-2 border-teal bg-lite text-teal"
                }`}
              >
                {step.last ? <CheckCircleIcon className="size-[50px]" /> : step.numeral}
              </span>
              <div className="min-w-0 flex-1 rounded-[14px] bg-deep p-[20px] sm:p-[26px]">
                <div className="flex flex-col gap-[10px] sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <h3 className="min-w-0 font-heading text-[20px] font-semibold text-white sm:text-[22px]">{step.title}</h3>
                  <span className="w-fit shrink-0 rounded-full bg-mint px-[14px] py-[5px] text-[12px] font-semibold text-deep">
                    {step.meta}
                  </span>
                </div>
                <p className="mt-[14px] text-[15px] leading-[24px] text-white/90 sm:text-[16px] sm:leading-[26px]">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
