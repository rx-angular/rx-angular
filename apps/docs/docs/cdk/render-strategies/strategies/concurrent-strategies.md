# Concurrent strategies

Based on the [RAIL model](https://web.dev/rail/), e.g. if your app provides animated user feedback within more than 16ms (less than 60 frames per second), it feels laggy to the user and leads to bad UX.
From the UX perspective that means users should not experience blocking periods more than 16 ms.

## Concepts

There are 5 core concepts of the concurrent strategies:

- Frame budget / Frame drop
- Scheduling
- Priority
- Chunking
- Concurrent Scheduling

### Frame budget / Frame drop

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

### Concurrent scheduling

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
It means we have a maximum time (which is globally defined) a task can take before yielding to the main thread. e.g. 60frames/1000ms=16.6666ms animations or 50ms long task.

Scheduling with notion of frame budget enables us to split work into individual browser tasks as soon as we exceed the budget.
We then yield to the main thread and are interactive again until the next batch of tasks will get processed.

![rx-angular-cdk-render-strategies__frame-budget](https://user-images.githubusercontent.com/10064416/115894224-4f098280-a459-11eb-9abf-9a902d66d380.png)

The special thing about the set of concurrent strategies is they have a render deadline.
It means if the scheduled tasks in the global queue of work is not exhausted after a certain time window, we stop the chunking process.
Instead all remaining work will get executed as fast as possible. This means in one synchronous block (that potentially can causes a frame drop).

![Render Strategies - concurrent anatomy png](https://user-images.githubusercontent.com/10064416/146287356-023836c8-a697-4640-a4ae-7d567bc02bf0.png)
Every strategy has a different render deadline. Strategies are designed from the perspective of how important the work is for the user. see: [RAIL model](https://web.dev/rail/)

What concurrent scheduling does under the hood is is cunking up work in cycles of scheduling, prioritization and execution based on different settings.

![Render Strategies - task flow](https://user-images.githubusercontent.com/10064416/146287195-89e22ed8-12ba-4099-9379-430a41469b9c.png)

## Strategies:

| Name             | Priority | Render Method     | Scheduling    | Render Deadline |
| ---------------- | -------- | ----------------- | ------------- | --------------- |
| `"immediate"`    | 1        | 🠗 `detectChanges` | `postMessage` | 0ms             |
| `"userBlocking"` | 2        | 🠗 `detectChanges` | `postMessage` | 250ms           |
| `"normal"`       | 3        | 🠗 `detectChanges` | `postMessage` | 5000ms          |
| `"low"`          | 4        | 🠗 `detectChanges` | `postMessage` | 10000ms         |
| `"idle"`         | 5        | 🠗 `detectChanges` | `postMessage` | ❌              |

![Render Strategies - example usage](https://user-images.githubusercontent.com/10064416/146285888-ae39072c-aa8f-4c8a-a33b-8181f0c62464.png)

### Immediate

![render-strategies-concurrent-immediate-tree](https://user-images.githubusercontent.com/10064416/146285875-2049440b-4fb8-493e-a220-adfde74bdc8f.png)

Urgent work that must happen immediately is initiated and visible by the user. This occurs right after the current task and has the highest priority.

| Render Method     | Scheduling    | Render Deadline |
| ----------------- | ------------- | --------------- |
| 🠗 `detectChanges` | `postMessage` | 0ms             |

![render-strategies-concurrent-immediate-diagramm](https://user-images.githubusercontent.com/10064416/146285874-684230bf-f38d-4150-a803-fdf896a57c8a.png)

**Usecase:**

![Render Strategies - immediate example](https://user-images.githubusercontent.com/10064416/146285883-eb500a95-3f98-4892-88fd-89322f0aaa32.png)

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
    this.strategyProvider
      .schedule(
        () => {
          // create tooltip
        },
        { strategy: 'immediate' }
      )
      .subscribe();
  }

  hideTooltip() {
    this.strategyProvider
      .schedule(
        () => {
          // destroy tooltip
        },
        { strategy: 'immediate' }
      )
      .subscribe();
  }
}
```

> **⚠ Notice:**
> Be aware to avoid scheduling large or non-urgent work with immediate priority as it blocks rendering

### User blocking

![render-strategies-concurrent-userBlocking-tree](https://user-images.githubusercontent.com/10064416/146285901-b84f4e32-9213-4674-9cfe-f4dffe68dd65.png)

Critical work that must be done in the current frame, is initiated and visible by the user. DOM manipulations that should be rendered quickly. Tasks with this priority can delay current frame rendering, so this is the place for lightweight work (otherwise use "normal" priority).

| Render Method     | Scheduling    | Render Deadline |
| ----------------- | ------------- | --------------- |
| 🠗 `detectChanges` | `postMessage` | 250ms           |

![render-strategies-concurrent-userBlocking-diagramm](https://user-images.githubusercontent.com/10064416/146285898-c60e4ab6-98bd-4c0a-8c1f-a2ecbc829f88.png)

**Usecase:**

![Render Strategies - userBlocking example](https://user-images.githubusercontent.com/10064416/146285880-73bf726d-8793-42f3-84d4-6476889ed468.png)

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
    this.strategyProvider
      .schedule(
        () => {
          // destroy dropdown
        },
        { strategy: 'userBlocking' }
      )
      .subscribe();
  }
}
```

> **⚠ Notice:**
> Be aware to avoid scheduling large or non-urgent work with `userBlocking` priority as it blocks rendering after 250ms

### Normal

![render-strategies-concurrent-normal-tree](https://user-images.githubusercontent.com/10064416/146285896-c41bffd9-f711-4442-bd9c-009a0579dd49.png)

Heavy work visible to the user. For example, since it has a higher timeout, it is more suitable for the rendering of data lists.

| Render Method     | Scheduling    | Render Deadline |
| ----------------- | ------------- | --------------- |
| 🠗 `detectChanges` | `postMessage` | 5000ms          |

![render-strategies-concurrent-normal-diagramm](https://user-images.githubusercontent.com/10064416/146285895-ec045bf7-5c68-4359-a723-032c963b80b5.png)

<!-- In most cases it is a rendering from user interaction that depends on network and can be delayed by the couple of frames to the point where requested data is available. It should not delay current frame but should target next available frame. -->

**Usecase:**

![Render Strategies - normal example](https://user-images.githubusercontent.com/10064416/146285878-3b242f2d-046e-49ad-be2f-cbf1c33b7a02.png)

For `normal` strategy a perfect example will be rendering of the items list.

It is often the case that rendering of big lists blocks user interactions. In combination with `rxFor` directive such operations become truly unblocking.

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

![render-strategies-concurrent-low-tree](https://user-images.githubusercontent.com/10064416/146285890-421be34c-8a76-4b04-bd29-2d9bca103547.png)

Work that is typically not visible to the user or initiated by the user.

| Render Method     | Scheduling    | Render Deadline |
| ----------------- | ------------- | --------------- |
| 🠗 `detectChanges` | `postMessage` | 10000ms         |

![render-strategies-concurrent-low-diagramm](https://user-images.githubusercontent.com/10064416/146285894-8d2992f3-6e5f-49db-8c45-d54424cc4a3e.png)

**Usecase:**

![Render Strategies - low example](https://user-images.githubusercontent.com/10064416/146285886-082574dd-02a2-4db7-b06c-16ff96fab72a.png)

Good use case for this strategy will be lazy loading of the components. For example popup.

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
    this.strategyProvider
      .schedule(
        () => {
          // logic to lazy load popup component
        },
        { strategy: 'low' }
      )
      .subscribe();
  }
}
```

> **⚠ Notice:**
> This priority fits well for things that should happen but has lower priority. For any non-urgent background process `idle` is the best fit.

### Idle

![render-strategies-concurrent-idle-tree](https://user-images.githubusercontent.com/10064416/146285889-8f98a92c-35dd-4632-9b3a-0eaf759790fc.png)

Urgent work that should happen in the background and is not initiated but visible by the user. This occurs right after current task and has the lowest priority.

| Render Method     | Scheduling    | Render Deadline |
| ----------------- | ------------- | --------------- |
| 🠗 `detectChanges` | `postMessage` | ❌              |

![render-strategies-concurrent-idle-diagramm](https://user-images.githubusercontent.com/10064416/146285892-c996b043-c1c0-411b-abbd-1d2867e36711.png)

**Usecase:**

![Render Strategies - idle example](https://user-images.githubusercontent.com/10064416/146285887-0c214d88-cab1-4517-97a7-41318e6436c0.png)

This strategy is especially useful for logic meant to run in the background. Good example of such interaction is background sync.

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
    this.items$
      .pipe(
        this.strategyProvider.scheduleWith(
          (items) => this.webSocket.syncItems(items),
          { strategy: 'idle' }
        )
      )
      .subscribe();
  }

  openCreateItemPopup() {
    this.strategyProvider
      .schedule(
        () => {
          // logic to lazy load popup component
        },
        { strategy: 'low' }
      )
      .subscribe();
  }
}
```

> **⚠ Notice:**
> This priority fits well for low priority background processes that are not affecting user interactions.
