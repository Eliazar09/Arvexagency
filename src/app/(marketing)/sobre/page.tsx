import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/primitives/RevealText';
import { MagneticLink } from '@/components/primitives/MagneticLink';

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Conheça a Arvex BR — creative studio de tecnologia baseado em Boa Vista, RR. Nossa história, princípios e as pessoas por trás do trabalho.',
};

const principles = [
  {
    number: '01',
    title: 'Obsessão com qualidade',
    description: 'Cada detalhe importa. Um pixel errado, uma linha de código desnecessária, uma cor que não está no sistema — tudo isso importa. Nosso padrão não tem dia ruim.',
  },
  {
    number: '02',
    title: 'Transparência total',
    description: 'Você sabe o que está sendo feito, por que, e quando vai ficar pronto. Sem surpresas de escopo, sem promessa que não entregamos.',
  },
  {
    number: '03',
    title: 'Tecnologia a serviço do negócio',
    description: 'Não usamos tecnologia porque é nova ou interessante. Usamos porque resolve um problema real do seu negócio com a menor fricção possível.',
  },
  {
    number: '04',
    title: 'Relação de longo prazo',
    description: 'Preferimos menos clientes com mais profundidade do que muitos projetos superficiais. Crescemos quando nossos clientes crescem.',
  },
];

const timeline = [
  { year: '2019', event: 'Primeiro projeto — site para clínica médica em Boa Vista' },
  { year: '2020', event: 'Expansão para design de identidade visual e primeiros e-commerces' },
  { year: '2021', event: 'Início dos projetos de automação e sistemas com n8n' },
  { year: '2022', event: 'Primeiros clientes de outras regiões do Brasil e América Latina' },
  { year: '2023', event: 'Adição do serviço de edição de vídeo e design para social' },
  { year: '2024', event: 'Rebranding da agência e lançamento deste novo site' },
];

export default function SobrePage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[55vh] flex items-end border-b border-white/[0.06]">
        <div className="container pb-16 pt-[120px]">
          <Reveal>
            <p className="section-label mb-6">SOBRE</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display font-light leading-tight" style={{ fontSize: 'var(--fs-h1)' }}>
              One Studio.
              <br />
              <em className="italic text-paper-dim">Seis disciplinas.</em>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Manifesto longo */}
      <section className="section border-b border-white/[0.06]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="section-label mb-6">QUEM SOMOS</p>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <p className="font-sans text-paper-dim leading-relaxed mb-6" style={{ fontSize: 'var(--fs-lead)' }}>
                  A Arvex BR nasceu em Boa Vista, Roraima — não por acidente, mas por convicção de que qualidade de execução não tem endereço. Somos a prova de que é possível entregar trabalho de referência internacional a partir da Amazônia.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="font-sans text-paper-dim leading-relaxed mb-6" style={{ fontSize: 'var(--fs-lead)' }}>
                  Não somos uma agência de 50 pessoas com contas gigantes e processo engessado. Somos um studio — pequeno por escolha, meticuloso por princípio. Cada projeto passa por um time reduzido que conhece profundamente o seu negócio.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="font-sans text-paper-dim leading-relaxed" style={{ fontSize: 'var(--fs-lead)' }}>
                  Integramos as seis disciplinas — sites, automação, e-commerce, identidade, vídeo e social — porque acreditamos que a melhor marca digital é aquela construída com consistência entre todos os pontos de contato, não terceirizada em pedaços para agências diferentes.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Princípios */}
      <section className="section border-b border-white/[0.06]">
        <div className="container">
          <Reveal>
            <p className="section-label mb-12">NOSSOS PRINCÍPIOS</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04]">
            {principles.map((p, i) => (
              <Reveal key={p.number} delay={i * 0.08}>
                <div className="bg-ink p-8">
                  <span className="font-mono text-xs text-paper-soft/30 block mb-4">{p.number}</span>
                  <h3 className="font-display text-2xl font-light text-paper mb-4">{p.title}</h3>
                  <p className="font-sans text-sm text-paper-dim leading-relaxed">{p.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Linha do tempo */}
      <section className="section border-b border-white/[0.06]">
        <div className="container">
          <Reveal>
            <p className="section-label mb-12">TRAJETÓRIA</p>
          </Reveal>
          <div className="flex flex-col gap-0">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.06}>
                <div className="grid grid-cols-12 gap-8 border-t border-white/[0.06] py-6">
                  <span className="col-span-3 md:col-span-2 font-mono text-sm text-red">{item.year}</span>
                  <p className="col-span-9 md:col-span-10 font-sans text-paper-dim">{item.event}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container text-center">
          <Reveal>
            <h2 className="font-display font-light text-paper mb-6" style={{ fontSize: 'var(--fs-h2)' }}>
              Vamos trabalhar juntos?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <MagneticLink>
              <Link
                href="/contato"
                className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-widest bg-red text-paper px-8 py-4 hover:bg-red-deep transition-colors"
              >
                Agendar conversa →
              </Link>
            </MagneticLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
