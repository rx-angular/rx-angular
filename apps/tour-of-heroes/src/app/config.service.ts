import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';

export enum AppRenderStrategy {
  noop = 'noop',
  native = 'native',
  local = 'local',
  global = 'global',
}

export interface AppConfig {
  renderStrategy: AppRenderStrategy;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  // doing this in order to NOT expose the full state API. We don't have to unsubscribe in a global service either.
  private readonly state = new RxState<AppConfig>();

  readonly renderStrategy$ = this.state.select('renderStrategy');

  constructor() {}

  setStrategy(renderStrategy: AppRenderStrategy) {
    this.state.set({ renderStrategy });
  }
}
