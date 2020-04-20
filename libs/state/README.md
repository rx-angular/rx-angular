# ngx-rx-state

[![ngx-rx](https://circleci.com/gh/BioPhoton/ngx-rx.svg?style=shield)](https://circleci.com/gh/BioPhoton/ngx-rx)

#### Reactive Component State for Angular

RxState is a light-weight reactive state management service especially useful for component state in Angular.
Furthermore a global service is provided and can act as a small global state manager.

![ngx-rx-state logo](https://raw.githubusercontent.com/BioPhoton/ngx-rx/master/libs/ngx-rx-state/images/ngx-rx-state_logo.png)

## Description

In most of the component-oriented applications, there is the need to structure container components.
Even after a well thought refactoring into more display components and grouping logic into responsibilities it's always hard to handle.

The data structure you manage inside these components is only here for their very component. Not for any other components.
This data structure appears with the component and disappears when the component is removed.

This is a good example of component state.

This library helps to organize component state reactively.

**Features**

- Better rendering performance (using `OnPush`)
- Component State Management (Also a global service is provided `RxGlobalState`)
- **Subscription-less coding**
- Lazy state. No initial state needed.
- Lifecycle independent programming
- State queries are automatically cached
- Automated subscription handling
- Foundation for Zone-Less applications
- Slim and intuitive API
- Fully typed and tested

**Resources**

Videos:

- [🎥 Tackling Component State Reactively (Live Demo at 24:47)](https://www.youtube.com/watch?v=I8uaHMs8rw0)

Articles:

- [💾 Research on Reactive Ephemeral State](https://dev.to/rxjs/research-on-reactive-ephemeral-state-in-component-oriented-frameworks-38lk)

Design Documents

- [💾 Design Documents](https://hackmd.io/wVkWRc3XQWmtM6YcktRTrA)

Usage in the wild

- [Fully-reactive Zone-Less Angular/Ionic Progressive Web Application](https://startrack-ng.web.app/search) by [Mike Hartington](https://twitter.com/mhartington)
- [Repository Demo](https://github.com/BioPhoton/ngx-rx/tree/master/apps/ngx-rx-state-demo)

---

TOC

- Install
- Setup
- API
- Usage in Angular

---

## Install

`npm install --save ngx-rx-state`

## Setup

As the RxState class is just a plain vanilla Javascript Class

```typescript
import { RxState } from '@ngx-rx-state';

interface MyState {
  foo: string;
  bar: number;
  loo: {
    boo: string;
    baz: number;
  };
}

const state = new RxState<MyState>();
```

## API
![ngx-rx-state logo](https://raw.githubusercontent.com/BioPhoton/ngx-rx/master/libs/ngx-rx-state/images/ngx-rx-state_API-names.png)

The API in a nutshell
- `$` - The complete state observable
- `set` - Set state imperatively
- `connect` - Connect state reactively 
- `get` - Get current state imperatively
- `select` - Select state changes reactively
- `hold` - maintaining the subscription of a side effect

The best practices in a nutshell
- **Don't nest one of `set`, `connect`, `get`, `select` or `hold` into each other**
- Use `connect` over `set` 
- In most of the cases `get` is not needed. The old state is always available.



### set

**Add new slices to the state by providing an object**

```typescript
const state = new RxState<{ foo: string; bar: number }>();
state.setState({ foo: 'boo' });
// new base-state => { foo: 'boo' }

state.setState({ bar: 2 });
// new base-state => { foo: 'boo', bar: 2 }
```

**Add new Slices to the state by providing a projection function**

```typescript
const state = new RxState<{ bar: number }>();

state.setState({ bar: 1 });
state.setState(currentState => ({ bar: currentState.bar + 2 }));
// new base-state => {bar: 3}
```

### connect

Connect is one of the really cool thingy of this service.
It helps to write the output of an `Observable` to the state and  
handles subscription as well as unsubscription.

**Connect to a single property**

To understand that lets take a look at a normal implementation first:

```typescript
const state = new RxState<{ bar: number }>();

const newBar$ = range(1, 5);
const subscription = newBar$.subscribe(bar => state.setState({ bar }));
subscription.unsubscribe();
```

Now lets compare that example with the connect usage:

```typescript
state.connect('bar', newBar$);
// the property bar will get values 1, 2, 3, 4, 5
```

**Connect multiple properties**

```typescript
const state = new RxState<{ foo: string; bar: number }>();

const slice$ = of({
  bar: 5,
  foo: 'foo'
});
state.connect(slice$);
// new base-state => { foo: 'foo', bar: 5}
```

### select

Selecting state and extend the selection behavior with RxJS operators.
Other state management libs provide selector functions like react. The downside is they are not compossable.
`RxState` provides state selection fully reactive.

**State is lazy!**

State is lazy! If nothing is set yet, nothing will emit.
This comes in especially handy for lazy view rendering!

```typescript
const state = new RxState<{ foo: string; bar: number }>();

const bar$ = state.select();
bar$.subscribe(console.log);
// Never emits
```

**Selecting the full state**

```typescript
const state = new RxState<{ foo: string; bar: number }>();

const bar$ = state.select();
bar$.subscribe(console.log);
// Does not emit
state.setState({ foo: 'boo' });
// emits { foo: 'boo'} for all old ane new subscriber
```

**Access a single property**

```typescript
const state = new RxState<{ bar: number }>();
state.setState({ bar: 3 });

const bar$ = state.select('bar');
bar$.subscribe(console.log); // 3
```

**Access a nested property**

```typescript
const state = new RxState<{ loo: { boo: number } }>();
state.setState({ loo: { boo: 42 } });

const boo$ = state.select('loo', 'boo');
boo$.subscribe(console.log); // '42'
```

**Access by providing rxjs operators**

```typescript
const state = new RxState<{ loo: { bar: string } }>();
state.setState({ bar: 'boo' });

const customProp$ = state.select(map(state => state?.loo?.bar));
customProp$.subscribe(console.log); // 'boo'

const customProp$ = state.select(map(state => ({ customProp: state.bar })));
customProp$.subscribe(console.log); // { customProp: 'boo' }
```

### hold

Managing side effects is core of every application.
The `hold` method takes care of handling them.

It helps to handles subscription as well as unsubscription od side-effects

**Hold a local observable side-effect**

To understand that lets take a look at a normal implementation first:

```typescript
const sideEffect$ = btnClick$.pipe(
  tap(clickEvent => this.store.dispatch(loadAction()))
);
const subscription = sideEffect$.subscribe();
subscription.unsubscribe();
```

If you would hold to achieve the same thing it would look like this:

```typescript
state.hold(sideEffect$);
```

**Connect an observable trigger and provide an project function**

```typescript
import { fromEvent } from 'rxjs/observable';
state.hold(btnClick$, clickEvent => console.log(clickEvent));
```

---

## Usage in Angular applications

### Basic Setup

**Provide the `RxState` inside a `Component` or `Directive` and `Inject` it**

```typescript
@Component({
  selector: 'app-stateful',
  template: `
    <div>{{ state$ | async | json }}</div>
  `,
  providers: [RxState]
})
export class StatefulComponent {
  readonly state$ = this.state.select();

  constructor(private state: RxState<{ foo: string }>) {}
}
```

In very small components you can also extend to keep the api short.

**Extend from the `RxState` inside a `Component`, `Directive` or `Service`**

```typescript
@Component({
  selector: 'app-stateful',
  template: `
    <div>{{ state$ | async | json }}</div>
  `
})
export class StatefulComponent extends RxState<{ foo: number }> {
  readonly state$ = this.select();

  constructor() {
    super();
  }
}
```

### Connecting services

**Connect state slices from third party services (e.g. NgRx `Store`) or trigger them from side-effects**

Many people have problems combining observables with the component state in a clean way.
er a usecase where the @ngrx/store gets connected to the local state:

```typescript
@Component({
  selector: 'app-stateful',
  template: `
    <div>{{ (state$ | async).counter }}</div>
  `,
  providers: [RxState]
})
export class StatefulComponent {
  readonly state$ = this.state.select();

  constructor(
    private state: RxState<{ counter: number }>,
    private store: Store<AppState>
  ) {
    state.connect('counter', store.select('counter'));
  }
}
```

### Input Property Bindings

**Combining `Input` bindings passing single values with RxState**

```typescript
@Component({
  selector: 'app-stateful',
  template: `
    <div>{{ title$ | async }}</div>
  `,
  providers: [RxState]
})
export class StatefulComponent {
  readonly title$ = this.select('title');

  @Input() set title(title: string) {
    this.state.setState({ title });
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
  counter: 0
};

@Component({
  selector: 'app-stateful',
  template: `
    <div>{{ (state$ | async).counter }}</div>
  `,
  providers: [RxState]
})
export class StatefulComponent {
  @Input() set config(count$: Observable<ComponentStateInput>) {
    this.state.connect('count', count$);
  }
  constructor(private state: RxState<{ count: number }>) {}
}
```

### Output Property Bindings

**Combining `Output` bindings directly from RxState**

```typescript
@Component({
  selector: 'app-stateful',
  template: `
    <div (click)="">Click</div>
  `,
  providers: [RxState]
})
export class StatefulComponent {
  @Output() count = this.state.select('count');

  constructor(private state: RxState<{ count: number }>) {}
}
```

### Updates based on previous state

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
   readonly items$ = this.select('items');
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
