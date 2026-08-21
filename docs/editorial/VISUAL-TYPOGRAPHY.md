# Visual and Typographic Standard

- Project: PSDResearch
- Version: 0.2 candidate
- Decision class: D1 — Technical / D2 — Public framing
- Direction reinforced by founding steward: 2026-08-20

## 1. Principle

PSDResearch must look consequential without looking theatrical.

Elegance comes from proportion, rhythm, contrast, whitespace, editorial structure, and precision—not from oversized type.

## 2. Anti-giant-type rule

Public pages must avoid headlines that occupy the screen as spectacle or push the thesis below the fold without reason.

Default limits:

- primary page title: `clamp(2.6rem, 5vw, 4.75rem)`;
- mobile primary title: maximum about `3.75rem`;
- section title: maximum about `3rem`;
- article title: maximum about `2.3rem`;
- constitutional or founding quotation: maximum about `2.85rem`.

Long declarative Home titles require a stricter profile:

- Home title: maximum about `3.9rem` on wide screens;
- Home title: maximum about `3.15rem` on mobile;
- Home section titles: maximum about `2.7rem`.

Page-specific stylesheets must override the global `h1` and `h2` scale explicitly. Compliance is evaluated from the computed browser size, not only from the documented token.

Exceptions require an explicit editorial rationale and visual review.

## 3. Intended character

The visual system should balance:

- constitutional seriousness;
- research credibility;
- technological transformation;
- social accessibility;
- calm confidence.

It must not resemble:

- a product launch;
- a venture-capital landing page;
- science-fiction promotion;
- political propaganda;
- a manifesto that substitutes scale for substance.

## 4. Hierarchy

Use, in order:

1. semantic structure;
2. spacing and grouping;
3. contrast and surface;
4. restrained color;
5. typography scale.

Large type is the last instrument, not the first.

## 5. Page consistency

Home, Manifesto, Architecture, Research, Species Registry, Governance, and About should share:

- the same header and footer;
- comparable title scale;
- the same serif/sans relationship;
- consistent section spacing;
- consistent card radii and borders;
- the same epistemic-disclosure language;
- equivalent Portuguese and English visual weight.

## 6. Motion

Motion must be subtle, optional, and informational.

- respect `prefers-reduced-motion`;
- no perpetual motion as the primary attention mechanism;
- no animation that implies consciousness or internal experience;
- future video must have accessible controls and a non-video alternative.

## 7. Acceptance

A page passes visual review when:

- no single headline overwhelms the content;
- the first screen communicates purpose without sales pressure;
- the page remains readable at 320 px and at wide desktop sizes;
- hierarchy survives without animation;
- the same visual grammar is recognizable across pages;
- elegance is preserved through restraint.
