import { ApplicationRef, Injectable, NgZone } from '@angular/core';
import { RxState } from '@rx-angular/state';

export interface CdConfig {
  strategy: string;
  rippleOn: boolean;
}

@Injectable({ providedIn: 'root' })
export class AppConfigService extends RxState<CdConfig> {
  public readonly strategyName$ = this.select('strategy');
  public readonly $ = this.select();

  constructor(  protected appRef: ApplicationRef,
                protected ngZone: NgZone) {
    super();
    this.set({
      rippleOn: true,
      strategy: 'local',
    });
  }


  appRef_tick() {
    this.appRef.tick();
  }
}
