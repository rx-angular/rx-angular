import { Component, input, NgIterable, output, Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RxStrategyNames } from '@rx-angular/cdk/render-strategies';
import { createOutputSpy, mount } from 'cypress/angular';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  AutoSizeVirtualScrollStrategy,
  ListRange,
  RxVirtualFor,
  RxVirtualScrollElementDirective,
  RxVirtualScrollViewportComponent,
  RxVirtualScrollWindowDirective,
} from '../src';
import { DEFAULT_ITEM_SIZE } from '../src/lib/virtual-scroll.config';
import {
  defaultMountConfig,
  expectItemOffset,
  expectVisibleRangeStartToEqualScrolledIndex,
  generateItems,
  getDefaultMountConfig,
  getViewportComponent,
  Item,
  VirtualScrollMountConfig,
  waitUntilStable,
} from './fixtures';

interface AutoSizeVirtualScrollMountConfig extends VirtualScrollMountConfig<Item> {
  dynamicSize?: (item: Item) => number;
  tombstoneSize?: number;
}

const testComponentImports = [
  RxVirtualScrollViewportComponent,
  RxVirtualFor,
  AutoSizeVirtualScrollStrategy,
  RxVirtualScrollWindowDirective,
  RxVirtualScrollElementDirective,
];

@Component({
  template: `<rx-virtual-scroll-viewport
    (scrolledIndexChange)="scrolledIndex.emit($event)"
    (viewRange)="viewRange.emit($event)"
    (visibleRange)="visibleRange.emit($event)"
    data-cy="viewport"
    [style.height.px]="containerHeight()"
    [runwayItems]="runwayItems()"
    [runwayItemsOpposite]="runwayItemsOpposite()"
    [appendOnly]="appendOnly()"
    [tombstoneSize]="tombstoneSize()"
    [keepScrolledIndexOnPrepend]="keepScrolledIndexOnPrepend()"
    autosize
  >
    <div
      [style.height.px]="dynamicSize()(item)"
      *rxVirtualFor="
        let item of items();
        renderCallback: renderCallback();
        templateCacheSize: viewCache();
        strategy: strategy();
        trackBy: trackBy()
      "
      [attr.data-cy]="'item'"
    >
      <div>{{ item.id }}</div>
      @if (showItemDescription() && item.description) {
        <div>{{ item.description }}</div>
      }
    </div>
  </rx-virtual-scroll-viewport>`,
  imports: testComponentImports,
})
class AutoSizeTestComponent {
  containerHeight = input.required<number>();
  runwayItems = input.required<number>();
  runwayItemsOpposite = input.required<number>();
  viewCache = input.required<number>();
  trackBy = input<keyof Item | ((idx: number, i: Item) => unknown)>();
  dynamicSize = input.required<any>();
  tombstoneSize = input.required<number>();
  keepScrolledIndexOnPrepend = input(false);
  strategy = input.required<
    RxStrategyNames<string> | Observable<RxStrategyNames<string>>
  >();
  items = input.required<
    Observable<NgIterable<Item>> | NgIterable<Item> | null | undefined
  >();
  renderCallback = input.required<Subject<any>>();
  showItemDescription = input.required<boolean>();
  appendOnly = input(false);
  viewRange = output<ListRange>();
  visibleRange = output<ListRange>();
  scrolledIndex = output<number>();
}

@Component({
  template: ` <div
    rxVirtualScrollElement
    style="height: ${defaultMountConfig.containerHeight}px; width: 100vw;"
  >
    <div style="height: 50px;">Content Before</div>
    <rx-virtual-scroll-viewport
      (scrolledIndexChange)="scrolledIndex.emit($event)"
      (viewRange)="viewRange.emit($event)"
      (visibleRange)="visibleRange.emit($event)"
      data-cy="viewport"
      [style.height.px]="containerHeight()"
      [runwayItems]="runwayItems()"
      [runwayItemsOpposite]="runwayItemsOpposite()"
      [appendOnly]="appendOnly()"
      [tombstoneSize]="tombstoneSize()"
      [keepScrolledIndexOnPrepend]="keepScrolledIndexOnPrepend()"
      autosize
    >
      <div
        [style.height.px]="dynamicSize()(item)"
        *rxVirtualFor="
          let item of items();
          renderCallback: renderCallback();
          templateCacheSize: viewCache();
          strategy: strategy();
          trackBy: trackBy()
        "
        [attr.data-cy]="'item'"
      >
        <div>{{ item.id }}</div>
        @if (showItemDescription() && item.description) {
          <div>{{ item.description }}</div>
        }
      </div>
    </rx-virtual-scroll-viewport>
    <div style="height: 50px;">Content After</div>
  </div>`,
  imports: testComponentImports,
})
class AutoSizeCustomScrollElementTestComponent extends AutoSizeTestComponent {}

@Component({
  template: `<div [style.display]="isHidden() ? 'none' : 'block'">
    <rx-virtual-scroll-viewport
      (scrolledIndexChange)="scrolledIndex.emit($event)"
      (viewRange)="viewRange.emit($event)"
      data-cy="viewport"
      [style.height.px]="containerHeight()"
      [runwayItems]="runwayItems()"
      [runwayItemsOpposite]="runwayItemsOpposite()"
      [tombstoneSize]="tombstoneSize()"
      [withResizeObserver]="withResizeObserver()"
      autosize
    >
      <div
        [style.height.px]="dynamicSize()(item)"
        *rxVirtualFor="
          let item of items();
          renderCallback: renderCallback();
          templateCacheSize: viewCache();
          strategy: strategy();
          trackBy: trackBy()
        "
        [attr.data-cy]="'item'"
      >
        @if (showItemId()) {
          <div>{{ item.id }}</div>
        }
        @if (showItemDescription() && item.description) {
          <div>{{ item.description }}</div>
        }
      </div>
    </rx-virtual-scroll-viewport>
  </div>`,
  imports: testComponentImports,
})
class AutoSizeHideableTestComponent extends AutoSizeTestComponent {
  isHidden = input(false);
  withResizeObserver = input(true);
  /**
   * allows mounting items that render nothing at all. Because items are
   * `position: absolute` they then measure `0x0`, which must not be confused
   * with a hidden item.
   */
  showItemId = input(true);
}

@Component({
  template: `
    <div style="height: 50px;">Content Before</div>
    <rx-virtual-scroll-viewport
      scrollWindow
      (scrolledIndexChange)="scrolledIndex.emit($event)"
      (viewRange)="viewRange.emit($event)"
      (visibleRange)="visibleRange.emit($event)"
      data-cy="viewport"
      [runwayItems]="runwayItems()"
      [runwayItemsOpposite]="runwayItemsOpposite()"
      [appendOnly]="appendOnly()"
      [tombstoneSize]="tombstoneSize()"
      [keepScrolledIndexOnPrepend]="keepScrolledIndexOnPrepend()"
      autosize
    >
      <div
        [style.height.px]="dynamicSize()(item)"
        *rxVirtualFor="
          let item of items();
          renderCallback: renderCallback();
          templateCacheSize: viewCache();
          strategy: strategy();
          trackBy: trackBy()
        "
        [attr.data-cy]="'item'"
      >
        <div>{{ item.id }}</div>
        @if (showItemDescription() && item.description) {
          {{ item.description }}
        }
      </div>
    </rx-virtual-scroll-viewport>
    <div style="height: 50px;">Content After</div>
  `,
  imports: testComponentImports,
})
class AutoSizeWindowScrollTestComponent extends AutoSizeTestComponent {}

