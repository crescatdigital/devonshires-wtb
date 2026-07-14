import Image from "next/image";
import type { HubPageContent } from "@/lib/cms";

export default function WhyUs({ content }: { content: HubPageContent["whyUs"] }) {
  return (
    <section className="bg-lite py-[52px] lg:py-[85px]">
      <div className="mx-auto max-w-[1340px] px-6">
        <div className="flex items-center gap-[40px]">
          <span className="h-px w-[74px] bg-teal" />
          <p className="font-heading text-[20px] font-semibold uppercase text-teal lg:text-[26px]">
            {content.eyebrow}
          </p>
          <span className="h-px w-[74px] bg-teal" />
        </div>
        <h2 className="mt-[30px] font-heading text-[34px] font-semibold leading-[1.25] text-deep lg:text-[46px] xl:text-[55px]">
          {content.headingBefore}
          <span className="heading-accent text-teal">{content.headingAccent}</span>
          <span className="heading-accent text-deep">{content.headingAfter}</span>
        </h2>
        <div className="mt-[50px] grid grid-cols-1 divide-y divide-white/60 rounded-[30px] border border-lite bg-deep xl:grid-cols-3 xl:divide-x xl:divide-y-0">
          {content.columns.map((col) => (
            <div key={col.title} className="flex flex-col items-center px-[40px] pb-[55px] pt-[30px]">
              <Image
                src={col.image.src}
                alt={col.image.alt}
                width={col.image.width}
                height={col.image.height}
                className="size-[150px] rounded-full"
              />
              <h3 className="mt-[35px] max-w-[321px] text-center text-[26px] font-semibold text-mint px-4">
                {col.title}
              </h3>
              <p className="mt-[26px] max-w-[341px] text-center text-[20px] leading-normal text-white">
                {col.text}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-[39px] flex justify-center">
          <a
            href={content.cta.href}
            className="flex h-[58px] items-center rounded-full bg-flame px-[38px] text-center text-[17px] font-semibold text-white lg:text-[20px]"
          >
            {content.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
