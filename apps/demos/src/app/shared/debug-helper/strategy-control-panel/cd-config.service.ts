import { ApplicationRef, ChangeDetectorRef, Injectable, NgZone, ɵdetectChanges, ɵmarkDirty } from '@angular/core';
import { RxState } from '@rx-angular/state';

export interface CdConfig {
  strategies: string[];
  strategy: string;
}

@Injectable({ providedIn: 'root' })
export class CdConfigService extends RxState<CdConfig> {
  private state: CdConfig;

  constructor(  protected appRef: ApplicationRef,
                protected cdRef: ChangeDetectorRef,
                protected ngZone: NgZone) {
    super();
    this.hold(this.select(), (state) => (this.state = state));
    this.set({
      strategy: 'local',
    });
  }

  getConfig(prop?: string): CdConfig | string {
    return prop ? this.state[prop] : this.state;
  }

  appRef_tick() {
    this.appRef.tick();
  }

  cdRef_detectChanges() {
    this.cdRef.detectChanges();
  }

  cdRef_markForCheck() {
    this.cdRef.markForCheck();
  }

  markDirty() {
    ɵmarkDirty(this);
  }

  detectChanges() {
    ɵdetectChanges(this);
  }
}