const defaultDynamicSize = (item: Item) =>
  item.description ? 130 : item.id % 2 === 0 ? 40 : item.id % 3 === 0 ? 85 : 50;

function mountAutoSize(
  config?: AutoSizeVirtualScrollMountConfig,
  type: Type<AutoSizeTestComponent> = AutoSizeTestComponent,
  /** inputs only defined on a specialized test component */
  extraProperties: Record<string, unknown> = {},
) {
  const {
    runwayItems,
    runwayItemsOpposite,
    viewCache,
    items,
    trackBy,
    strategy,
    containerHeight,
    tombstoneSize,
    showItemDescription,
    dynamicSize,
    appendOnly,
    keepScrolledIndexOnPrepend,
  } = {
    dynamicSize: defaultDynamicSize,
    tombstoneSize: DEFAULT_ITEM_SIZE,
    ...getDefaultMountConfig(),
    ...(config ?? {}),
  };
  const renderCallback$ = new Subject<Item[]>();
  const renderCallbackSpy = createOutputSpy<Item[]>('renderCallback');
  renderCallback$.subscribe((rendered) => renderCallbackSpy.emit(rendered));
  return mount(type, {
    componentProperties: {
      containerHeight,
      runwayItems,
      runwayItemsOpposite,
      viewCache,
      trackBy,
      dynamicSize,
      tombstoneSize,
      keepScrolledIndexOnPrepend,
      strategy,
      items,
      showItemDescription,
      renderCallback: renderCallback$,
      appendOnly,
      viewRange: createOutputSpy<ListRange>('viewRange'),
      visibleRange: createOutputSpy<ListRange>('visibleRange'),
      scrolledIndex: createOutputSpy<number>('scrolledIndex'),
      ...extraProperties,
    },
  });
}

function totalItemHeight(items: Item[]) {
  return items.reduce((height, item) => height + defaultDynamicSize(item), 0);
}

function extractTranslateYValue(str) {
  const translateYRegex = /translateY\(([-0-9]+(\.[0-9]+)?)px?\)/; // Match the translateY() function and capture the numeric value
  const matches = str.match(translateYRegex); // Get the match array from the input string
  if (matches && matches.length >= 2) {
    return parseFloat(matches[1]); // Return the captured numeric value as a float
  } else {
    return null; // Return null if no match was found
  }
}

function expectedRange(
  config: AutoSizeVirtualScrollMountConfig,
  items: Item[],
  scrolledIndex = 0,
  scrollDirection = 'up',
): ListRange {
  const {
    containerHeight,
    runwayItems,
    runwayItemsOpposite,
    dynamicSize,
    tombstoneSize,
  } = config;
  const start = Math.max(
    0,
    scrolledIndex -
      (scrollDirection === 'up' ? runwayItems : runwayItemsOpposite),
  );
  let size = 0;
  let i = scrolledIndex;
  while (size <= containerHeight && i < items.length) {
    size += dynamicSize(items[i]);
    if (size <= containerHeight) {
      i++;
    }
  }
  const end = Math.min(
    items.length,
    i + (scrollDirection === 'up' ? runwayItemsOpposite : runwayItems),
  );
  return { start, end };
}

/**
 * derived from the layout instead of from `expectedRange`: walk the items from
 * `scrolledIndex` and accumulate their sizes. every item which *starts* before
 * the bottom edge of the viewport is (at least partially) visible, an item
 * starting exactly at the bottom edge is not.
 */
function expectedVisibleRange(
  config: AutoSizeVirtualScrollMountConfig,
  items: Item[],
  scrolledIndex = 0,
): ListRange {
  const { containerHeight, dynamicSize } = config;
  let itemTop = 0;
  let end = scrolledIndex;
  while (itemTop < containerHeight && end < items.length) {
    itemTop += dynamicSize(items[end]);
    end++;
  }
  return { start: scrolledIndex, end };
}

describe('viewport', () => {
  it('has proper runway height', () => {
    mountAutoSize().then(({ fixture, component }) => {
      fixture.detectChanges();
      const sentinel = fixture.debugElement.query(
        By.css('.rx-virtual-scroll__sentinel'),
      );
      const viewportComponent = getViewportComponent(fixture);
      let endIndex = 0;
      const checkingKnownElements$ = new Subject<void>();
      viewportComponent.viewRepeater.viewRendered$
        .pipe(takeUntil(checkingKnownElements$))
        .subscribe((event) => {
          if (event.index > endIndex) {
            endIndex = event.index;
          }
        });
      const items = component.items() as Item[];
      const initialRange = expectedRange(
        {
          containerHeight: component.containerHeight(),
          runwayItems: component.runwayItems(),
          runwayItemsOpposite: component.runwayItemsOpposite(),
          dynamicSize: () => component.tombstoneSize(),
        },
        items,
      );
      const initialHeight = items.length * component.tombstoneSize();
      expect((sentinel.nativeElement as HTMLElement).style.transform).eq(
        `translate(0px, ${initialHeight - 1}px)`,
      );
      cy.get('@viewRange').should('have.been.calledWith', initialRange);
      cy.get('@renderCallback')
        .should('have.been.called')
        .then(() => {
          checkingKnownElements$.next();
          const knownEndRange = endIndex + 1;
          const rangeConfig = {
            containerHeight: component.containerHeight(),
            runwayItems: component.runwayItems(),
            runwayItemsOpposite: component.runwayItemsOpposite(),
            dynamicSize: component.dynamicSize(),
          };
          const range = expectedRange(rangeConfig, items);
          const runwayHeight =
            totalItemHeight(items.slice(range.start, knownEndRange)) +
            (items.length - knownEndRange) * component.tombstoneSize();
          cy.get('@viewRange').should('have.been.calledWith', range);
          cy.get('@renderCallback')
            .should(
              'have.been.calledWith',
              items.filter((item, i) => i < range.end),
            )
            .then(() => {
              // the measurements of the rendered views arrive asynchronously
              cy.wrap(null).should(() => {
                expect(
                  (sentinel.nativeElement as HTMLElement).style.transform,
                ).eq(`translate(0px, ${runwayHeight - 1}px)`);
              });
            });
        });
    });
  });
  it('change runway height on item changes', () => {
    mountAutoSize().then(({ fixture, component }) => {
      const items = [...(component.items() as Item[])];
      fixture.detectChanges();
      const sentinel = fixture.debugElement.query(
        By.css('.rx-virtual-scroll__sentinel'),
      );
      const viewportComponent = getViewportComponent(fixture);
      const renderedViews = new Set<number>();
      viewportComponent.viewRepeater.viewRendered$
        .pipe(takeUntil(viewportComponent.viewRepeater.viewsRendered$))
        .subscribe((event) => {
          renderedViews.add(event.index);
        });

      cy.get('@renderCallback')
        .should('have.been.called')
        .then(() => {
          const knownElements = renderedViews.size;
          const rangeConfig = {
            containerHeight: component.containerHeight(),
            runwayItems: component.runwayItems(),
            runwayItemsOpposite: component.runwayItemsOpposite(),
            dynamicSize: component.dynamicSize(),
          };
          const range = expectedRange(rangeConfig, items);
          const runwayHeight =
            totalItemHeight(items.slice(range.start, knownElements)) +
            (items.length - knownElements) * component.tombstoneSize();
          items.push(...generateItems(1));
          fixture.componentRef.setInput('items', [...items]);
          fixture.detectChanges();
          expect((sentinel.nativeElement as HTMLElement).style.transform).eq(
            `translate(0px, ${runwayHeight + component.tombstoneSize() - 1}px)`,
          );
          items.splice(100, 1);
          fixture.componentRef.setInput('items', [...items]);
          fixture.detectChanges();
          expect((sentinel.nativeElement as HTMLElement).style.transform).eq(
            `translate(0px, ${runwayHeight - 1}px)`,
          );
        });
    });
  });
});

