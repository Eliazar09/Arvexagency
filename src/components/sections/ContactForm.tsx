'use client';

import { useState, forwardRef, useRef } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
// html2canvas e jsPDF são importados dinamicamente em onSubmit (~270KB fora do bundle inicial)
import { PdfTemplate } from './PdfTemplate';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type FormData } from '@/lib/contact-schema';
import { SITE } from '@/config/site';
import { track } from '@vercel/analytics';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle, Loader2, Calendar,
  Globe, Wrench, Zap, LayoutDashboard, Code2, HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Data ─────────────────────────────────────────────────────────────────────

const STEPS = [
  { id: 'voce',      label: 'Você'         },
  { id: 'empresa',   label: 'Empresa'      },
  { id: 'servico',   label: 'Serviço'      },
  { id: 'projeto',   label: 'Projeto'      },
  { id: 'agenda',    label: 'Envio'        },
];

const SEGMENTS = [
  'Restaurante / Alimentação',
  'Saúde / Clínica / Veterinário',
  'Advocacia / Consultoria',
  'Comércio / Loja',
  'Educação / Cursos',
  'Beleza / Estética',
  'Imóveis / Construtora',
  'Tecnologia / SaaS',
  'Outro',
];

const SERVICES = [
  { id: 'landing-page',       label: 'Landing Page',        price: 'R$ 680',      Icon: Globe,          desc: '1 página objetiva para apresentar seu negócio e captar clientes' },
  { id: 'site-institucional', label: 'Site Institucional',  price: 'R$ 1.200',    Icon: Wrench,         desc: 'Site com múltiplas páginas — home, sobre, serviços, contato'     },
  { id: 'site-dashboard',     label: 'Site + Dashboard',    price: 'R$ 1.680',    Icon: LayoutDashboard,desc: 'Site institucional com painel para gerir produtos e cadastros'     },
  { id: 'sistema',            label: 'Sistema Web / CRM',   price: 'Sob consulta',Icon: Code2,          desc: 'Agendamento, CRM e sistemas sob medida para o seu negócio'        },
  { id: 'automacao',          label: 'Automação WhatsApp',  price: 'Sob consulta',Icon: Zap,            desc: 'Atendimento automático e fluxos inteligentes no WhatsApp'         },
  { id: 'outro',              label: 'Outro / Não sei',     price: 'Vamos ver',   Icon: HelpCircle,     desc: 'Me conta o que você precisa e encontramos a melhor solução'      },
];

const GOALS = [
  'Atrair mais clientes online',
  'Automatizar o atendimento',
  'Organizar e gerenciar leads',
  'Profissionalizar minha presença digital',
  'Substituir site desatualizado',
  'Lançar produto ou empresa',
];

const TIMELINES = [
  { id: 'urgente',  label: 'Urgente',    sub: 'até 1 semana'   },
  { id: 'breve',    label: 'Breve',      sub: '1–2 semanas'    },
  { id: 'normal',   label: 'Normal',     sub: 'dentro de 1 mês' },
  { id: 'flex',     label: 'Sem pressa', sub: '2+ meses'       },
];

const TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

const STEP_FIELDS: Record<number, (keyof FormData)[]> = {
  0: ['name', 'email', 'whatsappCode', 'whatsappNumber'],
  1: ['segment', 'hasSite'],
  2: ['service'],
  3: ['goal', 'timeline', 'message'],
  4: ['contactMethod', 'lgpdConsent'],
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-soft/55">
      {children}
    </span>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="font-sans text-xs text-red mt-1 flex items-center gap-1">
      <span aria-hidden>×</span> {message}
    </p>
  );
}

const TextInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { error?: string }
>(({ placeholder, type = 'text', error, ...props }, ref) => {
  return (
    <>
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={cn(
          'w-full bg-transparent border-b py-3 font-sans text-base text-paper placeholder:text-paper-soft/30',
          'focus:outline-none transition-colors duration-300',
          error ? 'border-red/60' : 'border-white/15 focus:border-red'
        )}
        {...props}
      />
      <FieldError message={error} />
    </>
  );
});
TextInput.displayName = 'TextInput';

