"use client";

import { createContext, useContext, useState } from "react";
import type { PricingPageContent } from "@/lib/cms";

/*
 * Interactive pieces of the pricing page. Content stores every fee net of VAT;
 * the VAT switch decides whether the headline figure is gross (net × (1 + rate))
 * or net, and the single/couple switch picks which Power of Attorney prices
 * apply. Office of the Public Guardian fees and disbursements carry no VAT.
 */

type Vat = PricingPageContent["vat"];
type PoaContent = PricingPageContent["powersOfAttorney"];

type PricingState = {
  vat: Vat;
  includeVat: boolean;
  setIncludeVat: (v: boolean) => void;
  couple: boolean;
  setCouple: (v: boolean) => void;
};

const PricingContext = createContext<PricingState | null>(null);

function usePricing() {
  const ctx = useContext(PricingContext);
  if (!ctx) throw new Error("Pricing components must be rendered inside <PricingProvider>");
  return ctx;
}

/** Defaults match the design: prices including VAT, single person. */
export function PricingProvider({ vat, children }: { vat: Vat; children: React.ReactNode }) {
  const [includeVat, setIncludeVat] = useState(true);
  const [couple, setCouple] = useState(false);
  return (
    <PricingContext value={{ vat, includeVat, setIncludeVat, couple, setCouple }}>{children}</PricingContext>
  );
}

/* ------------------------------ Money -------------------------------- */

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const formatGbp = (amount: number) => gbp.format(amount);

const withVat = (net: number, rate: number) => Math.round(net * (1 + rate));

/** Headline fee, shown with or without VAT per the switch. */
export function Price({ net }: { net: number }) {
  const { vat, includeVat } = usePricing();
  return <>{formatGbp(includeVat ? withVat(net, vat.rate) : net)}</>;
}

export function PriceRange({ net }: { net: number[] }) {
  const { vat, includeVat } = usePricing();
  const [low, high] = net.map((n) => formatGbp(includeVat ? withVat(n, vat.rate) : n));
  return <>{`${low} - ${high}`}</>;
}

/**
 * The secondary figure under a headline fee — the other side of the switch:
 * "£350 plus VAT" while VAT is included, "£420 including VAT" while it isn't.
 */
export function AltPrice({ net, short = false }: { net: number; short?: boolean }) {
  const { vat, includeVat } = usePricing();
  return includeVat ? (
    <>{`${formatGbp(net)} ${short ? vat.plusVatShort : vat.plusVat}`}</>
  ) : (
    <>{`${formatGbp(withVat(net, vat.rate))} ${short ? vat.includingVatShort : vat.includingVat}`}</>
  );
}

/** Copy that changes with the VAT switch. Defaults to the vat.includingNote/excludingNote labels. */
export function VatText({ including, excluding }: { including?: string; excluding?: string }) {
  const { vat, includeVat } = usePricing();
  return <>{includeVat ? (including ?? vat.includingNote) : (excluding ?? vat.excludingNote)}</>;
}

/* ----------------------------- Switches ------------------------------ */

function PillSwitch({
  options,
  active,
  onSelect,
  track,
  label,
}: {
  options: string[];
  active: number;
  onSelect: (index: number) => void;
  track: "cream" | "mint";
  label: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`inline-flex rounded-full p-[5px] xl:p-[6px] ${track === "cream" ? "bg-cream" : "bg-mint"}`}
    >
      {options.map((option, i) => (
        <button
          key={option}
          type="button"
          aria-pressed={i === active}
          onClick={() => onSelect(i)}
          className={`h-[44px] cursor-pointer rounded-full px-[20px] text-[14px] font-semibold transition-colors duration-200 md:h-[50px] xl:h-[57px] xl:min-w-[171px] xl:px-[30px] xl:text-[16px] ${
            i === active ? "bg-deep text-white" : "text-deep hover:bg-deep/10"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

/** Including VAT / Excluding VAT — option 0 includes VAT. */
export function VatSwitch({ options }: { options: string[] }) {
  const { includeVat, setIncludeVat } = usePricing();
  return (
    <PillSwitch
      options={options}
      active={includeVat ? 0 : 1}
      onSelect={(i) => setIncludeVat(i === 0)}
      track="cream"
      label="VAT display"
    />
  );
}

/** Single person / Couple — option 0 is single. */
export function CoupleSwitch({ options }: { options: string[] }) {
  const { couple, setCouple } = usePricing();
  return (
    <PillSwitch
      options={options}
      active={couple ? 1 : 0}
      onSelect={(i) => setCouple(i === 1)}
      track="mint"
      label="Price selection"
    />
  );
}

/* ----------------------- Powers of Attorney cards -------------------- */

export function PoaCards({ content }: { content: PoaContent }) {
  const { couple } = usePricing();
  const fee = content.registrationFee;

  return (
    <div className="mt-[32px] grid grid-cols-1 gap-[20px] lg:grid-cols-2 xl:mt-[45px] xl:gap-[34px]">
      {content.cards.map((card, i) => {
        const dark = i === 1;
        const option = couple ? card.couple : card.single;
        const count = option.registrations;
        return (
          <article
            key={card.title}
            className={`flex flex-col rounded-[20px] px-[24px] py-[28px] xl:rounded-[30px] xl:px-[50px] xl:pb-[53px] xl:pt-[50px] ${
              dark ? "bg-deep text-white" : "border border-deep bg-mint text-deep"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-[12px]">
              <h3 className="text-[19px] font-bold xl:text-[22px]">{card.title}</h3>
              {"badge" in card && card.badge && (
                <span className="rounded-full bg-mint px-[16px] py-[5px] text-[14px] font-bold text-deep xl:px-[23px] xl:py-[6px] xl:text-[18px]">
                  {card.badge}
                </span>
              )}
            </div>
            <p className={`mt-[12px] text-[16px] leading-[1.4] xl:mt-[18px] xl:text-[22px] xl:leading-[30px] ${dark ? "text-white/85" : "text-deep/70"}`}>
              {option.description}
            </p>
            <p className="mt-auto flex items-baseline gap-[14px] pt-[16px] xl:pt-[20px]">
              <span className="text-[52px] font-semibold leading-none xl:text-[72px]">
                <Price net={option.net} />
              </span>
              <span className={`text-[16px] xl:text-[20px] ${dark ? "text-white/85" : "text-deep/70"}`}>
                <AltPrice net={option.net} short />
              </span>
            </p>
            <p
              className={`mt-[20px] rounded-[12px] px-[18px] py-[14px] text-[15px] leading-[1.35] md:text-[17px] xl:mt-[38px] xl:rounded-[14px] xl:px-[25px] xl:py-[19px] xl:text-[22px] ${
                dark ? "bg-mint text-deep" : "bg-deep text-mint"
              }`}
            >
              {content.registrationLabel}{" "}
              <strong className={`font-bold ${dark ? "text-deep" : "text-white"}`}>
                {`${formatGbp(count * fee)} (${count} × ${formatGbp(fee)})`}
              </strong>
            </p>
          </article>
        );
      })}
    </div>
  );
}