describe('rendering, scrolling & positioning', () => {
  it('displays nothing', () => {
    mountAutoSize().then(({ fixture }) => {
      fixture.componentRef.setInput('items', []);
      fixture.detectChanges();
      cy.get('[data-cy=item]').should('have.length', 0);
      fixture.componentRef.setInput('items', null);
      fixture.detectChanges();
      cy.get('[data-cy=item]').should('have.length', 0);
      fixture.componentRef.setInput('items', undefined);
      fixture.detectChanges();
      cy.get('[data-cy=item]').should('have.length', 0);
    });
  });
  it('displays and positions items', () => {
    mountAutoSize().then(({ component }) => {
      const items = component.items() as Item[];
      const rangeConfig = {
        containerHeight: component.containerHeight(),
        runwayItems: component.runwayItems(),
        runwayItemsOpposite: component.runwayItemsOpposite(),
        dynamicSize: component.dynamicSize(),
      };
      const range = expectedRange(rangeConfig, items, 0);
      cy.get('[data-cy=item]').should('have.length', range.end - range.start);
      let position = 0;
      cy.get('[data-cy=item]').each((element, i) => {
        expect(element.css('position')).to.be.eq('absolute');
        expect(element.attr('style')).to.contain(`translateY(${position}px)`);
        position += defaultDynamicSize(items[i]);
      });
      cy.get('@scrolledIndex').should('have.been.calledWith', 0);
      cy.get('@viewRange').should('have.been.calledWith', range);
      cy.get('@renderCallback').should(
        'have.been.calledWith',
        items.filter((v, i) => i < range.end),
      );
    });
  });

  it('repositions items when size changes', () => {
    mountAutoSize().then(({ component }) => {
      const items = component.items() as Item[];
      const rangeConfig = {
        containerHeight: component.containerHeight(),
        runwayItems: component.runwayItems(),
        runwayItemsOpposite: component.runwayItemsOpposite(),
        dynamicSize: component.dynamicSize(),
      };
      const range = expectedRange(rangeConfig, items, 0);
      cy.get('[data-cy=item]').should('have.length', range.end - range.start);
      cy.get('[data-cy=item]')
        .first()
        .then((element) => {
          element.css('height', `${defaultDynamicSize(items[0]) + 50}px`);
          cy.get('[data-cy=item]').should((elements) => {
            let position = 0;
            elements.each((i, element) => {
              expect(element.getAttribute('style')).to.contain(
                `translateY(${position}px)`,
              );
              position += defaultDynamicSize(items[i]) + (i === 0 ? 50 : 0);
            });
          });
        });
    });
  });

  it('displays and positions items with different sizes', () => {
    const dynamicSize = (item: Item) => (item.description ? 70 : 20);
    const config: AutoSizeVirtualScrollMountConfig = {
      dynamicSize,
    };
    mountAutoSize(config).then(({ component }) => {
      const items = component.items() as Item[];
      const rangeConfig = {
        containerHeight: component.containerHeight(),
        runwayItems: component.runwayItems(),
        runwayItemsOpposite: component.runwayItemsOpposite(),
        dynamicSize: component.dynamicSize(),
      };
      const range = expectedRange(rangeConfig, items, 0);
      cy.get('[data-cy=item]').should('have.length', range.end);
      let position = 0;
      cy.get('[data-cy=item]').each((element, i) => {
        expect(element.css('position')).to.be.eq('absolute');
        expect(element.attr('style')).to.contain(`translateY(${position}px)`);
        position += dynamicSize(items[i]);
      });
      cy.get('@scrolledIndex').should('have.been.calledWith', 0);
      cy.get('@viewRange').should('have.been.calledWith', range);
      cy.get('@renderCallback').should(
        'have.been.calledWith',
        items.filter((v, i) => i < range.end),
      );
    });
  });

  it('displays more items when runwayItemsOpposite are configured', () => {
    mountAutoSize({ runwayItemsOpposite: 20 }).then(({ component }) => {
      const items = component.items() as Item[];
      const rangeConfig = {
        containerHeight: component.containerHeight(),
        runwayItems: component.runwayItems(),
        runwayItemsOpposite: component.runwayItemsOpposite(),
        dynamicSize: component.dynamicSize(),
      };
      const range = expectedRange(rangeConfig, items, 0);
      cy.get('[data-cy=item]').should('have.length', range.end);
      let position = 0;
      cy.get('[data-cy=item]').each((element, i) => {
        expect(element.css('position')).to.be.eq('absolute');
        expect(element.attr('style')).to.contain(`translateY(${position}px)`);
        position += component.dynamicSize()(items[i]);
      });
      cy.get('@scrolledIndex').should('have.been.calledWith', 0);
      cy.get('@viewRange').should('have.been.calledWith', range);
      cy.get('@renderCallback').should(
        'have.been.calledWith',
        items.filter((v, i) => i < range.end),
      );
    });
  });

  it('reacts to runwayItems change', () => {
    mountAutoSize().then(({ component, fixture }) => {
      const items = component.items() as Item[];
      const rangeConfig = {
        containerHeight: component.containerHeight(),
        runwayItems: component.runwayItems(),
        runwayItemsOpposite: component.runwayItemsOpposite(),
        dynamicSize: component.dynamicSize(),
      };
      const range = expectedRange(rangeConfig, items, 0);
      cy.get('[data-cy=item]').should('have.length', range.end);
      let position = 0;
      cy.get('[data-cy=item]')
        .each((element, i) => {
          expect(element.css('position')).to.be.eq('absolute');
          expect(element.attr('style')).to.contain(`translateY(${position}px)`);
          position += component.dynamicSize()(items[i]);
        })
        .then(() => {
          let runwayItems = component.runwayItems();
          let runwayItemsOpposite = component.runwayItemsOpposite();
          // react to runwayItems config changes
          runwayItems = runwayItems + 5;
          runwayItemsOpposite = runwayItemsOpposite + 5;
          fixture.componentRef.setInput('runwayItems', runwayItems);
          fixture.componentRef.setInput(
            'runwayItemsOpposite',
            runwayItemsOpposite,
          );
          fixture.detectChanges();
          const newRange = { start: 0, end: range.end + 5 };
          cy.get('@viewRange').should('have.been.calledWith', newRange);
          cy.get('[data-cy=item]').should(
            'have.length',
            newRange.end - newRange.start,
          );
          position = 0;
          cy.get('[data-cy=item]').each((element, i) => {
            expect(element.css('position')).to.be.eq('absolute');
            expect(element.attr('style')).to.contain(
              `translateY(${position}px)`,
            );
            position += component.dynamicSize()(items[i]);
          });
        });
    });
  });

  it('reacts to scroll events & runwayItems configuration', () => {
    mountAutoSize({ showItemDescription: false }).then(
      ({ fixture, component }) => {
        const items = component.items() as Item[];
        fixture.detectChanges();
        const viewportComponent = getViewportComponent(fixture);
        const rangeConfig = {
          containerHeight: component.containerHeight(),
          runwayItems: component.runwayItems(),
          runwayItemsOpposite: component.runwayItemsOpposite(),
          dynamicSize: component.dynamicSize(),
        };
        const initialRange = expectedRange(rangeConfig, items, 0, 'up');
        const renderedInitialItems = items.filter(
          (v, i) => i < initialRange.end,
        );
        cy.get('@renderCallback')
          .should('have.been.calledWith', renderedInitialItems)
          .then(() => {
            const scrollToSomeWhere =
              (items.length / 2) * component.tombstoneSize();
            viewportComponent.scrollTo(scrollToSomeWhere);
            cy.wait(200);
            cy.get('@renderCallback')
              .should('have.been.called')
              .then(() => {
                let position = 0;
                cy.get('[data-cy=item]').each((element) => {
                  const id = parseInt(element.text().trim());
                  if (!position) {
                    position = extractTranslateYValue(element.attr('style'));
                  }
                  const item = items[id];
                  expect(element.attr('style')).contains(
                    `translateY(${position}px)`,
                  );
                  position += component.dynamicSize()(item);
                });
              });
          });
      },
    );
  });

  it('reacts to containerHeight changes', () => {
    // change containerHeight and see if viewRange changes
    mountAutoSize().then(({ fixture, component }) => {
      const items = component.items() as Item[];
      const rangeConfig = {
        containerHeight: component.containerHeight(),
        runwayItems: component.runwayItems(),
        runwayItemsOpposite: component.runwayItemsOpposite(),
        dynamicSize: component.dynamicSize(),
      };
      const range = expectedRange(rangeConfig, items, 0);
      cy.get('[data-cy=item]')
        .should('have.length', range.end)
        .then(() => {
          fixture.componentRef.setInput('containerHeight', 500);
          fixture.detectChanges();
          const rangeConfig = {
            containerHeight: 500,
            runwayItems: component.runwayItems(),
            runwayItemsOpposite: component.runwayItemsOpposite(),
            dynamicSize: component.dynamicSize(),
          };
          const range = expectedRange(rangeConfig, items, 0);
          cy.get('[data-cy=item]').should(
            'have.length',
            range.end - range.start,
          );
          cy.get('@viewRange').should('have.been.calledWith', range);
        });
    });
  });

  it('scrolls to an index', () => {
    mountAutoSize().then(({ fixture, component }) => {
      fixture.detectChanges();
      const viewportComponent = getViewportComponent(fixture);
      viewportComponent.scrollToIndex(340);
      const items = component.items() as Item[];
      const rangeConfig = {
        containerHeight: component.containerHeight(),
        runwayItems: component.runwayItems(),
        runwayItemsOpposite: component.runwayItemsOpposite(),
        dynamicSize: () => component.tombstoneSize(),
      };
      const range = expectedRange(rangeConfig, items, 340, 'down');
      cy.get('@scrolledIndex').should('have.been.calledWith', 340);
      cy.get('@viewRange').should('have.been.calledWith', range);
    });
  });
});

