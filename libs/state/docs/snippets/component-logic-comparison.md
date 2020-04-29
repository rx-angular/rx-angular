# Increment

**Imperative**

```typescript
@Component({
  selector: 'my-comp',
  template: `
    <div>{{ state.count }}</div>
    <button (click)="onClick($event)">Increment</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponent {
  state: { count: number } = {};
  onClick(e) {
    this.state.count = this.state.count + 1;
  }
}
```

## Reactive reading

```typescript
@Component({
  selector: 'my-comp',
  template: `
    <div *ngrxLet="state$; let s">{{ s.count }}</div>
    <button (click)="onClick($event)">Increment</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponent extends RxState<{ count: number }> {
  state$ = this.select();
  onClick(e) {
    this.seState('count', s => s.count + 1);
  }
}
```

**Reactive Writing**

```typescript
@Component({
  selector: 'my-comp',
  template: `
    <div *ngrxLet="state$; let s">{{ s.count }}</div>
    <button (click)="btn$.next($event)">Increment</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponent extends RxState<{ count: number }> {
  state$ = this.select();
  btn$ = new Subject();
  constructor() {
    this.connect(btn$, (s, e) => ({ count: s.count + 1 }));
  }
}
```
