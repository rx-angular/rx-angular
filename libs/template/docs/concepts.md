# Concepts

A brief overview about the internal concepts used in this package.

## Coalescing

Coalescing, in this very manner, means _collecting all events_ in the same
[EventLoop](https://developer.mozilla.org/de/docs/Web/JavaScript/EventLoop) tick,
that would cause a re-rendering and execute **re-rendering only once**.

![Coalescing](https://raw.githubusercontent.com/rx-angular/rx-angular/master/libs/template/images/coalescing.png)

## Scoped Coalescing

Scoped Coalescing, in addition, means **grouping the collected events** by a specific context.
E.g. the **component** from which the re-rendering was initiated.

## Scheduling

Coalescing provides us a way to gather multiple re-renderings to a single point of execution. Scheduling in this
the case means searching for the very **optimized** point in time when to really _execute rendering_.

![Scheduling Options](https://raw.githubusercontent.com/rx-angular/rx-angular/master/libs/template/images/scheduling-options.png)
