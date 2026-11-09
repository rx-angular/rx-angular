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
general/             Pages for the whole library, not versioned
  index.md           Start here, served at /docs
  tutorials/         Lessons, for every package
  concepts/          Explanation, for every package
packages/            One docs set per package, each with its own versions
  <package>/
    index.md         Landing page
    how-to/          Task guides
    reference/       API reference
    legacy/          Zone.js-era pages, only where needed
```

- Every package has a landing page, `how-to/` and `reference/`. Add `legacy/` only when the package has Zone.js-era pages.
- Explanation lives only in `concepts/`. A package has no explanation section of its own. Its landing page links to the concepts it relies on.
- Tutorials live only in `tutorials/`, even when they teach a single package.
- `legacy/` is a shelf, not a page type. It holds how-to and reference pages for apps still running Zone.js.
- Keep only published pages and `_category_.json` files in `general/` and `packages/`. Freezing a version copies the whole package folder. Start a new page from the matching template in `templates/`.

The packages are `state`, `template`, `cdk`, `isr`, `eslint-plugin` and `rebundle`. Each one appears in `docs-versions.js`, the `package` field below, Start here, the navbar Docs menu and the footer.

## Naming and addresses

A page's address is its folder plus its file name, under `/docs`. `packages/isr/how-to/set-up-isr.md` is served at `/docs/packages/isr/how-to/set-up-isr`, and `general/concepts/change-detection.md` at `/docs/concepts/change-detection`.

- Leave out `id` and `slug`. The file name decides the address.
- A folder's `index.md` is the exception. It's served at the folder address and sets `id: overview`. Every package landing page is one.
- Use kebab case with no codes or numbers. Write `change-detection.md`, not `E1-change-detection.md`.

### Reference pages

A reference page documents one of three things. Prefer the first kind that fits.

| Documents                              | Title                      | File name                  |
| -------------------------------------- | -------------------------- | -------------------------- |
| One export                             | `rxActions`                | `rx-actions.md`            |
| One export                             | `ISRHandlerConfig`         | `isr-handler-config.md`    |
| An entry point                         | `@rx-angular/cdk/coercing` | `coercing.md`              |
| A family of related exports or options | Concurrent strategies      | `concurrent-strategies.md` |

- The title of an export page is the exact export name. The title of an entry point page is the full entry point.
- The file name is the title in kebab case. An entry point page takes the entry point's last path segment.
- Drop Angular class suffixes like `Component` and `Directive`, so `RxVirtualScrollViewportComponent` is `rx-virtual-scroll-viewport.md`.
- Skip the `-api` suffix and the package name. Keep the package name only when the export itself contains it, as in `isr-handler-config`.
- When two exports differ only in case, the function takes the plain name and the class adds `-class`. `rxState` is `rx-state.md` and `RxState` is `rx-state-class.md`.

### How-to pages

A how-to page is named after its task or the feature it covers. Its title starts with "How to", and its `sidebar_label` is the short form.

| File name                 | Title                                                  | Sidebar label        |
| ------------------------- | ------------------------------------------------------ | -------------------- |
| `set-up-isr.md`           | How to set up ISR in an SSR app                        | Set up ISR           |
| `concurrent-rendering.md` | How to render heavy UI work without blocking the frame | Concurrent rendering |

### Concepts and tutorials

A concept is named after the idea it explains, like `change-detection.md`. A concept about how a package works inside uses `how-<package>-works`, like `how-isr-works.md`. A tutorial is named after what the reader builds, like `your-first-rxstate.md`.

In page text, refer to concepts and tutorials by title.

### Sidebar order

Set `sidebar_position` on every page, unique within its folder, so a rename keeps the sidebar order.

## Landing pages

Every package landing page uses these sections in this order. Keep the content a package already has and place it in the closest section.

1. The package name as the title, then a short intro that says what the package is, followed by its main features as a list.
2. `## When to use it` with when to reach for the package or not, and the benefits.
3. `## Install` with the install command and any setup notes.
4. `## Entry points`, when the package has more than one.
5. `## Quick look` with a short code sample, when one helps.
6. `## Where to go next` with links into How-to, Reference and the related concepts.

Notes that fit none of these, like the CDK's Zone.js history, go after Where to go next.

## Front matter