describe('visibleRange', () => {
  it('emits the visible range, excluding runway items', () => {
    mountAutoSize().then(({ component }) => {
      const items = component.items() as Item[];
      const rangeConfig = {
        containerHeight: component.containerHeight(),
        runwayItems: component.runwayItems(),
        runwayItemsOpposite: component.runwayItemsOpposite(),
        dynamicSize: component.dynamicSize(),
      };
      cy.get('@visibleRange').should(
        'have.been.calledWith',
        expectedVisibleRange(rangeConfig, items),
      );
      // the rendered range is wider, it includes the runway
      cy.get('@viewRange').should(
        'have.been.calledWith',
        expectedRange(rangeConfig, items),
      );
    });
  });

  it('advances visibleRange.start while scrolling with appendOnly=true', () => {
    mountAutoSize({ appendOnly: true }).then(({ fixture, component }) => {
      fixture.detectChanges();
      const viewportComponent = getViewportComponent(fixture);
      viewportComponent.scrollToIndex(100);
      const items = component.items() as Item[];
      const rangeConfig = {
        containerHeight: component.containerHeight(),
        runwayItems: component.runwayItems(),
        runwayItemsOpposite: component.runwayItemsOpposite(),
        dynamicSize: () => component.tombstoneSize(),
      };
      // appendOnly keeps the rendered range anchored at the very first item
      cy.get('@viewRange').should('have.been.calledWith', {
        start: 0,
        end: expectedRange(rangeConfig, items, 100, 'down').end,
      });
      // ... while the visible range follows the viewport
      cy.get('@visibleRange').should(
        'have.been.calledWith',
        expectedVisibleRange(rangeConfig, items, 100),
      );
    });
  });

  it('visibleRange.start tracks scrolledIndexChange', () => {
    mountAutoSize().then(({ fixture }) => {
      fixture.detectChanges();
      const viewportComponent = getViewportComponent(fixture);
      [42, 180, 340].forEach((index) => {
        cy.then(() => viewportComponent.scrollToIndex(index));
        expectVisibleRangeStartToEqualScrolledIndex();
      });
    });
  });

  it('reacts to containerHeight changes', () => {
    mountAutoSize().then(({ fixture, component }) => {
      const items = component.items() as Item[];
      const rangeConfig = {
        containerHeight: component.containerHeight(),
        runwayItems: component.runwayItems(),
        runwayItemsOpposite: component.runwayItemsOpposite(),
        dynamicSize: component.dynamicSize(),
      };
      cy.get('@visibleRange')
        .should(
          'have.been.calledWith',
          expectedVisibleRange(rangeConfig, items),
        )
        .then(() => {
          fixture.componentRef.setInput('containerHeight', 100);
          fixture.detectChanges();
          cy.get('@visibleRange').should(
            'have.been.calledWith',
            expectedVisibleRange(
              { ...rangeConfig, containerHeight: 100 },
              items,
            ),
          );
        });
    });
  });

  /**
   * hand computed expectations for a deterministic layout, so they don't share
   * any code path with the implementation.
   * 6 items of 50px exactly fill the 300px viewport: item 6 starts at y=300,
   * which is below the fold, so it must not be part of the visible range.
   */
  it('excludes an item starting exactly at the bottom edge', () => {
    mountAutoSize({
      containerHeight: 300,
      dynamicSize: () => 50,
      tombstoneSize: 50,
    }).then(() => {
      cy.get('@visibleRange').should('have.been.calledWith', {
        start: 0,
        end: 6,
      });
    });
  });

  it('includes an item intersecting the bottom edge', () => {
    // 6 items of 50px + 25px of item 6 fill the 325px viewport
    mountAutoSize({
      containerHeight: 325,
      dynamicSize: () => 50,
      tombstoneSize: 50,
    }).then(() => {
      cy.get('@visibleRange').should('have.been.calledWith', {
        start: 0,
        end: 7,
      });
    });
  });

  it('excludes an item starting exactly at the bottom edge while scrolled', () => {
    // items 100 - 105 exactly fill the 300px viewport, item 106 starts at y=6000
    mountAutoSize({
      containerHeight: 300,
      dynamicSize: () => 50,
      tombstoneSize: 50,
    }).then(({ fixture }) => {
      fixture.detectChanges();
      getViewportComponent(fixture).scrollTo(100 * 50);
      cy.get('@visibleRange').should('have.been.calledWith', {
        start: 100,
        end: 106,
      });
    });
  });

  /**
   * items are 30px, the tombstoneSize is 50px. The initial render measures the
   * first items, every item after them is estimated with the tombstoneSize.
   * Jumping 40px past the estimated position of item 100 anchors at item 100
   * with an offset of 40px. Measuring the rendered items shrinks item 100
   * below that offset and the content above it, the strategy corrects the
   * scroll position. The anchor has to be re-derived afterwards, item 100 is
   * out of view.
   */
  it('re-derives the scrolledIndex after a scroll position correction', () => {
    mountAutoSize({
      containerHeight: 300,
      dynamicSize: () => 30,
      tombstoneSize: 50,
      showItemDescription: false,
      // renders the range in one go, the concurrent strategies chunk it
      // depending on the frame budget which changes what gets measured when
      strategy: 'native',
    }).then(({ fixture }) => {
      fixture.detectChanges();
      const viewport = getViewportComponent(fixture);
      // the initial render settles in a few passes, each measuring more items.
      // Where a jump lands depends on how many items are measured by then, so
      // jump only after the last pass and estimate the position like the
      // strategy does: measured items with their size, the rest as tombstones
      cy.get('[data-cy=item]').should('have.length.greaterThan', 0);
      waitUntilStable(() => Cypress.$('[data-cy=item]').length).then(
        (measured) => {
          viewport.scrollTo(measured * 30 + (100 - measured) * 50 + 40);
        },
      );
      waitUntilStable(() => viewport.getScrollTop());
      cy.get('[data-cy=viewport]').should(([scrollContainer]) => {
        const top = scrollContainer.getBoundingClientRect().top;
        const firstVisible = [
          ...scrollContainer.querySelectorAll('[data-cy=item]'),
        ]
          .filter((item) => item.getBoundingClientRect().bottom > top)
          .map((item) => Number(item.textContent!.trim()))
          .sort((a, b) => a - b)[0];
        expect(firstVisible, 'first visible item').to.eq(101);
      });
      cy.get('@scrolledIndex').its('lastCall.args.0').should('eq', 101);
      expectVisibleRangeStartToEqualScrolledIndex();
    });
  });
});

