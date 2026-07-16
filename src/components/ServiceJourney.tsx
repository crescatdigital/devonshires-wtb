import { ArrowRightIcon } from "./icons";

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
    <section className="bg-lite">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2">
        {/* Left — heading, checklist, CTA */}
        <div className="bg-deep px-[24px] py-[40px] md:p-[22em_4em_22em_8em]">
          <div className="flex items-center gap-[24px]">
            <span className="hidden h-px w-[74px] bg-teal xl:block" />
            <p className="font-heading text-[18px] font-semibold uppercase tracking-[0.04em] text-teal lg:text-[26px]">
              {content.eyebrow}
            </p>
            <span className="hidden h-px w-[74px] bg-teal xl:block" />
          </div>
          <h2 className="mt-[16px] font-heading text-[30px] font-semibold leading-[1.15] text-white md:mt-[30px] md:text-[40px] md:leading-[1.1] lg:text-[92px]">
            {content.headingBefore}
            <span className="heading-accent text-teal"> {content.headingAccent}</span>
            {content.headingAfter}
          </h2>
          <p className="mt-[20px] max-w-[684px] text-[16px] leading-[1.4] text-white md:mt-[60px] md:text-[18px] lg:text-[24px]">
            {content.subtext}
          </p>

          <div className="mt-[32px] rounded-[12px] border-2 border-[#14B8B0] bg-white px-[24px] py-[28px] md:mt-[110px] md:px-[80px] md:py-[70px]">
            <div className="flex items-center gap-[20px]">
              <span className="flex h-[44px] w-[44px] items-center justify-center rounded-[4px] border-2 border-[#14B8B0] text-[#14B8B0]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-[24px] w-[24px]"
                  fill="none"
                  aria-hidden
                >
                  <rect
                    x="4"
                    y="3"
                    width="16"
                    height="18"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 11l2.5 2.5L16 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <h3 className="font-heading text-[20px] font-semibold leading-[1.2] text-deep md:text-[34px]">
                {content.checklistTitle}
              </h3>
            </div>

            <ul className="mt-[20px] space-y-[10px] pl-[22px] text-[16px] leading-[1.5] text-deep md:mt-[36px] md:space-y-[18px] md:pl-[38px] md:text-[26px] md:leading-[1.55]">
              {content.checklist.map((item) => (
                <li key={item} className="list-disc marker:text-deep">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center mt-[28px] md:mt-[60px]">
            <a
              href={content.cta.href}
              className="mt-[8px] inline-flex h-[52px] items-center gap-[12px] rounded-full bg-flame px-[26px] text-[14px] font-semibold text-white md:mt-[36px] md:h-[63px] md:px-[36px] md:text-[18px] lg:text-[20px]"
            >
              {content.cta.label}
              <ArrowRightIcon className="size-[20px] md:size-[30px]" />
            </a>
          </div>
        </div>

        {/* Right — vertical step timeline */}
        <ol className="bg-mint px-[16px] py-[36px] relative space-y-[32px] md:p-[10em_7em_8em_2em] md:space-y-[60px]">
          {content.steps.map((step, i) => {
            const isEven = (i + 1) % 2 === 0;
            return (
            <li
              key={step.title}
              className={`relative flex gap-[16px] sm:gap-[24px] ${
                step.last
                  ? ""
                  : "before:absolute before:left-[27px] before:top-[27px] before:z-0 before:h-[calc(100%+32px)] before:w-[2px] before:bg-deep md:before:left-[42px] md:before:top-[42px] md:before:h-[calc(100%+60px)]"
              }`}
            >
              <span
              className={`relative z-10 flex size-[54px] shrink-0 items-center justify-center rounded-full border-deep font-numeral text-[20px] leading-none md:size-[85px] md:text-[32px] ${
                step.last
                  ? "border-[5px] bg-mint"
                  : `border-[3px] ${isEven ? "bg-white" : "bg-mint"} text-deep font-bold`
              }`}
            >
              {step.last ? (
                <span className="flex size-[40px] items-center justify-center rounded-full bg-deep md:size-[65px]">
                  <svg viewBox="0 0 30 30" className="size-[40px] md:size-[65px]" fill="none" aria-hidden>
                    <path
                      d="M9 15.5 13 19.5 21.5 11"
                      stroke="#f1fffd"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              ) : (
                step.numeral
              )}
            </span>
              <div className="min-w-0 flex-1 rounded-[10px] border-[3px] border-white bg-deep pt-[20px] pr-[16px] pb-[36px] pl-[24px] md:pt-[26px] md:pr-[26px] md:pb-[70px] md:pl-[50px]">
                <div className="flex flex-col gap-[10px] sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <h3 className="mt-[4px] min-w-0 font-heading text-[18px] font-semibold text-white md:mt-[30px] sm:text-[34px]">{step.title}</h3>
                  <span className="w-fit shrink-0 rounded-full bg-mint px-[14px] py-[6px] text-[13px] font-semibold text-deep md:px-[20px] md:py-[10px] md:text-[18px]">
                    {step.meta}
                  </span>
                </div>
                <p className="mt-[10px] mr-0 text-[15px] leading-[24px] text-white/90 md:mt-[14px] md:mr-[100px] sm:text-[22px] sm:leading-[1.5]">{step.text}</p>
              </div>
            </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
