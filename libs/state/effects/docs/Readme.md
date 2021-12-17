# Resources

**Example applications:**  
A demo application is available on [GitHub]().

# Motivation

In general, it's best to avoid the direct use of the `subscribe` API of RxJS at all.

It may sound weired, as I'm pretty sure you are used to handle your subscriptions.
You most probably store the `Subscription` object, add a takeUntil to hook it into the component lifecycle and avoid memory leaks etc.
Maybe even hacks where you subscribe to one Observable just to next into another subject. 

In RxAngular we found ways to avoid the `subscribe` API and in addition handle all of the above edge cases and more.
This is the hidden secret of why all parts of RxAngular fit together so well.

However, sometimes we have to subscribe in the component to handle reactive side effects. 
This leads to bloated code and potential risk of a memory leak, late subscriber and so on.
 
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
 
**The Benefits**

- ✅ no boiler plate
- ✅ easy to test
- ✅ clean separation of concerns
- ✅ slim and handy APIs
- ✅ Auto-cleanup on destroy 
- ✅ effect interoperabilits
- ✅ handlers for imperative code styles

## Setup

## Usage
