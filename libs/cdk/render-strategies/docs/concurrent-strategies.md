# Concurrent Strategies

Based on the [RAIL model](https://web.dev/rail/), if your app provides user feedback within more than 16ms (less than 60 frames per second), it feels laggy to the user and leads to bad UX.
From the UX perspective that means users should not experience blocking periods more than 16 ms.

## Concepts
There are 5 core concepts of the concurrent strategies:
- Frame budget / Frame drop
- Scheduling
- Priority
- Chunking
- Concurrent Scheduling

### Frame budget / Frame Drop

The Browser has only one UI thread (main thread), meaning things happen one after another.

Users constantly interract with our site and this means if our main thread is busy, they can't interact whit the page. The events like scroll or click will get delayed until the main thread is unblocked from work again and can process those interactions.

![Render Strategies - Frame Drop Overview](https://user-images.githubusercontent.com/10064416/145212039-b4b20fe5-19c9-4062-aba3-b5749cca978d.png)

Such situations cause problems like:

- blocking UIs
- animation junk
- scroll junk or stuttering
- delayed navigation
- bad frame rates in general

All those problems boil down to the way the user perceives the interactions with the website.
Due to the human eye and how our screens got standardized, the frame rate is defined as good if it is 60 frames per second which is a screen update every 16.6 milliseconds.

In the browser, we can see tasks in the main thread that are too long for a good framerate marked with a red triangle.

![Render Strategies-Frame Drop Detail View](https://user-images.githubusercontent.com/10064416/145211921-92b65bd3-b4f2-4557-af54-107e136a1747.png)

In the image, we see ChromeDevtools marks frames that take longer than 50ms as long task. All those tasks exceeded the input response budget.

The reason why it is 50ms and not 16.6ms is based on other things that can happen in relation to the user input.
The related theory is known as the RAIL model.

### Scheduling

![Render Strategies - scheduling abstract diagram](https://user-images.githubusercontent.com/10064416/145228196-8a7293ff-d865-46a9-a995-dfed801bb90c.png)

When it comes to scripting work we can do 2 things to avoid that:

- reduce scripting work and let the user interact earlier
- chunk up work and use scheduling API's to distribute the work overtime and let the user interact in between.

It is often the case that the work just can't get reduced so we have to schedule. 

![Render Strategies-Scheduling Detail View](https://user-images.githubusercontent.com/10064416/145210963-be6d2dc0-f4e3-4654-9f7f-f5221976ed0c.png)

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

A simple way to schedule work is using `setTimeout`.

```typescript
function work(): viod {
  concole.log('work done!'); 
}

const asyncId = setTimeout(work);
```

By calling `setTimeout` we can schedule the execution of the `work` function in the next task.

As a return value we receive the so called "asyncId" a number that serves as reference to the scheduled task.

This is important for cancellation and cleanup logic.

```typescript
clearTimeout(asyncId);
``` 

If we pass the asyncId as parameter to the `clearTimeout` function we can cancel the scheduling and `work` will never get executed.


### Priority

![Render Strategies - priority abstract diagram png](https://user-images.githubusercontent.com/10064416/145228352-da3487fa-41c0-497b-a49a-c274bf531d32.png)

Input handlers (tap, click etc.) often need to schedule a combination of different kinds of work:

- kicking off some immediate work as microtasks, e.g. fetching from a local cache
- scheduling data fetches over the network
- rendering in the current frame, e.g. to respond to user typing, toggle the like button, start an animation when clicking on a comment list etc.
- rendering over the course of next new frames, as fetches complete and data becomes available to prepare and render results.

To get the best user experience we should prioritize this tasks.

There are couple of scheduling APIs mentioned under scheduling. 
They all help to prioritize the work and define the moment of execution differently.

![Render Strategies - scheduling techniques](https://user-images.githubusercontent.com/10064416/144139079-9f1d6ad7-ad7e-437c-95a2-8a794460f9c9.png)

### Chunking

Chunking means using scheduling APIs to split work and distribute it over time to have less frame drops.

![Render Strategies-chunking-example](https://user-images.githubusercontent.com/10064416/145215422-2b047199-d7fa-46ef-aa99-fab236875952.png)

All scheduling APIs can help to prioritize the work and define the moment of execution differently.

When using the requestAnimationFrame API we should know that it is not a queued system.
All scheduled tasks will end up in the same task of the main thread.

![Render Strategies-chunking-animation-frame](https://user-images.githubusercontent.com/10064416/145215060-56d037a7-ec51-4846-9e78-a0f358128c61.png)

The image shows that all AnimatioFrame events end up in the same task.

This scenario gets to a problem depending on:

- the number of Angular elements
- the amount of work done in the elements

![rx-angular-cdk-render-strategies__concurrent-strategies-un-chuked-work](https://user-images.githubusercontent.com/10064416/116010309-7cebf400-a61e-11eb-8715-a6428e5f16a3.png)

### Concurrent Scheduling

![concurrent scheduling - abstract diagram](https://user-images.githubusercontent.com/10064416/145228577-6b8f0bb7-6547-4835-aecc-13d7e07baf02.png)

Concurrent scheduling is a marketing term and simply means that there is a mechanism in place that knows how much time is spent in the current task.
This number is called frame budget and measured in milliseconds. As a result of this technique we're getting prioritized user-centric scheduling behaviours. 

This enables:
- scheduling
- cancellation
- fine grained prioritization
- works distribution based on the frame budget
- render deadlines

One of the first things to understand is the term "frame budget".
It means we have a maximum time (which is globally defined) a task can take before yielding to the main thread.  e.g. 60frames/1000ms=16.6666ms animations or 50ms long task.

Scheduling with notion of frame budget enables us to split work into individual browser tasks as soon as we exceed the budget.
We then yield to the main thread and are interactive again until the next batch of tasks will get processed. 

![rx-angular-cdk-render-strategies__frame-budget](https://user-images.githubusercontent.com/10064416/115894224-4f098280-a459-11eb-9abf-9a902d66d380.png)

The special thing about the set of concurrent strategies is they have a render deadline. 
It means if the scheduled tasks in the global queue of work is not exhausted after a certain time window, we stop the chunking process.
Instead all remaining work will get executed as fast as possible. This means in one synchronous block (that potentially can causes a frame drop).

![Render Strategies - concurrent anatomy png](https://user-images.githubusercontent.com/10064416/145231603-5e6e250d-7c8c-4e76-8872-8b01a3a65c24.png)

Every strategy has a different render deadline. Strategies are designed from the perspective of how important the work is for the user. see: [RAIL model](https://web.dev/rail/)

What concurrent scheduling does under the hood is is cunking up work in cycles of scheduling, prioritization and execution based on different settings.

## Strategies:

| Name             | Priority | Render Method     | Scheduling    | Render Deadline |
| ---------------- | -------- | ----------------- | ------------- | --------------- |
| `"immediate"`    | 1        | 🠗 `detectChanges` | `postMessage` | 0ms             |
| `"userBlocking"` | 2        | 🠗 `detectChanges` | `postMessage` | 250ms           |
| `"normal"`       | 3        | 🠗 `detectChanges` | `postMessage` | 5000ms          |
| `"low"`          | 4        | 🠗 `detectChanges` | `postMessage` | 10000ms         |
| `"idle"`         | 5        | 🠗 `detectChanges` | `postMessage` | ❌              |

![rx-angular-cdk-render-strategies__example](https://user-images.githubusercontent.com/10064416/115321372-f483d400-a183-11eb-810b-2df59f56794f.PNG)

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
  selector: 'item-image',
  template: `
    <img 
      [src]="src" 
      (mouseenter)="showTooltip()" 
      (mouseleave)="hideTooltip()" 
    />
  `,
})
export class ItemsListComponent {
  @Input() src: string;

  constructor(private strategyProvider: RxStrategyProvider) {}

  showTooltip() {
    this.strategyProvider.schedule(
      () => {
        // create tooltip
      },
      { strategy: 'immediate' }
    ).subscribe();
  }

  hideTooltip() {
    this.strategyProvider.schedule(
      () => {
        // destroy tooltip
      },
      { strategy: 'immediate' }
    ).subscribe();
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
  selector: 'item-dropdown',
  template: `
    <div
      id="collapse"
      (mouseenter)="showDropdown()"
      (mouseleave)="hideDropdown()"
    >
      {{ text }}
    </div>
  `,
})
export class DropdownComponent {
  @Input() text: string;

  constructor(private strategyProvider: RxStrategyProvider) {}

  showDropdown() {
    this.strategyProvider.schedule(
      () => {
        // create dropdown
      },
      { strategy: 'userBlocking' }
    );
  }

  hideDropdown() {
    this.strategyProvider.schedule(
      () => {
        // destroy dropdown
      },
      { strategy: 'userBlocking' }
    ).subscribe();
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

For `normal` strategy a perfect example will be rendering of the items list. 

It is often the case that rendering of big lists blocks user interactions. In combination with `rxFor` directive such operations become truly unblocking.

![rx-angular-cdk-render-strategies__normal_example](https://user-images.githubusercontent.com/10064416/115315848-7837c380-a178-11eb-985e-b639f034fcb4.PNG)
```typescript
@Component({
  selector: 'items-list',
  template: `
    <div id="items-list">
      <div *rxFor="let item of items$; strategy: 'normal'>
        <item-image [src]="item.image"></item-image>
        <item-dropdown [text]="item.text"></item-dropdown>
      </div>
    </div>
  `,
})
export class ItemsListComponent {
  items$ = this.state.items$;
  constructor(private state: StateService) {}
}
```

### Low

Work that is typically not visible to the user or initiated by the user.

| Render Method     | Scheduling    | Render Deadline |
| ----------------- | ------------- | --------------- |
| 🠗 `detectChanges` | `postMessage` | 10000ms         |

**Usecase:**

Good use case for this strategy will be lazy loading of the components. For example popup.

<!-- TODO: Add proper image -->
![low-example](https://user-images.githubusercontent.com/15088626/115315764-a7523300-a180-11eb-9231-1376bda540a4.png)

```typescript
@Component({
  selector: 'items-list',
  template: `
    <div id="items-list">
      <div *rxFor="let item of items$; strategy: 'normal'>
        <item-image [src]="item.image"></item-image>
        <item-dropdown [text]="item.text"></item-dropdown>
      </div>
    </div>

    <button id="addItem" (click)="openCreateItemPopup()">Create new item</button>
  `,
})
export class ItemsListComponent {
  items$ = this.state.items$;

  constructor(
    private state: StateService,
    private strategyProvider: RxStrategyProvider
  ) {}

  openCreateItemPopup() {
    this.strategyProvider.schedule(() => {
      // logic to lazy load popup component
    }, {strategy: 'low'}).subscribe();
  }

}
```

> **⚠ Notice:**  
> This priority fits well for things that should happen but has lower priority. For any non-urgent background process `idle` is the best fit.

### Idle

<!--
- Description of the strategies behavior
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

Urgent work that should happen in the background and is not initiated but visible by the user. This occurs right after current task and has the lowest priority. 

| Render Method     | Scheduling    | Render Deadline |
| ----------------- | ------------- | --------------- |
| 🠗 `detectChanges` | `postMessage` | ❌              |

**Usecase:**

This strategy is especially useful for logic meant to run in the background. Good example of such interaction is background sync.

<!-- TODO: Add proper image -->
![rx-angular-cdk-render-strategies__idle_example](https://user-images.githubusercontent.com/10064416/115316774-49225180-a17a-11eb-9045-3cdd38217b4d.PNG)

```typescript
@Component({
  selector: 'items-list',
  template: `
    <div id="items-list">
      <div *rxFor="let item of items$; strategy: 'normal'>
        {{item.name}}
      </div>
    </div>

    <button id="addItem" (click)="openCreateItemPopup()">Create new item</button>

    <div id="background-indicator>Background sync</div>
  `,
})
export class ItemsListComponent {
  items$ = this.state.items$;

  constructor(
    private state: StateService,
    private strategyProvider: RxStrategyProvider,
    private webSocket: WebSocketService
  ) {
    this.items$.pipe(
      this.strategyProvider.scheduleWith(
          items => this.webSocket.syncItems(items), 
          {strategy: 'idle'}
       )
    ).subscribe();
  }

  openCreateItemPopup() {
    this.strategyProvider.schedule(() => {
      // logic to lazy load popup component
    }, {strategy: 'low'}).subscribe();
  }

}
```

> **⚠ Notice:**  
> This priority fits well for low priority background processes that are not affecting user interactions.
