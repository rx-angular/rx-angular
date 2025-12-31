import { NgIf } from '@angular/common';
import { Component, Input, NgIterable, output, Type } from '@angular/core';
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

interface AutoSizeVirtualScrollMountConfig
  extends VirtualScrollMountConfig<Item> {
  dynamicSize?: (item: Item) => number;
  tombstoneSize?: number;
}

const testComponentImports = [
  RxVirtualScrollViewportComponent,
  RxVirtualFor,
  AutoSizeVirtualScrollStrategy,
  RxVirtualScrollWindowDirective,
  RxVirtualScrollElementDirective,
  NgIf,
];

@Component({
  template: `<rx-virtual-scroll-viewport
    (scrolledIndexChange)="scrolledIndex.emit($event)"
    (viewRange)="viewRange.emit($event)"
    data-cy="viewport"
    [style.height.px]="containerHeight"
    [runwayItems]="runwayItems"
    [runwayItemsOpposite]="runwayItemsOpposite"
    [tombstoneSize]="tombstoneSize"
    autosize
  >
    <div
      [style.height.px]="dynamicSize(item)"
      *rxVirtualFor="
        let item of items;
        renderCallback: renderCallback;
        templateCacheSize: viewCache;
        strategy: strategy;
        trackBy: trackBy
      "
      [attr.data-cy]="'item'"
    >
      <div>{{ item.id }}</div>
      <div *ngIf="showItemDescription && item.description">
        {{ item.description }}
      </div>
    </div>
  </rx-virtual-scroll-viewport>`,
  imports: testComponentImports,
})
class AutoSizeTestComponent {
  @Input() containerHeight: number;
  @Input() runwayItems: number;
  @Input() runwayItemsOpposite: number;
  @Input() viewCache: number;
  @Input() trackBy: keyof Item | ((idx: number, i: Item) => unknown);
  @Input() dynamicSize: any;
  @Input() tombstoneSize: number;
  @Input() strategy:
    | RxStrategyNames<string>
    | Observable<RxStrategyNames<string>>;
  @Input() items:
    | Observable<NgIterable<Item>>
    | NgIterable<Item>
    | null
    | undefined;
  @Input() renderCallback: Subject<any>;
  @Input() showItemDescription: boolean;
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
      [style.height.px]="containerHeight"
      [runwayItems]="runwayItems"
      [runwayItemsOpposite]="runwayItemsOpposite"
      [tombstoneSize]="tombstoneSize"
      autosize
    >
      <div
        [style.height.px]="dynamicSize(item)"
        *rxVirtualFor="
          let item of items;
          renderCallback: renderCallback;
          templateCacheSize: viewCache;
          strategy: strategy;
          trackBy: trackBy
        "
        [attr.data-cy]="'item'"
      >
        <div>{{ item.id }}</div>
        <div *ngIf="showItemDescription && item.description">
          {{ item.description }}
        </div>
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
      [runwayItems]="runwayItems"
      [runwayItemsOpposite]="runwayItemsOpposite"
      [tombstoneSize]="tombstoneSize"
      autosize
    >
      <div
        [style.height.px]="dynamicSize(item)"
        *rxVirtualFor="
          let item of items;
          renderCallback: renderCallback;
          templateCacheSize: viewCache;
          strategy: strategy;
          trackBy: trackBy
        "
        [attr.data-cy]="'item'"
      >
        <div>{{ item.id }}</div>
        <div *ngIf="showItemDescription && item.description">
          {{ item.description }}
        </div>
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
      const items = component.items as Item[];
      const initialRange = expectedRange(
        { ...component, dynamicSize: () => component.tombstoneSize },
        items,
      );
      const initialHeight = items.length * component.tombstoneSize;
      expect((sentinel.nativeElement as HTMLElement).style.transform).eq(
        `translate(0px, ${initialHeight - 1}px)`,
      );
      cy.get('@viewRange').should('have.been.calledWith', initialRange);
      cy.get('@renderCallback')
        .should('have.been.called')
        .then(() => {
          checkingKnownElements$.next();
          const knownEndRange = endIndex + 1;
          const range = expectedRange(component, items);
          const runwayHeight =
            totalItemHeight(items.slice(range.start, knownEndRange)) +
            (items.length - knownEndRange) * component.tombstoneSize;
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
      const items = component.items as Item[];
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
          const range = expectedRange(component, items);
          const runwayHeight =
            totalItemHeight(items.slice(range.start, knownElements)) +
            (items.length - knownElements) * component.tombstoneSize;
          items.push(...generateItems(1));
          fixture.detectChanges();
          expect((sentinel.nativeElement as HTMLElement).style.transform).eq(
            `translate(0px, ${runwayHeight + component.tombstoneSize - 1}px)`,
          );
          items.splice(100, 1);
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
      fixture.componentInstance.items = [];
      fixture.detectChanges();
      cy.get('[data-cy=item]').should('have.length', 0);
      fixture.componentInstance.items = null;
      fixture.detectChanges();
      cy.get('[data-cy=item]').should('have.length', 0);
      fixture.componentInstance.items = undefined;
      fixture.detectChanges();
      cy.get('[data-cy=item]').should('have.length', 0);
    });
  });
  it('displays and positions items', () => {
    mountAutoSize().then(({ component }) => {
      const items = component.items as Item[];
      const range = expectedRange(component, items, 0);
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
      const items = component.items as Item[];
      const range = expectedRange(component, items, 0);
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
    const config: AutoSizeVirtualScrollMountConfig = {
      dynamicSize: (item) => (item.description ? 70 : 20),
    };
    mountAutoSize(config).then(({ component }) => {
      const items = component.items as Item[];
      const range = expectedRange(component, items, 0);
      cy.get('[data-cy=item]').should('have.length', range.end);
      let position = 0;
      cy.get('[data-cy=item]').each((element, i) => {
        expect(element.css('position')).to.be.eq('absolute');
        expect(element.attr('style')).to.contain(`translateY(${position}px)`);
        position += config.dynamicSize(items[i]);
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
      const items = component.items as Item[];
      const range = expectedRange(component, items, 0);
      cy.get('[data-cy=item]').should('have.length', range.end);
      let position = 0;
      cy.get('[data-cy=item]').each((element, i) => {
        expect(element.css('position')).to.be.eq('absolute');
        expect(element.attr('style')).to.contain(`translateY(${position}px)`);
        position += component.dynamicSize(items[i]);
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
      const items = component.items as Item[];
      const range = expectedRange(component, items, 0);
      cy.get('[data-cy=item]').should('have.length', range.end);
      let position = 0;
      cy.get('[data-cy=item]')
        .each((element, i) => {
          expect(element.css('position')).to.be.eq('absolute');
          expect(element.attr('style')).to.contain(`translateY(${position}px)`);
          position += component.dynamicSize(items[i]);
        })
        .then(() => {
          let { runwayItems, runwayItemsOpposite } = component;
          // react to runwayItems config changes
          runwayItems = runwayItems + 5;
          runwayItemsOpposite = runwayItemsOpposite + 5;
          component.runwayItems = runwayItems;
          component.runwayItemsOpposite = runwayItemsOpposite;
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
            position += component.dynamicSize(items[i]);
          });
        });
    });
  });

  it('reacts to scroll events & runwayItems configuration', () => {
    mountAutoSize({ showItemDescription: false }).then(
      ({ fixture, component }) => {
        const items = component.items as Item[];
        fixture.detectChanges();
        const viewportComponent = getViewportComponent(fixture);
        const initialRange = expectedRange(component, items, 0, 'up');
        const renderedInitialItems = items.filter(
          (v, i) => i < initialRange.end,
        );
        cy.get('@renderCallback')
          .should('have.been.calledWith', renderedInitialItems)
          .then(() => {
            const scrollToSomeWhere =
              (items.length / 2) * component.tombstoneSize;
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
                  position += component.dynamicSize(item);
                });
              });
          });
      },
    );
  });

  it('reacts to containerHeight changes', () => {
    // change containerHeight and see if viewRange changes
    mountAutoSize().then(({ fixture, component }) => {
      const items = component.items as Item[];
      const range = expectedRange(component, items, 0);
      cy.get('[data-cy=item]')
        .should('have.length', range.end)
        .then(() => {
          component.containerHeight = 500;
          const range = expectedRange(component, items, 0);
          fixture.detectChanges();
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
      const items = component.items as Item[];
      const range = expectedRange(
        { ...component, dynamicSize: () => component.tombstoneSize },
        items,
        340,
        'down',
      );
      cy.get('@scrolledIndex').should('have.been.calledWith', 340);
      cy.get('@viewRange').should('have.been.calledWith', range);
    });
  });
});

