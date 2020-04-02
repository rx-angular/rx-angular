# rxjs-state

## install

npm install rxjs-state

## Description
RxState is a light-weight reactive state management service which is especially useful to organize component state.

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

@TODO :D
