# @rx-angular/state

[![rx-angular circleci-status](https://circleci.com/gh/BioPhoton/rx-angular.svg?style=shield)](https://circleci.com/gh/BioPhoton/rx-angular)

## Reactive Component State for Angular

RxState is a light-weight, flexible, strongly typed and tested tool dedicated to reduce the complexity of managing component state in angular.

![state logo](https://raw.githubusercontent.com/BioPhoton/rx-angular/master/libs/state/images/state_logo.png)

## Description

Developing **reactive**, **complex** and **robust** user interfaces confronts developers with manging an overwhelmingly huge amount
events of different types and sources _aka_ **State Management**.

There are plenty of solutions available for managing state on a **global level** (Akita, NgRx, NgXs, ...). All of
them **not targeting** managing state on **component level**.

That's where `@rx-angular/state` comes into place.
The **intuitive API** specifically designed for managing **component state**, **automatic subscription handling** and
**lifecycle integration** making `@rx-angular/state` the **perfect fit** for handling **component state** in Angular.

## Key features

- Slim and intuitive API
- Automated subscription handling
- **Subscription-less coding**
- Partial state updates
- State queries are automatically cached
- Better rendering performance
- Lazy state. No initial state needed.
- Lifecycle independent programming
- Foundation for Zone-Less applications

## Install

`npm install @rx-angular/state`

## API

Read the [API Documentation](./docs/api.md)

## Basic Setup

### Provide (recommended)

The recommended way of using the `RxState` service is by **providing** a local instance bound to the component lifecycle.

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

### Extend (minimal)

If you wish, there is also the possibility of **extending** the `RxState` service. This is generally
not the recommended way but indeed useful for very small components.

**Extend from the `RxState` inside a `Component`, `Directive`**

```typescript
@Directive({
  selector: '[appStateful]'
})
export class StatefulComponent extends RxState<{ foo: number }> {
  readonly state$ = this.select();

  constructor() {
    super();
  }
}
```

## Extended Setup

If you strive for a more sophisticated **separation of concerns** you can `extend` the `RxState` in a
locally provided `Service`.

**Create a local `Service` by `extending` the `RxState`**

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

**`Provide` the `Service` inside the using `Component` or `Directive`**

```typescript
@Component({
  selector: 'app-stateful',
  template: `
    <div>{{ viewState$ | async | json }}</div>
  `,
  providers: [StatefulComponentService]
})
export class StatefulComponent {
  readonly viewState$ = this.state.state$;

  constructor(private state: StatefulComponentService) {}
}
```

## Usage

Find more information about usage and use cases in the [Usage Documentation](./docs/usage.md).

## Resources

Videos:

- [🎥 Tackling Component State Reactively (Live Demo at 24:47)](https://www.youtube.com/watch?v=I8uaHMs8rw0)

Articles:

- [💾 Research on Reactive Ephemeral State](https://dev.to/rxjs/research-on-reactive-ephemeral-state-in-component-oriented-frameworks-38lk)

Design Documents

- [💾 Design Documents](https://hackmd.io/wVkWRc3XQWmtM6YcktRTrA)

Usage in the wild

- [Fully-reactive Zone-Less Angular/Ionic Progressive Web Application](https://startrack-ng.web.app/search) by [Mike Hartington](https://twitter.com/mhartington)
- [Counter](https://stackblitz.com/edit/rx-angular-state-demo?file=src%2Fapp%2Fcounter.component.ts)
- [Repository Demo](https://github.com/BioPhoton/rx-angular/tree/master/apps/rx-angular-state-demo)