describe('data mutations', () => {
  describe('without trackBy', () => {
    it('should add item', () => {
      mountAutoSize({ showItemDescription: false }).then(({ fixture }) => {
        const mountedComponent = fixture.componentInstance;
        const newItem = generateItems(1, 500)[0];
        (mountedComponent.items as Item[]).splice(0, 0, newItem);
        fixture.detectChanges();
        cy.get('[data-cy=item]')
          .first()
          .then((item) => {
            expect(item.text().trim()).to.be.eq(
              `${(mountedComponent.items as Item[]).length - 1}`,
            );
            expect(item.attr('style')).to.contain(`translateY(0px)`);
          });
      });
    });
    it('should remove item', () => {
      mountAutoSize({ showItemDescription: false }).then(({ fixture }) => {
        const mountedComponent = fixture.componentInstance;
        (mountedComponent.items as Item[]).splice(0, 1);
        fixture.detectChanges();
        cy.get('[data-cy=item]')
          .first()
          .then((item) => {
            expect(item.text().trim()).to.be.eq('1');
            expect(item.attr('style')).to.contain(`translateY(0px)`);
          });
      });
    });
    it('should render mutable sort', () => {
      mountAutoSize({ showItemDescription: false }).then(
        ({ fixture, component }) => {
          const items = component.items as Item[];
          cy.get('[data-cy=item]')
            .each((item, index) => {
              expect(item.text().trim()).to.be.eq(`${index}`);
            })
            .then(() => {
              items.sort((a, b) => b.id - a.id);
              fixture.detectChanges();
              const range = expectedRange(component, items, 0);
              cy.get('@viewRange').should('have.been.calledWith', range);
              cy.get('@renderCallback').should(
                'have.been.calledWith',
                items.filter((item, i) => i < range.end),
              );
              cy.get('[data-cy=item]').each((item, index) => {
                expect(item.text().trim()).to.be.eq(
                  `${items.length - 1 - index}`,
                );
              });
            });
        },
      );
    });
    it('should render mutable update', () => {
      mountAutoSize().then(({ fixture, component }) => {
        const items = fixture.componentInstance.items as Item[];
        cy.get('[data-cy=item]')
          .each((item, index) => {
            expect(item.text().replace(' ', '').trim()).to.be.eq(
              `${items[index].id}${items[index].description}`,
            );
          })
          .then(() => {
            items[0].description = 'abcdefg';
            fixture.detectChanges();
            cy.get('[data-cy=item]')
              .first()
              .then((item) => {
                expect(item.text().replace(' ', '').trim()).eq(
                  `${items[0].id}${items[0].description}`,
                );
              });
          });
      });
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
    });
  });
});

