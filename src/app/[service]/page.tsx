import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getServicePage,
  getServicesGrid,
  getServiceSlugs,
  getSiteSettings,
  type ServiceSlug,
} from "@/lib/cms";
import SiteHeader from "@/components/SiteHeader";
import Banner from "@/components/Banner";
import ServiceOverview from "@/components/ServiceOverview";
import ServiceReasons from "@/components/ServiceReasons";
import WhyUs from "@/components/WhyUs";
import ServiceJourney from "@/components/ServiceJourney";
import FaqSection from "@/components/FaqSection";
import ServicesGrid from "@/components/ServicesGrid";
import SiteFooter from "@/components/SiteFooter";

export const dynamicParams = false;

export function generateStaticParams() {
  return getServiceSlugs().map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const page = await getServicePage(service as ServiceSlug);
  if (!page) return {};
  const title = page.overview.headingAccent;
  return {
    title: `${title.charAt(0).toUpperCase()}${title.slice(1)} | Devonshires Claims`,
    description: page.banner.paragraph,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const [site, page, servicesGrid] = await Promise.all([
    getSiteSettings(),
    getServicePage(service as ServiceSlug),
    getServicesGrid(),
  ]);

  if (!page) notFound();

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader site={site} />
      <main>
        <Banner banner={page.banner} />
        <ServiceOverview content={page.overview} />
        <ServiceReasons content={page.reasons} />
        <WhyUs content={page.whyUs} />
        <div id="journey">
          <ServiceJourney content={page.journey} />
        </div>
        <FaqSection content={page.faq} variant="light" />
        <ServicesGrid content={"services" in page ? page.services : servicesGrid} />
      </main>
      <SiteFooter site={site} />
    </div>
  );
}
