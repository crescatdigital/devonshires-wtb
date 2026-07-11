"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/lib/cms";
import { ChevronDownIcon, EnvelopeIcon, PhoneIcon, SearchIcon } from "./icons";
import MegaMenu from "./MegaMenu";

function MenuIcon({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" aria-hidden>
      {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}

export default function SiteHeader({ site }: { site: SiteSettings }) {
  const [open, setOpen] = useState(false); // mobile menu
  const [mega, setMega] = useState(false); // desktop mega-menu
  const [mobileSub, setMobileSub] = useState(false); // mobile "what we do" sublist
  const tel = `tel:${site.phone.replace(/\s/g, "")}`;
  const mm = site.megaMenu;

  return (
    <header className="relative z-40 bg-white">
      {/* Top row: logo + actions */}
      <div className="mx-auto flex max-w-[1730px] items-center justify-between gap-4 px-6 pb-2 pt-4 lg:px-12">
        <Link href="/" className="shrink-0">
          <Image
            src={site.logo.src}
            alt={site.logo.alt}
            width={site.logo.width}
            height={site.logo.height}
            priority
            className="h-[52px] w-auto sm:h-[64px] lg:h-[96px]"
          />
        </Link>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex lg:gap-4">
          <a href={tel} className="flex h-[54px] items-center gap-2.5 rounded-full bg-flame px-7 text-[19px] font-semibold text-white">
            <PhoneIcon className="size-[18px]" />
            {site.phone}
          </a>
          <a href={site.header.cta.href} className="flex h-[54px] items-center gap-2.5 rounded-full bg-flame px-7 text-[19px] font-semibold text-white">
            <EnvelopeIcon className="size-[20px]" />
            {site.header.cta.label}
          </a>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <a href={tel} aria-label={`Call ${site.phone}`} className="flex size-[44px] items-center justify-center rounded-full bg-flame text-white">
            <PhoneIcon className="size-[18px]" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Main menu"
            className="flex h-[44px] items-center gap-2 rounded-full bg-teal px-4 text-[15px] font-semibold uppercase tracking-wide text-white"
          >
            Menu
            <MenuIcon open={open} className="size-[20px]" />
          </button>
        </div>
      </div>

      {/* Desktop nav */}
      <nav className="mx-auto hidden max-w-[1730px] flex-wrap items-center justify-center gap-x-12 gap-y-2 px-6 pb-4 pt-2 lg:flex">
        {site.header.navigation.map((item) => {
          const isMega = item.label === mm.trigger;
          if (isMega) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setMega((v) => !v)}
                aria-expanded={mega}
                className={`flex items-center gap-1 rounded-[6px] px-2 py-1 text-[18px] font-semibold tracking-[0.02em] ${
                  mega ? "bg-lite text-teal" : "text-deep hover:text-teal"
                }`}
              >
                {item.label}
                <ChevronDownIcon className={`mt-0.5 size-[14px] transition-transform ${mega ? "rotate-180 text-teal" : "text-deep/70"}`} />
              </button>
            );
          }
          return (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-1 text-[18px] font-semibold tracking-[0.02em] text-deep hover:text-teal"
            >
              {item.label}
              {"hasDropdown" in item && item.hasDropdown && (
                <ChevronDownIcon className="mt-0.5 size-[14px] text-deep/70" />
              )}
            </a>
          );
        })}
        <button aria-label="Search" className="text-deep hover:text-teal">
          <SearchIcon className="size-[20px]" />
        </button>
      </nav>

      {/* Desktop mega-menu panel */}
      {mega && (
        <>
          <button
            aria-label="Close menu"
            onClick={() => setMega(false)}
            className="fixed inset-0 z-30 hidden cursor-default lg:block"
          />
          <div className="absolute left-0 top-full z-40 hidden w-full border-t border-deep/10 bg-white shadow-[0_24px_48px_rgba(0,0,0,0.16)] lg:block">
            <div className="mx-auto max-w-[1730px]">
              <MegaMenu content={mm} onNavigate={() => setMega(false)} />
            </div>
          </div>
        </>
      )}

      {/* Mobile menu panel */}
      {open && (
        <nav className="border-t border-deep/10 bg-white px-6 py-4 lg:hidden">
          <ul className="flex flex-col divide-y divide-deep/10">
            {site.header.navigation.map((item) => {
              const isMega = item.label === mm.trigger;
              if (isMega) {
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => setMobileSub((v) => !v)}
                      aria-expanded={mobileSub}
                      className="flex w-full items-center justify-between py-3 text-[17px] font-semibold text-deep"
                    >
                      {item.label}
                      <ChevronDownIcon className={`size-[16px] text-deep/60 transition-transform ${mobileSub ? "rotate-180" : ""}`} />
                    </button>
                    {mobileSub && (
                      <ul className="pb-3 pl-3">
                        {mm.wtpServices.links.map((l) => (
                          <li key={l.label}>
                            <Link
                              href={l.href}
                              onClick={() => setOpen(false)}
                              className="block py-2 text-[16px] font-medium text-teal"
                            >
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-3 text-[17px] font-semibold text-deep"
                  >
                    {item.label}
                    {"hasDropdown" in item && item.hasDropdown && (
                      <ChevronDownIcon className="size-[16px] text-deep/60" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
          <a
            href={site.header.cta.href}
            onClick={() => setOpen(false)}
            className="mt-4 flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-flame px-6 text-[17px] font-semibold text-white"
          >
            <EnvelopeIcon className="size-[20px]" />
            {site.header.cta.label}
          </a>
        </nav>
      )}
    </header>
  );
}
