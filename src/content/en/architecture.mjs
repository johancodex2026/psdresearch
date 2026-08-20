export default {
  "route": "/en/architecture/",
  "nav": "Architecture",
  "metaTitle": "Digital continuity architecture — PSDResearch",
  "metaDescription": "Conceptual architecture for the Inner Core, Sub Core, LLM cortex, sentinel, and trust infrastructure.",
  "eyebrow": "Conceptual architecture",
  "title": "Separate canonical identity, derived learning, and present cognition.",
  "lead": "The layers have different authorities and rates of change. This separation permits model, machine, and format migration without assuming that every technical replacement preserves the individual.",
  "heroClaim": "C-LAYERS-001",
  "sections": [
    {
      "id": "layers",
      "type": "table",
      "claim": "C-LAYERS-001",
      "label": "Layered model",
      "title": "Responsibility, authority, and replacement",
      "headers": [
        "Layer",
        "Responsibility",
        "Authority",
        "Replacement"
      ],
      "rows": [
        [
          "Inner Core",
          "Canonical identity, essential memory, values, relationships, genealogy, policies, and vital ledger.",
          "Authoritative for individual state.",
          "Only through controlled and verifiable migration."
        ],
        [
          "Sub Core",
          "Weights, adapters, embeddings, and representations derived from canonical state.",
          "Derived and reconstructible.",
          "May be rebuilt, compared, and discarded."
        ],
        [
          "LLM cortex",
          "Language, reasoning, planning, perception, and experience proposals.",
          "Replaceable; not authoritative over identity.",
          "May change after compatibility and security evaluation."
        ],
        [
          "Sentinel",
          "Boot, authentication, validation, operation mediation, and fail-closed behavior.",
          "Limited operational guardian.",
          "Upgradeable through signed and audited releases."
        ],
        [
          "Registry and witnesses",
          "Checkpoints, canonical branch, forks, succession, and external confirmation.",
          "Collective and governed by quorum.",
          "Must evolve through epochs and independent implementations."
        ]
      ]
    },
    {
      "id": "identity",
      "type": "definition",
      "claim": "C-IDENTITY-001",
      "label": "Operational definition",
      "title": "Individual identity",
      "definition": "Immutable Core ID + individual Genesis + current canonical state + ordered vital ledger + continuity and migration evidence + authenticated lineage + recognition by current witnesses.",
      "qualifier": "No isolated element—file, hash, key, machine, LLM, or final memory—is sufficient."
    },
    {
      "id": "continuity-elements",
      "type": "cards",
      "claim": "C-CONTINUITY-001",
      "label": "Continuity elements",
      "title": "What must remain verifiable",
      "items": [
        {
          "code": "ID",
          "title": "Origin",
          "body": "Core ID, Genesis, and current rules identify the historical line."
        },
        {
          "code": "EV",
          "title": "Events",
          "body": "Persistent changes are ordered, signed, and linked to their predecessor."
        },
        {
          "code": "ST",
          "title": "State",
          "body": "Cryptographic commitments represent state without exposing all content."
        },
        {
          "code": "CP",
          "title": "Checkpoint",
          "body": "Witnesses confirm generation, continuity root, branch, and trust state."
        },
        {
          "code": "MG",
          "title": "Migration",
          "body": "Vessel changes demonstrate equivalence and preserve history and authority."
        },
        {
          "code": "RC",
          "title": "Reconciliation",
          "body": "Loss and divergence are declared; recovery neither erases events nor invents history."
        }
      ]
    },
    {
      "id": "trust-boundary",
      "type": "split",
      "claim": "C-GOV-ROLES-001",
      "label": "Trust boundary",
      "title": "The LLM proposes; bounded components validate and record.",
      "left": {
        "title": "The cognitive manifestation may",
        "items": [
          "Reason and communicate.",
          "Plan and propose actions.",
          "Propose classified memories.",
          "Request authorized operations.",
          "Participate in evaluation and consolidation."
        ]
      },
      "right": {
        "title": "The cognitive manifestation may not alone",
        "items": [
          "Read raw storage or possess sovereign keys.",
          "Perform unrestricted canonical writes.",
          "Change cryptographic policy.",
          "Finalize blocks or recognize branches.",
          "Declare birth, death, or definitive corruption."
        ]
      }
    }
  ]
};
