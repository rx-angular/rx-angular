# Resources

**Example applications:**  
A demo application is available on [GitHub](https://github.com/BioPhoton/rx-angular-cdk-coercing).

# Motivation

Coercing, or to be more specific type coercion is the process of converting a value from one type to another.
This can be done with any primitive value in JavaScript. e.g. number, string, Symbol, boolean, null, undefined. 

Another type where we also can apply coercing is the `Observable` type.

![coerceObservable](https://user-images.githubusercontent.com/10064416/129430812-1e4af911-fb42-4d61-a68a-4fb86e595113.png)


In practice you can apply this technique in 2 ways:

- **explicitly** e.g. `Number(string)` coercres a string to a number
- **implicitely** e.g. `!!string` coerces a string to a boolean

In general when we apply those techniques our code base starts to maintain repetative patterns which either bloten up the codebase or just makes it harder to read.

As an example let's look at this snippet of code here:

```typescript
const num =
  !isNaN(parseFloat(valueFromInput)) && !isNaN(Number(valueFromInput));
```

Because we receive the value from an input the type is always string. We have to care every time the when we want to pass the value to get a propper number type of it.

Furthermore, in version 10 of Angular the team announced strict type checking as opt-in configuration.
Since then, developers where encurraged to match the types exaclty. This especially needs attention when it comes to templates.

For this very reason the team later on shipped a sub package under the Angular CDK to provide some helpers for the important cases.
The included helpers can be used whenever coercing is needed to obtain a propper value.

RxAngular also spotted a often used pattern of cosercing.
When trying out the different reactive architectures we realized for a nice to use mix of reactive and imperative programming we needed to accept statis values as well as Observables on many places.

A common scenario would be to pass an Observable as input binding of components or directives to bypass changes from change detection.

```typescript
@Component({
  // ...
})
export class AppComponent {
  prop1$: Observable<number>;

  @Input()
  set prop1(val: Observable<number> | number) {
    this.prop1$ = isObservable(val) ? val : of(val);
  }
}
```

# Available Approaches

- [@angular/cdk/coercion](https://www.npmjs.com/package/@angular/cdk)
- [@rx-angular/cdk/coercion](https://www.npmjs.com/package/@rx-angular/cdk)

**The Benefits of RxAngular**

- ✅ Coercing helper for Observables
- ✅ RxJS operators
- ✅ RxJS factories
- ✅ Fully tested
- ✅ Well Documented

# RxAngular Coercing helpers

**Factories:**

- coerceObservable
- coerceDistinctObservable
- coerceAllFactory

**Operators:**

- coerceObservableWith
- coerceDistinctWith

In the section usage we will go into more detail.

## Setup

The coalescing features can be used directly from the `cdk` package or indirectly through the `template` package.
To do so, install the `cdk` package and, if needed, the packages depending on it:

1. Install `@rx-angular/cdk`

```bash
npm i @rx-angular/cdk
// or
yarn add @rx-angular/cdk
```

## Usage

In the following we will sketch some usecases where coercing operators can be used.

**coerceObservable**

```typescript
@Component({
  // ...
})
export class AppComponent {
  prop1$: Observable<number>;

  @Input()
  set prop1(val: Observable<number> | number) {
    this.prop1$ = coerceObservable(val);
  }
}
```

In this case we turn a number into an observable of number by using a RxJS factory function.

**coerceObservableWith**

```typescript
@Component({
  // ...
})
export class AppComponent {
  _prop1 = new Subject<number | Observable<number>>();
  prop1$: Observable<number> = this._prop1.pipe(coerceObservableWith());

  @Input()
  set prop1(val: Observable<number> | number) {
    this._prop1.next(val);
  }
}
```

In this case we turn a number into an observable of number. Here we use an operator instead of a factory.

**coerceDistinctObservable**

```typescript
@Component({
  // ...
})
export class AppComponent {
  prop1$: Observable<number>;

  @Input()
  set prop1(val: Observable<number> | number) {
    this.prop1$ = coerceDistinctObservable(val);
  }
}
```

Same as with `coerceObservable` we turn a number into an observable of number, but in addition the `distinctUntilChanged` operator gets applied to filter out same values in a row.
This comes in handy for later processing and improves performance.

**coerceDistinctWith**

```typescript
@Component({
  // ...
})
export class AppComponent {
  _prop1 = new Subject<number | Observable<number>>();
  prop1$: Observable<number> = this._prop1.pipe(coerceDistinctWith());

  @Input()
  set prop1(val: Observable<number> | number) {
    this._prop1.next(val);
  }
}
```

This is the operator version of `coerceDistinctObservable`. It also includes the benefit of later processing and performance through distinct values.

**coerceAllFactory**

The naming `coerceAll` relates to an operator that processes higher-order observables. The naming `factory` relates to the fact thatthis function helps to set up such a operator.

To get a quick understanding of the difference of an first-order and higher-order observable we will take a look at the following graphic:

![rxjs_order-of-observables_michael-hladky](https://user-images.githubusercontent.com/10064416/129426892-64ff26e7-3271-412f-ba29-b7bd940ff0d3.png)

As we can see the upper half of the image represents a stream of single values, where the lower part represents a stream of streams of single values.
The order (first, second, thrid) is determined by the level of "nesting" of the streams.

Where the above operators where solving only the coercing, the factory here helps to create compositions for specific cases in a more elegant way.
 

```typescript
@Component({
  // ...
})
export class AppComponent {
  _ = coerceAllFactory();
}
```
