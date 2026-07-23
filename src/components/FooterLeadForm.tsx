"use client";

import { useActionState } from "react";
import { submitLead, type LeadFormState } from "@/app/actions/leads";

type FooterForm = {
  heading: string;
  disclaimer: string;
  submitLabel: string;
  bestTimeOptions: string[];
};

const initialState: LeadFormState = { status: "idle", message: "" };

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
      <span className="text-[15px] font-bold text-white md:text-[18px]">
        {label}
        {required && <span className="text-[#ff5b45]"> *</span>}
      </span>
      {children}
    </label>
  );
}

export default function FooterLeadForm({ form }: { form: FooterForm }) {
  const [state, formAction, pending] = useActionState(submitLead, initialState);

  return (
    <form
      action={formAction}
      className="-mx-6 w-[calc(100%+48px)] max-w-[680px] bg-deeper px-[24px] pb-[36px] pt-[30px] md:mx-0 md:w-full md:p-[35px] lg:p-[45px]"
    >
      <input type="hidden" name="source" value="footer" />
      {/* Honeypot — hidden from users, filled only by bots. */}
      <div aria-hidden className="hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <h2 className="font-[family-name:var(--font-montserrat)] text-[26px] text-white md:text-[40px]">
        {form.heading}
      </h2>

      {state.status === "success" ? (
        <p
          aria-live="polite"
          className="mt-[28px] rounded-[6px] bg-teal/20 px-[18px] py-[20px] text-[16px] leading-[1.6] text-white md:text-[18px]"
        >
          {state.message}
        </p>
      ) : (
        <>
          <div className="mt-[28px] grid grid-cols-1 gap-[20px] sm:grid-cols-3">
            <Field label="First Name" required>
              <input
                type="text"
                name="firstName"
                required
                placeholder="First name"
                className="h-[44px] rounded-[4px] bg-white px-[14px] text-[16px] text-deep placeholder:text-deep/50 focus:outline-none md:h-[42px] md:px-[12px] md:text-[18px]"
              />
            </Field>
            <Field label="Last Name" required>
              <input
                type="text"
                name="lastName"
                required
                placeholder="Last name"
                className="h-[44px] rounded-[4px] bg-white px-[14px] text-[16px] text-deep placeholder:text-deep/50 focus:outline-none md:h-[42px] md:px-[12px] md:text-[18px]"
              />
            </Field>
            <Field label="Email" required>
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                className="h-[44px] rounded-[4px] bg-white px-[14px] text-[16px] text-deep placeholder:text-deep/50 focus:outline-none md:h-[42px] md:px-[12px] md:text-[18px]"
              />
            </Field>
          </div>
          <div className="mt-[22px] grid grid-cols-1 gap-[20px] sm:grid-cols-2">
            <Field label="Contact number" required>
              <input
                type="tel"
                name="contactNumber"
                required
                placeholder="Contact number"
                className="h-[44px] rounded-[4px] bg-white px-[14px] text-[16px] text-deep placeholder:text-deep/50 focus:outline-none md:h-[42px] md:px-[12px] md:text-[18px]"
              />
            </Field>
            <Field label="Best time to contact you:">
              <select
                name="bestTime"
                className="h-[44px] rounded-[4px] bg-white px-[10px] text-[16px] text-deep focus:outline-none md:h-[42px] md:text-[18px]"
              >
                {form.bestTimeOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
          </div>
          <p className="mt-[22px] text-[15px] font-bold text-white md:text-[18px]">Recaptcha</p>
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

          {state.status === "error" && (
            <p aria-live="polite" className="mt-[16px] text-[15px] font-semibold text-[#ff5b45] md:text-[17px]">
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-[24px] h-[45px] rounded-[4px] bg-white px-[18px] text-[15px] text-deep hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60 md:text-[18px]"
          >
            {pending ? "Sending…" : form.submitLabel}
          </button>
          <p className="mt-[18px] text-[15px] leading-[1.8] text-white pl-[20px] md:text-[18px]">
            {form.disclaimer}
          </p>
        </>
      )}
    </form>
  );
}