describe('data mutations', () => {
  describe('without trackBy', () => {
    it('should add item', () => {
      mountAutoSize({ showItemDescription: false }).then(
        ({ fixture, component }) => {
          const items = [...(component.items() as Item[])];
          const newItem = generateItems(1, 500)[0];
          items.splice(0, 0, newItem);
          fixture.componentRef.setInput('items', [...items]);
          fixture.detectChanges();
          cy.get('[data-cy=item]')
            .first()
            .then((item) => {
              expect(item.text().trim()).to.be.eq(`${items.length - 1}`);
              expect(item.attr('style')).to.contain(`translateY(0px)`);
            });
        },
      );
    });
    it('should remove item', () => {
      mountAutoSize({ showItemDescription: false }).then(
        ({ fixture, component }) => {
          const items = [...(component.items() as Item[])];
          items.splice(0, 1);
          fixture.componentRef.setInput('items', [...items]);
          fixture.detectChanges();
          cy.get('[data-cy=item]')
            .first()
            .then((item) => {
              expect(item.text().trim()).to.be.eq('1');
              expect(item.attr('style')).to.contain(`translateY(0px)`);
            });
        },
      );
    });
  });
  describe('with trackBy', () => {
    it('should throw an error', () => {
      cy.on('fail', (e) => {
        expect(e.message).contain(
          'trackBy must be typeof function or keyof T, but received {}.',
        );
      });
      mountAutoSize({ trackBy: {} as any });
      it('should add item with trackBy', () => {
        mountAutoSize({
          showItemDescription: false,
          trackBy: (i, item) => item.id,
        }).then(({ fixture, component }) => {
          const items = [...(component.items() as Item[])];
          const newItem = generateItems(1, 500)[0];
          items.splice(0, 0, newItem);
          fixture.componentRef.setInput('items', [...items]);
          fixture.detectChanges();
          cy.get('[data-cy=item]')
            .first()
            .then((item) => {
              expect(item.text().trim()).to.be.eq(`${items.length - 1}`);
              expect(item.attr('style')).to.contain(`translateY(0px)`);
            });
        });
      });
    });
  });
});

describe('custom scrollable', () => {
  it('displays and positions items', () => {
    mountAutoSize({}, AutoSizeCustomScrollElementTestComponent).then(
      ({ component }) => {
        const items = component.items() as Item[];
        const rangeConfig = {
          containerHeight: component.containerHeight() - 50,
          runwayItems: component.runwayItems(),
          runwayItemsOpposite: component.runwayItemsOpposite(),
          dynamicSize: component.dynamicSize(),
        };
        const range = expectedRange(rangeConfig, items, 0);
        cy.get('[data-cy=item]').should('have.length', range.end - range.start);
        let position = 0;
        cy.get('[data-cy=item]').each((element, i) => {
          expect(element.css('position')).to.be.eq('absolute');
          expect(element.attr('style')).to.contain(`translateY(${position}px)`);
          position += defaultDynamicSize(items[i]);
        });
        cy.get('@scrolledIndex').should('have.been.calledWith', 0);
        cy.get('@viewRange').should('have.been.calledWith', range);
        cy.get('@renderCallback').should(
          'have.been.calledWith',
          items.filter((v, i) => i < range.end),
        );
      },
    );
  });
  it('reacts to scroll events', () => {
    mountAutoSize(
      { showItemDescription: false },
      AutoSizeCustomScrollElementTestComponent,
    ).then(({ fixture, component }) => {
      const items = component.items() as Item[];
      fixture.detectChanges();
      const viewportComponent = getViewportComponent(fixture);
      const rangeConfig = {
        containerHeight: component.containerHeight() - 50,
        runwayItems: component.runwayItems(),
        runwayItemsOpposite: component.runwayItemsOpposite(),
        dynamicSize: component.dynamicSize(),
      };
      const initialRange = expectedRange(rangeConfig, items, 0, 'up');
      const renderedInitialItems = items.filter((v, i) => i < initialRange.end);
      cy.get('@renderCallback')
        .should('have.been.calledWith', renderedInitialItems)
        .then(() => {
          const scrollToSomeWhere =
            (items.length / 2) * component.tombstoneSize();
          viewportComponent.scrollTo(scrollToSomeWhere);
          cy.wait(200);
          cy.get('@renderCallback')
            .should('have.been.called')
            .then(() => {
              let position = 0;
              cy.get('[data-cy=item]').each((element) => {
                const id = parseInt(element.text().trim());
                if (!position) {
                  position = extractTranslateYValue(element.attr('style'));
                }
                const item = items[id];
                expect(element.attr('style')).contains(
                  `translateY(${position}px)`,
                );
                position += component.dynamicSize()(item);
              });
            });
        });
    });
  });
  it('scrolls to an index', () => {
    mountAutoSize({}, AutoSizeCustomScrollElementTestComponent).then(
      ({ fixture, component }) => {
        fixture.detectChanges();
        const viewportComponent = getViewportComponent(fixture);
        viewportComponent.scrollToIndex(340);
        const items = component.items() as Item[];
        const rangeConfig = {
          containerHeight: component.containerHeight(),
          runwayItems: component.runwayItems(),
          runwayItemsOpposite: component.runwayItemsOpposite(),
          dynamicSize: () => component.tombstoneSize(),
        };
        const range = expectedRange(rangeConfig, items, 340, 'down');
        cy.get('@scrolledIndex').should('have.been.calledWith', 340);
        cy.get('@viewRange').should('have.been.calledWith', range);
      },
    );
  });
});

