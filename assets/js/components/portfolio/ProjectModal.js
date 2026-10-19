import { escapeHtml, reducedMotion } from "../../utils.js";

// Deve acompanhar a duração da transição de `.pf-modal` no CSS
const CLOSE_MS = 220;
const FALLBACK_IMAGE = "assets/img/projects/placeholder.svg";
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function renderLinks({ linkSite, linkCodigo, titulo }) {
  const title = escapeHtml(titulo);
  const link = (href, icon, text, variant) =>
    `<a class="btn btn--${variant}" href="${escapeHtml(href)}" target="_blank" rel="noopener"
        aria-label="${text} de ${title} (abre em nova aba)">
       <svg class="icon icon--sm" aria-hidden="true"><use href="#${icon}"/></svg>${text}
     </a>`;

  const items = [
    linkSite ? link(linkSite, "i-external", "Ver site", "primary") : "",
    linkCodigo ? link(linkCodigo, "i-github", "Ver código", "secondary") : "",
  ].join("");

  return items ? `<div class="pf-modal__links">${items}</div>` : "";
}

function renderContent(project, categoryLabel) {
  const tags = project.tecnologias
    .map((tech) => `<li class="tag">${escapeHtml(tech)}</li>`)
    .join("");

  return `
    <div class="pf-modal__badges">
      ${categoryLabel ? `<span class="pill">${escapeHtml(categoryLabel)}</span>` : ""}
      ${project.destaque ? `<span class="pill pill--highlight">Destaque</span>` : ""}
      ${project.exemplo ? `<span class="pill pill--placeholder">Exemplo</span>` : ""}
    </div>
    <h2 class="pf-modal__title" id="pf-modal-title">${escapeHtml(project.titulo)}</h2>
    <p class="pf-modal__text">${escapeHtml(project.descricao)}</p>
    <div>
      <h3 class="pf-modal__label">Meu papel</h3>
      <p class="pf-modal__text">${escapeHtml(project.papel)}</p>
    </div>
    <div>
      <h3 class="pf-modal__label">Tecnologias</h3>
      <ul class="pf-modal__tags">${tags}</ul>
    </div>
    ${renderLinks(project)}`;
}

/**
 * Modal de detalhes do projeto (<dialog> nativo): galeria com navegação, descrição,
 * papel, tecnologias e links. Fecha com o X, Esc ou clique fora; o foco fica preso
 * dentro do modal e volta para o elemento que o abriu.
 */
