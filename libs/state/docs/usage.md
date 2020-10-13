## Basic Setup

### Compose

The default way of using the `RxState` service is by `providing` a local instance bound to the components' lifecycle.
This way you have full control about the API and what you want to expose.

```typescript
@Component({
  selector: 'app-stateful',
  template: ` <div>{{ state$ | async | json }}</div> `,
  providers: [RxState],
})
export class StatefulComponent {
  readonly state$ = this.state.select();

  constructor(private state: RxState<{ foo: string }>) {}
}
```

### Inherit

If you wish, there is also the possibility of **extending** the `RxState` service. This can come in very handy for small
components. Keep in mind you will expose the full `RxState` API to everyone having access to the component extending it.

```typescript
@Directive({
  selector: '[appStateful]',
})
export class StatefulComponent extends RxState<{ foo: number }> {
  readonly state$ = this.select();

  constructor() {
    super();
  }
}
```

## Connect global state

**Connect state slices from third party services (e.g. NgRx `Store`) or trigger them from side-effects**

Many people have problems combining observables with the component state in a clean way.
er a usecase where the @ngrx/store gets connected to the local state:

```typescript
@Component({
  selector: 'app-stateful',
  template: ` <div>{{ (state$ | async).count }}</div> `,
  providers: [RxState],
})
export class StatefulComponent {
  readonly state$ = this.state.select();

  constructor(
    private state: RxState<{ count: number }>,
    private store: Store<AppState>
  ) {
    state.connect('count', store.select('count'));
  }
}
```

## Input Property Bindings

**Combining `Input` bindings passing single values with RxState**

```typescript
@Component({
  selector: 'app-stateful',
  template: ` <div>{{ title$ | async }}</div> `,
  providers: [RxState],
})
export class StatefulComponent {
  readonly title$ = this.state.select('title');

  @Input() set title(title: string) {
    this.state.set({ title });
  }

  constructor(private state: RxState<{ title: string }>) {}
}
```

**Combining `Input` bindings passing Observables with RxState**

**You can 1 change detection per emission** and improve performance of your app
by providing `Observables` directly as `Input`.
This way the ChangeDetection for the `Input` binding will only fire once for the first assignment.

---

```typescript
const initialState: ComponentState = {
  title: 'MyComponent',
  showButton: false,
  count: 0,
};

@Component({
  selector: 'app-stateful',
  template: ` <div>{{ (state$ | async).count }}</div> `,
  providers: [RxState],
})
export class StatefulComponent {
  @Input() set config(count$: Observable<ComponentStateInput>) {
    this.state.connect('count', count$);
  }
  constructor(private state: RxState<{ count: number }>) {}
}
```

## Output Property Bindings

**Combining `Output` bindings directly from RxState**

```typescript
@Component({
  selector: 'app-stateful',
  template: ` <div (click)="onClick($event)">Increment</div> `,
  providers: [RxState],
})
export class StatefulComponent {
  @Output() countChange = this.state.$.pipe(select('count'));

  constructor(private state: RxState<{ count: number }>) {}

  onClick() {
    this.state.set(({ count }) => {
      count: count++;
    });
  }
}
```

## Updates based on previous state

Often it is needed to get the previous state to calculate the new one.

```typescript
@Component({
   selector: 'app-stateful',
   template: `<ul>
               <li *ngFor="let item of items$ | async">
                 {{ item }} <button (click)="btnClick$.next(item.id)">remove<button>
               </li>
             </ul>
   `,
   providers: [RxState]
})
export class StatefulComponent {
   readonly items$ = this.state.select('items');
   readonly btnClick$ = new Subject();

   constructor(private state: RxState<{list: {id: number}}>) {
     this.state.connect(
       this.btnClick$, (state, id) => {
         return {
           ...state,
           list: state.list.filter(i => i.id !== id)
       }
     );
   }
}
```

## Usage with services

If you strive for a more sophisticated **separation of concerns** you can `extend` the `RxState` in a
locally provided `Service`.

Create a local `Service` by `extending` the `RxState`

```typescript
interface StatefulComponentState {
  foo: number;
}
@Injectable()
export class StatefulComponentService extends RxState<StatefulComponentState> {
  readonly state$ = this.select();

  constructor() {
    super();
  }
}
```

`Provide` the `Service` inside the using `Component` or `Directive`

```typescript
@Component({
  selector: 'app-stateful',
  template: ` <div>{{ viewState$ | async | json }}</div> `,
  providers: [StatefulComponentService],
})
export class StatefulComponent {
  readonly viewState$ = this.state.state$;

  constructor(private state: StatefulComponentService) {}
}
```

## setAccumulator and deep-copying state 

Use `setAccumulator` to update state via deep-copies.

```typescript
const myAccumulator = (state: MyState, slice: Partial<MyState>) => deepCopy(state, slice);
this.state.setAccumulator(myAccumulator);
```

This can be done at runtime. 


_disclaimer_: this doc is work in progress. Not every use case has found it's way into the docs. We encourage you to contribute :).
