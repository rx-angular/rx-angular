### Projected Views (`parent`)

Imagine the following situation:

```ts
@Component({
  selector: 'app-list-component',
  template: `
    <ng-content select="app-list-item"></ng-content>
  `
})
export class AppListComponent {
 @ContentChildren(AppListItemComponent) appListItems: QueryList<AppListItemComponent>:
}
```

`AppListComponent` has a `contentOutlet` where it expects `AppListItemComponents` to be inserted into. In this case
`AppListComponent`s state is dependent on its `ContentChildren`.
This situation leads to the problem that `AppListComponent` needs to get informed about updates of its child views.
This is a known issue which has never been solved for `ngFor` (or other structural directives) especially in
combination with `CD OnPush` see here: (https://github.com/angular/angular/pull/35428)
`RxFor` solves this issue for you by providing a simple input parameter `parent: boolean`.
If set to `true`, `*rxFor` will automatically detect every other `Component` where its
`EmbeddedView`s were inserted into. Those components will get change detected as well in order to force
update their state accordingly.

The usage of `AppListComponent` looks like this:

```html
<app-list-component>
  <app-list-item
    *rxFor="
      let item of observableItems$;
      parent: true;
    "
  >
    <div>{{ item }}</div>
  </app-list-item>
</app-list-component>
```