describe('window scrolling', () => {
  it('displays and positions items', () => {
    let containerHeight = 0;
    cy.window().then((w) => (containerHeight = w.innerHeight));
    mountAutoSize({}, AutoSizeWindowScrollTestComponent).then(
      ({ component }) => {
        const items = component.items() as Item[];
        const rangeConfig = {
          containerHeight: containerHeight - 50,
          runwayItems: component.runwayItems(),
          runwayItemsOpposite: component.runwayItemsOpposite(),
          dynamicSize: component.dynamicSize(),
        };
        const range = expectedRange(rangeConfig, items, 0);
        cy.get('[data-cy=item]').should('have.length', range.end - range.start);
        let position = 0;
        cy.get('[data-cy=item]').each((element, i) => {
          expect(element.css('position')).to.be.eq('absolute');
          expect(element.attr('style')).to.contain(`translateY(${position}px)`);
          position += defaultDynamicSize(items[i]);
        });
        cy.get('@scrolledIndex').should('have.been.calledWith', 0);
        cy.get('@viewRange').should('have.been.calledWith', range);
        cy.get('@renderCallback').should(
          'have.been.calledWith',
          items.filter((v, i) => i < range.end),
        );
      },
    );
  });
  it('reacts to scroll events', () => {
    let containerHeight = 0;
    cy.window().then((w) => (containerHeight = w.innerHeight));
    mountAutoSize(
      { showItemDescription: false },
      AutoSizeWindowScrollTestComponent,
    ).then(({ fixture, component }) => {
      const items = component.items() as Item[];
      fixture.detectChanges();
      const initialRange = expectedRange(
        {
          containerHeight: containerHeight - 50,
          runwayItems: component.runwayItems(),
          runwayItemsOpposite: component.runwayItemsOpposite(),
          dynamicSize: component.dynamicSize(),
        },
        items,
        0,
        'up',
      );
      const renderedInitialItems = items.filter((v, i) => i < initialRange.end);
      cy.get('@renderCallback')
        .should('have.been.calledWith', renderedInitialItems)
        .then(() => {
          const scrollToSomeWhere =
            (items.length * component.tombstoneSize()) / 2;
          cy.scrollTo(0, scrollToSomeWhere);
          cy.wait(200);
          cy.get('@renderCallback')
            .should('have.been.called')
            .then(() => {
              let position = 0;
              cy.get('[data-cy=item]').each((element) => {
                const id = parseInt(element.text().trim());
                if (!position) {
                  position = extractTranslateYValue(element.attr('style'));
                }
                const item = items[id];
                expect(element.attr('style')).contains(
                  `translateY(${position}px)`,
                );
                position += component.dynamicSize()(item);
              });
            });
        });
    });
  });
  it('scrolls to an index', () => {
    let containerHeight = 0;
    cy.window().then((w) => (containerHeight = w.innerHeight));
    mountAutoSize({}, AutoSizeWindowScrollTestComponent).then(
      ({ fixture, component }) => {
        fixture.detectChanges();
        const viewportComponent = getViewportComponent(fixture);
        viewportComponent.scrollToIndex(340);
        const items = component.items() as Item[];
        const rangeConfig = {
          containerHeight,
          runwayItems: component.runwayItems(),
          runwayItemsOpposite: component.runwayItemsOpposite(),
          dynamicSize: () => component.tombstoneSize(),
        };
        const range = expectedRange(rangeConfig, items, 340, 'down');
        cy.get('@scrolledIndex').should('have.been.calledWith', 340);
        cy.get('@viewRange').should('have.been.calledWith', range);
      },
    );
  });
});

describe('hidden viewport (display: none)', () => {
  it('keeps the scroll position across a hide/show cycle', () => {
    mountAutoSize({}, AutoSizeHideableTestComponent).then(({ fixture }) => {
      fixture.detectChanges();
      const viewportComponent = getViewportComponent(fixture);
      viewportComponent.scrollTo(5000);
      waitUntilStable(() => viewportComponent.getScrollTop()).then(
        (scrollTopBeforeHide) => {
          fixture.componentRef.setInput('isHidden', true);
          fixture.detectChanges();
          cy.wait(100);
          cy.then(() => {
            fixture.componentRef.setInput('isHidden', false);
            fixture.detectChanges();
            // a wrong scroll position would only show up after a while, give
            // the strategy time to (wrongly) correct it
            cy.wait(200);
            cy.then(() => {
              expect(viewportComponent.getScrollTop()).to.be.closeTo(
                scrollTopBeforeHide,
                2,
              );
            });
          });
        },
      );
    });
  });

  it('does not zero the cached item sizes while hidden', () => {
    mountAutoSize({}, AutoSizeHideableTestComponent).then(({ fixture }) => {
      fixture.detectChanges();
      const sentinel = fixture.debugElement.query(
        By.css('.rx-virtual-scroll__sentinel'),
      );
      cy.get('@renderCallback')
        .should('have.been.called')
        .then(() =>
          waitUntilStable(
            () => (sentinel.nativeElement as HTMLElement).style.transform,
          ),
        )
        .then((runwayHeightBeforeHide) => {
          fixture.componentRef.setInput('isHidden', true);
          fixture.detectChanges();
          cy.wait(100);
          cy.then(() => {
            expect(
              (sentinel.nativeElement as HTMLElement).style.transform,
            ).to.eq(runwayHeightBeforeHide);
          });
        });
    });
  });

  [true, false].forEach((withResizeObserver) => {
    it(`keeps the rendered range while hidden (withResizeObserver: ${withResizeObserver})`, () => {
      mountAutoSize({}, AutoSizeHideableTestComponent).then(({ fixture }) => {
        fixture.componentRef.setInput('withResizeObserver', withResizeObserver);
        fixture.detectChanges();
        cy.get('[data-cy=item]').should('have.length.greaterThan', 0);
        waitUntilStable(() => Cypress.$('[data-cy=item]').length).then(
          (renderedItems) => {
            fixture.componentRef.setInput('isHidden', true);
            fixture.detectChanges();
            // a collapse would only show up after a while, give it the time
            cy.wait(100);
            cy.get('[data-cy=item]').should('have.length', renderedItems);
            cy.then(() => {
              fixture.componentRef.setInput('isHidden', false);
              fixture.detectChanges();
              cy.wait(200);
              cy.get('[data-cy=item]').should('have.length', renderedItems);
            });
          },
        );
      });
    });
  });

  it('still reacts to a genuine zero-height item', () => {
    // an item that collapses to 0px while the viewport is rendered is a real
    // measurement and has to be booked
    mountAutoSize(
      { showItemDescription: false, dynamicSize: () => 60 },
      AutoSizeHideableTestComponent,
    ).then(() => {
      cy.get('[data-cy=item]')
        .eq(1)
        .should('have.attr', 'style')
        .and('contain', 'translateY(60px)');
      cy.get('[data-cy=item]')
        .first()
        .then((element) => {
          element.css('height', '0px');
          cy.wait(100);
          cy.get('[data-cy=item]')
            .eq(1)
            .should('have.attr', 'style')
            .and('contain', 'translateY(0px)');
        });
    });
  });

  it('still reacts to an item that collapses on both axes', () => {
    // `.rx-virtual-scroll__runway > *` is `position: absolute`
    // (virtual-scroll-viewport.component.scss), so items shrink-to-fit instead
    // of filling the container. An item that renders no content therefore
    // measures 0x0 while being perfectly rendered, which looks exactly like the
    // collapsed box of a view that is not rendered at all. A "both axes are 0"
    // heuristic would drop this very real measurement - only the absence of a
    // layout box tells the two apart.
    //
    // The items here are sized by their content alone (no explicit height), so
    // hiding the content collapses them on both axes.
    mountAutoSize(
      {
        items: generateItems(5),
        showItemDescription: false,
        dynamicSize: () => null as unknown as number,
        tombstoneSize: 1,
      },
      AutoSizeHideableTestComponent,
    ).then(({ fixture }) => {
      cy.get('[data-cy=item]').should('have.length', 5);
      cy.get('[data-cy=item]')
        .eq(1)
        .then((element) => {
          const positionWithContent = extractTranslateYValue(
            element.attr('style'),
          );
          // the first item is sized by its content only
          expect(positionWithContent).to.be.greaterThan(0);
          fixture.componentRef.setInput('showItemId', false);
          fixture.detectChanges();
          cy.get('[data-cy=item]')
            .first()
            .should(($item) => {
              // premise of this test: rendered, but collapsed on both axes
              expect($item[0].offsetWidth, 'item width').to.eq(0);
              expect($item[0].offsetHeight, 'item height').to.eq(0);
              expect(
                $item[0].getClientRects().length,
                'item has a layout box',
              ).to.eq(1);
            });
          cy.get('[data-cy=item]')
            .eq(1)
            .should((collapsed) => {
              // the collapse has to be booked, the following items must not keep
              // sitting behind a phantom row
              expect(
                extractTranslateYValue(collapsed.attr('style')),
              ).to.be.lessThan(positionWithContent);
            });
        });
    });
  });
});

