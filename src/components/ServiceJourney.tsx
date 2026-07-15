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
        <div className="bg-deep p-[22em_4em_22em_8em]">
          <div className="flex items-center gap-[24px]">
            <span className="h-px w-[74px] bg-teal" />
            <p className="font-heading text-[18px] font-semibold uppercase tracking-[0.04em] text-teal lg:text-[26px]">
              {content.eyebrow}
            </p>
            <span className="h-px w-[74px] bg-teal" />
          </div>
          <h2 className="mt-[30px] font-heading text-[40px] font-semibold leading-[1.1] text-white lg:text-[92px]">
            {content.headingBefore}
            <span className="heading-accent text-teal"> {content.headingAccent}</span>
            {content.headingAfter}
          </h2>
          <p className="mt-[60px] max-w-[684px] text-[18px] leading-[1.4] text-white lg:text-[24px]">
            {content.subtext}
          </p>

          <div className="mt-[110px] rounded-[12px] border-2 border-[#14B8B0] bg-white px-[80px] py-[70px]">
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

              <h3 className="font-heading text-[34px] font-semibold leading-[1.2] text-deep">
                {content.checklistTitle}
              </h3>
            </div>

            <ul className="mt-[36px] space-y-[18px] pl-[38px] text-[26px] leading-[1.55] text-deep">
              {content.checklist.map((item) => (
                <li key={item} className="list-disc marker:text-deep">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center mt-[60px]">
            <a
              href={content.cta.href}
              className="mt-[36px] inline-flex h-[63px] items-center gap-[12px] rounded-full bg-flame px-[36px] text-[18px] font-semibold text-white lg:text-[20px]"
            >
              {content.cta.label}
              <ArrowRightIcon className="size-[30px]" />
            </a>
          </div>
        </div>

        {/* Right — vertical step timeline */}
        <ol className="bg-mint p-[10em_7em_8em_2em] relative space-y-[60px]">
          {content.steps.map((step, i) => {
            const isEven = (i + 1) % 2 === 0;
            return (
            <li
              key={step.title}
              className={`relative flex gap-[16px] sm:gap-[24px] ${
                step.last
                  ? ""
                  : "before:absolute before:left-[42px] before:top-[42px] before:z-0 before:h-[calc(100%+60px)] before:w-[2px] before:bg-deep"
              }`}
            >
              <span
              className={`relative z-10 flex size-[85px] shrink-0 items-center justify-center rounded-full border-deep font-numeral text-[32px] leading-none ${
                step.last
                  ? "border-[5px] bg-mint"
                  : `border-[3px] ${isEven ? "bg-white" : "bg-mint"} text-deep font-bold`
              }`}
            >
              {step.last ? (
                <span className="flex size-[65px] items-center justify-center rounded-full bg-deep">
                  <svg viewBox="0 0 30 30" className="size-[65px]" fill="none" aria-hidden>
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
              <div className="min-w-0 flex-1 rounded-[10px] border-[3px] border-white bg-deep pt-[26px] pr-[26px] pb-[70px] pl-[50px]">
                <div className="flex flex-col gap-[10px] sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <h3 className="mt-[30px] min-w-0 font-heading text-[20px] font-semibold text-white sm:text-[34px]">{step.title}</h3>
                  <span className="w-fit shrink-0 rounded-full bg-mint px-[20px] py-[10px] text-[18px] font-semibold text-deep">
                    {step.meta}
                  </span>
                </div>
                <p className="mt-[14px] mr-[100px] text-[15px] leading-[24px] text-white/90 sm:text-[22px] sm:leading-[1.5]">{step.text}</p>
              </div>
            </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
