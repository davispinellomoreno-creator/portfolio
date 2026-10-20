import { projects, categories } from "../../data/projects.js";
import { renderFeaturedProjects } from "./components/FeaturedProjects.js";

// Destaques
renderFeaturedProjects(document.querySelector(".featured"), { projects, categories });