describe('keepScrolledIndexOnPrepend', () => {
  it('keeps the scroll position stable when prepending', () => {
    // tombstoneSize matches the real item height, so the estimate the strategy
    // uses for the not-yet-measured items is exact
    const size = 50;
    mountAutoSize({
      dynamicSize: () => size,
      tombstoneSize: size,
      trackBy: 'id',
      keepScrolledIndexOnPrepend: true,
    }).then(({ fixture }) => {
      fixture.detectChanges();
      const viewport = getViewportComponent(fixture);
      const scrollTop = 9 * size + 21;
      viewport.scrollTo(scrollTop);
      cy.get('@scrolledIndex')
        .should('have.been.calledWith', 9)
        .then(() => {
          const prepended = generateItems(5, 10000);
          fixture.componentRef.setInput('items', [
            ...prepended,
            ...(fixture.componentInstance.items() as Item[]),
          ]);
          fixture.detectChanges();
          cy.wrap(null).should(() => {
            expect(viewport.getScrollTop()).to.eq(scrollTop + 5 * size);
          });
        });
    });
  });

  it('does not move the scroll position when disabled', () => {
    const size = 50;
    mountAutoSize({
      dynamicSize: () => size,
      tombstoneSize: size,
      trackBy: 'id',
      keepScrolledIndexOnPrepend: false,
    }).then(({ fixture }) => {
      fixture.detectChanges();
      const viewport = getViewportComponent(fixture);
      const scrollTop = 9 * size + 21;
      viewport.scrollTo(scrollTop);
      cy.get('@scrolledIndex')
        .should('have.been.calledWith', 9)
        .then(() => {
          fixture.componentRef.setInput('items', [
            ...generateItems(5, 10000),
            ...(fixture.componentInstance.items() as Item[]),
          ]);
          fixture.detectChanges();
          cy.wrap(null).should(() => {
            expect(viewport.getScrollTop()).to.eq(scrollTop);
          });
        });
    });
  });
  it('keeps the content in place when the batch lands below the loading row', () => {
    // a reverse infinite scroller parked at the very top: the loading row is
    // the top most item. The batch gets inserted below it, the loading row is
    // removed afterwards. The rows the user is looking at must not move,
    // otherwise the viewport stays at the top and loads forever.
    const size = 50;
    const loader = { ...generateItems(1, 99999)[0], id: 99999 };
    const items = generateItems(30);
    const batch = generateItems(4, 10000);
    mountAutoSize({
      dynamicSize: () => size,
      tombstoneSize: size,
      trackBy: 'id',
      keepScrolledIndexOnPrepend: true,
      showItemDescription: false,
      items: [loader, ...items],
    }).then(({ fixture }) => {
      fixture.detectChanges();
      const viewport = getViewportComponent(fixture);
      expectItemOffset(items[0].id, size);
      cy.then(() => {
        fixture.componentRef.setInput('items', [loader, ...batch, ...items]);
        fixture.detectChanges();
      });
      cy.wrap(null).should(() => {
        expect(viewport.getScrollTop()).to.eq(4 * size);
      });
      expectItemOffset(items[0].id, size);
      cy.then(() => {
        fixture.componentRef.setInput('items', [...batch, ...items]);
        fixture.detectChanges();
      });
      cy.wrap(null).should(() => {
        expect(viewport.getScrollTop()).to.eq(3 * size);
      });
      expectItemOffset(items[0].id, size);
    });
  });
  it('keeps the content stable when the anchor sits on the transient row', () => {
    // the user parks the viewport at the very top while the loading row is
    // visible - the anchor is the loading row itself. When the batch replaces
    // it, the nearest surviving row below has to stay in place, otherwise the
    // viewport pins to the top and (in an infinite scroller) loads forever.
    const size = 50;
    const loader = { ...generateItems(1, 99999)[0], id: 99999 };
    const items = generateItems(30);
    mountAutoSize({
      dynamicSize: () => size,
      tombstoneSize: size,
      trackBy: 'id',
      keepScrolledIndexOnPrepend: true,
      items: [loader, ...items],
    }).then(({ fixture }) => {
      fixture.detectChanges();
      const viewport = getViewportComponent(fixture);
      cy.get('@scrolledIndex')
        .should('have.been.calledWith', 0)
        .then(() => {
          const batch = generateItems(4, 10000);
          fixture.componentRef.setInput('items', [...batch, ...items]);
          fixture.detectChanges();
          cy.wrap(null).should(() => {
            // the first surviving row moved from y=size to y=4*size, so the
            // scroll position has to move down by 3*size to keep it in place
            expect(viewport.getScrollTop()).to.eq(3 * size);
          });
        });
    });
  });
  it('resolves the transient row when the batch lands while anchored on it at the top', () => {
    /*
     * Two-step emission like a real chat client: [loader, ...items] ->
     * [loader, ...batch, ...items] -> [...batch, ...items], with the user
     * parked at the very top (the anchor IS the loader). The compensation for
     * the vanished loader is negative and gets clamped by the browser - no
     * scroll event fires. `waitForScroll` must not latch rendering in that
     * case, otherwise the stale loading row stays on screen forever.
     */
    const size = 50;
    const loader = { ...generateItems(1, 99999)[0], id: 99999 };
    const items = generateItems(30);
    mountAutoSize({
      dynamicSize: () => size,
      tombstoneSize: size,
      trackBy: 'id',
      keepScrolledIndexOnPrepend: true,
      items: [loader, ...items],
    }).then(({ fixture }) => {
      fixture.detectChanges();
      cy.get('@scrolledIndex')
        .should('have.been.calledWith', 0)
        .then(() => {
          const batch = generateItems(4, 10000);
          fixture.componentRef.setInput('items', [loader, ...batch, ...items]);
          fixture.detectChanges();
          setTimeout(() => {
            fixture.componentRef.setInput('items', [...batch, ...items]);
            fixture.detectChanges();
          });
          cy.wrap(null).should(() => {
            const texts = fixture.debugElement
              .queryAll(By.css('[data-cy=item]'))
              .map((de) => (de.nativeElement as HTMLElement).innerText);
            // the loading row resolved - it must not be rendered anymore
            expect(
              texts.some((text) => text.includes('99999')),
              'loader still rendered',
            ).to.eq(false);
            // and the batch is actually on screen
            expect(
              texts.some((text) => text.includes('10000')),
              'batch rendered',
            ).to.eq(true);
          });
        });
    });
  });
  it('compensates a transient row that is replaced by the batch', () => {
    const size = 50;
    const loader = { ...generateItems(1, 99999)[0], id: 99999 };
    mountAutoSize({
      dynamicSize: () => size,
      tombstoneSize: size,
      trackBy: 'id',
      keepScrolledIndexOnPrepend: true,
    }).then(({ fixture }) => {
      fixture.detectChanges();
      const viewport = getViewportComponent(fixture);
      const scrollTop = 9 * size + 21;
      const original = fixture.componentInstance.items() as Item[];
      viewport.scrollTo(scrollTop);
      cy.get('@scrolledIndex')
        .should('have.been.calledWith', 9)
        .then(() => {
          fixture.componentRef.setInput('items', [loader, ...original]);
          fixture.detectChanges();
          cy.wrap(null)
            .should(() => {
              expect(viewport.getScrollTop()).to.eq(scrollTop + size);
            })
            .then(() => {
              const batch = generateItems(4, 10000);
              fixture.componentRef.setInput('items', [...batch, ...original]);
              fixture.detectChanges();
              cy.wrap(null).should(() => {
                expect(viewport.getScrollTop()).to.eq(scrollTop + 4 * size);
              });
            });
        });
    });
  });
});

