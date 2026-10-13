import { projects, categories } from "../../data/projects.js";
import { createProjectFilter } from "./components/ProjectFilter.js";
import { createProjectGrid } from "./components/ProjectGrid.js";
import { renderFeaturedProjects } from "./components/FeaturedProjects.js";

const ALL = "todos";
const URL_PARAM = "categoria";

// Filtro ativo refletido na URL (ex: ?categoria=ia), para compartilhar o link já filtrado
function readCategoryFromUrl() {
  const value = new URLSearchParams(location.search).get(URL_PARAM);
  return categories.some((category) => category.id === value) ? value : ALL;
}

function writeCategoryToUrl(category) {
  const url = new URL(location.href);
  if (category === ALL) url.searchParams.delete(URL_PARAM);
  else url.searchParams.set(URL_PARAM, category);
  history.replaceState(null, "", url);
}

// Destaques
renderFeaturedProjects(document.querySelector(".featured"), { projects, categories });

// Todos os projetos + filtro
const initial = readCategoryFromUrl();

const grid = createProjectGrid(document.querySelector(".project-groups"), {
  projects,
  categories,
  status: document.querySelector(".projects__status"),
});

const filterOptions = [
  { id: ALL, label: "Todos", count: projects.length },
  ...categories.map((category) => ({
    ...category,
    count: projects.filter((project) => project.category === category.id).length,
  })),
];

createProjectFilter(document.querySelector(".filters"), {
  options: filterOptions,
  active: initial,
  onChange(category) {
    writeCategoryToUrl(category);
    grid.render(category === ALL ? null : category, { animate: true });
  },
});

grid.render(initial === ALL ? null : initial);

// Link compartilhado já filtrado: leva direto para a lista
if (initial !== ALL && !location.hash) {
  document.getElementById("projetos").scrollIntoView({ behavior: "instant" });
}
