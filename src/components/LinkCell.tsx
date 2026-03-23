interface LinkCellProps {
  href: string;
  label: string;
  bgColor?: string;
  textColor?: string;
  mediaSrc?: string;
  mediaAlt?: string;
  mediaType?: "image" | "video";
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export function LinkCell({
  href,
  label,
  bgColor = "#000000",
  textColor = "white",
  mediaSrc,
  mediaAlt,
  mediaType = "image",
}: LinkCellProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between min-h-[300px] md:min-h-[600px] overflow-hidden border border-black/10"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {mediaSrc && mediaType === "video" && (
        <video
          src={mediaSrc}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />
      )}
      {mediaSrc && mediaType === "image" && (
        <img
          src={mediaSrc}
          alt={mediaAlt || label}
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />
      )}
      <p className="relative z-10 font-body text-xs md:text-sm uppercase tracking-[0.1em] p-6 md:p-10">
        {label}
      </p>
      <div className="relative z-10 p-6 md:p-10 self-start">
        <ArrowIcon className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </div>
    </a>
  );
}
