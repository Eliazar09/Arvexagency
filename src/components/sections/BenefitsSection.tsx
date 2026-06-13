'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { SplitReveal, Reveal } from '@/components/primitives/RevealText';
import { cn } from '@/lib/utils';
import { Globe, Zap, Clock, TrendingUp } from 'lucide-react';

/* ── Bento card base ── */
function BentoCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('relative overflow-hidden border border-white/[0.08] bg-ink', className)}>
      {children}
    </div>
  );
}

/* ── Visual: Crescimento de visitantes ── */
function VisualGrowth() {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  const points: [number, number][] = [
    [0, 120], [40, 110], [80, 100], [120, 85], [160, 70],
    [200, 55], [240, 38], [280, 22], [320, 10],
  ];
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
  const areaD = `${pathD} L 320 140 L 0 140 Z`;

  return (
    <svg ref={ref} viewBox="0 0 320 140" className="w-full" preserveAspectRatio="none" style={{ height: 80 }}>
      <defs>
        <linearGradient id="growthFill2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e63946" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#e63946" stopOpacity="0" />
        </linearGradient>
        <filter id="glow2">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {[35, 70, 105].map((y) => (
        <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="white" strokeOpacity="0.04" strokeWidth="1" />
      ))}
      <motion.path d={areaD} fill="url(#growthFill2)"
        initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.4 }}
      />
      <motion.path d={pathD} fill="none" stroke="#e63946" strokeWidth="2"
        strokeLinecap="round" filter="url(#glow2)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle cx="320" cy="10" r="4" fill="#e63946" filter="url(#glow2)"
        initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.4 }}
      />
    </svg>
  );
}

