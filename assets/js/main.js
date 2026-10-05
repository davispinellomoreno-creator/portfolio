// Ano do rodapé
document.getElementById("year").textContent = new Date().getFullYear();

// Menu mobile
const toggle = document.querySelector(".nav__toggle");
const links = document.querySelector(".nav__links");

toggle.addEventListener("click", () => {
  const isOpen = links.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", isOpen);
});

links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") links.classList.remove("is-open");
});

// Tema claro/escuro (preferência salva no navegador)
const root = document.documentElement;
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

let savedTheme = null;
try {
  savedTheme = localStorage.getItem("theme");
} catch {}

root.dataset.theme = savedTheme || (prefersDark ? "dark" : "light");

document.querySelector(".theme-toggle").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try {
    localStorage.setItem("theme", root.dataset.theme);
  } catch {}
});