```yaml
---
title: 'How to set up ISR in an SSR app'
sidebar_label: 'Set up ISR'
sidebar_position: 1
package: isr
tags: [isr, guides]
---
```

| Field              | Required        | Value                                                                                                             |
| ------------------ | --------------- | ----------------------------------------------------------------------------------------------------------------- |
| `title`            | yes             | The page title. On reference pages, the exact export name.                                                        |
| `sidebar_label`    | no              | A shorter label for the sidebar.                                                                                  |
| `sidebar_position` | yes             | The order within the folder. Unique per folder.                                                                   |
| `package`          | yes             | `state`, `template`, `cdk`, `isr`, `eslint-plugin` or `rebundle`. Start here, tutorials and concepts use `_site`. |
| `tags`             | no              | Package names plus `guides`, `api-reference`, `examples`, `migration` or `tooling`.                               |
| `id`               | `index.md` only | `overview`                                                                                                        |

## Legacy pages

A page for apps still running Zone.js lives in the package's `legacy/` folder.

- Open the page with the `<LegacyGuard>` box and name its audience, like `audience="apps still running Zone.js"`. Describe the audience without version numbers.
- Link the Zoneless and Zone.js concept.

ESLint rules stay in `reference/` even when they target Zone.js. The plugin links to their addresses.

## Links

- Within one package, or within `general/`, link with relative file links, like `[rxState](../reference/rx-state.md)`.
- Between them, link with the page's address, like `[change detection](/docs/concepts/change-detection)`. Docusaurus resolves file links only inside one docs set.
- Leave out absolute `rx-angular.io` addresses. The build checks both kinds of links and fails on a broken one.
- Link a heading by its generated ID, like `#where-to-go-next`. The build fails on a broken heading link too.

## Changing an address

A renamed, moved or removed page keeps its old address working.

1. Add a redirect from the old address to the new page in `redirects.js`.
2. Update any redirect that pointed at the old address, so no redirect leads to another redirect.
3. Search the package sources and READMEs for links to the old address. Published packages keep their links for good, so the redirect has to stay.

## Versions

The docs of each package are versioned by major version, like `N.x`. Readers switch versions in the menu at the right of the navbar. Pages in `general/` aren't versioned and always describe the current packages.

### Version numbers in page text

Keep version numbers and dates out of page text, because they go stale with the next release. Two kinds of numbers are the exception.

- **Compatibility ranges.** Angular and peer ranges, like `@angular/core >=N.0.0`, stay in the text. Every old version keeps its own copy of the pages, so its ranges stay correct.
- **What a minor release added.** Mark a new export, option or behavior with the `<Since>` marker. Readers on an older minor version then know they need to upgrade.

```md
## `exampleExport`

<Since version="X.Y" />

- `exampleOption` <Since version="X.Y" /> turns on the new behavior.
```

- For a section, put the marker on its own line under the heading. Inside the heading it would change the heading's link.
- For an option or a list item, put it right after the name.
- Use the version of the page's own package, not the Angular version.
- Mark only additions. A changed default or a deprecation gets a sentence in the page text.
- Pages use the marker without an import.

### Start a new major version

Follow these steps when a package starts a new major version, before you change its pages for that version. Below, `<package>` is the package, `N.x` the version it leaves and `M.x` the new one.

1. Freeze the current pages with `yarn workspace docs docusaurus docs:version:<package> N.x`. It copies `packages/<package>/` to `<package>_versioned_docs/version-N.x/` and records the version in `<package>_versioned_sidebars/` and `<package>_versions.json`.
2. In `docs-versions.js`, set `<package>` to `M.x`.
3. Update the pages in `packages/<package>/` for `M.x`.
   - Update the Angular and peer ranges, and the Peers column on Start here in `general/index.md`.
   - Remove the `<Since>` markers. Every feature is now in the first release, and the frozen copy keeps them.
   - When a page goes away, redirect its address to the frozen copy in `redirects.js`, like `/docs/packages/<package>/N/how-to/<page>`.
4. Commit the new `<package>_versioned_*` files and `<package>_versions.json` with the rest of the change.

Once the change is deployed, the old version is served at `/docs/packages/<package>/N/...`. The address leaves out the `.x`, which some static hosts read as a file extension. Its pages show a banner that links to the current version. Search engines skip them, and site search still covers them.

To fix a page in an old version, edit its copy in `<package>_versioned_docs/version-N.x/`.
