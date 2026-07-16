import Image from "next/image";
import type { HubPageContent } from "@/lib/cms";
import SectionIntro from "./SectionIntro";
import { ArrowRightIcon } from "./icons";

export default function ServicesGrid({
  content,
}: {
  content: HubPageContent["services"];
}) {
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
        <div className="mt-[30px] flex flex-wrap justify-between gap-[20px] md:mt-[60px]">
          {content.cards.map((card) => (
            <article
              key={card.title}
              className="flex min-w-full flex-1 flex-col overflow-hidden rounded-[30px] md:min-w-[410px]"
            >
              <Image
                src={card.image.src}
                alt={card.image.alt}
                width={card.image.width}
                height={card.image.height}
                className="h-[120px] w-full object-cover md:h-[210px]"
              />
              <div className="h-[5px] bg-mint md:h-[8px]" />
              <div className="flex flex-1 flex-col items-start bg-deep px-[24px] pb-[28px] pt-[24px] md:px-[35px] md:pb-[40px] md:pt-[32px]">
                <p className="text-[16px] font-semibold tracking-[0.08em] text-mint md:text-[22px]">
                  {card.label}
                </p>
                <h3 className="mt-[12px] font-heading text-[34px] text-white md:mt-[18px] md:text-[45px]">
                  {card.title}
                </h3>
                <p className="mt-[10px] text-[16px] leading-normal text-white md:mt-[16px] md:text-[24px]">{card.text}</p>
                <a
                  href={card.link.href}
                  className="mt-auto flex items-center gap-[14px] pt-[20px] text-[21px] text-flame md:pt-[30px] md:text-[32px]"
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
