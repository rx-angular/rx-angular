import { NgIterable } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RxStrategyNames } from '@rx-angular/cdk/render-strategies';
import { Observable } from 'rxjs';
import { RxVirtualScrollViewportComponent } from '../src/index';
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
}

export const defaultMountConfig: VirtualScrollMountConfig<Item> = {
  runwayItems: DEFAULT_RUNWAY_ITEMS,
  runwayItemsOpposite: DEFAULT_RUNWAY_ITEMS_OPPOSITE,
  itemSize: DEFAULT_ITEM_SIZE,
  viewCache: DEFAULT_TEMPLATE_CACHE_SIZE,
  containerHeight: 300,
  showItemDescription: true,
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
