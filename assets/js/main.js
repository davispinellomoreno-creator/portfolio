// Ano do rodapé
document.getElementById("year").textContent = new Date().getFullYear();

// Menu mobile
const toggle = document.querySelector(".nav__toggle");
const mobileMenu = document.getElementById("mobile-menu");

function setMenu(open) {
  mobileMenu.hidden = !open;
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  toggle.querySelector("use").setAttribute("href", open ? "#i-close" : "#i-menu");
}

toggle.addEventListener("click", () => setMenu(mobileMenu.hidden));

mobileMenu.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});

window.matchMedia("(min-width: 861px)").addEventListener("change", (e) => {
  if (e.matches) setMenu(false);
});

// Tema claro/escuro (escuro por padrão, preferência salva no navegador)
const root = document.documentElement;

let savedTheme = null;
try {
  savedTheme = localStorage.getItem("theme");
} catch {}

root.dataset.theme = savedTheme || "dark";

document.querySelectorAll(".theme-toggle").forEach((btn) =>
  btn.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("theme", root.dataset.theme);
    } catch {}
  })
);

// Aviso rápido (toast)
const toast = document.querySelector(".toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

// Compartilhar (Web Share API, com fallback para copiar o link)
document.querySelectorAll(".share-btn").forEach((btn) =>
  btn.addEventListener("click", async () => {
    const data = { title: document.title, url: location.href };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(data.url);
        showToast("Link copiado!");
      }
    } catch (err) {
      if (err.name !== "AbortError") showToast("Não foi possível compartilhar.");
    }
  })
);

// Destaca a seção visível no menu e na tab bar
const navItems = document.querySelectorAll("[data-section]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navItems.forEach((item) =>
        item.classList.toggle("is-active", item.dataset.section === entry.target.id)
      );
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
