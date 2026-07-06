import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RxState } from '@rx-angular/state';
import { RxLet } from '../../../rx-angular-pocs/template/directives/let/rx-let.directive';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
} from '@angular/material/expansion';

@Component({
  selector: 'rxa-color-prio',
  template: `
    <mat-expansion-panel *rxLet="colorArr$; let colors">
      <mat-expansion-panel-header>
        <p class="mr-1">Total: {{ colors.length }}</p>
        <div class="d-flex align-items-center">
          @for (i of colors; track i) {
            <div
              class="color m-1"
              style=""
              [style.background]="i[0]"
              [title]="i[0]"
            >
              &nbsp;
            </div>
          }
        </div>
      </mat-expansion-panel-header>
      <div class="w-100 d-flex flex-wrap">
        @for (i of colors; track i) {
          <div class="d-flex align-items-center w-25 mb-1">
            <div
              class="mr-1 color"
              style="width: 15px; height: 15px;"
              [style.background]="i[0]"
            >
              &nbsp;
            </div>
            <span class="priority">{{ i[1] }}</span>
          </div>
        }
      </div>
    </mat-expansion-panel>
  `,
  styles: [
    `
      .color {
        width: 15px;
        max-height: 15px;
        font-size: 13px;
        text-align: center;
        box-shadow: 1px 1px 1px #0006;
      }
    `,
  ],
  imports: [RxLet, MatExpansionPanel, MatExpansionPanelHeader],
})
export class ColorPrioComponent extends RxState<{
  colors: [string, string][];
}> {
  colorArr$ = this.select('colors');

  @Input()
  set colors$(color$: Observable<Map<string, any>>) {
    this.connect('colors', color$.pipe(map((c) => Array.from(c.entries()))));
  }
}
