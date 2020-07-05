# RenderStrategies

The `RenderStrategies` can be seen as the _core_ of the performance optimization layer. They utilize all
[`Concepts`](https://github.com/BioPhoton/rx-angular/tree/master/libs/template/docs/concepts.md) explained above in order to provide a streamlined and focused API to master
angular rendering and `ChangeDetection`.

## Usage

Use the corresponding `RenderStrategy#name` as parameter or Input with the `PushPipe` or `LetDirective`.
By default, they will use the [Local Strategy](https://github.com/BioPhoton/rx-angular/tree/master/libs/template/docs/viewport-prio.md).

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

## Built-in Strategies

![Template - RenderStrategies](https://raw.githubusercontent.com/BioPhoton/rx-angular/master/libs/template/images/template_rendering-strategies.png)

### Native Strategy

This strategy mirrors Angular's built-in `async` pipe.
This means for every emitted value `ChangeDetectorRef#markForCheck` is called.

| Name     | ZoneLess VE/I | Render Method VE/I | Coalescing VE/I |
| -------- | ------------- | ------------------ | --------------- |
| `native` | ❌/❌         | mFC / mFC          | ❌              |

### Noop

Noop Strategy

This strategy does nothing. It serves for debugging purposes or as a fine-grained performance optimization tool.
Use it with caution, since it stops `ChangeDetection` completely.

| Name   | ZoneLess VE/I | Render Method VE/I | Coalescing VE/I |
| ------ | ------------- | ------------------ | --------------- |
| `noop` | ❌/❌         | no rendering       | ❌              |

### Global Strategy

This strategy is rendering the application root and
all its children that are on a path
that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.

| Name     | ZoneLess VE/I | Render Method VE/I | Coalescing |
| -------- | ------------- | ------------------ | ---------- |
| `global` | ❌/✔️         | mFC / ɵMD          | ❌         |

### Local Strategy

This strategy is rendering the actual component and
all it's **children** that are on a path
that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.

As detectChanges is synchronous and has no built-in coalescing of rendering
like `ChangeDetectorRef#markForCheck` or `ɵmarkDirty` have, we have to apply our own coalescing.
It is also _scoped_ on the component level. (see [Concepts](https://github.com/BioPhoton/rx-angular/tree/master/libs/template/docs/concepts.md) for more information)

| Name    | ZoneLess VE/I | Render Method VE/I | Coalescing/Schedule    |
| ------- | ------------- | ------------------ | ---------------------- |
| `local` | ✔️/✔️         | dC / dC            | micro + animationFrame |

### Detach Strategy

The Detach Strategy shares its behavior with the **Local Strategy** . It can be seen as
the **Local Strategies** more aggressive brother. Instead of just rendering scheduled changes,
it will also `detach` (`ChangeDetectorRef#detach`) this very `ChangeDetectorRef` from the detection cycle.
Use this strategy at your own risk. It provides absolute **maximum performance** since your `Component` is
effectively resilient against re-renderings coming from any other source than itself. But it will come with
some down sights as you will see when using it :). Have fun!!

| Name     | ZoneLess VE/I | Render Method VE/I | Coalescing             |
| -------- | ------------- | ------------------ | ---------------------- |
| `detach` | ✔️/✔️         | dC / ɵDC           | micro + animationFrame |

## Custom Strategies

_coming soon_
