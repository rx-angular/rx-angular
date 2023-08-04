import { Subject } from 'rxjs';
import {
  FixedSizeVirtualScrollStrategy,
  RxVirtualFor,
  RxVirtualScrollViewportComponent,
  ListRange,
  RxVirtualScrollElement,
  RxVirtualScrollWindowDirective,
  RxVirtualScrollElementDirective,
} from '../src/index';
import { createOutputSpy, mount } from 'cypress/angular';
import { By } from '@angular/platform-browser';
import {
  defaultItemLength,
  defaultMountConfig,
  generateItems,
  getDefaultMountConfig,
  getViewportComponent,
  Item,
  VirtualScrollMountConfig,
} from './fixtures';

const defaultItemTemplate = `{{ item.id }}`;

function mountFixedSize(
  config?: VirtualScrollMountConfig<Item>,
  itemTemplate = defaultItemTemplate
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
  } = {
    ...getDefaultMountConfig(),
    ...(config ?? {}),
  };
  const renderCallback$ = new Subject<Item[]>();
  const renderCallbackSpy = createOutputSpy<Item[]>('renderCallback');
  renderCallback$.subscribe((rendered) => renderCallbackSpy.emit(rendered));
  return mount(
    config?.template ??
      `
    <rx-virtual-scroll-viewport
      (scrolledIndexChange)="scrolledIndex.emit($event)"
      (viewRange)="viewRange.emit($event)"
      data-cy="viewport"
      [style.height.px]="containerHeight"
      [runwayItems]="runwayItems"
      [runwayItemsOpposite]="runwayItemsOpposite"
      [itemSize]="itemSize">
      <div
        [style.height.px]="itemSize"
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
        itemSize,
        strategy,
        items,
        renderCallback: renderCallback$,
        viewRange: createOutputSpy<ListRange>('viewRange'),
        scrolledIndex: createOutputSpy<number>('scrolledIndex'),
      },
      imports: [
        RxVirtualScrollViewportComponent,
        RxVirtualFor,
        FixedSizeVirtualScrollStrategy,
        RxVirtualScrollElementDirective,
        RxVirtualScrollWindowDirective,
      ],
    }
  );
}

describe('viewport', () => {
  it('has proper runway height', () => {
    const { itemSize } = defaultMountConfig;
    mountFixedSize().then(({ fixture }) => {
      const sentinel = fixture.debugElement.query(
        By.css('.rx-virtual-scroll__sentinel')
      );
      fixture.detectChanges();
      cy.get('@renderCallback').should('have.been.called');
      expect((sentinel.nativeElement as HTMLElement).style.transform).eq(
        `translate(0px, ${defaultItemLength * itemSize}px)`
      );
    });
  });
  it('change runway height on item changes', () => {
    const { itemSize } = defaultMountConfig;
    mountFixedSize().then(({ fixture }) => {
      const items = fixture.componentInstance.items as Item[];
      items.push(...generateItems(1));
      fixture.detectChanges();
      const sentinel = fixture.debugElement.query(
        By.css('.rx-virtual-scroll__sentinel')
      );
      expect((sentinel.nativeElement as HTMLElement).style.transform).eq(
        `translate(0px, ${items.length * itemSize}px)`
      );
      items.splice(0, 1);
      fixture.detectChanges();
      expect((sentinel.nativeElement as HTMLElement).style.transform).eq(
        `translate(0px, ${items.length * itemSize}px)`
      );
    });
  });
});

describe('rendering, scrolling & positioning', () => {
  it('displays nothing', () => {
    mountFixedSize().then(({ fixture }) => {
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
    mountFixedSize().then(({ component }) => {
      const { itemSize, runwayItemsOpposite, containerHeight } =
        defaultMountConfig;
      const items = component.items as Item[];
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
        items.filter((v, i) => i < expectedEnd)
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
      const items = component.items as Item[];
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
        items.filter((v, i) => i < expectedEnd)
      );
    });
  });

  it('displays more items when runwayItemsOpposite are configured', () => {
    const config: VirtualScrollMountConfig<Item> = {
      itemSize: 20,
      runwayItemsOpposite: 20,
    };
    mountFixedSize(config).then(({ component }) => {
      const items = component.items as Item[];
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
        items.filter((v, i) => i < expectedEnd)
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
          fixture.componentInstance.runwayItems = runwayItems;
          fixture.componentInstance.runwayItemsOpposite = runwayItemsOpposite;
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
          defaultContainerHeight / itemSize + runwayItemsOpposite
        )
        .then(() => {
          const mountedComponent = fixture.componentInstance;
          mountedComponent.containerHeight = 500;
          fixture.detectChanges();
          cy.get('[data-cy=item]').should(
            'have.length',
            500 / itemSize + runwayItemsOpposite
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
      mountFixedSize().then(({ fixture }) => {
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
      mountFixedSize().then(({ fixture }) => {
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
      mountFixedSize().then(({ fixture }) => {
        const items = fixture.componentInstance.items as Item[];
        cy.get('[data-cy=item]')
          .each((item, index) => {
            expect(item.text().trim()).to.be.eq(`${index}`);
          })
          .then(() => {
            items.sort((a, b) => b.id - a.id);
            fixture.detectChanges();
            const { containerHeight, itemSize, runwayItemsOpposite } =
              defaultMountConfig;
            const itemsOnViewport = containerHeight / itemSize;
            const endIdx = items.length - itemsOnViewport - runwayItemsOpposite;
            cy.get('@renderCallback').should(
              'have.been.calledWith',
              items.filter((i) => i.id >= endIdx)
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
      mountFixedSize(defaultMountConfig, `{{ item.content }}`).then(
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
      mountFixedSize({ trackBy: {} as any }).then(() => {
        cy.on('uncaught:exception', (e) => {
          expect(e.message).eq(
            'trackBy must be typeof function or keyof T, but received {}'
          );
        });
      });
    });
    it('should keep nodes on add', () => {
      mountFixedSize(
        { trackBy: (i, item) => item.id },
        '{{ item.value }}'
      ).then(({ fixture }) => {
        const mountedComponent = fixture.componentInstance;
        const items = fixture.componentInstance.items as Item[];
        cy.get('[data-cy=item]').then((divs) => {
          const firstDiv = divs[0];
          const secondDiv = divs[1];
          const newItem = generateItems(1, 500)[0];
          (mountedComponent.items as Item[]).splice(0, 0, newItem);
          fixture.detectChanges();
          const { itemSize, runwayItemsOpposite, containerHeight } =
            defaultMountConfig;
          const expectedEnd = containerHeight / itemSize + runwayItemsOpposite;
          cy.get('@renderCallback').should(
            'have.been.calledWith',
            items.filter((item, i) => i < expectedEnd)
          );
          cy.get('[data-cy=item]').then((updatedDivs) => {
            expect(updatedDivs[1]).eq(firstDiv);
            expect(updatedDivs[2]).eq(secondDiv);
          });
        });
      });
    });
    it('should move dom nodes', () => {
      mountFixedSize({ trackBy: 'id' }, '{{ item.value }}').then(
        ({ fixture }) => {
          const items = fixture.componentInstance.items as Item[];
          cy.get('[data-cy=item]').then((divs) => {
            const firstDiv = divs[0];
            const secondDiv = divs[1];
            const first = items[0];
            items[0] = items[1];
            items[1] = first;
            fixture.detectChanges();
            const { itemSize, runwayItemsOpposite, containerHeight } =
              defaultMountConfig;
            const expectedEnd =
              containerHeight / itemSize + runwayItemsOpposite;
            cy.get('@renderCallback').should(
              'have.been.calledWith',
              items.filter((i) => i.id < expectedEnd)
            );
            cy.get('[data-cy=item]').then((updatedDivs) => {
              expect(updatedDivs[0]).eq(secondDiv);
              expect(updatedDivs[1]).eq(firstDiv);
            });
          });
        }
      );
    });
  });
});

const customScrollableTemplate = `
  <div rxVirtualScrollElement style="height: ${defaultMountConfig.containerHeight}px; width: 100vw;">
    <div style="height: 50px;">
      Content Before
    </div>
    <rx-virtual-scroll-viewport
      (scrolledIndexChange)="scrolledIndex.emit($event)"
      (viewRange)="viewRange.emit($event)"
      data-cy="viewport"
      [style.height.px]="containerHeight"
      [runwayItems]="runwayItems"
      [runwayItemsOpposite]="runwayItemsOpposite"
      [itemSize]="itemSize">
      <div
        [style.height.px]="itemSize"
        *rxVirtualFor="
          let item of items;
          renderCallback: renderCallback;
          viewCacheSize: viewCache;
          strategy: strategy;
          trackBy: trackBy;
        "
        [attr.data-cy]="'item'"
      >
        {{ item.id }}
      </div>
    </rx-virtual-scroll-viewport>
    <div style="height: 25px;">
      Content After
    </div>
  </div>
`;

describe('custom scrollable', () => {
  it('displays and positions items', () => {
    mountFixedSize({ template: customScrollableTemplate }).then(
      ({ component }) => {
        const { itemSize, runwayItemsOpposite, containerHeight } =
          defaultMountConfig;
        const items = component.items as Item[];
        const expectedEnd = Math.round(
          (containerHeight - 50) / itemSize + runwayItemsOpposite
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
          items.filter((v, i) => i < expectedEnd)
        );
      }
    );
  });
  it('reacts to scroll events', () => {
    mountFixedSize({ template: customScrollableTemplate }).then(
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
            fixture.componentInstance.runwayItems = runwayItems;
            fixture.componentInstance.runwayItemsOpposite = runwayItemsOpposite;
            fixture.detectChanges();
            start = scrolledIndex - runwayItemsOpposite;
            end = start + runwayItemsOpposite + itemsOnViewport + runwayItems;
            cy.get('@viewRange').should('have.been.calledWith', {
              start,
              end,
            });
            cy.get('[data-cy=item]').should('have.length', end - start);
          });
      }
    );
  });
  it('scrolls to an index', () => {
    mountFixedSize({ template: customScrollableTemplate }).then(
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
      }
    );
  });
});

const windowScrollableTemplate = `
  <div style="height: 50px;">
      Content Before
    </div>
    <rx-virtual-scroll-viewport
      scrollWindow
      (scrolledIndexChange)="scrolledIndex.emit($event)"
      (viewRange)="viewRange.emit($event)"
      data-cy="viewport"
      [style.height.px]="containerHeight"
      [runwayItems]="runwayItems"
      [runwayItemsOpposite]="runwayItemsOpposite"
      [itemSize]="itemSize">
      <div
        [style.height.px]="itemSize"
        *rxVirtualFor="
          let item of items;
          renderCallback: renderCallback;
          viewCacheSize: viewCache;
          strategy: strategy;
          trackBy: trackBy;
        "
        [attr.data-cy]="'item'"
      >
        {{ item.id }}
      </div>
    </rx-virtual-scroll-viewport>
    <div style="height: 25px;">
      Content After
    </div>
`;

describe('window scrolling', () => {
  it('displays and positions items', () => {
    let containerHeight = 0;
    cy.window().then((w) => (containerHeight = w.innerHeight));
    mountFixedSize({ template: windowScrollableTemplate }).then(
      ({ component }) => {
        const { itemSize, runwayItemsOpposite } = defaultMountConfig;
        const items = component.items as Item[];
        const expectedEnd = Math.round(
          (containerHeight - 50) / itemSize + runwayItemsOpposite
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
          items.filter((v, i) => i < expectedEnd)
        );
      }
    );
  });
  it('reacts to scroll events', () => {
    let containerHeight = 0;
    cy.window().then((w) => (containerHeight = w.innerHeight));
    mountFixedSize({ template: windowScrollableTemplate }).then(
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
            fixture.componentInstance.runwayItems = runwayItems;
            fixture.componentInstance.runwayItemsOpposite = runwayItemsOpposite;
            fixture.detectChanges();
            start = scrolledIndex - runwayItemsOpposite;
            end = start + runwayItemsOpposite + itemsOnViewport + runwayItems;
            cy.get('@viewRange').should('have.been.calledWith', {
              start,
              end,
            });
            cy.get('[data-cy=item]').should('have.length', end - start);
          });
      }
    );
  });
  it('scrolls to an index', () => {
    let containerHeight = 0;
    cy.window().then((w) => (containerHeight = w.innerHeight));
    mountFixedSize({ template: windowScrollableTemplate }).then(
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
      }
    );
  });
});
