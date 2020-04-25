# Implementing state, selections and UI interaction

0. Implement reactive template helpers (push pipe)

```html
{{storeList$ | push}}}
```

0.1 finetune with strategies

```html
{{storeList$ | push: 'local'}}}
```

1. Implement RxState Service ComponentState by extending the RxState class.

```typescript
export class DemoBasicsComponent2 extends RxState<ComponentState>
```

1.1) Select component State

```typescript
model$ = this.select();
```

2.1) Initialize component state

```typescript
 constructor(...) {
  ...
  this.setState(initComponentState);
}
```

2.2) Connect input bindings

```typescript
 @Input()
set refreshInterval(refreshInterval: number) {
    if (refreshInterval > 100) {
        this.setState({refreshInterval});
    }
}
```

2.3) Connect state from child components ( listExpandedChanges => listExpanded )

```typescript
this.connect(this.listExpandedChanges.pipe(map(b => ({ listExpanded: b }))));
```

2.4) Connect Global state (selectRepositoryList -> parseListItems => list)

```typescript
this.connect(
  'list',
  this.store.select(selectRepositoryList).pipe(map(this.parseListItems))
);
```

3. Connect Outputs