function RadioCard({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full text-left p-4 border transition-all duration-200',
        selected
          ? 'border-red/60 bg-red/[0.06]'
          : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20'
      )}
    >
      {children}
    </button>
  );
}

// ─── Min date helper ──────────────────────────────────────────────────────────

function getMinDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ContactForm() {
  const [step, setStep]         = useState(0);
  const [dir, setDir]           = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      hasSite:        'nao',
      contactMethod:  'mensagem',
      whatsappCode:   '+55',
      whatsappNumber: '',
      lgpdConsent:    false,
    },
  });

  const hasSite       = useWatch({ control, name: 'hasSite' });
  const contactMethod = useWatch({ control, name: 'contactMethod' });

  const go = async (next: number) => {
    const fields = STEP_FIELDS[step];
    const valid  = await trigger(fields);
    if (!valid) return;
    setDir(next > step ? 1 : -1);
    setStep(next);
    // Funil: registra avanço de etapa para identificar onde as pessoas desistem
    if (next > step) {
      track('form_step_avancou', { etapa: STEPS[next]?.id ?? String(next) });
    }
  };

  const pdfRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [pdfData, setPdfData] = useState<FormData | null>(null);

  const onSubmit = async (_data: FormData) => {
    setLoading(true);
    let pdfOk = false;

    try {
      // ── Item 3: salva o lead via API antes de abrir o WhatsApp ─────────────
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ..._data,
            _hp: honeypotRef.current?.value ?? '',
          }),
        });
      } catch (apiErr) {
        // API falhou — sem travar o usuário; WhatsApp é o fallback
        console.warn('[ContactForm] API /contact indisponível:', apiErr);
      }

      // ── Prepara o template e aguarda render ──────────────────────────────────
      setPdfData(_data);
      await new Promise((r) => setTimeout(r, 200));

      // ── Gera PDF (Item 2: fallback se falhar) ────────────────────────────────
      if (pdfRef.current) {
        try {
          const html2canvas = (await import('html2canvas')).default;
          const { jsPDF } = await import('jspdf');
          const canvas = await html2canvas(pdfRef.current, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#0a0a0b',
          });
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`Briefing_Arvex_${_data.name ? _data.name.replace(/\s+/g, '') : 'Projeto'}.pdf`);
          pdfOk = true;
        } catch (pdfErr) {
          console.error('[ContactForm] Falha ao gerar PDF:', pdfErr);
          // Não trava — continua para o WhatsApp mesmo sem PDF
        }
      }

      // ── Monta mensagem do WhatsApp ────────────────────────────────────────────
      const pdfNote = pdfOk
        ? '_💡 Olá, acabei de gerar meu briefing detalhado em PDF pelo seu site! Estou enviando o arquivo PDF em anexo logo abaixo para darmos andamento._ 👇'
        : '_💡 Olá, vim pelo site da Arvex e gostaria de dar andamento ao meu projeto!_';

      const message = `*Novo Contato via Site* 🌐

*Nome:* ${_data.name || 'Não informado'}
*WhatsApp:* ${_data.whatsappCode} ${_data.whatsappNumber}
*Serviço:* ${_data.service}

*Preferência de Retorno:* ${_data.contactMethod === 'meet' ? `Google Meet (${_data.meetDate} às ${_data.meetTime})` : 'Apenas Mensagem'}

${pdfNote}`;

      await new Promise((r) => setTimeout(r, pdfOk ? 500 : 100));
      window.open(`${SITE.contact.waBase}?text=${encodeURIComponent(message)}`, '_blank');
      track('form_enviado', {
        servico: _data.service,
        metodo: _data.contactMethod,
        pdf: pdfOk ? 'sim' : 'nao',
      });
      setSubmitted(true);
    } catch (outerErr) {
      // Item 2: garante que o usuário NUNCA fica preso
      console.error('[ContactForm] Erro inesperado:', outerErr);
      const basicMsg = `*Novo Contato via Site* 🌐\n*Nome:* ${_data.name || 'Não informado'}\n*WhatsApp:* ${_data.whatsappCode} ${_data.whatsappNumber}`;
      window.open(`${SITE.contact.waBase}?text=${encodeURIComponent(basicMsg)}`, '_blank');
      setSubmitted(true);
    } finally {
      // Item 2: loading SEMPRE é liberado, mesmo em caso de erro
      setLoading(false);
    }
  };

  // ── Success ──────────────────────────────────────────────────────────────────
  if (submitted) {
    const vals = getValues();
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-6 py-10"
      >
        <div className="w-12 h-12 border border-red/40 flex items-center justify-center">
          <CheckCircle size={22} className="text-red" />
        </div>
        <div>
          <h3 className="font-display text-3xl font-light text-paper mb-2">
            {vals.contactMethod === 'meet' ? 'Reunião agendada.' : 'Mensagem recebida.'}
          </h3>
          <p className="font-sans text-paper-dim leading-relaxed max-w-[42ch]">
            {vals.contactMethod === 'meet'
              ? `Você escolheu ${vals.meetDate} às ${vals.meetTime}. Enviaremos o link do Google Meet para ${vals.email} e confirmaremos pelo WhatsApp.`
              : `Entramos em contato em até 24 horas pelo email ${vals.email} ou pelo WhatsApp.`}
          </p>
        </div>
        <div className="border-t border-white/[0.06] pt-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-paper-soft/40">
            Enquanto isso, veja nossos projetos →{' '}
            <a href="/projetos" className="text-paper-soft hover:text-paper transition-colors">
              /projetos
            </a>
          </p>
        </div>
      </motion.div>
    );
  }

  // ── Slide variants ────────────────────────────────────────────────────────────
  const variants = {
    enter:   (d: number) => ({ opacity: 0, x: d > 0 ? 28 : -28 }),
    center:  { opacity: 1, x: 0 },
    exit:    (d: number) => ({ opacity: 0, x: d > 0 ? -28 : 28 }),
  };

  return (
    <div>
      {/* ── Progress bar ───────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-0 mb-12">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  'w-7 h-7 flex items-center justify-center font-mono text-[10px] border transition-all duration-400',
                  i < step  ? 'border-red bg-red text-paper'         :
                  i === step ? 'border-red text-red'                  :
                               'border-white/15 text-paper-soft/35'
                )}
              >
                {i < step ? '✓' : i + 1}
              </div>
              <span className={cn(
                'font-mono text-[8px] uppercase tracking-[0.14em] hidden sm:block',
                i <= step ? 'text-paper-soft/60' : 'text-paper-soft/25'
              )}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-px mx-2 transition-all duration-400"
                style={{ background: i < step ? 'rgb(var(--red))' : 'rgb(255 255 255 / 0.08)' }}
              />
            )}
          </div>
        ))}
      </div>

      {/* ── Form ───────────────────────────────────────────────────────────────── */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait" custom={dir}>
          {/* ── STEP 0: Você ─────────────────────────────────────────────────── */}
          {step === 0 && (
            <motion.div key="s0" custom={dir} variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-8"
            >
              <div>
                <p className="font-display text-xl font-light text-paper mb-1">Quem é você?</p>
                <p className="font-sans text-sm text-paper-soft/50">Vamos nos apresentar primeiro.</p>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Seu nome completo</Label>
                <TextInput
                  {...register('name')}
                  placeholder="Como você se chama?"
                  autoFocus
                  error={errors.name?.message}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Email *</Label>
                <TextInput
                  {...register('email')}
                  type="email"
                  placeholder="seu@email.com"
                  error={errors.email?.message}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>WhatsApp *</Label>
                <Controller
                  control={control}
                  name="whatsappNumber"
                  render={({ field: numField }) => (
                    <Controller
                      control={control}
                      name="whatsappCode"
                      render={({ field: codeField }) => {
                        const maskPhone = (val: string, currentCode: string) => {
                          if (currentCode !== '+55') return val.replace(/[^\d ]/g, '');
                          let v = val.replace(/\D/g, '');
                          if (v.length > 11) v = v.slice(0, 11);
                          if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
                          if (v.length > 9) v = `${v.slice(0, 9)}-${v.slice(9)}`;
                          return v;
                        };
                        return (
                          <div className="flex flex-col gap-1">
                            <div className={cn(
                              'flex items-center border-b transition-colors duration-300',
                              errors.whatsappNumber ? 'border-red/60' : 'border-white/15 focus-within:border-red'
                            )}>
                              <select
                                {...codeField}
                                className="bg-transparent text-paper font-sans text-base py-3 pr-2 focus:outline-none cursor-pointer"
                              >
                                <option value="+55" className="bg-[#0a0a0b] text-paper">🇧🇷 +55</option>
                                <option value="+351" className="bg-[#0a0a0b] text-paper">🇵🇹 +351</option>
                                <option value="+1" className="bg-[#0a0a0b] text-paper">🇺🇸 +1</option>
                                <option value="+34" className="bg-[#0a0a0b] text-paper">🇪🇸 +34</option>
                                <option value="+44" className="bg-[#0a0a0b] text-paper">🇬🇧 +44</option>
                                <option value="+49" className="bg-[#0a0a0b] text-paper">🇩🇪 +49</option>
                                <option value="+54" className="bg-[#0a0a0b] text-paper">🇦🇷 +54</option>
                                <option value="+56" className="bg-[#0a0a0b] text-paper">🇨🇱 +56</option>
                                <option value="+57" className="bg-[#0a0a0b] text-paper">🇨🇴 +57</option>
                                <option value="+52" className="bg-[#0a0a0b] text-paper">🇲🇽 +52</option>
                              </select>
                              <span className="text-paper-soft/30 mx-2">|</span>
                              <input
                                type="tel"
                                value={maskPhone(numField.value || '', codeField.value)}
                                onChange={(e) => numField.onChange(maskPhone(e.target.value, codeField.value))}
                                placeholder={codeField.value === '+55' ? "(95) 90000-0000" : "Número do WhatsApp"}
                                className="w-full bg-transparent py-3 font-sans text-base text-paper placeholder:text-paper-soft/30 focus:outline-none"
                              />
                            </div>
                            <FieldError message={errors.whatsappNumber?.message} />
                          </div>
                        );
                      }}
                    />
                  )}
                />
                <p className="font-mono text-[9px] text-paper-soft/30 tracking-wide mt-1">
                  Usamos só para confirmar reunião ou enviar proposta
                </p>
              </div>
            </motion.div>
          )}

          {/* ── STEP 1: Empresa ──────────────────────────────────────────────── */}
          {step === 1 && (
            <motion.div key="s1" custom={dir} variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-8"
            >
              <div>
                <p className="font-display text-xl font-light text-paper mb-1">Sobre sua empresa</p>
                <p className="font-sans text-sm text-paper-soft/50">Nos ajuda a entender o contexto.</p>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Nome da empresa ou projeto</Label>
                <TextInput
                  {...register('company')}
                  placeholder="Ex: Clínica Saúde Total, Loja Nova Store..."
                  error={errors.company?.message}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Segmento / área de atuação *</Label>
                <select
                  {...register('segment')}
                  className={cn(
                    'w-full bg-ink-2 border-b py-3 font-sans text-base text-paper',
                    'focus:outline-none transition-colors duration-300 cursor-pointer',
                    errors.segment ? 'border-red/60' : 'border-white/15 focus:border-red'
                  )}
                >
                  <option value="" className="bg-ink-2">Selecione o segmento...</option>
                  {SEGMENTS.map((s) => (
                    <option key={s} value={s} className="bg-ink-2">{s}</option>
                  ))}
                </select>
                <FieldError message={errors.segment?.message} />
              </div>

              <div className="flex flex-col gap-3">
                <Label>Você já tem um site? *</Label>
                <div className="flex gap-3">
                  {(['sim', 'nao'] as const).map((v) => (
                    <Controller key={v} control={control} name="hasSite"
                      render={({ field }) => (
                        <button
                          type="button"
                          onClick={() => field.onChange(v)}
                          className={cn(
                            'flex-1 py-3 font-mono text-[11px] uppercase tracking-widest border transition-all duration-200',
                            field.value === v
                              ? 'border-red/60 bg-red/[0.08] text-paper'
                              : 'border-white/10 text-paper-soft/50 hover:border-white/20'
                          )}
                        >
                          {v === 'sim' ? 'Sim, tenho' : 'Não tenho'}
                        </button>
                      )}
                    />
                  ))}
                </div>
              </div>

              {hasSite === 'sim' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-2"
                >
                  <Label>URL do site atual</Label>
                  <TextInput
                    {...register('currentSiteUrl')}
                    type="url"
                    placeholder="https://seusite.com.br"
                    error={errors.currentSiteUrl?.message}
                  />
                  <p className="font-mono text-[9px] text-paper-soft/30 tracking-wide">
                    Opcional — mas ajuda muito na análise
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── STEP 2: Serviço ──────────────────────────────────────────────── */}
          {step === 2 && (
            <motion.div key="s2" custom={dir} variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6"
            >
              <div>
                <p className="font-display text-xl font-light text-paper mb-1">O que você precisa?</p>
                <p className="font-sans text-sm text-paper-soft/50">Selecione o serviço mais próximo do seu objetivo.</p>
              </div>

              <Controller control={control} name="service"
                render={({ field }) => (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICES.map(({ id, label, price, Icon, desc }) => {
                      const selected = field.value === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => field.onChange(id)}
                          className={cn(
                            'text-left p-4 border transition-all duration-200 flex flex-col gap-2',
                            selected
                              ? 'border-red/60 bg-red/[0.06]'
                              : 'border-white/[0.07] bg-white/[0.02] hover:border-white/15'
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Icon size={14} className={selected ? 'text-red' : 'text-paper-soft/40'} />
                              <span className="font-mono text-[11px] uppercase tracking-widest text-paper">
                                {label}
                              </span>
                            </div>
                            <span className={cn(
                              'font-mono text-[9px] uppercase tracking-widest',
                              selected ? 'text-red' : 'text-paper-soft/40'
                            )}>
                              {price}
                            </span>
                          </div>
                          <p className="font-sans text-xs text-paper-dim leading-relaxed">
                            {desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                )}
              />
              <FieldError message={errors.service?.message} />
            </motion.div>
          )}

          {/* ── STEP 3: Projeto ──────────────────────────────────────────────── */}
          {step === 3 && (
            <motion.div key="s3" custom={dir} variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-8"
            >
              <div>
                <p className="font-display text-xl font-light text-paper mb-1">Sobre o projeto</p>
                <p className="font-sans text-sm text-paper-soft/50">Quanto mais detalhe, melhor a proposta.</p>
              </div>

              <div className="flex flex-col gap-3">
                <Label>Qual é o principal objetivo? *</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Controller control={control} name="goal"
                    render={({ field }) => (
                      <>
                        {GOALS.map((g) => (
                          <RadioCard key={g} selected={field.value === g} onClick={() => field.onChange(g)}>
                            <span className={cn(
                              'font-sans text-sm leading-snug',
                              field.value === g ? 'text-paper' : 'text-paper-dim'
                            )}>
                              {g}
                            </span>
                          </RadioCard>
                        ))}
                      </>
                    )}
                  />
                </div>
                <FieldError message={errors.goal?.message} />
              </div>

              <div className="flex flex-col gap-3">
                <Label>Qual o prazo ideal? *</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <Controller control={control} name="timeline"
                    render={({ field }) => (
                      <>
                        {TIMELINES.map(({ id, label, sub }) => {
                          const selected = field.value === id;
                          return (
                            <button
                              key={id}
                              type="button"
                              onClick={() => field.onChange(id)}
                              className={cn(
                                'flex flex-col items-center py-3 px-2 border transition-all duration-200',
                                selected
                                  ? 'border-red/60 bg-red/[0.06]'
                                  : 'border-white/[0.07] hover:border-white/15'
                              )}
                            >
                              <span className={cn(
                                'font-mono text-[10px] uppercase tracking-widest',
                                selected ? 'text-paper' : 'text-paper-soft/60'
                              )}>
                                {label}
                              </span>
                              <span className="font-sans text-[11px] text-paper-soft/35 mt-0.5">{sub}</span>
                            </button>
                          );
                        })}
                      </>
                    )}
                  />
                </div>
                <FieldError message={errors.timeline?.message} />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Descreva o projeto *</Label>
                <textarea
                  {...register('message')}
                  rows={4}
                  placeholder="O que você quer construir? Qual problema isso resolve? Tem alguma referência de site ou app que admira?"
                  className={cn(
                    'w-full bg-transparent border-b py-3 font-sans text-base text-paper placeholder:text-paper-soft/30 resize-none',
                    'focus:outline-none transition-colors duration-300',
                    errors.message ? 'border-red/60' : 'border-white/15 focus:border-red'
                  )}
                />
                <FieldError message={errors.message?.message} />
              </div>
            </motion.div>
          )}

          {/* ── STEP 4: Envio ────────────────────────────────────────────────── */}
          {step === 4 && (
            <motion.div key="s4" custom={dir} variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-8"
            >
              <div>
                <p className="font-display text-xl font-light text-paper mb-1">Quase lá.</p>
                <p className="font-sans text-sm text-paper-soft/50">
                  Vamos te responder em até 24h com uma análise e proposta personalizada.
                </p>
              </div>

              {/* Bloco opcional de videochamada */}
              <div className="border border-white/[0.06] p-5 flex flex-col gap-5">
                <div className="flex items-start gap-3">
                  <Calendar size={15} className="text-red/70 mt-0.5 shrink-0" />
                  <div className="flex flex-col gap-1">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-paper">
                      Quer agendar uma videochamada também?
                    </p>
                    <p className="font-sans text-xs text-paper-dim leading-relaxed">
                      30 min de Google Meet para entender o projeto, tirar dúvidas e já sair com uma direção clara — sem custo, sem compromisso.
                    </p>
                  </div>
                </div>

                <Controller control={control} name="contactMethod"
                  render={({ field }) => (
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => field.onChange('meet')}
                        className={cn(
                          'flex-1 py-3 font-mono text-[11px] uppercase tracking-widest border transition-all duration-200',
                          field.value === 'meet'
                            ? 'border-red/60 bg-red/[0.08] text-paper'
                            : 'border-white/10 text-paper-soft/50 hover:border-white/20'
                        )}
                      >
                        Sim, quero
                      </button>
                      <button
                        type="button"
                        onClick={() => field.onChange('mensagem')}
                        className={cn(
                          'flex-1 py-3 font-mono text-[11px] uppercase tracking-widest border transition-all duration-200',
                          field.value === 'mensagem'
                            ? 'border-red/60 bg-red/[0.08] text-paper'
                            : 'border-white/10 text-paper-soft/50 hover:border-white/20'
                        )}
                      >
                        Não, só mensagem
                      </button>
                    </div>
                  )}
                />

                {/* Calendário — só aparece se escolheu videochamada */}
                {contactMethod === 'meet' && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col gap-5 border-t border-white/[0.06] pt-5"
                  >
                    <div className="flex flex-col gap-2">
                      <Label>Data da reunião *</Label>
                      <Controller control={control} name="meetDate"
                        render={({ field }) => (
                          <input
                            type="date"
                            min={getMinDate()}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                            className={cn(
                              'w-full bg-transparent border-b py-3 font-sans text-base text-paper',
                              'focus:outline-none transition-colors duration-300',
                              '[color-scheme:dark]',
                              errors.meetDate ? 'border-red/60' : 'border-white/15 focus:border-red'
                            )}
                          />
                        )}
                      />
                      <FieldError message={errors.meetDate?.message} />
                    </div>

                    <div className="flex flex-col gap-3">
                      <Label>Horário *</Label>
                      <Controller control={control} name="meetTime"
                        render={({ field }) => (
                          <div className="flex flex-wrap gap-2">
                            {TIME_SLOTS.map((t) => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => field.onChange(t)}
                                className={cn(
                                  'px-4 py-2 font-mono text-[11px] uppercase tracking-widest border transition-all duration-200',
                                  field.value === t
                                    ? 'border-red/60 bg-red/[0.08] text-paper'
                                    : 'border-white/10 text-paper-soft/50 hover:border-white/20'
                                )}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        )}
                      />
                      <FieldError message={errors.meetTime?.message} />
                      <p className="font-mono text-[9px] text-paper-soft/30 tracking-wide">
                        Horário de Boa Vista–RR (UTC–4) · Seg–Sex apenas
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Consentimento LGPD — visível apenas na última etapa ──────────────── */}
        {step === STEPS.length - 1 && (
          <Controller
            control={control}
            name="lgpdConsent"
            render={({ field }) => (
              <label className="flex items-start gap-3 mt-8 cursor-pointer group">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={!!field.value}
                  onClick={() => field.onChange(!field.value)}
                  className={cn(
                    'mt-0.5 w-4 h-4 shrink-0 border transition-all duration-200 flex items-center justify-center',
                    field.value
                      ? 'border-red bg-red'
                      : 'border-white/20 group-hover:border-white/40'
                  )}
                >
                  {field.value && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                      <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <span className="font-sans text-xs text-paper-soft/60 leading-relaxed">
                  Concordo com o tratamento dos meus dados conforme a{' '}
                  <a
                    href="/politica-de-privacidade"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-paper-soft hover:text-paper underline underline-offset-2 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Política de Privacidade
                  </a>
                  . Meus dados serão usados somente para responder ao meu contato.
                </span>
              </label>
            )}
          />
        )}
        {step === STEPS.length - 1 && errors.lgpdConsent && (
          <FieldError message={errors.lgpdConsent.message} />
        )}

        {/* ── Nav buttons ────────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mt-10">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => go(step - 1)}
              className="font-mono text-[11px] uppercase tracking-widest text-paper-soft/50 hover:text-paper transition-colors"
            >
              ← Voltar
            </button>
          ) : <span />}

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => go(step + 1)}
              className="font-mono text-[11px] uppercase tracking-widest bg-red text-paper px-8 py-3.5 hover:bg-red-deep transition-colors active:scale-[0.98]"
            >
              Continuar →
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest bg-red text-paper px-8 py-3.5 hover:bg-red-deep transition-colors active:scale-[0.98] disabled:opacity-60"
              style={{ boxShadow: '0 0 32px rgb(230 57 70 / 0.25)' }}
            >
              {loading ? (
                <><Loader2 size={13} className="animate-spin" /> Enviando...</>
              ) : contactMethod === 'meet' ? (
                'Confirmar reunião →'
              ) : (
                'Enviar mensagem →'
              )}
            </button>
          )}
        </div>
      </form>

      {/* Honeypot anti-spam: fora da tela, invisível para humanos, bots preenchem */}
      <input
        ref={honeypotRef}
        type="text"
        name="website"
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 0,
          opacity: 0,
          height: 0,
          width: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Hidden PDF Template for html2canvas to read */}
      <div style={{ overflow: 'hidden', height: 0 }}>
        {pdfData && <PdfTemplate ref={pdfRef} data={pdfData} />}
      </div>
    </div>
  );
}
