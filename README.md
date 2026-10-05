# Portfólio — Davi SPinello

Landing page com todos os meus projetos de programação, feita com HTML, CSS e JavaScript puro.

## Estrutura

```
├── index.html               # Página principal
├── assets/
│   ├── css/
│   │   ├── reset.css        # Reset básico
│   │   ├── variables.css    # Cores, fontes, tema claro/escuro
│   │   └── style.css        # Estilos da página
│   ├── js/
│   │   ├── main.js          # Menu mobile, tema, ano do rodapé
│   │   └── projects.js      # Carrega e renderiza os projetos + filtros
│   └── img/
│       ├── favicon.svg
│       └── projects/        # Imagens dos projetos
├── data/
│   └── projects.json        # Lista de projetos (edite aqui!)
├── vercel.json              # Configuração de deploy na Vercel
└── .github/workflows/
    └── deploy.yml           # Deploy automático no GitHub Pages
```

## Adicionando um projeto

Edite `data/projects.json` e adicione um objeto:

```json
{
  "title": "Nome do projeto",
  "description": "O que ele faz.",
  "image": "assets/img/projects/nome.png",
  "tags": ["JavaScript", "API"],
  "repo": "https://github.com/usuario/repo",
  "demo": "https://link-da-demo.com"
}
```

## Rodando localmente

O `fetch` do JSON não funciona abrindo o arquivo direto (`file://`). Use um servidor local:

- VS Code: extensão **Live Server** → "Open with Live Server"
- ou: `npx serve .`

## Deploy

**Vercel:** importe o repositório em vercel.com → Framework Preset: *Other* → Deploy. Cada push na `main` publica automaticamente.

**GitHub Pages:** no repositório, vá em *Settings → Pages → Source: GitHub Actions*. O workflow `deploy.yml` publica a cada push na `main`.
