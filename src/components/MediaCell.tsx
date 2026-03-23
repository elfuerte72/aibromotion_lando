interface MediaCellProps {
  src: string;
  alt?: string;
  type: "image" | "video";
  className?: string;
}

export function MediaCell({ src, alt, type, className = "" }: MediaCellProps) {
  if (type === "video") {
    return (
      <div className={`min-h-[400px] md:min-h-[600px] overflow-hidden relative ${className}`}>
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover absolute inset-0"
        />
      </div>
    );
  }

  return (
    <div className={`min-h-[400px] md:min-h-[600px] overflow-hidden relative ${className}`}>
      <img
        src={src}
        alt={alt || ""}
        className="w-full h-full object-cover absolute inset-0"
      />
    </div>
  );
}
