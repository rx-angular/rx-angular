import { NgIf } from '@angular/common';
import { Component, Input, NgIterable, output, Type } from '@angular/core';
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

interface DynamicVirtualScrollMountConfig
  extends VirtualScrollMountConfig<Item> {
  dynamicSize?: (item: Item) => number;
}

const testComponentImports = [
  RxVirtualScrollViewportComponent,
  RxVirtualFor,
  DynamicSizeVirtualScrollStrategy,
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
    [dynamic]="dynamicSize"
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
class DynamicSizeTestComponent {
  @Input() containerHeight: number;
  @Input() runwayItems: number;
  @Input() runwayItemsOpposite: number;
  @Input() viewCache: number;
  @Input() trackBy: keyof Item | ((idx: number, i: Item) => unknown);
  @Input() dynamicSize: (item: Item) => number;
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
      [runwayItems]="runwayItems"
      [runwayItemsOpposite]="runwayItemsOpposite"
      [dynamic]="dynamicSize"
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
      [runwayItems]="runwayItems"
      [runwayItemsOpposite]="runwayItemsOpposite"
      [dynamic]="dynamicSize"
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
    mountDynamicSize().then(({ fixture }) => {
      fixture.detectChanges();
      const sentinel = fixture.debugElement.query(
        By.css('.rx-virtual-scroll__sentinel'),
      );
      const items = fixture.componentInstance.items as Item[];
      expect((sentinel.nativeElement as HTMLElement).style.transform).eq(
        `translate(0px, ${totalItemHeight(items) - 1}px)`,
      );
    });
  });
  it('change runway height on item changes', () => {
    mountDynamicSize().then(({ fixture }) => {
      const items = fixture.componentInstance.items as Item[];
      items.push(...generateItems(1));
      fixture.detectChanges();
      const sentinel = fixture.debugElement.query(
        By.css('.rx-virtual-scroll__sentinel'),
      );
      expect((sentinel.nativeElement as HTMLElement).style.transform).eq(
        `translate(0px, ${totalItemHeight(items) - 1}px)`,
      );
      items.splice(0, 1);
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
    mountDynamicSize().then(({ component }) => {
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

  it('displays and positions items with different sizes', () => {
    const config: DynamicVirtualScrollMountConfig = {
      dynamicSize: (item) => (item.description ? 70 : 20),
    };
    mountDynamicSize(config).then(({ component }) => {
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
    mountDynamicSize({ runwayItemsOpposite: 20 }).then(({ component }) => {
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

  it('reacts to scroll events & runwayItems configuration', () => {
    mountDynamicSize().then(({ fixture, component }) => {
      const items = component.items as Item[];
      fixture.detectChanges();
      const viewportComponent = getViewportComponent(fixture);
      const scrolledIndex = 20;
      const scrollTo = totalItemHeight(
        items.filter((i) => i.id < scrolledIndex),
      );
      // scroll to somewhere
      viewportComponent.scrollTo(scrollTo);
      const range = expectedRange(component, items, scrolledIndex, 'down');
      let { runwayItems, runwayItemsOpposite } = component;

      cy.get('@scrolledIndex').should('have.been.calledWith', scrolledIndex);
      cy.get('@viewRange')
        .should('have.been.calledWith', range)
        .then(() => {
          // react to runwayItems config changes
          runwayItems = runwayItems + 5;
          runwayItemsOpposite = runwayItemsOpposite + 5;
          component.runwayItems = runwayItems;
          component.runwayItemsOpposite = runwayItemsOpposite;
          fixture.detectChanges();
          const range = expectedRange(component, items, scrolledIndex, 'down');
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
    mountDynamicSize().then(({ fixture, component }) => {
      fixture.detectChanges();
      const viewportComponent = getViewportComponent(fixture);
      viewportComponent.scrollToIndex(340);
      const items = component.items as Item[];
      const range = expectedRange(component, items, 340, 'down');
      cy.get('@scrolledIndex').should('have.been.calledWith', 340);
      cy.get('@viewRange').should('have.been.calledWith', range);
    });
  });
});

describe('data mutations', () => {
  describe('without trackBy', () => {
    it('should add item', () => {
      mountDynamicSize({ showItemDescription: false }).then(({ fixture }) => {
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
      mountDynamicSize({ showItemDescription: false }).then(({ fixture }) => {
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
      mountDynamicSize({ showItemDescription: false }).then(
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
      mountDynamicSize().then(({ fixture, component }) => {
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
    mountDynamicSize({}, DynamicSizeCustomScrollElementTestComponent).then(
      ({ component, fixture }) => {
        const items = component.items as Item[];
        fixture.detectChanges();
        const viewportComponent = getViewportComponent(fixture);
        const scrolledIndex = 20;
        const scrollTo = totalItemHeight(
          items.filter((i) => i.id < scrolledIndex),
        );
        // scroll to somewhere
        viewportComponent.scrollTo(scrollTo + 50);
        const range = expectedRange(component, items, scrolledIndex, 'down');

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
        const items = component.items as Item[];
        const range = expectedRange(component, items, 340, 'down');
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
    mountDynamicSize({}, DynamicSizeWindowScrollTestComponent).then(
      ({ fixture, component }) => {
        const items = component.items as Item[];
        fixture.detectChanges();
        const viewportComponent = getViewportComponent(fixture);
        const scrolledIndex = 50;
        const scrollTo = totalItemHeight(
          items.filter((i) => i.id < scrolledIndex),
        );
        const range = expectedRange(
          { ...component, containerHeight },
          items,
          scrolledIndex,
          'down',
        );
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
        const items = component.items as Item[];

        const range = expectedRange(
          { ...component, containerHeight },
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
