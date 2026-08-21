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
const architectureHref = isPortuguese ? '/pt-br/arquitetura/' : '/en/architecture/';
const architectureLabel = isPortuguese ? 'Arquitetura' : 'Architecture';

// Keep legacy candidate pages connected to the newly published Architecture route
// without duplicating links on pages that already include it statically.
if (navigation && !navigation.querySelector(`a[href="${architectureHref}"]`)) {
  const manifestoLink = navigation.querySelector('a[href*="/manifesto/"]');
  const architectureLink = document.createElement('a');
  architectureLink.href = architectureHref;
  architectureLink.textContent = architectureLabel;

  if (manifestoLink) {
    manifestoLink.insertAdjacentElement('afterend', architectureLink);
  } else {
    navigation.append(architectureLink);
  }
}

const forthcomingArchitecture = document.querySelector('.reading-step.forthcoming');
if (forthcomingArchitecture) {
  const architectureLink = document.createElement('a');
  architectureLink.href = architectureHref;
  architectureLink.innerHTML = forthcomingArchitecture.innerHTML;
  const description = architectureLink.querySelector('small');
  if (description) {
    description.textContent = isPortuguese
      ? 'Camadas, provas e critérios de validação.'
      : 'Layers, evidence, and validation criteria.';
  }
  forthcomingArchitecture.replaceWith(architectureLink);
}

const nextArchitecture = document.querySelector('.next-artifact');
if (nextArchitecture && !(nextArchitecture instanceof HTMLAnchorElement)) {
  const architectureLink = document.createElement('a');
  architectureLink.className = nextArchitecture.className;
  architectureLink.href = architectureHref;
  architectureLink.innerHTML = isPortuguese
    ? 'Continuar para Arquitetura <span aria-hidden="true">→</span>'
    : 'Continue to Architecture <span aria-hidden="true">→</span>';
  nextArchitecture.replaceWith(architectureLink);
}
