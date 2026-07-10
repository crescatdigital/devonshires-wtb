import Image from "next/image";
import BannerArtwork, { type BannerImage, type Testimonial } from "./BannerArtwork";
import { ArrowRightIcon, FolderIcon, StarIcon } from "./icons";

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

        <div className="relative px-6 py-[70px] lg:px-12 xl:pl-[175px] xl:pr-[960px] xl:py-[90px]">
          <p className="font-heading text-[20px] text-mint lg:text-[26px]">{banner.eyebrow}</p>
          <h1 className="mt-[24px] font-heading text-[52px] font-semibold leading-[1.2] text-white lg:text-[72px] xl:text-[96px]">
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
          <p className="mt-[46px] max-w-[779px] text-[20px] leading-normal text-white lg:text-[24px]">
            {banner.paragraph}
          </p>
          <div className="mt-[86px] flex flex-wrap gap-[20px]">
            <a
              href={banner.primaryCta.href}
              className="flex h-[64px] items-center gap-[12px] rounded-full bg-flame px-[35px] text-[18px] font-semibold text-white lg:h-[76px] lg:text-[20px]"
            >
              {banner.primaryCta.label}
              <CtaIcon icon={banner.primaryCta.icon ?? "arrow"} />
            </a>
            <a
              href={banner.secondaryCta.href}
              className="flex h-[64px] items-center gap-[12px] rounded-full border-[3px] border-flame px-[37px] text-[18px] font-semibold text-white lg:h-[76px] lg:text-[20px]"
            >
              {banner.secondaryCta.label}
              <CtaIcon icon={banner.secondaryCta.icon} />
            </a>
          </div>
          {/* Mobile shield artwork (desktop uses the absolute BannerArtwork) */}
          <div className="mt-[50px] flex flex-col items-center gap-[24px] xl:hidden">
            <div className="relative w-full max-w-[380px]">
              <Image
                src={banner.shieldImage.src}
                alt={banner.shieldImage.alt}
                width={banner.shieldImage.width}
                height={banner.shieldImage.height}
                className="h-auto w-full"
              />
              <div className="absolute left-[6%] top-[8%] w-[26%]">
                <Image
                  src={banner.winBadge.src}
                  alt={banner.winBadge.alt}
                  width={banner.winBadge.width}
                  height={banner.winBadge.height}
                  className="h-auto w-full"
                />
              </div>
            </div>
            <div className="w-full max-w-[380px] rounded-[20px] border-[3px] border-white bg-deep p-[24px]">
              <div className="flex gap-0">
                {Array.from({ length: banner.testimonial.stars }).map((_, i) => (
                  <StarIcon key={i} className="size-[22px]" />
                ))}
              </div>
              <p className="mt-[14px] text-[15px] leading-normal text-white">{banner.testimonial.quote}</p>
              <p className="mt-[12px] text-[12px] text-mint">{banner.testimonial.attribution}</p>
            </div>
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
