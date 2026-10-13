import { escapeHtml, reducedMotion } from "../utils.js";
import { renderProjectCard, activateDemoMedia } from "./ProjectCard.js";

// Deve acompanhar a duração da transição de `.project-groups` no CSS
const SWITCH_MS = 180;

function renderGroup({ id, label, items }, single) {
  const gallery = id === "landing" ? " projects-grid--gallery" : "";

  return `
    <section class="project-group" aria-labelledby="grupo-${id}">
      <h3 class="project-group__title${single ? " sr-only" : ""}" id="grupo-${id}">
        ${escapeHtml(label)}<span class="project-group__count" aria-hidden="true">${items.length}</span>
      </h3>
      <div class="projects-grid${gallery}">
        ${items.map((project) => renderProjectCard(project, { headingLevel: 4 })).join("")}
      </div>
    </section>`;
}

/**
 * Listagem de projetos agrupada por categoria (na ordem de `categories`).
 * `render(categoryId)` mostra uma categoria; `render(null)` mostra todas.
 */
export function createProjectGrid(container, { projects, categories, status }) {
  let stopMedia = () => {};
  let timer;

  function paint(categoryId) {
    const groups = categories
      .filter((category) => !categoryId || category.id === categoryId)
      .map((category) => ({ ...category, items: projects.filter((p) => p.category === category.id) }))
      .filter((group) => group.items.length);

    const total = groups.reduce((sum, group) => sum + group.items.length, 0);

    stopMedia();
    container.innerHTML = groups.length
      ? groups.map((group) => renderGroup(group, Boolean(categoryId))).join("")
      : `<p class="projects-grid__status">Nenhum projeto encontrado.</p>`;
    stopMedia = activateDemoMedia(container);

    if (status) {
      const scope = categoryId ? `em ${groups[0]?.label ?? "esta categoria"}` : "em todas as categorias";
      status.textContent = `Mostrando ${total} ${total === 1 ? "projeto" : "projetos"} ${scope}.`;
    }
  }

  function render(categoryId, { animate = false } = {}) {
    clearTimeout(timer);

    if (!animate || reducedMotion.matches) {
      container.classList.remove("is-switching");
      paint(categoryId);
      return;
    }

    // Some com a lista atual, troca o conteúdo e deixa os cards novos entrarem
    container.classList.add("is-switching");
    timer = setTimeout(() => {
      paint(categoryId);
      container.classList.remove("is-switching");
    }, SWITCH_MS);
  }

  return { render };
}
