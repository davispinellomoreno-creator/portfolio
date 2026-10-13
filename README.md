# Portfólio — Davi SPinello

Site de portfólio pessoal com meus projetos de programação, feito com HTML, CSS e JavaScript puro (sem framework e sem etapa de build).

## Seções da página

1. **Hero** — nome, título, frase curta e CTAs para "Ver projetos" e "Contato".
2. **Projetos em destaque** — até 3 projetos com `featured: true`, em cards maiores.
3. **Todos os projetos** — listagem com filtro por categoria: `Todos` · `Full Stack` · `IA & Automação` · `Landing Pages`.
4. **Sobre & Stack** — bio e tecnologias.
5. **Contato** — e-mail, GitHub e LinkedIn.

## Estrutura

```
├── index.html                    # Página principal
├── data/
│   └── projects.js               # Lista de projetos e categorias (edite aqui!)
├── assets/
│   ├── css/
│   │   ├── reset.css             # Reset básico
│   │   ├── variables.css         # Cores, fontes, tema claro/escuro
│   │   └── style.css             # Estilos da página
│   ├── js/
│   │   ├── main.js               # Menu mobile, tema, compartilhar, ano do rodapé
│   │   ├── projects.js           # Liga dados, filtro, listagem e URL
│   │   ├── utils.js              # escapeHtml e prefers-reduced-motion
│   │   └── components/
│   │       ├── ProjectCard.js       # Card (full, compact, featured) + demos em vídeo/GIF
│   │       ├── ProjectFilter.js     # Chips de filtro
│   │       ├── ProjectGrid.js       # Listagem agrupada por categoria
│   │       └── FeaturedProjects.js  # Projetos em destaque
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

## Rodando localmente

Os scripts são módulos ES, que não funcionam abrindo o arquivo direto (`file://`). Use um servidor local:

- VS Code: extensão **Live Server** → "Open with Live Server"
- ou: `npx serve .`
- ou: `python -m http.server 8000`

Não há etapa de build nem lint configurados. Erros de script aparecem no console do navegador (F12).

## Deploy

**Vercel:** importe o repositório em vercel.com → Framework Preset: *Other* → Deploy. Cada push na `main` publica automaticamente.

**GitHub Pages:** no repositório, vá em *Settings → Pages → Source: GitHub Actions*. O workflow `deploy.yml` publica a cada push na `main`.
