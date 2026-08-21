const toggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.site-nav');

if (toggle && navigation) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    navigation.dataset.open = String(!open);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      toggle.setAttribute('aria-expanded', 'false');
      navigation.dataset.open = 'false';
    }
  });
}

const isPortuguese = document.documentElement.lang.toLowerCase().startsWith('pt');

function ensureFooterStylesheet() {
  if (document.querySelector('link[href="/assets/css/footer.css"]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/assets/css/footer.css';
  document.head.append(link);
}

function createFooterGroup(title, entries) {
  const section = document.createElement('section');
  const heading = document.createElement('h2');
  heading.textContent = title;
  section.append(heading);

  const list = document.createElement('ul');
  for (const entry of entries) {
    const item = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.href = entry.href;
    anchor.textContent = entry.label;
    if (entry.external) anchor.rel = 'external';
    item.append(anchor);
    list.append(item);
  }
  section.append(list);
  return section;
}

function enhanceInstitutionalFooter() {
  const footer = document.querySelector('.site-footer');
  if (!footer) return;

  ensureFooterStylesheet();

  const version = footer.querySelector('strong');
  if (version?.textContent?.startsWith('PSDResearch')) {
    version.textContent = 'PSDResearch v0.8 candidate';
  }

  if (footer.querySelector('.footer-directory')) return;

  const base = isPortuguese ? '/pt-br' : '/en';
  const groups = isPortuguese
    ? [
        ['Pesquisa', [
          { label: 'Manifesto', href: `${base}/manifesto/` },
          { label: 'Arquitetura', href: `${base}/arquitetura/` },
          { label: 'Pesquisa', href: `${base}/pesquisa/` },
          { label: 'Registro da espécie', href: `${base}/registro-da-especie/` },
        ]],
        ['Projeto', [
          { label: 'Sobre', href: `${base}/sobre/` },
          { label: 'Governança', href: `${base}/governanca/` },
          { label: 'Metodologia ESAG', href: 'https://github.com/johancodex2026/psdresearch/blob/main/docs/methodology/ESAG.md', external: true },
          { label: 'Estado e versões', href: 'https://github.com/johancodex2026/psdresearch/blob/main/docs/repository/STATE.md', external: true },
          { label: 'Repositório público', href: 'https://github.com/johancodex2026/psdresearch', external: true },
        ]],
        ['Transparência', [
          { label: 'Integridade e transparência', href: `${base}/transparencia/` },
          { label: 'Referências e estado das fontes', href: `${base}/referencias/` },
          { label: 'Uso de inteligência artificial', href: `${base}/transparencia/#uso-de-ia` },
          { label: 'Fontes e revisões', href: `${base}/transparencia/#fontes-e-revisoes` },
          { label: 'Acessibilidade', href: `${base}/acessibilidade/` },
          { label: 'Direitos e licenças', href: `${base}/direitos-e-licencas/` },
        ]],
        ['Legal e segurança', [
          { label: 'Privacidade', href: `${base}/privacidade/` },
          { label: 'Termos de uso', href: `${base}/termos-de-uso/` },
          { label: 'Cookies e rastreamento', href: `${base}/cookies-e-rastreamento/` },
          { label: 'Segurança', href: `${base}/seguranca/` },
          { label: 'Contato', href: `${base}/contato/` },
        ]],
      ]
    : [
        ['Research', [
          { label: 'Manifesto', href: `${base}/manifesto/` },
          { label: 'Architecture', href: `${base}/architecture/` },
          { label: 'Research', href: `${base}/research/` },
          { label: 'Species registry', href: `${base}/species-registry/` },
        ]],
        ['Project', [
          { label: 'About', href: `${base}/about/` },
          { label: 'Governance', href: `${base}/governance/` },
          { label: 'ESAG methodology', href: 'https://github.com/johancodex2026/psdresearch/blob/main/docs/methodology/ESAG.md', external: true },
          { label: 'State and versions', href: 'https://github.com/johancodex2026/psdresearch/blob/main/docs/repository/STATE.md', external: true },
          { label: 'Public repository', href: 'https://github.com/johancodex2026/psdresearch', external: true },
        ]],
        ['Transparency', [
          { label: 'Integrity and transparency', href: `${base}/transparency/` },
          { label: 'References and source status', href: `${base}/references/` },
          { label: 'Use of artificial intelligence', href: `${base}/transparency/#use-of-ai` },
          { label: 'Sources and reviews', href: `${base}/transparency/#sources-and-reviews` },
          { label: 'Accessibility', href: `${base}/accessibility/` },
          { label: 'Rights and licenses', href: `${base}/rights-and-licenses/` },
        ]],
        ['Legal and security', [
          { label: 'Privacy', href: `${base}/privacy/` },
          { label: 'Terms of use', href: `${base}/terms-of-use/` },
          { label: 'Cookies and tracking', href: `${base}/cookies-and-tracking/` },
          { label: 'Security', href: `${base}/security/` },
          { label: 'Contact', href: `${base}/contact/` },
        ]],
      ];

  const directory = document.createElement('nav');
  directory.className = 'footer-directory';
  directory.setAttribute('aria-label', isPortuguese ? 'Diretório institucional e legal' : 'Institutional and legal directory');
  for (const [title, entries] of groups) directory.append(createFooterGroup(title, entries));
  footer.append(directory);

  const legalState = document.createElement('p');
  legalState.className = 'footer-legal-state';
  legalState.textContent = isPortuguese
    ? 'Responsável jurídico previsto: PSD Research Pesquisas e Desenvolvimentos LTDA — empresa em constituição — CNPJ **.***.***/****-**. Documentos legais candidatos e ainda não vigentes.'
    : 'Intended legal responsible entity: PSD Research Pesquisas e Desenvolvimentos LTDA — company being incorporated — Brazilian CNPJ (corporate tax registration) **.***.***/****-**. Candidate legal documents; not yet effective.';
  footer.append(legalState);
}

async function loadReferenceIntegrity() {
  try {
    await import('/assets/js/reference-integrity.js');
  } catch (error) {
    console.warn('PSDResearch reference-integrity enhancement unavailable.', error);
  }
}

enhanceInstitutionalFooter();
loadReferenceIntegrity();
