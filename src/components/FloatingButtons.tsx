"use client";

import { useEffect, useState } from "react";
import { EnvelopeIcon, UpArrowIcon } from "./icons";

export default function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    // Show "Back to top" only once the footer has been scrolled into view.
    const footer = document.getElementById("contact");
    if (!footer) return;
    const update = () => {
      const rect = footer.getBoundingClientRect();
      setShowBackToTop(rect.top <= window.innerHeight && rect.bottom >= 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed bottom-[280px] right-[20px] z-50 flex flex-col items-center gap-[14px] md:bottom-[24px] md:right-[24px]">
      {showBackToTop && (
        <div className="flex flex-col items-center">
          <button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex size-[50px] items-center justify-center rounded-full bg-teal text-white shadow-lg hover:bg-teal/90 md:size-[75px]"
          >
            <UpArrowIcon className="size-[30px] md:size-[42px]" />
          </button>
          <span className="mt-[6px] text-[12px] font-semibold tracking-[0.06em] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.6)] md:text-[18px]">
            BACK TO TOP
          </span>
        </div>
      )}
      <a
        href="#contact"
        aria-label="Contact us"
        className="fixed bottom-[20px] right-[20px] z-50 flex size-[50px] items-center justify-center rounded-full bg-flame text-white shadow-lg hover:bg-flame/90 md:static md:size-[75px]"
      >
        <EnvelopeIcon className="size-[30px] md:size-[42px]" />
      </a>
    </div>
  );
}
