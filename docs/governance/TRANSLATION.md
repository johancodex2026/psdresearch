# Translation Governance

## 1. Language model

Portuguese (`pt-BR`) and English (`en`) are co-equal public languages.

The canonical research concept is not owned by one natural language. Each page is a semantic projection of the same research artifact.

## 2. Translation keys

Every localized page has a stable key in `site/content-manifest.json` and a metadata field:

```html
<meta name="psd:translation-key" content="...">
<meta name="psd:translation-status" content="...">
```

Initial status:

`llm-assisted-candidate`

Future states:

- `draft`;
- `llm-assisted-candidate`;
- `human-reviewed`;
- `approved`;
- `out-of-sync`;
- `deprecated`.

## 3. Parity requirements

Localized versions must preserve:

- thesis;
- epistemic status;
- exclusions and disclaimers;
- decision weight;
- research questions;
- links to equivalent material;
- version and artifact state.

A translator may improve naturalness and cultural clarity. A translator may not:

- strengthen certainty;
- weaken a limitation;
- replace an operational term with a metaphysical claim;
- add persuasion absent from the source;
- remove unresolved questions.

## 4. Internationalization baseline

- UTF-8 everywhere.
- Correct BCP 47 language tags.
- `lang` on the root HTML element.
- Explicit `lang` for embedded content in another language.
- Visible language switch on every equivalent page.
- `hreflang` for Portuguese, English, and `x-default`.
- No text embedded in essential graphics.
- Layout must tolerate expansion and future right-to-left languages.
- `dir` must be introduced when a future language requires it.
- Language names are displayed in their own language.

## 5. Adding a language

A new language requires:

1. locale code and route in `site/content-manifest.json`;
2. a language reviewer or declared unreviewed state;
3. full page set or a documented partial-publication policy;
4. language switch update;
5. `hreflang` update;
6. sitemap update;
7. validator update;
8. typography and direction review;
9. cultural review of imagery and analogies;
10. explicit fallback policy.

## 6. Source language changes

A material change to one language creates an `out-of-sync` state until all public languages are reconciled. Ontological and public-claims changes must be translated in the same pull request unless a blocking reason is recorded.
