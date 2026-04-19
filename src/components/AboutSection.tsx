import { useEffect, useRef, useState } from "react";

const TEAM = [
  {
    name: "Максим",
    role: "AI & Автоматизация",
    label: "Тех. директор:",
    caption: "Строит системы, которые работают за вас",
    photo: "/media/Макс.png",
  },
  {
    name: "Антон",
    role: "Маркетинг & Креатив",
    label: "Маркетолог:",
    caption: "Превращает идеи в стратегии, которые работают",
    photo: "/media/Тоха.png",
  },
  {
    name: "Артем",
    role: "Видео & Контент",
    label: "Монтажёр:",
    caption: "Собирает кадры в истории, которые запоминаются",
    photo: "/media/Тема.png",
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const entranceDelay = (i: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
  });

  return (
    <section id="about" ref={sectionRef} className="bg-white border-t border-black">
      {/* Section heading */}
      <div
        className="px-6 md:px-10 pt-10 pb-6"
        style={entranceDelay(0)}
      >
        <p className="font-body text-sm md:text-base text-black/50 max-w-2xl">
          Мы — студия на стыке технологий и визуального сторителлинга. AI-автоматизация, продакшен и креативная стратегия — в одной команде.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {TEAM.map((member, i) => (
          <div key={member.name} style={entranceDelay(i + 1)}>
            <div
              className={`flex flex-col justify-between p-6 md:p-10 min-h-[400px] md:min-h-[520px] border-t ${
                i < 2 ? "border-b md:border-b-0 md:border-r" : "border-b"
              } border-black`}
            >
              {/* Top label */}
              <span className="font-body text-xs uppercase tracking-[0.15em] text-black/50 mb-4">
                {member.label}
              </span>

              {/* Photo */}
              <div className="flex-1 flex flex-col items-center justify-end overflow-hidden">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full max-w-[280px] md:max-w-[320px] object-cover object-top"
                  loading="lazy"
                />
              </div>

              {/* Name & role */}
              <div className="mt-4">
                <p className="font-heading text-xl md:text-2xl font-bold text-dark">
                  {member.name}
                </p>
                <p className="font-body text-sm text-black/50 mt-1">
                  {member.role}
                </p>
              </div>

              {/* Bottom caption */}
              <p className="font-body text-[10px] uppercase tracking-[0.15em] text-black/30 mt-4">
                {member.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
