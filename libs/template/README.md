# @rx-angular/template

[![npm](https://img.shields.io/npm/v/%40rx-angular%2Ftemplate.svg)](https://www.npmjs.com/package/%40rx-angular%2Ftemplate)
![rx-angular CI](https://github.com/rx-angular/rx-angular/workflows/rx-angular%20CI/badge.svg?branch=main)
[![codecov](https://codecov.io/gh/rx-angular/rx-angular/branch/main/graph/badge.svg?token=Jxy4xLJSs1&flag=template)](https://codecov.io/gh/rx-angular/rx-angular)

> A lib for handling data streams in templates for high performance and ergonomic Angular UI's in large-scale applications

`@rx-angular/template` was specifically designed to help developers reduce the boilerplate in templates and have performant change detection rendering and provide a migration path to go full zone-less.

![template logo](https://raw.githubusercontent.com/rx-angular/rx-angular/main/libs/template/docs/images/template_logo.png)

## Sub Modules

- [LetDirective (\*rxLet)](https://rx-angular.io/docs/template/api/let-directive)
- [RxFor (\*rxFor)](https://rx-angular.io/docs/template/api/rx-for-directive)
- [RxIf (\*rxIf)](https://rx-angular.io/docs/template/api/rx-if-directive)
- [UnpatchDirective (unpatch)](https://rx-angular.io/docs/template/api/unpatch-directive)
- [PushPipe (push)](https://rx-angular.io/docs/template/api/push-pipe)

**Experimental features**

- [🧪 Virtual Scrolling (virtual-scrolling)](https://www.rx-angular.io/docs/template/api/virtual-scrolling)
- [🧪 Viewport Priority (viewport-prio)](https://rx-angular.io/docs/template/api/viewport-prio-directive)

All experimental features are very stable and already tested in production apps for multiple months. The reason to have them in experimental is so we can make small typing changes without breaking changes.

### Concepts

- [reactive context](https://rx-angular.io/docs/template/concepts/reactive-context)
- [local templates](https://rx-angular.io/docs/template/concepts/local-templates)
- [local variables](https://rx-angular.io/docs/template/concepts/local-variables)
- [render strategies](https://rx-angular.io/docs/cdk/render-strategies)
- [Coalescing](https://rx-angular.io/docs/cdk/coalescing)
- [Coercing](https://rx-angular.io/docs/cdk/coercing)
- [Scheduling](https://rx-angular.io/docs/cdk/render-strategies/strategies/concurrent-strategies#scheduling)
- [Rendering Issues in Angular](https://rx-angular.io/docs/template/performance-issues)

## Installation

Using schematics:

```bash
ng add @rx-angular/template
# or
nx add @rx-angular/template
```

Manually:

```bash
npm install --save @rx-angular/template @rx-angular/cdk
# or
yarn add @rx-angular/template @rx-angular/cdk
```

## Update

If you are using `@rx-angular/template` already, please consider upgrading with the `@angular/cli update` command in order to make sure all provided code migrations are processed properly.

```bash
ng update @rx-angular/template
# or with nx
nx migrate @rx-angular/template
```

## API

[API Documentation](https://rx-angular.io/docs/template/api)

## Basic setup

You can import each feature individually.

```typescript
import { LetDirective } from '@rx-angular/template/let';
import { RxFor } from '@rx-angular/template/for';
import { RxIf } from '@rx-angular/template/if';
import { PushPipe } from '@rx-angular/template/push';
import { UnpatchDirective } from '@rx-angular/template/unpatch';

@Component({
  standalone: true,
  imports: [LetDirective, RxFor, RxIf, PushPipe, UnpatchDirective],
  template: `...`,
})
export class AnyComponent {}
```

## Version Compatibility

| RxAngular | Angular    |
| --------- | ---------- |
| `^1.0.0`  | `>=12.0.0` |
| `^2.0.0`  | `>=13.0.0` |
| `^14.0.0` | `^14.0.0`  |
| `^15.0.0` | `^15.0.0`  |

Regarding the compatibility with RxJS, we generally stick to the compatibilities of the Angular framework itself, for more information about the compatibilities of Angular itself see the [official guide](https://angular.io/guide/versions).
