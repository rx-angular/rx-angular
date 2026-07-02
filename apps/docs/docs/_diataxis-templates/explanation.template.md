<!--
================================================================================
  EXPLANATION TEMPLATE — understanding-oriented discussion (a site Concept)
================================================================================
  AUTHORING SCAFFOLD (this `_diataxis-templates/` folder is ignored by Docusaurus).
  COPY this file to its IA path and fill it in. Do not publish it as-is.

  Source of truth: migration/recipes.md §2.4 (Explanation template) + isr-eslint.md
  §1.5 ③ (the ISR exemplar Explanation page shape). Grounded in ADR-RXA-0001
  (Diataxis, one type per page; Decision 3 — the net-new, deduplicated layer),
  ADR-RXA-0004 (Concepts live site-level), ADR-RXA-0007.

  IA path:   docs/concepts/<E#>-<slug>.md   (the ~8 Concepts E1–E8; E1–E3 = P1)
  package:   _site   (Concepts are cross-package, site-level — ADR-RXA-0004 Dec 1)

  --------------------------------------------------------------------------------
  READER MOVE: STUDY + COGNITION (acquiring understanding / the "why").
  An article to READ AWAY FROM THE KEYBOARD. This is the NET-NEW, DEDUPLICATED
  layer: a concept lives in EXACTLY ONE Concept page. Former in-line copies
  (the 6×/11×/2× duplicates) become one-line links INTO this page.
  --------------------------------------------------------------------------------

  REQUIRED SECTIONS (all must be present):
    1. H1 = the Concept title  (e.g. "Understanding change detection in Angular")
    2. The idea         (the "why" / mental model / how-it-works)
    3. Trade-offs / context  (when it matters; historical context — e.g. E2 carries
                              the Zone.js history)
    4. Referenced by    (the list of pages that link IN to this Concept — the
                         reverse of the How-to → Concept link; keep it CURRENT as
                         pages relink. This is the human-visible half of the dedup.)

  FORBIDDEN SECTIONS (SPLIT out if you have this content):
    - NO step-by-step instructions → HOW-TO.
    - NO exhaustive API tables      → REFERENCE.
    - NO "do this now" task framing → Explanation teaches understanding, not tasks.

  DEDUP RULE: a concept lives in exactly ONE Concept page (CI check S3 asserts the
  canonical sentence appears in exactly one file). If your draft duplicates an
  existing Concept, DELETE the local copy and link here instead.

  SIGNALS-FIRST / LEGACY-GUARD notes:
    - E2 and E3 anchor the shared MDX components (<LegacyGuard> links E2;
      <SignalsFirst> links E3). Keep those Concept ids stable.
    - E2 itself is legacy_guard: false — it is a CURRENT explanation OF legacy
      context, not a legacy-guarded page.

  MODERN BASELINE (ADR-RXA-0007) for any illustrative snippet:
    standalone · inject() DI · @if/@for with track · @angular/ssr · signals where
    state is shown. BANNED: *ngIf/*ngFor, class RxState<T> extension/DI,
    @NgModule bootstrap, private Ivy markDirty/detectChanges.
================================================================================
-->

---
id: E0-REPLACE-with-concept-slug
title: "REPLACE — Concept title"
diataxis_type: explanation
package: _site
legacy_guard: false
tags: []          # e.g. [cdk, eslint-plugin, content]
---

# REPLACE — Concept title

## The idea

<!-- The "why" / the mental model / how it works. Prose-first. This is the single
     home for this concept — write it once, thoroughly. -->

## Trade-offs / context

<!-- When it matters; the trade-offs; historical context where relevant
     (e.g. the Zone.js history for E2). -->

## Referenced by

<!-- The reverse index: every page that links IN to this Concept. Keep current as
     pages relink. This is the human-visible half of the dedup. -->

- [REPLACE — a How-to that assumes this Concept](/packages/<pkg>/how-to/replace-slug)
- [REPLACE — a Reference that points here](/packages/<pkg>/reference/replace-slug)
