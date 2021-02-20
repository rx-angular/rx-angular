import { NgZone } from '@angular/core';
import { CustomStrategyCredentialsMap } from '../model';
import { DefaultStrategyNames } from './default-strategies';


export type StrategyNames<T> = DefaultStrategyNames | T;
export type Strategies<T extends string> = CustomStrategyCredentialsMap<
  StrategyNames<T>
>;

// TODO: move to model file if we decided where we store models
export interface ScheduleOnStrategyOptions {
  scope?: {};
  strategy?: string;
  patchZone?: false | NgZone;
}
