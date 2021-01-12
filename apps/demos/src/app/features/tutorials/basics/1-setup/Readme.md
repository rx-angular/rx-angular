# Setup a reactive

In this section we start with an [imperative code base][setup.start.component.ts] and will refactor
it's state management to a [reactive setup][setup.solution.component.ts].

We will setup `RxState` in the component, initialize the components local state,  
and render it in the template.

As a nice side effect we introduced automated subscription handling, the possibility for imperative interaction
over input bindings and a clean separation of concerns.

---

## Implement RxState Service

Let's start with introducing a reactive state to our component by using the `RxState` class.
This can be done over inheritance, we extend form the state service,  
or composition, we inject the service in the constructor and add the service to the component `providers` section.

In this article we simply extend from the service.
The benefit and disadvantage here is, we can access the services API directly over `this`.  
e.g. `this.select('prop')`.

To do so, we have to extend our class and use the already existing `ComponentState` interface:

```typescript

// 1- import RxState
import { RxState } from '@rx-angular/state';

...

// 2- add a component state
interface ComponentState {
  refreshInterval: number;
  list: DemoBasicsItem[];
  listExpanded: boolean;
}

// 3- extend the component or alternatively register a local provider and inject it
export class SetupReactiveComponentStateContainerComponent extends RxState<ComponentState> ... {
```

Since we decided to extend the component, a `super` in the constructor is needed as we extend from another class.

```typescript
constructor(...) {
  super();
}
```

for the sake of the example we added the state in the same file, but for a more robust architecture consider to have it in a different file with `.state.ts` extension.

### Select and display state

Lets setup a component property `model$` which holds all data we wish to display in the template.

By assigning the `model$` to the `$` property of the `RxState` class we get the full state object as `Observable<ComponentState>`

```typescript

@Component({
  selector: 'rxa-setup-solution',
  template: `
    model$: <pre>{{model$ | async | json}}</pre>
    ...
  `,
  ...
})
export class SetupReactiveComponentStateContainerComponent extends RxState<ComponentState> {
  model$ = this.select();
}
```

## Initialize component state

As `RxState` is empty and thus lazy on initialization, we can decide which and if we put values to state initially.
We can initialize the state imperatively over `set` or over a observable and the `connect()` method.

We will use `set` as we already have initial values as `initComponentState` object.

```typescript
 constructor(...) {
  ...
  this.set(initComponentState);
}
```

We should see the initial state in the template.

[setup.start.component.ts]: https://github.com/rx-angular/rx-angular/blob/master/apps/demos/src/app/features/tutorials/basics/1-setup/setup.start.component.ts
[setup.solution.component.ts]: https://github.com/rx-angular/rx-angular/blob/master/apps/demos/src/app/features/tutorials/basics/1-setup/setup.solution.component.ts
