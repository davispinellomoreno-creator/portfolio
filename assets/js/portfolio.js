import { portfolioCategorias, portfolioProjetos } from "../../data/portfolio.js";
import { createPortfolioSection } from "./components/portfolio/PortfolioSection.js";

createPortfolioSection(document.getElementById("portfolio"), {
  categories: portfolioCategorias,
  projects: portfolioProjetos,
});
