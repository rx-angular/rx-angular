# How to release

Releases are done via two manually triggered GitHub Actions workflows.
Projects are released independently using [Nx Release](https://nx.dev/features/manage-releases) with conventional commits.

## 1. Version & Release — `release.yml`

This workflow versions all release projects based on conventional commits, generates changelogs, creates git commits/tags, and publishes GitHub Releases.

1. Go to **Actions** → **Release** → **Run workflow**
2. Select the `main` branch and trigger the workflow

Under the hood it runs:

```
npx nx release --skip-publish
```

This will:

- Determine version bumps from conventional commits
- Update `package.json` versions
- Generate project changelogs
- Commit, tag, and push
- Create GitHub Releases

## 2. Publish to npm — `publish.yml`

After the release workflow has completed successfully, publish the packages to npm.

1. Go to **Actions** → **Publish** → **Run workflow**
2. Trigger the workflow

Under the hood it runs:

```
npx nx release publish
```

Packages are built automatically before publishing (`dependsOn: ["build"]`).
npm authentication uses OIDC trusted publishers — no npm token needed.

## Release projects

The following projects are part of the release:

- `cdk`
- `template`
- `isr`
- `state`
- `eslint-plugin`

This is configured in `nx.json` under `release.projects`.

## Notes

- Both workflows are manually triggered (`workflow_dispatch`).
- Always run **Release** first, then **Publish**.
- For major version bumps, update peer dependencies (e.g. `template` depends on `cdk`) in a separate commit before releasing.
