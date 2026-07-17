"use client";

import { useState } from "react";
import { ChevronCircleIcon } from "./icons";
import type { LandingPageContent } from "@/lib/cms";

export default function ServiceQuestions({
  content,
}: {
  content: LandingPageContent["faq"];
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-lite py-[52px] lg:py-[40px]">
      <div className="mx-auto max-w-[1484px] px-6">
        <div className="rounded-[24px] bg-deep px-[24px] pt-[30px] pb-[50px] md:px-[40px] lg:px-[110px]">
          <h2 className="text-center font-heading text-[28px] font-normal text-white md:text-[34px] lg:text-[42px]">
            {content.heading}
          </h2>
          <div className="mt-[30px]">
            {content.items.map((item, i) => {
              const isOpen = open === i;
              const hasAnswer = item.answer.trim().length > 0;
              return (
                <div key={item.question} className="border-t border-mint">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-[14px] text-left"
                  >
                    <span className="font-heading text-[18px] font-semibold text-lite lg:text-[24px]">
                      {item.question}
                    </span>
                    <ChevronCircleIcon className="size-[40px] shrink-0 md:size-[54px] lg:size-[60px]" open={isOpen} />
                  </button>
                  {isOpen && hasAnswer && (
                    <p className="pb-[26px] pr-0 text-[16px] leading-[30px] text-white/90 md:pr-[60px] lg:text-[18px]">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <p className="mt-[25px] text-center font-heading text-[18px] text-deep md:mt-[36px] md:text-[26px]">
          {content.stillUnsureText}
          <a href="#assessment" className="block md:inline text-flame font-semibold underline">
            {content.stillUnsureLink}
          </a>
        </p>
      </div>
    </section>
  );
}
