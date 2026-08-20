const entities = Object.freeze({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;"
});

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => entities[character]);
}

export function attr(value) {
  return escapeHtml(value);
}

export function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function externalLinkAttributes(url) {
  return /^https?:\/\//.test(url) ? ' target="_blank" rel="external noopener noreferrer"' : "";
}
