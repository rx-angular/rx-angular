## Motivation

By default, Angular or better say zone.js patches most of the asynchronouse API's of the Browser.
This adds additional overhead on those API's and even more important, this leads to un-nessecary renderings of the Angular component tree, also known as overredering.

Until now developers where only able to either disable zone.js completely or wrapping another logic around the patched APIs to avoid change detection calls.
This of course requires to inject another service and also makes your code more cluttery and slow.

The zone-less package helps out here.
It provides a general method to access the unpatched version of an API and also ships a set of commonly used APIs of the Browser as well as RxJS.
All those APIs are fully independent of zone.js and NgZone (which is normally used to run things outside Angular).

## The benefits

- ✅ Finegrained ways to unpatch APIs
- ✅ Fastest option possible to run code outside of Angulars zone mechanism
- ✅ Drop-in replacement for navive APIs
- ✅ Drop-in replacement for RxJS functions
- ✅ No need for `runOutsideAngular` and `NgZone` injection

## RxAngular CDK/Zone-less

The way how zone.js works is, it patches all relevant async APIs of the Browser. This happens early on as zone.js is treated as polyfill.

![rx-angular-cdk-zone-less_API-patching_michael-hladky](https://user-images.githubusercontent.com/10064416/129472845-e27c5a52-f99d-4f5f-b205-4e947e188d25.png)

All original logic of the patched API's is stored under a symbol in `window`. You can check that by logging for example the following value: `console.log(window.__zone_symbol__setTimeout)`.
This will print the original unpatched API to the Brwosers console.

Internally the symbols and in turn the unpatched API's is what the zone-less package is using.
The essential method used to get hold of the unpatched APIs is called `getZoneUnPatchedApi`. It takes a target i.e. `window` and a name of the method we want to retreive the unpatched version of.

### Setup

The zone-less API's can be used directly from the `cdk` package.
To do so, install the `cdk` package and, if needed, the packages depending on it:

1. Install `@rx-angular/cdk`

```bash
npm i @rx-angular/cdk
// or
yarn add @rx-angular/cdk
```

### Usage

The utils folder contains the most essential functions used to unpatch APIs.
Normally if developers want to avoid change detection through zone the have to inject `NgZone` and run the code that should not trigger change detection in the `runOutsideAngular` method.

```typescript
export class AnyComponent {
  constructor(private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      // code here
    });
  }
}
```

This introduces some lines of code and also takes time to retreive the service form dependency injection and execute additional code.

**utils**

- getZoneUnPatchedApi

The `getZoneUnPatchedApi` function is used in all other functions of the zone-less package to access the Browsers unpatched API's.

```typescript
@Component({
  // ...
})
export class AppComponent {
  doStuff() {
    // unpatched method of the window object
    getZoneUnPatchedApi('setTimeout')(() => console.log('tada!'), 300);
  }

  doOtherStuff() {
    // unpatched method of an HTML element
    getZoneUnPatchedApi(elem, 'addEventListener')('click', () =>
      console.log('tada!')
    );
  }
}
```

**browser**

- requestAnimationFrame
- cancelAnimationFrame,
- setInterval,
- clearInterval,
- setTimeout,
- clearTimeout

To reduce lines of code we ship all common browser scheduling APIs as unpatched version directly.

```typescript
import {setTimeout} from @rx-angular/cdk/zone-less

@Component({
  // ...
})
export class AppComponent {

  doStuff() {
   // unpatched method of the window object
    setTimeout(
      () => console.log('tada!'),
      300);
  };

}
```

**rxjs**

creation

- fromEvent
- interval
- timer

scheduler

- async
- asap
- queue
- animationFrame

As RxJS internally uses Browser API's it is pretty impossible to get rid of the zone involvment.
For this very reason we shipped the RxJS operators, schedulers and functions that would trigger zone as unpatched version.

```typescript
import {interval} from @rx-angular/cdk/zone-less

@Component({
  // ...
})
export class AppComponent {

  doStuff() {
    // unpatched method of RxJS lib
    interval(300).subscribe();
  };

}
```

## Available approaches

- `ngZone#runOutsideZone`
- `zone-configuration`

### `ngZone#runOutsideAngular`

It is possible to inject an instance of NgZone into components and services etc to tell Angular to run a specific peice of coe outside of Angular.

```typescript
@Component({
  // ...
})
export class AppComponent {
  constructor(private ngZone: NgZone) {}

  doStuff() {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        console.log('tada!');
      }, 300);
    });
  }
}
```

The downside here is we need to inject `NgZone` and rely on dependency injection wich is not only more code but also slow.

### Zone Configuration

Zone configuration is a less granular way to disable zone. It helps to configure zone in a way where it don't patches specific APIs at all.

You can read in detail about it in the docs of [`@rx-angular/cdk/zone-configuration`](../zone-configurations/zone-configurations.mdx).
