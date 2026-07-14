export function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M18 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M13 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FolderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M12 10v6M9 13h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
    </svg>
  );
}

export function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.4" />
      <path d="m16.5 16.5 4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#FFB400" aria-hidden>
      <path d="M12 2.5 8.94 8.74 2 9.75l5.03 4.91-1.2 6.84L12 18.21l6.17 3.29-1.2-6.84L22 9.75l-6.94-1.01L12 2.5Z" />
    </svg>
  );
}

export function ChevronCircleIcon({
  className,
  open = false,
}: {
  className?: string;
  open?: boolean;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 50 50"
      fill="none"
      aria-hidden
    >
      <circle
        cx="25"
        cy="25"
        r="20.8"
        fill={open ? "none" : "#A3F4BA"}
        stroke="#A3F4BA"
        strokeWidth="2.4"
      />

      <path
        d={open ? "M16 28L25 19L34 28" : "M16 22L25 31L34 22"}
        stroke={open ? "#A3F4BA" : "#142C38"}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 30 30" fill="none" aria-hidden>
      <circle cx="15" cy="15" r="15" fill="#2ab3a3" />
      <path
        d="M9 15.5 13 19.5 21.5 11"
        stroke="#f1fffd"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UpArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 19V5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="m5 12 7-7 7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SOCIAL_STYLES: Record<string, { bg: string; label: string }> = {
  facebook: { bg: "#1877F2", label: "Facebook" },
  youtube: { bg: "#FF0000", label: "YouTube" },
  linkedin: { bg: "#0A66C2", label: "LinkedIn" },
};

export function SocialIcon({ network, href }: { network: string; href: string }) {
  const style = SOCIAL_STYLES[network] ?? { bg: "#666", label: network };
  return (
    <a
      href={href}
      aria-label={style.label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex size-[30px] items-center justify-center rounded-full text-white"
      style={{ backgroundColor: style.bg }}
    >
      {network === "facebook" && (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-[16px]" aria-hidden>
          <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.87.24-1.46 1.49-1.46h1.4V5.03c-.28-.04-1.22-.12-2.32-.12-2.3 0-3.87 1.4-3.87 3.98V11H8v3h2.19v7h3.31Z" />
        </svg>
      )}
      {network === "youtube" && (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-[16px]" aria-hidden>
          <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26.2 26.2 0 0 0 2 12c0 1.62.13 3.24.4 4.8a2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77c.27-1.56.4-3.18.4-4.8 0-1.62-.13-3.24-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
        </svg>
      )}
      {network === "linkedin" && (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-[15px]" aria-hidden>
          <path d="M6.94 8.5H3.56V20.4h3.38V8.5ZM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM13 10.14V8.5H9.7V20.4h3.38v-6.27c0-1.42.66-2.27 1.93-2.27 1.17 0 1.73.82 1.73 2.27v6.27h3.5v-7.04c0-3.04-1.72-4.5-4.13-4.5A3.96 3.96 0 0 0 13 10.14Z" />
        </svg>
      )}
    </a>
  );
}
