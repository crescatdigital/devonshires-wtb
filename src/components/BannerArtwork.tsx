import Image from "next/image";
import { StarIcon } from "./icons";

export type BannerImage = { src: string; alt: string; width: number; height: number };
export type Testimonial = { stars: number; quote: string; attribution: string };

/**
 * Right-hand banner artwork shared by the hub hero and the service-page
 * banners: duotone shield photo, award badge and floating testimonial card.
 * Hidden below xl where the banner stacks to a single column.
 */
export default function BannerArtwork({
  shieldImage,
  winBadge,
  testimonial,
}: {
  shieldImage: BannerImage;
  winBadge: BannerImage;
  testimonial: Testimonial;
}) {
  return (
    <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[941px] xl:block">
      <div className="absolute left-0 top-[90px] size-[909px]">
        <Image
          src={shieldImage.src}
          alt={shieldImage.alt}
          width={shieldImage.width}
          height={shieldImage.height}
          priority
          className="size-full object-cover"
        />
        <div className="absolute left-[20px] top-[68px] w-[200px]">
          <Image
            src={winBadge.src}
            alt={winBadge.alt}
            width={winBadge.width}
            height={winBadge.height}
            className="h-auto w-full"
          />
        </div>
      </div>
      <div className="pointer-events-auto absolute bottom-[275px] right-[113px] w-[318px] rounded-[20px] border-[3px] border-white bg-deep p-[30px]">
        <div className="flex gap-0">
          {Array.from({ length: testimonial.stars }).map((_, i) => (
            <StarIcon key={i} className="size-[24px]" />
          ))}
        </div>
        <p className="mt-[16px] text-[16px] leading-normal text-white">{testimonial.quote}</p>
        <p className="mt-[14px] text-[12px] text-mint">{testimonial.attribution}</p>
      </div>
    </div>
  );
}
