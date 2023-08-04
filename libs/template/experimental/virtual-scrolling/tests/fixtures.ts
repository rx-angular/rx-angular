import { NgIterable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { createOutputSpy, mount } from 'cypress/angular';
import { Observable, Subject } from 'rxjs';
import {
  FixedSizeVirtualScrollStrategy,
  ListRange,
  RxVirtualFor,
  RxVirtualScrollViewportComponent,
} from '../src/index';
import { RxStrategyNames } from '@rx-angular/cdk/render-strategies';

import {
  DEFAULT_ITEM_SIZE,
  DEFAULT_RUNWAY_ITEMS,
  DEFAULT_RUNWAY_ITEMS_OPPOSITE,
  DEFAULT_VIEW_CACHE_SIZE,
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
    start.getTime() + randomDiff * (1000 * 60 * 60 * 24)
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
  trackBy?: keyof T | ((idx: number, i: T) => unknown);
  itemSize?: number;
  strategy?: RxStrategyNames<string> | Observable<RxStrategyNames<string>>;
  containerHeight?: number;
  template?: string;
}

export const defaultMountConfig: VirtualScrollMountConfig<Item> = {
  runwayItems: DEFAULT_RUNWAY_ITEMS,
  runwayItemsOpposite: DEFAULT_RUNWAY_ITEMS_OPPOSITE,
  itemSize: DEFAULT_ITEM_SIZE,
  viewCache: DEFAULT_VIEW_CACHE_SIZE,
  containerHeight: 300,
} as const;
export const defaultItemLength = 500;
export function getDefaultMountConfig(): VirtualScrollMountConfig<Item> {
  return {
    items: generateItems(defaultItemLength),
    ...defaultMountConfig,
  };
}
export function getViewportComponent(fixture) {
  return fixture.debugElement.query(
    By.directive(RxVirtualScrollViewportComponent)
  ).componentInstance as RxVirtualScrollViewportComponent;
}
