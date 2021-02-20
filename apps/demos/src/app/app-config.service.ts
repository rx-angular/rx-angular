import { ApplicationRef, Injectable, Input, NgZone } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { environment } from '../environments/environment';
import { isNgZone } from './rx-angular-pocs/cdk/utils/zone-agnostic';

export interface CdConfig {
  strategy: string;
  rippleOn: boolean;
  rippleResponsiveOn: boolean;
}

@Injectable({ providedIn: 'root' })
export class AppConfigService extends RxState<CdConfig> {
  public readonly $ = this.select();
  expanded = !isNgZone(this.ngZone);
  @Input()
  appComponentRef;

  readonly env = environment;
  readonly hasZone = isNgZone(this.ngZone);
  readonly devMode = !environment.production;
  readonly zoneEnv = this.hasZone ? 'NgZone' : 'NgNoopZone';

  constructor(
    protected appRef: ApplicationRef,
    protected ngZone: NgZone
  ) {
    super();
    this.set({
      rippleOn: false,
      strategy: 'local'
    });
  }

  appRef_tick() {
    this.appRef.tick();
  }
}
