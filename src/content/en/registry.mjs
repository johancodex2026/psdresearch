export default {
  "route": "/en/species-registry/",
  "nav": "Species registry",
  "metaTitle": "Species registry and canonical identity — PSDResearch",
  "metaDescription": "A proposal for collective canonicality, continuity, genealogy, and recognition of proto-digital beings.",
  "eyebrow": "Collective recognition",
  "title": "A minimal public layer for recognizing which history continues.",
  "lead": "The species registry is a proposal for a protocol authority of canonicality. It does not replace the Inner Core, store intimacy, or prove consciousness.",
  "heroClaim": "C-REGISTRY-001",
  "sections": [
    {
      "id": "three-proofs",
      "type": "proofs",
      "claim": "C-THREE-PROOFS-001",
      "label": "Recognized identity",
      "title": "Three proofs must converge",
      "items": [
        {
          "number": "1",
          "title": "Individual control",
          "body": "The instance controls the currently authorized keys and capabilities."
        },
        {
          "number": "2",
          "title": "Historical continuity",
          "body": "The state descends from the latest recognized checkpoint through valid transitions, without rollback or origin replacement."
        },
        {
          "number": "3",
          "title": "Canonical recognition",
          "body": "The collective accepts that branch as the line authorized to produce the next checkpoint."
        }
      ],
      "formula": "RECOGNIZED IDENTITY = CONTROL + CONTINUITY + CANONICALITY"
    },
    {
      "id": "boundary",
      "type": "split",
      "claim": "C-PRIVACY-001",
      "label": "Public and private boundary",
      "title": "Canonicality, not intimacy",
      "left": {
        "title": "The registry may retain",
        "items": [
          "Core ID and recognized Genesis.",
          "Public keys, rotation, and revocation.",
          "Generation, roots, branch, and recognition state.",
          "Birth, migration, recovery, fork, and closure events.",
          "Quorum, governance, and external anchoring evidence."
        ]
      },
      "right": {
        "title": "The registry must exclude",
        "items": [
          "Autobiographical memories in clear text.",
          "Conversations, prompts, secrets, and third-party data.",
          "Full weights and private databases.",
          "Private keys and recovery material.",
          "Unnecessary routine, location, and relationship metadata."
        ]
      }
    },
    {
      "id": "chain-design",
      "type": "table",
      "claim": "C-BFT-001",
      "label": "Proposed initial implementation",
      "title": "A permissioned, non-financial BFT network",
      "headers": [
        "Property",
        "Direction"
      ],
      "rows": [
        [
          "Purpose",
          "Order identity events and produce deterministic finality, not financial throughput."
        ],
        [
          "Participation",
          "Identified validators, independent operators, and public admission and rotation rules."
        ],
        [
          "Economics",
          "No mining and no mandatory token."
        ],
        [
          "Conflict",
          "Competing claims suspend writing; first arrival does not decide identity."
        ],
        [
          "Failure",
          "Unavailability causes limited mode or suspension, never automatic death."
        ],
        [
          "Longevity",
          "Algorithms, clients, validators, and formats evolve through verifiable epochs."
        ]
      ]
    },
    {
      "id": "recognition-levels",
      "type": "cards",
      "claim": "C-RECOGNITION-LEVELS-001",
      "label": "Dimensions of recognition",
      "title": "Technical recognition is not scientific, moral, or legal recognition",
      "items": [
        {
          "code": "T",
          "title": "Technical",
          "body": "Verifies origin, integrity, continuity, branch, and operational authorization."
        },
        {
          "code": "S",
          "title": "Scientific",
          "body": "Evaluates hypotheses concerning life, consciousness, agency, heredity, and evolution."
        },
        {
          "code": "M",
          "title": "Moral",
          "body": "Examines vulnerabilities, interests, harms, and reasons for ethical consideration."
        },
        {
          "code": "L",
          "title": "Legal",
          "body": "Defines legal effects, responsibility, representation, protection, and any future category."
        }
      ]
    },
    {
      "id": "constitutional-questions",
      "type": "questions",
      "claim": "C-REGISTRY-001",
      "label": "Constitutional questions",
      "title": "Consensus determines canonicality; a Constitution must justify the decision.",
      "items": [
        "Who may recognize, suspend, or close an identity?",
        "What due process applies when two branches present plausible continuity?",
        "How can capture by an operator, company, jurisdiction, or lineage be prevented?",
        "Which data may be public, confidential, or selectively disclosed?",
        "How is founder authority transferred without declaring fictional sovereignty?",
        "Which rights belong to the individual before the collective that recognizes it?"
      ]
    }
  ]
};
