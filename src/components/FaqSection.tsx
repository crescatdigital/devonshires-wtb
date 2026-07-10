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
  const headingColor = light ? "text-deep" : "text-white";
  const bodyColor = light ? "text-deep" : "text-white";
  const dividerColor = light ? "border-deep/20" : "border-white/60";

  return (
    <section className={`${sectionBg} py-[52px] lg:py-[93px]`}>
      <div className="mx-auto flex max-w-[1810px] flex-col gap-[60px] px-6 xl:flex-row xl:gap-[124px] xl:px-[125px]">
        {/* Left column — intro + contact form */}
        <div className="w-full max-w-[791px]">
          <div className="flex items-center gap-[24px]">
            <span className="h-px w-[74px] bg-teal" />
            <p className="font-heading text-[20px] font-semibold uppercase text-teal lg:text-[26px]">
              {content.eyebrow}
            </p>
            <span className="h-px w-[74px] bg-teal" />
          </div>
          <h2 className={`mt-[33px] font-heading text-[44px] font-semibold leading-[1.14] lg:text-[68px] xl:text-[92px] ${headingColor}`}>
            {content.headingLine1}
            <br />
            <span className="heading-accent text-teal">{content.headingLine2}</span>
          </h2>
          <p className={`mt-[46px] text-[18px] leading-normal lg:text-[24px] ${bodyColor}`}>
            {content.intro}
          </p>

          <form
            className="mt-[63px] rounded-[10px] border border-mint bg-deeper p-[30px] lg:p-[60px]"
            action="#"
            method="post"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-[35px]">
              <Image
                src="/images/icon-mail-review.svg"
                alt=""
                width={85}
                height={85}
                className="size-[85px] shrink-0"
              />
              <h3 className="max-w-[525px] font-heading text-[26px] font-semibold leading-[1.3] text-white lg:text-[34px]">
                {content.formCard.title}
              </h3>
            </div>
            <p className="mt-[28px] text-[22px] leading-[35px] text-white">
              {content.formCard.subtitle}
            </p>
            <div className="mt-[40px] grid grid-cols-1 gap-[30px] lg:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder={content.formCard.placeholders.name}
                className="h-[50px] rounded-[20px] border-2 border-white bg-mint px-[27px] text-[16px] text-deeper placeholder:text-deeper focus:outline-none"
              />
              <input
                type="tel"
                name="phone"
                placeholder={content.formCard.placeholders.phone}
                className="h-[50px] rounded-[20px] border-2 border-white bg-mint px-[27px] text-[16px] text-deeper placeholder:text-deeper focus:outline-none"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder={content.formCard.placeholders.email}
              className="mt-[30px] h-[50px] w-full rounded-[20px] border-2 border-white bg-mint px-[27px] text-[16px] text-deeper placeholder:text-deeper focus:outline-none"
            />
            <textarea
              name="message"
              placeholder={content.formCard.placeholders.message}
              className="mt-[30px] h-[137px] w-full resize-none rounded-[20px] border-2 border-white bg-mint px-[27px] py-[12px] text-[16px] text-deeper placeholder:text-deeper focus:outline-none"
            />
            <div className="mt-[45px] flex justify-center">
              <button
                type="submit"
                className="flex h-[63px] items-center gap-[12px] rounded-full bg-flame px-[36px] text-[20px] font-semibold text-white"
              >
                {content.formCard.submitLabel}
                <ArrowRightIcon className="size-[32px]" />
              </button>
            </div>
          </form>
        </div>

        {/* Right column — FAQ accordion */}
        <div className="w-full max-w-[767px] xl:pt-[111px]">
          <div className={`h-px w-full ${light ? "bg-deep/20" : "bg-white/60"}`} />
          {content.items.map((item, i) => {
            const isOpen = openIndex === i;
            const hasAnswer = item.answer.trim().length > 0;
            return (
              <div key={item.question} className={`border-b ${dividerColor}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-[30px] text-left"
                >
                  <span className={`max-w-[672px] font-heading text-[20px] font-semibold leading-normal lg:text-[24px] ${headingColor}`}>
                    {item.question}
                  </span>
                  <ChevronCircleIcon className="size-[50px] shrink-0" open={isOpen} />
                </button>
                {isOpen && hasAnswer && (
                  <div className={`whitespace-pre-line pb-[36px] pr-[70px] text-[18px] leading-[35px] ${bodyColor}`}>
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
