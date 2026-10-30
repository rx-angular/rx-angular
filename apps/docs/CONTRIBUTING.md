# Contributing to the RxAngular docs

The docs site lives in `apps/docs` and runs on Docusaurus. This guide covers how pages are organized, named, linked and versioned. Read it before you add, move or rename a page.

For commit messages and general contribution rules, see the [repository guide](../../CONTRIBUTING.md).

## Run the site locally

| Command                    | What it does                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------- |
| `yarn nx serve docs`       | Serves the site at `localhost:3000` with hot reload.                                                    |
| `yarn nx build docs`       | Builds the site into `dist/apps/docs`. Fails on a broken internal link or heading link.                 |
| `yarn nx check-links docs` | Checks the external links and fails on a dead one. It's not part of the build. Run it before a release. |

Stop the dev server before you build. Both write to `apps/docs/.docusaurus`.

## Where pages live

The docs follow [Diátaxis](https://diataxis.fr). Every page is exactly one type. That's a tutorial, a how-to guide, reference or explanation.

```text
docs/
  start-here/        Orientation for new readers
  tutorials/         Lessons, for every package
  concepts/          Explanation, for every package
  packages/
    <package>/
      index.md       Landing page
      how-to/        Task guides
      reference/     API reference
      legacy/        Zone.js-era pages, only where needed
```

- Every package has a landing page, `how-to/` and `reference/`. Add `legacy/` only when the package has Zone.js-era pages.
- Explanation lives only in `concepts/`. A package has no explanation section of its own. Its landing page links to the concepts it relies on.
- Tutorials live only in `tutorials/`, even when they teach a single package.
- `legacy/` is a shelf, not a page type. It holds how-to and reference pages for apps still running Zone.js.

The packages are `state`, `template`, `cdk`, `isr`, `eslint-plugin` and `rebundle`. Each one appears in the front matter schema, Start here, the navbar Docs menu and the footer.

## Naming and addresses

A page's address is its folder plus its file name. `packages/isr/how-to/set-up-isr.md` is served at `/docs/packages/isr/how-to/set-up-isr`.

- Leave out `id` and `slug`. The file name decides the address.
- Landing pages are the exception. They're named `index.md`, which is served at the folder address, and they set `id: overview`.
- Use kebab case with no codes or numbers. Write `change-detection.md`, not `E1-change-detection.md`.

### Reference pages

A reference page is named after the main export it documents, in kebab case.

| Documents                                  | File name                       |
| ------------------------------------------ | ------------------------------- |
| `rxActions`                                | `rx-actions.md`                 |
| `RxVirtualScrollViewportComponent`         | `rx-virtual-scroll-viewport.md` |
| The `@rx-angular/cdk/coercing` entry point | `coercing.md`                   |
| `ISRHandlerConfig`                         | `isr-handler-config.md`         |

- Drop Angular class suffixes like `Component` and `Directive`.
- Skip the `-api` suffix and the package name. Keep the package name only when the export itself contains it, as in `isr-handler-config`.
- A page about a whole entry point takes the entry point's last path segment.
- When two exports differ only in case, the function takes the plain name and the class adds `-class`. `rxState` is `rx-state.md` and `RxState` is `rx-state-class.md`.
- The title is the exact export name, like `` `rxActions` ``.

### How-to pages

A how-to page is named after its task, starting with a verb. Its title starts with "How to".

| File name                | Title                                   |
| ------------------------ | --------------------------------------- |
| `set-up-isr.md`          | How to set up ISR in an SSR app         |
| `derive-a-view-model.md` | How to derive a view model from RxState |

### Concepts and tutorials

A concept is named after the idea it explains, like `change-detection.md`. A concept about how a package works inside uses `how-<package>-works`, like `how-isr-works.md`. A tutorial is named after what the reader builds, like `your-first-rxstate.md`.

In page text, refer to concepts and tutorials by title.

### Sidebar order

Set `sidebar_position` on every page, unique within its folder, so a rename keeps the sidebar order.

## Landing pages

Every package landing page has the same sections in this order.

1. A short intro that says what the package is for.
2. `## What it does` with the main features.
3. `## Install` with the install command.
4. `## Entry points`, when the package has more than one.
5. `## Where to go next` with links into How-to, Reference and the related concepts.

## Front matter

```yaml
---
title: 'How to set up ISR in an SSR app'
sidebar_label: 'Set up ISR'
sidebar_position: 1
diataxis_type: how-to
package: isr
legacy_guard: false
tags: [isr, guides]
concepts: [how-isr-works]
---
```

| Field              | Required           | Value                                                                                                             |
| ------------------ | ------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `title`            | yes                | The page title. On reference pages, the exact export name.                                                        |
| `sidebar_label`    | no                 | A shorter label for the sidebar.                                                                                  |
| `sidebar_position` | yes                | The order within the folder. Unique per folder.                                                                   |
| `diataxis_type`    | yes                | `tutorial`, `how-to`, `reference` or `explanation`. Landing pages use `reference`.                                |
| `package`          | yes                | `state`, `template`, `cdk`, `isr`, `eslint-plugin` or `rebundle`. Start here, tutorials and concepts use `_site`. |
| `legacy_guard`     | yes                | `false`, or the audience that still needs the page. See [Legacy pages](#legacy-pages).                            |
| `tags`             | no                 | Package names plus `guides`, `api-reference`, `examples`, `migration` or `tooling`.                               |
| `concepts`         | no                 | The file names of the concepts the page relies on, like `[change-detection]`.                                     |
| `id`               | landing pages only | `overview`                                                                                                        |

The version badge reads `package` to show the right package line.

## Legacy pages

A page for apps still running Zone.js lives in the package's `legacy/` folder.

- Set `legacy_guard` to its audience, like `'apps still running Zone.js'`. Describe the audience without version numbers.
- Open the page with the `<LegacyGuard>` box, using the same audience.
- Link the Zoneless and Zone.js concept.

ESLint rules stay in `reference/` even when they target Zone.js. The plugin links to their addresses.

## Links

- Link other pages with relative file links, like `[change detection](../../concepts/change-detection.md)`, not absolute `rx-angular.io` addresses. The build checks relative links and fails on a broken one.
- Link a heading by its generated ID, like `#where-to-go-next`. The build fails on a broken heading link too.

## Changing an address

A renamed, moved or removed page keeps its old address working.

1. Add a redirect from the old address to the new page in the redirect list in `docusaurus.config.js`.
2. Update any redirect that pointed at the old address.
3. Search the package sources and READMEs for links to the old address. Published packages keep their links for good, so the redirect has to stay.

## Versions

- Site versions are named after the Angular major, like `22.x`. A new site version starts with each Angular major.
- Every page shows a badge with the line of the package it documents. The ESLint plugin can show `3.x` while the site is on `22.x`.
- Keep package versions and dates out of page text. The badge shows the version, and a hard-coded number goes stale in every copied version.
