import { MonoTypeOperatorFunction } from 'rxjs';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import { StrategySelection } from '@ngx-rx/rxjs-etc';

export interface StrategyFactoryConfig {
  component: any;
  ngZone: NgZone;
  cdRef: ChangeDetectorRef;
}

export interface CdStrategy<T> {
  behaviour: (cfg?: any) => MonoTypeOperatorFunction<T>;
  render: () => void;
  name: string;
}

export const DEFAULT_STRATEGY_NAME = 'idle';

export function getStrategies<T>(
  cfg: StrategyFactoryConfig
): StrategySelection<T> {
  return {
    idle: createIdleStrategy<T>(cfg),
    noop: createNoopStrategy<T>()
  };
}

/**
 * Idle Strategy
 *
 * This strategy is the drop-in replacement for Angular's built-in `async` pipe.
 * This is the only strategy that **does not also work in zone-less environments**.
 *
 * - \>=ViewEngine
 * |          | Render Method      | Coalescing | Coalesce Scope |
 * | -------- | -------------------| ---------- | -------------- |
 * | ZoneFull | cdRef.markForCheck | ❌         | None           |
 * | ZoneLess | cdRef.markForCheck | ❌         | None           |
 *
 * - Ivy
 *
 * |          | Render Method      | Coalescing | Coalesce Scope |
 * | -------- | -------------------| ---------- | -------------- |
 * | ZoneFull | cdRef.markForCheck | ❌         | None           |
 * | ZoneLess | cdRef.markForCheck | ❌         | None           |
 */
export function createIdleStrategy<T>(
  cfg: Pick<StrategyFactoryConfig, 'cdRef'>
): CdStrategy<T> {
  return {
    render: (): void => {
      cfg.cdRef.markForCheck();
    },
    behaviour: () => o => {
      console.log('idle');
      return o;
    },
    name: 'idle'
  };
}

/**
 * Noop Strategy
 *
 * This strategy is does nothing.
 *
 * - \>=ViewEngine
 * |          | Render Method      | Coalescing | Coalesce Scope |
 * | -------- | -------------------| ---------- | -------------- |
 * | ZoneFull | None               | ❌         | None           |
 * | ZoneLess | None               | ❌         | None           |
 *
 * - Ivy
 *
 * |          | Render Method      | Coalescing | Coalesce Scope |
 * | -------- | -------------------| ---------- | -------------- |
 * | ZoneFull | None               | ❌         | None           |
 * | ZoneLess | None               | ❌         | None           |
 */
export function createNoopStrategy<T>(cfg?: any): CdStrategy<T> {
  return {
    render: (): void => {},
    behaviour: () => o => {
      console.log('noop');
      return o;
    },
    name: 'noop'
  };
}
