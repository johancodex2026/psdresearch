import { attr, escapeHtml, joinClasses } from "../lib/html.mjs";
import { claims } from "../content/claims.mjs";

function claimAttributes(claimId) {
  const claim = claims[claimId];
  if (!claim) throw new Error(`Unknown claim: ${claimId}`);
  return ` data-claim="${attr(claimId)}" data-claim-kind="${attr(claim.kind)}"`;
}

function sectionOpen(section, extraClass = "") {
  return `<section id="${attr(section.id)}" class="${joinClasses("document-section", extraClass)}"${claimAttributes(section.claim)}>`;
}

function heading(section) {
  return `<header class="section-heading">
    <p class="section-label">${escapeHtml(section.label)}</p>
    <h2>${escapeHtml(section.title)}</h2>
  </header>`;
}

function renderStatus(section) {
  return `${sectionOpen(section, "section-status")}${heading(section)}
    <dl class="status-list">
      ${section.items.map((item) => `<div><dt>${escapeHtml(item.term)}</dt><dd>${escapeHtml(item.value)}</dd></div>`).join("\n")}
    </dl>
  </section>`;
}

function renderProse(section) {
  return `${sectionOpen(section, "section-prose")}${heading(section)}
    <div class="prose-measure">
      ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n")}
    </div>
  </section>`;
}

function renderDefinition(section) {
  return `${sectionOpen(section, "section-definition")}${heading(section)}
    <div class="definition-box">
      <p class="definition-text">${escapeHtml(section.definition)}</p>
      <p class="definition-qualifier">${escapeHtml(section.qualifier)}</p>
    </div>
  </section>`;
}

function renderCards(section) {
  return `${sectionOpen(section, "section-cards")}${heading(section)}
    <div class="card-grid">
      ${section.items.map((item) => `<article class="document-card">
        <span class="card-code">${escapeHtml(item.code)}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.body)}</p>
      </article>`).join("\n")}
    </div>
  </section>`;
}

function renderMatrix(section) {
  return `${sectionOpen(section, "section-matrix")}${heading(section)}
    <div class="table-scroll" tabindex="0" role="region" aria-label="${attr(section.title)}">
      <table class="document-table matrix-table">
        <thead><tr>${section.columns.map((column) => `<th scope="col">${escapeHtml(column)}</th>`).join("")}</tr></thead>
        <tbody>
          ${section.rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("\n")}
        </tbody>
      </table>
    </div>
  </section>`;
}

function renderTable(section) {
  return `${sectionOpen(section, "section-table")}${heading(section)}
    <div class="table-scroll" tabindex="0" role="region" aria-label="${attr(section.title)}">
      <table class="document-table">
        <thead><tr>${section.headers.map((header) => `<th scope="col">${escapeHtml(header)}</th>`).join("")}</tr></thead>
        <tbody>
          ${section.rows.map((row) => `<tr>${row.map((cell, index) => index === 0 ? `<th scope="row">${escapeHtml(cell)}</th>` : `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("\n")}
        </tbody>
      </table>
    </div>
  </section>`;
}

function renderNumbered(section) {
  return `${sectionOpen(section, "section-numbered")}${heading(section)}
    <ol class="numbered-list">
      ${section.items.map((item) => `<li><span>${escapeHtml(item)}</span></li>`).join("\n")}
    </ol>
  </section>`;
}

function renderCallout(section) {
  return `${sectionOpen(section, "section-callout")}
    <div class="callout-box">
      <p class="section-label">${escapeHtml(section.label)}</p>
      <h2>${escapeHtml(section.title)}</h2>
      <p>${escapeHtml(section.body)}</p>
    </div>
  </section>`;
}

function renderSplit(section) {
  const renderColumn = (column) => `<article class="split-panel">
    <h3>${escapeHtml(column.title)}</h3>
    <ul>${column.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
  </article>`;

  return `${sectionOpen(section, "section-split")}${heading(section)}
    <div class="split-grid">${renderColumn(section.left)}${renderColumn(section.right)}</div>
  </section>`;
}

function renderProofs(section) {
  return `${sectionOpen(section, "section-proofs")}${heading(section)}
    <div class="proof-grid">
      ${section.items.map((item) => `<article class="proof-card">
        <span class="proof-number">${escapeHtml(item.number)}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.body)}</p>
      </article>`).join("\n")}
    </div>
    <p class="formula">${escapeHtml(section.formula)}</p>
  </section>`;
}

function renderQuestions(section) {
  return `${sectionOpen(section, "section-questions")}${heading(section)}
    <ul class="question-grid">
      ${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n")}
    </ul>
  </section>`;
}

function renderProcess(section) {
  return `${sectionOpen(section, "section-process")}${heading(section)}
    <ol class="process-list">
      ${section.items.map((item) => `<li>
        <span class="process-number">${escapeHtml(item.number)}</span>
        <div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.body)}</p></div>
      </li>`).join("\n")}
    </ol>
  </section>`;
}

const renderers = Object.freeze({
  status: renderStatus,
  prose: renderProse,
  definition: renderDefinition,
  cards: renderCards,
  matrix: renderMatrix,
  table: renderTable,
  numbered: renderNumbered,
  callout: renderCallout,
  split: renderSplit,
  proofs: renderProofs,
  questions: renderQuestions,
  process: renderProcess
});

export function renderSection(section) {
  const renderer = renderers[section.type];
  if (!renderer) throw new Error(`Unsupported section type: ${section.type}`);
  return renderer(section);
}
