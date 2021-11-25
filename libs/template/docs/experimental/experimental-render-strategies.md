## Experimental strategies

Those strageies are considered as experimental and might changed in the future. But you can try them right now and provide us feedback.

### 🧪 Detach Strategy

In terms of rendering, this strategy behaves the same as the local strategy.
Using this strategy will [`detach`](https://angular.io/api/core/ChangeDetectorRef#detach) the affected view from
Angulars change-detection tree.
In order to render changes properly, it re-attaches the view to the change detection tree before any rendering happens,
and detaches it again after changes got rendered.

Additional information about `detached` views:

- If a view is detached, its input bindings will still receive values
- Also any related code will get executed properly as well as using Angulars internal APIs such as `ViewChild`
- Detached views are not getting checked when their parent components call `detectChanges`
- `HostBindings` like `[class]` `@animation` ... are not getting updated properly, when the parent component does not detect a new change

| Name     | Zone Agnostic | Render Method     | Coalescing         | Scheduling              |
| -------- | ------------- | ----------------- | ------------------ | ----------------------- |
| `detach` | ✔             | ⭭ `detectChanges` | ✔ ComponentContext | `requestAnimationFrame` |
