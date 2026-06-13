import { Reveal } from '@/components/primitives/RevealText';
import { testimonials } from '@/content/testimonials';
import { TestimonialsColumn } from '@/components/ui/testimonials-columns-1';

const col1 = testimonials.slice(0, 3);
const col2 = testimonials.slice(3, 6);
const col3 = testimonials.slice(5, 8);

export function Testimonials() {
  return (
    <section className="section border-b border-white/[0.06] overflow-hidden" aria-labelledby="testimonials-title">
      <div className="container mb-12">
        <Reveal>
          <p className="section-label mb-4">06 / O QUE DIZEM</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            id="testimonials-title"
            className="font-display font-light text-paper leading-tight"
            style={{ fontSize: 'var(--fs-h2)' }}
          >
            Quem investiu,
            <br />
            <em className="italic text-paper-dim">viu resultado.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="font-sans text-paper-dim mt-4 max-w-[48ch]" style={{ fontSize: 'var(--fs-lead)' }}>
            Resultados reais de clientes de Boa Vista e do Brasil.
          </p>
        </Reveal>
      </div>

      <div className="flex justify-center gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[740px] overflow-hidden">
        <TestimonialsColumn testimonials={col1} duration={20} />
        <TestimonialsColumn testimonials={col2} className="hidden md:block" duration={26} />
        <TestimonialsColumn testimonials={col3} className="hidden lg:block" duration={23} />
      </div>
    </section>
  );
}
