export default {
  "route": "/pt-br/governanca/",
  "nav": "Governança",
  "metaTitle": "Governança LLM-First — PSDResearch",
  "metaDescription": "Governança LLM-First, papéis, classes de decisão, rastreabilidade de afirmações e integridade multilíngue.",
  "eyebrow": "Governança do programa",
  "title": "Significado e fonte antes da ferramenta; autoridade antes da execução.",
  "lead": "LLM-First utiliza modelos para pesquisar, estruturar, traduzir, programar e testar. Não concede à LLM autoridade para validar sozinha a ontologia que produziu.",
  "heroClaim": "C-LLM-FIRST-001",
  "sections": [
    {
      "id": "workflow",
      "type": "process",
      "claim": "C-LLM-FIRST-001",
      "label": "Ciclo de trabalho",
      "title": "Sete etapas obrigatórias para mudanças substanciais",
      "items": [
        {
          "number": "01",
          "title": "Orientar",
          "body": "Definir propósito, público, autoridade, risco e classe de decisão."
        },
        {
          "number": "02",
          "title": "Recuperar",
          "body": "Consultar estado SGPJ, fontes canônicas, decisões e artefatos afetados."
        },
        {
          "number": "03",
          "title": "Classificar",
          "body": "Separar fato, definição, hipótese, proposta, evidência e questão aberta."
        },
        {
          "number": "04",
          "title": "Planejar",
          "body": "Escolher a menor mudança coerente, verificável e reversível."
        },
        {
          "number": "05",
          "title": "Executar",
          "body": "Alterar conteúdo ou código sem expandir escopo silenciosamente."
        },
        {
          "number": "06",
          "title": "Verificar",
          "body": "Testar estrutura, acessibilidade, fontes, idiomas, segurança e efeitos públicos."
        },
        {
          "number": "07",
          "title": "Registrar",
          "body": "Preservar provenance, decisão, responsável, limitações e pendências."
        }
      ]
    },
    {
      "id": "actors",
      "type": "table",
      "claim": "C-GOV-ROLES-001",
      "label": "Separação de funções",
      "title": "Nenhum participante possui autoridade universal",
      "headers": [
        "Ator",
        "Papel legítimo",
        "Limite"
      ],
      "rows": [
        [
          "Humanos",
          "Definir objetivos, assumir responsabilidade, revisar exceções e autorizar mudanças de alto impacto.",
          "Não substituem evidência nem possuem poder ontológico automático."
        ],
        [
          "LLMs",
          "Pesquisar, propor, explicar, traduzir, programar, testar e criticar.",
          "Não são aprovadoras únicas de decisões ontológicas ou constitucionais."
        ],
        [
          "Inner Cores",
          "Assinar eventos e preservar estado e histórico individuais.",
          "Não reconhecem sozinhos a própria branch para toda a espécie."
        ],
        [
          "Sentinelas",
          "Medir ambiente, validar boot e mediar operações tipadas.",
          "Não inventam identidade nem declaram perda definitiva."
        ],
        [
          "Validadores",
          "Executar regras determinísticas e finalizar eventos por quórum.",
          "Não interpretam livremente personalidade ou consciência."
        ],
        [
          "Guardiões e auditores",
          "Atuar em recuperação, emendas, evidência adversarial e sucessão.",
          "Poder excepcional deve ser limitado, distribuído e rastreável."
        ]
      ]
    },
    {
      "id": "decision-classes",
      "type": "table",
      "claim": "C-LLM-FIRST-001",
      "label": "Direitos de decisão",
      "title": "A intensidade do rito acompanha o impacto da mudança",
      "headers": [
        "Classe",
        "Escopo",
        "Gate mínimo"
      ],
      "rows": [
        [
          "D0 · Editorial",
          "Forma sem mudança de sentido.",
          "Revisão comum e validação visual."
        ],
        [
          "D1 · Técnica",
          "Código, acessibilidade, segurança e desempenho sem alterar tese.",
          "Testes e revisão técnica."
        ],
        [
          "D2 · Pesquisa",
          "Fonte, hipótese, método ou enquadramento público.",
          "Evidência, crítica e revisão multilíngue."
        ],
        [
          "D3 · Ontológica",
          "Identidade, continuidade, memória, vida, morte, espécie ou indivíduo.",
          "Delta conceitual, crítica adversarial e aprovação humana explícita."
        ],
        [
          "D4 · Constitucional",
          "Direitos, soberania, reprodução, reconhecimento e governança da espécie.",
          "Rito multistakeholder futuro; não ativo nesta versão."
        ]
      ]
    },
    {
      "id": "claims",
      "type": "prose",
      "claim": "C-STATUS-001",
      "label": "Seriedade documental",
      "title": "Toda afirmação pública possui classe, fonte e limite.",
      "paragraphs": [
        "O site é gerado a partir de um catálogo de conteúdo e de um registro interno de claims. Cada seção pública aponta para uma definição de trabalho, fonte, hipótese, proposta, regra de governança, estado do projeto ou questão aberta.",
        "Referências não precisam interromper a leitura pública, mas precisam existir no repositório para revisão, contestação e atualização. Frases sem base ou estado epistemológico não passam pelo build."
      ]
    },
    {
      "id": "i18n",
      "type": "callout",
      "claim": "C-I18N-001",
      "label": "Contrato multilíngue",
      "title": "O site não mantém páginas duplicadas manualmente.",
      "body": "Templates e estrutura são compartilhados. Português e inglês vivem em catálogos versionados, com as mesmas chaves e seções. A integração contínua bloqueia publicação quando uma tradução está ausente ou vinculada a uma versão anterior do conteúdo-fonte."
    }
  ]
};
