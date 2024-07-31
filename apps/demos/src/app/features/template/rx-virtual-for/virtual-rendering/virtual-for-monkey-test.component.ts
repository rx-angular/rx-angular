import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { RxVirtualScrollViewportComponent } from '@rx-angular/template/experimental/virtual-scrolling';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'rxa-virtual-for-monkey-test',
  template: `
    <div class="container">
      <h1 class="mat-headline mt-2">A bug</h1>
      <div>
        <textarea [(ngModel)]="monkeyJsonTxt"></textarea>
      </div>
      <button (click)="resetItems()">reset items</button>
      <button (click)="generateItems(generateNItems)">
        generate {{ generateNItems }} items
      </button>
      <button (click)="scrollTo(100)">scroll to 100</button>
      <button (click)="monkey()">monkey test</button>
      <button (click)="monkeyFromJson()">monkey test from json</button>
      <input type="number" [(ngModel)]="generateNItems" />
      <!-- <rx-virtual-scroll-viewport [dynamic]="fn"> -->
      <rx-virtual-scroll-viewport autosize [tombstoneSize]="40">
        <div *rxVirtualFor="let item of items$">
          {{ item.name }}
        </div>
      </rx-virtual-scroll-viewport>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
      rx-virtual-scroll-viewport {
        flex-grow: 1;
      }
      button {
        margin: 0.5rem;
      }
      .container {
        height: calc(100vh - 64px);
        overflow: hidden;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualForMonkeyTestComponent {
  items$ = new BehaviorSubject([
    { id: 1, name: 'test' },
    { id: 2, name: 'test' },
  ]);
  fn = (a: any) => 40;

  generateNItems = 100;

  monkeyJsonTxt = `[
  {
      "op": "reset",
      "immediate": true,
      "delay": 0,
      "num": 0
  },
  {
      "op": "scroll",
      "immediate": true,
      "delay": 3,
      "num": 907
  },
  {
      "op": "reset",
      "immediate": true,
      "delay": 9,
      "num": 0
  },
  {
      "op": "reset",
      "immediate": true,
      "delay": 9,
      "num": 0
  },
  {
      "op": "reset",
      "immediate": true,
      "delay": 8,
      "num": 0
  },
  {
      "op": "scroll",
      "immediate": true,
      "delay": 9,
      "num": 753
  },
  {
      "op": "random-scroll",
      "immediate": true,
      "delay": 5,
      "num": 3470
  },
  {
      "op": "reset",
      "immediate": true,
      "delay": 1,
      "num": 0
  },
  {
      "op": "random-scroll",
      "immediate": true,
      "delay": 6,
      "num": 505
  },
  {
      "op": "reset",
      "immediate": false,
      "delay": 0,
      "num": 0
  },
  {
      "op": "random-scroll",
      "immediate": true,
      "delay": 2,
      "num": 4948
  },
  {
      "op": "scroll",
      "immediate": true,
      "delay": 6,
      "num": 505
  },
  {
      "op": "scroll",
      "immediate": false,
      "delay": 8,
      "num": 545
  },
  {
      "op": "scroll",
      "immediate": true,
      "delay": 7,
      "num": 848
  },
  {
      "op": "random-scroll",
      "immediate": true,
      "delay": 5,
      "num": 730
  },
  {
      "op": "random-scroll",
      "immediate": true,
      "delay": 5,
      "num": 3571
  },
  {
      "op": "generate-items",
      "immediate": true,
      "delay": 9,
      "num": 1934
  },
  {
      "op": "generate-items",
      "immediate": true,
      "delay": 1,
      "num": 1480
  },
  {
      "op": "generate-items",
      "immediate": true,
      "delay": 4,
      "num": 1658
  },
  {
      "op": "reset",
      "immediate": false,
      "delay": 3,
      "num": 0
  },
  {
      "op": "generate-items",
      "immediate": true,
      "delay": 5,
      "num": 3049
  },
  {
      "op": "scroll",
      "immediate": true,
      "delay": 2,
      "num": 121
  },
  {
      "op": "random-scroll",
      "immediate": true,
      "delay": 0,
      "num": 984
  },
  {
      "op": "scroll",
      "immediate": true,
      "delay": 7,
      "num": 761
  },
  {
      "op": "generate-items",
      "immediate": false,
      "delay": 4,
      "num": 4803
  },
  {
      "op": "reset",
      "immediate": true,
      "delay": 1,
      "num": 0
  },
  {
      "op": "reset",
      "immediate": true,
      "delay": 1,
      "num": 0
  },
  {
      "op": "reset",
      "immediate": true,
      "delay": 3,
      "num": 0
  },
  {
      "op": "random-scroll",
      "immediate": true,
      "delay": 1,
      "num": 293
  },
  {
      "op": "generate-items",
      "immediate": true,
      "delay": 0,
      "num": 4082
  },
  {
      "op": "generate-items",
      "immediate": false,
      "delay": 0,
      "num": 4441
  },
  {
      "op": "generate-items",
      "immediate": true,
      "delay": 4,
      "num": 2539
  },
  {
      "op": "random-scroll",
      "immediate": true,
      "delay": 1,
      "num": 4725
  },
  {
      "op": "random-scroll",
      "immediate": true,
      "delay": 10,
      "num": 3257
  },
  {
      "op": "random-scroll",
      "immediate": true,
      "delay": 2,
      "num": 4992
  },
  {
      "op": "generate-items",
      "immediate": true,
      "delay": 1,
      "num": 976
  },
  {
      "op": "generate-items",
      "immediate": true,
      "delay": 6,
      "num": 3981
  },
  {
      "op": "random-scroll",
      "immediate": false,
      "delay": 9,
      "num": 4796
  },
  {
      "op": "scroll",
      "immediate": false,
      "delay": 8,
      "num": 388
  },
  {
      "op": "random-scroll",
      "immediate": true,
      "delay": 9,
      "num": 3032
  },
  {
      "op": "generate-items",
      "immediate": true,
      "delay": 7,
      "num": 2050
  },
  {
      "op": "random-scroll",
      "immediate": true,
      "delay": 7,
      "num": 66
  },
  {
      "op": "generate-items",
      "immediate": true,
      "delay": 1,
      "num": 3829
  },
  {
      "op": "random-scroll",
      "immediate": true,
      "delay": 1,
      "num": 153
  },
  {
      "op": "reset",
      "immediate": true,
      "delay": 8,
      "num": 0
  },
  {
      "op": "reset",
      "immediate": false,
      "delay": 1,
      "num": 0
  },
  {
      "op": "scroll",
      "immediate": true,
      "delay": 4,
      "num": 117
  },
  {
      "op": "reset",
      "immediate": true,
      "delay": 8,
      "num": 0
  },
  {
      "op": "scroll",
      "immediate": true,
      "delay": 9,
      "num": 779
  },
  {
      "op": "reset",
      "immediate": true,
      "delay": 8,
      "num": 0
  },
  {
      "op": "generate-items",
      "immediate": false,
      "delay": 9,
      "num": 471
  },
  {
      "op": "reset",
      "immediate": true,
      "delay": 5,
      "num": 0
  },
  {
      "op": "reset",
      "immediate": true,
      "delay": 2,
      "num": 0
  },
  {
      "op": "generate-items",
      "immediate": true,
      "delay": 7,
      "num": 2204
  },
  {
      "op": "scroll",
      "immediate": true,
      "delay": 6,
      "num": 644
  },
  {
      "op": "scroll",
      "immediate": true,
      "delay": 1,
      "num": 939
  },
  {
      "op": "generate-items",
      "immediate": true,
      "delay": 7,
      "num": 2205
  },
  {
      "op": "reset",
      "immediate": true,
      "delay": 0,
      "num": 0
  },
  {
      "op": "scroll",
      "immediate": true,
      "delay": 5,
      "num": 847
  },
  {
      "op": "reset",
      "immediate": false,
      "delay": 9,
      "num": 0
  }
]`;

  @ViewChild(RxVirtualScrollViewportComponent)
  viewport!: RxVirtualScrollViewportComponent;

  constructor() {
    this.generateItems();
  }

  generateItems(n = 1000) {
    const items = [];
    for (let id = 0; id < n; id++) {
      items.push({ id, name: `test ${id}` });
    }

    this.items$.next(items);
  }

  monkeyFromJson() {
    const json = JSON.parse(this.monkeyJsonTxt);
    this.monkey(json);
  }

  generateMonkeyJson(
    iterations = 1000,
    maxOpDelay = 1000,
    immediateProb = 0.1,
  ) {
    const operations = [
      'generate-items',
      'random-scroll',
      'scroll',
      'reset',
    ] as const;

    const ops: {
      op: (typeof operations)[number];
      num: number;
      immediate: boolean;
      delay: number;
    }[] = [];

    ops.push({
      op: 'generate-items',
      num: 1000,
      delay: 1000,
      immediate: false,
    });

    let currentItemCount = 1000;

    for (let it = 0; it < iterations; it++) {
      const op = operations[Math.floor(Math.random() * operations.length)];
      const immediate = Math.random() < immediateProb;
      const delay = Math.round(Math.random() * maxOpDelay);
      switch (op) {
        case 'generate-items': {
          const num = Math.round(Math.random() * 5000);
          currentItemCount = num;
          ops.push({ op, immediate, delay, num });
          break;
        }
        case 'reset':
          currentItemCount = 0;
          ops.push({ op, immediate, delay, num: 0 });
          break;
        case 'random-scroll': {
          const num = Math.round(Math.random() * 5000);
          ops.push({ op, immediate, delay, num });
          break;
        }
        case 'scroll': {
          const num = Math.round(Math.random() * currentItemCount);
          ops.push({ op, immediate, delay, num });
          break;
        }
      }
    }

    return ops;
  }

  async monkey(json = this.generateMonkeyJson()) {
    console.log('@@@@ Executing...', json);

    for (const { op, delay, immediate, num } of json) {
      switch (op) {
        case 'generate-items':
          const count = num;
          console.log('Generating ', count, ' items...');
          this.generateItems(count);
          break;
        case 'reset':
          console.log('resetting items');
          this.generateItems(0);
          break;
        case 'random-scroll': {
          const index = num;
          console.log('random scroll to ', index);
          this.scrollTo(index);
          break;
        }
        case 'scroll': {
          const index = num;
          console.log('scroll to ', index);
          this.scrollTo(index);
          break;
        }
      }
      if (immediate) {
        console.log('Immediately moving to a next operation');
        continue;
      }

      console.log('Waiting with next op for ', delay);
      await new Promise((res) => setTimeout(res, delay));
    }
  }

  resetItems() {
    this.items$.next([]);
  }

  scrollTo(index: number) {
    this.viewport?.scrollToIndex(index);
  }
}
