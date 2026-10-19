// @ts-check

/**
 * Dados da seção "Portfólio" (cartas sobrepostas + modal com galeria).
 * Para adicionar um projeto, inclua um objeto em `portfolioProjetos`.
 * Para adicionar uma categoria, inclua um objeto em `portfolioCategorias` — ela vira uma aba nova.
 *
 * @typedef {Object} PortfolioCategoria
 * @property {string} id         Usado em `categoria` dos projetos
 * @property {string} label      Texto da aba
 * @property {string} descricao  Frase curta mostrada no painel da categoria ativa
 *
 * @typedef {Object} PortfolioProjeto
 * @property {string} id
 * @property {string} categoria       `id` de uma das categorias acima
 * @property {string} titulo
 * @property {string} resumo          1–2 linhas, aparece no hover do card
 * @property {string} descricao       Texto completo, aparece no modal
 * @property {string} papel           O que você fez no projeto
 * @property {string[]} tecnologias   Renderizadas como tags
 * @property {string} capa            Imagem do card (ideal: 1280x720, WebP)
 * @property {string[]} imagens       Galeria do modal (a capa não entra automaticamente)
 * @property {string} [linkSite]      Botão "Ver site" (só aparece se existir)
 * @property {string} [linkCodigo]    Botão "Ver código" (só aparece se existir)
 * @property {boolean} [destaque]     Mostra a etiqueta "Destaque" no card
 * @property {boolean} [exemplo]      Marca como projeto de exemplo; remova ao usar dados reais
 */

const IMG = "assets/img/projects";
const TELAS = [`${IMG}/placeholder-tela-1.svg`, `${IMG}/placeholder-tela-2.svg`, `${IMG}/placeholder-tela-3.svg`];

/** @type {PortfolioCategoria[]} */
export const portfolioCategorias = [
  {
    id: "landing",
    label: "Landing Pages",
    descricao: "Páginas rápidas e focadas em conversão, do layout ao deploy.",
  },
  {
    id: "fullstack",
    label: "Projetos Fullstack",
    descricao: "Aplicações completas: front-end, API, banco de dados e infraestrutura.",
  },
  {
    id: "ia",
    label: "Agentes de IA",
    descricao: "Agentes e automações com LLMs que executam tarefas de ponta a ponta.",
  },
];

