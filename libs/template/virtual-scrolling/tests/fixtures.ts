import { NgIterable } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RxStrategyNames } from '@rx-angular/cdk/render-strategies';
import { Observable } from 'rxjs';
import { ListRange, RxVirtualScrollViewportComponent } from '../src/index';
import {
  DEFAULT_ITEM_SIZE,
  DEFAULT_RUNWAY_ITEMS,
  DEFAULT_RUNWAY_ITEMS_OPPOSITE,
  DEFAULT_TEMPLATE_CACHE_SIZE,
} from '../src/lib/virtual-scroll.config';

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
    start.getTime() + randomDiff * (1000 * 60 * 60 * 24),
  );
  return randomDate;
}

export interface Item {
  id: number;
  value: string;
  content: string;
  date: Date;
  description: string;
}

export function generateItems(amount: number, startId = 0): Item[] {
  return new Array(amount).fill(0).map((v, i) => ({
    id: startId + i,
    value: `value ${startId + i}`,
    content: randomContent(),
    date: randomDate(),
    description: Math.random() >= 0.5 ? randomContent(30, 50) : '',
  }));
}

export interface VirtualScrollMountConfig<T> {
  runwayItems?: number;
  runwayItemsOpposite?: number;
  viewCache?: number;
  items?: Observable<NgIterable<T>> | NgIterable<T> | null | undefined;
  showItemDescription?: boolean;
  trackBy?: keyof T | ((idx: number, i: T) => unknown);
  itemSize?: number;
  strategy?: RxStrategyNames<string> | Observable<RxStrategyNames<string>>;
  containerHeight?: number;
  appendOnly?: boolean;
  keepScrolledIndexOnPrepend?: boolean;
}

export const defaultMountConfig: VirtualScrollMountConfig<Item> = {
  runwayItems: DEFAULT_RUNWAY_ITEMS,
  runwayItemsOpposite: DEFAULT_RUNWAY_ITEMS_OPPOSITE,
  itemSize: DEFAULT_ITEM_SIZE,
  viewCache: DEFAULT_TEMPLATE_CACHE_SIZE,
  containerHeight: 300,
  showItemDescription: true,
  appendOnly: false,
  keepScrolledIndexOnPrepend: false,
} as const;
export const defaultItemLength = 500;
export function getDefaultMountConfig(): VirtualScrollMountConfig<Item> {
  return {
    items: generateItems(defaultItemLength),
    ...defaultMountConfig,
  };
}
export function getViewportComponent(fixture: ComponentFixture<any>) {
  return fixture.debugElement.query(
    By.directive(RxVirtualScrollViewportComponent),
  ).componentInstance as RxVirtualScrollViewportComponent;
}

/** the part of a `createOutputSpy` we care about when it's yielded by `cy.get` */
type OutputSpy<T> = { lastCall: { args: [T] } };

function asOutputSpy<T>(spy: unknown): OutputSpy<T> {
  return spy as OutputSpy<T>;
}

/**
 * the `scrolledIndex` is defined as the first item visible in the viewport,
 * which is exactly what `visibleRange.start` points to
 */
export function expectVisibleRangeStartToEqualScrolledIndex() {
  cy.get('@scrolledIndex').then((scrolledIndex) => {
    cy.get('@visibleRange').should((visibleRange) => {
      expect(asOutputSpy<ListRange>(visibleRange).lastCall.args[0].start).to.eq(
        asOutputSpy<number>(scrolledIndex).lastCall.args[0],
      );
    });
  });
}

/**
 * Yields `read()` once it returned the same value for `stableReads` consecutive
 * reads, `interval` ms apart. Use it to capture a baseline only after the
 * rendering, measuring and scrolling triggered so far has settled - on a slow
 * or busy machine that takes longer than any fixed `cy.wait`.
 */
export function waitUntilStable<T>(
  read: () => T,
  interval = 50,
  stableReads = 3,
): Cypress.Chainable<T> {
  let last: string | undefined;
  let stable = 0;
  let reads = 0;
  const check = (): Cypress.Chainable<T> =>
    cy.wait(interval, { log: false }).then(() => {
      const value = read();
      const serialized = JSON.stringify(value);
      stable = serialized === last ? stable + 1 : 0;
      last = serialized;
      reads++;
      if (stable >= stableReads) {
        return cy.wrap(value, { log: false });
      }
      if (reads > 200) {
        throw new Error(`value did not settle: ${serialized}`);
      }
      return check();
    });
  return check();
}

/** asserts the top of the given item relative to the scroll container */
export function expectItemOffset(id: number, offset: number) {
  cy.get('.rx-virtual-scroll__runway').should(([runway]) => {
    const item = [...runway.querySelectorAll('[data-cy=item]')].find(
      (element) => element.textContent!.trim() === `${id}`,
    );
    expect(item, `item ${id} is rendered`).not.to.eq(undefined);
    expect(
      item!.getBoundingClientRect().top - runway.getBoundingClientRect().top,
      `offset of item ${id}`,
    ).to.eq(offset);
  });
}
