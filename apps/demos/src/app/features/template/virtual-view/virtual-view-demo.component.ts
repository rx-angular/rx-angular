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
import { DocsLinkComponent } from '../../../shared/docs-link';
import { VirtualContent } from './virtual-content.component';
import { VirtualItem } from './virtual-item.component';
import { VirtualPlaceholder } from './virtual-placeholder.component';

@Component({
  selector: 'virtual-view-demo',
  template: `
    <header class="rxa-demo-header">
      <div>
        <h2>Virtual View</h2>
        <p class="rxa-demo-subtitle">
          Demonstrates <code>rxVirtualView</code> rendering strategies —
          placeholders, <code>keepLastKnownSize</code> and embedded components.
        </p>
      </div>
      <rxa-docs-link
        docs="template/virtual-view-directive"
        source="apps/demos/src/app/features/template/virtual-view"
      />
    </header>

    <div class="container" rxVirtualViewObserver>
      <div class="rxa-demo-toolbar">
        <section class="rxa-demo-group">
          <span class="rxa-demo-label">Visibility</span>
          <label class="rxa-demo-controls">
            <input
              type="checkbox"
              #checkBox
              (change)="
                checkBox.checked
                  ? observer().hideAll()
                  : observer().showAllVisible()
              "
            />
            Force all hidden
          </label>
        </section>
      </div>
      <div class="item-wrapper">
        <h3 class="rxa-demo-section-title">
          Inline, no placeholder, keepLastKnownSize
        </h3>
        @for (item of values; track item.id) {
          <div rxVirtualView keepLastKnownSize class="item">
            <div class="content" *rxVirtualViewContent>
              {{ item.content }}
            </div>
          </div>
        }
      </div>
      <div class="item-wrapper">
        <h3 class="rxa-demo-section-title">Inline, with placeholder</h3>
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
        <h3 class="rxa-demo-section-title">Inline, startWithPlaceholderAsap</h3>
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
        <h3 class="rxa-demo-section-title">With Components</h3>
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
        <h3 class="rxa-demo-section-title">On Component (embedded)</h3>
        @for (item of values; track item.id) {
          <virtual-item rxVirtualView [item]="item" class="item" />
        }
      </div>
      <div class="item-wrapper">
        <h3 class="rxa-demo-section-title">Category 3</h3>
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
        <h3 class="rxa-demo-section-title">Category 4</h3>
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
        border: 1px solid var(--rxa-border);
        border-left: 3px solid rgba(var(--rxa-brand-rgb), 0.45);
        border-radius: var(--rxa-radius-sm);
        padding: 10px 12px;
        background: var(--rxa-surface);
        box-shadow: var(--rxa-shadow-sm);
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
    DocsLinkComponent,
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
