import { escapeHtml } from "../utils.js";

/**
 * Chips de filtro por categoria.
 * `options`: [{ id, label, count }] · `onChange(id)` é chamado ao trocar de filtro.
 */
export function createProjectFilter(container, { options, active, onChange }) {
  container.innerHTML = options
    .map(
      ({ id, label, count }) =>
        `<button type="button" class="filter-btn" data-filter="${escapeHtml(id)}" aria-pressed="false">${escapeHtml(label)}<span class="filter-btn__count" aria-hidden="true">${count}</span></button>`
    )
    .join("");

  const buttons = [...container.querySelectorAll(".filter-btn")];
  let current = null;

  function setActive(id) {
    current = id;
    buttons.forEach((btn) => {
      const isActive = btn.dataset.filter === id;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive);
      if (isActive) reveal(btn);
    });
  }

  // No mobile os chips rolam na horizontal: garante que o ativo esteja visível
  function reveal(btn) {
    const box = container.getBoundingClientRect();
    const rect = btn.getBoundingClientRect();
    if (rect.left < box.left || rect.right > box.right) {
      container.scrollLeft += rect.left - box.left - 16;
    }
  }

  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn || btn.dataset.filter === current) return;
    setActive(btn.dataset.filter);
    onChange(btn.dataset.filter);
  });

  setActive(active);

  return { setActive };
}
