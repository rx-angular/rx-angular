# Implementing Side Effects

1. Setup a variable to store the side-effect

```typescript
refreshListSideEffect$ = NEVER;
```

2. Show subscribe and connect

```typescript
refreshListSideEffect$ = this.refreshClick$.pipe(
  tap(() => this.store.dispatch(fetchRepositoryList({})))
);
```

3. extent side effect with refresh interval

```typescript
intervalRefreshTick$ = this.select(
  map(s => s.refreshInterval),
  switchMap(ms => timer(0, ms))
);
refreshListSideEffect$ = merge(this.refreshClicks, intervalRefreshTick$).pipe(
  tap(_ => this.store.dispatch(fetchRepositoryList({})))
);
```
