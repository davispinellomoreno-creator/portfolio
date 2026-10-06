const grid = document.querySelector(".projects-grid");
const filtersEl = document.querySelector(".filters");

let projects = [];

async function loadProjects() {
  try {
    const res = await fetch("data/projects.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    projects = await res.json();
    renderFilters();
    renderProjects("Todos");
  } catch (err) {
    console.error("Erro ao carregar projetos:", err);
    grid.innerHTML = `<p class="projects-grid__status">Não foi possível carregar os projetos.</p>`;
  }
}

function renderFilters() {
  const tags = ["Todos", ...new Set(projects.flatMap((p) => p.tags))];

  filtersEl.innerHTML = tags
    .map(
      (tag, i) =>
        `<button class="filter-btn${i === 0 ? " is-active" : ""}" data-tag="${tag}">${tag}</button>`
    )
    .join("");

  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filtersEl.querySelector(".is-active")?.classList.remove("is-active");
    btn.classList.add("is-active");
    renderProjects(btn.dataset.tag);
  });
}

function renderProjects(tag) {
  const list = tag === "Todos" ? projects : projects.filter((p) => p.tags.includes(tag));

  if (!list.length) {
    grid.innerHTML = `<p class="projects-grid__status">Nenhum projeto encontrado.</p>`;
    return;
  }

  grid.innerHTML = list.map(createCard).join("");
}

function createCard({ title, description, image, tags, repo, demo }) {
  return `
    <article class="project-card">
      <img class="project-card__image" src="${image}" alt="${title}" loading="lazy" />
      <div class="project-card__body">
        <h3 class="project-card__title">${title}</h3>
        <p class="project-card__description">${description}</p>
        <div class="project-card__tags">
          ${tags.map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
        <div class="project-card__links">
          ${repo ? `<a class="btn btn--secondary" href="${repo}" target="_blank" rel="noopener"><svg class="icon icon--sm"><use href="#i-github"/></svg>Código</a>` : ""}
          ${demo ? `<a class="btn btn--secondary" href="${demo}" target="_blank" rel="noopener"><svg class="icon icon--sm"><use href="#i-external"/></svg>Demo</a>` : ""}
        </div>
      </div>
    </article>
  `;
}

loadProjects();
