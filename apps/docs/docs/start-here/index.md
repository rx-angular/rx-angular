---
id: start-here
title: "Start here"
diataxis_type: explanation
package: _site
legacy_guard: false
sidebar_label: "Start here"
sidebar_position: 0
tags: [structure, content]
---

import SignalsFirst from '@site/src/components/SignalsFirst';

# Start here

## What RxAngular is

RxAngular is a reactive toolkit for Angular, split across five focused packages:
state, template, cdk, isr, and eslint-plugin. It is a **complement to modern
Angular**: signals, zoneless change detection, and
native control flow do the everyday work, and RxAngular fits the
narrower spots where they are an awkward fit, namely shared and async-heavy state,
high-performance rendering of large live lists, concurrent scheduling, and
incremental static regeneration. This page orients you before you pick a package;
each section below links out to the package that owns the detail.

## The five packages — reach for this when…

State and Template are the two journeys most readers travel. CDK is
the helper layer underneath them: the substrate of render strategies, coercing,
and transformations that most consumers never import directly. isr and
eslint-plugin are standalone tools you add when you have the specific need.

| Package | Reach for it when… | npm (2026-07-02) | Angular peer |
| --- | --- | --- | --- |
| [`@rx-angular/state`](../packages/state/index.md) | you need global/shared, complex-derived, or async-heavy state (signals already cover local state) | v21.1.1 | `^21.0.0` |
| [`@rx-angular/template`](../packages/template/index.md) | you need high-performance rendering — large live lists, concurrent scheduling, reactive suspense/error/complete | v21.2.0 | `^21.0.0` |
| [`@rx-angular/cdk`](../packages/cdk/index.mdx) | you are building on the primitives (render strategies, coercing, transformations) — the helper layer | v21.1.0 | `^21.0.0` |
| [`@rx-angular/isr`](../packages/isr/index.md) | you run Angular SSR and want Incremental Static Regeneration | v21.0.1 | `@angular/ssr ^21.0.0` |
| [`@rx-angular/eslint-plugin`](../packages/eslint-plugin/index.md) | you want to enforce reactive discipline / keep a codebase zoneless-ready | v3.0.0 | eslint `>=8` |

If you are unsure where to begin: reach for **State** first if your question is
about *data*, and **Template** first if your question is about *rendering*. The
other three are additive.

## Signals-first positioning

<SignalsFirst />

Angular is **zoneless by default (v21)**, and **signals are the default for local
state**. RxAngular is positioned around that reality: it
does not replace `signal()`, `computed()`, or native `@if`/`@for`, and it
does not ask you to bring back Zone.js. It adds value where native Angular is a
poor fit (shared/async state, scheduled rendering, and the reactive template
context) and bridges into signals at the edges. For the split of
when a signal is enough and when RxState complements it, see
[Reactive state: global vs local, RxState + signals](../concepts/E3-reactive-state-global-vs-local.md).

## Install / Angular peer-version matrix

Install only the package you need; each is independent:

```bash
npm install @rx-angular/state
npm install @rx-angular/template
npm install @rx-angular/cdk
npm install @rx-angular/isr        # also needs @angular/ssr
npm install @rx-angular/eslint-plugin --save-dev
```

Every package peers on **Angular `^21`** (isr peers `@angular/ssr ^21`;
eslint-plugin peers `eslint >=8`). One currency caveat: **there is
no v22-targeted release yet; all peers are `^21` despite Angular 22 shipping in
June 2026.** On an Angular 21 baseline the packages are current; if you are
already on Angular 22, confirm peer compatibility before adopting.

For anything deeper than this orientation, follow the package links above. The
detail lives there.
