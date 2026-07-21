"use client";

import { useState } from "react";
import Image from "next/image";
import type { HubPageContent } from "@/lib/cms";
import { ArrowRightIcon, ChevronCircleIcon } from "./icons";

export type FaqData = HubPageContent["faq"];

export default function FaqSection({
  content,
  variant = "dark",
}: {
  content: FaqData;
  variant?: "dark" | "light";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const light = variant === "light";

  const sectionBg = light ? "bg-lite" : "bg-deep";

  // Light variant: columns are colour-swapped on MOBILE only (restored at md).
  // Left column — deep bg on mobile (mint eyebrow/accent, white text), mint bg from md.
  const eyebrowColor = light ? "text-mint md:text-deep" : "text-mint";
  const eyebrowLine = light ? "bg-mint md:bg-deep" : "bg-mint";
  const accentColor = light ? "text-mint md:text-deep" : "text-mint";
  const introColor = light ? "text-white md:text-deep" : "text-white";

  // Right column — mint bg on mobile (dark text/dividers), deep bg from md (white text).
  const headingColor = light ? "text-deep md:text-white" : "text-white";
  const bodyColor = light ? "text-deep md:text-white" : "text-white";
  const dividerColor = light ? "border-deep md:border-mint" : "border-mint";
  const topDivider = light ? "bg-deep md:bg-mint" : "bg-mint";

  return (
    <section className={`${sectionBg} ${ light ? "" : "pt-[30px] pb-[70px] lg:pt-[93px] lg:pb-[130px]" }`} >
      <div className={`mx-auto flex flex-col justify-between xl:flex-row ${light ? "w-full" : "max-w-[1810px] gap-[40px] px-4 md:gap-[60px] md:px-6 xl:gap-[124px] xl:px-[20px]"}`}>
        {/* Left column — intro + contact form */}
        <div className={`w-full ${light ? "bg-deep px-[20px] pt-[36px] pb-[60px] md:bg-mint md:pb-[8em] md:pl-[8em] md:pr-[4em] md:pt-[5em] xl:flex-1" : "max-w-[791px]"}`}>
          <div className="flex items-center justify-center gap-[24px] xl:justify-start">
            <span className={`hidden h-px w-[74px] xl:block ${eyebrowLine}`} />
            <p className={`font-heading text-[20px] font-semibold uppercase lg:text-[26px] ${eyebrowColor}`}>
              {content.eyebrow}
            </p>
            <span className={`hidden h-px w-[74px] xl:block ${eyebrowLine}`} />
          </div>
          <h2 className="mt-[12px] text-center font-heading text-[44px] font-semibold leading-[1] text-white md:mt-[33px] md:text-left md:leading-[1.14] lg:text-[68px] xl:text-[92px]">
            {content.headingLine1}
            <br />
            <span className={`heading-accent ${accentColor}`}>{content.headingLine2}</span>
          </h2>
          <p className={`mt-[18px] text-center text-[16px] leading-normal md:mt-[46px] md:text-left md:text-[18px] lg:text-[24px] ${introColor}`}>
            {content.intro}
          </p>

          <form
            className="mt-[30px] rounded-[10px] border border-mint bg-deeper p-[22px] md:mt-[53px] md:p-[30px] lg:p-[60px]"
            action="#"
            method="post"
          >
            <div className="flex flex-row items-start gap-[16px] md:flex-col md:items-stretch md:gap-6 lg:flex-row lg:items-start lg:gap-[35px]">
              <Image
                src="/images/icon-mail-review.svg"
                alt=""
                width={85}
                height={85}
                className="size-[42px] shrink-0 md:size-[85px]"
              />
              <h3 className="max-w-[525px] font-heading text-[22px] font-semibold leading-[1.3] text-white md:text-[26px] lg:text-[34px]">
                {content.formCard.title}
              </h3>
            </div>
            <p className="mt-[16px] text-[16px] leading-[24px] text-white md:mt-[28px] md:text-[22px] md:leading-[35px]">
              {content.formCard.subtitle}
            </p>
            <div className="mt-[28px] grid grid-cols-2 gap-[14px] md:mt-[40px] md:grid-cols-1 md:gap-[30px] lg:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder={content.formCard.placeholders.name}
                className="h-[35px] rounded-[20px] border-2 border-white bg-mint px-[16px] text-[13px] text-deeper placeholder:text-deeper focus:outline-none md:h-[50px] md:px-[27px] md:text-[16px]"
              />
              <input
                type="tel"
                name="phone"
                placeholder={content.formCard.placeholders.phone}
                className="h-[35px] rounded-[20px] border-2 border-white bg-mint px-[16px] text-[13px] text-deeper placeholder:text-deeper focus:outline-none md:h-[50px] md:px-[27px] md:text-[16px]"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder={content.formCard.placeholders.email}
              className="mt-[16px] h-[35px] w-full rounded-[20px] border-2 border-white bg-mint px-[16px] text-[13px] text-deeper placeholder:text-deeper focus:outline-none md:mt-[30px] md:h-[50px] md:px-[27px] md:text-[16px]"
            />
            <textarea
              name="message"
              placeholder={content.formCard.placeholders.message}
              className="mt-[16px] h-[100px] w-full resize-none rounded-[20px] border-2 border-white bg-mint px-[16px] py-[10px] text-[13px] text-deeper placeholder:text-deeper focus:outline-none md:mt-[30px] md:h-[137px] md:px-[27px] md:py-[12px] md:text-[16px]"
            />
            <div className="mt-[8px] flex justify-center md:mt-[45px]">
              <button
                type="submit"
                className="flex h-[40px] items-center gap-[12px] rounded-full bg-flame px-[24px] text-[14px] font-semibold text-white md:h-[63px] md:px-[36px] md:text-[20px]"
              >
                {content.formCard.submitLabel}
                <ArrowRightIcon className="hidden size-[32px] md:block" />
              </button>
            </div>
          </form>
        </div>

        {/* Right column — FAQ accordion */}
        <div className={`w-full ${light ? "bg-mint px-[20px] pt-[36px] pb-[60px] md:bg-deep md:pb-[8em] md:pl-[5em] md:pr-[7em] md:pt-[7em] xl:flex-1" : "max-w-[845px] xl:pt-[25px]"}`}>
          <div className={`h-px w-full ${topDivider}`} />
          {content.items.map((item, i) => {
            const isOpen = openIndex === i;
            const hasAnswer = item.answer.trim().length > 0;
            return (
              <div key={item.question} className={`border-b ${dividerColor}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-6 py-[16px] text-left md:py-[30px]"
                >
                  <span className={`max-w-[672px] font-heading text-[20px] font-semibold leading-normal lg:text-[24px] ${headingColor}`}>
                    {item.question}
                  </span>
                  {light ? (
                    <>
                      {/* Mobile: mint column → dark-toned chevron */}
                      <ChevronCircleIcon className="size-[32px] shrink-0 md:hidden" open={isOpen} variant="onLight" />
                      {/* md+: deep column → original mint-toned chevron */}
                      <ChevronCircleIcon className="hidden shrink-0 md:block md:size-[50px]" open={isOpen} variant="onDark" />
                    </>
                  ) : (
                    <ChevronCircleIcon className="size-[32px] shrink-0 md:size-[50px]" open={isOpen} variant="onDark" />
                  )}
                </button>
                {isOpen && hasAnswer && (
                  <div className={`whitespace-pre-line pr-0 text-[16px] leading-[26px] md:pr-[70px] md:text-[18px] md:leading-[35px] ${light ? "mt-[12px] pb-[24px] md:mt-[2em] md:pb-[6em]" : "pb-[24px] md:pb-[36px]"} ${bodyColor}`}>
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
