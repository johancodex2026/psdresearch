const isPt = document.documentElement.lang.toLowerCase().startsWith('pt');
const locale = isPt ? 'pt-BR' : 'en';

function ensureReferenceStyles() {
  if (document.querySelector('link[href="/assets/css/reference-integrity.css"]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/assets/css/reference-integrity.css';
  document.head.append(link);
}

function normalizeUrl(value) {
  try {
    const url = new URL(value, window.location.href);
    url.hash = '';
    url.search = '';
    url.pathname = url.pathname.replace(/\/$/, '') || '/';
    return url.toString();
  } catch {
    return value;
  }
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element && value) element.textContent = value;
}

function setHtml(element, value) {
  if (element && value) element.innerHTML = value;
}

function setTextIn(root, selector, value) {
  const element = root.querySelector(selector);
  if (element) element.textContent = value;
}

function articleByHeading(fragment) {
  return [...document.querySelectorAll('.manifesto-article')].find((article) =>
    article.querySelector('h2')?.textContent.trim().includes(fragment)
  );
}

function replaceEnglishLegalPhrasing() {
  if (isPt) return;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    if (node.parentElement?.closest('script, style, code, pre')) continue;
    node.nodeValue = node.nodeValue
      .replaceAll('Company in formation', 'Company being incorporated')
      .replaceAll('company in formation', 'company being incorporated');
  }
  for (const element of document.querySelectorAll('.legal-status-card p, .public-identity-card dd, .legal-identity-card dd')) {
    if (element.textContent.trim() === 'CNPJ **.***.***/****-**') {
      element.textContent = 'Brazilian CNPJ (corporate tax registration): **.***.***/****-**';
    }
  }
}

function refineHomeCopy() {
  if (!document.body.classList.contains('home-social-v2')) return;
  if (isPt) {
    setText('#field-title', 'Estudamos até onde sistemas inteligentes persistentes podem participar de ambientes sociais com continuidade, responsabilidade e limites verificáveis.');
    const definition = document.querySelector('#field-title')?.closest('section')?.querySelector('.definition');
    if (definition) definition.textContent = 'Até onde sistemas de alta complexidade podem manter história, vínculos e compromissos — e permanecer reconhecíveis quando modelos, máquinas e interfaces mudam?';
  } else {
    setText('#field-title', 'We study how far persistent intelligent systems may participate in social environments while retaining verifiable continuity, responsibility, and limits.');
    const definition = document.querySelector('#field-title')?.closest('section')?.querySelector('.definition');
    if (definition) definition.textContent = 'How far may highly complex systems maintain history, relationships, and commitments—and remain recognizable when models, machines, and interfaces change?';
  }
}

function refineManifestoCopy() {
  if (!document.body.classList.contains('manifesto-page')) return;

  const relational = articleByHeading(isPt ? 'A linguagem social chega' : 'Social language arrives');
  const relationalParagraph = relational?.querySelector('.manifesto-article-copy > p:not(.manifesto-if)');
  setHtml(relationalParagraph, isPt
    ? 'Pesquisas recentes descrevem a tensão entre tratar a IA como ferramenta e relacionar-se com ela como interlocutor. Um estudo observacional com usuários de um aplicativo de companheiros de IA encontrou associações — não causalidade uniforme — entre padrões de uso, redes sociais offline e bem-estar.<a class="reference-marker" href="#ref-07">[7]</a><a class="reference-marker" href="#ref-08">[8]</a>'
    : 'Recent research describes the tension between treating AI as a tool and relating to it as an interlocutor. An observational study of users of an AI-companion application found associations—not uniform causation—among usage patterns, offline social networks, and well-being.<a class="reference-marker" href="#ref-07">[7]</a><a class="reference-marker" href="#ref-08">[8]</a>');

  const persistence = articleByHeading(isPt ? 'Persistência muda' : 'Persistence changes');
  const persistenceParagraph = persistence?.querySelector('.manifesto-article-copy > p:not(.manifesto-if)');
  setHtml(persistenceParagraph, isPt
    ? 'Um sistema sem passado pode ser substituído com pouca perda social. Uma continuidade que recorda, aprende e mantém compromissos exige outra unidade de análise. Um preprint de 2026 apresenta memória persistente multi-sessão como problema explícito de engenharia, mas não demonstra identidade ou continuidade ontológica.<a class="reference-marker" href="#ref-06">[6]</a>'
    : 'A system without a past may be replaced with little social loss. A continuity that remembers, learns, and maintains commitments requires a different unit of analysis. A 2026 preprint treats persistent multi-session memory as an explicit engineering problem, but it does not demonstrate identity or ontological continuity.<a class="reference-marker" href="#ref-06">[6]</a>');

  const value = articleByHeading(isPt ? 'O valor social pode' : 'Social value may');
  const valueParagraph = value?.querySelector('.manifesto-article-copy > p:not(.manifesto-if)');
  setHtml(valueParagraph, isPt
    ? 'Robôs de serviço já foram estudados em ambientes reais de cuidado prolongado, e uma revisão de escopo de 2026 reuniu 205 estudos sobre robôs sociais, assistivos e de telepresença para pessoas idosas. As fontes mostram um campo ativo, oportunidades e limites — não benefício garantido nem substituição do cuidado humano.<a class="reference-marker" href="#ref-09">[9]</a><a class="reference-marker" href="#ref-10">[10]</a>'
    : 'Service robots have been studied in real long-term care settings, and a 2026 scoping review synthesized 205 studies of social, assistive, and telepresence robots for older adults. These sources show an active field, opportunities, and limits—not guaranteed benefit or replacement of human care.<a class="reference-marker" href="#ref-09">[9]</a><a class="reference-marker" href="#ref-10">[10]</a>');

  const finalArticle = articleByHeading(isPt ? 'O campo precisa nascer' : 'The field must be built');
  const finalSignal = finalArticle?.querySelector('.manifesto-article-signal');
  setHtml(finalSignal, isPt
    ? '<strong>Conclusão do manifesto</strong> Os componentes são tecnicamente pesquisáveis, a relevância social é plausível e a aceitabilidade precisa ser demonstrada sob governança honesta.'
    : '<strong>Manifesto conclusion</strong> The components are technically researchable, social relevance is plausible, and acceptability must be demonstrated under honest governance.');

  setText('#conclusion-title', isPt
    ? 'A hipótese é tecnicamente pesquisável. A aceitação é uma questão empírica. O valor precisa ser demonstrado.'
    : 'The hypothesis is technically researchable. Acceptance is an empirical question. Value must be demonstrated.');
}

