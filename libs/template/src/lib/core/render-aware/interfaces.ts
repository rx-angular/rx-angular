import { ChangeDetectorRef } from '@angular/core';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';

export interface StrategySelection<U> {
  [strategy: string]: RenderStrategy<U>;
}

export interface RenderStrategyFactoryConfig {
  cdRef: ChangeDetectorRef;
}

export interface RenderStrategy<T> {
  name: string;
  scheduleCD: () => void;
  behavior: (o: Observable<T>) => Observable<T>;
  renderMethod: () => void;
}
