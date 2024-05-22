# How to release

## 1. Prerequisites

### 1.1 Install dependencies

Install [GitHub CLI](https://cli.github.com/) on your machine.

### 1.2 Authenticate to GitHub and NPM

- Login to NPM using `npm login`
- Login to GitHub using `gh auth login`

### 1.3 Update the repository

- Checkout `main` branch and pull latest changes
- Run `yarn install`

## 2. Testing the release

To make sure you get the version and the changelog you expect it's recommended to run semver in dry mode:

```
nx version state --dryRun
```

## 3. Release

> [!WARNING]
> It's important to run `nx` without `yarn` to publish, you can use `nx` globally or `npx`.

Now that you have validated the release you can actually publish, the following command will commit, tag, push, create a GitHub Release and finally publish on NPM:

```
nx publish state --skipNxCache
```

or:

```
npx nx publish state --skipNxCache
```

Projects are released independently, meaning that you have to repeat the process for each project: `state`, `template`, `eslint-plugin`, and `cdk`.

> [!NOTE]
> If you want to release a major version, it is important to update the peer dependencies accordingly. For instance the `template` project has a peer dependency on `cdk`, so it is necessary to bump the peer dependency in a separate commit before releasing `template`.
