---
id: rebundle-introduction
title: 'Introduction'
diataxis_type: explanation
package: rebundle
legacy_guard: false
sidebar_label: 'Introduction'
sidebar_position: 1
tags: [rebundle, content]
---

# Introduction

## Welcome 🙌

`@rx-angular/rebundle` is a set of tools that optimize the build output of
Angular applications using esbuild. It hooks into the build as an esbuild
plugin, understands the generated module graph, and rebundles chunks in memory
before they are written to disk — no re-transpilation, and no changes to your
source code for the default setup.

## Why?

### Problem statement

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

For a deeper understanding of this issue, read the
[architecture and problem statement](./explanation/architecture.md).

### Solution

`@rx-angular/rebundle` allows users to optimize the bundle output of Angular
applications beyond the Angular experimental chunk optimizer. By default it
provides additional size-based and reachability-based optimizations that most
apps can benefit from, while remaining fully configurable for complex scenarios.

### Impact

By employing advanced chunking strategies, `@rx-angular/rebundle` consolidates
initial and dynamic chunks based on dependency graphs and size constraints. This
leads to significantly fewer HTTP requests, mitigating network thrashing and
restoring fast Largest Contentful Paint (LCP) in HTTP/2 environments.

For real-world impact data, see this
[demo discussion](https://github.com/angular/angular-cli/issues/27715#issuecomment-3398232305).

## How?

The optimizer acts as an esbuild plugin. It hooks into the build process, reads
the metafile output to understand the generated module graph, and intelligently
rebundles chunks in memory before they are written to disk. The policy layer
that decides how chunks are grouped is the
[merge strategy](./reference/merge-strategies.md) system.

## What's next?

- [Overview](./index.md): features, benefits, and where to go next.
- [Set up rebundle](./how-to/set-up-rebundle.md): wire the plugin into an Angular
  CLI or Nx build.
- [Architecture & problem statement](./explanation/architecture.md): the
  mechanism in depth.
