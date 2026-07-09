import Image from "next/image";
import type { HubPageContent } from "@/lib/cms";
import { ArrowRightIcon, FolderIcon, StarIcon } from "./icons";

export default function Hero({ banner }: { banner: HubPageContent["banner"] }) {
  return (
    <section className="relative overflow-hidden bg-deep">
      <div className="relative mx-auto max-w-[1920px]">
        {/* Right side — shield artwork, badge and testimonial (desktop only) */}
        <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[941px] xl:block">
          <div className="absolute left-0 top-[90px] size-[909px]">
            <Image
              src={banner.shieldImage.src}
              alt={banner.shieldImage.alt}
              width={banner.shieldImage.width}
              height={banner.shieldImage.height}
              priority
              className="size-full object-cover"
            />
            <div className="absolute left-[20px] top-[68px] w-[200px]">
              <Image
                src={banner.winBadge.src}
                alt={banner.winBadge.alt}
                width={banner.winBadge.width}
                height={banner.winBadge.height}
                className="h-auto w-full"
              />
            </div>
          </div>
          <div className="pointer-events-auto absolute bottom-[185px] right-[113px] w-[318px] rounded-[20px] border-[3px] border-white bg-deep p-[30px]">
            <div className="flex gap-0">
              {Array.from({ length: banner.testimonial.stars }).map((_, i) => (
                <StarIcon key={i} className="size-[24px]" />
              ))}
            </div>
            <p className="mt-[16px] text-[16px] leading-normal text-white">
              {banner.testimonial.quote}
            </p>
            <p className="mt-[14px] text-[12px] text-mint">{banner.testimonial.attribution}</p>
          </div>
        </div>

        {/* Left side content */}
        <div className="relative px-6 py-[70px] lg:px-12 xl:pl-[175px] xl:pr-[960px] xl:py-[90px]">
          <p className="font-heading text-[20px] text-mint lg:text-[26px]">{banner.eyebrow}</p>
          <h1 className="mt-[24px] font-heading text-[52px] font-semibold leading-[1.2] text-white lg:text-[72px] xl:text-[96px] xl:whitespace-nowrap">
            {banner.headingBefore}{" "}
            <span className="font-script text-[54px] font-normal tracking-[8px] text-mint lg:text-[76px] xl:text-[100px]">
              {banner.headingScript}
            </span>
            <br />
            {banner.headingAfter.split("&")[0]}
            <br />
            {"& "}
            {banner.headingAfter.split("& ")[1]}
          </h1>
          <p className="mt-[46px] max-w-[779px] text-[20px] leading-normal text-white lg:text-[24px]">
            {banner.paragraph}
          </p>
          <div className="mt-[86px] flex flex-wrap gap-[20px]">
            <a
              href={banner.primaryCta.href}
              className="flex h-[64px] items-center gap-[12px] rounded-full bg-flame px-[35px] text-[18px] font-semibold text-white lg:h-[76px] lg:text-[20px]"
            >
              {banner.primaryCta.label}
              <ArrowRightIcon className="size-[28px] lg:size-[32px]" />
            </a>
            <a
              href={banner.secondaryCta.href}
              className="flex h-[64px] items-center gap-[12px] rounded-full border-[3px] border-flame px-[37px] text-[18px] font-semibold text-white lg:h-[76px] lg:text-[20px]"
            >
              {banner.secondaryCta.label}
              <FolderIcon className="size-[26px] lg:size-[30px]" />
            </a>
          </div>
          <div className="mt-[70px] h-px w-full max-w-[711px] bg-white/30" />
          <div className="mt-[28px] flex flex-wrap items-center gap-x-[85px] gap-y-6">
            <Image
              src={banner.reviewsBadge.src}
              alt={banner.reviewsBadge.alt}
              width={banner.reviewsBadge.width}
              height={banner.reviewsBadge.height}
              className="h-[90px] w-auto lg:h-[111px]"
            />
            <Image
              src={banner.timesLogo.src}
              alt={banner.timesLogo.alt}
              width={banner.timesLogo.width}
              height={banner.timesLogo.height}
              className="h-[85px] w-auto lg:h-[105px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