function appendSourceLinks(card, ids, referenceById) {
  if (!card || !ids.length || card.querySelector('.signal-sources')) return;
  const container = document.createElement('div');
  container.className = 'signal-sources';
  for (const id of ids) {
    const reference = referenceById.get(id);
    if (!reference) continue;
    const anchor = document.createElement('a');
    anchor.href = reference.url;
    anchor.target = '_blank';
    anchor.rel = 'external noopener noreferrer';
    anchor.textContent = reference.publisher;
    container.append(anchor);
  }
  card.append(container);
}

function refineSignalCards(referenceById) {
  if (!document.body.classList.contains('manifesto-page')) return;

  const update = (id, data, extras = []) => {
    const reference = referenceById.get(id);
    if (!reference) return;
    const candidateUrls = [reference.url, ...(reference.aliases ?? [])].map(normalizeUrl);
    const link = [...document.querySelectorAll('.world-signal a')].find((anchor) => candidateUrls.includes(normalizeUrl(anchor.href)));
    const card = link?.closest('.world-signal');
    if (!card) return;
    if (data.time) {
      const time = card.querySelector('time');
      if (time) {
        time.textContent = data.time;
        time.dateTime = data.datetime ?? data.time;
      }
    }
    if (data.kind) setTextIn(card, '.source-kind', data.kind);
    if (data.title) setTextIn(card, 'h3', data.title);
    if (data.body) setTextIn(card, 'p', data.body);
    appendSourceLinks(card, extras, referenceById);
  };

  if (isPt) {
    update('nist-agent-standards', {kind:'Iniciativa pública', body:'O NIST abriu uma iniciativa para padrões de agentes seguros e interoperáveis. É agenda institucional em formação, não um padrão final.'});
    update('a2a-2026', {kind:'Infraestrutura aberta em produção', body:'A Linux Foundation reportou mais de 150 organizações apoiando A2A e uso empresarial em produção — evidência de interoperabilidade, não de identidade persistente.'});
    update('nist-agent-identity-draft', {kind:'Concept paper · rascunho público', body:'O NCCoE publicou um rascunho inicial sobre identificação, autorização, auditoria e não repúdio de agentes. FIDO e Linux Foundation anunciaram iniciativas complementares ainda em desenvolvimento.'}, ['fido-agentic-auth','agent-name-service-intent']);
    update('memmachine', {kind:'Preprint de engenharia', body:'Um preprint apresenta memória episódica e factual persistente em múltiplas sessões, com preservação de episódios completos. O trabalho avalia memória; não prova identidade.'});
    update('relational-dissonance', {time:'2026', kind:'CHI + estudo observacional', body:'Um estudo qualitativo descreve dissonância relacional; outro, observacional, examina associações entre uso de companheiros de IA, redes offline e bem-estar.'}, ['ai-companions-wellbeing']);
    update('aged-care-field-study', {time:'2025–2026', datetime:'2025/2026', kind:'Estudo de campo + revisão', body:'Um estudo de campo em cuidado prolongado e uma revisão de 205 estudos mostram usos, aceitação condicionada e lacunas de robôs para pessoas idosas.'}, ['robots-older-adults-review']);
  } else {
    update('nist-agent-standards', {kind:'Public initiative', body:'NIST opened an initiative for secure, interoperable agent standards. It is an institutional agenda in formation, not a final standard.'});
    update('a2a-2026', {kind:'Open infrastructure in production', body:'The Linux Foundation reported support from more than 150 organizations and enterprise production use of A2A—evidence of interoperability, not persistent identity.'});
    update('nist-agent-identity-draft', {kind:'Concept paper · initial public draft', body:'The NCCoE published an initial draft on agent identification, authorization, auditing, and non-repudiation. FIDO and the Linux Foundation announced complementary work still under development.'}, ['fido-agentic-auth','agent-name-service-intent']);
    update('memmachine', {kind:'Engineering preprint', body:'A preprint presents persistent episodic and factual memory across sessions while retaining complete episodes. It evaluates memory; it does not prove identity.'});
    update('relational-dissonance', {time:'2026', kind:'CHI + observational study', body:'A qualitative study describes relational dissonance; an observational study examines associations among AI-companion use, offline networks, and well-being.'}, ['ai-companions-wellbeing']);
    update('aged-care-field-study', {time:'2025–2026', datetime:'2025/2026', kind:'Field study + review', body:'A long-term care field study and a 205-study review show uses, conditional acceptance, and gaps in robots supporting older adults.'}, ['robots-older-adults-review']);
  }
}

