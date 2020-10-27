# Passing observables directly

In this section we will compare the different ways to pass a value to components.
The 2 discussed ways are:

- Passing single values, done via the async pipe
- Passing the whole observable

## Passing values

Here we subscribe to an Observable over the `async` pipe.
Every emitted value triggers the change detection and re-renders the parent component.

This passes the value to the child component.
In the child's `@Input` binding the `set` method get used to forward the value which is bound to the template by another `async` pipe.

This in turn triggers another re-rendering, and the value get displayed in the child component.

```typescript
@Component({
  selector: 'parent',
  template: ` <user-list [users]="users$ | async"></user-list> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentComponent {
  users$ = userService.users$;
  constructor(private userService: UserService) {}
}

@Component({
  selector: 'user-list',
  template: `
    <div *ngFor="let user of users$ | async">
      {{ user }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {
  users$ = this.select('users');
  @Input()
  set users(users) {
    this.set({ users });
  }
}
```

## Passing observables

This example in comparison passes the Observable directly tho the child component.

Only the first time the parent triggers the change detection and re-renders.

This passes the value to the child component.
In the child's `@Input` binding the `connect` method get used to forward the value which is bound to the template by another `async` pipe.

This in turn triggers another re-rendering, and the value get displayed in the child component.

If we compare the number of change detections with the above example where we passed the single values we save 1 rendering per emission.
In a real life application only a view of those changes at the right place gives a big impact in performance.

```typescript
@Component({
  selector: 'parent',
  template: ` <user-list [users]="users$"></user-list> `,
})
export class ParentComponent {
  users$ = userService.users$;
  constructor(private userService: UserService) {}
}

@Component({
  selector: 'user-list',
  template: `
    <div *ngFor="let user of users$ | async">
      {{ user }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {
  users$ = this.select('users');
  @Input()
  set users(users) {
    this.connect('users', users$);
  }
}
```
