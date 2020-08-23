# Load data on route change

On every URL change fetch users from the back end and deal with loading flags

## Imperative

```typescript
@Component({
    selector: 'my-comp',
    template: `
      <loading [isLoading]="isLoading$ | async"></loading>
      <div>{{ users$ | async }}</div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponent {
   readonly subscription: Subscription;
   readonly user$ = new BehaviourSubject(null);
   readonly isLoading$ = new BehaviourSubject(false);

   constructor(private router: Router,
               private userService: UserService) {

     const fetchUserOnUrlChangeEffect$ = this.router.params.pipe(
        tap(() => this.isLoading$.next(true)),
        switchMap(p => this.userService.getUser(p.user).pipe(
        	map(res => ({user: res.user})),
          	tap((user) => this.user$.next(user)),
        ))
        tap(() => this.isLoading$.next(false)),
    );

    this.subscription = this.fetchUserOnUrlChangeEffect$
      .subscribe();

   }

  onDestroy() {
  	this.subscription.unsubscribe();
  }
}
```

## Reactive

```typescript
@Component({
  selector: 'my-comp',
  template: `
    <loading [isLoading]="isLoading$ | push"></loading>
    <div>{{ user$ | push }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyComponent {
  readonly user$ = this.state.select('user');
  readonly isLoading$ = this.state.select('isLoading');

  constructor(
    private router: Router,
    private userService: UserService,
    private state: RxState<{ user: string; isLoading: boolean }>
  ) {
    const fetchUserOnUrlChange$ = this.router.params.pipe(
      switchMap((p) =>
        this.userService.getUser(p.user).pipe(
          map((res) => ({ user: res.user })),
          startWith({ isLoading: true }),
          endWith({ isLoading: false })
        )
      )
    );
    this.state.connect(fetchUserOnUrlChange$);
  }
}
```
