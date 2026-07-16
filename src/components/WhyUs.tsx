import Image from "next/image";
import type { HubPageContent } from "@/lib/cms";

export default function WhyUs({ content }: { content: HubPageContent["whyUs"] }) {
  return (
    <section className="bg-lite pb-[52px] pt-[20px] lg:py-[85px]">
      <div className="mx-auto max-w-[1340px] px-6">
        <div className="flex items-center justify-center gap-[40px] xl:justify-start">
          <span className="hidden h-px w-[74px] bg-teal xl:block" />
          <p className="font-heading text-[20px] font-semibold uppercase text-teal lg:text-[26px]">
            {content.eyebrow}
          </p>
          <span className="hidden h-px w-[74px] bg-teal xl:block" />
        </div>
        <h2 className="mt-[12px] text-center font-heading text-[34px] font-semibold leading-[1.25] text-deep lg:mt-[30px] lg:text-[46px] xl:text-left xl:text-[55px]">
          {content.headingBefore}
          <span className="heading-accent text-teal">{content.headingAccent}</span>
          <span className="heading-accent text-deep">{content.headingAfter}</span>
        </h2>
        <div className="mt-[30px] grid grid-cols-1 divide-y divide-white/60 rounded-[30px] border border-lite bg-deep xl:mt-[50px] xl:grid-cols-3 xl:divide-x xl:divide-y-0">
          {content.columns.map((col) => (
            <div key={col.title} className="flex flex-col items-center p-[26px] xl:px-[40px] xl:pb-[55px] xl:pt-[30px]">
              <Image
                src={col.image.src}
                alt={col.image.alt}
                width={col.image.width}
                height={col.image.height}
                className="size-[150px] rounded-full"
              />
              <h3 className="mt-[22px] max-w-[321px] text-center text-[24px] font-semibold leading-[1.3] text-mint px-4 xl:mt-[35px] xl:text-[26px] xl:leading-normal">
                {col.title}
              </h3>
              <p className="mt-[20px] max-w-[341px] text-center text-[16px] leading-normal text-white xl:mt-[26px] xl:text-[20px]">
                {col.text}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-[39px] flex justify-center">
          <a
            href={content.cta.href}
            className="flex h-[44px] items-center whitespace-nowrap rounded-full bg-flame px-[18px] text-center text-[13px] font-semibold text-white md:h-[58px] md:whitespace-normal md:px-[38px] md:text-[17px] lg:text-[20px]"
          >
            {content.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
