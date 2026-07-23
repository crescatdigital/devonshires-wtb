"use client";

import { useActionState } from "react";
import type { LandingPageContent } from "@/lib/cms";
import { submitLead, type LeadFormState } from "@/app/actions/leads";

type LandingForm = LandingPageContent["banner"]["form"];

const initialState: LeadFormState = { status: "idle", message: "" };

const FIELD_CLASS =
  "h-[35px] w-full rounded-[20px] border-2 border-deep bg-mint px-[18px] text-[13px] font-semibold text-deep placeholder:font-semibold placeholder:text-deep focus:outline-none md:h-[52px] md:px-[26px] md:text-[15px] lg:h-[56px] lg:text-[17px]";

export default function LandingLeadForm({ form }: { form: LandingForm }) {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const [titleBefore, titleAfter] = form.title.split(form.titleAccent);

  return (
    <form
      action={formAction}
      className="relative w-full shrink-0 rounded-[20px] border-[3px] border-deep bg-lite px-[18px] pb-[28px] pt-[28px] shadow-[2px_4px_4px_2px_rgba(0,0,0,0.25)] md:rounded-[30px] md:px-[24px] md:pb-[42px] md:pt-[38px] lg:w-[571px] lg:px-[25px] lg:pb-[45px] lg:pt-[40px]"
    >
      <input type="hidden" name="source" value="landing" />
      {/* Honeypot — hidden from users, filled only by bots. */}
      <div aria-hidden className="hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <h2 className="px-[8px] font-heading text-[20px] font-semibold text-deep md:text-[24px] lg:text-[30px]">
        {titleBefore}
        <span className="text-teal underline decoration-2 underline-offset-[4px]">{form.titleAccent}</span>
        {titleAfter}
      </h2>

      {state.status === "success" ? (
        <p
          aria-live="polite"
          className="mt-[24px] rounded-[20px] border-2 border-teal bg-mint px-[22px] py-[24px] text-center text-[15px] font-semibold leading-[1.5] text-deep md:mt-[34px] md:text-[17px]"
        >
          {state.message}
        </p>
      ) : (
        <>
          <div className="mt-[20px] space-y-[12px] md:mt-[28px] md:space-y-[18px] lg:mt-[34px] lg:space-y-[20px]">
            <div className="grid grid-cols-2 gap-[12px] md:grid-cols-1 md:gap-[18px] lg:gap-[20px]">
              <input name="name" required placeholder={form.placeholders.name} className={FIELD_CLASS} />
              <input name="phone" type="tel" placeholder={form.placeholders.phone} className={FIELD_CLASS} />
            </div>
            <input name="email" type="email" required placeholder={form.placeholders.email} className={FIELD_CLASS} />
            <div className="rounded-[20px] border-2 border-deep px-[16px] pb-[12px] pt-[4px] md:px-[24px] md:pb-[16px]">
              <label
                htmlFor="landing-helpWith"
                className="block px-[8px] pt-[8px] text-[11px] font-bold uppercase tracking-[0.02em] text-deep md:text-[12px] lg:text-[14px]"
              >
                {form.helpLabel}
              </label>
              <select
                id="landing-helpWith"
                name="helpWith"
                defaultValue=""
                className="w-full cursor-pointer bg-transparent px-[8px] pt-[6px] pb-[6px] text-[12px] font-semibold text-deep focus:outline-none md:text-[15px] lg:text-[17px]"
              >
                <option value="" disabled>
                  Select an option…
                </option>
                {form.helpOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              name="situation"
              placeholder={form.placeholders.situation}
              className="h-[110px] w-full resize-none rounded-[20px] border-2 border-deep bg-mint px-[18px] py-[14px] text-[13px] font-semibold text-deep placeholder:font-semibold placeholder:text-deep focus:outline-none md:h-[150px] md:px-[26px] md:py-[18px] md:text-[15px] lg:h-[190px] lg:text-[17px]"
            />
          </div>

          {state.status === "error" && (
            <p aria-live="polite" className="mt-[16px] px-[8px] text-center text-[13px] font-semibold text-flame md:text-[15px]">
              {state.message}
            </p>
          )}

          <div className="mt-[20px] px-0 md:mt-[26px] md:px-[20px] lg:px-[33px]">
            <button
              type="submit"
              disabled={pending}
              className="flex h-[50px] w-full items-center justify-center whitespace-nowrap rounded-full bg-flame px-[16px] text-[12px] font-semibold uppercase tracking-[0.03em] text-white disabled:cursor-not-allowed disabled:opacity-60 md:h-[60px] md:whitespace-normal md:px-0 md:text-[15px] lg:h-[64px] lg:text-[20px]"
            >
              {pending ? "Sending…" : form.submitLabel}
            </button>
          </div>
          <p className="mt-[20px] text-center text-[12px] text-deep md:mt-[30px] md:text-[13px] lg:text-[16px]">
            <span className="text-teal">*</span>
            {form.disclaimer.startsWith("*") ? form.disclaimer.slice(1) : form.disclaimer}
          </p>
        </>
      )}
    </form>
  );
}
