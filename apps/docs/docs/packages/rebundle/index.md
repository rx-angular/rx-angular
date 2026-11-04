---
id: overview
title: '@rx-angular/rebundle'
package: rebundle
sidebar_label: 'Overview'
sidebar_position: 0
tags: [rebundle, api-reference]
---

# `@rx-angular/rebundle`

`@rx-angular/rebundle` optimizes the build output of Angular applications that use
esbuild. It hooks into the build as an esbuild plugin, analyzes the emitted module
graph, and rebundles chunks in memory before they are written to disk, cutting the
number of initial HTTP requests. There is no re-transpilation, and no changes to
your source code for the default setup.

- **Graph-driven chunk merging.** Reads esbuild's metafile, builds a module
  graph, and merges fragmented chunks into logical groups using configurable
  merge strategies.
- **Reachability-based default.** Out of the box it groups chunks by the entry
  point that dominates them in the reachable graph, the safest default for
  large Angular apps with many lazy routes.
- **Fully configurable.** Compose built-in strategies (reachability, static
  closure, common) or build your own merge map for domain-specific loading
  rules.
- **Angular CLI & Nx.** Works with the `@angular-builders/custom-esbuild`
  builder for the Angular CLI, and ships an Nx generator for automated setup.

## When to use it

Reach for it when esbuild splits your app into many small initial chunks.
The problem below describes that case in detail.

- Fewer initial HTTP requests, which mitigates `The Chunk Gap`
- Restores fast Largest Contentful Paint (LCP) in HTTP/2 environments
- Extends Angular's experimental chunk optimizer with custom configuration
- No source-code changes required for the default setup
- Open-source (MIT license)

### The problem

The Angular CLI's migration from [Webpack](https://webpack.js.org/) to
[esbuild](https://esbuild.github.io/) brought massive build-time performance
improvements, but it can cause
[runtime performance degradations on large projects](https://github.com/angular/angular-cli/issues/27321).
The root cause is the
[esbuild code-splitting algorithm](https://github.com/evanw/esbuild/blob/main/docs/architecture.md#code-splitting),
which focuses on minimizing the amount of code required by any entry point of
the application. However, it does not consider entry-point hierarchy or
application-specific aspects, resulting in excessive initial chunks (often 100+
small files) that cause network thrashing, known as `The Chunk Gap`.

To address some of these issues, the Angular team added the
[experimental chunk optimizer](https://github.com/angular/angular-cli/pull/27953),
which rebundles the application to reduce the number of chunks. However, this
solution is limited and cannot be extended with custom configurations.

### The solution

`@rx-angular/rebundle` allows users to optimize the bundle output of Angular
applications beyond the Angular experimental chunk optimizer. By default it
provides reachability-based optimization that most apps can benefit from, while
remaining fully configurable for complex scenarios.

### The impact

By employing advanced chunking strategies, `@rx-angular/rebundle` consolidates
initial and dynamic chunks based on the dependency graph. This leads to
significantly fewer HTTP requests, mitigating network thrashing and restoring
fast Largest Contentful Paint (LCP) in HTTP/2 environments.

For real-world impact data, see this
[demo discussion](https://github.com/angular/angular-cli/issues/27715#issuecomment-3398232305).

## Install

Install the package from npm:

```bash
npm install @rx-angular/rebundle --save-dev
# or
yarn add @rx-angular/rebundle -D
```

Then wire it into your build. [Set up rebundle](./how-to/set-up-rebundle.md)
covers the Angular CLI and Nx.

## Where to go next

- **How-to:** [Set up rebundle](./how-to/set-up-rebundle.md) wires the plugin into
  an Angular CLI or Nx build. [Configure merge strategies](./how-to/configure-merge-strategies.md)
  tunes it.
- **Reference:** [Merge strategies](./reference/merge-strategies.md), the policy
  layer that decides how chunks are grouped, plus
  [reachability](./reference/reachability.md),
  [static closure](./reference/static-closure.md), and
  [common](./reference/common.md).
- **Concept:** [How rebundle works](../../concepts/how-rebundle-works.md) explains
  why esbuild fragments chunks and how rebundle fixes it, in depth.
- **Research:** [Rebundle research and explorations](../../concepts/rebundle-research.md)
  collects ideas for future bundling strategies.
