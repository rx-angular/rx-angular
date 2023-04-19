import { Subject } from 'rxjs';
import {
  RxVirtualFor,
  RxVirtualScrollViewportComponent,
  ListRange,
  DynamicSizeVirtualScrollStrategy,
  AutosizeVirtualScrollStrategy,
} from '../src/index';
import { createOutputSpy, mount } from 'cypress/angular';
import { By } from '@angular/platform-browser';
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

const defaultDynamicSize = (item: Item) =>
  item.description ? 130 : item.id % 2 === 0 ? 40 : item.id % 3 === 0 ? 85 : 50;

function mountAutoSize(
  config?: AutoSizeVirtualScrollMountConfig,
  itemTemplate = `<div>{{ item.id }}</div><div *ngIf="item.description">{{item.description}}</div>`
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
  return mount(
    `
    <rx-virtual-scroll-viewport
      (scrolledIndexChange)="scrolledIndex.emit($event)"
      (viewRange)="viewRange.emit($event)"
      data-cy="viewport"
      [style.height.px]="containerHeight"
      [runwayItems]="runwayItems"
      [runwayItemsOpposite]="runwayItemsOpposite"
      [tombstoneSize]="tombstoneSize"
      autosize>
      <div
        [style.height.px]="dynamicSize(item)"
        *rxVirtualFor="
          let item of items;
          renderCallback: renderCallback;
          viewCacheSize: viewCache;
          strategy: strategy;
          trackBy: trackBy;
        "
        [attr.data-cy]="'item'"
      >
        ${itemTemplate}
      </div>
    </rx-virtual-scroll-viewport>
  `,
    {
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
        renderCallback: renderCallback$,
        viewRange: createOutputSpy<ListRange>('viewRange'),
        scrolledIndex: createOutputSpy<number>('scrolledIndex'),
      },
      imports: [
        RxVirtualScrollViewportComponent,
        RxVirtualFor,
        AutosizeVirtualScrollStrategy,
      ],
    }
  );
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
  scrollDirection = 'up'
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
      (scrollDirection === 'up' ? runwayItems : runwayItemsOpposite)
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
    i + (scrollDirection === 'up' ? runwayItemsOpposite : runwayItems)
  );
  return { start, end };
}

