# Change detection and components

Angular's defalut change detection runs globally by marking a dirty path.

To run change detection for a single component we can use the `ChangeDetectorRef#detectChanges` method.
This will execute change detection on component level and the whole template get's updated.

Even if this is better than marking a path direty, the smallest unit in the change detection process is a components template.
For content or interaction rich components this is not enought to provide good UX. e.g. INP

By using RxAngular's template package and it's directives `rxLet`, `rxFor` and `rxIf` we can improve that and the smallest unit becomes the directive's `EmbeddedView`.
This enables fine-grainde reactivity on template binding level which comes with a dramatic performance boost.

[IMG pipe vs directive][]
