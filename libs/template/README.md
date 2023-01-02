# @rx-angular/template

[![npm](https://img.shields.io/npm/v/%40rx-angular%2Ftemplate.svg)](https://www.npmjs.com/package/%40rx-angular%2Ftemplate)
![rx-angular CI](https://github.com/rx-angular/rx-angular/workflows/rx-angular%20CI/badge.svg?branch=main)

> A lib for handling data streams in templates for high performance and ergonomic Angular UI's in large-scale applications

`@rx-angular/template` was specifically designed to help developers reduce the boilerplate in templates and have performant change detection rendering and provide a migration path to go full zone-less.

![template logo](https://raw.githubusercontent.com/rx-angular/rx-angular/main/libs/template/docs/images/template_logo.png)

## Sub Modules

- [LetDirective (\*rxLet)](https://rx-angular.io/docs/template/api/let-directive)
- [RxFor (\*rxFor)](https://rx-angular.io/docs/template/api/rx-for-directive)
- [RxIf (\*rxIf)](https://rx-angular.io/docs/template/api/rx-if-directive)
- [UnpatchDirective (unpatch)](https://rx-angular.io/docs/template/api/unpatch-directive)
- [PushPipe (`push`)](https://rx-angular.io/docs/template/api/push-pipe)

**Experimental features**

- [🧪 Viewport Priority (viewport-prio)](https://rx-angular.io/docs/template/api/experimental/viewport-prio-directive)

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

You can import each feature module individually.

```typescript
import { LetModule } from '@rx-angular/template/let';
import { ForModule } from '@rx-angular/template/for';
import { PushModule } from '@rx-angular/template/push';
import { UnpatchModule } from '@rx-angular/template/unpatch';

@NgModule({
  declarations: [...],
  imports: [ForModule, LetModule, PushModule, UnpatchModule],
})
export class MyModule {}
```

## Version Compatibility

| Angular                | RxJS                 | @rx-angular/template |
| ---------------------- | -------------------- | -------------------- |
| `14`                   | `^7.4.0`             | `> 1.0.0-beta.29`    |
| `^12.0.0` or `^13.0.0` | `^6.5.5` or `^7.4.0` | `> 1.0.0-beta.29`    |
| `^11.0.0`              | `^6.5.5`             | `<= 1.0.0-beta.29`   |

Regarding the compatibility with RxJS, we generally stick to the compatibilities of the Angular framework itself.
All the packages support RxJS versions `^6.5.5` || `^7.4.0`.
For more information about the compatibilities of Angular itself see this [gist](https://gist.github.com/LayZeeDK/c822cc812f75bb07b7c55d07ba2719b3).
