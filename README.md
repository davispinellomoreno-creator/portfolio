# Portfólio — Davi SPinello

Site de portfólio pessoal com meus projetos de programação, feito com HTML, CSS e JavaScript puro (sem framework e sem etapa de build).

## Seções da página

1. **Hero** — nome, título, frase curta e CTAs para "Ver projetos" e "Contato".
2. **Projetos em destaque** — até 3 projetos com `featured: true`, em cards maiores.
3. **Portfólio** — painel de categorias em abas + cartas de projeto sobrepostas; clicar numa carta abre um modal com galeria.
4. **Sobre & Stack** — bio e tecnologias.
5. **Contato** — e-mail, GitHub e LinkedIn.

## Estrutura

```
├── index.html                    # Página principal
├── data/
│   ├── projects.js               # Lista de projetos e categorias (edite aqui!)
│   └── portfolio.js              # Projetos e categorias da seção Portfólio
├── assets/
│   ├── css/
│   │   ├── reset.css             # Reset básico
│   │   ├── variables.css         # Cores, fontes, tema claro/escuro
│   │   ├── style.css             # Estilos da página
│   │   └── portfolio.css         # Estilos da seção Portfólio (cartas + modal)
│   ├── js/
│   │   ├── main.js               # Menu mobile, tema, compartilhar, ano do rodapé
│   │   ├── projects.js           # Liga os dados aos Projetos em destaque
│   │   ├── portfolio.js          # Liga os dados da seção Portfólio
│   │   ├── utils.js              # escapeHtml e prefers-reduced-motion
│   │   └── components/
│   │       ├── ProjectCard.js       # Card (full, compact, featured) + demos em vídeo/GIF
│   │       ├── FeaturedProjects.js  # Projetos em destaque
│   │       └── portfolio/
│   │           ├── PortfolioSection.js  # Junta abas, cartas e modal; transição entre categorias
│   │           ├── CategoryTabs.js      # Abas ARIA (setas, Home/End)
│   │           ├── PortfolioCard.js     # Carta com prévia no hover/foco
│   │           └── ProjectModal.js      # <dialog> com galeria, foco preso, Esc/clique fora
│   └── img/
│       ├── favicon.svg
│       └── projects/             # Capas e demos dos projetos
├── vercel.json                   # Configuração de deploy na Vercel
└── .github/workflows/
    └── deploy.yml                # Deploy automático no GitHub Pages
```

## Adicionando um projeto

Edite `data/projects.js` e adicione um objeto ao array `projects`. Nenhum componente precisa ser alterado.

```js
{
  id: "fs-04",
  title: "Nome do projeto",
  slug: "nome-do-projeto",
  category: "fullstack", // "fullstack" | "ia" | "landing"
  problem: "Uma frase sobre o problema que o projeto resolve.",
  description: "Texto mais longo (opcional, aparece nos destaques).",
  stack: ["React", "Node.js"],
  result: "Resultado ou impacto (opcional).",
  image: "assets/img/projects/nome.webp",
  demoMedia: "assets/img/projects/nome.mp4", // opcional, usado nos projetos de IA
  links: {
    demo: "https://link-da-demo.com", // opcional
    github: "https://github.com/usuario/repo", // opcional
  },
  featured: false, // true = aparece em "Projetos em destaque"
}
```

Observações:

- **Projetos de exemplo:** os projetos atuais são fictícios e estão marcados com `placeholder: true` e `[Placeholder]` no título. Substitua pelos reais e remova o campo `placeholder` (ele exibe a etiqueta "Placeholder" no card).
- **Tipos:** o arquivo usa JSDoc com `// @ts-check`, então o VS Code oferece autocomplete e avisa sobre campos errados, sem precisar de TypeScript nem de build.
- **Links:** os botões de Demo e GitHub só aparecem quando o link existe.
- **Destaques:** são exibidos no máximo 3, na ordem das categorias. O ideal é marcar um por categoria.
- **Imagens:** use capas em 16:9 (ex: 1280×720), de preferência em WebP. Elas são carregadas com lazy loading.
- **`demoMedia`:** aceita vídeo (`.mp4`, `.webm`) ou imagem animada (GIF, WebP). Só é usado em projetos da categoria `ia`. A demo toca muda e em loop quando o card entra na tela; quem usa "reduzir movimento" no sistema vê a capa estática (e o vídeo com controles).

### Categorias

As categorias e a ordem em que aparecem ficam no array `categories`, em `data/projects.js`. Projetos de `fullstack` e `ia` usam o card completo (problema, stack, resultado e links); os de `landing` usam o card compacto em formato de galeria.

### Link já filtrado

O filtro ativo vai para a URL, então dá para compartilhar a lista filtrada:

- `/?categoria=fullstack`
- `/?categoria=ia`
- `/?categoria=landing`

## Seção Portfólio

Edite `data/portfolio.js`. Para um projeto novo, adicione um objeto a `portfolioProjetos`:

```js
{
  id: "pf-lp-05",                 // único
  categoria: "landing",           // id de uma categoria de `portfolioCategorias`
  titulo: "Nome do projeto",
  resumo: "1–2 linhas, aparecem no hover da carta.",
  descricao: "Texto completo, aparece no modal.",
  papel: "O que você fez no projeto.",
  tecnologias: ["HTML", "CSS"],
  capa: "assets/img/projects/nome-capa.webp",       // imagem da carta (16:9)
  imagens: ["assets/img/projects/nome-1.webp", "assets/img/projects/nome-2.webp"], // galeria do modal
  linkSite: "https://...",        // opcional → botão "Ver site"
  linkCodigo: "https://github.com/...", // opcional → botão "Ver código"
  destaque: true,                 // opcional → etiqueta "Destaque"
}
```

- **Categoria nova:** adicione `{ id, label, descricao }` a `portfolioCategorias`. Ela vira uma aba assim que tiver pelo menos um projeto.
- **Exemplos:** os projetos atuais são fictícios e têm `exemplo: true` (etiqueta "Exemplo"). Remova o campo ao usar dados reais.
- **Layout:** no desktop com mouse (≥1024px) as cartas ficam sobrepostas e revelam prévia e introdução no hover ou foco. No tablet/celular viram um carrossel com scroll-snap. Funcionam bem de 3 a 5 cartas por categoria.

## Rodando localmente

Os scripts são módulos ES, que não funcionam abrindo o arquivo direto (`file://`). Use um servidor local:

- VS Code: extensão **Live Server** → "Open with Live Server"
- ou: `npx serve .`
- ou: `python -m http.server 8000`

Não há etapa de build nem lint configurados. Erros de script aparecem no console do navegador (F12).

## Deploy

**Vercel:** importe o repositório em vercel.com → Framework Preset: *Other* → Deploy. Cada push na `main` publica automaticamente.

**GitHub Pages:** no repositório, vá em *Settings → Pages → Source: GitHub Actions*. O workflow `deploy.yml` publica a cada push na `main`.
