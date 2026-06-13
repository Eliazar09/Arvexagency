import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { projects, getProject } from '@/content/projects';
import type { Project } from '@/content/projects';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject(params.slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

const automationSteps = [
  { num: '01', label: 'Escolha o nicho e a cidade', desc: 'Ex: "joalherias em São Paulo" — você define o alvo e a quantidade de leads por rodada.' },
  { num: '02', label: 'Busca automática no Google Maps', desc: 'O fluxo encontra empresas com nome, telefone, nota e endereço — sem pesquisa manual.' },
  { num: '03', label: 'Normalização dos dados', desc: 'Limpa telefones, remove duplicatas e organiza os campos para uso imediato.' },
  { num: '04', label: 'Segmentação por perfil', desc: 'Separa quem não tem site (cliente em potencial) de quem já tem (oportunidade de redesign).' },
  { num: '05', label: 'Validação de WhatsApp', desc: 'Confirma se o número tem WhatsApp ativo via API antes de qualquer envio.' },
  { num: '06', label: 'Envio da primeira mensagem', desc: 'Mensagem personalizada disparada automaticamente — você só personaliza o texto uma vez.' },
  { num: '07', label: 'Anti-bloqueio inteligente', desc: 'Intervalo aleatório de 60–150s entre envios para imitar comportamento humano.' },
  { num: '08', label: 'Log completo de resultados', desc: 'Registra quem recebeu, quando e o que respondeu — base para a próxima campanha.' },
];

function AutomationShowcase({ project }: { project: Project }) {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[40vh] flex items-end border-b border-white/[0.06]">
        <div className="container pb-16 pt-[120px]">
          <p className="section-label mb-6">AUTOMAÇÃO / WORKFLOW</p>
          <h1 className="font-display font-light leading-tight" style={{ fontSize: 'var(--fs-h1)' }}>
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <span key={tag} className="font-mono text-xs text-paper-soft border border-white/20 px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshot do fluxo */}
      <section className="section border-b border-white/[0.06]">
        <div className="container">
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <Image
              src={project.cover}
              alt="Fluxo de automação n8n"
              fill
              unoptimized
              className="object-cover object-top"
              priority
            />
          </div>
          <p className="font-mono text-xs text-paper-soft/40 mt-4 text-center uppercase tracking-widest">
            Fluxo visual construído no n8n — nenhuma linha de código necessária
          </p>
        </div>
      </section>

      {/* Como funciona */}
      <section className="section border-b border-white/[0.06]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <p className="section-label mb-6">COMO FUNCIONA / HOW IT WORKS</p>
              <p className="font-sans text-paper-dim leading-relaxed" style={{ fontSize: 'var(--fs-lead)' }}>
                {project.summary}
              </p>
              <div className="mt-8 pt-8 border-t border-white/[0.06]">
                <span className="font-mono text-xs text-paper-soft/50 uppercase tracking-widest block mb-2">Resultado</span>
                <span className="font-display text-2xl font-light text-red">{project.result}</span>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="flex flex-col gap-0">
                {automationSteps.map((step) => (
                  <div key={step.num} className="grid grid-cols-12 gap-6 border-t border-white/[0.06] py-6">
                    <span className="col-span-2 font-mono text-xs text-red pt-0.5">{step.num}</span>
                    <div className="col-span-10">
                      <p className="font-sans text-paper text-sm font-medium mb-1">{step.label}</p>
                      <p className="font-sans text-paper-soft text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="section">
        <div className="container">
          <p className="section-label mb-6">DOWNLOAD / FILES</p>
          <p className="font-sans text-paper-dim leading-relaxed mb-10 max-w-[52ch]" style={{ fontSize: 'var(--fs-lead)' }}>
            Baixe o workflow pronto para importar no n8n e o guia de configuração passo a passo. Só configurar suas credenciais e ligar.
          </p>
          <div className="flex flex-wrap gap-4">
            {project.downloads!.map((d) => (
              <a
                key={d.href}
                href={d.href}
                download={d.filename}
                className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-widest border border-white/20 text-paper px-6 py-3 hover:border-paper/40 hover:bg-white/[0.03] transition-all duration-300"
              >
                ↓ {d.label}
              </a>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-4">
            <Link
              href="/projetos"
              className="font-mono text-xs text-paper-soft hover:text-paper transition-colors uppercase tracking-widest"
            >
              ← Todos os projetos
            </Link>
            <Link
              href="/contato"
              className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-widest bg-red text-paper px-6 py-3 hover:bg-red/80 transition-colors"
            >
              Quero uma automação →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default function CaseStudyPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();

  if (project.downloads?.length) {
    return <AutomationShowcase project={project} />;
  }

  redirect(project.url);
}
