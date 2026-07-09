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
    <section className="bg-deep py-[85px]">
      <div className="mx-auto max-w-[1810px] px-6">
        <SectionIntro
          scheme="dark"
          eyebrow={content.eyebrow}
          headingLine1={content.headingLine1}
          headingLine2={content.headingLine2}
          intro={content.intro}
        />
        <div className="mx-auto mt-[110px] grid max-w-[1761px] grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {content.boxes.map((box, i) => (
            <article
              key={box.title}
              className={`relative min-h-[431px] border border-mint p-[50px] ${
                i % 2 === 0 ? "bg-deeper" : "bg-deep"
              } ${CORNER_CLASSES[i] ?? ""}`}
            >
              <Image
                src={box.icon}
                alt=""
                width={85}
                height={85}
                className="size-[85px]"
              />
              <p className="absolute right-[50px] top-[44px] font-numeral text-[52px] leading-none text-teal">
                {box.numeral}
              </p>
              <h3 className="mt-[39px] font-heading text-[34px] font-semibold text-white">
                {box.title}
              </h3>
              <p className="mt-[25px] max-w-[483px] text-[22px] leading-[35px] text-white">
                {box.text}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-[62px] flex justify-center">
          <a
            href={content.cta.href}
            className="flex h-[76px] items-center gap-[12px] rounded-full bg-flame px-[35px] text-[20px] font-semibold text-white"
          >
            {content.cta.label}
            <ArrowRightIcon className="size-[32px]" />
          </a>
        </div>
      </div>
    </section>
  );
}
