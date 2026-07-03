# <!--

# REFERENCE TEMPLATE — information-oriented map

AUTHORING SCAFFOLD (this `_diataxis-templates/` folder is ignored by Docusaurus).
COPY this file to its IA path and fill it in. Do not publish it as-is.

Source of truth: migration/recipes.md §2.3 (Reference template) + isr-eslint.md
§1.5 ① (the ISR exemplar Reference page shape). Grounded in ADR-RXA-0001
(Diataxis, one type per page), ADR-RXA-0003 (Reference mirrors code), ADR-RXA-0007.

IA path: docs/packages/<pkg>/reference/<slug>.md

---

READER MOVE: WORK + COGNITION (looking up a fact).
Austere, factual, COMPLETE. The reader already knows what they are doing.
Reference MIRRORS THE CODE — SOURCE-DERIVED and EXHAUSTIVE (every export, every
field, every overload). Regenerate from libs/\* source; do NOT hand-type or
hand-edit signatures (EVID-RXA-0004: regenerate, don't hand-edit).

---

REQUIRED SECTIONS (all must be present): 1. H1 = the EXACT symbol / export / config name (drift item 12 — never a paraphrase) 2. Signature (regenerated from libs/\* source, not hand-typed) 3. Parameters / Inputs / Outputs (tables; names/types/defaults match source exactly) 4. Returns / Type 5. Import path (the exact entry point — drift item 10: many are wrong) 6. Minimal example (smallest correct snippet on the modern baseline; no narrative) 7. See also (one-line pointers only)

FORBIDDEN SECTIONS (this is where PURIFY applies — evict, then link one line): - NO Motivation / "why" prose → EXPLANATION; replace with a one-line link. - NO step-by-step How-to → HOW-TO; replace with a one-line link. - NO opinions / recommendations / comparisons → EXPLANATION. - NO tutorials or scenarios.
(Reference is the MOST-polluted type in this corpus — ~72% of pages embed
usage. Purifying it is the single biggest structural lever. Never leave a
heading with no content: either link it or remove the heading.)

MODERN BASELINE (ADR-RXA-0007) for the minimal example:
standalone · inject() DI · @if/@for with mandatory track ·
functional interceptors · @angular/ssr (never @nguniversal) · signals where
state is shown. BANNED: *ngIf/*ngFor, class RxState<T> extension/DI,
@NgModule bootstrap, private Ivy markDirty/detectChanges.

NOTE ON DRIFT (per Phase-A policy): if a signature/field/import fact ORIGINATES
in libs/\* source or JSDoc, do NOT edit the source here — RECORD it as a
jsdocFollowups item (owner deferred JSDoc; document the follow-up).
================================================================================
-->

---

id: REPLACE-with-reference-slug
title: "ExactSymbolName" # the real export/class/config name — never a paraphrase
diataxis_type: reference
package: REPLACE # state | template | cdk | isr | eslint-plugin
legacy_guard: false # or a canonical audience string (legacy-guarded Reference)
tags: [] # e.g. [state, api-reference]

---

# ExactSymbolName

<!-- Optional one-line pointers OUT (never absorb — Reference points, never teaches):
> **Why this matters:** see [REPLACE — Concept](/concepts/E0-replace-slug).
> **Task:** see [REPLACE — How-to](/packages/<pkg>/how-to/replace-slug).
-->

## Signature

<!-- Regenerated from libs/* source — do NOT hand-type. Include every overload. -->

```ts
// REPLACE with the source-derived signature block
```

## Parameters

<!-- Table; names / types / defaults MUST match source exactly. -->

| Name    | Type    | Default | Description |
| ------- | ------- | ------- | ----------- |
| REPLACE | REPLACE | REPLACE | REPLACE     |

## Returns

<!-- The return type / shape. -->

## Import path

<!-- The EXACT entry point (drift item 10 — many docs point at the wrong subpath). -->

```ts
import { ExactSymbolName } from 'REPLACE-exact-entry-point';
```

## Minimal example

<!-- Smallest CORRECT snippet on the modern baseline. No narrative, no "why". -->

```ts
// REPLACE with the minimal correct usage
```

## See also

<!-- One-line pointers only. -->

- How-to: [REPLACE](/packages/<pkg>/how-to/replace-slug)
- Concept: [REPLACE](/concepts/E0-replace-slug)
