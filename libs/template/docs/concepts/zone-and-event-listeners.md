### `NgZone` patch

By default `*rxFor` will create it's `EmbeddedViews` outside of `NgZone` which drastically speeds up the
performance.
There are scenarios where you want to opt-in to `NgZone` though. If views are created out of `NgZone`, all
`EventListeners` attached to them run out `NgZone` as well.

Take a look at the following example:

```ts
@Component({
  selector: 'app-root',
  template: `
    <!-- clickedHeroName won't get updated due to `NgZone` not noticing the click -->
    {{ clickedHeroName }}
    <ng-container *rxFor="let hero of heroes$; trackBy: trackHero">
      <!-- click runs out of `NgZone` -->
      <button (click)="heroClicked(hero)">{{ hero.name }}</button>
    </ng-container>
  `
})
export class AppComponent {
  clickedHeroName = '';
  heroClicked(hero: Hero) {
    // this will run out of `NgZone` and thus not update the DOM
    this.clickedHeroName = hero.name;
  }
}
```

There are several ways to get around this issue.
`*rxFor` can be configured to create views inside of `NgZone` with the `patchZone` flag:

```html
<ng-container *rxFor="let hero of heroes$; trackBy: trackHero; patchZone: true">
  <!-- click now gets detected by `NgZone` -->
  <button (click)="heroClicked(hero)">{{ hero.name }}</button>
</ng-container>
```

However, `patchZone: true` can in some cases have a negative impact on the performance of the `*rxFor` Directive.
Since the creation of the `EmbeddedViews` will most likely happen in batches, every batch will result in one
`NgZone` cycle resulting in a possible re-rendering of many other `Components`.

Another approach would be to manually detect changes coming from `unpatched` EventListeners or wrapping them in
`NgZone`.

```ts
export class AppComponent {
  clickedHeroName = '';

  constructor(
    private cdRef: ChangeDetectorRef, // option1
    private ngZone: NgZone // option 2
  ) {}

  heroClicked(hero: Hero) {
    // this will run out of `NgZone` and thus not update the DOM
    this.clickedHeroName = hero.name;
    this.cdRef.markForCheck(); // option 1

    // option 2
    this.ngZone.run(() => this.clickedHeroName = hero.name);
  }
}
```