/* ── Visual: Chat WhatsApp ── */
function VisualChat() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  const messages = [
    { from: 'client', text: 'Olá! Gostaria de agendar.',       delay: 0.2 },
    { from: 'bot',    text: '✓ Qual serviço você precisa?',    delay: 0.5 },
    { from: 'client', text: 'Um site profissional.',           delay: 0.8 },
    { from: 'bot',    text: '✓ Confirmado! Retorno em breve.', delay: 1.1 },
  ];

  return (
    <div ref={ref} className="flex flex-col gap-2 px-4 py-3">
      {messages.map((msg, i) => (
        <motion.div key={i}
          className={`flex ${msg.from === 'bot' ? 'justify-end' : 'justify-start'}`}
          initial={{ opacity: 0, y: 6, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: msg.delay, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={`px-3 py-1.5 rounded-2xl max-w-[80%] font-sans text-[11px] leading-snug ${
            msg.from === 'bot'
              ? 'bg-[#25d366]/15 text-[#25d366] border border-[#25d366]/20 rounded-tr-sm'
              : 'bg-white/[0.06] text-white/70 border border-white/[0.06] rounded-tl-sm'
          }`}>
            {msg.text}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Visual: Browser ── */
function VisualBrowser() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <div ref={ref} className="px-4 pb-2">
      <motion.div
        className="w-full rounded-lg overflow-hidden border border-white/[0.08]"
        initial={{ opacity: 0, y: 8, scale: 0.97 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="bg-white/[0.04] border-b border-white/[0.06] px-3 py-2 flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-white/10" />
            <span className="w-2 h-2 rounded-full bg-white/10" />
            <span className="w-2 h-2 rounded-full bg-white/10" />
          </div>
          <div className="flex-1 bg-white/[0.04] rounded-full px-2 py-0.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e63946]/60" />
            <span className="font-mono text-[8px] text-white/30">arvexagency.online</span>
          </div>
        </div>
        <div className="bg-[#080809] px-4 py-3 flex flex-col gap-2.5">
          <div className="flex flex-col gap-1.5">
            <div className="h-1 bg-white/20 rounded-full w-3/4" />
            <div className="h-1 bg-white/10 rounded-full w-1/2" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="h-px bg-white/[0.05] rounded-full w-full" />
            <div className="h-px bg-white/[0.05] rounded-full w-5/6" />
          </div>
          <div className="flex gap-2 mt-1">
            <div className="h-5 bg-[#e63946]/80 rounded px-2 flex items-center">
              <span className="font-mono text-[7px] text-white uppercase tracking-widest">Agendar →</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Section ── */
export function BenefitsSection() {
  return (
    <section className="section border-b border-white/[0.06]" aria-labelledby="benefits-title">
      <div className="container">

        {/* Heading */}
        <div className="mb-12">
          <Reveal>
            <p className="section-label mb-4">POR QUE INVESTIR</p>
          </Reveal>
          <SplitReveal
            text="Site ou automação"
            as="h2"
            delay={0.08}
            stagger={0.05}
            className="font-display font-light text-paper leading-tight"
            style={{ fontSize: 'var(--fs-h2)' }}
          />
          <SplitReveal
            text="multiplicam seus clientes."
            as="h2"
            delay={0.22}
            stagger={0.04}
            className="font-display font-light italic text-paper-dim leading-tight"
            style={{ fontSize: 'var(--fs-h2)' }}
          />
          <Reveal delay={0.4}>
            <p className="font-sans text-paper-dim mt-6 max-w-[55ch]">
              Negócios com presença digital profissional atraem até 3× mais clientes
              que concorrentes sem site — e automações reduzem em até 70% o tempo
              gasto com tarefas repetitivas.
            </p>
          </Reveal>
        </div>

        {/* Bento grid */}
        <div className="relative grid grid-cols-6 gap-3">

          {/* Card 1 — Stat 3× (2 cols) */}
          <BentoCard className="col-span-full lg:col-span-2">
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="relative flex aspect-square size-12 rounded-full border border-white/[0.08] items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-white/[0.04]">
                  <TrendingUp className="size-5 text-red/80" strokeWidth={1} />
                </div>
                <div className="flex items-center gap-1.5 bg-red/10 border border-red/20 px-2 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-red" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-red">crescimento</span>
                </div>
              </div>
              <div>
                <span className="font-display text-5xl font-light text-paper">3×</span>
                <h2 className="mt-3 font-display text-xl font-light text-paper">Mais clientes</h2>
                <p className="mt-2 font-sans text-sm text-paper-dim leading-relaxed">
                  Presença digital profissional multiplica o alcance do seu negócio.
                </p>
              </div>
              <VisualGrowth />
            </div>
          </BentoCard>

          {/* Card 2 — Performance (2 cols) */}
          <BentoCard className="col-span-full sm:col-span-3 lg:col-span-2">
            <div className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="relative flex aspect-square size-16 rounded-full border border-white/[0.08] items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-white/[0.04]">
                  <Globe className="size-6 text-paper-soft/60" strokeWidth={1} />
                </div>
              </div>
              <div className="px-5 pb-4 text-center">
                <h2 className="font-display text-xl font-light text-paper">Performance 100</h2>
                <p className="mt-2 font-sans text-sm text-paper-dim leading-relaxed">
                  Sites entregues com score máximo no Google PageSpeed — carregam em menos de 2s.
                </p>
              </div>
              <VisualBrowser />
              <div className="absolute bottom-3 right-3 bg-white/[0.04] border border-white/[0.08] rounded px-2.5 py-1.5">
                <p className="font-mono text-[8px] text-white/30 uppercase tracking-widest">PageSpeed</p>
                <p className="font-display text-xl text-[#10b981] font-light leading-none mt-0.5">100</p>
              </div>
            </div>
          </BentoCard>

          {/* Card 3 — WhatsApp Bot (2 cols) */}
          <BentoCard className="col-span-full sm:col-span-3 lg:col-span-2">
            <div className="pt-6">
              <div className="flex items-center gap-2 px-4 pb-3 border-b border-white/[0.06]">
                <div className="w-7 h-7 rounded-full bg-[#25d366]/20 border border-[#25d366]/30 flex items-center justify-center">
                  <span className="text-[10px]">🤖</span>
                </div>
                <div>
                  <p className="font-sans text-[11px] text-white font-medium leading-none">Arvex Bot</p>
                  <p className="font-mono text-[9px] text-[#25d366] mt-0.5">● online</p>
                </div>
              </div>
              <VisualChat />
              <div className="px-4 pb-5 mt-2">
                <h2 className="font-display text-xl font-light text-paper">Atendimento automático</h2>
                <p className="mt-2 font-sans text-sm text-paper-dim leading-relaxed">
                  Confirma agendamentos e responde perguntas sem você digitar uma palavra.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Card 4 — Design que converte (3 cols, large) */}
          <BentoCard className="col-span-full lg:col-span-3">
            <div className="grid sm:grid-cols-2 h-full">
              <div className="relative z-10 flex flex-col justify-between gap-10 p-6">
                <div className="relative flex aspect-square size-12 rounded-full border border-white/[0.08] items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-white/[0.04]">
                  <Zap className="size-5 text-paper-soft/60" strokeWidth={1} />
                </div>
                <div className="space-y-2">
                  <h2 className="font-display text-xl font-light text-paper">
                    Primeira impressão que converte
                  </h2>
                  <p className="font-sans text-sm text-paper-dim leading-relaxed">
                    Design profissional gera confiança antes mesmo do primeiro contato. Seu site é o cartão de visitas digital.
                  </p>
                </div>
              </div>
              {/* Design grid visual */}
              <div className="relative border-l border-white/[0.06] p-5 mt-0 sm:mt-0">
                <div className="absolute left-3 top-2 flex gap-1">
                  <span className="block size-2 rounded-full border border-white/[0.10] bg-white/[0.08]" />
                  <span className="block size-2 rounded-full border border-white/[0.10] bg-white/[0.08]" />
                  <span className="block size-2 rounded-full border border-white/[0.10] bg-white/[0.08]" />
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <div className="h-8 bg-red/[0.08] border border-red/20 rounded flex items-center px-3">
                    <span className="font-mono text-[9px] text-red uppercase tracking-widest">Design exclusivo</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-14 bg-white/[0.03] border border-white/[0.06] rounded" />
                    <div className="h-14 bg-white/[0.03] border border-white/[0.06] rounded" />
                  </div>
                  <div className="h-2 bg-white/[0.06] rounded-full w-3/4" />
                  <div className="h-2 bg-white/[0.04] rounded-full w-1/2" />
                  <div className="h-6 bg-red/80 rounded w-1/3 flex items-center justify-center">
                    <span className="font-mono text-[7px] text-white uppercase tracking-widest">Contato →</span>
                  </div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Card 5 — Entrega rápida (3 cols, large) */}
          <BentoCard className="col-span-full lg:col-span-3">
            <div className="grid sm:grid-cols-2 h-full">
              <div className="relative z-10 flex flex-col justify-between gap-10 p-6">
                <div className="relative flex aspect-square size-12 rounded-full border border-white/[0.08] items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-white/[0.04]">
                  <Clock className="size-5 text-paper-soft/60" strokeWidth={1} />
                </div>
                <div className="space-y-2">
                  <h2 className="font-display text-xl font-light text-paper">
                    Entregue em 1–5 dias úteis
                  </h2>
                  <p className="font-sans text-sm text-paper-dim leading-relaxed">
                    Do briefing ao deploy sem enrolação. Sites prontos, testados e no ar em tempo recorde.
                  </p>
                </div>
              </div>
              {/* Timeline visual */}
              <div className="relative border-l border-white/[0.06] p-5">
                <div className="flex flex-col gap-0 h-full justify-center">
                  {[
                    { step: '01', label: 'Briefing', color: 'border-red/40 text-red' },
                    { step: '02', label: 'Design',   color: 'border-white/20 text-paper-soft/60' },
                    { step: '03', label: 'Código',   color: 'border-white/20 text-paper-soft/60' },
                    { step: '04', label: 'Deploy',   color: 'border-white/20 text-paper-soft/60' },
                  ].map((item, i, arr) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-7 h-7 rounded-full border flex items-center justify-center font-mono text-[9px] ${item.color}`}>
                          {item.step}
                        </div>
                        {i < arr.length - 1 && <div className="w-px h-6 bg-white/[0.06]" />}
                      </div>
                      <span className="font-sans text-sm text-paper-dim mt-1.5">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
