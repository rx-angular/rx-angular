import { NgIterable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  FixedSizeVirtualScrollStrategy,
  RxVirtualFor,
  RxVirtualScrollViewportComponent,
  ListRange,
} from '../src/index';
import { createOutputSpy, mount } from 'cypress/angular';
import { RxStrategyNames } from '@rx-angular/cdk/render-strategies';
import {
  DEFAULT_ITEM_SIZE,
  DEFAULT_RUNWAY_ITEMS,
  DEFAULT_RUNWAY_ITEMS_OPPOSITE,
  DEFAULT_VIEW_CACHE_SIZE,
} from '../src/lib/virtual-scroll.config';
import { By } from '@angular/platform-browser';

function randomContent(minLength = 1, maxLength = 50) {
  return new Array(Math.max(minLength, Math.floor(Math.random() * maxLength)))
    .fill('')
    .map(() => randomWord())
    .join(' ');
}

function randomWord() {
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
}

function randomDate() {
  const start = new Date('2000-01-01');
  const end = new Date();
  const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  const randomDiff = Math.floor(Math.random() * diff);
  const randomDate = new Date(
    start.getTime() + randomDiff * (1000 * 60 * 60 * 24)
  );
  return randomDate;
}

interface Item {
  id: number;
  value: string;
  content: string;
  date: Date;
  description: string;
}

const items: Item[] = new Array(500).fill(0).map((v, i) => ({
  id: i,
  value: `value ${i}`,
  content: randomContent(),
  date: randomDate(),
  description: Math.random() >= 0.5 ? randomContent(30, 50) : '',
}));

interface VirtualScrollMountConfig<T> {
  runwayItems?: number;
  runwayItemsOpposite?: number;
  viewCache?: number;
  items?: Observable<NgIterable<T>> | NgIterable<T> | null | undefined;
  trackBy?: keyof T | ((idx: number, i: T) => unknown);
  itemSize?: number;
  strategy?: RxStrategyNames<string> | Observable<RxStrategyNames<string>>;
  containerHeight?: number;
}

const defaultMountConfig: VirtualScrollMountConfig<Item> = {
  items,
  runwayItems: DEFAULT_RUNWAY_ITEMS,
  runwayItemsOpposite: DEFAULT_RUNWAY_ITEMS_OPPOSITE,
  itemSize: DEFAULT_ITEM_SIZE,
  viewCache: DEFAULT_VIEW_CACHE_SIZE,
  containerHeight: 300,
};

function mountFixedSize(config?: VirtualScrollMountConfig<Item>) {
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
    ...defaultMountConfig,
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
      [itemSize]="itemSize">
      <div
        [style.height.px]="itemSize"
        *rxVirtualFor="
          let item of items;
          renderCallback: renderCallback;
          viewCacheSize: viewCache;
          strategy: strategy;
        "
        [attr.data-cy]="'item'"
      >
        {{ item.id }}
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
      ],
    }
  );
}

it('displays and positions items', () => {
  mountFixedSize();
  const { itemSize, runwayItemsOpposite, containerHeight } = defaultMountConfig;
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

it('displays and positions items with different sizes', () => {
  const config: VirtualScrollMountConfig<Item> = {
    itemSize: 20,
  };
  mountFixedSize(config);
  const { itemSize } = config;
  const { runwayItemsOpposite, containerHeight } = defaultMountConfig;
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

it('displays more items when runwayItemsOpposite are configured', () => {
  const config: VirtualScrollMountConfig<Item> = {
    itemSize: 20,
    runwayItemsOpposite: 20,
  };
  mountFixedSize(config);
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

it('should react to scroll events & runwayItems configuration', () => {
  const config: VirtualScrollMountConfig<Item> = {
    itemSize: 20,
  };
  mountFixedSize(config).then(({ fixture }) => {
    const { itemSize } = config;
    let { runwayItemsOpposite, runwayItems } = defaultMountConfig;
    const { containerHeight } = defaultMountConfig;
    const itemsOnViewport = containerHeight / itemSize;
    const viewportComponent = fixture.debugElement.query(
      By.directive(RxVirtualScrollViewportComponent)
    ).componentInstance as RxVirtualScrollViewportComponent;

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

it('should react to containerHeight changes', () => {
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

it('should scroll to an index', () => {
  mountFixedSize().then(({ fixture }) => {
    const { runwayItems, runwayItemsOpposite, itemSize, containerHeight } =
      defaultMountConfig;
    const viewportComponent = fixture.debugElement.query(
      By.directive(RxVirtualScrollViewportComponent)
    ).componentInstance as RxVirtualScrollViewportComponent;
    viewportComponent.scrollToIndex(340);
    cy.get('@scrolledIndex').should('have.been.calledWith', 340);
    cy.get('@viewRange').should('have.been.calledWith', {
      start: 340 - runwayItemsOpposite,
      end: 340 + containerHeight / itemSize + runwayItems,
    });
  });
});

it('should render updates', () => {
  mountFixedSize().then(({ fixture }) => {
    cy.get('[data-cy=item]')
      .each((item, index) => {
        expect(item.text().trim()).to.be.eq(`${index}`);
      })
      .then(() => {
        const mountedComponent = fixture.componentInstance;
        mountedComponent.items = [...items.sort((a, b) => b.id - a.id)];
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
          expect(item.text().trim()).to.be.eq(`${items.length - 1 - index}`);
        });
      });
  });
});
