import { ChangeDetectorRef } from '@angular/core';
import { MonoTypeOperatorFunction } from 'rxjs';

export interface StrategySelection<U> {
  [strategy: string]: RenderStrategy<U>;
}

export interface RenderStrategyFactoryConfig {
  cdRef: ChangeDetectorRef;
}

export interface RenderStrategy<T> {
  renderStatic: () => void;
  behaviour: () => MonoTypeOperatorFunction<T>;
  render: () => void;
  name: string;
}
