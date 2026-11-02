// @ts-check

/**
 * Dados do portfólio da Evertechgg (página empresa.html).
 * Mesmo formato de `data/portfolio.js` — veja os tipos `PortfolioCategoria` e `PortfolioProjeto` lá.
 * Para adicionar um projeto, inclua um objeto em `empresaProjetos`.
 * Para adicionar uma categoria, inclua um objeto em `empresaCategorias` — ela vira uma aba nova.
 */

const IMG = "assets/img/projects";
const TELAS = [`${IMG}/placeholder-tela-1.svg`, `${IMG}/placeholder-tela-2.svg`, `${IMG}/placeholder-tela-3.svg`];

/** @type {import("./portfolio.js").PortfolioCategoria[]} */
export const empresaCategorias = [
  {
    id: "sites",
    label: "Sites & Landing Pages",
    descricao: "Presença digital rápida, bonita e pensada para converter visitantes em clientes.",
  },
  {
    id: "sistemas",
    label: "Sistemas Web",
    descricao: "Plataformas sob medida: painéis, APIs, integrações e infraestrutura em nuvem.",
  },
  {
    id: "ia",
    label: "IA & Automação",
    descricao: "Agentes inteligentes e automações que tiram tarefas repetitivas da sua equipe.",
  },
];

/** @type {import("./portfolio.js").PortfolioProjeto[]} */
export const empresaProjetos = [
  // ---------- Sites & Landing Pages (EXEMPLOS — substitua pelos projetos da empresa) ----------
  {
    id: "ev-site-01",
    categoria: "sites",
    titulo: "Site institucional",
    resumo: "Site para empresa de serviços, com páginas de serviços e captação de orçamentos.",
    descricao:
      "Texto de exemplo: site institucional com páginas de serviços, blog, formulário de orçamento e SEO técnico configurado desde o primeiro dia.",
    papel: "Design, desenvolvimento e publicação pela Evertechgg.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    capa: `${IMG}/placeholder-landing.svg`,
    imagens: [`${IMG}/placeholder-landing.svg`, ...TELAS],
    linkSite: "https://example.com",
    destaque: true,
    exemplo: true,
  },
  {
    id: "ev-site-02",
    categoria: "sites",
    titulo: "Landing page de lançamento",
    resumo: "Página de campanha com contador, depoimentos e lista de espera.",
    descricao:
      "Texto de exemplo: landing page de lançamento de produto com contador regressivo, prova social e integração com ferramenta de e-mail marketing.",
    papel: "Projeto completo, do layout ao deploy.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    capa: `${IMG}/placeholder-landing.svg`,
    imagens: [`${IMG}/placeholder-landing.svg`, TELAS[0]],
    linkSite: "https://example.com",
    exemplo: true,
  },

  // ---------- Sistemas Web (EXEMPLOS) ----------
  {
    id: "ev-sis-01",
    categoria: "sistemas",
    titulo: "Sistema de gestão",
    resumo: "Painel de gestão com estoque, vendas e relatórios em tempo real.",
    descricao:
      "Texto de exemplo: sistema web com controle de estoque, registro de vendas, permissões por usuário e relatórios exportáveis.",
    papel: "Arquitetura, back-end, front-end e infraestrutura.",
    tecnologias: ["React", "Node.js", "PostgreSQL", "Docker"],
    capa: `${IMG}/placeholder-fullstack.svg`,
    imagens: [`${IMG}/placeholder-fullstack.svg`, ...TELAS],
    linkSite: "https://example.com",
    destaque: true,
    exemplo: true,
  },
  {
    id: "ev-sis-02",
    categoria: "sistemas",
    titulo: "Plataforma de agendamentos",
    resumo: "Agenda online com confirmação automática e painel para profissionais.",
    descricao:
      "Texto de exemplo: plataforma de agendamento com regras de disponibilidade, lembretes por WhatsApp e painel administrativo.",
    papel: "API, banco de dados e painel administrativo.",
    tecnologias: ["TypeScript", "Node.js", "SQL"],
    capa: `${IMG}/placeholder-fullstack.svg`,
    imagens: [`${IMG}/placeholder-fullstack.svg`, TELAS[1]],
    exemplo: true,
  },

  // ---------- IA & Automação (EXEMPLOS) ----------
  {
    id: "ev-ia-01",
    categoria: "ia",
    titulo: "Atendente virtual",
    resumo: "Agente de IA que responde clientes 24h com base nos dados da empresa.",
    descricao:
      "Texto de exemplo: agente de atendimento com RAG sobre a base de conhecimento do cliente, integrado ao WhatsApp e com transferência para humano.",
    papel: "Arquitetura do agente, integração e implantação.",
    tecnologias: ["Python", "LLM", "RAG"],
    capa: `${IMG}/placeholder-ia.svg`,
    imagens: [`${IMG}/placeholder-ia.svg`, TELAS[2]],
    destaque: true,
    exemplo: true,
  },
  {
    id: "ev-ia-02",
    categoria: "ia",
    titulo: "Automação de processos",
    resumo: "Fluxos que conectam e-mail, planilhas e CRM sem trabalho manual.",
    descricao:
      "Texto de exemplo: automações que leem e classificam pedidos recebidos por e-mail, atualizam a planilha de controle e criam tarefas no CRM.",
    papel: "Mapeamento do processo e construção dos fluxos.",
    tecnologias: ["n8n", "LLM", "APIs"],
    capa: `${IMG}/placeholder-ia.svg`,
    imagens: [`${IMG}/placeholder-ia.svg`, TELAS[1]],
    exemplo: true,
  },
];
