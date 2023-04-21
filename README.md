[![RxAngular logo](https://raw.githubusercontent.com/rx-angular/rx-angular/main/docs/images/rx-angular_logo.png)](https://rx-angular.io/)

# RxAngular ![RxAngular CI](https://github.com/rx-angular/rx-angular/workflows/rx-angular%20CI/badge.svg?branch=main)

> RxAngular offers a comprehensive toolkit for handling fully reactive Angular applications with the main focus on runtime performance, template rendering, and Developer eXperience.

## Packages

RxAngular is made up of different packages that work together or standalone:

- [📦 `@rx-angular/state`](https://rx-angular.io/docs/state) A powerful state management library, providing a fully reactive way to manage state in components and services.
- [📦 `@rx-angular/template`](https://rx-angular.io/docs/template) A set of directives and pipes designed for high-performance and non-blocking rendering for large-scale applications.
- [📦 `@rx-angular/cdk`](https://rx-angular.io/docs/cdk) A Component Development Kit for high-performance and ergonomic Angular UI libs and large scale applications.
- [📦 `@rx-angular/eslint-plugin`](https://rx-angular.io/docs/eslint-plugin) A set of ESLint rules for building reactive, performant, and zone-less Angular applications.

This repository holds a set of helpers to create **fully reactive** as well as **fully zone-less** applications.

## Getting Started

### Using `@rx-angular/template`

Here's an example of how to use the `*rxLet` directive to bind an Observable value to the template. The `timer` Observable emits a value every second, and the `value$` property is bound to the template using the `*rxLet` directive.

```ts
@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [LetDirective],
  template: `
    <ng-container *rxLet="value$; let value">
      {{ value }}
    </ng-container>
  `,
})
export class AppTimer {
  value$ = timer(0, 1000);
}
```

To learn more about @rx-angular/template and its capabilities, check out the official documentation at [https://rx-angular.io/docs/template](https://rx-angular.io/docs/template).

### Using `@rx-angular/state`

In this example, we're creating a fully reactive counter component. We define the state using an interface and use the `RxState` service to manage it. We also define two actions to increment and decrement the count and use the `connect` method to update the state in response to these actions. Finally, we use the `select` method to display the count property of the state in the template.

```ts
interface CounterState {
  count: number;
}

interface CounterActions {
  increment: void;
  decrement: void;
}

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [PushPipe],
  template: `
    <p>Count: {{ count$ | push }}</p>
    <button (click)="actions.increment()">Increment</button>
    <button (click)="actions.decrement()">Decrement</button>
  `,
  providers: [RxState, RxActionFactory],
})
export class CounterComponent {
  readonly count$: Observable<number> = this.state.select('count');
  readonly actions = this.actionFactory.create();

  constructor(
    private readonly state: RxState<CounterState>,
    private readonly actionFactory: RxActionFactory<CounterActions>
  ) {
    this.state.set({ count: 0 });
    this.state.connect(this.actions.increment$, (state) => ({
      count: state.count + 1,
    }));
    this.state.connect(this.actions.decrement$, (state) => ({
      count: state.count - 1,
    }));
  }
}
```

To learn more about @rx-angular/state and its capabilities, check out the official documentation at [https://rx-angular.io/docs/state](https://rx-angular.io/docs/state).

## Used by

<table style="width:100%">
  <tr>
    <td><img width="140" src="https://clickup.com/landing/images/logo-clickup_color.svg"></td>
    <td><img width="140" src="https://get.tapeapp.com/wp-content/uploads/2021/08/tape_logo_24px.svg"></td>
    <td><img height="80" src="https://avatars.githubusercontent.com/u/1733746?s=200&v=4"></td>
  </tr>
   <tr>
    <th>Large scale application</th>
    <th>Medium size project</th>
    <th>Small project</th>
  </tr>
  <tr>
    <td>
      Url: https://clickup.com <br/>
      Platforms: Web
    </td>
    <td>
      Url: https://get.tapeapp.com<br/>
      Platforms: Web, Mobile (ionic)
    </td>
    <td>
      Url: https://angular-movies-a12d3.web.app<br/>
      Platforms: Web
    </td>
  </tr>
</table>

## Links

- [📚 Official docs](https://www.rx-angular.io/)
- [![Discord](https://icongr.am/material/discord.svg?size=16&color=7289da) Discord channel](https://discord.com/invite/XWWGZsQ)
- [![Slack](https://icongr.am/material/slack.svg?size=16&color=7289da) Slack](https://join.slack.com/t/rxangular/shared_invite/zt-1tn1hivnp-FemQzop69HI7~wlPSqDjKQ)

## Contributing

We welcome contributions from the community to help improve RxAngular! To get started, please take a look at our contribution guidelines in the [CONTRIBUTING.md](CONTRIBUTING.md) file. We appreciate your help in making RxAngular better for everyone.

## License

This project is MIT licensed.
