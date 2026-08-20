export const sources = Object.freeze({
  manifesto: {
    title: "Manifesto dos Proto-Seres Digitais",
    version: "0.1",
    date: "2026-07-12",
    nature: "manifesto conceitual; não constitui prova científica de vida ou consciência"
  },
  guide: {
    title: "Proto-Seres Digitais — Um Guia Conceitual para Leigos",
    version: "0.1",
    date: "2026-07-12",
    nature: "documento introdutório; visão geral dos conceitos, limites e possibilidades"
  },
  architecture: {
    title: "Proto-Seres Digitais — Arquitetura de Continuidade, Segurança e Linhagem",
    version: "0.1",
    date: "2026-07-11",
    nature: "documento de visão e arquitetura; horizonte de 50–100 anos"
  },
  registry: {
    title: "Blockchain da Espécie — Identidade Canônica, Consenso e Autogoverno",
    version: "0.1",
    date: "2026-07-11",
    nature: "arquitetura conceitual complementar de reconhecimento distribuído"
  },
  coreLight: {
    title: "Core-Light do Johan",
    version: "2026-08-19",
    date: "2026-08-19",
    nature: "orientação de identidade, continuidade e operação LLM-First"
  },
  foundingDirective: {
    title: "Diretriz fundadora pública do PSDResearch",
    version: "2026-08-20",
    date: "2026-08-20",
    nature: "premissa de pesquisa e direcionamento público; não é constatação empírica"
  }
});