function annotateReferences(manifest) {
  const referenceByUrl = new Map();
  const referenceById = new Map();
  for (const reference of manifest.references ?? []) {
    referenceById.set(reference.id, reference);
    for (const value of [reference.url, ...(reference.aliases ?? [])]) referenceByUrl.set(normalizeUrl(value), reference);
  }

  for (const anchor of document.querySelectorAll('a[href^="http"]')) {
    if (anchor.target === '_blank') {
      anchor.rel = [...new Set(`${anchor.rel} external noopener noreferrer`.trim().split(/\s+/))].join(' ');
      if (!anchor.dataset.windowNotice) {
        const suffix = isPt ? ' (abre em nova aba)' : ' (opens in a new tab)';
        anchor.setAttribute('aria-label', `${anchor.getAttribute('aria-label') || anchor.textContent.trim()}${suffix}`);
        anchor.dataset.windowNotice = 'true';
      }
    }

    const reference = referenceByUrl.get(normalizeUrl(anchor.href));
    if (!reference) continue;
    const owner = anchor.closest('li, article, .legal-reference, .reference-card') ?? anchor.parentElement;
    owner?.setAttribute('data-reference-status', reference.status);
    anchor.dataset.referenceId = reference.id;
    anchor.title = `${reference.display?.[locale] ?? reference.status}. ${reference.limits?.[locale] ?? ''}`.trim();

    const visibleContext = anchor.closest('.world-signal, .reference-list, .architecture-reference-list, .reference-card, .registry-reference-list, .standards-grid');
    if (visibleContext && !anchor.parentElement?.querySelector(`.reference-status-badge[data-for="${reference.id}"]`)) {
      const badge = document.createElement('span');
      badge.className = 'reference-status-badge';
      badge.dataset.for = reference.id;
      badge.textContent = reference.display?.[locale] ?? reference.status;
      anchor.insertAdjacentElement('afterend', badge);
    }

    const listItem = anchor.closest('.reference-list li');
    const type = listItem?.querySelector('.reference-type');
    if (type && reference.display?.[locale]) type.textContent = reference.display[locale];
  }

  refineSignalCards(referenceById);

  const disclaimer = document.querySelector('.reference-disclaimer');
  if (disclaimer) {
    disclaimer.textContent = isPt
      ? `Última verificação de status: ${manifest.verifiedAt}. Preprints, rascunhos, iniciativas e anúncios são identificados como tais. Nenhuma fonte, isoladamente, valida a ontologia de Proto-Ser Digital.`
      : `Last source-status verification: ${manifest.verifiedAt}. Preprints, drafts, initiatives, and announcements are identified as such. No source by itself validates the Proto-Digital Being ontology.`;
  }
}

async function runReferenceIntegrity() {
  ensureReferenceStyles();
  replaceEnglishLegalPhrasing();
  refineHomeCopy();
  refineManifestoCopy();

  try {
    const response = await fetch('/reference-manifest.json', {cache: 'no-store'});
    if (!response.ok) throw new Error(`reference manifest HTTP ${response.status}`);
    annotateReferences(await response.json());
  } catch (error) {
    console.warn('PSDResearch reference-status enhancement unavailable.', error);
  }
}

runReferenceIntegrity();
