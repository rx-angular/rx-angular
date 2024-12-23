import {
  ChangeDetectionStrategy,
  Component,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  RxVirtualView,
  RxVirtualViewObserver,
  RxVirtualViewPlaceholder,
  RxVirtualViewContent,
} from '@rx-angular/template/virtual-view';
import { VirtualContent } from './virtual-content.component';
import { VirtualItem } from './virtual-item.component';
import { VirtualPlaceholder } from './virtual-placeholder.component';

@Component({
  selector: 'virtual-view-demo',
  template: `
    <div class="container" rxVirtualViewObserver>
      <div>
        <label>Force all hidden</label>
        <input
          type="checkbox"
          #checkBox
          (change)="
            checkBox.checked
              ? observer().hideAll()
              : observer().showAllVisible()
          "
        />
      </div>
      <div class="item-wrapper">
        <h2>Inline, no placeholder, keepLastKnownSize</h2>
        @for (item of values; track item.id) {
          <div rxVirtualView keepLastKnownSize class="item">
            <div class="content" *rxVirtualViewContent>
              {{ item.content }}
            </div>
          </div>
        }
      </div>
      <div class="item-wrapper">
        <h2>Inline, with placeholder</h2>
        @for (item of values; track item.id) {
          <div rxVirtualView class="item">
            <div>content before</div>
            <div class="content" *rxVirtualViewContent>
              {{ item.content }}
            </div>
            <div>content after</div>
            <div class="content placeholder" *rxVirtualViewPlaceholder>
              {{ item.content }}
            </div>
          </div>
        }
      </div>
      <div class="item-wrapper">
        <h2>Inline, startWithPlaceholderAsap</h2>
        @for (item of values; track item.id) {
          <div rxVirtualView startWithPlaceholderAsap class="item">
            <div>content before</div>
            <div class="content" *rxVirtualViewContent>
              {{ item.content }}
            </div>
            <div>content after</div>
            <div class="content placeholder" *rxVirtualViewPlaceholder>
              {{ item.content }}
            </div>
          </div>
        }
      </div>
      <div class="item-wrapper">
        <h2>With Components</h2>
        @for (item of values; track item.id) {
          <div rxVirtualView keepLastKnownSize class="item">
            <virtual-content
              class="content"
              [item]="item"
              *rxVirtualViewContent
            />
            <virtual-placeholder
              class="content placeholder"
              *rxVirtualViewPlaceholder
            />
          </div>
        }
      </div>
      <div class="item-wrapper">
        <h2>On Component (embedded)</h2>
        @for (item of values; track item.id) {
          <virtual-item rxVirtualView [item]="item" class="item" />
        }
      </div>
      <div class="item-wrapper">
        <h2>Category 3</h2>
        @for (item of values; track item.id) {
          <div rxVirtualView class="item">
            <div class="content" *rxVirtualViewContent>
              {{ item.content }}
            </div>
            <div class="content placeholder" *rxVirtualViewPlaceholder>
              {{ item.content }}
            </div>
          </div>
        }
      </div>
      <div class="item-wrapper">
        <h2>Category 4</h2>
        @for (item of values; track item.id) {
          <div rxVirtualView class="item">
            <div class="content" *rxVirtualViewContent>
              {{ item.content }}
            </div>
            <div class="content placeholder" *rxVirtualViewPlaceholder>
              {{ item.content }}
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        height: 100%;
        max-height: 100%;
        overflow-y: scroll;
      }
      .item-wrapper {
        height: 500px;
        width: 400px;
        overflow: auto;
      }

      .content.placeholder {
        color: blue;
      }

      .item {
        display: block;
        width: 250px;
        /*overflow: hidden;
        flex-shrink: 0;*/
        /*height: 50px;*/
        /*will-change: transform;*/
        border: 1px solid green;
        padding: 10px 0;
        box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.13);
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RxVirtualViewObserver,
    RxVirtualView,
    RxVirtualViewContent,
    RxVirtualViewPlaceholder,
    VirtualPlaceholder,
    VirtualContent,
    VirtualItem,
  ],
})
export class VirtualViewDemoComponent {
  observer = viewChild(RxVirtualViewObserver);
  values = new Array<{ id: number; content: string }>(200)
    .fill(null)
    .map((v, id) => ({
      id,
      content: randomContent(),
    }));
}

const randomContent = () => {
  return new Array(Math.max(1, Math.floor(Math.random() * 25)))
    .fill('')
    .map(() => randomWord())
    .join(' ');
};

const randomWord = () => {
  const words = [
    'Apple',
    'Banana',
    'The',
    'Orange',
    'House',
    'Boat',
    'Lake',
    'Car',
    'And',
  ];
  return words[Math.floor(Math.random() * words.length)];
};
