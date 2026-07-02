<!--
================================================================================
  TUTORIAL TEMPLATE — learning-oriented lesson
================================================================================
  AUTHORING SCAFFOLD (this `_diataxis-templates/` folder is ignored by Docusaurus).
  COPY this file to its IA path and fill it in. Do not publish it as-is.

  Source of truth: migration/recipes.md §2.1 (Tutorial template) + isr-eslint.md
  §1.5 ④ (the ISR exemplar Tutorial page shape). Grounded in ADR-RXA-0001
  (Diataxis, one type per page), ADR-RXA-0007 (modern baseline).

  IA path:   docs/tutorials/<Tid>-<slug>.md   (committed set: T1, T2, T4 only)
  package:   _site   (Tutorials are cross-package, site-level — ADR-RXA-0004 Dec 1)

  --------------------------------------------------------------------------------
  READER MOVE: STUDY + ACTION (acquiring skill by doing).
  The reader is a BEGINNER being TAUGHT. The AUTHOR owns success — the lesson must
  NOT fail. One guaranteed-success path, one success signal, cannot fail.
  --------------------------------------------------------------------------------

  REQUIRED SECTIONS (all must be present):
    1. H1 + one-sentence "what you'll build / learn by the end"
    2. Prerequisites   (exact versions + a `ng new` on the modern baseline)
    3. Numbered steps  (a single guaranteed-success path; each step do-this → see-this)
    4. What you built / What you learned  (recap)
    5. Next steps      (one-line links out — the ONLY place a Tutorial links out)

  FORBIDDEN SECTIONS (SPLIT out to the linked page if you have this content):
    - NO API / options tables            → that is REFERENCE; link it.
    - NO "why it works" / trade-off prose → that is EXPLANATION; link the Concept.
    - NO alternative paths / "you could also…" → tutorials are SINGLE-PATH.
    - NO exhaustive edge cases           → a tutorial that can branch can fail.
    (A Tutorial does NOT link mid-lesson — it would break the single path. Links
     live ONLY in the closing "Next steps".)

  MODERN BASELINE (ADR-RXA-0007) — every command/snippet:
    standalone components · inject() DI · @if/@for with mandatory track ·
    functional interceptors (HttpInterceptorFn + withInterceptors) ·
    @angular/ssr (never @nguniversal / zone.js/dist/zone-node / ngExpressEngine) ·
    signals where state is shown. BANNED: *ngIf/*ngFor, class RxState<T>
    extension/DI, @NgModule bootstrap, private Ivy markDirty/detectChanges.
================================================================================
-->

---
id: T0-REPLACE-with-tutorial-slug
title: "REPLACE — we will build …"
diataxis_type: tutorial
package: _site
legacy_guard: false
sidebar_label: "REPLACE — short label"
tags: []          # from the initiative vocab, e.g. [state, examples]
concepts: []      # E# ids this lesson assumes, e.g. [E3]
---

# REPLACE — Tutorial title (what we will build)

<!-- One sentence: what the reader will have built / be able to do by the end. -->

## Prerequisites

<!-- Exact versions + the starting point. Assume a fresh `ng new` on the modern
     baseline (standalone, zoneless, Angular 21). List every version pin the
     lesson depends on so it cannot fail for the reader. -->

## Steps

<!-- A SINGLE guaranteed-success path. Number every step. Each step is:
     DO THIS  →  SEE THIS (a concrete, observable result the reader can confirm).
     No branches. No "you could also". If a step could fork, pick one and commit. -->

### 1. REPLACE — first action

<!-- do-this … then the observable result. -->

### 2. REPLACE — next action

<!-- do-this … then the observable result. -->

### 3. REPLACE — final action reaching the success signal

<!-- The single success signal that proves the lesson worked. -->

## What you built

<!-- Recap what now exists / what the reader can now do. -->

## Next steps

<!-- The ONLY place a Tutorial links out. One-line links each.
     Go deeper → a Concept (E#). Do it for real → a How-to. Never inline them. -->

- Go deeper: [REPLACE — Concept title](/concepts/E0-replace-slug)
- Do it for real: [REPLACE — How-to title](/packages/<pkg>/how-to/replace-slug)