describe('viewport', () => {
  it('has proper runway height', () => {
    mountAutoSize().then(({ fixture, component }) => {
      const runway = fixture.debugElement.query(
        By.css('.rx-virtual-scroll__run-way')
      );
      const items = component.items as Item[];
      const initialHeight = items.length * component.tombstoneSize;
      const initialRange = expectedRange(
        { ...component, dynamicSize: () => component.tombstoneSize },
        items
      );
      expect((runway.nativeElement as HTMLElement).style.transform).eq(
        `translate(0px, ${initialHeight}px)`
      );
      cy.get('@viewRange').should('have.been.calledWith', initialRange);
      cy.get('@renderCallback')
        .should('have.been.called')
        .then(() => {
          const range = expectedRange(component, items);
          const end = Math.max(initialRange.end, range.end);
          const runwayHeight =
            totalItemHeight(items.slice(range.start, end)) +
            (items.length - end) * component.tombstoneSize;
          cy.get('@viewRange')
            .should('have.been.calledWith', range)
            .then(() => {
              expect((runway.nativeElement as HTMLElement).style.transform).eq(
                `translate(0px, ${runwayHeight}px)`
              );
            });
        });
    });
  });
  it('change runway height on item changes', () => {
    mountAutoSize().then(({ fixture, component }) => {
      const runway = fixture.debugElement.query(
        By.css('.rx-virtual-scroll__run-way')
      );
      const items = component.items as Item[];
      const initialHeight = items.length * component.tombstoneSize;
      const initialRange = expectedRange(
        { ...component, dynamicSize: () => component.tombstoneSize },
        items
      );
      expect((runway.nativeElement as HTMLElement).style.transform).eq(
        `translate(0px, ${initialHeight}px)`
      );
      const range = expectedRange(component, items);
      const end = Math.max(initialRange.end, range.end);
      const runwayHeight =
        totalItemHeight(items.slice(range.start, end)) +
        (items.length - end) * component.tombstoneSize;

      cy.get('@viewRange').should('have.been.calledWith', range);
      cy.get('@renderCallback')
        .should('have.been.called')
        .then(() => {
          items.push(...generateItems(1));
          fixture.detectChanges();
          expect((runway.nativeElement as HTMLElement).style.transform).eq(
            `translate(0px, ${runwayHeight + component.tombstoneSize}px)`
          );
          items.splice(100, 1);
          fixture.detectChanges();
          expect((runway.nativeElement as HTMLElement).style.transform).eq(
            `translate(0px, ${runwayHeight}px)`
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
        items.filter((v, i) => i < range.end)
      );
    });
  });

  it('repositions items when size changes', () => {
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
        items.filter((v, i) => i < range.end)
      );

      cy.get('[data-cy=item]')
        .first()
        .then((element) => {
          element.css('height', `${defaultDynamicSize(items[0]) + 50}px`);
          position = 0;
          cy.wait(50);
          cy.get('[data-cy=item]').each((element, i) => {
            expect(element.attr('style')).to.contain(
              `translateY(${position}px)`
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
        items.filter((v, i) => i < range.end)
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
        items.filter((v, i) => i < range.end)
      );
    });
  });

  it('reacts to scroll events & runwayItems configuration', () => {
    mountAutoSize({}, `{{ item.id }}`).then(({ fixture, component }) => {
      const items = component.items as Item[];
      const viewportComponent = getViewportComponent(fixture);
      let { runwayItems, runwayItemsOpposite } = component;
      const initialRange = expectedRange(component, items, 0, 'up');
      const renderedInitialItems = items.filter((v, i) => i < initialRange.end);
      cy.get('@renderCallback')
        .should('have.been.calledWith', renderedInitialItems)
        .then(() => {
          const scrollToSomeWhere =
            (items.length / 2) * component.tombstoneSize;
          viewportComponent.scrollTo(scrollToSomeWhere);
          cy.wait(200);
          let start = 0;
          let end = 0;
          cy.get('@renderCallback')
            .should('have.been.called')
            .then(() => {
              let position = 0;
              cy.get('[data-cy=item]')
                .each((element) => {
                  const id = parseInt(element.text().trim());
                  if (!start) {
                    start = id;
                  }
                  if (id > end) {
                    end = id;
                  }
                  if (!position) {
                    position = extractTranslateYValue(element.attr('style'));
                  }
                  const item = items[id];
                  expect(element.attr('style')).contains(
                    `translateY(${position}px)`
                  );
                  position += component.dynamicSize(item);
                })
                .then(() => {
                  // react to runwayItems config changes
                  runwayItems = runwayItems + 5;
                  runwayItemsOpposite = runwayItemsOpposite + 5;
                  component.runwayItems = runwayItems;
                  component.runwayItemsOpposite = runwayItemsOpposite;
                  fixture.detectChanges();
                  const expectedRange = { start: start - 5, end: end + 6 };
                  cy.get('@viewRange').should(
                    'have.been.calledWith',
                    expectedRange
                  );
                  cy.get('[data-cy=item]').should(
                    'have.length',
                    expectedRange.end - expectedRange.start
                  );
                });
            });
        });
    });
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
            range.end - range.start
          );
          cy.get('@viewRange').should('have.been.calledWith', range);
        });
    });
  });

  it('scrolls to an index', () => {
    mountAutoSize().then(({ fixture, component }) => {
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
      mountAutoSize({}, `{{item.id}}`).then(({ fixture }) => {
        const mountedComponent = fixture.componentInstance;
        const newItem = generateItems(1, 500)[0];
        (mountedComponent.items as Item[]).splice(0, 0, newItem);
        fixture.detectChanges();
        cy.get('[data-cy=item]')
          .first()
          .then((item) => {
            expect(item.text().trim()).to.be.eq(
              `${(mountedComponent.items as Item[]).length - 1}`
            );
            expect(item.attr('style')).to.contain(`translateY(0px)`);
          });
      });
    });
    it('should remove item', () => {
      mountAutoSize({}, `{{item.id}}`).then(({ fixture }) => {
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
      mountAutoSize({}, `{{item.id}}`).then(({ fixture, component }) => {
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
              items.filter((item, i) => i < range.end)
            );
            cy.get('[data-cy=item]').each((item, index) => {
              expect(item.text().trim()).to.be.eq(
                `${items.length - 1 - index}`
              );
            });
          });
      });
    });
    it('should render mutable update', () => {
      mountAutoSize(defaultMountConfig, `{{ item.content }}`).then(
        ({ fixture, component }) => {
          const items = fixture.componentInstance.items as Item[];
          cy.get('[data-cy=item]')
            .each((item, index) => {
              expect(item.text().trim()).to.be.eq(`${items[index].content}`);
            })
            .then(() => {
              items[0].content = 'abcdefg';
              fixture.detectChanges();
              cy.get('[data-cy=item]')
                .first()
                .then((item) => {
                  expect(item.text().trim()).eq(`${items[0].content}`);
                });
            });
        }
      );
    });
  });
  describe('with trackBy', () => {
    it('should throw an error', () => {
      mountAutoSize({ trackBy: {} as any }).then(() => {
        cy.on('uncaught:exception', (e) => {
          expect(e.message).eq(
            'trackBy must be typeof function or keyof T, but received {}'
          );
        });
      });
    });
  });
});
