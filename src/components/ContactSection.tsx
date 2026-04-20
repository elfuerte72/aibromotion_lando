import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="contact" className="pt-[140px] pb-10 px-6 bg-paper">
      {/* Mega heading */}
      <h2
        ref={ref}
        className="font-heading font-extrabold uppercase leading-[0.84] tracking-[-0.055em] text-[clamp(80px,18vw,320px)] mb-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
        >
          Готовы
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease }}
        >
          <span className="font-serif italic font-light tracking-[-0.03em]">двигаться?</span>
        </motion.div>
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 pt-12 border-t border-ink">
        {/* Contact */}
        <div>
          <h5 className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-5">
            Contact
          </h5>
          <a
            href="mailto:aibromotion@yandex.com"
            className="font-serif font-light text-[clamp(32px,3.6vw,64px)] italic text-accent tracking-[-0.03em] block"
          >
            aibromotion@yandex.com
          </a>
          <div className="mt-5 text-[15px] leading-relaxed text-ink-2">
            +7 921 777-13-43
            <br />
            <span className="text-muted">Москва, Красный Октябрь, Берсеневская наб. 6с2</span>
          </div>
        </div>

        {/* Index */}
        <div>
          <h5 className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-5">
            Index
          </h5>
          <ul className="flex flex-col gap-2.5 text-[15px]">
            <li><a href="#showreel" className="hover:text-accent transition-colors">Работа</a></li>
            <li><a href="#services" className="hover:text-accent transition-colors">Услуги</a></li>
            <li><a href="#team" className="hover:text-accent transition-colors">Команда</a></li>
            <li><a className="hover:text-accent transition-colors cursor-pointer">Карьера</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h5 className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-5">
            Social
          </h5>
          <ul className="flex flex-col gap-2.5 text-[15px]">
            <li><a className="hover:text-accent transition-colors cursor-pointer">Instagram</a></li>
            <li><a className="hover:text-accent transition-colors cursor-pointer">Telegram</a></li>
            <li><a className="hover:text-accent transition-colors cursor-pointer">YouTube</a></li>
            <li><a className="hover:text-accent transition-colors cursor-pointer">Vimeo</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h5 className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-5">
            Рассылка
          </h5>
          <p className="text-[13px] text-muted mb-3 leading-relaxed">
            Раз в месяц — кейсы, процессы, релизы.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex border-b border-ink pb-2"
          >
            <input
              placeholder="your@email"
              className="bg-transparent border-0 outline-0 flex-1 font-heading text-sm text-ink"
            />
            <button className="bg-transparent border-0 text-accent font-mono text-[11px] font-semibold tracking-[0.16em] uppercase cursor-pointer">
              SIGN ↵
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row justify-between mt-20 pt-6 border-t border-ink font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-muted gap-4">
        <div>&copy; 2026 AIBROMOTION — all rights reserved</div>
        <div>made in-house · no templates</div>
      </div>
    </section>
  );
}
