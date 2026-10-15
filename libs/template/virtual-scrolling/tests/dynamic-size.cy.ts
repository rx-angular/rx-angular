import { Component, input, NgIterable, output, Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RxStrategyNames } from '@rx-angular/cdk/render-strategies';
import { createOutputSpy, mount } from 'cypress/angular';
import { Observable, Subject } from 'rxjs';
import {
  DynamicSizeVirtualScrollStrategy,
  ListRange,
  RxVirtualFor,
  RxVirtualScrollElementDirective,
  RxVirtualScrollViewportComponent,
  RxVirtualScrollWindowDirective,
} from '../src/index';
import {
  defaultMountConfig,
  generateItems,
  getDefaultMountConfig,
  getViewportComponent,
  Item,
  VirtualScrollMountConfig,
} from './fixtures';

interface DynamicVirtualScrollMountConfig extends VirtualScrollMountConfig<Item> {
  dynamicSize?: (item: Item) => number;
}

const testComponentImports = [
  RxVirtualScrollViewportComponent,
  RxVirtualFor,
  DynamicSizeVirtualScrollStrategy,
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
    [dynamic]="dynamicSize()"
    [keepScrolledIndexOnPrepend]="keepScrolledIndexOnPrepend()"
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
class DynamicSizeTestComponent {
  containerHeight = input.required<number>();
  runwayItems = input.required<number>();
  runwayItemsOpposite = input.required<number>();
  viewCache = input.required<number>();
  trackBy = input.required<keyof Item | ((idx: number, i: Item) => unknown)>();
  dynamicSize = input.required<(item: Item) => number>();
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
      [runwayItems]="runwayItems()"
      [runwayItemsOpposite]="runwayItemsOpposite()"
      [dynamic]="dynamicSize()"
      [keepScrolledIndexOnPrepend]="keepScrolledIndexOnPrepend()"
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
        {{ item.id }}
      </div>
    </rx-virtual-scroll-viewport>
    <div style="height: 25px;">Content After</div>
  </div>`,
  imports: testComponentImports,
})
class DynamicSizeCustomScrollElementTestComponent extends DynamicSizeTestComponent {}

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
      [dynamic]="dynamicSize()"
      [keepScrolledIndexOnPrepend]="keepScrolledIndexOnPrepend()"
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
        {{ item.id }}
      </div>
    </rx-virtual-scroll-viewport>
    <div style="height: 25px;">Content After</div>
  `,
  imports: testComponentImports,
})
class DynamicSizeWindowScrollTestComponent extends DynamicSizeTestComponent {}

const defaultDynamicSize = (item: Item) => (item.description ? 100 : 50);

function mountDynamicSize(
  config?: DynamicVirtualScrollMountConfig,
  type: Type<DynamicSizeTestComponent> = DynamicSizeTestComponent,
) {
  const {
    runwayItems,
    runwayItemsOpposite,
    viewCache,
    items,
    trackBy,
    strategy,
    containerHeight,
    showItemDescription,
    dynamicSize,
    keepScrolledIndexOnPrepend,
  } = {
    dynamicSize: defaultDynamicSize,
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
      showItemDescription,
      keepScrolledIndexOnPrepend,
      strategy,
      items,
      renderCallback: renderCallback$,
      viewRange: createOutputSpy<ListRange>('viewRange'),
      scrolledIndex: createOutputSpy<number>('scrolledIndex'),
    },
    imports: [
      RxVirtualScrollViewportComponent,
      RxVirtualFor,
      DynamicSizeVirtualScrollStrategy,
      RxVirtualScrollElementDirective,
      RxVirtualScrollWindowDirective,
    ],
  });
}

function totalItemHeight(items: Item[]) {
  return items.reduce((height, item) => height + defaultDynamicSize(item), 0);
}