describe('layout integrity on range shift', () => {
  /**
   * A prepend shifts the renderedRange by exactly the inserted amount while
   * the rendered slice stays identical. The differ reports no changes, but
   * every view maps to a new index and gets re-rendered - the position pass
   * has to keep the views contiguous. If the directive announces the pass
   * with a wrong batch (e.g. an empty set), the strategy's position cursor
   * runs ahead and stacks the views at the end of the content, which shows
   * up as a blank viewport with gaps between the views.
   */
  it('keeps rendered views contiguous over repeated transient-row batches', () => {
    // the reverse-infinite-scroll flow: every history request inserts a
    // loading row, the resolving batch replaces it. Variable item sizes make
    // the tombstone estimate wrong on every prepend, exercising the
    // compensation + re-measure + re-position interplay repeatedly.
    const loader = { ...generateItems(1, 99999)[0], id: 99999 };
    const variableSize = (item: Item) => 40 + (Number(item.id) % 5) * 30;
    mountAutoSize({
      dynamicSize: variableSize,
      tombstoneSize: 50,
      trackBy: 'id',
      keepScrolledIndexOnPrepend: true,
    }).then(({ fixture }) => {
      fixture.detectChanges();
      const viewport = getViewportComponent(fixture);
      const assertContiguous = (label: string) => {
        cy.wrap(null).should(() => {
          const views = fixture.debugElement
            .queryAll(By.css('[data-cy=item]'))
            .map((de) => de.nativeElement as HTMLElement)
            .map((e) => ({
              y: extractTranslateYValue(e.style.transform),
              h: e.offsetHeight,
            }))
            .sort((a, b) => a.y - b.y);
          expect(views.length, label).to.be.greaterThan(0);
          for (let i = 1; i < views.length; i++) {
            expect(views[i].y, `${label}: view ${i} is contiguous`).to.eq(
              views[i - 1].y + views[i - 1].h,
            );
          }
        });
      };
      const rounds = 3;
      const doRound = (round: number, current: Item[]) => {
        fixture.componentRef.setInput('items', [loader, ...current]);
        fixture.detectChanges();
        assertContiguous(`round ${round} loader`);
        cy.wrap(null).then(() => {
          const batch = generateItems(4, 10000 + round * 100);
          const next = [...batch, ...current];
          /*
           * the exact emission pattern of a client combining `messages$` with a
           * `loading` flag: the batch lands while the flag is still on - one
           * emission with loader AND batch - and the flag resets a tick later.
           * The second emission rebuilds the strategy's bookkeeping while the
           * first one is still rendering.
           */
          fixture.componentRef.setInput('items', [loader, ...next]);
          fixture.detectChanges();
          setTimeout(() => {
            fixture.componentRef.setInput('items', next);
            fixture.detectChanges();
          });
          assertContiguous(`round ${round} batch`);
          if (round + 1 < rounds) {
            doRound(round + 1, next);
          }
        });
      };
      viewport.scrollTo(500);
      cy.get('@scrolledIndex')
        .should('have.been.called')
        .then(() => {
          doRound(0, fixture.componentInstance.items() as Item[]);
        });
    });
  });

  it('keeps rendered views contiguous when a transient row shrinks the range while an initial scroll is pending', () => {
    /*
     * Mirrors a chat client's initial load: the batch arrives together with a
     * still-visible "loading older messages" row, `initialScrollIndex` kicks
     * in - but the content (tombstone estimate) is smaller than the container,
     * so the requested scroll cannot happen and `_scrollToIndex` stays
     * pending, suppressing range emissions. The loading row then resolves
     * (data shrinks below the rendered end, staged silently) and once the
     * views are measured the strategy scrolls to the bottom. That scroll
     * event finally emits a range that differs from the directive's last one
     * while the rendered slice is identical - the re-position pass has to
     * keep the views contiguous.
     */
    const loader = { ...generateItems(1, 99999)[0], id: 99999 };
    const batch = generateItems(4);
    const items$ = new Subject<Item[]>();
    mountAutoSize({
      trackBy: 'id',
      keepScrolledIndexOnPrepend: true,
      // measured size exceeds the container (4 * 100 > 300) while the
      // tombstone estimate does not (5 * 50 < 300)
      dynamicSize: () => 100,
      tombstoneSize: 50,
      items: items$,
    }).then(({ fixture }) => {
      fixture.detectChanges();
      const viewport = getViewportComponent(fixture);
      // batch + transient row arrive, initialScrollIndex fires while the
      // runway is still not scrollable
      items$.next([loader, ...batch]);
      viewport.scrollToIndex(3);
      // the transient row resolves while the views are still being rendered -
      // a task boundary apart, like a real backend response racing the render
      setTimeout(() => items$.next([...batch]));
      cy.get('[data-cy=item]')
        .should('have.length', 4)
        .then(() => {
          cy.wrap(null).should(() => {
            const views = fixture.debugElement
              .queryAll(By.css('[data-cy=item]'))
              .map((de) => de.nativeElement as HTMLElement)
              .map((e) => ({
                y: extractTranslateYValue(e.style.transform),
                h: e.offsetHeight,
              }))
              .sort((a, b) => a.y - b.y);
            expect(views.length).to.eq(4);
            expect(views[0].y, 'first view starts at 0').to.eq(0);
            for (let i = 1; i < views.length; i++) {
              expect(views[i].y, `view ${i} is contiguous`).to.eq(
                views[i - 1].y + views[i - 1].h,
              );
            }
            // the pending initial scroll must complete: 4 * 100 measured
            // content in a 300px container scrolls to the bottom at 100.
            // A wedged `_scrollToIndex` leaves it at 0.
            expect(viewport.getScrollTop(), 'initial scroll completed').to.eq(
              100,
            );
          });
        });
    });
  });
});
