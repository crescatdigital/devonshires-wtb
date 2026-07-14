import Image from "next/image";
import type { HubPageContent } from "@/lib/cms";
import SectionIntro from "./SectionIntro";
import { ArrowRightIcon } from "./icons";

export default function PracticeAreas({
  content,
}: {
  content: HubPageContent["practiceAreas"];
}) {
  return (
    <section id="services" className="bg-ice py-[52px] lg:py-[85px]">
      <div className="mx-auto max-w-[1810px] px-6">
        <SectionIntro
          scheme="light"
          eyebrow={content.eyebrow}
          headingLine1={content.headingLine1}
          headingLine2={content.headingLine2}
          intro={content.intro}
        />
        <div className="mt-[50px] flex flex-wrap justify-center gap-[20px] lg:mt-[70px]">
          {content.cards.map((card) => (
            <article
              key={card.title}
              className={`relative flex w-full max-w-[410px] flex-col rounded-[10px] border-2 p-[30px] xl:p-[25px_10px_0_10px] ${
                card.highlighted
                  ? "border-teal bg-lite shadow-[2px_4px_4px_4px_rgba(0,0,0,0.1)]"
                  : "border-deep bg-white"
              }`}
            >
              {card.highlighted && (
                <div className="absolute inset-x-0 top-0 h-[11px] rounded-t-[10px] bg-teal" />
              )}

              <div className="flex items-start justify-between xl:pr-[20px]">
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  width={card.image.width}
                  height={card.image.height}
                  className="size-[150px] object-cover xl:size-[210px]"
                />
                <span
                  className={`font-numeral text-[64px] leading-none xl:text-[86px] ${
                    card.highlighted ? "text-teal" : "text-teal/50"
                  }`}
                >
                  {card.numeral}
                </span>
              </div>
              <div className="px-[35px] py-[0] xl:pt-0 xl:px-[35px] xl:pb-[160px]">
                <h3 className="mt-[16px] font-heading text-[34px] font-semibold leading-[1.3] text-deep xl:mt-[24px] xl:text-[48px]">
                  {card.title}
                </h3>
                <p className="mt-[16px] text-[18px] leading-[28px] text-deep xl:mt-[22px] xl:text-[22px] xl:leading-[35px]">
                  {card.description}
                </p>
                <ul className="mt-[16px] list-disc ps-[22px] text-[18px] leading-[34px] text-deep xl:mt-[22px] xl:text-[22px] xl:leading-[50px]">
                  {card.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>

                <div className="mt-[26px] xl:mt-auto xl:pt-[30px] absolute bottom-[52px]">
                  <a
                    href={card.link.href}
                    className={`flex items-center gap-[14px] font-heading text-[20px] font-semibold xl:text-[22px] ${
                      card.highlighted ? "text-flame" : "text-deep"
                    }`}
                  >
                    {card.link.label}
                    <ArrowRightIcon className="size-[24px]" />
                  </a>
                  <div
                    className={`mt-[18px] h-[2px] w-[200px] max-w-full ${
                      card.highlighted ? "bg-flame" : "bg-teal"
                    }`}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
