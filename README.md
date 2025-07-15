[![RxAngular logo](https://raw.githubusercontent.com/rx-angular/rx-angular/main/docs/images/rx-angular_logo.png)](https://rx-angular.io/)

# RxAngular ![RxAngular CI](https://github.com/rx-angular/rx-angular/workflows/rx-angular%20CI/badge.svg?branch=main)

> RxAngular offers a comprehensive toolkit for handling fully reactive Angular applications with the main focus on runtime performance, template rendering, and Developer eXperience.

## Packages

RxAngular is made up of different packages that work together or standalone.

| Package                                                               | Description                                                                                                                                              | Version                                                                                                                               |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [@rx-angular/state](https://rx-angular.io/docs/state)                 | A powerful state management library, providing a fully reactive way to manage state in components and services.                                          | [![npm](https://img.shields.io/npm/v/%40rx-angular%2Fstate.svg)](https://www.npmjs.com/package/%40rx-angular%2Fstate)                 |
| [@rx-angular/template](https://rx-angular.io/docs/template)           | A set of directives and pipes designed for high-performance and non-blocking rendering for large-scale applications.                                     | [![npm](https://img.shields.io/npm/v/%40rx-angular%2Ftemplate.svg)](https://www.npmjs.com/package/%40rx-angular%2Ftemplate)           |
| [@rx-angular/cdk](https://rx-angular.io/docs/cdk)                     | A Component Development Kit for high-performance and ergonomic Angular UI libs and large-scale applications.                                             | [![npm](https://img.shields.io/npm/v/%40rx-angular%2Fcdk.svg)](https://www.npmjs.com/package/%40rx-angular%2Fcdk)                     |
| [@rx-angular/isr](https://rx-angular.io/docs/isr)                     | A library that enables Angular Universal applications to generate static pages at runtime and then update them incrementally on demand or on a schedule. | [![npm](https://img.shields.io/npm/v/%40rx-angular%2Fisr.svg)](https://www.npmjs.com/package/%40rx-angular%2Fisr)                     |
| [@rx-angular/eslint-plugin](https://rx-angular.io/docs/eslint-plugin) | A set of ESLint rules for building reactive, performant, and zone-less Angular applications.                                                             | [![npm](https://img.shields.io/npm/v/%40rx-angular%2Feslint-plugin.svg)](https://www.npmjs.com/package/%40rx-angular%2Feslint-plugin) |

This repository holds a set of helpers that are aiming to provide:

- fully reactive applications
- fully or partially zone-less applications
- high-performance and non-blocking rendering

## Getting Started

### Using `@rx-angular/template`

This is an example of how to use the `*rxLet` directive to bind an Observable value to the template. In this example, the component defines a property `time$`, which is an Observable that emits a value every second using the `timer` operator. The emitted values are mapped to the current time string using the `map` operator which is then displayed in the template using `*rxLet`.

```ts
import { RxLet } from '@rx-angular/template/let';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [RxLet],
  template: `
    <ng-container *rxLet="time$; let value">
      {{ value }}
    </ng-container>
  `,
})
export class TimeComponent {
  time$ = timer(0, 1000).pipe(map(() => new Date().toTimeString()));
}
```

To learn more about `@rx-angular/template` and its capabilities, check out the official documentation at [https://rx-angular.io/docs/template](https://rx-angular.io/docs/template).

### Using `@rx-angular/state`

In this example, we're creating a fully reactive counter component. We use `rxState` to manage the component's state, `rxActions` to define structured actions for state updates (specifically `increment` and `decrement`), and `rxEffects` to trigger side-effects when state changes occur. These mechanisms collectively enable efficient state management, action handling, and side-effect execution, resulting in a responsive and well-structured counter component.

```ts
import { rxState } from '@rx-angular/state';
import { rxEffects } from '@rx-angular/state/effects';
import { rxActions } from '@rx-angular/state/actions';
import { RxPush } from '@rx-angular/template/push';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [RxPush],
  template: `
    <p>Count: {{ count$ | push }}</p>
    <button (click)="actions.increment()">Increment</button>
    <button (click)="actions.decrement()">Decrement</button>
  `,
})
export class CounterComponent {
  readonly actions = rxActions<{
    increment: void;
    decrement: void;
  }>();

  private readonly state = rxState<{
    count: number;
  }>(({ set, connect }) => {
    set({ count: 0 });
    connect(this.actions.increment$, (state) => ({
      count: state.count + 1,
    }));
    connect(this.actions.decrement$, (state) => ({
      count: state.count - 1,
    }));
  });

  readonly count$ = this.state.select('count');

  constructor() {
    rxEffects(({ register }) => {
      register(this.count$, (count) => console.log(`Count changed: ${count}`));
    });
  }
}
```

To learn more about `@rx-angular/state` and its capabilities, check out the official documentation at [https://rx-angular.io/docs/state](https://rx-angular.io/docs/state).

## Links

- [📚 Official docs](https://www.rx-angular.io/)
- [![Discord](https://icongr.am/material/discord.svg?size=16&color=7289da) Discord channel](https://discord.com/invite/XWWGZsQ)
- [![Slack](https://icongr.am/material/slack.svg?size=16&color=7289da) Slack](https://join.slack.com/t/rxangular/shared_invite/zt-1tn1hivnp-FemQzop69HI7~wlPSqDjKQ)

## Contributing

We welcome contributions from the community to help improve RxAngular! To get started, please take a look at our contribution guidelines in the [CONTRIBUTING.md](CONTRIBUTING.md) file. We appreciate your help in making RxAngular better for everyone.

## License

This project is MIT licensed.

---

Made with ❤ by [push-based.io](https://www.push-based.io)
