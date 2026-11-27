import Image from "next/image";
import type { HubPageContent } from "@/lib/cms";
import SectionIntro from "./SectionIntro";
import RichText from "./RichText";
import { ArrowRightIcon } from "./icons";

export default function ServicesGrid({
  content,
}: {
  content: HubPageContent["services"];
}) {
  // The homepage shows all four services; other pages show the other three.
  const three = content.cards.length < 4;

  return (
    <section className="bg-lite pb-[52px] pt-[30px] lg:py-[95px]">
      <div className="mx-auto max-w-[1810px] px-4 md:px-6">
        <SectionIntro
          scheme="light"
          eyebrow={content.eyebrow}
          headingLine1={content.headingLine1}
          headingLine2={content.headingLine2}
          headingClassName="text-[38px] leading-[1.14] md:text-[44px] lg:text-[68px] xl:text-[92px]"
          headingMtClassName="mt-[10px] md:mt-[28px]"
        />
        {/* Mobile: 1 column. Homepage (4 cards): 2×2 on tablet, one row of 4
            from xl. Other pages (3 cards): one row of 3 from tablet up, with
            slightly smaller type on narrow tablets (768–1023px) so the
            three cards fit. */}
        <div
          className={`mt-[30px] grid grid-cols-1 gap-[20px] md:mt-[60px] ${
            three ? "md:grid-cols-3" : "md:grid-cols-2 xl:grid-cols-4"
          }`}
        >
          {content.cards.map((card) => (
            <article key={card.title} className="flex flex-col overflow-hidden rounded-[30px]">
              <Image
                src={card.image.src}
                alt={card.image.alt}
                width={card.image.width}
                height={card.image.height}
                className={`h-[120px] w-full object-cover ${three ? "md:h-[150px] lg:h-[210px]" : "md:h-[210px]"}`}
              />
              <div className="h-[5px] bg-mint md:h-[8px]" />
              <div
                className={`flex flex-1 flex-col items-start bg-deep px-[24px] pb-[28px] pt-[24px] ${
                  three
                    ? "md:px-[22px] md:pb-[30px] md:pt-[24px] lg:px-[35px] lg:pb-[40px] lg:pt-[32px]"
                    : "md:px-[35px] md:pb-[40px] md:pt-[32px]"
                }`}
              >
                <p
                  className={`text-[16px] font-semibold tracking-[0.08em] text-mint ${
                    three ? "lg:text-[22px]" : "md:text-[22px]"
                  }`}
                >
                  {card.label}
                </p>
                <h3
                  className={`mt-[12px] font-heading text-[34px] text-white ${
                    three ? "md:text-[30px] lg:mt-[18px] lg:text-[45px]" : "md:mt-[18px] md:text-[45px]"
                  }`}
                >
                  <RichText html={card.title} inline />
                </h3>
                <RichText
                  html={card.text}
                  className={`mt-[10px] text-[16px] leading-normal text-white ${
                    three ? "md:text-[17px] lg:mt-[16px] lg:text-[24px]" : "md:mt-[16px] md:text-[24px]"
                  }`}
                />
                <a
                  href={card.link.href}
                  className={`mt-auto flex items-center gap-[14px] pt-[20px] text-[21px] text-flame ${
                    three ? "md:gap-[8px] md:whitespace-nowrap md:text-[18px] lg:gap-[14px] lg:pt-[30px] lg:text-[32px]" : "md:pt-[30px] md:text-[32px]"
                  }`}
                >
                  {card.link.label}
                  <ArrowRightIcon className="relative right-[6px] top-[2px] size-[28px] md:static md:size-[26px]" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
