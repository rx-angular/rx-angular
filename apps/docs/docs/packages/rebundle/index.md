---
id: rebundle-landing
title: '@rx-angular/rebundle'
diataxis_type: reference
package: rebundle
legacy_guard: false
sidebar_label: 'Overview'
sidebar_position: 0
tags: [rebundle, api-reference]
---

# `@rx-angular/rebundle`

Tools to optimize the build output of Angular applications that use esbuild. It
analyzes the emitted module graph and rebundles chunks in memory before they are
written to disk, cutting the number of initial HTTP requests without changing
your source code.

New to rebundle? Start with the [introduction](./introduction.md), then read the
[architecture and problem statement](./explanation/architecture.md) for the
mechanism.

## What it does

- **Graph-driven chunk merging.** Reads esbuild's metafile, builds a module
  graph, and merges fragmented chunks into logical groups using configurable
  merge strategies.
- **Reachability-based default.** Out of the box it groups chunks by the entry
  point that dominates them in the reachable graph — the safest default for
  large Angular apps with many lazy routes.
- **Size-based merging.** Optionally consolidates small chunks under a
  configurable threshold to reduce request overhead.
- **Fully configurable.** Compose built-in strategies (reachability, static
  closure, common) or build your own merge map for domain-specific loading
  rules.
- **Angular CLI & Nx.** Works with the `@angular-builders/custom-esbuild`
  builder for the Angular CLI, and ships an Nx generator for automated setup.

## Why use it

- ✅ Fewer initial HTTP requests — mitigates `The Chunk Gap`
- ✅ Restores fast Largest Contentful Paint (LCP) in HTTP/2 environments
- ✅ Extends Angular's experimental chunk optimizer with custom configuration
- ✅ No source-code changes required for the default setup
- ✅ Open-source (MIT license)

## Installation

Install the package from npm:

```bash
npm install @rx-angular/rebundle --save-dev
# or
yarn add @rx-angular/rebundle -D
```

Then wire it into your build — see [Set up rebundle](./how-to/set-up-rebundle.md)
for full Angular CLI and Nx instructions.

## Explore

- **Understand:** [Architecture & problem statement](./explanation/architecture.md):
  why esbuild fragments chunks and how rebundle fixes it.
- **Do:** [Set up rebundle](./how-to/set-up-rebundle.md),
  [configure merge strategies](./how-to/configure-merge-strategies.md), and
  [enable size-based merging](./how-to/enable-size-based-merging.md).
- **Look up:** [Merge strategies](./reference/merge-strategies.md),
  [reachability](./reference/reachability.md),
  [static closure](./reference/static-closure.md),
  [common](./reference/common.md), and the
  [size-based merging options](./reference/size-based-merging-options.md).

New to rebundle? Start with the [introduction](./introduction.md).