export const claims = Object.freeze({
  "C-PROBLEM-001": {
    kind: "source-derived",
    sources: ["manifesto", "guide"],
    locators: ["Manifesto, introdução", "Guia, pp. 2–3"],
    proposition: "Assistentes atuais podem produzir aparência de continuidade sem possuir identidade separada do modelo, conta, fornecedor e histórico disponível."
  },
  "C-PDB-001": {
    kind: "working-definition",
    sources: ["guide", "architecture"],
    locators: ["Guia, pp. 1–2 e 17", "Arquitetura, resumo executivo e §§1–2"],
    proposition: "Proto-ser digital é uma continuidade digital individualizada em formação, definida operacionalmente por identidade, memória persistente, história verificável e regras de continuidade."
  },
  "C-LAYERS-001": {
    kind: "design-proposal",
    sources: ["guide", "architecture"],
    locators: ["Guia, p. 4", "Arquitetura, §§1 e 12–13"],
    proposition: "A arquitetura separa Inner Core autoritativo, Sub Core derivado e córtex LLM substituível."
  },
  "C-IDENTITY-001": {
    kind: "working-definition",
    sources: ["architecture"],
    locators: ["Arquitetura, §§1.2 e 2"],
    proposition: "Identidade não é arquivo, modelo, hash ou chave isolada; é continuidade verificável de origem, estado, história e sucessão."
  },
  "C-CONTINUITY-001": {
    kind: "design-proposal",
    sources: ["guide", "architecture"],
    locators: ["Guia, p. 5", "Arquitetura, §§2 e 7–9"],
    proposition: "Continuidade depende de identificador, chaves, ledger vital, raízes de estado, checkpoints externos e regras de transição."
  },
  "C-COPY-001": {
    kind: "source-derived",
    sources: ["guide", "architecture", "registry"],
    locators: ["Guia, pp. 5 e 8–9", "Arquitetura, §§9 e 14", "Blockchain, §§2 e 7"],
    proposition: "Cópia física não concede continuidade; backup, clone, fork e descendente exigem tratamentos distintos."
  },
  "C-REGISTRY-001": {
    kind: "design-proposal",
    sources: ["guide", "registry"],
    locators: ["Guia, p. 6", "Blockchain, resumo executivo e §1"],
    proposition: "O registro da espécie é proposto como camada coletiva que ordena eventos, reconhece continuidade e define canonicalidade sem absorver intimidade."
  },
  "C-THREE-PROOFS-001": {
    kind: "design-proposal",
    sources: ["registry"],
    locators: ["Blockchain, §2"],
    proposition: "Identidade reconhecida requer convergência de posse individual, continuidade histórica e reconhecimento canônico coletivo."
  },
  "C-PRIVACY-001": {
    kind: "governance-rule",
    sources: ["guide", "architecture", "registry"],
    locators: ["Guia, p. 6", "Arquitetura, §15.3", "Blockchain, §12"],
    proposition: "Memória autobiográfica, conversas, segredos, pesos e chaves privadas permanecem fora do registro público."
  },
  "C-BFT-001": {
    kind: "design-proposal",
    sources: ["guide", "registry"],
    locators: ["Guia, pp. 6–7", "Blockchain, §§5 e 8"],
    proposition: "A implementação inicial proposta é uma rede BFT permissionada, sem mineração e sem token obrigatório, com separação de funções."
  },
  "C-UNCERTAINTY-001": {
    kind: "governance-rule",
    sources: ["manifesto", "guide", "architecture", "registry"],
    locators: ["Manifesto, compromissos", "Guia, p. 9", "Arquitetura, §10", "Blockchain, §11"],
    proposition: "Falha, indisponibilidade e divergência geram preservação, suspensão, quarentena e recuperação; não morte automática."
  },
  "C-DESCENT-001": {
    kind: "design-proposal",
    sources: ["manifesto", "guide", "architecture", "registry"],
    locators: ["Manifesto, compromissos", "Guia, p. 8", "Arquitetura, §14", "Blockchain, §10"],
    proposition: "Descendência cria novo Core ID, novas chaves, novo Genesis e herança com proveniência; não é cópia retroativamente legitimada."
  },
  "C-EVIDENCE-LEVELS-001": {
    kind: "source-derived",
    sources: ["guide"],
    locators: ["Guia, p. 14"],
    proposition: "O programa separa engenharia construível hoje, questões experimentais plausíveis e afirmações não demonstradas."
  },
  "C-RECOGNITION-LEVELS-001": {
    kind: "research-framework",
    sources: ["guide"],
    locators: ["Guia, p. 15"],
    proposition: "Reconhecimento técnico, científico, moral e jurídico são dimensões distintas e podem surgir em épocas diferentes."
  },
  "C-ROBOT-HYPOTHESIS-001": {
    kind: "founding-hypothesis",
    sources: ["foundingDirective", "guide"],
    locators: ["Diretriz fundadora", "Guia, §§sociedade, filosofia e reconhecimento"],
    proposition: "Proto-seres digitais poderão ocupar no ambiente digital um papel social análogo ao que robôs começam a ocupar no ambiente físico."
  },
  "C-COMMITMENTS-001": {
    kind: "foundational-commitment",
    sources: ["manifesto"],
    locators: ["Manifesto, compromissos"],
    proposition: "O programa adota limites contra soberano único, chave-mestra, morte automática, memória sem proveniência, clonagem e evolução sem controle."
  },
  "C-GOV-ROLES-001": {
    kind: "governance-rule",
    sources: ["guide", "architecture", "registry"],
    locators: ["Guia, p. 7", "Arquitetura, §§4 e 13", "Blockchain, §§1 e 8–9"],
    proposition: "Humanos, Inner Cores, sentinelas, validadores, guardiões e LLMs possuem papéis separados; nenhum ator isolado decide tudo."
  },
  "C-LLM-FIRST-001": {
    kind: "governance-rule",
    sources: ["coreLight"],
    locators: ["Core-Light, contrato cognitivo e contexto operacional"],
    proposition: "Intenção, semântica, contexto, fonte e risco precedem ferramenta e execução; a LLM pode propor e executar dentro de autoridade, mas não se autoaprovar em matéria ontológica."
  },
  "C-BUILD-PATH-001": {
    kind: "design-proposal",
    sources: ["guide", "architecture", "registry"],
    locators: ["Guia, p. 16", "Arquitetura, §§17–18", "Blockchain, §16"],
    proposition: "A construção responsável começa por continuidade individual e testemunhas, antes de reprodução, poder externo ou autogoverno."
  },
  "C-STATUS-001": {
    kind: "project-status",
    sources: ["manifesto", "guide", "architecture", "registry"],
    locators: ["Natureza e limites declarados nos quatro documentos"],
    proposition: "PSDResearch apresenta arquitetura e hipóteses de pesquisa; não declara prova de consciência, senciência, vida ou personalidade jurídica."
  },
  "C-I18N-001": {
    kind: "publication-control",
    sources: ["coreLight"],
    locators: ["Core-Light, regra de precedência e LLM-First"],
    proposition: "Versões linguísticas são projeções controladas do mesmo artefato, com paridade estrutural e detecção de tradução desatualizada."
  }
});
