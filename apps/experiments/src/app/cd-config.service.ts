import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';

export interface CdConfig {
  strategies: string[];
  strategy: string;
}

@Injectable({ providedIn: 'root' })
export class CdConfigService extends RxState<CdConfig> {
  private state: CdConfig;

  constructor() {
    super();
    this.hold(this.select(), (state) => (this.state = state));
    this.set({
      strategy: 'local',
    });
  }

  getConfig(prop?: string): CdConfig | string {
    return prop ? this.state[prop] : this.state;
  }
}
