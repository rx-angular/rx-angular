# ngx-state

#### Reactive Component State in Angular

RxState is a light-weight reactive state management service which is especially useful to organize component state in Angular.

## Description

In most of the component-oriented applications, there is the need to structure container components.
Even after a well thought refactoring into more display components and grouping logic into responsibilities it's always hard to handle.

The data structure you manage inside these components is only here for their very component. Not for any other components.
This data structure appears with the component and disappears when the component is removed.

This is a good example of component state.  

This library helps to organize component state reactive.

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


---


## API
 ```typescript
import { State } from 'rxjs-state';

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
### setState
Add new slices to the state by providing an object
 ```typescript
state.setState({ foo: 'boo' });
// new state => { foo: 'boo' }

state.setState({ bar: 2 });
// new state => { foo: 'boo', bar: 2 }

state.setState({ loo: {boo: 'boo', baz: 1337 }})
// new state => { foo: 'boo', bar: 2, loo: {boo: 'boo', baz: 1337 }}
```

Add new Slices to the state by providing a projection function
 ```typescript
state.setState(currentState => ({ bar: currentState.bar +1 }));
// new state => { foo: 'boo', bar: 3, loo: {boo: 'boo', baz: 1337 }}
```
### connect
Connect `Observable` state slices to the state

Connect to a single property
 ```typescript
const newBar$ = range(1, 5);
state.connect('bar', newbar$);
// the property bar will get values 1, 2, 3, 4, 5
```

Connect a slice to the state
 ```typescript
const slice$ = of({
    bar: 5,
    foo: 'foo'
});
state.connect(slice$);
// new state => { foo: 'foo', bar: 5, loo: {boo: 'boo', baz: 1337 }}
```

### select
Select an `Observable` slice of the stream

Access complete state
 ```typescript
const bar$ = state.select();
bar$.subscribe(console.log);
/*{
    foo: 'foo';
    bar: 5;
    loo: {
        boo: 'boo';
        baz: 1337;
    }
}*/
```

Access a single property
 ```typescript
const bar$ = state.select('bar');
bar$.subscribe(console.log); // 3
```

Access a nested property
 ```typescript
const boo$ = state.select('loo', 'boo');
boo$.subscribe(console.log); // 'boo'
```

Access by providing rxjs operators
 ```typescript
const customProp$ = state.select(map(state => ({ customProp: state.bar })));
customProp$.subscribe(console.log); // 'boo'
```

### hold
Connect a side-effect

Hold an observable effect
 ```typescript
import { fromEvent } from 'rxjs/observable';

const sideEffect$ = fromEvent(document, 'click').pipe(
    tap(clickEvent => alert('document clicked'))
);
state.hold(sideEffect$);
```

Connect an observable trigger and provide an effect function
 ```typescript
import { fromEvent } from 'rxjs/observable';

const sideEffect$ = fromEvent(document, 'click');
state.hold(sideEffect$, clickEvent => console.log(clickEvent));
```

## Usage
### Basic Setup
Extend from the `RxState` inside a `Component`, `Directive` or `Service`
 ```typescript
export interface ComponentState {
    strategies: string[];
    strategy: string;
}

@Component({
    selector: 'app-stateful',
    template: `
        <div>{{ state$ | async | json }}</div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatefulComponent extends RxState<ComponentState> {
   
    readonly state$ = this.select();

    constructor() {
        super();
    }
}
```

Provide the `RxState` inside a `Component` or `Directive` and `Inject` it
 ```typescript
export interface ComponentState {
    foo: string;
}

@Component({
    selector: 'app-stateful',
    template: `
        <div>{{ state$ | async | json }}</div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        RxState
    ]
})
export class StatefulComponent {
   
    readonly state$ = this.state.select();

    constructor(private state: RxState<ComponentState>) {
    }
}
```
### Connecting services
Connect state slices from third party services (e.g. NgRx `Store`) or trigger them from side-effects
 ```typescript
