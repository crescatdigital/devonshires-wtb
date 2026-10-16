import type { Metadata } from "next";
import { getPageSeo, getPricingPage, getSiteSettings } from "@/lib/cms";
import { PricingProvider } from "@/components/pricing-client";
import SiteHeader from "@/components/SiteHeader";
import ServicesGrid from "@/components/ServicesGrid";
import SiteFooter from "@/components/SiteFooter";
import {
  DisbursementsPricing,
  NoSurprises,
  PowersOfAttorneyPricing,
  PricingContact,
  PricingHero,
  ProbatePricing,
  VatNotice,
  WillsPricing,
} from "@/components/pricing";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("pricing");
  if (seo) return { title: seo.metaTitle, description: seo.metaDescription };
  return {
    title: "Private Client Pricing | Wills, Trusts & Probate | Devonshires Claims",
    description:
      "Clear fees for wills, powers of attorney and probate. Fixed fees and transparent hourly rates from Devonshires Claims, with VAT and disbursements shown separately.",
  };
}

export default async function PricingPage() {
  const [site, page] = await Promise.all([getSiteSettings(), getPricingPage()]);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader site={site} />
      <main className="bg-lite">
        <PricingProvider vat={page.vat}>
          <PricingHero content={page.hero} />
          <VatNotice content={page.vatNotice} />
          <WillsPricing content={page.wills} />
          <PowersOfAttorneyPricing content={page.powersOfAttorney} />
          <ProbatePricing content={page.probate} />
          <DisbursementsPricing content={page.disbursements} />
          <NoSurprises content={page.noSurprises} />
          <PricingContact content={page.contact} />
        </PricingProvider>
        <ServicesGrid content={page.services} />
      </main>
      <SiteFooter site={site} />
    </div>
  );
}
