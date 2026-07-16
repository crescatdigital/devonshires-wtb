import Image from "next/image";
import BannerArtwork, { type BannerImage, type Testimonial } from "./BannerArtwork";
import { ArrowRightIcon, FolderIcon } from "./icons";

type Segment = { text: string; script?: boolean; break?: boolean };
type Cta = { label: string; href: string; icon?: string };

export type BannerData = {
  eyebrow: string;
  headingSegments: Segment[];
  paragraph: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  reviewsBadge: BannerImage;
  timesLogo: BannerImage;
  shieldImage: BannerImage;
  winBadge: BannerImage;
  testimonial: Testimonial;
};

function CtaIcon({ icon }: { icon?: string }) {
  if (icon === "folder") return <FolderIcon className="size-[26px] lg:size-[30px]" />;
  if (icon === "arrow") return <ArrowRightIcon className="size-[28px] lg:size-[32px]" />;
  return null;
}

export default function Banner({ banner }: { banner: BannerData }) {
  return (
    <section className="relative overflow-hidden bg-deep">
      <div className="relative mx-auto max-w-[1920px]">
        <BannerArtwork
          shieldImage={banner.shieldImage}
          winBadge={banner.winBadge}
          testimonial={banner.testimonial}
        />

        <div className="relative px-6 pt-[0] pb-[50px] lg:px-12 xl:pl-[140px] xl:pr-[960px] xl:pt-[100px] xl:pb-[70px]">
          {/* Shield artwork — top of the mobile stack (desktop uses the absolute BannerArtwork) */}
          <div className="-mx-6 flex justify-center sm:mx-0 xl:hidden">
            <div className="relative w-full max-w-none sm:max-w-[420px]">
              <Image
                src={banner.shieldImage.src}
                alt={banner.shieldImage.alt}
                width={banner.shieldImage.width}
                height={banner.shieldImage.height}
                className="h-auto w-full"
              />
              <div className="absolute left-[5%] top-[6%] w-[27%]">
                <Image
                  src={banner.winBadge.src}
                  alt={banner.winBadge.alt}
                  width={banner.winBadge.width}
                  height={banner.winBadge.height}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>

          <p className="text-center font-heading text-[18px] text-mint leading-[100%] md:text-[20px] lg:text-[26px] xl:text-left">{banner.eyebrow}</p>
          <h1 className="mt-[12px] text-center font-heading text-[34px] font-semibold leading-[1.12] text-white min-[360px]:text-[40px] sm:text-[52px] md:mt-[20px] lg:text-[72px] xl:mt-[24px] xl:text-[96px] xl:leading-[115px] xl:text-left">
            {banner.headingSegments.map((seg, i) => (
              <span key={i}>
                {seg.script ? (
                  <span className="font-script font-normal tracking-[6px] text-mint">
                    {seg.text}
                  </span>
                ) : (
                  seg.text
                )}
                {seg.break && <br />}
              </span>
            ))}
          </h1>
          <p className="mx-auto mt-[15px] max-w-[779px] text-center text-[16px] leading-normal text-white sm:text-[20px] lg:mt-[46px] lg:text-[24px] xl:mx-0 xl:text-left">
            {banner.paragraph}
          </p>
          <div className="mt-[25px] flex justify-center gap-[10px] lg:mt-[70px] xl:flex-wrap xl:justify-start xl:gap-[20px]">
            <a
              href={banner.primaryCta.href}
              className="flex h-[40px] min-w-0 flex-1 items-center justify-center gap-[10px] whitespace-nowrap rounded-full bg-flame px-[12px] text-[12px] font-semibold text-white sm:flex-none sm:justify-start sm:px-[22px] sm:text-[16px] lg:h-[76px] lg:gap-[12px] lg:px-[35px] lg:text-[20px]"
            >
              {banner.primaryCta.label}
              <span className="hidden items-center sm:inline-flex">
                <CtaIcon icon={banner.primaryCta.icon ?? "arrow"} />
              </span>
            </a>
            <a
              href={banner.secondaryCta.href}
              className="flex h-[40px] min-w-0 flex-1 items-center justify-center gap-[10px] whitespace-nowrap rounded-full border-[3px] border-flame px-[12px] text-[12px] font-semibold text-white sm:flex-none sm:justify-start sm:px-[24px] sm:text-[16px] lg:h-[76px] lg:gap-[12px] lg:px-[37px] lg:text-[20px]"
            >
              {banner.secondaryCta.label}
              <span className="hidden items-center sm:inline-flex">
                <CtaIcon icon={banner.secondaryCta.icon} />
              </span>
            </a>
          </div>

          <div className="mt-[70px] hidden h-px w-full max-w-[711px] bg-white xl:block" />
          <div className="mt-[28px] flex flex-nowrap items-center justify-between gap-x-[12px] gap-y-6 sm:gap-x-[40px] xl:mt-[28px] xl:flex-wrap xl:justify-start xl:gap-x-[85px]">
            <div className="flex shrink-0 flex-col items-center xl:items-start">
              <Image
                src={banner.reviewsBadge.src}
                alt={banner.reviewsBadge.alt}
                width={banner.reviewsBadge.width}
                height={banner.reviewsBadge.height}
                className="h-[60px] w-auto sm:h-[80px] lg:h-[111px]"
              />
            </div>
            <Image
              src={banner.timesLogo.src}
              alt={banner.timesLogo.alt}
              width={banner.timesLogo.width}
              height={banner.timesLogo.height}
              className="h-[66px] w-auto shrink-0 sm:h-[80px] lg:h-[105px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
