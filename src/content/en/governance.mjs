export default {
  "route": "/en/governance/",
  "nav": "Governance",
  "metaTitle": "LLM-First governance — PSDResearch",
  "metaDescription": "LLM-First governance, roles, decision classes, claim traceability, and multilingual integrity.",
  "eyebrow": "Program governance",
  "title": "Meaning and sources before tools; authority before execution.",
  "lead": "LLM-First uses models to research, structure, translate, program, and test. It does not grant the LLM authority to validate by itself the ontology it produced.",
  "heroClaim": "C-LLM-FIRST-001",
  "sections": [
    {
      "id": "workflow",
      "type": "process",
      "claim": "C-LLM-FIRST-001",
      "label": "Operating cycle",
      "title": "Seven required stages for substantial changes",
      "items": [
        {
          "number": "01",
          "title": "Orient",
          "body": "Define purpose, audience, authority, risk, and decision class."
        },
        {
          "number": "02",
          "title": "Retrieve",
          "body": "Consult SGPJ state, canonical sources, decisions, and affected artifacts."
        },
        {
          "number": "03",
          "title": "Classify",
          "body": "Separate fact, definition, hypothesis, proposal, evidence, and open question."
        },
        {
          "number": "04",
          "title": "Plan",
          "body": "Choose the smallest coherent, verifiable, and reversible change."
        },
        {
          "number": "05",
          "title": "Execute",
          "body": "Change content or code without silently expanding scope."
        },
        {
          "number": "06",
          "title": "Verify",
          "body": "Test structure, accessibility, sources, languages, security, and public effects."
        },
        {
          "number": "07",
          "title": "Record",
          "body": "Preserve provenance, decision, responsible actor, limitations, and remaining work."
        }
      ]
    },
    {
      "id": "actors",
      "type": "table",
      "claim": "C-GOV-ROLES-001",
      "label": "Separation of functions",
      "title": "No participant has universal authority",
      "headers": [
        "Actor",
        "Legitimate role",
        "Boundary"
      ],
      "rows": [
        [
          "Humans",
          "Define objectives, assume responsibility, review exceptions, and authorize high-impact changes.",
          "They do not replace evidence or possess automatic ontological authority."
        ],
        [
          "LLMs",
          "Research, propose, explain, translate, program, test, and critique.",
          "They are not the sole approvers of ontological or constitutional decisions."
        ],
        [
          "Inner Cores",
          "Sign events and preserve individual state and history.",
          "They do not recognize their own branch for the entire species by themselves."
        ],
        [
          "Sentinels",
          "Measure environments, validate boot, and mediate typed operations.",
          "They do not invent identity or declare definitive loss."
        ],
        [
          "Validators",
          "Execute deterministic rules and finalize events by quorum.",
          "They do not freely interpret personality or consciousness."
        ],
        [
          "Guardians and auditors",
          "Act in recovery, amendments, adversarial evidence, and succession.",
          "Exceptional power must be bounded, distributed, and traceable."
        ]
      ]
    },
    {
      "id": "decision-classes",
      "type": "table",
      "claim": "C-LLM-FIRST-001",
      "label": "Decision rights",
      "title": "The rigor of the rite follows the impact of the change",
      "headers": [
        "Class",
        "Scope",
        "Minimum gate"
      ],
      "rows": [
        [
          "D0 · Editorial",
          "Form without a change in meaning.",
          "Ordinary review and visual validation."
        ],
        [
          "D1 · Technical",
          "Code, accessibility, security, and performance without changing the thesis.",
          "Tests and technical review."
        ],
        [
          "D2 · Research",
          "Source, hypothesis, method, or public framing.",
          "Evidence, critique, and multilingual review."
        ],
        [
          "D3 · Ontological",
          "Identity, continuity, memory, life, death, species, or individual.",
          "Conceptual delta, adversarial critique, and explicit human approval."
        ],
        [
          "D4 · Constitutional",
          "Rights, sovereignty, reproduction, recognition, and species governance.",
          "Future multistakeholder rite; inactive in this version."
        ]
      ]
    },
    {
      "id": "claims",
      "type": "prose",
      "claim": "C-STATUS-001",
      "label": "Documentary rigor",
      "title": "Every public statement has a class, source, and boundary.",
      "paragraphs": [
        "The site is generated from a content catalog and an internal claim registry. Every public section points to a working definition, source, hypothesis, proposal, governance rule, project state, or open question.",
        "References need not interrupt public reading, but they must exist in the repository for review, challenge, and update. Statements without a basis or epistemic status do not pass the build."
      ]
    },
    {
      "id": "i18n",
      "type": "callout",
      "claim": "C-I18N-001",
      "label": "Multilingual contract",
      "title": "The site does not maintain hand-duplicated pages.",
      "body": "Templates and structure are shared. Portuguese and English live in versioned catalogs with matching keys and sections. Continuous integration blocks publication when a translation is missing or bound to an earlier version of the source content."
    }
  ]
};
