import { NgZone } from '@angular/core';

export interface ScheduleOnStrategyOptions {
  scope?: {};
  strategy?: string;
  patchZone?: false | NgZone;
}
