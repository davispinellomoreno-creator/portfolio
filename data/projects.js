// @ts-check

/**
 * Fonte única dos projetos do portfólio.
 * Para adicionar um projeto, inclua um objeto em `projects` — nenhum componente precisa mudar.
 *
 * @typedef {"fullstack" | "ia" | "landing"} ProjectCategory
 *
 * @typedef {Object} ProjectLinks
 * @property {string} [demo]   URL da demo/site publicado
 * @property {string} [github] URL do repositório
 *
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} title
 * @property {string} slug
 * @property {ProjectCategory} category
 * @property {string} problem        Uma frase sobre o problema que o projeto resolve
 * @property {string} [description]  Texto mais longo (aparece nos destaques)
 * @property {string[]} stack        Tecnologias, renderizadas como tags
 * @property {string} [result]       Resultado/impacto
 * @property {string} image          Imagem de capa (ideal: 1280x720, WebP)
 * @property {string} [demoMedia]    GIF ou vídeo curto (.mp4/.webm), usado nos cards de IA
 * @property {ProjectLinks} links
 * @property {boolean} featured      Aparece em "Projetos em destaque"
 * @property {boolean} [placeholder] Marca o card como exemplo; remova ao usar dados reais
 */

/**
 * Categorias na ordem em que aparecem nos filtros e na listagem.
 * @type {{ id: ProjectCategory, label: string }[]}
 */
export const categories = [
  { id: "fullstack", label: "Full Stack" },
  { id: "ia", label: "IA & Automação" },
  { id: "landing", label: "Landing Pages" },
];

/** @type {Project[]} */
export const projects = [
  // ---------- Full Stack (PLACEHOLDERS — substitua pelos seus projetos) ----------
  {
    id: "fs-01",
    title: "[Placeholder] Painel de Pedidos",
    slug: "painel-de-pedidos",
    category: "fullstack",
    problem: "Pequenos restaurantes perdiam pedidos por controlar tudo em planilhas e WhatsApp.",
    description:
      "Texto fictício: aplicação com autenticação, painel em tempo real e relatórios de vendas. Substitua por uma descrição real do projeto.",
    stack: ["React", "Node.js", "PostgreSQL", "Docker"],
    result: "Dado fictício: redução de 40% no tempo de atendimento.",
    image: "assets/img/projects/placeholder-fullstack.svg",
    links: {
      demo: "https://example.com",
      github: "https://github.com/SEU-USUARIO/painel-de-pedidos",
    },
    featured: true,
    placeholder: true,
  },
  {
    id: "fs-02",
    title: "[Placeholder] API de Agendamentos",
    slug: "api-de-agendamentos",
    category: "fullstack",
    problem: "Clínicas precisavam evitar conflitos de horário entre vários profissionais.",
    stack: ["Node.js", "Express", "SQL", "JWT"],
    result: "Dado fictício: zero conflitos de agenda após a implantação.",
    image: "assets/img/projects/placeholder-fullstack.svg",
    links: {
      github: "https://github.com/SEU-USUARIO/api-de-agendamentos",
    },
    featured: false,
    placeholder: true,
  },
  {
    id: "fs-03",
    title: "[Placeholder] Controle Financeiro",
    slug: "controle-financeiro",
    category: "fullstack",
    problem: "Freelancers não tinham uma visão clara de receitas, despesas e impostos do mês.",
    stack: ["TypeScript", "React", "Node.js"],
    image: "assets/img/projects/placeholder-fullstack.svg",
    links: {
      demo: "https://example.com",
      github: "https://github.com/SEU-USUARIO/controle-financeiro",
    },
    featured: false,
    placeholder: true,
  },

  // ---------- IA & Automação (PLACEHOLDERS) ----------
  {
    id: "ia-01",
    title: "[Placeholder] Assistente de Atendimento",
    slug: "assistente-de-atendimento",
    category: "ia",
    problem: "A equipe de suporte respondia manualmente as mesmas dúvidas dezenas de vezes por dia.",
    description:
      "Texto fictício: assistente que responde com base na documentação da empresa e encaminha casos complexos para um humano.",
    stack: ["Python", "LLM", "RAG", "FastAPI"],
    result: "Dado fictício: 60% das dúvidas resolvidas sem intervenção humana.",
    image: "assets/img/projects/placeholder-ia.svg",
    demoMedia: "assets/img/projects/placeholder-demo.svg",
    links: {
      github: "https://github.com/SEU-USUARIO/assistente-de-atendimento",
    },
    featured: true,
    placeholder: true,
  },
  {
    id: "ia-02",
    title: "[Placeholder] Triagem de E-mails",
    slug: "triagem-de-emails",
    category: "ia",
    problem: "E-mails comerciais importantes se perdiam em uma caixa de entrada compartilhada.",
    stack: ["n8n", "LLM", "Gmail API"],
    result: "Dado fictício: 5 horas economizadas por semana.",
    image: "assets/img/projects/placeholder-ia.svg",
    demoMedia: "assets/img/projects/placeholder-demo.svg",
    links: {
      github: "https://github.com/SEU-USUARIO/triagem-de-emails",
    },
    featured: false,
    placeholder: true,
  },
  {
    id: "ia-03",
    title: "[Placeholder] Extrator de Notas Fiscais",
    slug: "extrator-de-notas-fiscais",
    category: "ia",
    problem: "Lançar notas fiscais em PDF no sistema contábil era um trabalho manual e sujeito a erros.",
    stack: ["Python", "OCR", "LLM"],
    image: "assets/img/projects/placeholder-ia.svg",
    links: {
      demo: "https://example.com",
    },
    featured: false,
    placeholder: true,
  },

  // ---------- Landing Pages (PLACEHOLDERS) ----------
  {
    id: "lp-01",
    title: "[Placeholder] Estúdio de Arquitetura",
    slug: "estudio-de-arquitetura",
    category: "landing",
    problem: "O estúdio não tinha uma presença online à altura do seu portfólio de obras.",
    description:
      "Texto fictício: landing page com galeria de obras, animações discretas e formulário de orçamento.",
    stack: ["HTML", "CSS", "JavaScript"],
    result: "Dado fictício: 3x mais pedidos de orçamento pelo site.",
    image: "assets/img/projects/placeholder-landing.svg",
    links: {
      demo: "https://example.com",
      github: "https://github.com/SEU-USUARIO/estudio-de-arquitetura",
    },
    featured: true,
    placeholder: true,
  },
  {
    id: "lp-02",
    title: "[Placeholder] Lançamento de App",
    slug: "lancamento-de-app",
    category: "landing",
    problem: "O app precisava captar uma lista de espera antes do lançamento.",
    stack: ["HTML", "CSS"],
    image: "assets/img/projects/placeholder-landing.svg",
    links: {
      demo: "https://example.com",
    },
    featured: false,
    placeholder: true,
  },
  {
    id: "lp-03",
    title: "[Placeholder] Cafeteria Local",
    slug: "cafeteria-local",
    category: "landing",
    problem: "A cafeteria dependia só do Instagram para divulgar cardápio e horários.",
    stack: ["HTML", "CSS", "JavaScript"],
    image: "assets/img/projects/placeholder-landing.svg",
    links: {
      demo: "https://example.com",
      github: "https://github.com/SEU-USUARIO/cafeteria-local",
    },
    featured: false,
    placeholder: true,
  },
];
