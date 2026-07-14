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
    <section className="bg-ice py-[52px] lg:pt-[85px] lg:pb-[110px]">
      <div className="mx-auto grid max-w-[1690px] grid-cols-1 gap-[60px] px-6 lg:grid-cols-2 lg:gap-[110px]">
        {/* Left — heading + paragraphs */}
        <div>
          <div className="flex items-center gap-[30px]">
            <span className="h-px w-[74px] bg-teal" />
            <p className="font-heading text-[18px] font-semibold uppercase tracking-[0.04em] text-teal lg:text-[26px]">
              {content.eyebrow}
            </p>
            <span className="h-px w-[74px] bg-teal" />
          </div>
          <h2 className="mt-[24px] font-heading text-[38px] font-semibold leading-[1.3] text-deep lg:text-[65px]">
            {content.headingBefore}
            <span className="heading-accent text-teal"> {content.headingAccent} </span>
            {content.headingAfter}
          </h2>
          <div className="mt-[30px] space-y-[20px] text-[18px] leading-[1.4] text-deep lg:text-[24px]">
            {content.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* Right — included checklist card */}
        <div className="rounded-[30px] bg-white border border-mint p-[40px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] lg:p-[55px]">
          <p className="font-heading text-[20px] font-semibold uppercase tracking-[0.04em] text-deep lg:text-[26px]">
            {content.cardTitle}
          </p>
          <ul className="mt-[24px]">
            {content.checklist.map((item, i) => (
              <li
                key={item}
                className={`flex items-center gap-[18px] py-[18px] text-[22px] text-deep ${
                  i < content.checklist.length - 1 ? "border-b border-teal" : ""
                }`}
              >
                <CheckCircleIcon className="size-[44px] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
