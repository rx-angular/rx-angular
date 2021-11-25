# The extended reactive context in RxAngular

If we think about any process, e.g. an HTTP request, we can differentiate different states in it.
The request can start, result in a valid response or throws an error. After that, the process is completed.

These states fit pretty much any process, they just differ in the number of emissions.

[`RxJS`](http://www.rxjs.dev) for example, maintains 3 different channels:

- `next`
- `error`
- `complete`

Where `next` can have zero to infinite emissions, and `error` and `complete` zero to 1 emission.

This differentiation works perfectly in code. However, when we start to project those channels and their changes into HTML
we sometimes end up implementing a hack for another potential state that is not provided by Angular.

In the above example with the HTTP request, we may want to indicate that the process was started,
but no result, neither a value nor an error nor complete arrived yet from the process.

This leads not only to a cluttered HTML, but, what's worse, to the `eager template`.

What does it mean?

Imagine you would have a very costly HTML structure.
Wouldn't it be cool to only create, evaluate or render that template if a value arrives?

In `@rx-angular/template`, we provide channels for the 3 RxJS ones as well as the 4th state in the reactive context, 🔥`suspense`🔥.

The context naming is prefixed with `rx` as always in this repo:

- 💡`rxSuspense`
- `rxNext`
- `rxError`
- `rxComplete`

This is used internally in different implementations like `RxNotification` or `RxViewContext`,
but also exposed over the public API over the template names and the local variables.

We can find those naming conventions when using a structural directive like `*rxLet` and their
template bindings or local variables.

If we create a template to be presented for the loading state we can use `ng-template` as following:

```html
<ng-container
  *rxLet="hero$; let hero; rxSuspense: suspenseView; rxError: errorView; rxComplete: completeView"
>
  {{ hero.name }}
  <ng-container>
    <ng-template #suspenseView>Loading...</ng-template>
    <ng-template #errorView>Error!</ng-template>
    <ng-template #completeView>Complete.</ng-template></ng-container
  ></ng-container
>
```

The value of the different channels can also be accessed by the template variables.
The only difference here, they are prefixed with an '$' character.

```html
<ng-container
  *rxLet="hero$; let hero; s = $rxSuspense; e = $rxError; c = $rxComplete"
>
  {{ s }}, {{ hero }}, {{ e }}, {{ c }}
  <ng-container></ng-container
></ng-container>
```

The respective typings look like that:

```typescript
// TemplateManager - view context
interface RxViewContext<T> {
  $rxSuspense: boolean;
  $implicit: T; // next
  $rxError: false | Error;
  $rxComplete: boolean;
}
```

Another situation where you will find the extended reactive context channels is when you use the `renderCallback` in the template:

```typescript
readonly renderCallback$ = new Subject<string>();
```

```html
<ng-template
  let-content
  [rxLet]="content$"
  (rendered)="onTemplateRendered($event)"
>
  {{ content }}
</ng-template>
```

or in the class:

```typescript
 @ViewChild(LetDirective) rxLet: LetDirective<string>;
 this.rxLet.rendered.subscribe(value => console.log('afterRender', value));
```

In both cases the type of $event is `RxNotification` which is typed like this:

```typescript
import { Notification } from 'rxjs';
export type RxNotificationKind =
  | 'rxSuspense'
  | 'rxNext'
  | 'rxError'
  | 'rxComplete';
type NotificationExtract = 'value' | 'hasValue' | 'error';
export type RxNotification<T> = Pick<Notification<T>, NotificationExtract> & {
  kind: RxNotificationKind;
};
```

---

As a sum up, we now know that `@rx-angular/template` provides an extended reactive context with the `suspense` channel.
Use suspense as a template wherever possible as it reduces rendering work drastically.
Also, be sure to remember that we have also access to the values of the 4 channels as local variables in the template and as the notifications from the render callback.
