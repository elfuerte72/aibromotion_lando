import { ProductCell } from "@/components/ProductCell";
import { LinkCell } from "@/components/LinkCell";
import { MediaCell } from "@/components/MediaCell";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StatementBlock } from "@/components/StatementBlock";

export function ProductGrid() {
  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Group 1: Hero image + Product video */}
        <ScrollReveal variant="clip-reveal">
          <MediaCell
            src="/media/hero.png"
            alt="Aibromotion showcase"
            type="image"
          />
        </ScrollReveal>
        <ScrollReveal variant="clip-reveal" delay={0.15}>
          <ProductCell
            bgColor="#ffffff"
            src="/media/robot.mp4"
            label="Robot · Showreel"
            textColor="#000000"
            mediaType="video"
            objectFit="cover"
          />
        </ScrollReveal>

        {/* Statement 1: Text LEFT + Media RIGHT */}
        <StatementBlock
          text="Мы превращаем идеи в движение. Каждый проект — это история, рассказанная через свет, форму и ритм."
          layout="left"
        />
        <ScrollReveal variant="clip-reveal" delay={0.15}>
          <MediaCell
            src="/media/basket.mp4"
            type="video"
          />
        </ScrollReveal>

        {/* Group 2: Link + Product video */}
        <ScrollReveal variant="clip-reveal">
          <MediaCell
            src="/media/done.mp4"
            type="video"
          />
        </ScrollReveal>
        <ScrollReveal variant="clip-reveal" delay={0.15}>
          <ProductCell
            bgColor="#ffffff"
            src="/media/result.mp4"
            label="Result · Preview"
            textColor="#000000"
            mediaType="video"
            objectFit="cover"
          />
        </ScrollReveal>

        {/* Statement 2: Media LEFT + Text RIGHT */}
        <ScrollReveal variant="clip-reveal">
          <MediaCell
            src="/media/truck.mp4"
            type="video"
          />
        </ScrollReveal>
        <StatementBlock
          text="Технологии — наш инструмент. Воображение — наш двигатель. Результат — визуальное высказывание."
          layout="right"
        />

        {/* Group 3: Image + Product video */}
        <ScrollReveal variant="clip-reveal">
          <MediaCell
            src="/media/gemini.png"
            alt="Aibromotion artwork"
            type="image"
          />
        </ScrollReveal>
        <ScrollReveal variant="clip-reveal" delay={0.15}>
          <ProductCell
            bgColor="#ffffff"
            src="/media/ready.mp4"
            label="Ready · Final"
            textColor="#000000"
            mediaType="video"
            objectFit="cover"
          />
        </ScrollReveal>

        {/* Statement 3: Full-width */}
        <StatementBlock
          text="Мы не следуем трендам — мы создаём визуальный язык, который говорит громче слов."
          layout="full"
        />

        {/* Group 4: Video + Link with video */}
        <ScrollReveal variant="clip-reveal">
          <MediaCell
            src="/media/timeline3.mp4"
            type="video"
          />
        </ScrollReveal>
        <ScrollReveal variant="clip-reveal" delay={0.15}>
          <MediaCell
            src="/media/heroes.mp4"
            type="video"
          />
        </ScrollReveal>

        {/* Group 5: Video + Link to Instagram */}
        <ScrollReveal variant="clip-reveal">
          <MediaCell
            src="/media/timeline.mp4"
            type="video"
          />
        </ScrollReveal>
        <ScrollReveal delay={0.15} variant="fade-up">
          <LinkCell
            href="https://www.instagram.com/aibromotion/"
            label="Наш Instagram"
            bgColor="#ffffff"
            textColor="#000000"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
