import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { environment } from 'apps/demos/src/environments/environment';
import { RxChangeDetectorRef } from '../../../../../../shared/rx-change-detector-ref/rx-change-detector-ref.service';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { dictionaryToArray } from '@rx-angular/state';
import { RxEffects } from '../../../../../../shared/rx-effects.service';

@Component({
  selector: 'rxa-rx-let-poc',
  template: `
    <rxa-visualizer>
      <rxa-strategy-select
        visualizerHeader
        [strategies]="rxCdRef.strategies$"
        [currentStrategy]="rxCdRef.strategy$"
        (strategyChange)="rxCdRef.setStrategy($event)"
      ></rxa-strategy-select>
      <div class="mat-row">
        <div class="padding">
          <rxa-strategy-control-inherit></rxa-strategy-control-inherit>
        </div>
        <div class="padding">
          <rxa-strategy-control-custom></rxa-strategy-control-custom>
        </div>
        <div class="padding">
          <rxa-strategy-control-directive></rxa-strategy-control-directive>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    class: 'm-1 p-1',
    style: 'display: block;',
  },
  providers: [RxEffects],
})
export class RxLetPocComponent implements OnInit {
  constructor(public rxCdRef: RxChangeDetectorRef) {}

  ngOnInit(): void {}
}
