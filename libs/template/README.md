# @rx-angular/template

[![npm](https://img.shields.io/npm/v/%40rx-angular%2Ftemplate.svg)](https://www.npmjs.com/package/%40rx-angular%2Ftemplate)
![rx-angular CI](https://github.com/rx-angular/rx-angular/workflows/rx-angular%20CI/badge.svg?branch=master)
[![Coverage Status](https://raw.githubusercontent.com/rx-angular/rx-angular/github-pages/docs/test-coverage/template/jest-coverage-badge.svg)](https://rx-angular.github.io/rx-angular/test-coverage/template/lcov-report/index.html)

## Reactive Template Rendering for Angular

@rx-angular/template is a comprehensive toolset for fully reactive rendering in Angular.
It leverages the latest Browser APIs (while still being backwards compatible) to maximize the rendering performance and thus
the user experience of your angular application.
The functionalities are provided by
structural directives, pipes, RxJS operators, or imperative functions to manage the rendering in Angular.

![template logo](https://raw.githubusercontent.com/rx-angular/rx-angular/master/libs/template/docs/images/template_logo.png)

## Description

**@rx-angular/template** is nothing less than a revolution in `ChangeDetection` for angular applications.
Developers are provided with tools for high-performance rendering, which are operated by a broad and intuitive API.

The [LetDirective (`*rxLet`)](https://github.com/rx-angular/rx-angular/tree/master/libs/template/docs/api/let-directive.md) &
[PushPipe (`push`)](https://github.com/rx-angular/rx-angular/tree/master/libs/template/docs/push.md) focus
on template rendering, the coordination and optimization of `ChangeDetection` cycles. While the `PushPipe` is a
straight **drop in replacement** for the `AsyncPipe (async)`, the `LetDirective` will often provide a more
convenient way of managing reactive sources and lazy rendering of the view.

Using those with the default strategy ([Local Strategy](https://github.com/rx-angular/rx-angular/tree/master/libs/template/docs/render-strategies.md#local-strategy)) should already improve the rendering performance of
your application by a decent amount.

The applied optimization behavior is fully customizable by using built-in or
custom provided (_coming soon_) [RenderStrategies](https://github.com/rx-angular/rx-angular/tree/master/libs/template/docs/render-strategies.md).  
However, `RenderStrategies` are also meant to be as a tool developers can interact with inside
their components, giving you an even broader access to the rendering mechanisms of your application.
The API comes with imperative as well as reactive ways to manage renderings.
By default, changes get scoped, coalesced and scheduled using the latest browser APIs.
Beyond to the use of the scheduling APIs in the browser, local rendering of components is also
key for a smooth experience.

Additionally, @rx-angular/template provides some neat optimization tools such as
[unpatch](https://github.com/rx-angular/rx-angular/tree/master/libs/template/docs/unpatch.md) or
[viewport-prio](https://github.com/rx-angular/rx-angular/tree/master/libs/template/docs/viewport-prio.md) which in general will give you more control
about what changes are leading to re-renderings.

If you plan to improve your rendering performance to the maximum possible, there
are several techniques that need to be known and considered.

- [Coalescing, Scoped Coalescing & Scheduling](https://github.com/rx-angular/rx-angular/tree/master/libs/template/docs/concepts.md)
- [Rendering Issues in Angular](https://github.com/rx-angular/rx-angular/tree/master/libs/template/docs/performance-issues.md)

## Installation

`npm install --save @rx-angular/template`  
or  
`yarn add @rx-angular/template`

## API

[API Documentation](https://github.com/rx-angular/rx-angular/tree/master/libs/template/docs/api/overview.md)

## Basic setup

Importing `TemplateModule` to your Module (includes push, \*rxLet, unpatch).

```typescript
import { TemplateModule } from '@rx-angular/template';

@NgModule({
  declarations: [...],
  imports: [TemplateModule],
})
export class MyModule {}
```

Alternatively, you can import each feature module individually.

```typescript
import { LetModule, PushModule, ViewportPrioModule } from '@rx-angular/template';

@NgModule({
  declarations: [...],
  imports: [LetModule, PushModule, ViewportPrioModule],
})
export class MyModule {}
```

## Features

- Directives
  - [LetDirective (\*rxLet)](https://github.com/rx-angular/rx-angular/tree/master/libs/template/docs/api/let-directive.md)
  - [Viewport Priority (viewport-prio)](https://github.com/rx-angular/rx-angular/tree/master/libs/template/docs/viewport-prio.md)
  - [UnpatchEventsDirective (unpatch)](https://github.com/rx-angular/rx-angular/tree/master/libs/template/docs/unpatch.md)
- Pipes
  - [PushPipe (push)](https://github.com/rx-angular/rx-angular/tree/master/libs/template/docs/push.md)
- [Render Strategies](https://github.com/rx-angular/rx-angular/tree/master/libs/template/docs/render-strategies.md)
