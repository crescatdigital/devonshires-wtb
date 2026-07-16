import { ArrowRightIcon } from "./icons";

export type ReasonsData = {
  eyebrow: string;
  headingBefore: string;
  headingAccent: string;
  subtext: string;
  cta: { label: string; href: string };
  cards: { numeral: string; title: string; text: string }[];
};

export default function ServiceReasons({ content }: { content: ReasonsData }) {
  return (
    <section className="bg-deep py-[36px] md:py-[52px] lg:py-[85px]">
      <div className="mx-auto max-w-[1750px] px-6 text-center">
        <div className="flex items-center justify-center gap-[24px]">
          <span className="hidden h-px w-[74px] bg-mint xl:block" />
          <p className="font-heading text-[20px] font-semibold uppercase text-mint lg:text-[26px]">
            {content.eyebrow}
          </p>
          <span className="hidden h-px w-[74px] bg-mint xl:block" />
        </div>
        <h2 className="mt-[16px] font-heading text-[32px] font-semibold leading-[1.15] text-white md:mt-[28px] md:text-[40px] lg:text-[92px]">
          {content.headingBefore}
          <br />
          <span className="heading-accent text-mint">{content.headingAccent}</span>
        </h2>
        <p className="mx-auto mt-[24px] max-w-[900px] text-[16px] leading-normal text-white md:mt-[50px] md:text-[18px] lg:text-[24px]">
          {content.subtext}
        </p>

        <div className="mt-[36px] grid grid-cols-1 gap-[16px] text-left sm:grid-cols-2 md:mt-[70px] md:gap-[24px] xl:grid-cols-4">
          {content.cards.map((card) => (
            <article
              key={card.title}
              className="relative flex min-h-0 flex-col rounded-[20px] border border-mint/60 bg-deeper p-[24px_24px_64px] md:min-h-[300px] md:rounded-[30px] md:p-[40px_40px_100px]"
            >
              <span className="bg-deep flex size-[56px] items-center justify-center rounded-full border-5 border-mint font-numeral text-[34px] leading-none text-mint pb-[12px] md:size-[80px] md:text-[48px]">
                {card.numeral}
              </span>
              <h3 className="mt-[18px] font-heading text-[22px] font-semibold text-white md:mt-[26px] md:text-[28px]">
                {card.title}
              </h3>
              <p className="mt-[14px] text-[16px] leading-[24px] text-white/90 md:mt-[20px] md:text-[18px] md:leading-[26px]">{card.text}</p>
              <span className="absolute bottom-[28px] mt-auto block h-[2px] w-[70px] bg-teal md:bottom-[40px]" />
            </article>
          ))}
        </div>

        <div className="mt-[32px] flex justify-center md:mt-[55px]">
          <a
            href={content.cta.href}
            className="flex h-[52px] items-center gap-[12px] rounded-full bg-flame px-[26px] text-[15px] font-semibold text-white md:h-[70px] md:px-[35px] md:text-[18px] lg:text-[20px]"
          >
            {content.cta.label}
            <ArrowRightIcon className="size-[22px] md:size-[30px]" />
          </a>
        </div>
      </div>
    </section>
  );
}
