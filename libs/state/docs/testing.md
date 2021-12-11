# Testing

This document provides a brief overview on how to set up unit tests with `jest` when using the `@rx-angular/state`
package.

> Make sure you are familiar with the basics of how to test angular applications.
> You can read more about it in the [official testing docs](https://angular.io/guide/testing).

## RxState

There are two ways you can test `RxState`. Depending on your use case, you maybe want
to test the behavior of a whole `component`, or test the `state` and it's transformations on
its own.

### Components

> it is recommended to read the [official component testing docs](https://angular.io/guide/testing-components-basics)

`RxState` can be used in different styles which will affect the way how we can actually test, modify
and access the respective component:

* local provider
* inheritance
* local creation

**Local Provider**

`providing` a local instance of `RxState` for a component is the recommended and most common way to use `RxState` in your component.
It is recommended because it is the only way to actually make use of angulars `Dependency Injection` system
when testing your component. You'll see why in the next section.

```ts
@Component({
  selector: 'rx-angular-state-local-provider-test',
  template: `
    <span>{{ value$ | async }}</span>
  `,
  providers: [RxState],
})
export class RxStateInjectionComponent {
  value$ = this.state.select();
  
  constructor(public state: RxState<{ foo: string; }>) {}
}
```

**Inheritance**

You can also use `RxState` by `extending` from it in your component. The downside of this approach is, that
you cannot replace the instance of `RxState` in a test environment.

```ts
@Component({
  selector: 'rx-angular-state-inheritance-test',
  template: ` <span>{{ value$ }}</span> `,
})
export class RxStateInheritanceComponent extends RxState<{ foo: string; }> {
  value$ = this.select();

  constructor() {
    super();
  }
}
```

**Local Creation**

You can also use `RxState` by creating a local instance from it in your component. The downside of this approach is, that
you cannot replace the instance of `RxState` in a test environment.

```ts
@Component({
  selector: 'rx-angular-state-creation-test',
  template: ` <span>{{ value$ }}</span> `,
})
export class RxStateCreationComponent {
  state = new RxState<{ foo: string; }>();
  value$ = this.state.select();
}
```

**Setup the test environment**

The steps to set up a test environment for component testing involving `RxState` are no different
to any other component tests. 

```ts
describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyComponent],
      teardown: { destroyAfterEach: true },
    });
    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

If you want to `mock` the instance of `RxState` used in your component while testing, you can make use
of the `providers` property in the `TestBed` configuration.

```ts
import { RxState } from './rx-state.service';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;
  let mockState: RxState<{ foo: string }>;
  
  beforeEach(() => {
    // create a mock for your test environment
    mockState = new RxState();
    TestBed.configureTestingModule({
      declarations: [MyComponent],
      // this is only possible when going with the `local provider` way
      providers: [
        {
          provide: RxState,
          useValue: mockState
        }
      ],
      teardown: { destroyAfterEach: true },
    });
    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    // modify your components state before testing it
    mockState.set({ foo: 'im running in a test' });
    expect(component).toBeTruthy();
  });
});
```

### State

TBD
