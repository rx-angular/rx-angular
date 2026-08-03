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
  generateItems,
  getDefaultMountConfig,
  getViewportComponent,
  Item,
  VirtualScrollMountConfig,
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
    data-cy="viewport"
    [style.height.px]="containerHeight()"
    [runwayItems]="runwayItems()"
    [runwayItemsOpposite]="runwayItemsOpposite()"
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
  viewRange = output<ListRange>();
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
      data-cy="viewport"
      [style.height.px]="containerHeight()"
      [runwayItems]="runwayItems()"
      [runwayItemsOpposite]="runwayItemsOpposite()"
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
  template: `
    <div style="height: 50px;">Content Before</div>
    <rx-virtual-scroll-viewport
      scrollWindow
      (scrolledIndexChange)="scrolledIndex.emit($event)"
      (viewRange)="viewRange.emit($event)"
      data-cy="viewport"
      [runwayItems]="runwayItems()"
      [runwayItemsOpposite]="runwayItemsOpposite()"
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
      viewRange: createOutputSpy<ListRange>('viewRange'),
      scrolledIndex: createOutputSpy<number>('scrolledIndex'),
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
              expect(
                (sentinel.nativeElement as HTMLElement).style.transform,
              ).eq(`translate(0px, ${runwayHeight - 1}px)`);
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
      let position = 0;
      cy.get('[data-cy=item]')
        .first()
        .then((element) => {
          element.css('height', `${defaultDynamicSize(items[0]) + 50}px`);
          // position = 0;
          cy.wait(50);
          cy.get('[data-cy=item]').each((element, i) => {
            expect(element.attr('style')).to.contain(
              `translateY(${position}px)`,
            );
            position += defaultDynamicSize(items[i]) + (i === 0 ? 50 : 0);
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
      mountAutoSize({ trackBy: {} as any }).then(() => {
        cy.on('uncaught:exception', (e) => {
          expect(e.message).eq(
            'trackBy must be typeof function or keyof T, but received {}',
          );
        });
      });
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

describe('without ResizeObserver frames', () => {
  // Hidden or fully occluded tabs don't produce rendering frames, so a
  // ResizeObserver never delivers its first entry. The viewport measures the
  // container synchronously on init, the initial range renders regardless.
  class NoopResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  let originalResizeObserver: typeof ResizeObserver;
  beforeEach(() => {
    originalResizeObserver = window.ResizeObserver;
    window.ResizeObserver =
      NoopResizeObserver as unknown as typeof ResizeObserver;
  });
  afterEach(() => {
    window.ResizeObserver = originalResizeObserver;
  });
  it('renders the initial range although the observer never fires', () => {
    mountAutoSize().then(({ component }) => {
      const items = component.items() as Item[];
      const range = expectedRange(
        {
          containerHeight: component.containerHeight(),
          runwayItems: component.runwayItems(),
          runwayItemsOpposite: component.runwayItemsOpposite(),
          dynamicSize: component.dynamicSize(),
        },
        items,
        0,
      );
      cy.get('[data-cy=item]').should('have.length', range.end - range.start);
      cy.get('@scrolledIndex').should('have.been.calledWith', 0);
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
