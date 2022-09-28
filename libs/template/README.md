# @rx-angular/template

[![npm](https://img.shields.io/npm/v/%40rx-angular%2Ftemplate.svg)](https://www.npmjs.com/package/%40rx-angular%2Ftemplate)
![rx-angular CI](https://github.com/rx-angular/rx-angular/workflows/rx-angular%20CI/badge.svg?branch=main)
[![Coverage Status](https://raw.githubusercontent.com/rx-angular/rx-angular/github-pages/docs/test-coverage/template/jest-coverage-badge.svg)](https://rx-angular.github.io/rx-angular/test-coverage/template/lcov-report/index.html)

## A lib for handling data streams in templates for high performance and ergonomic Angular UI's in large scale applications
@rx-angular/template was specifically designed to help developers reduce the boilerplate in templates and have performante change detection rendering and provide a migration path to go full zone-less.

![template logo](https://raw.githubusercontent.com/rx-angular/rx-angular/main/libs/template/docs/images/template_logo.png)

## Sub Modules

- [PushPipe (`push`)](https://github.com/rx-angular/rx-angular/tree/main/libs/template/docs/push.md)
- [LetDirective (`*rxLet`)](https://github.com/rx-angular/rx-angular/tree/main/libs/template/docs/api/let-directive.md) 
- [ForDirective (`*rxFor`)](https://github.com/rx-angular/rx-angular/tree/main/libs/template/docs/api/for-directive.md) 
- [TemplateDirective (`*rxTemplate`)](https://github.com/rx-angular/rx-angular/tree/main/libs/template/docs/api/template-directive.md) 
- [UnpatchEventsDirective (unpatch)](https://github.com/rx-angular/rx-angular/tree/main/libs/template/docs/experimental/unpatch.md)
 
**Experimental features**

- [🧪 IfDirective (`*rxIf`)](https://github.com/rx-angular/rx-angular/tree/main/libs/template/docs/api/if-directive.md) 
- [🧪 Viewport Priority (viewport-prio)](https://github.com/rx-angular/rx-angular/tree/main/libs/template/docs/experimental/viewport-prio.md)
 
All experimental features are very stable and already tested in production apps for multiple month. The reason to have them in experimental is so we can make small typing changes without breaking changes.
 
### Concepts

- [reactive context](https://github.com/rx-angular/rx-angular/tree/main/libs/template/docs/reactive-context.md)
- [context trigger]()
- [render strategies]()
- [render callback]()

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

If you are using `@rx-angular/template` already, please consider upgrading with the `@angular/cli update` command in order
to make sure all provided code migrations are processed properly.

```bash
ng update @rx-angular/template
# or with nx
nx migrate @rx-angular/template
```

## API

[API Documentation](https://github.com/rx-angular/rx-angular/tree/main/libs/template/docs/api/overview.md)

## Version Compatibility

| Angular                | RxJS                 | @rx-angular/template |
|------------------------|----------------------|----------------------|
| `14`                   | `^7.4.0`             | `> 1.0.0-beta.29`    |
| `^12.0.0` or `^13.0.0` | `^6.5.5` or `^7.4.0` | `> 1.0.0-beta.29`    |
| `^11.0.0`              | `^6.5.5`             | `<= 1.0.0-beta.29`   |


Regarding the compatibility to RxJs, we generally stick to the compatibilities of the angular framework itself.
All the packages support RxJs versions `^6.5.5` || `^7.4.0`.
For more information about the compatibilities of angular itself see this [gist](https://gist.github.com/LayZeeDK/c822cc812f75bb07b7c55d07ba2719b3)
