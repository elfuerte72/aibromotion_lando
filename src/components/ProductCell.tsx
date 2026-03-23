interface ProductCellProps {
  bgColor: string;
  src: string;
  alt?: string;
  label?: string;
  textColor?: string;
  mediaType?: "image" | "video";
  objectFit?: "cover" | "contain";
}

export function ProductCell({
  bgColor,
  src,
  alt,
  label,
  textColor = "#000000",
  mediaType = "image",
  objectFit = "contain",
}: ProductCellProps) {
  const fitClass = objectFit === "cover" ? "object-cover" : "object-contain p-8 md:p-12";

  return (
    <div
      className="relative flex flex-col justify-end min-h-[400px] md:min-h-[600px] overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {mediaType === "video" ? (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full ${fitClass}`}
        />
      ) : (
        <img
          src={src}
          alt={alt || ""}
          className={`absolute inset-0 w-full h-full ${fitClass}`}
        />
      )}
      {label && (
        <p
          className="relative z-10 font-body text-xs md:text-sm uppercase tracking-[0.1em] p-6 md:p-10"
          style={{ color: textColor }}
        >
          {label}
        </p>
      )}
    </div>
  );
}
