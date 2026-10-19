import { escapeHtml, reducedMotion } from "../../utils.js";
import { createCategoryTabs } from "./CategoryTabs.js";
import { renderPortfolioCard } from "./PortfolioCard.js";
import { createProjectModal } from "./ProjectModal.js";

// Deve acompanhar a duração da transição de `.portfolio.is-switching` no CSS
const SWITCH_MS = 200;

// Mesmo breakpoint do layout "desktop" em portfolio.css (painel vertical + cartas sobrepostas)
const desktopQuery = window.matchMedia("(min-width: 1024px) and (hover: hover)");

function renderInfo(category, index, total) {
  const count = category.items.length;
  return `
    <span class="pf-panel__label">// categoria</span>
    <span class="pf-panel__index">${String(index + 1).padStart(2, "0")}<span>/${String(total).padStart(2, "0")}</span></span>
    <p class="pf-panel__name">${escapeHtml(category.label)}</p>
    <p class="pf-panel__desc" id="pf-desc">${escapeHtml(category.descricao)}</p>
    <span class="pf-panel__count">${count} ${count === 1 ? "projeto" : "projetos"}</span>`;
}

/**
 * Seção Portfólio: painel com abas de categoria + cartas de projeto + modal de detalhes.
 * Categorias sem projetos não viram aba.
 */
export function createPortfolioSection(root, { categories, projects }) {
  const wrapper = root.querySelector(".portfolio");
  const info = root.querySelector(".pf-panel__info");
  const stage = root.querySelector(".pf-stage");
  const deck = root.querySelector(".pf-deck");
  const status = root.querySelector(".pf-status");

  const groups = categories
    .map((category) => ({ ...category, items: projects.filter((p) => p.categoria === category.id) }))
    .filter((group) => group.items.length);

  if (!groups.length) {
    deck.innerHTML = `<li class="projects-grid__status">Nenhum projeto cadastrado.</li>`;
    return;
  }

  const byId = new Map(projects.map((project) => [project.id, project]));
  const modal = createProjectModal({ categories });
  let timer;

  function paint(categoryId) {
    const index = groups.findIndex((group) => group.id === categoryId);
    const group = groups[index];

    info.innerHTML = renderInfo(group, index, groups.length);
    deck.style.setProperty("--n", group.items.length);
    deck.innerHTML = group.items.map(renderPortfolioCard).join("");
    deck.scrollLeft = 0;
    stage.setAttribute("aria-labelledby", `pf-tab-${group.id}`);
    status.textContent = `Mostrando ${group.items.length} ${group.items.length === 1 ? "projeto" : "projetos"} em ${group.label}.`;
  }

  function render(categoryId, { animate = false } = {}) {
    clearTimeout(timer);

    if (!animate || reducedMotion.matches) {
      wrapper.classList.remove("is-switching");
      paint(categoryId);
      return;
    }

    // Recolhe as cartas atuais, troca o conteúdo e "distribui" as novas
    wrapper.classList.add("is-switching");
    timer = setTimeout(() => {
      paint(categoryId);
      wrapper.classList.remove("is-switching");
    }, SWITCH_MS);
  }

  deck.addEventListener("click", (e) => {
    const btn = e.target.closest(".pf-card__open");
    const project = btn && byId.get(btn.dataset.project);
    if (project) modal.open(project, btn);
  });

  createCategoryTabs(root.querySelector(".pf-tabs"), {
    categories: groups.map(({ id, label, items }) => ({ id, label, count: items.length })),
    active: groups[0].id,
    panelId: stage.id,
    verticalQuery: desktopQuery,
    onChange: (id) => render(id, { animate: true }),
  });

  render(groups[0].id);
}
