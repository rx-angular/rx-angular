### Detach Strategy

The Detach Strategy shares its behavior with the **Local Strategy** . It can be seen as
the **Local Strategies** more aggressive brother. Instead of just rendering scheduled changes,
it will also `detach` (`ChangeDetectorRef#detach`) this very `ChangeDetectorRef` from the detection cycle.
Use this strategy at your own risk. It provides absolute **maximum performance** since your `Component` is
effectively resilient against re-renderings coming from any other source than itself. But it will come with
some down sights as you will see when using it :). Have fun!!

| Name     | ZoneLess VE/I | Render Method VE/I | Coalescing             |
| -------- | ------------- | ------------------ | ---------------------- |
| `detach` | ✔️/✔️         | dC / ɵDC           | micro + animationFrame |

## Custom Strategies

_coming soon_
