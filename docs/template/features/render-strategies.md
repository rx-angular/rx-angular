# RenderStrategies

The `RenderStrategies` can be seen as the _core_ of the performance optimization layer. They utilize all
[`Concepts`](template/theory/concepts.md) explained above in order to provide a streamlined and focused API to master
angular rendering and `ChangeDetection`.

## Usage

Use the corresponding `RenderStrategy#name` as parameter or Input with the `PushPipe` or `LetDirective`.
By default, they will use the `Local Strategy`.

```html
<div *rxLet="list$; let list; strategy: 'global'"></div>
<hero-list heroes="list$ | push: 'global'"></hero-list>
```

When you want to handle `ChangeDetection` manually inside a `Component`, `Directive` or `Service`, you can
simply use the built-in `StrategySelection`.

_imperative approach_

```typescript
import { Component, ChangeDetectorRef } from '@angular/core';
import { getStrategies } from '@rx-angular/template';

@Component()
export class PerformanceAwareComponent {
  constructor(private cdRef: ChangeDetectorRef) {
    const strategies = getStrategies({ cdRef });
    // now select your desired strategy:
    const detachStrategy = strategies.detach;
    // schedule a re-render:
    detachStrategy.scheduleCD();
    // render synchronously:
    detachStrategy.renderMethod();
  }
}
```

# Built-in Strategies

![Template - RenderStrategies](../../../images/template/template_rendering-strategies.png)

## Local Strategy

This strategy is rendering the actual component and
all it's **children** that are on a path
that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.

As detectChanges is synchronous and has no built-in coalescing of rendering
like `ChangeDetectorRef#markForCheck` or `ɵmarkDirty` have, we have to apply our own coalescing.
It is also _scoped_ on the component level. (see [Concepts](template/theory/concepts.md) for more information)

| Name    | ZoneLess VE/I | Render Method VE/I | Coalescing/Schedule    |
| ------- | ------------- | ------------------ | ---------------------- |
| `local` | ✔️/✔️         | dC / dC            | micro + animationFrame |

## Native Strategy

This strategy mirrors Angular's built-in `async` pipe.
This means for every emitted value `ChangeDetectorRef#markForCheck` is called.

| Name     | ZoneLess VE/I | Render Method VE/I | Coalescing VE/I |
| -------- | ------------- | ------------------ | --------------- |
| `native` | ❌/❌         | mFC / mFC          | ❌              |

## Global Strategy

This strategy is rendering the application root and
all its children that are on a path
that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.

| Name     | ZoneLess VE/I | Render Method VE/I | Coalescing |
| -------- | ------------- | ------------------ | ---------- |
| `global` | ❌/✔️         | mFC / ɵMD          | ❌         |

## Noop

Noop Strategy

This strategy does nothing. It serves for debugging purposes or as a fine-grained performance optimization tool.
Use it with caution, since it stops `ChangeDetection` completely.

| Name   | ZoneLess VE/I | Render Method VE/I | Coalescing VE/I |
| ------ | ------------- | ------------------ | --------------- |
| `noop` | ❌/❌         | no rendering       | ❌              |
