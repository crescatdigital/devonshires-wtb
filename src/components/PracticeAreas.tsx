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
          hideMobileLines
        />
        <div className="mt-[50px] flex flex-wrap justify-center gap-[20px] lg:mt-[70px]">
          {content.cards.map((card) => (
            <article
              key={card.title}
              className={`relative w-full max-w-[410px] flex-col rounded-[16px] border-2 p-[20px] xl:rounded-[10px] xl:p-[25px_10px_0_10px] ${
                card.title === "Power of Attorney" ? "hidden xl:flex" : "flex"
              } ${
                card.highlighted
                  ? "border-teal bg-white shadow-[2px_4px_4px_4px_rgba(0,0,0,0.1)] xl:bg-lite"
                  : "border-deep bg-white"
              }`}
            >
              {card.highlighted && (
                <div className="absolute inset-x-0 top-0 h-[11px] rounded-t-[16px] bg-teal xl:rounded-t-[10px]" />
              )}

              {/* Mobile header — shield left, numeral + title on the right */}
              <div className="flex gap-[0] xl:hidden">
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  width={card.image.width}
                  height={card.image.height}
                  className="size-[140px] shrink-0 object-cover"
                />
                <div className="flex min-w-0 flex-1 flex-col">
                  <span
                    className={`self-end font-numeral text-[56px] leading-none ${
                      card.highlighted ? "text-teal" : "text-teal/50"
                    }`}
                  >
                    {card.numeral}
                  </span>
                  <h3 className="mt-auto font-heading text-[36px] font-semibold leading-[1.1] text-deep">
                    {card.title}
                  </h3>
                </div>
              </div>

              {/* Desktop header — image + numeral (title sits below) */}
              <div className="hidden items-start justify-between xl:flex xl:pr-[20px]">
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  width={card.image.width}
                  height={card.image.height}
                  className="size-[210px] object-cover"
                />
                <span
                  className={`font-numeral text-[86px] leading-none ${
                    card.highlighted ? "text-teal" : "text-teal/50"
                  }`}
                >
                  {card.numeral}
                </span>
              </div>

              <div className="mt-[18px] xl:mt-0 xl:px-[35px] xl:pb-[160px] xl:pt-0">
                <h3 className="hidden font-heading text-[48px] font-semibold leading-[1.3] text-deep xl:mt-[24px] xl:block">
                  {card.title}
                </h3>
                <p className="text-[17px] leading-[26px] text-deep xl:mt-[22px] xl:text-[22px] xl:leading-[35px]">
                  {card.description}
                </p>
                <ul className="mt-[16px] list-disc ps-[22px] text-[17px] font-semibold leading-[32px] text-deep xl:mt-[22px] xl:text-[22px] xl:font-normal xl:leading-[50px]">
                  {card.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>

                <div className="relative ml-auto mt-[26px] w-fit xl:absolute xl:bottom-[52px] xl:ml-0 xl:mt-auto xl:w-auto xl:pt-[30px]">
                  <a
                    href={card.link.href}
                    className={`flex items-center gap-[14px] font-heading text-[20px] font-semibold xl:text-[22px] ${
                      card.highlighted ? "text-flame" : "text-flame xl:text-deep"
                    }`}
                  >
                    {card.link.label}
                    <ArrowRightIcon className="size-[24px]" />
                  </a>
                  <div
                    className={`mt-[18px] h-[2px] w-full max-w-full xl:w-[200px] ${
                      card.highlighted ? "bg-flame" : "bg-flame xl:bg-teal"
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
