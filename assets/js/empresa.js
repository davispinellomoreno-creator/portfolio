import { empresaCategorias, empresaProjetos } from "../../data/empresa.js";
import { createPortfolioSection } from "./components/portfolio/PortfolioSection.js";

createPortfolioSection(document.getElementById("portfolio"), {
  categories: empresaCategorias,
  projects: empresaProjetos,
});
