# `NgZone` optimizations

In order to provide a seamless integration, if not configured otherwise,
`rxLet` will process any updates inside of `NgZone`.

However, this is a potential source of negative impacts on the performance of your application.
Since the updates processed by `rxLet` will most likely happen in batches, every batch will trigger one
`NgZone` cycle, leading to unnecessary work as well as possible over renderings of other components.

There are two ways to opt-out from `NgZone`.

## patchZone Input

`*rxLet` can be configured to create views inside of `NgZone` with the `patchZone` flag.

Take a look at the following example:

```ts
@Component({
  selector: 'app-root',
  template: `
    <!-- clickedHeroName won't get updated due to `NgZone` not noticing the click -->
    {{ clickedHeroName }}
    <!-- click runs out of `NgZone` -->
    <button *rxLet="heroes$; let hero; patchZone: false"
    (click)="heroClicked(hero)">
      {{ hero.name }}
    </button>
  `
})
export class AppComponent {
  clickedHeroName = '';

  heroClicked(hero: Hero) {
    // this will run out of `NgZone` and probably not update the DOM
    this.clickedHeroName = hero.name;
  }
}
```

## RX_RENDER_STRATEGIES_CONFIG

You can also set the `patchZone` config globally by providing a `RX_RENDER_STRATEGIES_CONFIG`.
See more about configuration under [render strategies](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-strategies/docs/README.md) especially the section [usage-in-the-template](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-strategies/docs/README.md#global)

```ts
@NgModule({
  providers: [{
    provide: RX_RENDER_STRATEGIES_CONFIG,
    useValue: {
      patchZone: false // this applies to all letDirectives
    }
  }]
})
```
