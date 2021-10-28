## ClassDirective

The `rxClass` directive serves a convenient way of using observables for style (class) changes.

Under the hood, it leverages a `RenderStrategy` which in turn takes care of optimizing the change detection
of your component by passing wanted strategy to `rxClassStrategy` (the default strategy is `'immediate'`). The `ClassDirective` will apply style (class) changes to the template and manage change detection after it got an initial value.
So if the incoming `Observable` emits its value lazily (e.g. data coming from `Http`), your style/class will be
applied lazily as well. This can very positively impact the render performance of your application.

### Problems with `async` and `ngClass` or `class`

In Angular, a way of binding an observable to the `ngClass` or `class` directive could look like that:

```html
<div [ngClass]="{ 'visible': isVisible$ | async }"></div>
<div [class.visible]="isVisible$ | async"></div>
```

When using `ngClass` or `class` directive with an Observable value and the `async` pipe in the template of an Angular application, the `async` pipe relies on the Zone to be present - it doesn't really trigger change detection by itself. It marks the component and its children as dirty waiting for the Zone to trigger change detection. So, in case you want to create a zone-less application, the `async` pipe won't work as desired.

### Features of `rxClass`


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
  readonly setOfClasses$ = new BehaviorSubject<string[]>(['class-one', 'class-two']);
  readonly recordOfClasses$ = new BehaviorSubject<Record<string, boolean>>({
    'class-one': true,
    'class-two': false
  });
}
```
