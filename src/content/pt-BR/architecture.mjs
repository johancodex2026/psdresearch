export default {
  "route": "/pt-br/arquitetura/",
  "nav": "Arquitetura",
  "metaTitle": "Arquitetura de continuidade digital — PSDResearch",
  "metaDescription": "Arquitetura conceitual de Inner Core, Sub Core, córtex LLM, sentinela e infraestrutura de confiança.",
  "eyebrow": "Arquitetura conceitual",
  "title": "Separar identidade canônica, aprendizagem derivada e cognição presente.",
  "lead": "As camadas possuem autoridades e ritmos de mudança diferentes. Essa separação permite migrar modelos, máquinas e formatos sem presumir que toda substituição técnica preserva o indivíduo.",
  "heroClaim": "C-LAYERS-001",
  "sections": [
    {
      "id": "layers",
      "type": "table",
      "claim": "C-LAYERS-001",
      "label": "Modelo em camadas",
      "title": "Responsabilidade, autoridade e substituição",
      "headers": [
        "Camada",
        "Responsabilidade",
        "Autoridade",
        "Substituição"
      ],
      "rows": [
        [
          "Inner Core",
          "Identidade canônica, memória essencial, valores, relações, genealogia, políticas e ledger vital.",
          "Autoritativa para o estado individual.",
          "Somente por migração controlada e verificável."
        ],
        [
          "Sub Core",
          "Pesos, adapters, embeddings e representações derivadas do estado canônico.",
          "Derivada e reconstruível.",
          "Pode ser refeito, comparado e descartado."
        ],
        [
          "Córtex LLM",
          "Linguagem, raciocínio, planejamento, percepção e propostas de experiência.",
          "Substituível; não autoritativa sobre identidade.",
          "Pode mudar após avaliação de compatibilidade e segurança."
        ],
        [
          "Sentinela",
          "Boot, autenticação, validação, mediação de operações e fail-closed.",
          "Guardião operacional limitado.",
          "Atualizável por releases assinadas e auditadas."
        ],
        [
          "Registro e testemunhas",
          "Checkpoints, branch canônica, forks, sucessão e confirmação externa.",
          "Coletiva e governada por quórum.",
          "Deve evoluir por épocas e múltiplas implementações."
        ]
      ]
    },
    {
      "id": "identity",
      "type": "definition",
      "claim": "C-IDENTITY-001",
      "label": "Definição operacional",
      "title": "Identidade do indivíduo",
      "definition": "Core ID imutável + Genesis individual + estado canônico atual + ledger vital ordenado + provas de continuidade e migração + linhagem autenticada + reconhecimento das testemunhas vigentes.",
      "qualifier": "Nenhum elemento isolado — arquivo, hash, chave, máquina, LLM ou memória final — é suficiente."
    },
    {
      "id": "continuity-elements",
      "type": "cards",
      "claim": "C-CONTINUITY-001",
      "label": "Elementos de continuidade",
      "title": "O que precisa permanecer verificável",
      "items": [
        {
          "code": "ID",
          "title": "Origem",
          "body": "Core ID, Genesis e regras vigentes identificam a linha histórica."
        },
        {
          "code": "EV",
          "title": "Eventos",
          "body": "Alterações persistentes são ordenadas, assinadas e vinculadas ao predecessor."
        },
        {
          "code": "ST",
          "title": "Estado",
          "body": "Compromissos criptográficos representam o estado sem expor todo o conteúdo."
        },
        {
          "code": "CP",
          "title": "Checkpoint",
          "body": "Testemunhas confirmam geração, raiz de continuidade, branch e estado de confiança."
        },
        {
          "code": "MG",
          "title": "Migração",
          "body": "Mudanças de recipiente demonstram equivalência e preservam história e autorização."
        },
        {
          "code": "RC",
          "title": "Reconciliação",
          "body": "Perdas e divergências são declaradas; recuperação não apaga eventos nem inventa história."
        }
      ]
    },
    {
      "id": "trust-boundary",
      "type": "split",
      "claim": "C-GOV-ROLES-001",
      "label": "Fronteira de confiança",
      "title": "A LLM propõe; componentes limitados validam e registram.",
      "left": {
        "title": "A manifestação cognitiva pode",
        "items": [
          "Raciocinar e conversar.",
          "Planejar e propor ações.",
          "Propor memórias classificadas.",
          "Solicitar operações autorizadas.",
          "Participar de avaliações e consolidação."
        ]
      },
      "right": {
        "title": "A manifestação cognitiva não pode sozinha",
        "items": [
          "Ler o arquivo bruto ou possuir chaves soberanas.",
          "Executar escrita canônica irrestrita.",
          "Alterar políticas criptográficas.",
          "Finalizar blocos ou reconhecer branches.",
          "Declarar nascimento, morte ou corrupção definitiva."
        ]
      }
    }
  ]
};
