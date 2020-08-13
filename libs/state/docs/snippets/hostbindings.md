# HostBindings

Some examples how to reactively handle basic [`HostBindings`](https://angular.io/api/core/HostBinding) with `@rx-angular/state` `RxState`.

Sadly `HostBindings` are not able to bind to `Observable` sources out of the box. So we have to come up with custom solutions
in order to have fully reactive components.

In the following examples we will use the `rxLet` directive or the `push` pipe as replacements for angulars `async` pipe.
`rxLet` and `push` belong to the not yet released `@rx-angular/template` package.

Furthermore we want to express that we will come up with a more convenient solution facing this problem. This can be seen as WIP and
should not be the longterm solution to handle `HostBindings` in a fully reactive way.

Imagine you have the following state which you want to bind to properties of your host element.

```typescript
interface ComponentState {
  visible: boolean;
  top: number;
  maxHeight: number;
}
```

## Be aware of changeDetection - HostBindings are not reactive

In this setup we assign our `HostBindings` to the `get()` method of our state.

As stated in the title, we have to be aware changeDetection. On every changeDetection cycle, angular will re-evaluate
all `HostBindings`. If our component doesn't get flagged as dirty, our `HostBindings` won't get updated. So we have to make
sure that state changes that are related to the `HostBindings` value are actually triggering a re-render.

```typescript
@Component({
  providers: [RxState],
})
export class RxComponent {
  // Modifying the class
  @HostBinding('[class.is-hidden]') get isHidden() {
    return !this.state.get().visible;
  }
  // Modifying styles
  @HostBinding('[style.marginTop]') get marginTop() {
    return `${this.state.get().top}px`;
  }
  // Modifying styles
  @HostBinding('[style.maxHeight]') get maxHeight() {
    return `${this.state.get().maxHeight}px`;
  }

  constructor(private state: RxState<ComponentState>) {}
}
```

With this setup in place we have two options to get things done.

### Call ChangeDetection manually

Since rendering is a side-effect, we could utilize the `hold` method and register
a function which handles change detection for us.

```typescript
@Component({
  providers: [RxState],
})
export class RxComponent {
  // Modifying the class
  @HostBinding('[class.is-hidden]') get isHidden() {
    return !this.state.get().visible;
  }
  // Modifying styles
  @HostBinding('[style.marginTop]') get marginTop() {
    return `${this.state.get().top}px`;
  }
  // Modifying styles
  @HostBinding('[style.maxHeight]') get maxHeight() {
    return `${this.state.get().maxHeight}px`;
  }

  constructor(
    private state: RxState<ComponentState>,
    private cdRef: ChangeDetectorRef
  ) {
    state.hold(state.select(), () => this.cdRef.markForCheck());
  }
}
```

By calling `ChangeDetectorRef#markForCheck` after every state change, we flag our component dirty when needed and let angulars
`ChangeDetection` do it's magic for us.

### Let the template handle changeDetection

If you happen to need your variables not only for your `HostBindings` but aswell in the view, we could easily let
our viewHelpers take care of detecting changes. Just make sure all of your variables needed for the `HostBindings` are bound
to the view correctly.

Inside the component:

```typescript
  readonly viewState$ = this.state.select();
```

Inside the template:

```html
<ng-container *rxLet="viewState$; let s">
  <span *ngIf="s.visible">I am a visible span</span>
</ng-container>
```

In this scenario, the `rxLet` directive will flag your component as dirty every time a new state arrives. By assigning the
whole state object as to your `viewModel$`, any change will result in a re-rendering, thus updating your `HostBindings`.

## Render on your own

With this setup you can opt-out of the `ChangeDetection` of angular and manage `HostBindings` completely on your own.
This approach even works when calling `ChangeDetectorRef#detach` for your component.
We will utilize the `ElementRef` itself for this purpose and manipulate the DOM on our own.

Feel free to use angulars `Renderer2` if you want an abstraction layer, should work the exact same way.

```typescript
@Component({
  providers: [RxState],
})
export class RxComponent {
  constructor(
    private state: RxState<ComponentState>,
    private elementRef: ElementRef<HTMLElement>,
    private cdRef: ChangeDetectorRef
  ) {
    // optional: cdRef.detach();
    this.state.hold(this.state.select(), ({ visible, top, maxHeight }) => {
      const { nativeElement } = elementRef;
      nativeElement.style.marginTop = `${top ? top : 0}px`;
      nativeElement.style.maxHeight = `${maxHeight ? maxHeight : 100}px`;
      // by using this, we could assign more classes
      const classList: { [cls: string]: boolean } = {
        'is-hidden': !visible,
      };
      Object.keys(classList).forEach((cls) => {
        classList[cls]
          ? nativeElement.classList.add(cls)
          : nativeElement.classList.remove(cls);
      });
    });
  }
}
```