function expectedRange(
  config: DynamicVirtualScrollMountConfig,
  items: Item[],
  scrolledIndex = 0,
  scrollDirection = 'up',
): ListRange {
  const { containerHeight, runwayItems, runwayItemsOpposite, dynamicSize } =
    config;
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
    mountDynamicSize().then(({ fixture, component }) => {
      fixture.detectChanges();
      const sentinel = fixture.debugElement.query(
        By.css('.rx-virtual-scroll__sentinel'),
      );
      const items = component.items() as Item[];
      expect((sentinel.nativeElement as HTMLElement).style.transform).eq(
        `translate(0px, ${totalItemHeight(items) - 1}px)`,
      );
    });
  });
  it('change runway height on item changes', () => {
    mountDynamicSize().then(({ fixture, component }) => {
      const items = [...(component.items() as Item[])];
      items.push(...generateItems(1));
      fixture.componentRef.setInput('items', [...items]);
      fixture.detectChanges();
      const sentinel = fixture.debugElement.query(
        By.css('.rx-virtual-scroll__sentinel'),
      );
      expect((sentinel.nativeElement as HTMLElement).style.transform).eq(
        `translate(0px, ${totalItemHeight(items) - 1}px)`,
      );
      items.splice(0, 1);
      fixture.componentRef.setInput('items', [...items]);
      fixture.detectChanges();
      expect((sentinel.nativeElement as HTMLElement).style.transform).eq(
        `translate(0px, ${totalItemHeight(items) - 1}px)`,
      );
    });
  });
});

