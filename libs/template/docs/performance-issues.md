# Rendering Issues in Angular

A brief overview about what is about the current situation in terms of rendering in angular applications.

![Scheduling Options](https://raw.githubusercontent.com/rx-angular/rx-angular/master/libs/template/images/bad-rendering-performance-angular.png)

## Binding Reactive Sources

The current way of binding _reactive_ sources to a view in angular looks like that:

```html
{{ heroData$ | async }}
<ng-container *ngIf="heroData$ | async as data">{{data | json}}</ng-container>
<hero-list-component [value]="heroData$ | async"></hero-list-component>
```

The problem is, `async` pipe flags the component and all its **ancestors** as dirty.
It needs zone.js microtask queue to exhaust until `ApplicationRef.tick` is called to render all dirty marked
components from top to bottom.

This more often than not causes a huge amount of unnecessary re-renderings of components which didn't
had any changes in the first place.

While this approach is pretty convenient to use,
since the rendering gets brute-forced on any change, making REALLY sure anything gets re-rendered.
Heavy dynamic and interactive UIs suffer pretty bad from `zone.js ChangeDetection`.
This can lead to very bad performance or even unusable applications.
Furthermore, it turns out the `async` pipe does not work in zone-less environments as well as many third party
software as well.

The comprehensive toolset of `@rx-angular/template` solves most of those issues with or without `zone.js`.

## NgZone

`NgZone` assumes that DOM events like click, resize, focus, blur (+ `EventEmitters`, `setTimeOut`, `Promise.resolve()`, etc)
are always used by developers to dispatch actions which leads to state mutation. If one of those
get bound to/executed, a re-rendering for your component and all **ancestors** will be scheduled by NgZone.

The current way of binding events to DOM:

```html
<button (click)="doStuff($event)">click me</button>
<!-- a click will automagically schedule a re-render for you -->
```

One could argue this is helpful in way that it automagically renders changes for you.

However, this is not always the case. And we came to the conclusion this is not a good approach by any means.
In reality you will encounter a **massive** amount of over-renderings of pretty much any of your components.
This can be irrelevant on hardware accelerated powerhouses, user experiences will suffer a lot on lower end devices.

On top of that, we think that this technique inserts way too much _magic_ in the framework itself as well as keeping away
crucial control over what happens in your application.

You can play around in the `demo apps (expermiments, template-demo)` if you want
to get a clearer picture of what actually happens.

[The Deep Dive Podcast, Episode 1](https://twitter.com/TheDeepDiveDev/status/1272668862736150530?s=20):
Mythbusting the AsyncPipe with guests @angularlicious and @Michael_Hladky

The long term goal should be to eliminate NgZone by using the `'noop' NgZone`. However, this is only in a few scenarios
a feasible option. Most third party libraries
rely on some `NgZone` callbacks (including `@angular/components` & `@angular/cdk` pretty heavily). Some of the components will
stop working at all after using `'noop' NgZone`.

To encounter those issues at least partially, @rx-angular/template provides easy to use optimization tools
such as the [[unpatch] directive](https://github.com/rx-angular/rx-angular/tree/master/libs/template/docs/unpatch.md).

Nevertheless, if you know what you do and want to build a render performance critical application, `@rx-angular/template`
is the perfect candidate for being its base.

Some further information about NgZone (zone.js):

- [zone-js-references](https://gist.github.com/rx-angular/090684defbe926f398e8d3d4b0b1f0e1)
- [zone.js MODULE.md](https://github.com/angular/zone.js/blob/master/MODULE.md)
