### Using the RenderCallback

The RenderCallback notifies users about when the `LetDirective` "rendered" the latest values of the
active template.
At the time the `rendered` callback emits, the DOM should be already updated with the latest changes connected
to this instance.
The callback will emit the latest value rendered to the template.

Since structural directives currently do not support `@Output` bindings, developers have to use other mechanics
to access this event.
Beyond the traditional approach the `LetDirectives` offers an input property as renderCallback.
This enables developers to bind a `NextObserver` (e.g. `Subject`) to the `LetDirective`which will emit after
rendering happened.

You can choose between using the [Template syntax](https://angular.io/guide/template-syntax), injecting the
`LetDirective` as `@ViewChild()` and subscribe the event manually or providing a RenderCallback on your own.

Please note that due to the built-in
[coalescing][https://rx-angular.io/docs/template/concepts] can cause this
callback different in situations where multiple `LetDirectives` are used to render the same
`Component`. Make sure to subscribe to every instance in your component to avoid missing render
notifications.

#### RenderCallback Input

```html
<ng-container
  *rxLet="content$; let content; strategy: strategyName$; renderCallback: renderCallback$"
>
  <div class="example-box">{{ content }}</div>
</ng-container>
```

```ts
// inside component:
readonly renderCallback$ = new Subject<string>();
```

#### Template syntax

```html
<!-- template syntax with output binding -->
<ng-template
  let-content
  [rxLet]="content$"
  (rendered)="onTemplateRendered($event)"
>
  <div class="example-box">{{ content }}</div>
</ng-template>
```

#### ViewChild

```html
<div *rxLet="content$; let content" class="example-box">{{ content }}</div>
```

```ts
// inside of your component
\@ViewChild(LetDirective) rxLet: LetDirective<string>;
this.rxLet.rendered.subscribe(value => console.log('afterRender', value));
```
