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
        <ScrollReveal>
          <MediaCell
            src="/media/hero.png"
            alt="Aibromotion showcase"
            type="image"
          />
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <ProductCell
            bgColor="#ffffff"
            src="/media/robot.mov"
            label="Robot · Showreel"
            textColor="#000000"
            mediaType="video"
            objectFit="cover"
          />
        </ScrollReveal>

        {/* Statement 1: Text LEFT + Media RIGHT */}
        <ScrollReveal>
          <StatementBlock
            text="Мы превращаем идеи в движение. Каждый проект — это история, рассказанная через свет, форму и ритм."
            layout="left"
          />
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <MediaCell
            src="/media/basket.mov"
            type="video"
          />
        </ScrollReveal>

        {/* Group 2: Link + Product video */}
        <ScrollReveal>
          <LinkCell
            href="https://maps.google.com"
            label="Redirect to Google Maps"
            bgColor="#ffffff"
            textColor="#000000"
            mediaSrc="/media/done.mov"
            mediaType="video"
          />
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <ProductCell
            bgColor="#ffffff"
            src="/media/result.mov"
            label="Result · Preview"
            textColor="#000000"
            mediaType="video"
            objectFit="cover"
          />
        </ScrollReveal>

        {/* Statement 2: Media LEFT + Text RIGHT */}
        <ScrollReveal>
          <MediaCell
            src="/media/truck.mov"
            type="video"
          />
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <StatementBlock
            text="Технологии — наш инструмент. Воображение — наш двигатель. Результат — визуальное высказывание."
            layout="right"
          />
        </ScrollReveal>

        {/* Group 3: Image + Product video */}
        <ScrollReveal>
          <MediaCell
            src="/media/gemini.png"
            alt="Aibromotion artwork"
            type="image"
          />
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <ProductCell
            bgColor="#ffffff"
            src="/media/ready.mov"
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
        <ScrollReveal>
          <MediaCell
            src="/media/timeline3.mov"
            type="video"
          />
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <LinkCell
            href="https://substack.com"
            label="Follow Us on Substack"
            bgColor="#ffffff"
            textColor="#000000"
            mediaSrc="/media/heroes.mov"
            mediaType="video"
          />
        </ScrollReveal>

        {/* Group 5: Video + Link to Instagram */}
        <ScrollReveal>
          <MediaCell
            src="/media/timeline.mov"
            type="video"
          />
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
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
