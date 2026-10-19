import { escapeHtml } from "../../utils.js";

const NEXT_KEYS = ["ArrowRight", "ArrowDown"];
const PREV_KEYS = ["ArrowLeft", "ArrowUp"];

/**
 * Abas de categoria no padrão ARIA (tablist/tab), com tabindex móvel:
 * setas trocam de aba (nos dois eixos), Home/End vão para a primeira/última.
 * `categories`: [{ id, label, count }] · `onChange(id)` é chamado ao trocar de aba.
 * `verticalQuery`: MediaQueryList que define quando a lista fica na vertical.
 */
export function createCategoryTabs(container, { categories, active, panelId, verticalQuery, onChange }) {
  container.innerHTML = categories
    .map(({ id, label, count }, index) => {
      const safeId = escapeHtml(id);
      return `
      <button type="button" role="tab" class="pf-tab" id="pf-tab-${safeId}" data-tab="${safeId}"
              aria-controls="${panelId}" aria-selected="false" tabindex="-1">
        <span class="pf-tab__index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
        <span class="pf-tab__label">${escapeHtml(label)}</span>
        <span class="pf-tab__count">${count}<span class="sr-only"> ${count === 1 ? "projeto" : "projetos"}</span></span>
      </button>`;
    })
    .join("");

  const tabs = [...container.querySelectorAll(".pf-tab")];
  let current = null;

  function syncOrientation() {
    container.setAttribute("aria-orientation", verticalQuery.matches ? "vertical" : "horizontal");
  }

  // Na horizontal (mobile) as abas rolam: garante que a ativa esteja visível
  function reveal(tab) {
    const box = container.getBoundingClientRect();
    const rect = tab.getBoundingClientRect();
    if (rect.left < box.left || rect.right > box.right) {
      container.scrollLeft += rect.left - box.left - 16;
    }
  }

  function setActive(id, { focus = false } = {}) {
    current = id;
    tabs.forEach((tab) => {
      const isActive = tab.dataset.tab === id;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive);
      tab.tabIndex = isActive ? 0 : -1;
      if (isActive && focus) {
        tab.focus();
        reveal(tab);
      }
    });
  }

  function select(tab, { focus = false } = {}) {
    if (tab.dataset.tab === current) {
      if (focus) tab.focus();
      return;
    }
    setActive(tab.dataset.tab, { focus });
    onChange(tab.dataset.tab);
  }

  container.addEventListener("click", (e) => {
    const tab = e.target.closest(".pf-tab");
    if (tab) select(tab);
  });

  container.addEventListener("keydown", (e) => {
    const index = tabs.findIndex((tab) => tab.dataset.tab === current);
    let target;

    if (NEXT_KEYS.includes(e.key)) target = tabs[(index + 1) % tabs.length];
    else if (PREV_KEYS.includes(e.key)) target = tabs[(index - 1 + tabs.length) % tabs.length];
    else if (e.key === "Home") target = tabs[0];
    else if (e.key === "End") target = tabs[tabs.length - 1];
    else return;

    e.preventDefault();
    select(target, { focus: true });
  });

  verticalQuery.addEventListener("change", syncOrientation);
  syncOrientation();
  setActive(active);

  return { setActive };
}
