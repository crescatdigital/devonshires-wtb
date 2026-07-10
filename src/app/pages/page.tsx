import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getSiteSettings } from "@/lib/cms";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Site Index | Devonshires Claims — Wills, Trusts & Probate",
  description: "Directory of all pages built for the Devonshires Wills, Trusts & Probate site.",
};

type PageLink = {
  title: string;
  href: string;
  description: string;
  figma: string;
};

const PAGES: PageLink[] = [
  {
    title: "Home / Hub",
    href: "/",
    description:
      "The main landing hub — hero, three pillars of estate planning, why it matters, why Devonshires, FAQs and the services grid.",
    figma: "Hub Page v3",
  },
  {
    title: "Wills",
    href: "/wills",
    description:
      "Make a will that protects the people who matter most — service overview, why it matters, the will-writing journey and FAQs.",
    figma: "Wills Service Page v3",
  },
  {
    title: "Trusts",
    href: "/trusts",
    description:
      "Protect your wealth for the next generation — trusts we set up & manage, four reasons a trust is worth considering, and the trust journey.",
    figma: "Trusts Service Page v3",
  },
  {
    title: "Probate",
    href: "/probate",
    description:
      "Compassionate help when you need it most — what probate involves, why professional help is essential, and the estate-administration journey.",
    figma: "Probate Service Page v3",
  },
  {
    title: "Power of Attorney",
    href: "/power-of-attorney",
    description:
      "Choose who speaks for you when you can't — LPA overview, four reasons to put an LPA in place now, and the LPA journey.",
    figma: "Power of Attorney Service Page v3",
  },
  {
    title: "Free Case Assessment",
    href: "/free-case-assessment",
    description:
      "Lead-gen landing page — case-assessment form, how it works, what you get, clear-costs split section and common service questions.",
    figma: "Wills, Trusts & Probate Landing Page",
  },
];

export default async function SiteIndexPage() {
  const site = await getSiteSettings();

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader site={site} />
      <main className="bg-ice py-[70px]">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex items-center gap-[24px]">
            <span className="h-px w-[74px] bg-teal" />
            <p className="font-heading text-[18px] font-semibold uppercase tracking-[0.04em] text-teal lg:text-[22px]">
              Site Index
            </p>
          </div>
          <h1 className="mt-[20px] font-heading text-[40px] font-semibold leading-[1.1] text-deep lg:text-[60px]">
            All pages built{" "}
            <span className="heading-accent text-teal">from the Figma designs</span>
          </h1>
          <p className="mt-[20px] max-w-[760px] text-[18px] leading-[28px] text-deep/80 lg:text-[20px]">
            Every page below is built from the Figma file and served from the static JSON CMS.
            Click through to review each one.
          </p>

          <ul className="mt-[50px] grid grid-cols-1 gap-[24px] md:grid-cols-2 xl:grid-cols-3">
            {PAGES.map((page) => (
              <li key={page.href}>
                <a
                  href={page.href}
                  className="group flex h-full flex-col rounded-[16px] border border-deep/12 bg-white p-[30px] transition-shadow hover:shadow-[2px_6px_24px_rgba(0,0,0,0.08)]"
                >
                  <span className="inline-flex w-fit rounded-full bg-mint/40 px-[14px] py-[5px] font-mono text-[13px] font-semibold text-deep">
                    {page.href}
                  </span>
                  <h2 className="mt-[18px] font-heading text-[26px] font-semibold text-deep">
                    {page.title}
                  </h2>
                  <p className="mt-[12px] flex-1 text-[16px] leading-[25px] text-deep/75">
                    {page.description}
                  </p>
                  <span className="mt-[22px] flex items-center gap-[10px] text-[15px] font-semibold text-flame">
                    Visit page
                    <ArrowRightIcon className="size-[22px] transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="mt-[14px] text-[13px] text-deep/45">Figma: {page.figma}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <SiteFooter site={site} />
    </div>
  );
}