import { Store } from '@ngrx/store';

interface AppState {
    loggedIn: boolean;
    counter: number;
}

export interface ComponentState {
    title: string;
    showButton: boolean;
    counter: number;
}

const initialState: ComponentState = {
    title: 'MyComponent',
    showButton: false,
    counter: 0
};

@Component({
    selector: 'app-stateful',
    template: `
        <ng-container *ngIf="state$ | async as s">
            <h1>{{ s.title }}</h1>
            <div>{{ s.counter }}</div>
            <button *ngIf="s.showButton" (click)="btnClick$.next()"></button>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        RxState
    ]
})
export class StatefulComponent {
   
    readonly state$ = this.state.select();
    readonly btnClick$ = new Subject<void>();
    
    private readonly incrementEffect$ = this.btnClick$
        .pipe(
            tap(() => this.store.dispatch(increment()))
        );

    constructor(
        private state: RxState<ComponentState>,
        private store: Store<AppState>
    ) {
        state.setState(initialState);
        state.hold(this.incrementEffect$);
        state.connect('counter', store.select('counter'));
        state.connect('showButton', store.select('loggedIn'));
    }
}
```
### Property Bindings

`Input` and `Output` bindings can be directly bound to the RxState
 ```typescript
export interface ComponentState {
    title: string;
    showButton: boolean;
    counter: number;
}

const initialState: ComponentState = {
    title: 'MyComponent',
    showButton: false,
    counter: 0
};

@Component({
    selector: 'app-stateful',
    template: `
        <ng-container *ngIf="state$ | async as s">
            <h1>{{ s.title }}</h1>
            <div>{{ s.counter }}</div>
            <button *ngIf="s.showButton" (click)="btnClick$.next()"></button>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        RxState
    ]
})
export class StatefulComponent {

    @Input() set title(title: string) {
        this.state.setState({ title });
    }

    @Input() set showButton(showButton: boolean) {
        this.state.setState({ showButton });
    }
   
    @Output('counter') readonly counter$ = this.state.select('counter');
    
    readonly btnClick$ = new Subject<void>();
    
    private readonly increment$ = this.btnClick$
        .pipe(
            withLatestFrom(this.state.select('counter')),
            map(([_, oldCounter]) => oldCounter + 1)
        );

    constructor(
        private state: RxState<ComponentState>
    ) {
        state.setState(initialState);
        state.hold(this.incrementEffect$);
        state.connect('counter', this.increment$);
    }
}
```

You can save some `ChangeDetection` cycles and improve performance of your app
by providing single configuration `Observables` as `Input`.
This way the ChangeDetection for the `Input` binding will only fire once for the assignment.

 ```typescript
export interface ComponentState {
    title: string;
    showButton: boolean;
    counter: number;
}

export interface ComponentStateInput {
    title: string;
    showButton: boolean;
}

const initialState: ComponentState = {
    title: 'MyComponent',
    showButton: false,
    counter: 0
};

@Component({
    selector: 'app-stateful',
    template: `
        <ng-container *ngIf="state$ | async as s">
            <h1>{{ s.title }}</h1>
            <div>{{ s.counter }}</div>
            <button *ngIf="s.showButton" (click)="btnClick$.next()"></button>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        RxState
    ]
})
export class StatefulComponent {

    @Input() set config(config$: Observable<ComponentStateInput>) {
        this.state.connect(config$);
    }
    
    @Output('counter') readonly counter$ = this.state.select('counter');
    
    readonly btnClick$ = new Subject<void>();
    
    private readonly increment$ = this.btnClick$
        .pipe(
            withLatestFrom(this.state.select('counter')),
            map(([_, oldCounter]) => oldCounter + 1)
        );

    constructor(
        private state: RxState<ComponentState>
    ) {
        state.setState(initialState);
        state.hold(this.incrementEffect$);
        state.connect('counter', this.increment$);
    }
}
```
