# Passing observables directly

## Passing values

```typescript
@Component({
  selector: 'parent',
  template: `
    <user-list [users]="users$ | async"></user-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentComponent {
  users$ = userService.users$;
  constructor(private userService: UserService) {}
}

@Component({
  selector: 'child',
  template: `
    <div *ngFor="let user of users$ | async">
      {{ user }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  users$ = this.select('users');
  @Input()
  set users(users) {
    this.setState({ users });
  }
}
```

**Passing Observables**

```typescript
@Component({
  selector: 'parent',
  template: `
    <user-list [users]="users$"></user-list>
  `
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  users$ = this.select('users');
  @Input()
  set users(users) {
    this.connect('users', users$);
  }
}
```
