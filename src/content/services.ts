export type Service = {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  summary: string;
  description: string;
  deliverables: string[];
  stack: string[];
  highlights: { icon: string; label: string }[];
  isCore: boolean;
  packages: Package[];
  faq: { q: string; a: string }[];
};

export type Package = {
  name: string;
  from: string;
  deadline: string;
  features: string[];
  highlighted?: boolean;
};

export const services: Service[] = [
  {
    slug: 'sites',
    number: '01',
    title: 'Sites',
    tagline: 'Qualquer tipo de site, feito do zero com qualidade.',
    summary: 'Do briefing ao deploy: UX, design, código e performance sob um único teto.',
    description:
      'Criamos qualquer tipo de site para empresas em Boa Vista, Roraima e em todo o Brasil — institucional, portfólio, landing page. Cada projeto começa do zero, sem template. O resultado: um site rápido, bonito e que representa a sua marca de verdade.',
    deliverables: [
      'Site institucional ou landing page',
      'Design personalizado (sem templates)',
      'Desenvolvimento em Next.js ou WordPress',
      'SEO técnico básico incluído',
      'Responsivo para mobile e desktop',
      'Entrega com treinamento',
    ],
    stack: ['Next.js', 'WordPress', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    highlights: [
      { icon: 'Zap', label: 'Carregamento rápido' },
      { icon: 'Search', label: 'SEO incluído' },
      { icon: 'Smartphone', label: 'Mobile-first' },
      { icon: 'Palette', label: 'Design exclusivo' },
      { icon: 'Shield', label: 'Seguro e estável' },
      { icon: 'RefreshCw', label: 'Suporte pós-entrega' },
    ],
    isCore: true,
    packages: [
      {
        name: 'Landing Page',
        from: 'R$ 1.500',
        deadline: '1–5 dias úteis',
        features: [
          '1 página completa',
          'Design exclusivo',
          'Formulário de contato',
          'Mobile responsivo',
          'Deploy incluído',
        ],
      },
      {
        name: 'Site Completo',
        from: 'R$ 3.500',
        deadline: '1–5 dias úteis',
        features: [
          'Até 6 páginas',
          'Design exclusivo',
          'SEO básico',
          'Blog opcional',
          'Painel de edição',
          'Suporte 30 dias',
        ],
        highlighted: true,
      },
      {
        name: 'Projeto Custom',
        from: 'Sob consulta',
        deadline: 'A definir',
        features: [
          'Escopo ilimitado',
          'Integrações custom',
          'E-commerce opcional',
          'Suporte estendido',
          'SLA garantido',
        ],
      },
    ],
    faq: [
      { q: 'Vocês entregam o código-fonte?', a: 'Sim. Todo o código é seu ao final do projeto, sem amarras ou lock-in de plataforma.' },
      { q: 'Posso atualizar o site sozinho?', a: 'Sim. Configuramos um painel simples onde você edita textos e imagens sem precisar de programador.' },
      { q: 'O site aparece no Google?', a: 'Sim. SEO técnico básico está incluso em todos os planos — título, descrição, sitemap e velocidade otimizada.' },
      { q: 'Qual a diferença entre Landing Page e Site Completo?', a: 'Landing Page é uma página única focada em conversão. Site Completo tem múltiplas páginas e um painel de gerenciamento de conteúdo.' },
    ],
  },
  {
    slug: 'sistemas',
    number: '02',
    title: 'Sistemas Web',
    tagline: 'Sistemas de agendamento, portais e painéis sob medida.',
    summary: 'Sistemas personalizados que resolvem problemas reais do seu negócio.',
    description:
      'Desenvolvemos sistemas web personalizados para empresas em Boa Vista–RR e em todo o Brasil: agendamento online, painel administrativo, portal do cliente. Se você tem um processo manual que poderia ser digital, a gente constrói pra você.',
    deliverables: [
      'Sistema de agendamento online',
      'Painel administrativo',
      'Portal do cliente / área logada',
      'Cadastro e gestão de dados',
      'Relatórios e dashboards',
      'Documentação e treinamento',
    ],
    stack: ['Next.js', 'Node.js', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    highlights: [
      { icon: 'Calendar', label: 'Agendamento online' },
      { icon: 'LayoutDashboard', label: 'Painel admin' },
      { icon: 'Users', label: 'Área do cliente' },
      { icon: 'Database', label: 'Banco de dados' },
      { icon: 'BarChart2', label: 'Relatórios' },
      { icon: 'Lock', label: 'Login seguro' },
    ],
    isCore: true,
    packages: [
      {
        name: 'Simples',
        from: 'R$ 3.000',
        deadline: '1–15 dias',
        features: [
          'Sistema de agendamento',
          'Painel básico de gestão',
          'Login e acesso seguro',
          'Suporte 30 dias',
        ],
      },
      {
        name: 'Completo',
        from: 'R$ 7.000',
        deadline: '1–30 dias',
        features: [
          'Sistema completo customizado',
          'Dashboard com relatórios',
          'Notificações por email/WhatsApp',
          'Portal do cliente',
          'Suporte 60 dias',
        ],
        highlighted: true,
      },
      {
        name: 'Sob Medida',
        from: 'Sob consulta',
        deadline: 'A definir',
        features: [
          'Escopo personalizado',
          'Integrações externas',
          'App mobile opcional',
          'SLA garantido',
        ],
      },
    ],
    faq: [
      { q: 'O sistema funciona no celular?', a: 'Sim. Todos os sistemas são responsivos e funcionam em qualquer dispositivo.' },
      { q: 'Meus clientes podem agendar sozinhos?', a: 'Sim. O sistema de agendamento permite que seus clientes escolham horário, serviço e paguem online se necessário.' },
      { q: 'E se eu precisar de uma funcionalidade específica?', a: 'Desenvolvemos sob medida. Me conta o que precisa e fazemos um orçamento.' },
    ],
  },
  {
    slug: 'automacao',
    number: '03',
    title: 'Automação',
    tagline: 'WhatsApp, fluxos e integrações que trabalham por você.',
    summary: 'Automatize atendimento, notificações e processos repetitivos.',
    description:
      'Configuramos automações para o seu negócio em Boa Vista–RR e em todo o Brasil: atendimento automático no WhatsApp, confirmação de agendamento, notificações automáticas e fluxos que eliminam tarefas manuais do seu dia a dia.',
    deliverables: [
      'Atendimento automático no WhatsApp',
      'Confirmação e lembrete de agendamentos',
      'Notificações por WhatsApp e email',
      'Integração entre plataformas (n8n/Make)',
      'Respostas automáticas e chatbot simples',
      'Documentação do fluxo',
    ],
    stack: ['n8n', 'Make', 'WhatsApp Business API', 'Zapier', 'Node.js'],
    highlights: [
      { icon: 'MessageSquare', label: 'WhatsApp Business' },
      { icon: 'Bell', label: 'Notificações auto' },
      { icon: 'GitBranch', label: 'Fluxos n8n / Make' },
      { icon: 'Repeat', label: 'Sem trabalho manual' },
      { icon: 'Clock', label: 'Funciona 24/7' },
      { icon: 'Zap', label: 'Resposta imediata' },
    ],
    isCore: true,
    packages: [
      {
        name: 'Básico',
        from: 'R$ 800',
        deadline: '1–3 dias',
        features: [
          'Mensagem automática no WhatsApp',
          'Confirmação de agendamento',
          'Até 2 fluxos',
          'Suporte 30 dias',
        ],
      },
      {
        name: 'Completo',
        from: 'R$ 2.500',
        deadline: '1–8 dias',
        features: [
          'Chatbot WhatsApp',
          'Fluxos ilimitados',
          'Integração com seu sistema',
          'Notificações automáticas',
          'Suporte 60 dias',
        ],
        highlighted: true,
      },
      {
        name: 'Sob Medida',
        from: 'Sob consulta',
        deadline: 'A definir',
        features: [
          'Automação completa do negócio',
          'Múltiplas integrações',
          'CRM integrado',
          'Manutenção mensal',
        ],
      },
    ],
    faq: [
      { q: 'Precisa de WhatsApp Business?', a: 'Sim. Precisa ter o WhatsApp Business configurado. Ajudamos na configuração se necessário.' },
      { q: 'O chatbot é inteligente?', a: 'Para respostas simples e menus, sim. Para IA conversacional avançada, é um projeto separado.' },
      { q: 'Funciona com meu agendamento?', a: 'Sim. Integra com o sistema que você já usa ou com o sistema que a gente desenvolver pra você.' },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
