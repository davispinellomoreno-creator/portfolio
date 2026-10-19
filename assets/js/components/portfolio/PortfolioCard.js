import { escapeHtml } from "../../utils.js";

const FALLBACK_IMAGE = "assets/img/projects/placeholder.svg";
const MAX_TAGS = 3;

function renderBadges(project) {
  const badges = [
    project.destaque ? `<span class="pill pill--highlight">Destaque</span>` : "",
    project.exemplo ? `<span class="pill pill--placeholder">Exemplo</span>` : "",
  ].join("");

  return badges ? `<div class="pf-card__badges">${badges}</div>` : "";
}

// Mostra até MAX_TAGS tecnologias no card; o resto aparece como "+N" (a lista completa fica no modal)
function renderTags(tecnologias = []) {
  if (!tecnologias.length) return "";
  const extra = tecnologias.length - MAX_TAGS;
  const items = tecnologias
    .slice(0, MAX_TAGS)
    .map((tech) => `<li class="tag">${escapeHtml(tech)}</li>`)
    .join("");

  return `<ul class="pf-card__tags" aria-label="Tecnologias">${items}${
    extra > 0 ? `<li class="tag tag--more">+${extra}<span class="sr-only"> outras</span></li>` : ""
  }</ul>`;
}

/**
 * Carta de projeto da seção Portfólio.
 * O título é um botão que cobre a carta inteira (clique, toque ou Enter abrem o modal);
 * a prévia e a introdução aparecem no hover e no foco via teclado.
 */
export function renderPortfolioCard(project, index) {
  const id = escapeHtml(project.id);
  const title = escapeHtml(project.titulo);

  return `
    <li class="pf-card" style="--i: ${index}">
      <div class="pf-card__media">
        <img src="${escapeHtml(project.capa)}" alt="Prévia do projeto ${title}" width="640" height="360"
             loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'" />
      </div>
      <span class="pf-card__index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
      ${renderBadges(project)}
      <div class="pf-card__body">
        <h3 class="pf-card__title">
          <button type="button" class="pf-card__open" data-project="${id}" aria-haspopup="dialog"
                  aria-describedby="pf-resumo-${id}">${title}</button>
        </h3>
        <div class="pf-card__intro">
          <div class="pf-card__intro-inner">
            <p class="pf-card__summary" id="pf-resumo-${id}">${escapeHtml(project.resumo)}</p>
            ${renderTags(project.tecnologias)}
          </div>
        </div>
      </div>
    </li>`;
}
