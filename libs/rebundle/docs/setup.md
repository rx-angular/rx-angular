# Getting Started

The optimizer acts as an esbuild plugin. It hooks into the build process, reads the metafile output to understand the generated module graph, and intelligently rebundles chunks in memory before they are written to disk. This avoids expensive re-transpilation.

# Angular CLI setup

Angular CLI projects need a builder that exposes Angular's esbuild plugin list. Angular's built-in `application` builder uses esbuild, but it does not provide a public `plugins` option.

Use the `@angular-builders/custom-esbuild:application` builder from [`@angular-builders/custom-esbuild`](https://github.com/just-jeb/angular-builders/tree/master/packages/custom-esbuild#custom-esbuild-application). It extends Angular's `application` builder and adds a `plugins` option for esbuild plugins.

At a high level, the setup is:

1. Install the chunk optimizer package and the custom esbuild builder.
2. Change the application's `build` target to `@angular-builders/custom-esbuild:application`.
3. Add a small esbuild plugin file that imports and exports the chunk optimizer.
4. Register that plugin file in the build target's `plugins` array.

Install the packages:

```bash
npm install --save-dev @angular-builders/custom-esbuild
npm install @rx-angular/rebundle
```

Update the application build target in `angular.json`.

```json title="angular.json"
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-esbuild:application",
          "options": {
            "plugins": ["@rx-angular/rebundle"]
            // other options
          }
        }
      }
    }
  }
}
```

For advanced configuration, see [Configuration](./merge-strategies/configuration.md).

# Nx Setup

Nx workspaces can use the provided Nx plugin to automate setup.

First add the package to the workspace:

```bash
nx add @rx-angular/rebundle
```

Then configure an Angular application project:

```bash
nx g @rx-angular/rebundle:configure --project=my-app
```

The configure generator installs any required dependencies and updates the selected project's build target so the chunk optimizer is registered as an esbuild plugin.

The resulting build target should include the plugin in its `plugins` array:

```json
{
  "targets": {
    "build": {
      "executor": "@nx/angular:application",
      "options": {
        "plugins": ["@rx-angular/rebundle"]
        // other options
      }
    }
  }
}
```

For advanced configuration, see [Configuration](./merge-strategies/configuration.md).
