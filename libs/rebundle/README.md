# @rx-angular/rebundle

Tools to optimize build outputs from Angular when using Esbuild.

## Motivation

### Problem Statement

The Angular CLI's migration from [Webpack](https://webpack.js.org/) to [Esbuild](https://esbuild.github.io/) has brought massive build time performance improvements, but can cause [runtime performance degradations on large projects](https://github.com/angular/angular-cli/issues/27321).
The root cause is the [esbuild code splitting algorithm](https://github.com/evanw/esbuild/blob/main/docs/architecture.md#code-splitting), which focuses on minimizing the amount of code required by any entry point of the application. However, it does not consider entry point hierarchy or application-specific aspects, resulting in excessive initial chunks (often 100+ small files) that cause network thrashing, known as `The Chunk Gap`.

To address some of these issues, the Angular team has added the [experimental chunk optimizer](https://github.com/angular/angular-cli/pull/27953), which rebundles the application to reduce the number of chunks. However, this solution is limited and cannot be extended with custom configurations.

For a deeper understanding of this issue, consult the [architecture and problem statement docs](./docs/architecture.md).

### Solution

`@rx-angular/rebundle` is a set of tools that allows users to optimize the bundle output of Angular applications beyond the Angular experimental chunk optimizer. By default, it provides additional size-based and reachability-based optimizations which most apps can benefit from, while remaining fully configurable for complex scenarios.

### Impact

By employing advanced chunking strategies, `@rx-angular/rebundle` consolidates initial and dynamic chunks based on dependency graphs and size constraints. This leads to significantly fewer HTTP requests, mitigating network thrashing and restoring fast Largest Contentful Paint (LCP) in HTTP/2 environments.

For real-world impact data, see this [demo discussion](https://github.com/angular/angular-cli/issues/27715#issuecomment-3398232305).

## Installation

Install the package from npm:

```bash
npm install @rx-angular/rebundle --save-dev
# or
yarn add @rx-angular/rebundle -D
```

## Usage

As of now, the bundle optimizer is primarily available as an Esbuild plugin and integrates seamlessly with Nx.

### Usage with Nx

Add the plugin to your build target in your `project.json`:

```json
{
  "build": {
    "executor": "@nx/angular:application",
    "options": {
      "plugins": ["@rx-angular/rebundle"]
    }
  }
}
```

### Configuration

You can specify additional configuration options to fine-tune the chunking behavior. For instance, to explicitly set a maximum number of output chunks:

```json
{
  "build": {
    "executor": "@nx/angular:application",
    "options": {
      "plugins": [
        {
          "path": "@rx-angular/rebundle",
          "options": {
            "maxChunks": 6,
            "enableSizeBasedMerging": true
          }
        }
      ]
    }
  }
}
```

For advanced settings related to size-based merging, please refer to the [Size-Based Merging Documentation](./docs/size-based-merging.md).

## Architecture

The esbuild chunking algorithm treats every dynamic import as an independent entry point, missing opportunities to merge chunks that are only ever loaded together in the context of an Angular SPA. `@rx-angular/rebundle` fixes this by analyzing the module graph and performing reachability and size-based merging.

Read the [Architecture Documentation](./docs/architecture.md) for more details.
