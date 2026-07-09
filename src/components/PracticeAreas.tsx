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
    <section id="services" className="bg-ice py-[85px]">
      <div className="mx-auto max-w-[1810px] px-6">
        <SectionIntro
          scheme="light"
          eyebrow={content.eyebrow}
          headingLine1={content.headingLine1}
          headingLine2={content.headingLine2}
          intro={content.intro}
        />
        <div className="mt-[130px] flex flex-wrap justify-center gap-[20px]">
          {content.cards.map((card) => {
            // Cards whose title wraps to two lines shift their copy down,
            // exactly as in the Figma design (Power of Attorney card).
            const shift = "tallTitle" in card && card.tallTitle ? 59 : 0;
            return (
            <article
              key={card.title}
              className={`relative h-[1028px] w-[410px] rounded-[10px] border-2 ${
                card.highlighted
                  ? "border-teal bg-lite shadow-[2px_4px_4px_4px_rgba(0,0,0,0.1)]"
                  : "border-deep bg-white"
              }`}
            >
              {card.highlighted && (
                <div className="absolute inset-x-0 top-0 h-[11px] rounded-t-[10px] bg-teal" />
              )}
              <Image
                src={card.image.src}
                alt={card.image.alt}
                width={card.image.width}
                height={card.image.height}
                className="absolute left-[10px] top-[16px] size-[210px] object-cover"
              />
              <p
                className={`absolute right-[25px] top-[38px] font-numeral text-[86px] leading-none ${
                  card.highlighted ? "text-teal" : "text-teal/50"
                }`}
              >
                {card.numeral}
              </p>
              <h3 className="absolute left-[45px] top-[246px] font-heading text-[48px] font-semibold leading-[1.1] text-deep">
                {card.title}
              </h3>
              <p
                className="absolute left-[45px] w-[320px] text-[22px] leading-[35px] text-deep"
                style={{ top: 335 + shift }}
              >
                {card.description}
              </p>
              <ul
                className="absolute left-[45px] w-[350px] list-disc ps-[22px] text-[22px] leading-[50px] text-deep"
                style={{ top: 630 + shift }}
              >
                {card.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <div className="absolute left-[45px] top-[935px]">
                <a
                  href={card.link.href}
                  className={`flex items-center gap-[14px] font-heading text-[22px] font-semibold ${
                    card.highlighted ? "text-flame" : "text-deep"
                  }`}
                >
                  {card.link.label}
                  <ArrowRightIcon className="size-[24px]" />
                </a>
                <div
                  className={`mt-[18px] h-[2px] w-[200px] ${
                    card.highlighted ? "bg-flame" : "bg-deep"
                  }`}
                />
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