export function createProjectModal({ categories }) {
  const labels = new Map(categories.map((category) => [category.id, category.label]));

  const dialog = document.createElement("dialog");
  dialog.className = "pf-modal";
  dialog.setAttribute("aria-labelledby", "pf-modal-title");
  dialog.innerHTML = `
    <div class="pf-modal__inner">
      <button type="button" class="icon-btn pf-modal__close" aria-label="Fechar">
        <svg class="icon" aria-hidden="true"><use href="#i-close"/></svg>
      </button>
      <div class="pf-gallery" role="group" aria-roledescription="galeria" aria-label="Imagens do projeto">
        <div class="pf-gallery__stage">
          <img class="pf-gallery__image" alt="" width="1280" height="720" decoding="async" />
          <button type="button" class="icon-btn pf-gallery__nav pf-gallery__nav--prev" aria-label="Imagem anterior">
            <svg class="icon" aria-hidden="true"><use href="#i-arrow-right"/></svg>
          </button>
          <button type="button" class="icon-btn pf-gallery__nav pf-gallery__nav--next" aria-label="Próxima imagem">
            <svg class="icon" aria-hidden="true"><use href="#i-arrow-right"/></svg>
          </button>
          <p class="pf-gallery__counter" aria-live="polite"></p>
        </div>
        <ul class="pf-gallery__thumbs"></ul>
      </div>
      <div class="pf-modal__content"></div>
    </div>`;
  document.body.append(dialog);

  const content = dialog.querySelector(".pf-modal__content");
  const gallery = dialog.querySelector(".pf-gallery");
  const image = dialog.querySelector(".pf-gallery__image");
  const counter = dialog.querySelector(".pf-gallery__counter");
  const thumbs = dialog.querySelector(".pf-gallery__thumbs");

  let project = null;
  let images = [];
  let current = 0;
  let trigger = null;
  let closeTimer;
  let pressedOnBackdrop = false;

  // ---------- Galeria ----------
  function show(index) {
    current = (index + images.length) % images.length;
    // Mesmo src não dispara `load` de novo: só esconde a imagem quando ela vai trocar
    if (image.getAttribute("src") !== images[current]) {
      image.classList.add("is-loading");
      image.src = images[current];
    }
    image.alt = `${project.titulo} — imagem ${current + 1} de ${images.length}`;
    counter.textContent = images.length > 1 ? `${current + 1} / ${images.length}` : "";

    thumbs.querySelectorAll("button").forEach((btn, i) => {
      if (i === current) btn.setAttribute("aria-current", "true");
      else btn.removeAttribute("aria-current");
    });
  }

  image.addEventListener("load", () => image.classList.remove("is-loading"));
  image.addEventListener("error", () => {
    image.classList.remove("is-loading");
    if (!image.src.endsWith(FALLBACK_IMAGE)) image.src = FALLBACK_IMAGE;
  });

  dialog.querySelector(".pf-gallery__nav--prev").addEventListener("click", () => show(current - 1));
  dialog.querySelector(".pf-gallery__nav--next").addEventListener("click", () => show(current + 1));

  thumbs.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-index]");
    if (btn) show(Number(btn.dataset.index));
  });

  gallery.addEventListener("keydown", (e) => {
    if (images.length < 2) return;
    if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "ArrowRight") show(current + 1);
    else return;
    e.preventDefault();
  });

  function renderGallery() {
    const multiple = images.length > 1;
    gallery.classList.toggle("is-single", !multiple);
    thumbs.innerHTML = multiple
      ? images
          .map(
            (src, i) => `
        <li>
          <button type="button" class="pf-gallery__thumb" data-index="${i}" aria-label="Mostrar imagem ${i + 1} de ${images.length}">
            <img src="${escapeHtml(src)}" alt="" width="128" height="72" loading="lazy" decoding="async"
                 onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'" />
          </button>
        </li>`
          )
          .join("")
      : "";
    show(0);
  }

  // ---------- Abrir / fechar ----------
  function open(nextProject, opener) {
    clearTimeout(closeTimer);
    project = nextProject;
    trigger = opener ?? document.activeElement;
    images = project.imagens?.length ? project.imagens : [project.capa];

    content.innerHTML = renderContent(project, labels.get(project.categoria));
    renderGallery();

    if (!dialog.open) dialog.showModal();
    dialog.querySelector(".pf-modal__inner").scrollTop = 0;
    requestAnimationFrame(() => dialog.classList.add("is-open"));
  }

  function close() {
    if (!dialog.open || !dialog.classList.contains("is-open")) return;
    dialog.classList.remove("is-open");

    if (reducedMotion.matches) dialog.close();
    else closeTimer = setTimeout(() => dialog.close(), CLOSE_MS);
  }

  dialog.addEventListener("close", () => {
    dialog.classList.remove("is-open");
    trigger?.focus();
    trigger = null;
  });

  dialog.querySelector(".pf-modal__close").addEventListener("click", close);

  // Esc: usa a mesma saída animada do botão X
  dialog.addEventListener("cancel", (e) => {
    e.preventDefault();
    close();
  });

  // Clique fora: o <dialog> não tem padding, então um clique nele (e não no conteúdo) é no fundo.
  // Exige que o clique tenha começado no fundo, para não fechar ao arrastar uma seleção de texto.
  dialog.addEventListener("pointerdown", (e) => {
    pressedOnBackdrop = e.target === dialog;
  });
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog && pressedOnBackdrop) close();
  });

  // Foco preso: Tab no último elemento volta ao primeiro (e Shift+Tab ao contrário)
  dialog.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const focusable = [...dialog.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  return { open, close };
}
