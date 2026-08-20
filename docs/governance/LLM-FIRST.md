# LLM-First Operating Model

## 1. Definition

LLM-First is an operating orientation in which human intent, semantic meaning, context, source authority, risk, and decision rights are understood before a tool or implementation is selected.

It is not:

- prompt-first execution;
- LLM supremacy;
- autonomous approval;
- tool use without context;
- a license to fill missing information with plausible text;
- a replacement for domain expertise, human responsibility, or evidence.

## 2. The operating loop

### 2.1 Orient

Identify:

- the intended outcome;
- the audience and affected stakeholders;
- the source of authority;
- the decision class;
- whether identity, continuity, public trust, or protected terminology is affected;
- what would make the action misleading or irreversible.

### 2.2 Retrieve

Read the canonical artifacts before reasoning from memory.

For this repository, start with:

- repository state;
- ontological foundation;
- glossary;
- public-claims policy;
- architecture description;
- relevant ADRs;
- the actual page or code to be changed.

### 2.3 Classify

Classify each substantive statement:

- source-derived;
- working definition;
- hypothesis;
- proposal;
- project evidence;
- external fact;
- open question.

Classify the change from `D0` to `D4`.

### 2.4 Deliberate

Ask:

- Does this preserve the distinction between model and individual?
- Does it overstate what evidence supports?
- Does one language become stronger or weaker than the other?
- Does the change create a new dependency or authority?
- Could a public reader mistake an operational term for scientific consensus?
- Is there a smaller, more reversible change?

### 2.5 Plan

State:

- files to change;
- decision class;
- expected result;
- validation method;
- rollback path;
- review required.

### 2.6 Execute

Make the smallest coherent change. Avoid:

- unrelated refactoring;
- silent terminology changes;
- adding tracking, external assets, or dependencies for convenience;
- publishing private material;
- broad changes made only because an LLM can generate them quickly.

### 2.7 Verify

Run deterministic checks and inspect meaning.

Technical verification includes:

- `npm run check`;
- internal link resolution;
- canonical and `hreflang` metadata;
- semantic HTML;
- keyboard navigation;
- mobile and desktop rendering;
- reduced-motion behavior;
- security headers.

Semantic verification includes:

- equivalent claim strength in Portuguese and English;
- source and status preservation;
- no unsupported ontological escalation;
- decision rights satisfied.

### 2.8 Record

Record:

- what changed;
- why;
- evidence;
- reviewer;
- remaining uncertainty;
- artifact state.

## 3. Authority boundary

An LLM may:

- propose;
- draft;
- translate;
- implement;
- test;
- compare;
- identify ambiguity;
- produce candidate evidence.

An LLM may not alone:

- approve its own `D3` or `D4` change;
- declare an identity canonical;
- promote hypothesis to fact;
- claim consciousness, life, or personhood;
- introduce irreversible governance;
- conceal uncertainty to make the project appear more mature.

## 4. Failure modes

### Tool-first reduction

A living research question is reduced to a technical task before its meaning is understood.

**Control:** restate purpose and decision class before execution.

### Narrative inflation

A compelling phrase becomes stronger than evidence.

**Control:** claim classification and adversarial review.

### Translation drift

One language becomes more assertive, commercial, mystical, or defensive.

**Control:** stable translation keys and bilingual review.

### Self-approval

The same LLM authors, reviews, and promotes an ontological change.

**Control:** eligible human approval and declared independence.

### Framework capture

The site or research workflow becomes dependent on a vendor or framework that does not carry the ontology.

**Control:** dependency-free baseline and ADR gate.

### Compression loss

A summary removes a limit, exception, risk, or distinction.

**Control:** compare against the source and preserve explicit exclusions.