describe('rendering, scrolling & positioning', () => {
  it('displays nothing', () => {
    mountDynamicSize().then(({ fixture }) => {
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
    mountDynamicSize().then(({ component }) => {
      const items = component.items() as Item[];
      const config = {
        containerHeight: component.containerHeight(),
        runwayItems: component.runwayItems(),
        runwayItemsOpposite: component.runwayItemsOpposite(),
        dynamicSize: component.dynamicSize(),
      };
      const range = expectedRange(config, items, 0);
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

  it('displays and positions items with different sizes', () => {
    const dynamicSize = (item: Item) => (item.description ? 70 : 20);
    const config: DynamicVirtualScrollMountConfig = {
      dynamicSize,
    };
    mountDynamicSize(config).then(({ component }) => {
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
    mountDynamicSize({ runwayItemsOpposite: 20 }).then(({ component }) => {
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

  it('reacts to scroll events & runwayItems configuration', () => {
    mountDynamicSize().then(({ fixture, component }) => {
      const items = component.items() as Item[];
      fixture.detectChanges();
      const viewportComponent = getViewportComponent(fixture);
      const scrolledIndex = 20;
      const scrollTo = totalItemHeight(
        items.filter((i) => i.id < scrolledIndex),
      );
      // scroll to somewhere
      viewportComponent.scrollTo(scrollTo);
      const rangeConfig = {
        containerHeight: component.containerHeight(),
        runwayItems: component.runwayItems(),
        runwayItemsOpposite: component.runwayItemsOpposite(),
        dynamicSize: component.dynamicSize(),
      };
      const range = expectedRange(rangeConfig, items, scrolledIndex, 'down');
      let runwayItems = component.runwayItems();
      let runwayItemsOpposite = component.runwayItemsOpposite();

      cy.get('@scrolledIndex').should('have.been.calledWith', scrolledIndex);
      cy.get('@viewRange')
        .should('have.been.calledWith', range)
        .then(() => {
          // react to runwayItems config changes
          runwayItems = runwayItems + 5;
          runwayItemsOpposite = runwayItemsOpposite + 5;
          fixture.componentRef.setInput('runwayItems', runwayItems);
          fixture.componentRef.setInput(
            'runwayItemsOpposite',
            runwayItemsOpposite,
          );
          fixture.detectChanges();
          const rangeConfig = {
            containerHeight: component.containerHeight(),
            runwayItems: component.runwayItems(),
            runwayItemsOpposite: component.runwayItemsOpposite(),
            dynamicSize: component.dynamicSize(),
          };
          const range = expectedRange(
            rangeConfig,
            items,
            scrolledIndex,
            'down',
          );
          cy.get('@viewRange').should('have.been.calledWith', range);
          cy.get('[data-cy=item]').should(
            'have.length',
            range.end - range.start,
          );
        });
    });
  });

  it('reacts to containerHeight changes', () => {
    // change containerHeight and see if viewRange changes
    mountDynamicSize().then(({ fixture, component }) => {
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
            containerHeight: component.containerHeight(),
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
    mountDynamicSize().then(({ fixture, component }) => {
      fixture.detectChanges();
      const viewportComponent = getViewportComponent(fixture);
      viewportComponent.scrollToIndex(340);
      const items = component.items() as Item[];
      const rangeConfig = {
        containerHeight: component.containerHeight(),
        runwayItems: component.runwayItems(),
        runwayItemsOpposite: component.runwayItemsOpposite(),
        dynamicSize: component.dynamicSize(),
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
      mountDynamicSize({ showItemDescription: false }).then(
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
      mountDynamicSize({ showItemDescription: false }).then(
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
      mountDynamicSize({ trackBy: {} as any }).then(() => {
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
    mountDynamicSize({}, DynamicSizeCustomScrollElementTestComponent).then(
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
    mountDynamicSize({}, DynamicSizeCustomScrollElementTestComponent).then(
      ({ component, fixture }) => {
        const items = component.items() as Item[];
        fixture.detectChanges();
        const viewportComponent = getViewportComponent(fixture);
        const scrolledIndex = 20;
        const scrollTo = totalItemHeight(
          items.filter((i) => i.id < scrolledIndex),
        );
        // scroll to somewhere
        viewportComponent.scrollTo(scrollTo + 50);
        const rangeConfig = {
          containerHeight: component.containerHeight(),
          runwayItems: component.runwayItems(),
          runwayItemsOpposite: component.runwayItemsOpposite(),
          dynamicSize: component.dynamicSize(),
        };
        const range = expectedRange(rangeConfig, items, scrolledIndex, 'down');

        cy.get('@scrolledIndex').should('have.been.calledWith', scrolledIndex);
        cy.get('@viewRange').should('have.been.calledWith', range);
      },
    );
  });
  it('scrolls to an index', () => {
    mountDynamicSize({}, DynamicSizeCustomScrollElementTestComponent).then(
      ({ fixture, component }) => {
        fixture.detectChanges();
        const viewportComponent = getViewportComponent(fixture);
        viewportComponent.scrollToIndex(340);
        const items = component.items() as Item[];
        const rangeConfig = {
          containerHeight: component.containerHeight(),
          runwayItems: component.runwayItems(),
          runwayItemsOpposite: component.runwayItemsOpposite(),
          dynamicSize: component.dynamicSize(),
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
    mountDynamicSize({}, DynamicSizeWindowScrollTestComponent).then(
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
    mountDynamicSize({}, DynamicSizeWindowScrollTestComponent).then(
      ({ fixture, component }) => {
        const items = component.items() as Item[];
        fixture.detectChanges();
        const viewportComponent = getViewportComponent(fixture);
        const scrolledIndex = 50;
        const scrollTo = totalItemHeight(
          items.filter((i) => i.id < scrolledIndex),
        );
        const rangeConfig = {
          containerHeight,
          runwayItems: component.runwayItems(),
          runwayItemsOpposite: component.runwayItemsOpposite(),
          dynamicSize: component.dynamicSize(),
        };
        const range = expectedRange(rangeConfig, items, scrolledIndex, 'down');
        // scroll to somewhere
        viewportComponent.scrollTo(scrollTo + 50);
        cy.get('@viewRange').should('have.been.calledWith', { ...range });
      },
    );
  });
  it('scrolls to an index', () => {
    let containerHeight = 0;
    cy.window().then((w) => (containerHeight = w.innerHeight));
    mountDynamicSize({}, DynamicSizeWindowScrollTestComponent).then(
      ({ fixture, component }) => {
        fixture.detectChanges();
        const viewportComponent = getViewportComponent(fixture);
        viewportComponent.scrollToIndex(340);
        const items = component.items() as Item[];

        const rangeConfig = {
          containerHeight,
          runwayItems: component.runwayItems(),
          runwayItemsOpposite: component.runwayItemsOpposite(),
          dynamicSize: component.dynamicSize(),
        };
        const range = expectedRange(rangeConfig, items, 340, 'down');
        cy.get('@scrolledIndex').should('have.been.calledWith', 340);
        cy.get('@viewRange').should('have.been.calledWith', range);
      },
    );
  });
});

describe('keepScrolledIndexOnPrepend', () => {
  // fixed 40px per item keeps the arithmetic in the test obvious - the
  // strategy still goes through its full size-function code path
  const sizeFn = () => 40;

  it('keeps the scroll position stable when prepending', () => {
    mountDynamicSize({
      dynamicSize: sizeFn,
      trackBy: 'id',
      keepScrolledIndexOnPrepend: true,
    }).then(({ fixture }) => {
      fixture.detectChanges();
      const viewport = getViewportComponent(fixture);
      // 8 items + 13px -> deliberately not on an item boundary
      const scrollTop = 8 * 40 + 13;
      viewport.scrollTo(scrollTop);
      cy.get('@scrolledIndex')
        .should('have.been.calledWith', 8)
        .then(() => {
          const prepended = generateItems(6, 10000);
          fixture.componentRef.setInput('items', [
            ...prepended,
            ...(fixture.componentInstance.items() as Item[]),
          ]);
          fixture.detectChanges();
          cy.wrap(null).should(() => {
            expect(viewport.getScrollTop()).to.eq(scrollTop + 6 * 40);
          });
        });
    });
  });

  it('compensates using the real inserted height, not the item count', () => {
    // inserted items are deliberately taller than the anchor, so a fix that
    // counted items instead of pixels would land in the wrong place
    const mixedSize = (item: Item) => (item.id >= 10000 ? 120 : 40);
    mountDynamicSize({
      dynamicSize: mixedSize,
      trackBy: 'id',
      keepScrolledIndexOnPrepend: true,
    }).then(({ fixture }) => {
      fixture.detectChanges();
      const viewport = getViewportComponent(fixture);
      const scrollTop = 8 * 40 + 13;
      viewport.scrollTo(scrollTop);
      cy.get('@scrolledIndex')
        .should('have.been.calledWith', 8)
        .then(() => {
          const prepended = generateItems(4, 10000);
          fixture.componentRef.setInput('items', [
            ...prepended,
            ...(fixture.componentInstance.items() as Item[]),
          ]);
          fixture.detectChanges();
          cy.wrap(null).should(() => {
            expect(viewport.getScrollTop()).to.eq(scrollTop + 4 * 120);
          });
        });
    });
  });

  it('does not move the scroll position when disabled', () => {
    mountDynamicSize({
      dynamicSize: sizeFn,
      trackBy: 'id',
      keepScrolledIndexOnPrepend: false,
    }).then(({ fixture }) => {
      fixture.detectChanges();
      const viewport = getViewportComponent(fixture);
      const scrollTop = 8 * 40 + 13;
      viewport.scrollTo(scrollTop);
      cy.get('@scrolledIndex')
        .should('have.been.calledWith', 8)
        .then(() => {
          fixture.componentRef.setInput('items', [
            ...generateItems(6, 10000),
            ...(fixture.componentInstance.items() as Item[]),
          ]);
          fixture.detectChanges();
          cy.wrap(null).should(() => {
            expect(viewport.getScrollTop()).to.eq(scrollTop);
          });
        });
    });
  });

  it('compensates repeated prepends without accumulating drift', () => {
    mountDynamicSize({
      dynamicSize: sizeFn,
      trackBy: 'id',
      keepScrolledIndexOnPrepend: true,
    }).then(({ fixture }) => {
      fixture.detectChanges();
      const viewport = getViewportComponent(fixture);
      const scrollTop = 15 * 40 + 7;
      viewport.scrollTo(scrollTop);
      cy.get('@scrolledIndex')
        .should('have.been.calledWith', 15)
        .then(() => {
          let expected = scrollTop;
          let nextId = 10000;
          [3, 5, 2].forEach((amount) => {
            const prepended = generateItems(amount, nextId);
            nextId += amount;
            expected += amount * 40;
            fixture.componentRef.setInput('items', [
              ...prepended,
              ...(fixture.componentInstance.items() as Item[]),
            ]);
            fixture.detectChanges();
            cy.wrap(null).should(() => {
              expect(viewport.getScrollTop()).to.eq(expected);
            });
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
    mountDynamicSize({
      dynamicSize: () => size,
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
  it('compensates a transient row that is replaced by the batch', () => {
    const sizeFn = () => 40;
    const loader = { ...generateItems(1, 99999)[0], id: 99999 };
    mountDynamicSize({
      dynamicSize: sizeFn,
      trackBy: 'id',
      keepScrolledIndexOnPrepend: true,
    }).then(({ fixture }) => {
      fixture.detectChanges();
      const viewport = getViewportComponent(fixture);
      const scrollTop = 8 * 40 + 13;
      const original = fixture.componentInstance.items() as Item[];
      viewport.scrollTo(scrollTop);
      cy.get('@scrolledIndex')
        .should('have.been.calledWith', 8)
        .then(() => {
          fixture.componentRef.setInput('items', [loader, ...original]);
          fixture.detectChanges();
          cy.wrap(null)
            .should(() => {
              expect(viewport.getScrollTop()).to.eq(scrollTop + 40);
            })
            .then(() => {
              const batch = generateItems(4, 10000);
              fixture.componentRef.setInput('items', [...batch, ...original]);
              fixture.detectChanges();
              cy.wrap(null).should(() => {
                expect(viewport.getScrollTop()).to.eq(scrollTop + 4 * 40);
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
    mountDynamicSize().then(({ component }) => {
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
  const extractTranslateYValue = (str: string): number | null => {
    const matches = str.match(/translateY\(([-0-9]+(\.[0-9]+)?)px?\)/);
    return matches && matches.length >= 2 ? parseFloat(matches[1]) : null;
  };
  /**
   * A prepend shifts the renderedRange by exactly the inserted amount while
   * the rendered slice stays identical. The differ reports no changes, but
   * every view maps to a new index and gets re-rendered - the position pass
   * has to keep the views contiguous. If the directive announces the pass
   * with a wrong batch (e.g. an empty set), the strategy's position cursor
   * runs ahead and stacks the views at the end of the content, which shows
   * up as a blank viewport with gaps between the views.
   */
  it('keeps rendered views contiguous when a transient row shrinks the range', () => {
    // mirrors a chat client's "loading older messages" row: the row resolves,
    // the data shrinks below the rendered end, which the strategy stages
    // without emitting a range. The next range emission then carries a range
    // that differs from the directive's bookkeeping while the rendered slice
    // is identical.
    const size = 50;
    const loader = { ...generateItems(1, 99999)[0], id: 99999 };
    const items = generateItems(4);
    mountDynamicSize({
      trackBy: 'id',
      keepScrolledIndexOnPrepend: true,
      dynamicSize: () => size,
      items: [loader, ...items],
    }).then(({ fixture }) => {
      fixture.detectChanges();
      cy.get('[data-cy=item]')
        .should('have.length', 5)
        .then(() => {
          fixture.componentRef.setInput('items', [...items]);
          fixture.detectChanges();
          cy.get('[data-cy=item]')
            .should('have.length', 4)
            .then(() => {
              // trigger a range recalculation - the emitted range differs from
              // the last one the directive saw, but the slice is unchanged
              fixture.componentRef.setInput('runwayItems', 3);
              fixture.detectChanges();
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
              });
            });
        });
    });
  });
});
