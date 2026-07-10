import type { Metadata } from "next";
import { getLandingPage, getSiteSettings } from "@/lib/cms";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ServiceQuestions from "@/components/ServiceQuestions";
import {
  LandingHero,
  TrustBadges,
  HelpWhen,
  HowItWorks,
  WhatYouGet,
  SplitSection,
} from "@/components/landing";

export const metadata: Metadata = {
  title: "Free Case Assessment | Wills, Trusts & Probate | Devonshires Claims",
  description:
    "Specialist Wills, Trusts & Probate solicitors. Request a free, no-obligation case assessment — we review your situation, explain your options and outline costs before you decide.",
};

export default async function LandingPage() {
  const [site, page] = await Promise.all([getSiteSettings(), getLandingPage()]);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader site={site} />
      <main>
        <LandingHero content={page.banner} />
        <TrustBadges content={page.trustBadges} />
        <HelpWhen content={page.helpWhen} />
        <HowItWorks content={page.howItWorks} />
        <WhatYouGet content={page.whatYouGet} />
        <SplitSection content={page.split} />
        <ServiceQuestions content={page.faq} />
      </main>
      <SiteFooter site={site} />
    </div>
  );
}
