# <!--

# HOW-TO TEMPLATE — task-oriented recipe

AUTHORING SCAFFOLD (this `_diataxis-templates/` folder is ignored by Docusaurus).
COPY this file to its IA path and fill it in. Do not publish it as-is.

Source of truth: migration/recipes.md §2.2 (How-to template) + isr-eslint.md
§1.5 ② (the ISR exemplar How-to page shape). Grounded in ADR-RXA-0001
(Diataxis, one type per page), ADR-RXA-0004 (every How-to links its Concept),
ADR-RXA-0007 (modern baseline).

IA path: docs/packages/<pkg>/how-to/<slug>.md

---

READER MOVE: WORK + ACTION (applying skill to a real goal).
The reader is COMPETENT and wants the RECIPE, not a lesson. Assume competence;
keep it minimal and real-world.

---

REQUIRED SECTIONS (all must be present): 1. H1 = "How to {accomplish goal}" (goal-titled, imperative) 2. Goal / when to use (one or two sentences) 3. Steps (ordered, minimal, real-world; assume competence) 4. Result (how to know it worked) 5. See also (one-line links: the REFERENCE for the symbols used +
the CONCEPT it assumes — MANDATORY, every How-to links
its assumed Concept — ADR-RXA-0004 Consequences)

FORBIDDEN SECTIONS (SPLIT / link out if you have this content): - NO teaching / first-principles → that is a TUTORIAL. - NO full API dump → link the REFERENCE (a one-liner, never the table). - NO long "why" essays → link the CONCEPT.

MODERN BASELINE (ADR-RXA-0007) — every snippet:
standalone · inject() DI · @if/@for with mandatory track ·
functional interceptors (HttpInterceptorFn + withInterceptors) ·
@angular/ssr (never @nguniversal / zone.js/dist/zone-node / ngExpressEngine) ·
signals where state is shown. BANNED: *ngIf/*ngFor, class RxState<T>
extension/DI, @NgModule bootstrap, private Ivy markDirty/detectChanges.
================================================================================
-->

---

id: REPLACE-with-how-to-slug
title: "How to REPLACE — accomplish the goal"
diataxis_type: how-to
package: REPLACE # state | template | cdk | isr | eslint-plugin
legacy_guard: false # or a canonical audience string (see frontmatter-schema.md)
tags: [] # e.g. [state, guides]
concepts: [] # E# ids this recipe assumes, e.g. [E3, E6]

---

# How to REPLACE — accomplish the goal

## Goal

<!-- One or two sentences: what this recipe achieves and when to reach for it.
     Open by linking the Concept this task assumes (see "See also" — the link is
     mandatory; naming it up front orients the competent reader). -->

## Steps

<!-- Ordered, minimal, real-world. Assume the reader is competent — no teaching,
     no first-principles. Each step is a concrete action, on the modern baseline. -->

1. REPLACE — first step.
2. REPLACE — next step.
3. REPLACE — final step (produces the runnable end-state).

## Result

<!-- How the reader knows it worked — the observable end-state / verification. -->

## See also

<!-- One-line links ONLY. MANDATORY: the Reference for every symbol used AND the
     assumed Concept. Never paste the API table here — link it. -->

- Reference: [`REPLACE-symbol`](/packages/<pkg>/reference/replace-slug)
- Concept: [REPLACE — Concept title](/concepts/E0-replace-slug)
