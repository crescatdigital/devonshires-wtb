import type { PricingPageContent } from "@/lib/cms";
import { ArrowRightIcon } from "./icons";
import { AltPrice, CoupleSwitch, PoaCards, Price, PriceRange, VatSwitch, VatText } from "./pricing-client";

/*
 * Private client pricing page sections (Figma "DC Pricing Page", node 187-414).
 * Sections render on the server; fees and the two switches are small client
 * components (./pricing-client) that read the shared switch state, so the page
 * must be wrapped in <PricingProvider>.
 */

type Content = PricingPageContent;

/* ------------------------------ Shared ------------------------------- */

/** 1635px content column used by every section below the hero. */
function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`mx-auto max-w-[1920px] px-6 lg:px-12 xl:px-[142px] ${className}`}>{children}</div>
  );
}

/** "Service: Wills" — semibold lead-in plus the Segoe Semilight italic accent. */
function ServiceHeading({ before, accent, after }: { before: string; accent: string; after?: string }) {
  return (
    <h2 className="font-heading text-[32px] font-semibold leading-[1.2] text-deep md:text-[44px] xl:text-[65px]">
      {before} <span className="heading-accent text-teal">{accent}</span>
      {after}
    </h2>
  );
}

function TickIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 12.5 9.5 18 20 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------- Hero -------------------------------- */

