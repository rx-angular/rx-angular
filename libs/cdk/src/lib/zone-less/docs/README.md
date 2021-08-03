# Resources

**Example applications:**  
A demo application is available on [GitHub](https://github.com/BioPhoton/rx-angular-cdk-zone-less).

# Motivation

# Available Approaches

- `ngZone#runOutsideZone`
- RxAngular CDK/Zone-Less

**The Benefits of RxAngular**

- ✅

## `ngZone#runOutsideZone`

**Event Bubbling of smae event on multiple elements**

```html
<div (click)="doStuff()">
  <button (click)="doStuff()">click</button>
</div>
```

# RxAngular Zone-Less

**utils**

- getZoneUnPatchedApi

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

operators

scheduler

- async
- asap
- queue
- animationFrame
