# Proposal for a new library `RxAngular`

Reactive primitives for components

# https://github.com/ngrx/platform/pull/2046

---

- Start Date: 2019-08-07
- RFC: Component: Proposal for a new package `component` 

---
Table of Content 
---

<!-- toc -->

- Summary
- Motivation
- Overview
  * Input Decorator
  * Output Decorator
  * HostListener Decorator
  * HostBinding Decorator
  * Input Binding
  * Template Bindings
  * Output Binding
  * Component and Directive Life Cycle Hooks
  * Service Life Cycle Hooks
- Suggested Extensions under @ngRx/component Package
  * Push Pipe
  * Let Structural Directive
  * Observable Life Cycle Hooks
    + [electChanges RxJS Operator
  * Observable Input Bindings
  * Observable Output Bindings
  * Local State Management
    + selectSlices RxJS Operator
- How We Teach This
- Drawbacks
- Alternatives

<!-- tocstop -->


---

# Summary

This RFC proposes a nice reactive integration of components/directives in Angular. 
It's main goal is to provide a set of primitives that serve as the glue between custom reactive code and the framework.

# Motivation

Parts of Angular like the `ReactiveFormsModule`, `RouterModule`, `HttpClientModule` etc. are already reactive. 
And especially when composing them together we see the benefit of observables. i.e. http composed with router params.
For those who prefer imperative code, it's little effort to restrict it to a single subscription.

On the other hand for those who prefer reactive code, it's not that easy. 
A lot of conveniences is missing, and beside the `async` pipe there is pretty much nothing there to take away the manual mapping to observables.  
Furthermore, an increasing number of packages start to be fully observable based. 
A very popular and widely used example is [ngRx/store](https://ngrx.io/store). It enables us to maintain global push-based state management based on observables. 
Also, other well-known libraries, [angular material](https://material.angular.io/) provide a reactive way of usage.

This creates even more interest and for so-called `reactive primitives` for the Angular framework, like the `async` and other template syntax, decorators and services.
 
The first step would be to **give an overview** of the needs and a **suggested a set of extensions** to make it more convenient to **work in a reactive architecture**.
In the second step, We will show the best usage and common problems in a fully reactive architecture.


This proposal

 - **give an overview** of the needs
 
 - **suggests a set of extensions** to make it more convenient to work reactive with angular components
  
# Overview

As the main requirement for a reactive architecture in current component-oriented 
frameworks are handling properties and events of components as well as several specifics for 
rendering and composition of observables.

In angular, we have an equivalent to properties and events, _input_ and _output_ bindings_.
But we also have several other options available to interact with components.

The goal is to list all features in angular that need a better integration. 
We cover an imperative as well as a reactive approach for each option.

We consider the following decorators:
- Input Decorator
- Output Decorator
- HostListener Decorator 
- HostBinding Decorator

And consider the following bindings:
- Input Binding
- Output Binding

## Input Decorator

Inside of a component or directive we can connect properties with the components in it bindings over the `@Input()` decorator.
This enables us to access the values of the incoming in the component. 

**_Receive property values over `@Input('state')`_**

**Imperative approach:**

```typescript
@Component({
  selector: 'app-child',
  template: `<p>State: {{state | json}}</p>`
})
export class ChildComponent  {
  @Input() state;
}
``` 

**Reactive approach:**

Here we have to consider to cache the latest value from state-input binding.
As changes fires before AfterViewInit, we normally would lose the first value sent. Using some caching mechanism prevents this.
Furthermore and most importantly **this makes it independent from the lifecycle hooks**.

```typescript
@Component({
  selector: 'app-child',
  template: `<p>State: {{state$ | async | json}}</p>`
})
export class ChildComponent  {
  state$ = new ReplaySubject(1);
  @Input() 
  set state(v) {
      this.state$.next(v);
  };
}
``` 

**Needs:**   

Some decorator that **automates the boilerplate** of settings up the subject and connection it with the property.   
Here `ReplaySubject` is critical because of the life cycle hooks. 
`@Input` is fired first on `OnChange` where the first moment where the view is ready would be `AfterViewInit`

> **Boilerplate Automation**   
> For every binding following steps could be automated:
> - setting up a `Subject`
> - hooking into the `setter` of the input binding and `.next()` the incoming value

> **Early Producer**   
> All input bindings are so-called "early producer". A cache mechanism is needed as followed:
> - Use a `ReplaySubject` with `bufferSize` of `1` to emit notifications

--- 

## Output Decorator

**_Send event over `eventEmitter.emit(42)`_**

Inside of a component or directive, we can connect events with the components output bindings over the `@Output()` decorator.
This enables us to emit values to its parent component. 

**Imperative approach:**

```typescript
@Component({
  selector: 'app-child',
  template: `<button (click)="onClick($event)">Btn</button>`
})
export class ChildComponent  {
  @Output()
  clickEmitter = new EventEmitter();
 
  onClick(e) {
    this.clickEmitter.next(e.timeStamp); 
  }
}
``` 

**Reactive approach:**

Here we change 2 things.
We use a `Subject` to retrieve the button click event and 
**provide an observable instead of an EventEmitter for @Output()**.

```typescript
@Component({
  selector: 'app-child',
  template: `<button (click)="clickEmitter.next($event)">Btn</button>`
})
export class ChildComponent  {
  btnClick = new Subject();
  
  @Output()
  clickEmitter = this.btnClick
    .pipe(
      map(e => e.timeStamp)
    );
}
```

**Needs:**   
No need for an extension.

> **No need for custom extensions**   
>  Due to the fact that we can also provide an `Observable` as `EventEmitters` there is **no need for as extension**


---   


## HostListener Decorator

**_Receive event from the host over `@HostListener('click', ['$event'])`_**

Inside of a component or directive, we can connect host events with a component method over the `@HostListener()` decorator.
This enables us to retrieve the host's events. 

**Imperative approach:**

```typescript
@Component({
  selector: 'app-child',
  template: `<p>Num: {{num}}</p>`
})
export class ChildComponent  {
  num = 0;
  @HostListener('click', ['$event'])
  onClick(e) {
    this.num = ++this.num;
  }
}
``` 

**Reactive approach:**

```typescript
@Component({
  selector: 'app-child',
  template: `<p>Num: {{num$ | async}}</p>`
})
export class ChildComponent  {
  numSubj = new Subject();
  num$ = this.numSubj.pipe(scan(a => ++a));

  @HostListener('click', ['$event'])
  onCllick(e) {
    this.numSubj.next(e);
  }
}
```

**Needs:**   

We would need a decorator **automates the boilerplate** of the `Subject` creation and connect it with the property. 
As `subscriptions` can occur earlier than the `Host` could send a value we speak about "early subscribers". 
This problem can be solved as the subject is created in with instance construction.

> **Boilerplate Automation**   
> For every binding following steps could be automated:
> - setting up a `Subject`
> - hooking into the `setter` of the input binding and `.next()` the incoming value

> **Early Producer**   
> Make sure the created `Subject` it present early enough

---   

## HostBinding Decorator

**_Receive property changes from the host over `@HostBinding('class')`_**

Inside of a component or directive, we can connect the DOM attribute as from the host with the component property. 
Angular automatically updates the host element over change detection.
In this way, we can retrieve the host's properties changes.


**Imperative approach:**

```typescript
@Component({
  selector: 'app-child',
  template: `<p>color: {{className}}</p>`,
})
export class ChildComponent  {
  className = 'visible';
  
  @HostBinding('class')
  get background() {
   return this.className;
  }
}
``` 

**Reactive approach:**

```typescript
TBD
```

**Needs:**   

**Provide an observable** instead of a function.

Here again, we would need a decorator that **automates** the `Subject` creation and connection. 
As subscriptions can occur earlier than the `Host` could be ready we speak about "early subscribers". 
This problem can be solved as the subject is created in with instance construction.

> **Boilerplate Automation**   
> For every binding following steps could be automated:
> - setting up a `Subject`
> - hooking into the `setter` of the input binding and `.next()` the incoming value

> **Early Subscribers**   
> Make sure the created `Subject` it present early enough


---   


## Input Binding 

**_Send value changes to child compoent input `[state]="state"`_**

In the parent component, we can connect component properties to the child
component inputs over specific template syntax, the square brackets `[state]`.
Angular automatically updates the child component over change detection.
In this way, we can send component properties changes.

**Imperative approach:**

```typescript
@Component({
  selector: 'my-app',
  template: `
    <app-child [state]="state"></app-child>
  `
})
export class AppComponent  {
  state = 42;
}
``` 

**Reactive approach:**

Important to say is that with this case **we can ignore the life cycle hooks as the subscription happens always right in time**.
We cal rely on trust that subscription to `state$` happens after `AfterViewInit`.


> **Inconsistent handling of undefined variables**   
> It is important to mention the inconsistent handling of undefined variables and observables that didn't send a value yet. 

```typescript
@Component({
  selector: 'my-app',
  template: `
    <app-child [state]="state$ | async"></app-child>
  `
})
export class AppComponent  {
  state$ = of(42);
}
```

**Needs:**   
As we know exactly when changes happen we can trigger change detection manually. Knowing the advantages of subscriptions over the template and lifecycle hooks the solution should be similar to `async` pipe.

> **NgZone could be detached**   
> As all changes can get detected we could detach the pipe from the `ChangeDetection` and trigger it on every value change

> **Performance optimisations**
> - consider scheduling over `AnimationFrameScheduler` the output is always for the view

> **Implement strict and consistent handling of undefined for pipes**   
> A pipe similar to `async` that should act as follows:
> - when initially passed `undefined` the pipe should **forward `undefined`** as value as on value ever was emitted
> - when initially passed `null` the pipe should **forward `null`** as value as on value ever was emitted
> - when initially passed `of(undefined)` the pipe should **forward `undefined`** as value as `undefined` was emitted
> - when initially passed `of(null)` the pipe should **forward `null`** as value as `null` was emitted
> - when initially passed `EMPTY` the pipe should **forward `undefined`** as value as on value ever was emitted
> - when initially passed `NEVER` the pipe should **forward `undefined`** as value as on value ever was emitted
> - when reassigned a new `Observable` the pipe should **forward `undefined`** as value as no value was emitted from the new
> - when completed the pipe should **keep the last value** in the view until reassigned another observable
> - when sending a value the pipe should **forward the value** without changing it

Already existing similar packages:    
- https://github.com/ngrx-utils/ngrx-utils#push-pipe

--- 

## Template Bindings   
In the following, we try to explore the different needs when working with observables in the view.  

Lets examen different situations when binding observables to the view and see how the template syntax that Angular already provides solves this. Let's start with a simple example.

**Multiple usages of `async` pipe**
Here we have to use the `async` pipe twice. This leads to a polluted template and introduces another problem with subscriptions.
As observables are mostly unicasted we would receive 2 different values, one for each subscription.
This pushes more complexity into the component code because we have to make sure the observable is multicasted. 

```html
@Component({
  selector: 'my-app',
  template: `
    {{random$ | async}}
    <comp-b [value]="random$ | async">
    </comp-b>
  `})
export class AppComponent  {
  random$ = interval(1000)
    .pipe(
      map(_ => Math.random()),
      // needed to be multicasted
      share()
    );
}
```

**Binding over the `as` syntax**
To avoid such scenarios we could use the `as` syntax to bind the observable
to a variable and use this variable multiple times instead of using the `async` pipe multiple times.

```html
@Component({
  selector: 'my-app',
  template: `
    <ng-container *ngIf="random$ | async as random">
        {{random}}
        <comp-b [value]="random">
        </comp-b>
    </ng-container>
  `})
export class AppComponent  {
  random$ = interval(1000)
    .pipe(
      map(_ => Math.random())
    );
}
```

**Binding over the `let` syntax**
Another way to avoid multiple usages of the `async` pipe is the `let` syntax to bind the observable to a variable.

```html
@Component({
  selector: 'my-app',
  template: `
    <ng-container *ngIf="random$ | async; let random = ngIf">
        {{random}}
        <comp-b [value]="random">
        </comp-b>
    </ng-container>
  `})
export class AppComponent  {
  random$ = interval(1000)
    .pipe(
      map(_ => Math.random())
    );
}
```

Both ways misuse the `*ngIf` directive to introduce a context variable and not to display or hide a part of the template.
This comes with several downsides:
- **we lose the meaning** of the `*ngIf` directive 
- the functionality of hiding displaying itself.
  **The `*ngIf` directive is triggered be falsy values**, but we don't want to conditionally show or hiding content, 
  but just introduce a context variable. This could lead to problems in several situations. 
- The functionality of **subscribing has to be done separately over the `async` pipe**  

**`*ngIf` directive triggered by falsy values**
```html
@Component({
  selector: 'my-app',
  template: `
    <ng-container *ngIf="random$ | async as random">
        {{random}}
        <comp-b [value]="random">
        </comp-b>
    </ng-container>
  `})
export class AppComponent  {
  random$ = interval(1000)
    .pipe(
      map(_ => Math.random() > 0.5 ? 1 : 0)
    );
}
```

As we can see, in this example the `ng-container` would only be visible if the value is `1` and therefore `truthy`. 
All `falsy` values like `0` would be hidden. This is a problem in some situations. 

We could try to use `*ngFor` to avoid this.

**Context variable over the `*ngFor` directive**
```html
@Component({
  selector: 'my-app',
  template: `
    <ng-container *ngFor="let random of [random$ | async]">
        {{random}}
        <comp-b [value]="random">
        </comp-b>
    </ng-container>
  `})
export class AppComponent  {
  random$ = interval(1000)
    .pipe(
      map(_ => Math.random() > 0.5 ? 1 : 0)
    );
}
```

By using `*ngFor` to create a context variable we avoid the problem with `*ngIf` and `falsy` values.
But we still **misuse a directive**. Additionally `*ngFor` is less performant than `*ngIf`.   

**Nested `ng-container` problem**

```html
@Component({
  selector: 'my-app',
  template: `
  <ng-container *ngIf="observable1$ | async as color">
    <ng-container *ngIf="observable2$ | async as shape">
      <ng-container *ngIf="observable3$ | async as name">
        {{color}}-{{shape}}-{{name}}
        <app-color [color]="color" [shape]="shape" [name]="name">
        </app-color>
       </ng-container>
     <ng-container>
  </ng-container>
  `})
export class AppComponent  {
  observable1$ = interval(1000);
  observable2$ = interval(1500);
  observable3$ = interval(2000);
}
```

Here we nest `ng-container` which is a useless template code.
A solution could be to compose an object out of the individual observables.
This can be done in the view or the component.

**Composing Object in the View**

```html
@Component({
  selector: 'my-app',
  template: `
  <ng-container
    *ngIf="{
      color: observable1$ | async,
      shape: observable2$ | async,
      name:  observable3$ | async
    } as c">
    {{color}}-{{shape}}-{{name}}
    <app-other-thing [color]="c.color" [shape]="c.shape" [name]="c.name">
    </app-other-thing>
  </ng-container>
  `})
export class AppComponent  {
  observable1$ = interval(1000);
  observable2$ = interval(1500);
  observable3$ = interval(2000);
}
```

Here we can use `*ngIf` again because and object is always `truthy`. However, the downside here is
we have to use the `async` pipe for each observable. `Furthermore we have less control over the single observables. 
A better way would be to **move the composition into the template** and only export final compositions to the template.

**Composition in the Component**
```html
@Component({
  selector: 'my-app',
  template: `
  <ng-container *ngIf="composition$ | async as c">
    {{color}}-{{shape}}-{{name}}
    <app-color [color]="c.color" [shape]="c.shape" [name]="c.name">
    </app-color>
  </ng-container>
  `})
export class AppComponent  {
  observable1$ = interval(1000);
  observable2$ = interval(1500);
  observable3$ = interval(2000);

  composition$ = combineLatest(
    this.observable1$.pipe(startWith(null), distinctUntilChanged()),
    this.observable2$.pipe(startWith(null), distinctUntilChanged()),
    this.observable3$.pipe(startWith(null), distinctUntilChanged()),
    (color, shape, name) => ({color, shape, name})
  )
  .pipe(
    share()
  );

}
```
As we see in this example in the component we have full control over the composition. 


**Needs:**   
We need **a directive** that just **defines a context variable** without any interaction of the actual dom structure.
The **syntax should be simple and short** like the `as` syntax. It should take over basic performance optimizations.
Also, the **consistent handling of null and undefined** should be handled.

> **Implement more convenient binding syntax**   
> To improve usability we should fulfill the following:
> - the context should be always present. `*ngIf="{}"` would do that already
> - avoid multiple usages of the `async pipe
> - move subscription handling in the directive
> - better control over the context. Maybe we could get rid of the `as` as variable??
> - implement an internal layer to handle null vs undefined etc
> - implement the option to put additional logic for complete and error of an observable

> **Basic performance optimisations**
> - consider scheduling over `AnimationFrameScheduler` the output is always for the view
> - handling changes could be done programmatically. Good for running zone-less
 
> **Implement strict and consistent handling of null/undefined for the bound value**    
> Please visit the section [Input Binding](Input-Binding) for a full list of requirements


Already existing similar packages:    
- https://www.npmjs.com/package/rx-context
- https://netbasal.com/diy-subscription-handling-directive-in-angular-c8f6e762697f
- https://github.com/ngrx-utils/ngrx-utils#nglet-directive
- https://www.npmjs.com/package/@se-ng/let

---   

## Output Binding 

**_Receive events from child component over `(stateChange)="fn($event)"`_**

In the parent component, we can receive events from child components over specific template syntax, the round brackets `(stateChange)`.
Angular automatically updates fires the provides function over change detection.
In this way, we can receive component events.

**Imperative approach:**

```typescript
@Component({
  selector: 'my-app',
  template: `
    state: {{state}}
    <app-child (stateChange)="onStateChange($event)"></app-child>
  `
})
export class AppComponent  {
  state;
  onStateChange(e) {
    this.state = e; 
  }
}
``` 

**Reactive approach:**

```typescript
@Component({
  selector: 'my-app',
  template: `
    state: {{state$ | async}}<br>
    <app-child (stateChange)="state$.next($event)"></app-child>
  `
})
export class AppComponent  {
  state$ = new Subject();
}
```

**Needs:**    
As it is minimal overhead we can stick with creating a `Subject` on our own.

> **No need for custom extensions**   
>  Due to the fact of the minimal overhead and the resources of creating a custom `Decorator` for it there **no need for as extension**

---   

## Component and Directive Life Cycle Hooks

As the component's logic can partially rely on the components life cycle hooks we also need to consider the in-out evaluation. 

Angular fires a variety of lifecycle hooks. Some of them a single time some of them only once a components lifetime.

Angulars life cycle hooks are listed ere in order:   
(Here the Interface name is used. The implemented method starts with the prefix 'ng')
- OnChanges (ongoing, transports changes)
- OnInit (single shot)
- DoCheck (ongoing)
- AfterContentInit (single shot)
- AfterContentChecked (ongoing)
- AfterViewInit (single shot)
- AfterViewChecked (ongoing)
- OnDestroy (single shot)

The goal here is to find a unified way to have single shot, as well as ongoing life cycle hooks, and observable.

**Imperative approach:**   

```typescript
@Component({
  selector: 'app-child',
  template: `<p>change: {{changes | json}}</p>`
})
export class ChildComponent implements OnChanges {
   @Input()
   state;

   changes;

  ngOnChanges(changes) {
    this.changes= changes;
  }
}
``` 

**Reactive approach:**   
As above mentioned in section Input Decorator we **replay the latest value to avoid timing issues** related to life cycle hooks.

```typescript
@Component({
  selector: 'app-child',
  template: `<p>change: {{changes$ | async | json}}</p>`
})
export class ChildComponent implements OnChanges {
  @Input() state;
   
  onChanges$ = new ReplaySubject(1);
   
  changes$ = this.onChanges$
      .pipe(map(changes => changes));

  ngOnChanges(changes) {
    this.onChanges$.next(changes);
  }
}
```

**Handle general things for hooks:**   

Following things need to be done for every lifecycle hook:
- every life cycle replays the last value and completion
- errors are swallowed and complete is returned instead
- every hook should be tied to the lifecycle of the component

```typescript
@Component({
  selector: 'app-child',
  template: `<p>change: {{changes$ | async | json}}</p>`
})
export class ChildComponent implements OnChanges {
  @Input() state;
   
  onDestroy$$ = new ReplaySubject(1);
  onDestroy$ = this.onDestroy$$.pipe(catchError(e => EMPTY));
  
  onChanges$$ = new ReplaySubject(1);
  onChanges$ = this.onChanges$$.pipe(catchError(e => EMPTY), takeUntil(this.onDestroy$));
  
   
  ngOnChanges(changes) {
    this.onChanges$.next(changes);
  }
  
  ngOnDestroy(changes) {
    this.onDestroy$.next(changes);
  }
}
```

**Handle hook specific stuff:**   

To handle the differences in lifecycle hooks we follow the following rules:
- single shot life cycle hooks complete after their first emission
- single shot life cycle hooks swallow errors and emit the last void
- on-going life cycle hooks just complete on error

```typescript
@Component({
  selector: 'app-child',
  template: `<p>change: {{changes$ | async | json}}</p>`
})
export class ChildComponent implements OnChanges {
  @Input() state;
  
  const singleShotOperators = pipe(
    take(1),
    catchError(e => of(void)),
    takeUntil(this.onDestroy$)
  );
  const ongoingOperators = pipe(
    catchError(e => EMPTY),
    takeUntil(this.onDestroy$)
  );
  
  onChanges$ = this.onChanges$$.pipe(this.ongoingOperators);
  onInit$ = this.onInit$$.pipe(this.singleShotOperators);
  doCheck$ = this.doCheck$$.pipe(this.ongoingOperators);
  afterContentInit$ = this.afterContentInit$$.pipe(this.singleShotOperators);
  afterContentChecked$ = this.afterContentChecked$$.pipe(this.ongoingOperators);
  afterViewInit$ = this.afterViewInit$$.pipe(this.singleShotOperators);
  afterViewChecked$ = this.afterViewChecked$$.pipe(this.ongoingOperators);
  onDestroy$ = this.onDestroy$$.pipe(take(1));
   
  ngOnChanges(changes) {
    this.onChanges$.next(changes);
  }
  
  ngOnDestroy(changes) {
    this.onDestroy$.next(changes);
  }
}
```


**Needs**   
We need a decorator to **automates the boilerplate** of the `Subject` creation and connect it with the property away. 

Also `subscriptions` can occur earlier than the `Host` could send a value we speak about "early subscribers". 
This problem can be solved as the subject is created in with instance construction.

> **Boilerplate Automation**   
> For every binding following steps could be automated:
> - setting up a `Subject`
> - hooking into the `setter` of the input binding and `.next()` the incoming value
> - hiding observer methods form external usage

> **Respect Lifetime and State of Lifecycles**   
> - subscription handling tied to component lifetime
> - single shot observables complete after their first call

> **Late Subscribers**   
> - As subscriptions could happen before values are present (subscribing to `OnInit` in the constructor) 
>   we have to make sure the Subject is created early enough for all life cycle hooks
> - on subscription to already completed observable of a lifecycle it should return the last event and complete again. 

---   

## Service Life Cycle Hooks

In general, services are global or even when lazy-loaded the are not unregistered at some point in time.
The only exception is Services in the `Components` `providers` 
Their parts of the services logic could rely on the life of the service, which is exactly the lifetime of the component. 

Angular for such scenarios angular provides the `OnDestroy` life cycle hook for classes decorated with `@Injectable`.

The goal here is to find a unified way to have the services `OnDestroy` life cycle hooks as observable.

**Imperative approach:**   

```typescript
@Component({
  selector: 'app-child',
  template: ``,
  providers: [LocalProvidedService]
})
export class ChildComponent implements OnChanges {
  constructor(private s: LocalProvidedService) {
  }
}

export class LocalProvidedService implements OnDestroy {
  
  constructor() {
  }

  ngOnDestroy(changes) {
    console.log('LocalProvidedService OnDestroy');
  }
}
``` 

**Reactive approach:**   

```typescript
@Component({
  selector: 'app-child',
  template: ``,
  providers: [LocalProvidedService]
})
export class ChildComponent implements OnChanges {
  constructor(private s: LocalProvidedService) {
  }
}
@Injctable({
  providedIn: 'root'
})
export class LocalProvidedService implements OnDestroy {
  onDestroy$ = new Subject();
   
  constructor() {
     this.onDestroy$subscribe(_ => console.log('LocalProvidedService OnDestroy');)
  }

  ngOnDestroy(changes) {
    this.onDestroy$.next();
  }
}
```

**Needs**   
We need a decorator to **automates the boilerplate** of the `Subject` creation and connect it with the property away. 

> **Boilerplate Automation**   
> For every binding following steps could be automated:
> - setting up a `Subject`
> - hooking into the `setter` of the input binding and `.next()` the incoming value
> - we should NOT override but EXTEND the potentially already existing functions

---   

# Suggested Extensions under @ngRx/component Package

We propose adding an *additional* package to ngRx to support a better reactive experience in components.

We will manage releases of these packages in three phases:

 - discussion phase: Based on this RFC we will figure out the needs and possible solutions
 - discovery phase: A set of POC's and releases under experimental will help to have first working drafts
   - here I would go with view relate parts first as they are smaller in scope 
   - then i would move forward with component internal parts like `@Input()`
 - stabilization: once we have a complete set of the packages, its parts and their features stabilized, we can go for the final API design.

Based on the above listing and their needs we suggest a set of Angular extensions that should make it easier to set up a fully reactive architecture.

---

**Extensions suggested:**
- Push Pipe
- Let Structural Directive
- Observable Life Cycle Hooks
  - selectChange RxJS Operator
- Observable Input Bindings
- Observable Output Bindings
- Observable Host Bindings
- Observable Host Listener


## Push Pipe

An angular pipe similar to the `async` pipe but triggers `detectChanges` instead of `markForCheck`.
This is required to run zone-less. We render on every pushed message.
(currently, there is an [isssue](https://github.com/angular/angular/issues/31438) with the `ChangeDetectorRef` in ivy so we have to wait for the fix.

The pipe should work as template binding `{{thing$ | push}}` 
as well as input binding `[color]="thing$ | push"` and trigger the changes of the host component.

```html
<div *ngIf="(thing$ | push) as thing">
  color: {{thing.color}}
  shape: {{thing.shape}}
<div>

<app-color [color]="(thing$ | push).color">
</app-color>
```

**Included Features:**
- subscription handling overview  life cycle
- a unified way of handling null and undefined with streams
- optional flag to turn off scheduling over `AnimationFrameScheduler` (on by default)
- change detection is done manually which allows it to work zone-less too

## Let Structural Directive

The `*let` directive serves a convenient way of binding multiple observables in the same view context.
It also helps with several default processing under the hood.

The current way of handling subscriptions in the view looks like that:

```html
<ng-container *ngIf="observable1$ | async as c">
  <app-color [color]="c.color" [shape]="c.shape" [name]="c.name">
  </app-color>  
</ng-container>
```

The `*let` directive take over several things and makes it more convenient and save to work with streams in the template
`*let="{o: o$, t: t$} as s;"` 

```html
<!-- observables = { color: observable1$, shape: observable2$, name:  observable3$ } -->

<ng-container *let="observable as c">
  <app-color [color]="c.color" [shape]="c.shape" [name]="c.name">
  </app-color>
</ng-container>

<ng-container *let="observable; let c">
  <app-color [color]="c.color" [shape]="c.shape" [name]="c.name">
  </app-color>
</ng-container>

<ng-container *let="observable; color as c; shape as s; name as n">
  <app-color [color]="c" [shape]="s" [name]="n">
  </app-color>
</ng-container>
```

**Included Features:**
- binding is always present. (`*ngIf="{}"` normally effects it)
- it takes away the multiple usages of the `async` pipe 
- propper handling of null and undefined values
- removes state slices if bound observable completes or errors
- an option to disable scheduling over `AnimationFrameScheduler` (on by default)
- control change detection and therefore can run zone-less

## Observable Life Cycle Hooks

A thing which turns a lifecycle method into an observable and assigns it to the related property.

The thing should work as a proxy for all life cycle hooks 
as well as forward passed values i.e. `changes` coming from the `OnChanges` hook.

```typescript
 onInit$; // ??? very elegant and intuitive way to get an observable from a life-cycle hook
 onDestroy$;  // ??? very elegant and intuitive way to get an observable from a life-cycle hook

  this.onInit$
    .pipe(
      switchMapTo(interval(1000)),
      map(_ => Date.now()),
      takeUntil(this.onDestroy$)
    )
    .subscribe();
```

**Included Features**
- it handles late subscribers.
- exposes only observables
- respects single shot vs ongoing life-cycles
- subscription handling over the component lifetime
- return the latest value when resubscribing

### selectChanges RxJS Operator


An operators `selectChanges` to select one or many specific slices from `SimpleChange`. 
This operator can be used in combination with `onChanges$`.

It also provides a very early option to control the forwarded values.

**Example of selectSlice operator**
```typescript
export class MyComponent {
 // ??? very elegant and intuitive way to get an observable from a life-cycle hook
  onChanges$: Observable<SimpleChanges>;

  @Input() state;
  state$ = this.onChanges$.pipe(getChange('state'));
}
```

Following things are done under the hood:
- pull out `currentValue` from `SimpleChanges` object
- optional it could have a parma for a custom comparison function

## Observable Input Bindings

A property decorator which turns component or directive input binding into an observable and assigned it to the related property.

```typescript
@Component({
  selector: 'app-child',
  template: `<p>input: {{input$ | async}}</p>`,
})
export class ChildComponent  {
  // ??? very elegant and intuitive way to get an observable from a life-cycle hook
  input$;
}
```

Following things are done under the hood:
- It caches to consider late subscribers (life cycle hook related) 
- It is multicasted to avoid multiple subscriptions
- It works with WebComponents and AngularComponents

## Observable Output Bindings

A property decorator which turns a view event into an observable and assigns it to the related property.

The solution should work do most of his work in the component itself. 
Only a small piece in the template should be needed to link the view with the component property.

```typescript
@Component({
  selector: 'app-child',
  template: `<button>clicks: {{count$ | async}}</button>`,
})
export class ChildComponent  {
   // ??? very elegant and intuitive way to get an observable from a life-cycle hook
  click$;
  
  count$ = this.click$.pipe(scan(a => ++a, 0));
}
```

Following things are done under the hood:
- It makes it possible to subscribe to the property even before the view is rendered 
- It is multicasted to avoid multiple subscriptions
- It works with DomElements, WebComponents, and AngularComponents

Here a link to a similar already existing ideas from [@elmd_](https://twitter.com/elmd_):
https://www.npmjs.com/package/@typebytes/ngx-template-streams

# How We Teach This

The most important message we need to teach developers is the basic usage of the new primitives.
The rest is up to pure `RxJS` knowledge.

# Drawbacks

This new library carries: 
- potential dependencies to angular packages
- support load of docs
- issue triage
- design reviews
- pull request reviews


# Alternatives

- We could wait until angular implements it :)
