import { Reveal } from '@/components/primitives/RevealText';

const steps = [
  {
    number: '01',
    title: 'Descobrir',
    description: 'Briefing detalhado, alinhamento de escopo e pesquisa. Entendemos o seu negócio antes de escrever uma linha de código.',
    duration: '~ 1 dia',
    align: 'left',
  },
  {
    number: '02',
    title: 'Construir',
    description: 'Design, desenvolvimento e testes. Você acompanha o progresso em tempo real e aprova cada etapa.',
    duration: '~ 3 dias',
    align: 'right',
  },
  {
    number: '03',
    title: 'Lançar',
    description: 'Deploy, verificação de segurança, correção de bugs e pré-visualização para aprovação final. Só vai ao ar quando estiver perfeito.',
    duration: '~ 1 dia',
    align: 'left',
  },
];

export function Process() {
  return (
    <section className="section border-b border-white/[0.06]" aria-labelledby="process-title">
      <div className="container">
        <div className="mb-16">
          <Reveal>
            <p className="section-label mb-4">05 / PROCESSO</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="font-display font-light text-paper leading-tight"
              id="process-title"
              style={{ fontSize: 'var(--fs-h2)' }}
            >
              Como trabalhamos.
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col gap-0">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.1}>
              <div
                className={`grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-white/[0.06] py-12 md:py-16 ${
                  step.align === 'right' ? 'md:text-right' : ''
                }`}
              >
                {/* Número gigante outline */}
                <div
                  className={`md:col-span-4 flex ${
                    step.align === 'right' ? 'md:justify-end md:order-2' : 'md:justify-start'
                  }`}
                >
                  <span
                    className="font-display font-light leading-none select-none"
                    style={{
                      fontSize: 'clamp(6rem, 16vw, 14rem)',
                      WebkitTextStroke: '1.5px rgb(var(--paper) / 0.32)',
                      color: 'rgb(var(--paper) / 0.04)',
                    }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                </div>

                {/* Conteúdo */}
                <div
                  className={`md:col-span-8 flex flex-col justify-center gap-4 ${
                    step.align === 'right' ? 'md:order-1' : ''
                  }`}
                >
                  <h3
                    className="font-display font-light text-paper leading-none"
                    style={{ fontSize: 'var(--fs-h3)' }}
                  >
                    {step.title}
                  </h3>
                  <p className="font-sans text-paper-dim leading-relaxed max-w-[52ch]" style={{ fontSize: 'var(--fs-lead)' }}>
                    {step.description}
                  </p>
                  <span className="section-label text-paper-soft/50">{step.duration}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