/** @type {PortfolioProjeto[]} */
export const portfolioProjetos = [
  // ---------- Landing Pages (EXEMPLOS — substitua pelos seus projetos) ----------
  {
    id: "pf-lp-01",
    categoria: "landing",
    titulo: "Landing page 1",
    resumo: "Site institucional para um estúdio de arquitetura, com galeria de obras.",
    descricao:
      "Texto de exemplo: landing page com galeria de obras filtrável, animações discretas ao rolar e formulário de orçamento integrado ao e-mail do estúdio.",
    papel: "Design da interface, desenvolvimento front-end e publicação.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    capa: `${IMG}/placeholder-landing.svg`,
    imagens: [`${IMG}/placeholder-landing.svg`, ...TELAS],
    linkSite: "https://example.com",
    linkCodigo: "https://github.com/SEU-USUARIO/landing-page-1",
    destaque: true,
    exemplo: true,
  },
  {
    id: "pf-lp-02",
    categoria: "landing",
    titulo: "Landing page 2",
    resumo: "Página de pré-lançamento de app com captura de lista de espera.",
    descricao:
      "Texto de exemplo: página única com contador regressivo, depoimentos e formulário de lista de espera salvo numa planilha.",
    papel: "Desenvolvimento front-end e integração do formulário.",
    tecnologias: ["HTML", "CSS"],
    capa: `${IMG}/placeholder-landing.svg`,
    imagens: [`${IMG}/placeholder-landing.svg`, TELAS[0], TELAS[2]],
    linkSite: "https://example.com",
    exemplo: true,
  },
  {
    id: "pf-lp-03",
    categoria: "landing",
    titulo: "Landing page 3",
    resumo: "Cardápio online e horários para uma cafeteria local.",
    descricao:
      "Texto de exemplo: landing page mobile-first com cardápio, mapa, horários e botão direto para pedidos pelo WhatsApp.",
    papel: "Projeto completo, do layout ao deploy.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    capa: `${IMG}/placeholder-landing.svg`,
    imagens: [`${IMG}/placeholder-landing.svg`, TELAS[2]],
    linkCodigo: "https://github.com/SEU-USUARIO/landing-page-3",
    exemplo: true,
  },
  {
    id: "pf-lp-04",
    categoria: "landing",
    titulo: "Landing page 4",
    resumo: "Página de evento com programação, palestrantes e inscrição.",
    descricao:
      "Texto de exemplo: landing page de conferência com agenda por trilha, cards de palestrantes e checkout de ingressos.",
    papel: "Desenvolvimento front-end.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    capa: `${IMG}/placeholder-landing.svg`,
    imagens: [`${IMG}/placeholder-landing.svg`, TELAS[0], TELAS[1]],
    linkSite: "https://example.com",
    exemplo: true,
  },

  // ---------- Projetos Fullstack (EXEMPLOS) ----------
  {
    id: "pf-fs-01",
    categoria: "fullstack",
    titulo: "Projeto fullstack 1",
    resumo: "Painel de pedidos em tempo real para pequenos restaurantes.",
    descricao:
      "Texto de exemplo: aplicação com autenticação, painel de pedidos em tempo real via WebSocket, cadastro de cardápio e relatórios de vendas.",
    papel: "Arquitetura, API, banco de dados e front-end.",
    tecnologias: ["React", "Node.js", "PostgreSQL", "Docker"],
    capa: `${IMG}/placeholder-fullstack.svg`,
    imagens: [`${IMG}/placeholder-fullstack.svg`, ...TELAS],
    linkSite: "https://example.com",
    linkCodigo: "https://github.com/SEU-USUARIO/projeto-fullstack-1",
    destaque: true,
    exemplo: true,
  },
  {
    id: "pf-fs-02",
    categoria: "fullstack",
    titulo: "Projeto fullstack 2",
    resumo: "API de agendamentos que evita conflitos entre profissionais.",
    descricao:
      "Texto de exemplo: API REST com regras de disponibilidade, notificações por e-mail e painel administrativo para clínicas.",
    papel: "Back-end e modelagem do banco de dados.",
    tecnologias: ["Node.js", "Express", "SQL", "JWT"],
    capa: `${IMG}/placeholder-fullstack.svg`,
    imagens: [`${IMG}/placeholder-fullstack.svg`, TELAS[1]],
    linkCodigo: "https://github.com/SEU-USUARIO/projeto-fullstack-2",
    exemplo: true,
  },
  {
    id: "pf-fs-03",
    categoria: "fullstack",
    titulo: "Projeto fullstack 3",
    resumo: "Controle financeiro para freelancers, com receitas, despesas e impostos.",
    descricao:
      "Texto de exemplo: aplicação com importação de extratos, categorização automática e projeção de impostos do mês.",
    papel: "Projeto completo, do banco à interface.",
    tecnologias: ["TypeScript", "React", "Node.js"],
    capa: `${IMG}/placeholder-fullstack.svg`,
    imagens: [`${IMG}/placeholder-fullstack.svg`, TELAS[1], TELAS[2]],
    linkSite: "https://example.com",
    linkCodigo: "https://github.com/SEU-USUARIO/projeto-fullstack-3",
    exemplo: true,
  },

  // ---------- Agentes de IA (EXEMPLOS) ----------
  {
    id: "pf-ia-01",
    categoria: "ia",
    titulo: "Agente de IA 1",
    resumo: "Assistente de atendimento que responde com base na documentação.",
    descricao:
      "Texto de exemplo: agente com RAG sobre a base de conhecimento da empresa, que responde clientes e encaminha casos complexos para um humano.",
    papel: "Arquitetura do agente, pipeline de RAG e integração com o chat.",
    tecnologias: ["Python", "LLM", "RAG", "FastAPI"],
    capa: `${IMG}/placeholder-ia.svg`,
    imagens: [`${IMG}/placeholder-ia.svg`, TELAS[2], TELAS[1]],
    linkCodigo: "https://github.com/SEU-USUARIO/agente-ia-1",
    destaque: true,
    exemplo: true,
  },
  {
    id: "pf-ia-02",
    categoria: "ia",
    titulo: "Agente de IA 2",
    resumo: "Triagem automática de e-mails comerciais numa caixa compartilhada.",
    descricao:
      "Texto de exemplo: agente que lê, classifica e resume e-mails recebidos, cria tarefas no CRM e avisa o responsável.",
    papel: "Fluxo de automação e prompts de classificação.",
    tecnologias: ["n8n", "LLM", "Gmail API"],
    capa: `${IMG}/placeholder-ia.svg`,
    imagens: [`${IMG}/placeholder-ia.svg`, TELAS[1]],
    linkCodigo: "https://github.com/SEU-USUARIO/agente-ia-2",
    exemplo: true,
  },
  {
    id: "pf-ia-03",
    categoria: "ia",
    titulo: "Agente de IA 3",
    resumo: "Extração de dados de notas fiscais em PDF para o sistema contábil.",
    descricao:
      "Texto de exemplo: agente que lê PDFs de notas fiscais, extrai os campos com OCR + LLM, valida e lança no sistema contábil.",
    papel: "Pipeline de extração e validação.",
    tecnologias: ["Python", "OCR", "LLM"],
    capa: `${IMG}/placeholder-ia.svg`,
    imagens: [`${IMG}/placeholder-ia.svg`, TELAS[0]],
    linkSite: "https://example.com",
    exemplo: true,
  },
];
