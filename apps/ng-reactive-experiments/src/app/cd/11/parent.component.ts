import { Component, ElementRef, ViewChild } from '@angular/core';
import { defer } from 'rxjs';
import { environment } from '../../../environments/environment';
import { fromZoneEvent } from '@rxjs';
import { BaseComponent } from '../../base.component.ts/base.component';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-cd-parent11',
  template: `
    <h2>C 11
      <small>ViewChild triggers zone</small>
    </h2>
    <div class="case-info">
      <span>CD: <b class="cds">Default</b></span>
      <span>dirty: <b class="dirty">{{isMarkedDirty}}</b></span>
      <span>render: <b class="num-renders">{{getNumOfRenderings()}}</b></span>
    </div>
    <div class="case-interaction">
      <button #button>Click over ViewChild</button>
    </div>
  `,
  changeDetection: environment.changeDetection
})
export class CdParent11Component extends BaseComponent {
  @ViewChild('button') button: ElementRef<HTMLButtonElement>;
  btnClick$ = defer(() => fromZoneEvent(this.button.nativeElement, 'click'));
  baseEffects$ = this.btnClick$.pipe(tap(() => console.log('click over ViewChild')));

}
