# ngx-rx-state

#### Reactive Component State for Angular

RxState is a light-weight reactive state management service which is especially useful to organize component state in Angular.
Furthermore a global service is provided and can act as a small global state manager.

## Description

In most of the component-oriented applications, there is the need to structure container components.
Even after a well thought refactoring into more display components and grouping logic into responsibilities it's always hard to handle.

The data structure you manage inside these components is only here for their very component. Not for any other components.
This data structure appears with the component and disappears when the component is removed.

This is a good example of component state.  

This library helps to organize component state reactively.

**Features**
- Component State Management (Also a global service is provided)
- Subscription-less coding
- State lifetime tied to component lifetime
- Lifecycle independent state composition
- Slim and intuitive API
- Fully typed and tested

**Information Video**  
([🎥 Live Demo at 24:47](https://www.youtube.com/watch?v=I8uaHMs8rw0&t=24m47s))


**NPM Package**  
[📦 ngx-rx-state](https://github.com/BioPhoton/ngx-rx/tree/master/libs/ngx-rx-state)  

**Sourcecode**  
[📦 ngx-rx/rxjs-state](https://github.com/BioPhoton/ngx-rx/tree/master/libs/rxjs-state)  

**Research**  
 ([💾 Reactive Ephemeral State](https://dev.to/rxjs/research-on-reactive-ephemeral-state-in-component-oriented-frameworks-38lk)

**Usage in the wild**
- [fully-reactive zone-less Angular/Ionic App](https://startrack-ng.web.app/search)

---


## Setup
As the RxState class is just a plain vanilla Javascript Class

 ```typescript
import { RxState } from 'rxjs-state';

interface MyState {
    foo: string;
    bar: number;
    loo: {
        boo: string;
        baz: number;
    }
}

const state = new RxState<MyState>();
```

## API

### setState

**Add new slices to the state by providing an object**

 ```typescript
const state = new RxState<{ foo: string, bar: number }>();
state.setState({ foo: 'boo' });
// new state => { foo: 'boo' }

state.setState({ bar: 2 });
// new state => { foo: 'boo', bar: 2 }
```

**Add new Slices to the state by providing a projection function**

```typescript
const state = new RxState<{bar: number}>();

state.setState({bar: 1});
state.setState(currentState => ({ bar: currentState.bar + 2 }));
// new state => {bar: 3}
```

### connect
Connect is one of the really cool thingy of this service.
It helps to write the output of an `Observable` to the state and  
handles subscription as well as unsubscription.

**Connect to a single property**

To understand that lets take a look at a normal implementation first:

 ```typescript
const state = new RxState<{bar: number}>();

const newBar$ = range(1, 5);
const subscription = newBar$
.subscribe(bar => state.setState({bar}));
subscription.unsubscribe();
```

Now lets compare that example with the connect usage:
 ```typescript
state.connect('bar', newBar$);
// the property bar will get values 1, 2, 3, 4, 5
```

**Connect multiple properties**

 ```typescript
const state = new RxState<{foo: string, bar: number}>();

const slice$ = of({
    bar: 5,
    foo: 'foo'
});
state.connect(slice$);
// new state => { foo: 'foo', bar: 5}
```

### select
Selecting state and extend the selection behavior with RxJS operators. 
Other state management libs provide selector functions like react. The downside is they are not compossable.
`RxState` provides state selection fully reactive.

**State is lazy!**

State is lazy! If nothing is set yet, nothing will emit.
This comes in especially handy for lazy view rendering!

 ```typescript
const state = new RxState<{foo: string, bar: number}>();

const bar$ = state.select();
bar$.subscribe(console.log);
// Never emits
```

**Selecting the full state**
 ```typescript
const state = new RxState<{foo: string, bar: number}>();

const bar$ = state.select();
bar$.subscribe(console.log);
// Does not emit
state.setState({foo: 'boo'});
// emits { foo: 'boo'} for all old ane new subscriber
```

**Access a single property**
 ```typescript
const state = new RxState<{bar: number}>();
state.setState({bar: 3});

const bar$ = state.select('bar');
bar$.subscribe(console.log); // 3
```

**Access a nested property**
 ```typescript
const state = new RxState<{loo: { boo: number}}>();
state.setState({loo: { boo: 42}});

const boo$ = state.select('loo', 'boo');
boo$.subscribe(console.log); // '42'
```

**Access by providing rxjs operators**
 ```typescript
const state = new RxState<{loo: { bar: string}}>();
state.setState({bar: 'boo'});

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
const subscription = sideEffect$
  .subscribe(); 
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

**Extend from the `RxState` inside a `Component`, `Directive` or `Service`**

 ```typescript
@Component({
    selector: 'app-stateful',
    template: `<div>{{ state$ | async | json }}</div>`
})
export class StatefulComponent extends RxState<{foo: number}> {
   
    readonly state$ = this.select();

    constructor() {
        super();
    }
}
```

**Provide the `RxState` inside a `Component` or `Directive` and `Inject` it**

 ```typescript
@Component({
    selector: 'app-stateful',
    template: `<div>{{ state$ | async | json }}</div>`,
    providers: [RxState]
})
export class StatefulComponent {
   
    readonly state$ = this.state.select();

    constructor(private state: RxState<{ foo: string }>) {
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
    template: `<div>{{ (state$ | async).counter }}</div>`,
    providers: [RxState]
})
export class StatefulComponent {
   
    readonly state$ = this.state.select();
    
    constructor(
        private state: RxState<{counter: number}>,
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
    template: `<div>{{ title$ | async }}</div>
    `,
    providers: [RxState]
})
export class StatefulComponent {
    readonly title$ = this.select('title');

    @Input() set title(title: string) {
        this.state.setState({ title });
    }
   
    constructor(private state: RxState<{title: string}>) {
    }
}
```

**Combining `Input` bindings passing Observables with RxState**

**You can 1 change detection per emission** and improve performance of your app
by providing `Observables` directly as `Input`.
This way the ChangeDetection for the `Input` binding will only fire once for the first assignment.

****
 ```typescript
const initialState: ComponentState = {
    title: 'MyComponent',
    showButton: false,
    counter: 0
};

@Component({
    selector: 'app-stateful',
    template: `<div>{{ (state$ | async).counter }}</div>`,
    providers: [RxState]
})
export class StatefulComponent {

    @Input() set config(count$: Observable<ComponentStateInput>) {
        this.state.connect('count', count$);
    }
    constructor(private state: RxState<{count: number}>) {
    }
}
```
### Output Property Bindings

**Combining `Output` bindings directly from RxState**

 ```typescript
@Component({
    selector: 'app-stateful',
    template: `<div (click)="">Click</div>`,
    providers: [RxState]
})
export class StatefulComponent {
    @Output() count = this.state.select('count');
   
    constructor(private state: RxState<{count: number}>) {
    }
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
