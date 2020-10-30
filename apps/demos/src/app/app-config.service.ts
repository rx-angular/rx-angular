import { ApplicationRef, Injectable, Input, NgZone } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { isNgZone, isViewEngineIvy } from '@rx-angular/template';
import { environment } from '../environments/environment';

export interface CdConfig {
  strategy: string;
  rippleOn: boolean;
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
  readonly engine = isViewEngineIvy() ? 'Ivy' : 'ViewEngine';

  constructor(protected appRef: ApplicationRef,
              protected ngZone: NgZone
  ) {
    super();
    this.set({
      rippleOn: true,
      strategy: 'local'
    });
  }

  appRef_tick() {
    this.appRef.tick();
  }
}
