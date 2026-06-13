import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections/Hero';
import { faq } from '@/content/faq';
import { ServicesRibbon } from '@/components/sections/ServicesRibbon';
import { Manifesto } from '@/components/sections/Manifesto';
import { ServicesFlow } from '@/components/sections/ServicesFlow';
import { ProjectsGrid } from '@/components/sections/ProjectsGrid';
import { LogoStrip } from '@/components/sections/LogoStrip';

// Lazy — carregam só quando chegam na viewport
const BenefitsSection   = dynamic(() => import('@/components/sections/BenefitsSection').then(m => ({ default: m.BenefitsSection })));
const StackSection      = dynamic(() => import('@/components/sections/StackSection').then(m => ({ default: m.StackSection })));
const ComparisonSection = dynamic(() => import('@/components/sections/ComparisonSection').then(m => ({ default: m.ComparisonSection })));
const PricingSection    = dynamic(() => import('@/components/sections/PricingSection').then(m => ({ default: m.PricingSection })));
const Process           = dynamic(() => import('@/components/sections/Process').then(m => ({ default: m.Process })));
const Testimonials      = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })));
const SocialConnect     = dynamic(() => import('@/components/sections/SocialConnect').then(m => ({ default: m.SocialConnect })));
const FAQ               = dynamic(() => import('@/components/sections/FAQ').then(m => ({ default: m.FAQ })));
const CTAFinal          = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })));

const DisplayCards = dynamic(
  () => import('@/components/ui/display-cards').then(m => ({ default: m.default })),
  { ssr: false, loading: () => null }
);

const CircularRevealHeading = dynamic(
  () => import('@/components/ui/circular-reveal-heading').then(m => ({ default: m.CircularRevealHeading })),
  { ssr: false, loading: () => null }
);

const InfiniteGallery = dynamic(
  () => import('@/components/ui/3d-gallery-photography'),
  { ssr: false, loading: () => <div className="h-[520px] w-full bg-ink animate-pulse" /> }
);


export const metadata: Metadata = {
  title: 'Arvex Agency — Sites, Sistemas e Automação',
  description:
    'Creative studio de tecnologia em Boa Vista–RR. Sites em 1–5 dias, sistemas web e automação WhatsApp sob medida.',
};

