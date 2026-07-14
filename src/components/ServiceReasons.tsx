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
    <section className="bg-deep py-[52px] lg:py-[85px]">
      <div className="mx-auto max-w-[1750px] px-6 text-center">
        <div className="flex items-center justify-center gap-[24px]">
          <span className="h-px w-[74px] bg-mint" />
          <p className="font-heading text-[20px] font-semibold uppercase text-mint lg:text-[26px]">
            {content.eyebrow}
          </p>
          <span className="h-px w-[74px] bg-mint" />
        </div>
        <h2 className="mt-[28px] font-heading text-[40px] font-semibold leading-[1.15] text-white lg:text-[92px]">
          {content.headingBefore}
          <br />
          <span className="heading-accent text-mint">{content.headingAccent}</span>
        </h2>
        <p className="mx-auto mt-[50px] max-w-[900px] text-[18px] leading-normal text-white lg:text-[24px]">
          {content.subtext}
        </p>

        <div className="mt-[70px] grid grid-cols-1 gap-[24px] text-left sm:grid-cols-2 xl:grid-cols-4">
          {content.cards.map((card) => (
            <article
              key={card.title}
              className="relative flex min-h-[300px] flex-col rounded-[30px] border border-mint/60 bg-deeper p-[40px_40px_100px]"
            >
              <span className="bg-deep flex size-[80px] items-center justify-center rounded-full border-5 border-mint font-numeral text-[48px] leading-none text-mint pb-[12px]">
                {card.numeral}
              </span>
              <h3 className="mt-[26px] font-heading text-[28px] font-semibold text-white">
                {card.title}
              </h3>
              <p className="mt-[20px] text-[18px] leading-[26px] text-white/90">{card.text}</p>
              <span className="absolute bottom-[40px] w-[80px] mt-auto block h-[2px] w-[70px] bg-teal" />
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
