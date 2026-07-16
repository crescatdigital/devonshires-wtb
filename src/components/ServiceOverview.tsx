import { CheckCircleIcon } from "./icons";

export type OverviewData = {
  eyebrow: string;
  headingBefore: string;
  headingAccent: string;
  headingAfter: string;
  paragraphs: string[];
  cardTitle: string;
  checklist: string[];
};

export default function ServiceOverview({ content }: { content: OverviewData }) {
  return (
    <section className="bg-ice py-[36px] md:py-[52px] lg:pt-[85px] lg:pb-[110px]">
      <div className="mx-auto grid max-w-[1690px] grid-cols-1 gap-[32px] px-6 md:gap-[60px] lg:grid-cols-2 lg:gap-[110px]">
        {/* Left — heading + paragraphs */}
        <div>
          <div className="flex items-center gap-[30px]">
            <span className="hidden h-px w-[74px] bg-teal xl:block" />
            <p className="font-heading text-[16px] font-semibold uppercase tracking-[0.04em] text-teal md:text-[18px] lg:text-[26px]">
              {content.eyebrow}
            </p>
            <span className="hidden h-px w-[74px] bg-teal xl:block" />
          </div>
          <h2 className="mt-[16px] font-heading text-[30px] font-semibold leading-[1.3] text-deep md:mt-[24px] md:text-[38px] lg:text-[65px]">
            {content.headingBefore}
            <span className="heading-accent text-teal"> {content.headingAccent} </span>
            {content.headingAfter}
          </h2>
          <div className="mt-[20px] space-y-[16px] text-[16px] leading-[1.5] text-deep md:mt-[30px] md:space-y-[20px] md:text-[18px] md:leading-[1.4] lg:text-[24px]">
            {content.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* Right — included checklist card */}
        <div className="rounded-[20px] bg-white border border-mint p-[24px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] md:rounded-[30px] md:p-[40px] lg:p-[55px]">
          <p className="font-heading text-[17px] font-semibold uppercase tracking-[0.04em] text-deep md:text-[20px] lg:text-[26px]">
            {content.cardTitle}
          </p>
          <ul className="mt-[16px] md:mt-[24px]">
            {content.checklist.map((item, i) => (
              <li
                key={item}
                className={`flex items-center gap-[12px] py-[13px] text-[16px] leading-[1.3] text-deep md:gap-[18px] md:py-[18px] md:text-[22px] ${
                  i < content.checklist.length - 1 ? "border-b border-teal" : ""
                }`}
              >
                <CheckCircleIcon className="size-[30px] shrink-0 md:size-[44px]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
