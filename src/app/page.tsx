import type { Metadata } from "next";
import { getHubPage, getPageSeo, getSiteSettings } from "@/lib/cms";
import SiteHeader from "@/components/SiteHeader";
import Banner from "@/components/Banner";
import PracticeAreas from "@/components/PracticeAreas";
import WhyItMatters from "@/components/WhyItMatters";
import WhyUs from "@/components/WhyUs";
import FaqSection from "@/components/FaqSection";
import ServicesGrid from "@/components/ServicesGrid";
import SiteFooter from "@/components/SiteFooter";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("home");
  if (!seo) return {};
  return { title: seo.metaTitle, description: seo.metaDescription };
}

export default async function Home() {
  const [site, hub] = await Promise.all([getSiteSettings(), getHubPage()]);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader site={site} />
      <main>
        <Banner banner={hub.banner} />
        <PracticeAreas content={hub.practiceAreas} />
        <WhyItMatters content={hub.whyItMatters} />
        <WhyUs content={hub.whyUs} />
        <FaqSection content={hub.faq} />
        <ServicesGrid content={hub.services} />
      </main>
      <SiteFooter site={site} />
    </div>
  );
}
