import { renderProjectCard, activateDemoMedia } from "./ProjectCard.js";

/**
 * Projetos com `featured: true`, em cards maiores e na ordem das categorias.
 * Esconde a seção inteira se não houver nenhum destaque.
 */
export function renderFeaturedProjects(container, { projects, categories, limit = 3 }) {
  const order = categories.map((category) => category.id);
  const labels = Object.fromEntries(categories.map(({ id, label }) => [id, label]));

  const featured = projects
    .filter((project) => project.featured)
    .sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category))
    .slice(0, limit);

  const section = container.closest("section");
  if (section) section.hidden = !featured.length;

  container.innerHTML = featured
    .map((project) =>
      renderProjectCard(project, {
        variant: "featured",
        headingLevel: 3,
        categoryLabel: labels[project.category],
      })
    )
    .join("");

  return activateDemoMedia(container);
}