const CRH_ITEMS = [
  { text: 'SITES PREMIUM', image: '/projects/toka-restaurante.png' },
  { text: 'AUTOMAÇÃO',     image: '/projects/financa-br.png'       },
  { text: 'SISTEMAS WEB',  image: '/projects/hospital-vet.png'     },
  { text: 'RESULTADOS',    image: '/projects/nova-store.png'       },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <LogoStrip />
      <ServicesRibbon />

      {/* DisplayCards — serviços em destaque */}
      <section className="section border-b border-white/[0.06] overflow-hidden">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            {/* Texto */}
            <div className="flex-1 max-w-[42ch]">
              <p className="section-label mb-4">O QUE ENTREGAMOS</p>
              <h2
                className="font-display font-light text-paper leading-tight mb-6"
                style={{ fontSize: 'var(--fs-h2)' }}
              >
                Três serviços.<br />
                <span style={{ color: 'rgb(var(--red))' }}>Um studio.</span>
              </h2>
              <p className="font-sans text-paper-dim leading-relaxed" style={{ fontSize: 'var(--fs-lead)' }}>
                Sites do zero, automação WhatsApp e sistemas web — tudo sob medida, entregue com velocidade e sem enrolação.
              </p>
              <div className="flex flex-col gap-3 mt-8">
                {[
                  { num: '01', label: 'Landing Page · R$ 680'           },
                  { num: '02', label: 'Site Institucional · R$ 1.200'   },
                  { num: '03', label: 'Site + Dashboard · R$ 1.680'     },
                ].map((item) => (
                  <div key={item.num} className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-red/60 w-6 shrink-0">{item.num}</span>
                    <span className="font-sans text-sm text-paper-dim">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cards empilhados */}
            <div className="flex-1 flex items-center justify-center py-20 lg:py-10">
              <DisplayCards />
            </div>

          </div>
        </div>
      </section>

      <Manifesto />

      {/* CircularRevealHeading — hover para ver projetos (hidden on mobile) */}
      <section className="hidden md:block section border-b border-white/[0.06]" aria-label="Serviços em destaque">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1">
              <p className="section-label mb-6">03 / ESPECIALIDADES</p>
              <h2
                className="font-display font-light text-paper leading-tight"
                style={{ fontSize: 'var(--fs-h2)' }}
              >
                Cada projeto,<br />
                <span style={{ color: 'rgb(var(--red))' }}>uma entrega.</span>
              </h2>
              <p className="font-sans text-paper-dim mt-6 max-w-[38ch]" style={{ fontSize: 'var(--fs-lead)' }}>
                <span className="hidden md:inline">Passe o mouse sobre as especialidades para ver exemplos reais do nosso trabalho.</span>
                <span className="md:hidden">Toque nas especialidades para ver exemplos reais do nosso trabalho.</span>
              </p>
            </div>
            {/* Wrapper responsivo */}
            <div className="flex justify-center w-[298px] h-[298px] sm:w-[374px] sm:h-[374px] lg:w-[480px] lg:h-[480px] overflow-hidden shrink-0">
              <div className="scale-[0.62] sm:scale-[0.78] lg:scale-100 origin-top-left shrink-0">
                <CircularRevealHeading
                  size="lg"
                  items={CRH_ITEMS}
                  centerText={
                    <div className="text-center">
                      <p className="font-display font-extrabold text-4xl text-paper tracking-tight">ARVEX</p>
                      <p className="font-mono text-[9px] text-paper-soft/50 uppercase tracking-[0.2em] mt-1">creative studio</p>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServicesFlow />
      <ProjectsGrid />

      {/* Galeria 3D — visual imersivo dos projetos */}
      <section className="relative border-b border-white/[0.06] overflow-hidden bg-ink" aria-label="Galeria de projetos">
        <div className="container pt-16 pb-4">
          <p className="section-label mb-3">GALERIA</p>
          <h2
            className="font-display font-light text-paper leading-tight"
            style={{ fontSize: 'var(--fs-h2)' }}
          >
            Projetos que<br />
            <span style={{ color: 'rgb(var(--red))' }}>falam por si.</span>
          </h2>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper-soft/30 mt-6">
            Role o mouse para navegar
          </p>
        </div>
        <InfiniteGallery
          images={[
            { src: '/projects/toka-restaurante.png',    alt: 'Toka Restaurante'      },
            { src: '/projects/somos-green-life.png',    alt: 'Somos Green Life'      },
            { src: '/projects/crevally-black.png',      alt: 'Crevally Black'        },
            { src: '/projects/rafael-mota-toyota.png',  alt: 'Rafael Mota Toyota'    },
            { src: '/projects/hospital-vet.png',        alt: 'Hospital Veterinário'  },
            { src: '/projects/nova-store.png',          alt: 'Nova Living'           },
            { src: '/projects/financa-br.png',          alt: 'Meridian'              },
            { src: '/projects/automacao-prospeccao.png',alt: 'Automação Prospecção'  },
            { src: '/projects/somos-green-life.png',    alt: 'Green Life 2'          },
            { src: '/projects/crevally-black.png',      alt: 'Crevally 2'            },
          ]}
          speed={1.2}
          visibleCount={10}
          className="h-[520px] w-full"
          fadeSettings={{ fadeIn: { start: 0.05, end: 0.25 }, fadeOut: { start: 0.4, end: 0.43 } }}
          blurSettings={{ blurIn: { start: 0.0, end: 0.1 }, blurOut: { start: 0.4, end: 0.43 }, maxBlur: 6.0 }}
        />
      </section>

      <BenefitsSection />
      <StackSection />
      <ComparisonSection />
      <PricingSection />
      <Process />
      <Testimonials />
      <SocialConnect />
      <FAQ />
      <CTAFinal />
    </>
  );
}
