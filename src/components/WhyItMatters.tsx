import Image from "next/image";
import type { HubPageContent } from "@/lib/cms";
import SectionIntro from "./SectionIntro";
import { ArrowRightIcon } from "./icons";

const CORNER_CLASSES: Record<number, string> = {
  0: "xl:rounded-tl-[10px]",
  2: "xl:rounded-tr-[10px]",
  3: "xl:rounded-bl-[10px]",
  5: "xl:rounded-br-[10px]",
};

export default function WhyItMatters({
  content,
}: {
  content: HubPageContent["whyItMatters"];
}) {
  return (
    <section className="bg-deep py-[30px] md:py-[52px] lg:py-[85px]">
      <div className="mx-auto max-w-[1810px] px-4 md:px-6">
        <SectionIntro
          scheme="dark"
          eyebrow={content.eyebrow}
          headingLine1={content.headingLine1}
          headingLine2={content.headingLine2}
          intro={content.intro}
          headingMtClassName="mt-[12px] md:mt-[28px]"
          introMtClassName="mt-[20px] md:mt-[50px]"
        />
        <div className="mx-auto mt-[32px] grid max-w-[1761px] grid-cols-1 gap-[12px] md:mt-[80px] md:grid-cols-2 md:gap-0 xl:grid-cols-3">
          {content.boxes.map((box, i) => (
            <article
              key={box.title}
              className={`relative rounded-[10px] border border-mint bg-deep px-[20px] pt-[20px] pb-[38px] md:min-h-[431px] md:rounded-none md:p-[50px] ${
                i % 2 === 0 ? "md:bg-deeper" : ""
              } ${CORNER_CLASSES[i] ?? ""}`}
            >
              <Image
                src={box.icon}
                alt=""
                width={85}
                height={85}
                className="size-[48px] md:size-[85px]"
              />
              <p className="absolute right-[24px] top-[26px] font-numeral text-[40px] leading-none text-teal md:right-[50px] md:top-[44px] md:text-[52px]">
                {box.numeral}
              </p>
              <h3 className="mt-[22px] font-heading text-[26px] font-semibold leading-[1.2] text-white md:mt-[39px] md:text-[34px] md:leading-[1.5]">
                {box.title}
              </h3>
              <p className="mt-[14px] max-w-[483px] text-[16px] leading-[26px] text-white md:mt-[25px] md:text-[22px] md:leading-[35px]">
                {box.text}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-[30px] flex justify-center md:mt-[62px]">
          <a
            href={content.cta.href}
            className="flex h-[44px] items-center gap-[12px] rounded-full bg-flame px-[26px] text-[14px] font-semibold tracking-[0.02em] text-white md:h-[76px] md:px-[35px] md:text-[20px] md:tracking-normal"
          >
            {content.cta.label}
            <ArrowRightIcon className="hidden size-[32px] md:block" />
          </a>
        </div>
      </div>
    </section>
  );
}
