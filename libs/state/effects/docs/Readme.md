# Resources

**Example applications:**  
A demo application is available on [GitHub]().

# Motivation

Sometimes we have to subscribe in the component to handle reactive side effects. This leads to bloated code and potential risk of a memory leak.
 
```typescript
@Component({
  // ...
})
export class FooComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private sideEffect = mode => localStorage.setItem('colorMode', mode);

  constructor() {
    colorMode$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      // 👇 Actual feature related code 
      this.sideEffect
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
``` 

As we can see to only handle the `sideEffect` function and tear down subscription if the component gets destroyed we have to write a lot of boiler plate.

By using `RxEffect` we can reduce the code drastically:

```typescript
@Component({
  // ...
  providers: [RxLocalEffects],
})
export class FooComponent {
  private sideEffect = mode => localStorage.setItem('colorMode', mode);

  constructor(effects: RxLocalEffects) {
    // 👇 Actual feature related code 
    effects.register(colorMode$, this.sideEffect);
  }
}
```

In this example we can see how many lines we can just delete now. 
This cleans up your code base and helps to focus on writing actual features.
 
**The Benefits of RxAngular**

- ✅ less boiler plate


## Setup

## Usage

### Advanced examples
The register method can also be combined with tap or even subscribe:

```typescript
effects.register(obs$, doSideEffect);
// is equivalent to
effects.register(obs$.pipe(tap(doSideEffect)));
// is equivalent to
effects.register(obs$.subscribe(doSideEffect));
// is equivalent to
effects.register(obs$, { next: doSideEffect }); // <- you can also tap into error or complete here
```

You can even use it with promises or schedulers:
```typescript
effects.register(fetch('...'), doSideEffect);
effects.register(animationFrameScheduler.schedule(action));
```

All registered effects are automatically unsubscribed when the component is destroyed. If you wish to cancel a specific effect earlier, you can do this either declaratively (obs$.pipe(takeUntil(otherObs$))) or imperatively using the returned effect ID:

```typescript
this.effectId = this.effects.register(obs$, doSideEffect);

// later
this.effects.unregister(this.effectId); // doSideEffect will no longer be called
```

### Error handling
If an error is thrown inside the side-effect callback, other effects are not effected. The built-in Angular ErrorHandler gets automatically notified of the error, so these errors should still show up in Rollbar reports.

# Alternative Approaches


