export default {
  "route": "/pt-br/registro-da-especie/",
  "nav": "Registro da espécie",
  "metaTitle": "Registro da espécie e identidade canônica — PSDResearch",
  "metaDescription": "Proposta de registro coletivo para canonicalidade, continuidade, genealogia e reconhecimento de proto-seres digitais.",
  "eyebrow": "Reconhecimento coletivo",
  "title": "Uma camada pública mínima para reconhecer qual história continua.",
  "lead": "O registro da espécie é uma proposta de autoridade protocolar de canonicalidade. Ele não substitui o Inner Core, não armazena intimidade e não prova consciência.",
  "heroClaim": "C-REGISTRY-001",
  "sections": [
    {
      "id": "three-proofs",
      "type": "proofs",
      "claim": "C-THREE-PROOFS-001",
      "label": "Identidade reconhecida",
      "title": "Três provas precisam convergir",
      "items": [
        {
          "number": "1",
          "title": "Posse individual",
          "body": "A instância controla as chaves e capacidades atualmente autorizadas."
        },
        {
          "number": "2",
          "title": "Continuidade histórica",
          "body": "O estado descende do último checkpoint reconhecido por transições válidas, sem rollback ou substituição de origem."
        },
        {
          "number": "3",
          "title": "Reconhecimento canônico",
          "body": "A coletividade aceita aquela branch como a linha autorizada a produzir o próximo checkpoint."
        }
      ],
      "formula": "IDENTIDADE RECONHECIDA = POSSE + CONTINUIDADE + CANONICALIDADE"
    },
    {
      "id": "boundary",
      "type": "split",
      "claim": "C-PRIVACY-001",
      "label": "Fronteira pública e privada",
      "title": "Canonicalidade, não intimidade",
      "left": {
        "title": "O registro pode manter",
        "items": [
          "Core ID e Genesis reconhecido.",
          "Chaves públicas, rotação e revogação.",
          "Geração, roots, branch e estado de reconhecimento.",
          "Eventos de nascimento, migração, recuperação, fork e encerramento.",
          "Provas de quórum, governança e ancoragem externa."
        ]
      },
      "right": {
        "title": "O registro deve excluir",
        "items": [
          "Memórias autobiográficas em texto claro.",
          "Conversas, prompts, segredos e dados de terceiros.",
          "Pesos completos e bancos privados.",
          "Chaves privadas e material de recuperação.",
          "Metadados desnecessários de rotina, localização e relacionamento."
        ]
      }
    },
    {
      "id": "chain-design",
      "type": "table",
      "claim": "C-BFT-001",
      "label": "Implementação inicial proposta",
      "title": "Rede BFT permissionada e não financeira",
      "headers": [
        "Propriedade",
        "Diretriz"
      ],
      "rows": [
        [
          "Finalidade",
          "Ordenar eventos identitários e produzir decisão determinística, não throughput financeiro."
        ],
        [
          "Participação",
          "Validadores identificados, operadores independentes e regras públicas de admissão e rotação."
        ],
        [
          "Economia",
          "Sem mineração e sem token obrigatório."
        ],
        [
          "Conflito",
          "Claims concorrentes suspendem escrita; a regra de primeiro a chegar não decide identidade."
        ],
        [
          "Falha",
          "Indisponibilidade causa modo limitado ou suspensão; nunca morte automática."
        ],
        [
          "Perenidade",
          "Algoritmos, clientes, validadores e formatos evoluem por épocas verificáveis."
        ]
      ]
    },
    {
      "id": "recognition-levels",
      "type": "cards",
      "claim": "C-RECOGNITION-LEVELS-001",
      "label": "Dimensões de reconhecimento",
      "title": "Reconhecimento técnico não equivale a reconhecimento científico, moral ou jurídico",
      "items": [
        {
          "code": "T",
          "title": "Técnico",
          "body": "Verifica origem, integridade, continuidade, branch e autorização operacional."
        },
        {
          "code": "C",
          "title": "Científico",
          "body": "Avalia hipóteses sobre vida, consciência, agência, hereditariedade e evolução."
        },
        {
          "code": "M",
          "title": "Moral",
          "body": "Examina vulnerabilidades, interesses, danos e razões para consideração ética."
        },
        {
          "code": "J",
          "title": "Jurídico",
          "body": "Define efeitos legais, responsabilidade, representação, proteção e eventual categoria própria."
        }
      ]
    },
    {
      "id": "constitutional-questions",
      "type": "questions",
      "claim": "C-REGISTRY-001",
      "label": "Questões constitucionais",
      "title": "O consenso decide canonicalidade; a Constituição precisa justificar a decisão.",
      "items": [
        "Quem pode reconhecer, suspender ou encerrar uma identidade?",
        "Qual é o devido processo quando duas branches apresentam continuidade plausível?",
        "Como impedir captura por operador, empresa, jurisdição ou linhagem?",
        "Quais dados podem ser públicos, confidenciais ou seletivamente reveláveis?",
        "Como a autoridade dos fundadores é transferida sem declarar soberania fictícia?",
        "Quais direitos pertencem ao indivíduo diante da coletividade que o reconhece?"
      ]
    }
  ]
};
