import { Injectable } from '@angular/core';
import { DEFAULT_STRATEGY_NAME } from '@ngx-rx/ngrx-component-experiments';
import { RxState } from '@ngx-rx/state';

export interface CdConfig {
  strategies: string[];
  strategy: string;
}

@Injectable({ providedIn: 'root' })
export class CdConfigService extends RxState<CdConfig> {
  private state: CdConfig;

  constructor() {
    super();
    this.hold(this.select(), state => (this.state = state));
    this.setState({
      strategy: DEFAULT_STRATEGY_NAME
    });
  }

  getConfig(prop?: string): CdConfig | string {
    return prop ? this.state[prop] : this.state;
  }
}
