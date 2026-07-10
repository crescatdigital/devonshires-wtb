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
    <section className="bg-deep py-[85px]">
      <div className="mx-auto max-w-[1400px] px-6 text-center">
        <div className="flex items-center justify-center gap-[24px]">
          <span className="h-px w-[74px] bg-mint" />
          <p className="font-heading text-[20px] font-semibold uppercase text-mint lg:text-[26px]">
            {content.eyebrow}
          </p>
          <span className="h-px w-[74px] bg-mint" />
        </div>
        <h2 className="mt-[28px] font-heading text-[40px] font-semibold leading-[1.15] text-white lg:text-[64px]">
          {content.headingBefore}
          <br />
          <span className="heading-accent text-mint">{content.headingAccent}</span>
        </h2>
        <p className="mx-auto mt-[28px] max-w-[900px] text-[18px] leading-normal text-white lg:text-[22px]">
          {content.subtext}
        </p>

        <div className="mt-[70px] grid grid-cols-1 gap-[24px] text-left sm:grid-cols-2 xl:grid-cols-4">
          {content.cards.map((card) => (
            <article
              key={card.title}
              className="flex min-h-[300px] flex-col rounded-[16px] border border-mint/60 bg-deeper p-[32px]"
            >
              <span className="flex size-[64px] items-center justify-center rounded-full border-2 border-mint font-numeral text-[36px] leading-none text-mint">
                {card.numeral}
              </span>
              <h3 className="mt-[26px] font-heading text-[24px] font-semibold text-white">
                {card.title}
              </h3>
              <p className="mt-[16px] text-[16px] leading-[26px] text-white/90">{card.text}</p>
              <span className="mt-auto block h-[2px] w-[70px] bg-teal pt-[20px]" />
            </article>
          ))}
        </div>

        <div className="mt-[55px] flex justify-center">
          <a
            href={content.cta.href}
            className="flex h-[70px] items-center gap-[12px] rounded-full bg-flame px-[35px] text-[18px] font-semibold text-white lg:text-[20px]"
          >
            {content.cta.label}
            <ArrowRightIcon className="size-[30px]" />
          </a>
        </div>
      </div>
    </section>
  );
}
