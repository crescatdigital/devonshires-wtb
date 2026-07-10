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
    <section className="bg-lite py-[52px] lg:py-[95px]">
      <div className="mx-auto max-w-[1810px] px-6">
        <SectionIntro
          scheme="light"
          eyebrow={content.eyebrow}
          headingLine1={content.headingLine1}
          headingLine2={content.headingLine2}
        />
        <div className="mt-[95px] flex flex-wrap justify-center gap-[20px]">
          {content.cards.map((card) => (
            <article
              key={card.title}
              className="flex w-[410px] flex-col overflow-hidden rounded-[10px]"
            >
              <Image
                src={card.image.src}
                alt={card.image.alt}
                width={card.image.width}
                height={card.image.height}
                className="h-[210px] w-full object-cover"
              />
              <div className="h-[8px] bg-mint" />
              <div className="flex flex-1 flex-col items-start bg-deep px-[35px] pb-[40px] pt-[32px]">
                <p className="text-[18px] font-semibold tracking-[0.08em] text-mint">
                  {card.label}
                </p>
                <h3 className="mt-[18px] font-heading text-[36px] font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-[16px] text-[20px] leading-normal text-white">{card.text}</p>
                <a
                  href={card.link.href}
                  className="mt-auto flex items-center gap-[14px] pt-[30px] text-[24px] text-flame"
                >
                  {card.link.label}
                  <ArrowRightIcon className="size-[26px]" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
