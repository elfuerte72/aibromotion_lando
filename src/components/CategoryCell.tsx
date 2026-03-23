interface CategoryCellProps {
  title: string;
  bgColor: string;
  textColor?: string;
}

export function CategoryCell({
  title,
  bgColor,
  textColor = "#000000",
}: CategoryCellProps) {
  return (
    <div
      className="flex items-center justify-center min-h-[300px] md:min-h-[600px]"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <h3
        className="font-heading uppercase leading-none text-center px-6"
        style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
      >
        {title}
      </h3>
    </div>
  );
}
