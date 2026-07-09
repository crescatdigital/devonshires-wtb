"use client";

import { EnvelopeIcon, UpArrowIcon } from "./icons";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-[24px] right-[24px] z-50 flex flex-col items-center gap-[14px]">
      <div className="flex flex-col items-center">
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex size-[54px] items-center justify-center rounded-full bg-teal text-white shadow-lg hover:bg-teal/90"
        >
          <UpArrowIcon className="size-[24px]" />
        </button>
        <span className="mt-[6px] text-[9px] font-semibold tracking-[0.06em] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
          BACK TO TOP
        </span>
      </div>
      <a
        href="#contact"
        aria-label="Contact us"
        className="flex size-[54px] items-center justify-center rounded-full bg-flame text-white shadow-lg hover:bg-flame/90"
      >
        <EnvelopeIcon className="size-[26px]" />
      </a>
    </div>
  );
}
