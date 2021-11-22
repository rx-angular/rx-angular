import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RxState } from '@rx-angular/state/state';

@Component({
  selector: 'rxa-zone-patched-icon',
  template: `
    <mat-icon style="font-size: 18px; height: 18px; width: 18px;" *rxLet="zoneState$; let zoneState">{{zoneState}}</mat-icon>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZonePatchedIconComponent extends RxState<{ zoneState: string }> {
  zoneStates = {
    'patched': 'wifi',
    'unpatched': 'wifi_off'
  };
  zoneState$ = this.select('zoneState');

  @Input()
  set zoneState(zoneState: string) {
    if (Object.keys(this.zoneStates).includes(zoneState)) {
      this.set({ zoneState: this.zoneStates[zoneState] });
    }
  }

  constructor() {
    super();
  }


}
