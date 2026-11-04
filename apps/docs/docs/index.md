---
id: overview
title: 'Start here'
package: _site
sidebar_label: 'Start here'
sidebar_position: 0
---

import SignalsFirst from '@site/src/components/SignalsFirst';

# Start here

## What RxAngular is

RxAngular is a reactive toolkit for Angular, made of six focused packages:
state, template, cdk, isr, eslint-plugin and rebundle. It is a **complement to
modern Angular**. Signals, zoneless change detection and native control flow do
the everyday work. RxAngular fits the narrower spots where they are an awkward
fit, namely shared and async-heavy state, high-performance rendering of large
live lists, concurrent scheduling, incremental static regeneration and build
output tuning. This page orients you before you pick a package. Each section
below links out to the package that owns the detail.

## The six packages

State and Template are the two journeys most readers travel. CDK is
the helper layer underneath them. It holds the render strategies, coercing
and transformations that most consumers never import directly. isr,
eslint-plugin and rebundle are standalone tools you add when you have the
specific need.

| Package                                                          | Reach for it when…                                                                                                  | Version | Peers                    |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------ |
| [`@rx-angular/state`](./packages/state/index.md)                 | you need global or shared, complex derived, or async-heavy state (signals already cover local state)                | v22     | `@angular/core >=22.0.0` |
| [`@rx-angular/template`](./packages/template/index.md)           | you need high-performance rendering of large live lists, concurrent scheduling, or reactive suspense/error/complete | v22     | `@angular/core >=22.0.0` |
| [`@rx-angular/cdk`](./packages/cdk/index.md)                     | you are building on the primitives, like render strategies, coercing and transformations                            | v22     | `@angular/core >=22.0.0` |
| [`@rx-angular/isr`](./packages/isr/index.md)                     | you run Angular SSR and want Incremental Static Regeneration                                                        | v22     | `@angular/ssr >=22.0.0`  |
| [`@rx-angular/eslint-plugin`](./packages/eslint-plugin/index.md) | you want to enforce reactive discipline or keep a codebase zoneless-ready                                           | v3      | `eslint >=8.0.0`         |
| [`@rx-angular/rebundle`](./packages/rebundle/index.md)           | you build with esbuild and want fewer, better grouped chunks                                                        | v1      | none                     |

If you are unsure where to begin, reach for **State** first if your question is
about _data_, and **Template** first if your question is about _rendering_. The
other four are additive.

## Signals-first positioning

<SignalsFirst />

Angular is **zoneless by default**, and **signals are the default for local
state**. RxAngular is positioned around that reality. It
does not replace `signal()`, `computed()`, or native `@if`/`@for`, and it
does not ask you to bring back Zone.js. It adds value where native Angular is a
poor fit (shared and async state, scheduled rendering, and the reactive template
context) and bridges into signals at the edges. For the split of
when a signal is enough and when RxState complements it, see
[Reactive state: global vs local, RxState + signals](./concepts/reactive-state-global-vs-local.md).

## Install

Install only the package you need. Each is independent:

```bash
npm install @rx-angular/state
npm install @rx-angular/template
npm install @rx-angular/cdk
npm install @rx-angular/isr        # also needs @angular/ssr
npm install @rx-angular/eslint-plugin --save-dev
npm install @rx-angular/rebundle --save-dev
```

state, template, cdk and isr release in step with Angular. Install the major
version that matches your Angular major. On Angular 21, stay on the v21
releases. eslint-plugin and rebundle have release lines of their own. The
Version and Peers columns in the table above list the current lines.

For anything deeper than this orientation, follow the package links above. The
detail lives there.
