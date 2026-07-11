import Link from "next/link";
import type { SiteSettings } from "@/lib/cms";
import { SearchIcon } from "./icons";

export default function MegaMenu({
  content,
  onNavigate,
}: {
  content: SiteSettings["megaMenu"];
  onNavigate: () => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-[32px] p-[32px] lg:grid-cols-[280px_1fr] lg:p-[40px]">
      {/* Information Hub sidebar */}
      <div className="h-fit rounded-[16px] bg-teal p-[26px] text-white">
        <h3 className="font-heading text-[20px] font-semibold">{content.informationHub.heading}</h3>
        <div className="mt-[18px] flex items-center gap-[10px] rounded-full bg-white px-[18px] py-[10px]">
          <SearchIcon className="size-[18px] text-teal" />
          <input
            placeholder={content.informationHub.searchPlaceholder}
            className="w-full bg-transparent text-[14px] text-deep placeholder:text-deep/50 focus:outline-none"
          />
        </div>
      </div>

      {/* Claims + WTP services */}
      <div>
        <p className="font-heading text-[15px] font-bold tracking-[0.04em] text-deep">
          {content.compensation.heading}
        </p>
        <ul className="mt-[16px] columns-1 gap-x-[32px] sm:columns-2 xl:columns-3">
          {content.compensation.links.map((l) => (
            <li key={l.label} className="mb-[8px] break-inside-avoid">
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] leading-[20px] text-teal hover:text-flame"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-[26px] border-t border-deep/10 pt-[24px]">
          <p className="font-heading text-[15px] font-bold tracking-[0.04em] text-deep">
            {content.wtpServices.heading}
          </p>
          <ul className="mt-[16px] grid grid-cols-1 gap-[10px] sm:grid-cols-2">
            {content.wtpServices.links.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  onClick={onNavigate}
                  className="text-[15px] font-semibold text-teal hover:text-flame"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
