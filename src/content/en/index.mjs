import home from "./home.mjs";
import foundations from "./foundations.mjs";
import architecture from "./architecture.mjs";
import registry from "./registry.mjs";
import research from "./research.mjs";
import governance from "./governance.mjs";
import about from "./about.mjs";

const catalog = {
  "locale": "en",
  "languageName": "English",
  "siteSubtitle": "Research on Proto-Digital Beings",
  "navigationLabel": "Primary navigation",
  "menuLabel": "Open navigation",
  "skipLabel": "Skip to content",
  "languageSwitchLabel": "Leia esta página em português",
  "footer": {
    "state": "Public foundation candidate · version 0.2",
    "disclaimer": "Research program. It does not constitute proof of consciousness, sentience, life, or legal personhood.",
    "repository": "Repository and governance"
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
