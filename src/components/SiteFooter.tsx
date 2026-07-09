import type { SiteSettings } from "@/lib/cms";
import { EnvelopeIcon, PhoneIcon, SocialIcon } from "./icons";
import FloatingButtons from "./FloatingButtons";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-[8px]">
      <span className="text-[15px] font-bold text-white">
        {label}
        {required && <span className="text-[#ff5b45]"> *</span>}
      </span>
      {children}
    </label>
  );
}

export default function SiteFooter({ site }: { site: SiteSettings }) {
  const footer = site.footer;
  return (
    <footer id="contact">
      <div className="bg-deep py-[90px]">
        <div className="mx-auto flex max-w-[1470px] flex-col justify-center gap-[70px] px-6 lg:flex-row lg:gap-[120px]">
          {/* Get in touch */}
          <div className="pt-[10px]">
            <h2 className="font-heading text-[38px] font-semibold text-teal">
              {footer.heading}
            </h2>
            <div className="mt-[30px] space-y-[6px] text-[20px] leading-[30px] text-white">
              {footer.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="mt-[28px] space-y-[10px] text-[20px] text-white">
              <p className="flex items-center gap-[12px]">
                <PhoneIcon className="size-[18px]" />
                <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
              </p>
              <p className="flex items-center gap-[12px]">
                <EnvelopeIcon className="size-[19px]" />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </div>
            <div className="mt-[26px] flex gap-[12px]">
              {site.socials.map((s) => (
                <SocialIcon key={s.network} network={s.network} href={s.href} />
              ))}
            </div>
          </div>

          {/* Case evaluation form */}
          <form
            className="w-full max-w-[680px] bg-deeper p-[35px] lg:p-[45px]"
            action="#"
            method="post"
          >
            <h2 className="font-heading text-[32px] font-semibold text-white">
              {footer.form.heading}
            </h2>
            <div className="mt-[28px] grid grid-cols-1 gap-[20px] sm:grid-cols-3">
              <Field label="First Name" required>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  className="h-[42px] rounded-[4px] bg-white px-[12px] text-[15px] text-deep placeholder:text-deep/50 focus:outline-none"
                />
              </Field>
              <Field label="Last Name" required>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  className="h-[42px] rounded-[4px] bg-white px-[12px] text-[15px] text-deep placeholder:text-deep/50 focus:outline-none"
                />
              </Field>
              <Field label="Email" required>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="h-[42px] rounded-[4px] bg-white px-[12px] text-[15px] text-deep placeholder:text-deep/50 focus:outline-none"
                />
              </Field>
            </div>
            <div className="mt-[22px] grid grid-cols-1 gap-[20px] sm:grid-cols-2">
              <Field label="Contact number" required>
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Contact number"
                  className="h-[42px] rounded-[4px] bg-white px-[12px] text-[15px] text-deep placeholder:text-deep/50 focus:outline-none"
                />
              </Field>
              <Field label="Best time to contact you:">
                <select
                  name="bestTime"
                  className="h-[42px] rounded-[4px] bg-white px-[10px] text-[15px] text-deep focus:outline-none"
                >
                  {footer.form.bestTimeOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </Field>
            </div>
            <p className="mt-[22px] text-[15px] font-bold text-white">Recaptcha</p>
            {/* Placeholder for the reCAPTCHA widget wired up with the real CMS/backend */}
            <div className="mt-[10px] flex h-[74px] w-[256px] items-center justify-between rounded-[3px] border border-[#d3d3d3] bg-[#f9f9f9] px-[12px]">
              <span className="flex items-center gap-[10px]">
                <span className="size-[24px] rounded-[2px] border-2 border-[#c1c1c1] bg-white" />
                <span className="text-[13px] text-[#282727]">I&apos;m not a robot</span>
              </span>
              <span className="flex flex-col items-center">
                <svg viewBox="0 0 32 32" className="size-[26px]" aria-hidden>
                  <path fill="#1c3aa9" d="M16 3a13 13 0 0 1 11 6l-4.3 3.2A7.7 7.7 0 0 0 16 8.3Z" />
                  <path fill="#4285f4" d="M27 9a13 13 0 0 1-1.6 15.6l-4-3.7A7.7 7.7 0 0 0 22.6 12Z" />
                  <path fill="#ababab" d="M25.4 24.6A13 13 0 0 1 3.6 20l5-1.8a7.7 7.7 0 0 0 12.8 2.7Z" />
                </svg>
                <span className="text-[8px] text-[#555]">reCAPTCHA</span>
              </span>
            </div>
            <button
              type="submit"
              className="mt-[24px] h-[45px] rounded-[4px] bg-white px-[18px] text-[16px] text-deep hover:bg-white/90"
            >
              {footer.form.submitLabel}
            </button>
            <p className="mt-[18px] text-[15px] leading-[24px] text-white">
              {footer.form.disclaimer}
            </p>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#0d1e28] py-[40px]">
        <div className="mx-auto max-w-[1470px] px-6">
          <div className="flex flex-col items-start justify-between gap-[20px] md:flex-row md:items-center">
            <p className="text-[14px] text-white">{footer.copyright}</p>
            <p className="text-[14px]">
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
          <div className="mt-[36px] flex flex-col items-start justify-between gap-[20px] md:flex-row md:items-center">
            <p className="text-[14px] text-white">{footer.regulatory}</p>
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
