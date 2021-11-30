# Concurrent Strategies

If your app provides user feedback within less than 16ms (less than 60 frames per second), it feels laggy to the user and leads to bad UX.

Based on the [RAIL model](https://web.dev/rail/), a user experiences motion as laggy if the frame rate is lower than 60 frames per second (~16ms per task).

From perspec UX => app should give feedback => if blocked => laggy

## Concepts

### Frame budget / Frame Drop

The Browsers main thread is a single-threaded system, meaning things happen one after another.

When we connect this information with the fact that users constantly interact with our site this means if our main thread is busy the user cant interact with the page. The events like scroll or click will get delayed until the main thread is unblocked from work again and can process those interactions.

![Render Strategies - Frame Drop Overview](https://user-images.githubusercontent.com/10064416/144139010-ecddecc8-c561-4708-bc9e-36d60a84cad7.png)

Such situations cause problems like:

- blocking UIs
- animation jank
- scroll jank or stottering
- delayed navigations
- bad frame rates in general

All those problems boil down to the way the user perceives the interactions with the website.
Due to the human eye and how our screens got standardized, the frame rate is defined as good if it is 60 frames per second which is a screen update every 16.6 milliseconds.

In the browser, we can see tasks in the main thread that are too long for a good framerate marked with a red triangle.

![Render Strategies-Frame Drop Detail View](https://user-images.githubusercontent.com/10064416/144141900-25c2c4a4-1a8d-472c-a658-9f860e384c47.png)

In the image, we see ChromeDevtools marks frames that take longer than 50ms as long task. All those tasks exceeded the input response budget.

The reason why it is 50ms and not 16.6ms is based on other things that can happen in relation to the user input.
The related theory is known as the RAIL model.

### Scheduling

![Render Strategies - scheduling abstract diagram](https://user-images.githubusercontent.com/10064416/144139325-c58f41e3-2a05-4a25-ac92-9507e9a9877b.png)

When it comes to scripting work we can do 2 things to avoid that:

- reduce scripting work and let the user interact earlier
- chunk up work and use scheduling API's to distribute the work overtime and let the user interact in between

angular-scripting-time

As often the work just can't get reduced so we have to schedule. 


![Render Strategies-Scheduling Detail View](https://user-images.githubusercontent.com/10064416/144145201-e72f927c-6365-4f33-9b93-5908f3726b06.png)

Some of the possible APIs are:
- queueMicrotask
- setTimeout
- postMessage
- requestAnimationFrame
- requestIdleCallback

Angular did that internally in different places. One of them is in the elements package:

https://github.com/angular/angular/blob/master/packages/elements/src/component-factory-strategy.ts#L255-L267

Also, the utils file is an interesting place to look at:
https://github.com/angular/angular/blob/master/packages/elements/src/utils.ts#L13-L46

### Priority

![Render Strategies - priority abstract diagram png](https://user-images.githubusercontent.com/10064416/144139332-87d740a6-6c43-42fa-a208-237af01fe68c.png)

Input handlers (tap, click etc.) often need to schedule a combination of different kinds of work:

- kicking off some immediate work as microtasks, e.g. fetching from a local cache
- scheduling data fetches over the network
- rendering in the current frame, e.g. to respond to user typing, toggle the like button, start an animation when clicking on a comment list etc.
- rendering over the course of next new frames, as fetches complete and data becomes available to prepare and render results.

To get the best user experience we should prioritize this tasks.

There are a couple scheduling APIs mentioned under scheduling. 
They all help to prioritize the work and define the moment of execution differently.

![Render Strategies - scheduling techniques](https://user-images.githubusercontent.com/10064416/144139079-9f1d6ad7-ad7e-437c-95a2-8a794460f9c9.png)


### Chunking

There are also other scheduling APIs. They all help to prioritize the work and define the moment of execution differently.

When using the requestAnimationFrame API we should know that it is not a queued system.
All scheduled tasks will end up in the same task of the main thread.

timer vs animationframe - collapse

The image shows that all AnimatioFrame events end up in the same task.

This scenario gets to a problem depending on:

- the number of Angular elements
- the amount of work done in the elements

![rx-angular-cdk-render-strategies__concurrent-strategies-un-chuked-work](https://user-images.githubusercontent.com/10064416/116010309-7cebf400-a61e-11eb-8715-a6428e5f16a3.png)
![rx-angular-cdk-render-strategies__concurrent-strategies-chuked-work](https://user-images.githubusercontent.com/10064416/116010261-2c749680-a61e-11eb-9e92-3bd032045fdf.png)
![rx-angular-cdk-render-strategies__concurrent-strategies-non-chunked-vs-chuked-work](https://user-images.githubusercontent.com/10064416/116007117-705f9f80-a60e-11eb-879c-87746ba677f6.png)


### Concurrent Scheduling

![rx-angular-cdk-render-strategies__concurrent-scheduling](https://user-images.githubusercontent.com/10064416/115897522-cc82c200-a45c-11eb-84de-a6fc02a1bcca.png)

![rx-angular-cdk-render-strategies__frame-budget](https://user-images.githubusercontent.com/10064416/115894224-4f098280-a459-11eb-9abf-9a902d66d380.png)

![rx-angular-cdk-render-strategies__concurrent-strategies-anatomy](https://user-images.githubusercontent.com/10064416/116157149-bee36b80-a6ec-11eb-965a-9fbe34a8eca4.png)

### Render Deadline

![rx-angular-cdk-render-strategies__concurrent-strategies-render-deadline](https://user-images.githubusercontent.com/10064416/116008121-42308e80-a613-11eb-90da-c3299bbf8c0a.png)

## Strategies:

| Name             | Priority | Render Method     | Scheduling    | Render Deadline |
| ---------------- | -------- | ----------------- | ------------- | --------------- |
| `"noPriority"`   | 0        | 🠗 `detectChanges` | `postMessage` | ❌              |
| `"immediate"`    | 2        | 🠗 `detectChanges` | `postMessage` | 0ms             |
| `"userBlocking"` | 3        | 🠗 `detectChanges` | `postMessage` | 250ms           |
| `"normal"`       | 4        | 🠗 `detectChanges` | `postMessage` | 5000ms          |
| `"low"`          | 5        | 🠗 `detectChanges` | `postMessage` | 10000ms         |
| `"idle"`         | 6        | 🠗 `detectChanges` | `postMessage` | ❌              |

![rx-angular-cdk-render-strategies__example](https://user-images.githubusercontent.com/10064416/115321372-f483d400-a183-11eb-810b-2df59f56794f.PNG)

![render-strategy-comparison](https://user-images.githubusercontent.com/10064416/115313442-8f27e700-a173-11eb-817d-9868180305d5.gif)

### noPriority

![rx-angular-cdk-render-strategies__strategy-noPriority](https://user-images.githubusercontent.com/10064416/116009734-84f66480-a61b-11eb-89f4-a57b90573b9b.png)

### Immediate

Urgent work that must happen immediately is initiated and visible by the user. This occurs right after the current task and has the highest priority.

| Render Method     | Scheduling    | Render Deadline |
| ----------------- | ------------- | --------------- |
| 🠗 `detectChanges` | `postMessage` | 0ms             |

**Usecase:**

![immediate-example](https://user-images.githubusercontent.com/15088626/115313764-8b4c9280-a17c-11eb-812e-98354c7090ba.png)

A good example here would be a tool-tip.

Tooltips should be displayed immediately on mouse over. Any delay will be very noticeable.

```typescript
@Component({
  selector: 'immediate',
  template: `
    <button id="btn" (mouseenter)="showTooltip()" (mouseleave)="hideTooltip()">
      Button with Tooltip
    </button>
  `,
})
export class TooltipComponent {
  constructor(private strategyProvider: RxStrategyProvider) {}

  showTooltip() {
    this.strategyProvider.schedule(
      () => {
        // create tooltip
      },
      { strategy: 'immediate' }
    );
  }

  hideTooltip() {
    this.strategyProvider.schedule(
      () => {
        // destroy tooltip
      },
      { strategy: 'immediate' }
    );
  }
}
```

> **⚠ Notice:**
> Be aware to avoid scheduling large or non-urgent work with immediate priority as it blocks rendering

### User Blocking

Critical work that must be done in the current frame, is initiated and visible by the user. DOM manipulations that should be rendered quickly. Tasks with this priority can delay current frame rendering, so this is the place for lightweight work (otherwise use "normal" priority).

| Render Method     | Scheduling    | Render Deadline |
| ----------------- | ------------- | --------------- |
| 🠗 `detectChanges` | `postMessage` | 250ms           |

**Usecase:**

![userBlocking-example](https://user-images.githubusercontent.com/15088626/115313646-550f1300-a17c-11eb-8430-87eda6855822.png)

A good example here would be a dropdown menu.

Dropdowns should be displayed right away on user interaction.

```typescript
@Component({
  selector: 'userBlocking',
  template: `
    <div
      id="collapse"
      (mouseenter)="showTooltip()"
      (mouseleave)="hideTooltip()"
    >
      Button with Tooltip
    </div>
  `,
})
export class TooltipComponent {
  constructor(private strategyProvider: RxStrategyProvider) {}

  showTooltip() {
    this.strategyProvider.schedule(
      () => {
        // create tooltip
      },
      { strategy: 'immediate' }
    );
  }

  hideTooltip() {
    this.strategyProvider.schedule(
      () => {
        // destroy tooltip
      },
      { strategy: 'userBlocking' }
    );
  }
}
```

> **⚠ Notice:**  
> Be aware to avoid scheduling large or non-urgent work with `userBlocking` priority as it blocks rendering after 250ms

### Normal

Heavy work visible to the user. For example, since it has a higher timeout, it is more suitable for the rendering of data lists.

| Render Method     | Scheduling    | Render Deadline |
| ----------------- | ------------- | --------------- |
| 🠗 `detectChanges` | `postMessage` | 5000ms          |

<!-- In most cases it is a rendering from user interaction that depends on network and can be delayed by the couple of frames to the point where requested data is available. It should not delay current frame but should target next available frame. -->

**Usecase:**

@TODO: List example

![rx-angular-cdk-render-strategies__normal_example](https://user-images.githubusercontent.com/10064416/115315848-7837c380-a178-11eb-985e-b639f034fcb4.PNG)

### low

Work that is typically not visible to the user or initiated by the user. For example getting scrollbar position form `localStorage`.

| Render Method     | Scheduling    | Render Deadline |
| ----------------- | ------------- | --------------- |
| 🠗 `detectChanges` | `postMessage` | 10000ms         |

**Usecase:**

![low-example](https://user-images.githubusercontent.com/15088626/115315764-a7523300-a180-11eb-9231-1376bda540a4.png)

@TODO: Get scrollbar position

> **⚠ Notice:**  
> This strategy is especially useful for sending request and and preprocessing their responses. As they are not directly visible a low priority is best.

### Idle

<!--
- Descriptoin of the strategies behavior
- Table
  - no `Zone Agnostic` column just mention it
  - Render Method
  - no Coalescing just mention it
  - Scheduling
  - Render deadline (chunked) => ms | false
  -
- Usecase + Code snippet + Image
-
-->

Urgent work that should happen in the background and is not initiated but visible by the user. This occurs right after current task and has the lowest priority. For example background sync.

| Render Method     | Scheduling    | Render Deadline |
| ----------------- | ------------- | --------------- |
| 🠗 `detectChanges` | `postMessage` | ❌              |

![rx-angular-cdk-render-strategies__idle_example](https://user-images.githubusercontent.com/10064416/115316774-49225180-a17a-11eb-9045-3cdd38217b4d.PNG)

> **⚠ Notice:**  
> This strategy is especially useful for logic ment to run in the backgroung. As they are not directly visible a low priority is best.
