# Resources

**Example applications:**  
A demo application is available on [GitHub](https://github.com/BioPhoton/rx-angular-cdk-zone-less).

# Motivation

By default, Angular or better say zone.js patches most of the asynchronouse API's of the Browser. 
This adds additional overhead on those API's and even more important, this leads to un-nessecary renderings of the Angular component tree, also known as overredering. 

Until now developers where only able to either disable zone.js completely or wrapping another logic around the patched APIs to avoid change detection calls.
This of course requires to inject another service and also makes your code more cluttery and slow.

The zone-less package helps out here.
It provides a general method to access the unpatched version of an API and also ships a set of commonly used APIs of the Browser as well as RxJS. 
All those APIs are fully independent of zone.js and NgZone (which is normally used to run things outside Angular).


# The Benefits

- ✅ Fastest option possible
- ✅ Drop-in replacement for navive APIs
- ✅ Drop-in replacement for RxJS functions
- ✅ No need for `ngZone#runOutsideZone`

# RxAngular CDK/Zone-Less

The way how zone.js works is, it patches all relevant async APIs of the Browser. This happens early on as zone.js is treated as polyfill.

![rx-angular-cdk-zone-less_API-patching_michael-hladky](https://user-images.githubusercontent.com/10064416/129472845-e27c5a52-f99d-4f5f-b205-4e947e188d25.png)

All original logic of the patched API's is stored under a symbol in `window`. You can check that by logging for example the following value: `console.log(window.__zone_symbol__setTimeout)`.
This will print the original unpatched API to the Brwosers console. 

Internally the symbols and in turn the unpatched API's is what the zone-less package is using. 
The essential method used to get hold of the unpatched APIs is called `getZoneUnPatchedApi`. It takes a target i.e. `window` and a name of the method we want to retreive the unpatched version of.

## Setup

The zone-less API's can be used directly from the `cdk` package.
To do so, install the `cdk` package and, if needed, the packages depending on it:

1. Install `@rx-angular/cdk`

```bash
npm i @rx-angular/cdk
// or
yarn add @rx-angular/cdk
```

## Usage

**utils**

- getZoneUnPatchedApi

```typescript
@Component({
  // ...
})
export class AppComponent {
  
  doStuff() {
    getZoneUnPatchedApi('setTimeout')(
      () => console.log('tada!'), 
      300);
  };
  
  doOtherStuff() {
    getZoneUnPatchedApi(elem, 'addEventListener')('click', () => console.log('tada!') );
  };
  
}
```

**browser**

- requestAnimationFrame
- cancelAnimationFrame,
- setInterval,
- clearInterval,
- setTimeout,
- clearTimeout

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


# Available Approaches

- `ngZone#runOutsideZone`
- `zone-configuration`

## `ngZone#runOutsideAngular`

It is possible to inject an instance of NgZone into components and services etc to tell Angular to run a specific peice of coe outside of Angular.

```typescript
@Component({
  // ...
})
export class AppComponent {
  
  constructor(private ngZone: NgZone) {
  }
  
  doStuff() {
   
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        console.log('tada!');
      }, 300)
    });
  
  }
  
}
```

The downside here is we need to inject `NgZone` and rely on dependency injection wich is not only more code but also very slow.
