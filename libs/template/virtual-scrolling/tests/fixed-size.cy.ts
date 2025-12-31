import { Component, input, NgIterable, output, Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RxStrategyNames } from '@rx-angular/cdk/render-strategies';
import { createOutputSpy, mount } from 'cypress/angular';
import { Observable, Subject } from 'rxjs';
import {
  FixedSizeVirtualScrollStrategy,
  ListRange,
  RxVirtualFor,
  RxVirtualScrollElementDirective,
  RxVirtualScrollViewportComponent,
  RxVirtualScrollWindowDirective,
} from '../src/index';
import {
  defaultItemLength,
  defaultMountConfig,
  generateItems,
  getDefaultMountConfig,
  getViewportComponent,
  Item,
  VirtualScrollMountConfig,
} from './fixtures';

const testComponentImports = [
  RxVirtualScrollViewportComponent,
  RxVirtualFor,
  FixedSizeVirtualScrollStrategy,
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
    [itemSize]="itemSize()"
  >
    <div
      [style.height.px]="itemSize()"
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
class FixedSizeTestComponent {
  containerHeight = input.required<number>();
  runwayItems = input.required<number>();
  runwayItemsOpposite = input.required<number>();
  viewCache = input.required<number>();
  trackBy = input.required<keyof Item | ((idx: number, i: Item) => unknown)>();
  itemSize = input.required<number>();
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
      [itemSize]="itemSize()"
    >
      <div
        [style.height.px]="itemSize()"
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
class FixedSizeCustomScrollElementTestComponent extends FixedSizeTestComponent {}

@Component({
  template: `
    <div style="height: 50px;">Content Before</div>
    <rx-virtual-scroll-viewport
      scrollWindow
      (scrolledIndexChange)="scrolledIndex.emit($event)"
      (viewRange)="viewRange.emit($event)"
      data-cy="viewport"
      [style.height.px]="containerHeight()"
      [runwayItems]="runwayItems()"
      [runwayItemsOpposite]="runwayItemsOpposite()"
      [itemSize]="itemSize()"
    >
      <div
        [style.height.px]="itemSize()"
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
class FixedSizeWindowScrollTestComponent extends FixedSizeTestComponent {}

function mountFixedSize(
  config?: VirtualScrollMountConfig<Item>,
  type: Type<FixedSizeTestComponent> = FixedSizeTestComponent,
) {
  const {
    runwayItems,
    runwayItemsOpposite,
    viewCache,
    items,
    trackBy,
    itemSize,
    strategy,
    containerHeight,
    showItemDescription,
  } = {
    ...getDefaultMountConfig(),
    showItemDescription: false,
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
      itemSize,
      strategy,
      items,
      showItemDescription,
      renderCallback: renderCallback$,
      viewRange: createOutputSpy<ListRange>('viewRange'),
      scrolledIndex: createOutputSpy<number>('scrolledIndex'),
    },
  });
}

describe('viewport', () => {
  it('has proper runway height', () => {
    const { itemSize } = defaultMountConfig;
    mountFixedSize().then(({ fixture }) => {
      fixture.detectChanges();
      const sentinel = fixture.debugElement.query(
        By.css('.rx-virtual-scroll__sentinel'),
      );
      cy.get('@renderCallback').should('have.been.called');
      expect((sentinel.nativeElement as HTMLElement).style.transform).eq(
        `translate(0px, ${defaultItemLength * itemSize - 1}px)`,
      );
    });
  });
  it('change runway height on item changes', () => {
    const { itemSize } = defaultMountConfig;
    mountFixedSize().then(({ fixture }) => {
      const component = fixture.componentInstance;
      const items = component.items() as Item[];
      items.push(...generateItems(1));
      fixture.componentRef.setInput('items', [...items]);
      fixture.detectChanges();
      const sentinel = fixture.debugElement.query(
        By.css('.rx-virtual-scroll__sentinel'),
      );
      expect((sentinel.nativeElement as HTMLElement).style.transform).eq(
        `translate(0px, ${items.length * itemSize - 1}px)`,
      );
      items.splice(0, 1);
      fixture.componentRef.setInput('items', [...items]);
      fixture.detectChanges();
      expect((sentinel.nativeElement as HTMLElement).style.transform).eq(
        `translate(0px, ${items.length * itemSize - 1}px)`,
      );
    });
  });
});

describe('rendering, scrolling & positioning', () => {
  it('displays nothing', () => {
    mountFixedSize().then(({ fixture }) => {
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
    mountFixedSize().then(({ component }) => {
      const { itemSize, runwayItemsOpposite, containerHeight } =
        defaultMountConfig;
      const items = component.items() as Item[];
      const expectedEnd = containerHeight / itemSize + runwayItemsOpposite;
      cy.get('[data-cy=item]').should('have.length', expectedEnd);
      let position = 0;
      cy.get('[data-cy=item]').each((element) => {
        expect(element.css('position')).to.be.eq('absolute');
        expect(element.attr('style')).to.contain(`translateY(${position}px)`);
        position += 50;
      });
      cy.get('@scrolledIndex').should('have.been.calledWith', 0);
      cy.get('@viewRange').should('have.been.calledWith', {
        start: 0,
        end: expectedEnd,
      });
      cy.get('@renderCallback').should(
        'have.been.calledWith',
        items.filter((v, i) => i < expectedEnd),
      );
    });
  });

  it('displays and positions items with different sizes', () => {
    const config: VirtualScrollMountConfig<Item> = {
      itemSize: 20,
    };
    mountFixedSize(config).then(({ component }) => {
      const { itemSize } = config;
      const { runwayItemsOpposite, containerHeight } = defaultMountConfig;
      const items = component.items() as Item[];
      const expectedEnd = containerHeight / itemSize + runwayItemsOpposite;
      cy.get('[data-cy=item]').should('have.length', expectedEnd);
      let position = 0;
      cy.get('[data-cy=item]').each((element) => {
        expect(element.css('position')).to.be.eq('absolute');
        expect(element.attr('style')).to.contain(`translateY(${position}px)`);
        position += itemSize;
      });
      cy.get('@scrolledIndex').should('have.been.calledWith', 0);
      cy.get('@viewRange').should('have.been.calledWith', {
        start: 0,
        end: expectedEnd,
      });
      cy.get('@renderCallback').should(
        'have.been.calledWith',
        items.filter((v, i) => i < expectedEnd),
      );
    });
  });

  it('displays more items when runwayItemsOpposite are configured', () => {
    const config: VirtualScrollMountConfig<Item> = {
      itemSize: 20,
      runwayItemsOpposite: 20,
    };
    mountFixedSize(config).then(({ component }) => {
      const items = component.items() as Item[];
      const { itemSize, runwayItemsOpposite } = config;
      const { containerHeight } = defaultMountConfig;
      const expectedEnd = containerHeight / itemSize + runwayItemsOpposite;
      cy.get('[data-cy=item]').should('have.length', expectedEnd);
      let position = 0;
      cy.get('[data-cy=item]').each((element) => {
        expect(element.css('position')).to.be.eq('absolute');
        expect(element.attr('style')).to.contain(`translateY(${position}px)`);
        position += itemSize;
      });
      cy.get('@scrolledIndex').should('have.been.calledWith', 0);
      cy.get('@viewRange').should('have.been.calledWith', {
        start: 0,
        end: expectedEnd,
      });
      cy.get('@renderCallback').should(
        'have.been.calledWith',
        items.filter((v, i) => i < expectedEnd),
      );
    });
  });

  it('reacts to scroll events & runwayItems configuration', () => {
    const config: VirtualScrollMountConfig<Item> = {
      itemSize: 20,
    };
    mountFixedSize(config).then(({ fixture }) => {
      const { itemSize } = config;
      let { runwayItemsOpposite, runwayItems } = defaultMountConfig;
      const { containerHeight } = defaultMountConfig;
      const itemsOnViewport = containerHeight / itemSize;
      fixture.detectChanges();
      const viewportComponent = getViewportComponent(fixture);

      // scroll to somewhere
      viewportComponent.scrollTo(260);
      const scrolledIndex = Math.floor(260 / 20);
      let start = scrolledIndex - runwayItemsOpposite;
      let end = start + runwayItemsOpposite + itemsOnViewport + runwayItems;

      cy.get('@scrolledIndex').should('have.been.calledWith', scrolledIndex);
      cy.get('@viewRange')
        .should('have.been.calledWith', {
          start,
          end,
        })
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
          start = scrolledIndex - runwayItemsOpposite;
          end = start + runwayItemsOpposite + itemsOnViewport + runwayItems;
          cy.get('@viewRange').should('have.been.calledWith', {
            start,
            end,
          });
          cy.get('[data-cy=item]').should('have.length', end - start);
        });
    });
  });

  it('reacts to containerHeight changes', () => {
    // change containerHeight and see if viewRange changes
    mountFixedSize().then(({ fixture }) => {
      const {
        itemSize,
        containerHeight: defaultContainerHeight,
        runwayItemsOpposite,
      } = defaultMountConfig;
      cy.get('[data-cy=item]')
        .should(
          'have.length',
          defaultContainerHeight / itemSize + runwayItemsOpposite,
        )
        .then(() => {
          fixture.componentRef.setInput('containerHeight', 500);
          fixture.detectChanges();
          cy.get('[data-cy=item]').should(
            'have.length',
            500 / itemSize + runwayItemsOpposite,
          );
          cy.get('@viewRange').should('have.been.calledWith', {
            start: 0,
            end: 500 / itemSize + runwayItemsOpposite,
          });
        });
    });
  });

  it('scrolls to an index', () => {
    mountFixedSize().then(({ fixture }) => {
      const { runwayItems, runwayItemsOpposite, itemSize, containerHeight } =
        defaultMountConfig;
      fixture.detectChanges();
      const viewportComponent = getViewportComponent(fixture);
      viewportComponent.scrollToIndex(340);
      cy.get('@scrolledIndex').should('have.been.calledWith', 340);
      cy.get('@viewRange').should('have.been.calledWith', {
        start: 340 - runwayItemsOpposite,
        end: 340 + containerHeight / itemSize + runwayItems,
      });
    });
  });
});

describe('data mutations', () => {
  describe('without trackBy', () => {
    it('should add item', () => {
      mountFixedSize().then(({ fixture, component }) => {
        const items = [...(component.items() as Item[])];
        const newItem = generateItems(1, 500)[0];
        items.splice(0, 0, newItem);
        fixture.componentRef.setInput('items', items);
        fixture.detectChanges();
        cy.get('[data-cy=item]')
          .first()
          .then((item) => {
            expect(item.text().trim()).to.be.eq(
              `${(component.items() as Item[]).length - 1}`,
            );
            expect(item.attr('style')).to.contain(`translateY(0px)`);
          });
      });
    });
    it('should remove item', () => {
      mountFixedSize().then(({ fixture, component }) => {
        const items = [...(component.items() as Item[])];
        items.splice(0, 1);
        fixture.componentRef.setInput('items', items);
        fixture.detectChanges();
        cy.get('[data-cy=item]')
          .first()
          .then((item) => {
            expect(item.text().trim()).to.be.eq('1');
            expect(item.attr('style')).to.contain(`translateY(0px)`);
          });
      });
    });
  });
  describe('with trackBy', () => {
    it('should throw an error', () => {
      mountFixedSize({ trackBy: {} as any }).then(() => {
        cy.on('uncaught:exception', (e) => {
          expect(e.message).eq(
            'trackBy must be typeof function or keyof T, but received {}',
          );
        });
      });
    });
    it('should keep nodes on add', () => {
      mountFixedSize({ trackBy: (i, item) => item.id }).then(
        ({ fixture, component }) => {
          const items = [...(component.items() as Item[])];
          cy.get('[data-cy=item]').then((divs) => {
            const firstDiv = divs[0];
            const secondDiv = divs[1];
            const newItem = generateItems(1, 500)[0];
            items.splice(0, 0, newItem);
            fixture.componentRef.setInput('items', [...items]);
            fixture.detectChanges();
            const { itemSize, runwayItemsOpposite, containerHeight } =
              defaultMountConfig;
            const expectedEnd =
              containerHeight / itemSize + runwayItemsOpposite;
            cy.get('@renderCallback').should(
              'have.been.calledWith',
              items.filter((item, i) => i < expectedEnd),
            );
            cy.get('[data-cy=item]').then((updatedDivs) => {
              expect(updatedDivs[1]).eq(firstDiv);
              expect(updatedDivs[2]).eq(secondDiv);
            });
          });
        },
      );
    });
    it('should move dom nodes', () => {
      mountFixedSize({ trackBy: 'id' }).then(({ fixture, component }) => {
        const items = [...(component.items() as Item[])];
        cy.get('[data-cy=item]').then((divs) => {
          const firstDiv = divs[0];
          const secondDiv = divs[1];
          const first = items[0];
          items[0] = items[1];
          items[1] = first;
          fixture.componentRef.setInput('items', [...items]);
          fixture.detectChanges();
          const { itemSize, runwayItemsOpposite, containerHeight } =
            defaultMountConfig;
          const expectedEnd = containerHeight / itemSize + runwayItemsOpposite;
          cy.get('@renderCallback').should(
            'have.been.calledWith',
            items.filter((i, iIdx) => iIdx < expectedEnd),
          );
          cy.get('[data-cy=item]').then((updatedDivs) => {
            expect(updatedDivs[0]).eq(secondDiv);
            expect(updatedDivs[1]).eq(firstDiv);
          });
        });
      });
    });
  });
});

describe('custom scrollable', () => {
  it('displays and positions items', () => {
    mountFixedSize({}, FixedSizeCustomScrollElementTestComponent).then(
      ({ component }) => {
        const { itemSize, runwayItemsOpposite, containerHeight } =
          defaultMountConfig;
        const items = component.items() as Item[];
        const expectedEnd = Math.round(
          (containerHeight - 50) / itemSize + runwayItemsOpposite,
        );
        cy.get('[data-cy=item]').should('have.length', expectedEnd);
        let position = 0;
        cy.get('[data-cy=item]').each((element) => {
          expect(element.css('position')).to.be.eq('absolute');
          expect(element.attr('style')).to.contain(`translateY(${position}px)`);
          position += 50;
        });
        cy.get('@scrolledIndex').should('have.been.calledWith', 0);
        cy.get('@viewRange').should('have.been.calledWith', {
          start: 0,
          end: expectedEnd,
        });
        cy.get('@renderCallback').should(
          'have.been.calledWith',
          items.filter((v, i) => i < expectedEnd),
        );
      },
    );
  });
  it('reacts to scroll events', () => {
    mountFixedSize({}, FixedSizeCustomScrollElementTestComponent).then(
      ({ fixture }) => {
        let { runwayItemsOpposite, runwayItems } = defaultMountConfig;
        const { containerHeight, itemSize } = defaultMountConfig;
        const itemsOnViewport = containerHeight / itemSize;
        fixture.detectChanges();
        const viewportComponent = getViewportComponent(fixture);

        // scroll to somewhere
        viewportComponent.scrollTo(500);
        const scrolledIndex = Math.floor((500 - 50) / itemSize);
        let start = scrolledIndex - runwayItemsOpposite;
        let end = start + runwayItemsOpposite + itemsOnViewport + runwayItems;

        cy.get('@scrolledIndex').should('have.been.calledWith', scrolledIndex);
        cy.get('@viewRange')
          .should('have.been.calledWith', {
            start,
            end,
          })
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
            start = scrolledIndex - runwayItemsOpposite;
            end = start + runwayItemsOpposite + itemsOnViewport + runwayItems;
            cy.get('@viewRange').should('have.been.calledWith', {
              start,
              end,
            });
            cy.get('[data-cy=item]').should('have.length', end - start);
          });
      },
    );
  });
  it('scrolls to an index', () => {
    mountFixedSize({}, FixedSizeCustomScrollElementTestComponent).then(
      ({ fixture }) => {
        const { runwayItems, runwayItemsOpposite, itemSize, containerHeight } =
          defaultMountConfig;
        fixture.detectChanges();
        const viewportComponent = getViewportComponent(fixture);
        viewportComponent.scrollToIndex(340);
        cy.get('@scrolledIndex').should('have.been.calledWith', 340);
        cy.get('@viewRange').should('have.been.calledWith', {
          start: 340 - runwayItemsOpposite,
          end: 340 + containerHeight / itemSize + runwayItems,
        });
      },
    );
  });
});

describe('window scrolling', () => {
  it('displays and positions items', () => {
    let containerHeight = 0;
    cy.window().then((w) => (containerHeight = w.innerHeight));
    mountFixedSize({}, FixedSizeWindowScrollTestComponent).then(
      ({ component }) => {
        const { itemSize, runwayItemsOpposite } = defaultMountConfig;
        const items = component.items() as Item[];
        const expectedEnd = Math.round(
          (containerHeight - 50) / itemSize + runwayItemsOpposite,
        );
        cy.get('[data-cy=item]').should('have.length', expectedEnd);
        let position = 0;
        cy.get('[data-cy=item]').each((element) => {
          expect(element.css('position')).to.be.eq('absolute');
          expect(element.attr('style')).to.contain(`translateY(${position}px)`);
          position += 50;
        });
        cy.get('@scrolledIndex').should('have.been.calledWith', 0);
        cy.get('@viewRange').should('have.been.calledWith', {
          start: 0,
          end: expectedEnd,
        });
        cy.get('@renderCallback').should(
          'have.been.calledWith',
          items.filter((v, i) => i < expectedEnd),
        );
      },
    );
  });
  it('reacts to scroll events', () => {
    let containerHeight = 0;
    cy.window().then((w) => (containerHeight = w.innerHeight));
    mountFixedSize({}, FixedSizeWindowScrollTestComponent).then(
      ({ fixture }) => {
        let { runwayItemsOpposite, runwayItems } = defaultMountConfig;
        const { itemSize } = defaultMountConfig;
        const itemsOnViewport = containerHeight / itemSize;
        fixture.detectChanges();
        const viewportComponent = getViewportComponent(fixture);

        // scroll to somewhere
        viewportComponent.scrollTo(500);
        const scrolledIndex = Math.floor((500 - 50) / itemSize);
        let start = scrolledIndex - runwayItemsOpposite;
        let end = start + runwayItemsOpposite + itemsOnViewport + runwayItems;

        cy.get('@scrolledIndex').should('have.been.calledWith', scrolledIndex);
        cy.get('@viewRange')
          .should('have.been.calledWith', {
            start,
            end,
          })
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
            start = scrolledIndex - runwayItemsOpposite;
            end = start + runwayItemsOpposite + itemsOnViewport + runwayItems;
            cy.get('@viewRange').should('have.been.calledWith', {
              start,
              end,
            });
            cy.get('[data-cy=item]').should('have.length', end - start);
          });
      },
    );
  });
  it('scrolls to an index', () => {
    let containerHeight = 0;
    cy.window().then((w) => (containerHeight = w.innerHeight));
    mountFixedSize({}, FixedSizeWindowScrollTestComponent).then(
      ({ fixture }) => {
        const { runwayItems, runwayItemsOpposite, itemSize } =
          defaultMountConfig;
        fixture.detectChanges();
        const viewportComponent = getViewportComponent(fixture);
        viewportComponent.scrollToIndex(340);
        cy.get('@scrolledIndex').should('have.been.calledWith', 340);
        cy.get('@viewRange').should('have.been.calledWith', {
          start: 340 - runwayItemsOpposite,
          end: 340 + containerHeight / itemSize + runwayItems,
        });
      },
    );
  });
});
