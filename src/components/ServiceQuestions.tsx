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
    <section className="bg-lite py-[80px]">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="rounded-[24px] bg-deep px-[40px] py-[50px] lg:px-[70px]">
          <h2 className="text-center font-heading text-[34px] font-semibold text-white lg:text-[44px]">
            {content.heading}
          </h2>
          <div className="mt-[30px]">
            {content.items.map((item, i) => {
              const isOpen = open === i;
              const hasAnswer = item.answer.trim().length > 0;
              return (
                <div key={item.question} className="border-b border-white/15">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-[26px] text-left"
                  >
                    <span className="font-heading text-[18px] font-semibold text-white lg:text-[20px]">
                      {item.question}
                    </span>
                    <ChevronCircleIcon className="size-[42px] shrink-0" open={isOpen} />
                  </button>
                  {isOpen && hasAnswer && (
                    <p className="pb-[26px] pr-[60px] text-[17px] leading-[30px] text-white/90">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <p className="mt-[36px] text-center font-heading text-[22px] font-semibold text-deep">
          {content.stillUnsureText}
          <a href="#assessment" className="text-flame">
            {content.stillUnsureLink}
          </a>
        </p>
      </div>
    </section>
  );
}