export function PricingHero({ content }: { content: Content["hero"] }) {
  return (
    <section className="bg-deep">
      <div className="mx-auto flex max-w-[1920px] flex-col gap-[36px] px-6 py-[48px] md:py-[64px] lg:px-12 xl:flex-row xl:items-start xl:justify-between xl:gap-[80px] xl:pb-[57px] xl:pl-[175px] xl:pr-[109px] xl:pt-[52px]">
        {/* Left — pitch */}
        <div className="xl:max-w-[850px]">
          <p className="font-heading text-[18px] leading-none text-mint md:text-[20px] lg:text-[26px]">
            {content.eyebrow}
          </p>
          <h1 className="mt-[14px] font-heading text-[38px] font-semibold leading-[1.15] text-white sm:text-[52px] lg:text-[72px] xl:mt-[22px] xl:text-[96px] xl:leading-[115px]">
            {content.headingSegments.map((seg, i) =>
              seg.script ? (
                <span key={i} className="font-script font-normal tracking-[9px] text-mint xl:mr-[8px]">
                  {seg.text}
                </span>
              ) : (
                <span key={i}>{seg.text}</span>
              ),
            )}
          </h1>
          <div className="mt-[24px] space-y-[24px] text-[16px] leading-[1.5] text-white md:text-[18px] lg:mt-[44px] lg:space-y-[30px] lg:text-[22px] lg:leading-[30px]">
            {content.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        {/* Right — at a glance card + CTA */}
        <div className="flex w-full flex-col items-center xl:mt-[66px] xl:w-[673px] xl:shrink-0">
          <div className="w-full rounded-[24px] border-[4px] border-mint bg-white px-[24px] py-[28px] md:px-[40px] xl:rounded-[40px] xl:px-[55px] xl:pb-[64px] xl:pt-[48px]">
            <p className="text-[18px] font-bold uppercase text-deep md:text-[20px] xl:text-[24px]">
              {content.glance.title}
            </p>
            <dl className="mt-[10px] xl:mt-[30px]">
              {content.glance.rows.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-baseline justify-between gap-[16px] py-[18px] xl:py-[34px] ${
                    i < content.glance.rows.length - 1 ? "border-b border-deep/15" : "pb-0 xl:pb-0"
                  } ${i === 0 ? "pt-[8px] xl:pt-[12px]" : ""}`}
                >
                  <dt className="text-[18px] text-deep md:text-[22px] xl:text-[26px]">{row.label}</dt>
                  <dd className="whitespace-nowrap text-[22px] font-semibold text-deep md:text-[26px] xl:text-[32px]">
                    {"prefix" in row && row.prefix && `${row.prefix} `}
                    <Price net={row.net} />
                    {"unit" in row && row.unit && (
                      <span className="text-[16px] font-normal md:text-[20px] xl:text-[24px]">{row.unit}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-[14px] text-[15px] text-deep/70 md:text-[18px] xl:mt-[22px] xl:text-[22px]">
              <VatText including={content.glance.noteIncluding} excluding={content.glance.noteExcluding} />
            </p>
          </div>

          <a
            href={content.cta.href}
            className="mt-[28px] flex h-[52px] items-center gap-[12px] rounded-full bg-flame px-[28px] text-[16px] font-semibold text-white xl:mt-[45px] xl:h-[75px] xl:px-[35px] xl:text-[20px]"
          >
            {content.cta.label}
            <ArrowRightIcon className="size-[24px] xl:size-[28px]" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- VAT notice ---------------------------- */

export function VatNotice({ content }: { content: Content["vatNotice"] }) {
  return (
    <Container className="pt-[36px] xl:pt-[55px]">
      <div className="flex flex-col gap-[24px] rounded-[16px] bg-mint px-[24px] py-[24px] lg:flex-row lg:items-center lg:justify-between lg:gap-[60px] xl:rounded-[22px] xl:px-[75px] xl:py-[25px]">
        <div className="text-deep lg:max-w-[1060px]">
          <p className="text-[16px] leading-[1.4] md:text-[18px] xl:text-[20px] xl:leading-[27px]">{content.text}</p>
          <p className="mt-[16px] text-[15px] font-bold md:text-[18px] xl:mt-[27px] xl:text-[20px]">{content.prompt}</p>
        </div>
        <div className="shrink-0">
          <VatSwitch options={content.options} />
        </div>
      </div>
    </Container>
  );
}

/* ------------------------------- Wills ------------------------------- */

export function WillsPricing({ content }: { content: Content["wills"] }) {
  const { card } = content;
  return (
    <Container className="pt-[40px] xl:pt-[51px]">
      <div className="flex flex-col gap-[32px] lg:flex-row lg:items-start lg:justify-between lg:gap-[60px]">
        {/* Left — copy */}
        <div className="lg:max-w-[1060px] lg:pt-[40px] xl:pt-[53px]">
          <ServiceHeading before={content.headingBefore} accent={content.headingAccent} />
          <p className="mt-[16px] text-[16px] leading-[1.4] text-deep md:text-[20px] xl:mt-[30px] xl:text-[24px] xl:leading-[33px]">
            {content.intro}
          </p>
          <ul className="mt-[16px] flex flex-wrap gap-[10px] xl:mt-[22px] xl:gap-[15px]">
            {content.types.map((type) => (
              <li
                key={type}
                className="rounded-full border-[1.5px] border-deep px-[18px] py-[8px] text-[15px] text-deep md:text-[16px] xl:px-[30px] xl:py-[12px] xl:text-[18px]"
              >
                {type}
              </li>
            ))}
          </ul>
          <p className="mt-[16px] text-[16px] leading-[1.4] text-deep md:text-[20px] xl:mt-[30px] xl:text-[24px] xl:leading-[33px]">
            {content.outro}
          </p>
        </div>

        {/* Right — fixed fee card */}
        <div className="w-full rounded-[20px] border border-deep bg-white px-[24px] py-[28px] lg:w-[420px] lg:shrink-0 xl:w-[491px] xl:rounded-[30px] xl:px-[47px] xl:pb-[50px] xl:pt-[46px]">
          <p className="text-[15px] font-bold uppercase text-teal xl:text-[18px]">{card.label}</p>
          <p className="mt-[8px] flex items-baseline gap-[14px] text-deep xl:mt-[14px]">
            <span className="text-[52px] font-semibold leading-none xl:text-[70px]">
              <Price net={card.net} />
            </span>
            <span className="text-[16px] text-deep/70 xl:text-[18px]">{card.unit}</span>
          </p>
          <p className="mt-[14px] border-b border-deep/15 pb-[18px] text-[17px] text-deep/70 xl:mt-[24px] xl:pb-[22px] xl:text-[20px]">
            <AltPrice net={card.net} />
          </p>
          <ul className="mt-[16px] space-y-[14px] xl:mt-[24px] xl:space-y-[20px]">
            {card.features.map((f) => (
              <li key={f} className="flex items-center gap-[12px] text-[16px] text-deep xl:gap-[14px] xl:text-[18px]">
                <TickIcon className="size-[20px] shrink-0 text-teal xl:size-[22px]" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-[48px] h-px bg-teal xl:mt-[93px]" />
    </Container>
  );
}

/* ------------------------- Powers of Attorney ------------------------ */

export function PowersOfAttorneyPricing({ content }: { content: Content["powersOfAttorney"] }) {
  return (
    <Container className="pt-[40px] xl:pt-[95px]">
      <div className="flex flex-col gap-[28px] lg:flex-row lg:items-end lg:justify-between lg:gap-[60px]">
        <div className="lg:max-w-[1010px]">
          <ServiceHeading before={content.headingBefore} accent={content.headingAccent} />
          <p className="mt-[16px] text-[16px] leading-[1.4] text-deep md:text-[20px] xl:mt-[30px] xl:text-[24px] xl:leading-[33px]">
            {content.intro}
          </p>
        </div>

        {/* Single / couple price selection */}
        <div className="flex shrink-0 flex-col items-center text-center xl:mr-[79px]">
          <p className="text-[16px] font-bold text-teal xl:text-[18px]">{content.selector.title}</p>
          <p className="text-[14px] text-deep xl:text-[16px]">{content.selector.hint}</p>
          <div className="mt-[12px] xl:mt-[14px]">
            <CoupleSwitch options={content.selector.options} />
          </div>
        </div>
      </div>

      <PoaCards content={content} />

      <p className="mt-[28px] text-[15px] leading-[1.4] text-deep md:text-[17px] xl:mt-[62px] xl:text-[20px] xl:leading-[27px]">
        {content.footnote}
      </p>

      <div className="mt-[48px] h-px bg-teal xl:mt-[105px]" />
    </Container>
  );
}

/* ------------------------------ Probate ------------------------------ */

export function ProbatePricing({ content }: { content: Content["probate"] }) {
  const { rate } = content;
  return (
    <Container className="pt-[40px] xl:pt-[98px]">
      <ServiceHeading before={content.headingBefore} accent={content.headingAccent} />
      <div className="mt-[16px] flex flex-col gap-[28px] lg:flex-row lg:items-start lg:justify-between lg:gap-[60px] xl:mt-[30px]">
        <p className="text-[16px] leading-[1.4] text-deep md:text-[20px] lg:max-w-[1040px] xl:text-[24px] xl:leading-[33px]">
          {content.intro}
        </p>

        {/* Hourly rate */}
        <div className="border-t-[2.5px] border-deep pt-[20px] text-deep lg:mt-[16px] lg:w-[400px] lg:shrink-0 xl:w-[465px] xl:pt-[32px]">
          <p className="text-[16px] uppercase xl:text-[20px]">{rate.label}</p>
          <p className="mt-[8px] flex items-baseline gap-[14px] xl:mt-[14px]">
            <span className="text-[52px] font-semibold leading-none xl:text-[70px]">
              <Price net={rate.net} />
            </span>
            <span className="text-[16px] text-deep/70 xl:text-[20px]">{rate.unit}</span>
          </p>
          <p className="mt-[10px] text-[16px] text-deep/70 xl:mt-[16px] xl:text-[20px]">
            <AltPrice net={rate.net} />
          </p>
        </div>
      </div>

      <p className="mt-[32px] text-[16px] text-deep md:text-[20px] xl:mt-[22px] xl:text-[24px]">
        <strong className="font-bold text-teal">{content.chargesLead}</strong> {content.chargesText}
      </p>

      <div className="mt-[20px] grid grid-cols-1 gap-[20px] lg:grid-cols-3 xl:mt-[30px] xl:gap-[31px]">
        {content.scenarios.map((s) => {
          const netRange = "netRange" in s ? s.netRange : undefined;
          // Aqua by default; the deep-green treatment is the hover state.
          return (
            <article
              key={s.label}
              className="group flex flex-col rounded-[20px] border border-deep bg-aqua px-[24px] pb-[28px] pt-[28px] text-deep transition-colors duration-300 hover:border-teal hover:bg-deep hover:text-white xl:rounded-[30px] xl:px-[50px] xl:pb-[40px] xl:pt-[44px]"
            >
              <p className="text-center text-[20px] font-semibold text-teal xl:text-[24px]">{s.label}</p>
              <h3 className="mt-[14px] text-[22px] font-semibold leading-[1.25] transition-colors duration-300 group-hover:text-mint xl:mt-[16px] xl:px-[8px] xl:text-[26px]">
                {s.title}
              </h3>
              <div className="mb-[28px] mt-[14px] space-y-[20px] text-[16px] leading-[1.4] xl:mb-[74px] xl:mt-[22px] xl:space-y-[27px] xl:px-[8px] xl:text-[20px] xl:leading-[27px]">
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="mt-auto border-t border-deep pt-[20px] transition-colors duration-300 group-hover:border-teal xl:pt-[28px]">
                <p className="text-[16px] xl:text-[18px]">{s.footerLabel}</p>
                <p className="mt-[6px] text-[34px] font-semibold leading-[1.2] transition-colors duration-300 group-hover:text-mint xl:mt-[10px] xl:text-[48px]">
                  {netRange ? <PriceRange net={netRange} /> : s.footerValue}
                </p>
                <p className="mt-[4px] text-[16px] xl:mt-[8px] xl:text-[17px]">
                  {netRange ? <VatText /> : s.footerNote}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </Container>
  );
}

/* --------------------------- Disbursements --------------------------- */

export function DisbursementsPricing({ content }: { content: Content["disbursements"] }) {
  const { table } = content;
  return (
    <Container className="pt-[40px] xl:pt-[76px]">
      <div className="flex flex-col gap-[28px] rounded-[20px] border border-deep px-[24px] py-[28px] lg:flex-row lg:items-start lg:justify-between lg:gap-[60px] xl:rounded-[30px] xl:px-[75px] xl:py-[72px]">
        {/* Left — copy */}
        <div className="lg:max-w-[740px] xl:-mt-[12px]">
          <ServiceHeading before={content.headingBefore} accent={content.headingAccent} />
          <div className="mt-[16px] space-y-[20px] text-[16px] leading-[1.4] text-deep md:text-[20px] xl:mt-[30px] xl:space-y-[33px] xl:text-[24px] xl:leading-[33px]">
            {content.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-[20px] text-[15px] leading-[1.4] text-teal md:text-[17px] xl:mt-[45px] xl:text-[20px] xl:leading-[27px]">
            {content.note}
          </p>
        </div>

        {/* Right — typical third-party costs */}
        <div className="w-full rounded-[20px] border border-deep bg-mint px-[18px] pb-[12px] pt-[24px] text-deep lg:w-[560px] lg:shrink-0 xl:w-[649px] xl:rounded-[30px] xl:px-[42px] xl:pb-[8px] xl:pt-[38px]">
          <p className="px-[6px] text-[16px] font-semibold uppercase xl:px-[14px] xl:text-[20px]">{table.title}</p>
          <dl className="mt-[14px] border-t border-deep xl:mt-[20px]">
            {table.rows.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-start justify-between gap-[20px] py-[16px] pl-[6px] xl:py-[21px] xl:pl-[14px] ${
                  i < table.rows.length - 1 ? "border-b border-white/60" : ""
                }`}
              >
                <dt>
                  <span className="text-[16px] xl:text-[20px]">{row.label}</span>
                  {"detail" in row && row.detail && (
                    <span className="mt-[6px] block max-w-[380px] text-[13px] leading-[1.4] xl:text-[16px]">{row.detail}</span>
                  )}
                </dt>
                <dd className="whitespace-nowrap text-[22px] font-semibold leading-none xl:text-[32px]">
                  {row.value}
                  {"unit" in row && row.unit && (
                    <span className="ml-[6px] text-[14px] font-normal xl:text-[18px]">{row.unit}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Container>
  );
}

/* --------------------------- No surprises ---------------------------- */

export function NoSurprises({ content }: { content: Content["noSurprises"] }) {
  return (
    <Container className="pt-[48px] xl:pt-[105px]">
      <ServiceHeading before={content.headingBefore} accent={content.headingAccent} after={content.headingAfter} />
      <div className="mt-[24px] grid grid-cols-1 gap-[28px] md:grid-cols-3 md:gap-[32px] xl:mt-[50px] xl:gap-[52px]">
        {content.items.map((item) => (
          <div key={item.title} className="border-t-[2.5px] border-deep pt-[20px] text-deep xl:pt-[50px]">
            <h3 className="text-[20px] font-semibold xl:text-[26px]">
              {item.title}
              <TickIcon className="relative -top-[2px] ml-[12px] inline size-[26px] text-teal xl:ml-[20px] xl:size-[38px]" />
            </h3>
            <p className="mt-[10px] text-[16px] leading-[1.4] xl:mt-[26px] xl:text-[20px] xl:leading-[27px]">{item.text}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}

/* ---------------------------- Contact band --------------------------- */

export function PricingContact({ content }: { content: Content["contact"] }) {
  return (
    <Container className="pt-[48px] xl:pt-[114px]">
      <div className="flex flex-col gap-[28px] rounded-[20px] bg-deep px-[24px] py-[32px] lg:flex-row lg:items-end lg:justify-between lg:gap-[60px] xl:rounded-[30px] xl:px-[110px] xl:py-[74px]">
        <div className="lg:max-w-[780px]">
          <h2 className="text-[32px] font-light leading-[1.2] text-mint md:text-[44px] xl:text-[65px] xl:leading-[77px]">
            {content.heading}
          </h2>
          <p className="mt-[16px] max-w-[700px] text-[16px] leading-[1.4] text-white md:text-[20px] xl:mt-[40px] xl:text-[24px] xl:leading-[33px]">
            {content.textBefore} <strong className="font-semibold">{content.name}</strong> {content.textAfter}
          </p>
        </div>
        <div className="flex flex-col items-start gap-[20px] lg:items-center lg:pb-[33px] xl:gap-[36px]">
          <a
            href={content.cta.href}
            className="flex h-[52px] items-center gap-[12px] rounded-full bg-flame px-[28px] text-[16px] font-semibold text-white xl:h-[75px] xl:px-[35px] xl:text-[20px]"
          >
            {content.cta.label}
            <ArrowRightIcon className="size-[24px] xl:size-[28px]" />
          </a>
          <a href={`mailto:${content.email}`} className="text-[14px] font-semibold text-white [overflow-wrap:anywhere] min-[400px]:text-[16px] md:text-[20px] xl:text-[24px]">
            {content.email}
          </a>
        </div>
      </div>
    </Container>
  );
}
