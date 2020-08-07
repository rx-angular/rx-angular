# Initializing state

As `RxState` is empty and thus lazy on initialization, we can decide which and if we put values to state initially.
We can initialize the state imperatively over `set` or over a observable and the `connect()` method.

We will use `set` as we already have initial values as `initComponentState` object.

```typescript
 constructor(...) {
  ...
  this.set(initComponentState);
}
```
