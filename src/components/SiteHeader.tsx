import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/lib/cms";
import { ChevronDownIcon, EnvelopeIcon, PhoneIcon, SearchIcon } from "./icons";

export default function SiteHeader({ site }: { site: SiteSettings }) {
  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-[1730px] flex-wrap items-center justify-between gap-4 px-6 pb-2 pt-4 lg:px-12">
        <Link href="/" className="shrink-0">
          <Image
            src={site.logo.src}
            alt={site.logo.alt}
            width={site.logo.width}
            height={site.logo.height}
            priority
            className="h-[70px] w-auto lg:h-[96px]"
          />
        </Link>
        <div className="flex flex-wrap items-center gap-3 lg:gap-4">
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="flex h-[48px] items-center gap-2.5 rounded-full bg-flame px-6 text-[17px] font-semibold text-white lg:h-[54px] lg:px-7 lg:text-[19px]"
          >
            <PhoneIcon className="size-[18px]" />
            {site.phone}
          </a>
          <a
            href={site.header.cta.href}
            className="flex h-[48px] items-center gap-2.5 rounded-full bg-flame px-6 text-[17px] font-semibold text-white lg:h-[54px] lg:px-7 lg:text-[19px]"
          >
            <EnvelopeIcon className="size-[20px]" />
            {site.header.cta.label}
          </a>
        </div>
      </div>
      <nav className="mx-auto flex max-w-[1730px] flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 pb-4 pt-2 lg:gap-x-12">
        {site.header.navigation.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-1 text-[16px] font-semibold tracking-[0.02em] text-deep hover:text-teal lg:text-[18px]"
          >
            {item.label}
            {"hasDropdown" in item && item.hasDropdown && (
              <ChevronDownIcon className="mt-0.5 size-[14px] text-deep/70" />
            )}
          </a>
        ))}
        <button aria-label="Search" className="text-deep hover:text-teal">
          <SearchIcon className="size-[20px]" />
        </button>
      </nav>
    </header>
  );
}
