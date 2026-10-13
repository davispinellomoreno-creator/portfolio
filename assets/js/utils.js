const HTML_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

// Os dados dos projetos entram na página via innerHTML; escape tudo que vier deles
export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
}

// Preferência do sistema por menos movimento (consulte `.matches` na hora de animar)
export const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
