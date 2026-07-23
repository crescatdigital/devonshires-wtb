import type { SiteSettings } from "@/lib/cms";
import { EnvelopeIcon, PhoneIcon, SocialIcon } from "./icons";
import FloatingButtons from "./FloatingButtons";
import FooterLeadForm from "./FooterLeadForm";

export default function SiteFooter({ site }: { site: SiteSettings }) {
  const footer = site.footer;
  return (
    <footer id="contact">
      <div className="bg-deep py-[52px] lg:pt-[66px] lg:pb-[90px]">
        <div className="mx-auto flex max-w-[1470px] flex-col justify-center gap-[30px] px-6 md:gap-[70px] lg:flex-row lg:gap-[120px]">
          {/* Get in touch */}
          <div className="pt-[20px]">
            <h2 className="font-[family-name:var(--font-montserrat)] text-[30px] text-teal md:text-[40px]">
              {footer.heading}
            </h2>
            <div className="mt-[20px] space-y-[6px] text-[17px] leading-[1.6] text-white md:mt-[30px] md:text-[24px]">
              {footer.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="mt-[28px] space-y-[10px] text-[24px] text-white sm:text-[20px]">
              <p className="flex items-center gap-[12px] text-[17px] md:text-[24px]">
                <PhoneIcon className="size-[18px] shrink-0 md:size-[26px]" />
                <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
              </p>
              <p className="flex items-start gap-[12px] text-[17px] md:text-[24px]">
                <EnvelopeIcon className="mt-[3px] size-[18px] shrink-0 md:size-[26px]" />
                <a href={`mailto:${site.email}`} className="min-w-0 break-all">
                  {site.email}
                </a>
              </p>
            </div>
            <div className="mt-[26px] flex gap-[12px]">
              {site.socials.map((s) => (
                <SocialIcon key={s.network} network={s.network} href={s.href} />
              ))}
            </div>
          </div>

          {/* Case evaluation form */}
          <FooterLeadForm form={footer.form} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#111111] py-[40px] md:py-[60px]">
        <div className="mx-auto max-w-[1470px] px-6">
          <div className="flex flex-col items-start justify-between gap-[20px] md:flex-row md:items-center">
            <p className="mb-[28px] text-[15px] text-white md:mb-0 md:text-[18px]">{footer.copyright}</p>
            <p className="text-[15px] md:text-[18px]">
              {footer.legalLinks.map((link, i) => (
                <span key={link.label}>
                  <a
                    href={link.href}
                    className={i === 0 ? "text-flame hover:underline" : "text-mint hover:underline"}
                  >
                    {link.label}
                  </a>
                  {i < footer.legalLinks.length - 1 && (
                    <span className="text-white"> | </span>
                  )}
                </span>
              ))}
            </p>
            <div className="flex gap-[12px]">
              {site.socials.map((s) => (
                <SocialIcon key={s.network} network={s.network} href={s.href} />
              ))}
            </div>
          </div>
          <div className="mt-[40px] flex flex-col items-start justify-between gap-[20px] md:mt-[70px] md:flex-row md:items-center">
            <p className="text-[15px] text-white md:text-[18px]">{footer.regulatory}</p>
            {/* SRA digital badge placeholder — replace with the official embed */}
            <div className="flex h-[44px] w-[92px] items-center justify-center rounded-[4px] bg-white">
              <span className="text-[11px] font-bold leading-tight text-[#c8102e]">
                SRA
                <span className="block text-[7px] font-normal text-[#444]">
                  REGULATED
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <FloatingButtons />
    </footer>
  );
}
