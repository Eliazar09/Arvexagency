export type Project = {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  year: string;
  cover: string;
  url: string;
  tags: string[];
  summary: string;
  result: string;
  aspectRatio: '16/10' | '4/5' | '1/1' | '3/2';
  downloads?: { filename: string; label: string; href: string }[];
};

export type ProjectCategory = 'Sites' | 'Site + Sistema Web' | 'Automação' | 'Sistema Web';

export const projects: Project[] = [
  {
    slug: 'toka-restaurante',
    title: 'Toka Restaurante',
    client: 'Toka Restaurante',
    category: 'Sites',
    year: '2025',
    cover: '/projects/toka-restaurante.png',
    url: 'https://tokarestaurante.vercel.app/',
    tags: ['HTML', 'CSS', 'JavaScript'],
    summary: 'Site para restaurante com cardápio digital, galeria de pratos e botão de reserva via WhatsApp.',
    result: 'Reservas lotadas toda sexta',
    aspectRatio: '16/10',
  },
  {
    slug: 'hospital-vet',
    title: 'Hospital Vet',
    client: 'Hospital Veterinário',
    category: 'Sites',
    year: '2025',
    cover: '/projects/hospital-vet.png',
    url: 'https://hospitalvet.vercel.app/',
    tags: ['Next.js', 'Tailwind CSS', 'SEO'],
    summary: 'Site para clínica veterinária com agendamento e apresentação de serviços.',
    result: '+60% em atendimentos',
    aspectRatio: '16/10',
  },
  {
    slug: 'nova-store',
    title: 'Nova Living',
    client: 'Nova Living',
    category: 'Sites',
    year: '2025',
    cover: '/projects/nova-store.png',
    url: 'https://novastore-br.vercel.app/',
    tags: ['Next.js', 'E-commerce', 'Tailwind CSS'],
    summary: 'Loja online com catálogo de produtos e checkout integrado.',
    result: 'Vendas em 3 estados',
    aspectRatio: '16/10',
  },
  {
    slug: 'financa-br',
    title: 'Meridian',
    client: 'Meridian',
    category: 'Sites',
    year: '2025',
    cover: '/projects/financa-br.png',
    url: 'https://finan-a-br.vercel.app/',
    tags: ['Next.js', 'Tailwind CSS', 'Dashboard'],
    summary: 'Plataforma financeira com dashboard e controle de finanças pessoais.',
    result: 'Entregue em 4 dias',
    aspectRatio: '16/10',
  },
  {
    slug: 'somos-green-life',
    title: 'Somos Green Life',
    client: 'Jennifer — GreenLife',
    category: 'Site + Sistema Web',
    year: '2025',
    cover: '/projects/somos-green-life.png',
    url: 'https://somosgreenlife.vercel.app/',
    tags: ['Next.js', 'Supabase', 'Espanhol', 'Painel Admin'],
    summary:
      'Loja online de suplementos naturais em espanhol com catálogo, kits de distribuição e painel admin completo — produtos, vendas, clientes, estoque, financeiro e agenda.',
    result: '+1.000 clientes ativos',
    aspectRatio: '16/10',
  },
  {
    slug: 'crevally-black',
    title: 'Crevally Black',
    client: 'Crevally Black',
    category: 'Site + Sistema Web',
    year: '2025',
    cover: '/projects/crevally-black.png',
    url: 'https://crevallyblack.vercel.app/',
    tags: ['Next.js', 'Supabase', 'E-commerce', 'Streetwear'],
    summary:
      'Loja de streetwear premium com catálogo por categoria, carrinho e pedidos via WhatsApp + painel admin para produtos, pedidos, estoque e dashboard de vendas.',
    result: '+2.000 seguidores convertidos',
    aspectRatio: '16/10',
  },
  {
    slug: 'rafael-mota-toyota',
    title: 'Rafael Mota — Toyota',
    client: 'Rafael Mota',
    category: 'Site + Sistema Web',
    year: '2026',
    cover: '/projects/rafael-mota-toyota.png',
    url: 'https://rafaelmota.vercel.app/',
    tags: ['Next.js', 'Supabase', 'Framer Motion', 'Tailwind CSS'],
    summary:
      'Vitrine digital para consultor Toyota em Roraima — estoque de carros com filtros avançados, carrossel 3D, página individual por veículo e painel admin com dashboard de vendas e comissões.',
    result: 'Vendas online em Roraima',
    aspectRatio: '16/10',
  },
  {
    slug: 'automacao-prospeccao',
    title: 'Prospecção via WhatsApp',
    client: 'Arvex — Portfólio',
    category: 'Automação',
    year: '2025',
    cover: '/projects/automacao-prospeccao.png',
    url: '/projetos/automacao-prospeccao',
    tags: ['n8n', 'WhatsApp API', 'Google Maps', 'Workflow'],
    summary:
      'Fluxo n8n que busca empresas no Google Maps, valida WhatsApp ativo e envia a primeira mensagem de prospecção automaticamente — tudo sem intervenção humana.',
    result: 'Centenas de leads/dia',
    aspectRatio: '16/10',
    downloads: [
      {
        filename: 'automacao_prospeccao_n8n.json',
        label: 'Workflow n8n (.json)',
        href: '/downloads/automacao_prospeccao_n8n.json',
      },
      {
        filename: 'README_automacao.md',
        label: 'Guia de configuração (.md)',
        href: '/downloads/README_automacao.md',
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projectCategories = ['Todos', 'Sites', 'Automação', 'Site + Sistema Web', 'Sistema Web'] as const;
