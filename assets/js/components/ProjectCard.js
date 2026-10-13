import { escapeHtml, reducedMotion } from "../utils.js";

const VIDEO_PATTERN = /\.(mp4|webm|ogv)(\?.*)?$/i;
const FALLBACK_IMAGE = "assets/img/projects/placeholder.svg";

// Capa do projeto. Em projetos de IA com `demoMedia`, vira vídeo ou GIF (ativado por activateDemoMedia)
function renderMedia(project) {
  const title = escapeHtml(project.title);
  const image = escapeHtml(project.image);
  const hasDemo = project.category === "ia" && Boolean(project.demoMedia);
  const demo = hasDemo ? escapeHtml(project.demoMedia) : "";

  if (hasDemo && VIDEO_PATTERN.test(project.demoMedia)) {
    return `<video class="project-card__image" data-demo src="${demo}" poster="${image}" muted loop playsinline preload="none" aria-label="Demonstração em vídeo do projeto ${title}"></video>`;
  }

  const demoAttrs = hasDemo ? ` data-demo="${demo}" data-cover="${image}"` : "";
  const alt = `${hasDemo ? "Demonstração" : "Capa"} do projeto ${title}`;

  return `<img class="project-card__image" src="${image}"${demoAttrs} alt="${alt}" width="640" height="360" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'" />`;
}

function renderBadges(project, categoryLabel) {
  const badges = [
    categoryLabel ? `<span class="pill">${escapeHtml(categoryLabel)}</span>` : "",
    project.placeholder ? `<span class="pill pill--placeholder">Placeholder</span>` : "",
  ].join("");

  return badges ? `<div class="project-card__badges">${badges}</div>` : "";
}

// Botões de Demo e GitHub — só aparecem quando o link existe
function renderLinks(project, compact) {
  const { demo, github } = project.links ?? {};
  const title = escapeHtml(project.title);

  const link = (href, icon, text, label) => {
    const attrs = `href="${escapeHtml(href)}" target="_blank" rel="noopener" aria-label="${label} (abre em nova aba)"`;
    const svg = `<svg class="icon icon--sm" aria-hidden="true"><use href="#${icon}"/></svg>`;
    return compact
      ? `<a class="icon-btn" ${attrs} title="${text}">${svg}</a>`
      : `<a class="btn btn--secondary" ${attrs}>${svg}${text}</a>`;
  };

  const items = [
    demo ? link(demo, "i-external", compact ? "Ver site" : "Demo", `${compact ? "Ver site" : "Demo"} de ${title}`) : "",
    github ? link(github, "i-github", "GitHub", `GitHub de ${title}`) : "",
  ].join("");

  return items ? `<div class="project-card__links">${items}</div>` : "";
}

function renderTags(stack = []) {
  if (!stack.length) return "";
  return `<ul class="project-card__tags" aria-label="Tecnologias">${stack
    .map((tech) => `<li class="tag">${escapeHtml(tech)}</li>`)
    .join("")}</ul>`;
}

/**
 * Card de projeto.
 * - "full": problema, stack, resultado e links (Full Stack e IA & Automação)
 * - "compact": print + título + links, em formato de galeria (Landing Pages)
 * - "featured": versão maior do "full", com descrição e categoria
 */
export function renderProjectCard(project, options = {}) {
  const {
    variant = project.category === "landing" ? "compact" : "full",
    headingLevel = 3,
    categoryLabel = "",
  } = options;

  const compact = variant === "compact";
  const heading = `h${headingLevel}`;
  const media = `
      <div class="project-card__media">
        ${renderMedia(project)}
        ${renderBadges(project, categoryLabel)}
      </div>`;
  const title = `<${heading} class="project-card__title">${escapeHtml(project.title)}</${heading}>`;

  if (compact) {
    return `
    <article class="project-card project-card--compact">${media}
      <div class="project-card__body">
        ${title}
        ${renderLinks(project, true)}
      </div>
    </article>`;
  }

  return `
    <article class="project-card project-card--${variant}">${media}
      <div class="project-card__body">
        ${title}
        <p class="project-card__problem"><span class="project-card__label">Problema</span>${escapeHtml(project.problem)}</p>
        ${variant === "featured" && project.description ? `<p class="project-card__description">${escapeHtml(project.description)}</p>` : ""}
        ${renderTags(project.stack)}
        ${project.result ? `<p class="project-card__result"><span class="project-card__label">Resultado</span>${escapeHtml(project.result)}</p>` : ""}
        ${renderLinks(project, false)}
      </div>
    </article>`;
}

/**
 * Liga as demos (vídeo/GIF) dos cards dentro de `container`: tocam ao entrar na tela
 * e param ao sair. Com prefers-reduced-motion nada toca sozinho — o vídeo ganha
 * controles e o GIF fica na capa estática. Retorna uma função de limpeza.
 */
export function activateDemoMedia(container) {
  const items = container.querySelectorAll("[data-demo]");
  if (!items.length) return () => {};

  if (reducedMotion.matches) {
    items.forEach((el) => {
      if (el.tagName === "VIDEO") el.controls = true;
    });
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (target.tagName === "VIDEO") {
          if (isIntersecting) target.play().catch(() => {});
          else target.pause();
        } else {
          target.src = isIntersecting ? target.dataset.demo : target.dataset.cover;
        }
      });
    },
    { threshold: 0.6 }
  );

  items.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}