describe('custom scrollable', () => {
  it('displays and positions items', () => {
    mountAutoSize({}, AutoSizeCustomScrollElementTestComponent).then(
      ({ component }) => {
        const items = component.items as Item[];
        const range = expectedRange(
          { ...component, containerHeight: component.containerHeight - 50 },
          items,
          0,
        );
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
      const items = component.items as Item[];
      fixture.detectChanges();
      const viewportComponent = getViewportComponent(fixture);
      const initialRange = expectedRange(
        {
          ...component,
          containerHeight: component.containerHeight - 50,
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
            (items.length / 2) * component.tombstoneSize;
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
                position += component.dynamicSize(item);
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
        const items = component.items as Item[];
        const range = expectedRange(
          { ...component, dynamicSize: () => component.tombstoneSize },
          items,
          340,
          'down',
        );
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
        const items = component.items as Item[];
        const range = expectedRange(
          { ...component, containerHeight: containerHeight - 50 },
          items,
          0,
        );
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
      const items = component.items as Item[];
      fixture.detectChanges();
      const viewportComponent = getViewportComponent(fixture);
      const initialRange = expectedRange(
        { ...component, containerHeight: containerHeight - 50 },
        items,
        0,
        'up',
      );
      const renderedInitialItems = items.filter((v, i) => i < initialRange.end);
      cy.get('@renderCallback')
        .should('have.been.calledWith', renderedInitialItems)
        .then(() => {
          const scrollToSomeWhere =
            (items.length / 2) * component.tombstoneSize;
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
                position += component.dynamicSize(item);
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
        const items = component.items as Item[];
        const range = expectedRange(
          {
            ...component,
            containerHeight,
            dynamicSize: () => component.tombstoneSize,
          },
          items,
          340,
          'down',
        );
        cy.get('@scrolledIndex').should('have.been.calledWith', 340);
        cy.get('@viewRange').should('have.been.calledWith', range);
      },
    );
  });
});
