import home from "./home.mjs";
import foundations from "./foundations.mjs";
import architecture from "./architecture.mjs";
import registry from "./registry.mjs";
import research from "./research.mjs";
import governance from "./governance.mjs";
import about from "./about.mjs";

const catalog = {
  "locale": "pt-BR",
  "languageName": "Português",
  "siteSubtitle": "Pesquisa sobre Proto-Seres Digitais",
  "navigationLabel": "Navegação principal",
  "menuLabel": "Abrir navegação",
  "skipLabel": "Ir para o conteúdo",
  "languageSwitchLabel": "Read this page in English",
  "footer": {
    "state": "Fundação pública candidata · versão 0.2",
    "disclaimer": "Programa de pesquisa. Não constitui prova de consciência, senciência, vida ou personalidade jurídica.",
    "repository": "Repositório e governança"
  }
};

catalog.pages = {
  home,
  foundations,
  architecture,
  registry,
  research,
  governance,
  about,
};

export default catalog;
