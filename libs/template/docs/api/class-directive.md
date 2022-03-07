## ClassDirective

The `rxClass` directive serves a convenient way of using observables for style (class) changes.

Under the hood, it leverages a `RenderStrategy` which in turn defines the timing when incoming changes get applied to the directives `ElementRef#nativeElement`. The key difference to the native `ngClass` directive and the main reason to use `rxClass` over `ngClass` is its runtime performance. Due to its push-based nature, the `ClassDirective` is able to apply classes defined as input to its `nativeElement` without the need of running `ChangeDetection` or waiting for `NgZone` to kick in.
For this, it needs an `Observable` as input source.
```typescript
class$ = state$.pipe(
  map(state => state.isActive ? 'active-class' : 'disabled-class' )
)
```
```html
<div [rxClass]="class$"></div>
```

### Problems with `async` and `ngClass` or `class`

In Angular, a way of binding an observable to the `ngClass` or `class` directive could look like that:

```html
<div [ngClass]="{ 'visible': isVisible$ | async }"></div>
<div [class.visible]="isVisible$ | async"></div>
```

When using the native `ngClass` or `class` directive, the template of your component needs to get re-evaluated in order to apply the changes. In other words `ChangeDetection` has to run for your component in order to set a class to an `HTMLElement`.
That's not the case when using `rxClass` that allows you to re-render the content asynchronously based on the chosen strategy.  The async behavior description can be found here: https://github.com/rx-angular/rx-angular/blob/main/libs/template/docs/performance-issues.md#binding-reactive-sources.

### Features of `rxClass`

- re-rendering without `ChangeDetection`
- binding is always present. (see "Problems with `async` and `*ngClass` or `class`" section above)
- it takes away the multiple usages of the `async` or `push` pipe
- a unified/structured way of handling null and undefined
- it allows to easily choose preferred rendering strategy using `rxClassStrategy` directive

### Template binding of an Observable

The `rxClass` directive takes over several things and makes it more convenient and safe to work with streams in the
template and allows to choose a preferred rendering strategy using `rxClassStrategy` directive:

#### Example usages:

```html
<div [rxClass]="{ 'visible': isVisible$ }" [rxClassStrategy]="'native'"></div>

<div [rxClass]="singleClass$" [rxClassStrategy]="'native'"></div>
<div [rxClass]="setOfClasses$" [rxClassStrategy]="'native'"></div>
<div [rxClass]="arrayOfClasses$" [rxClassStrategy]="'native'"></div>
<div [rxClass]="recordOfClasses$" [rxClassStrategy]="'native'"></div>
```

```TypeScript
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <ng-container *rxLet="hero$; let hero; strategy: strategy">
      <app-hero [hero]="hero"></app-hero>
    </ng-container>
  `
})
export class AppComponent {
  readonly isVisible$ = new BehaviorSubject<boolean>(true);

  readonly singleClass$ = new BehaviorSubject<string>('class-one');
  readonly setOfClasses$ = new BehaviorSubject<Set<string>>(new Set(['class-one', 'class-two']));
  readonly arrayOfClasses$ = new BehaviorSubject<string[]>(['class-one', 'class-two']);
  readonly recordOfClasses$ = new BehaviorSubject<Record<string, boolean>>({
    'class-one': true,
    'class-two': false
  });
}
```
