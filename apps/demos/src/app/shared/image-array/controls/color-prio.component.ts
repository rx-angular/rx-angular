import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RxState } from '@rx-angular/state';
import { RxAngularPriorityLevel } from '../../../rx-angular-pocs';

@Component({
  selector: 'rxa-color-prio',
  template: `
    <mat-expansion-panel *rxLet="colorArr$; let colors">
      <mat-expansion-panel-header>
        <p class="mr-1">Total: {{colors.length}}</p>
        <div class="d-flex align-items-center">
          <div class="color m-1" style=""
               [style.background]="i[0]"
               [title]="i[0]"
               *ngFor="let i of colors">
            {{prioMap[i[1]]}}
          </div>
        </div>
      </mat-expansion-panel-header>
      <div class="w-100 d-flex flex-wrap">
        <div class="d-flex align-items-center w-25 mb-1" *ngFor="let i of colors">
          <div class="mr-1 color" style="width: 15px; height: 15px;"
               [style.background]="i[0]">
            &nbsp;
          </div>
          <span class="priority">{{ i[1] }}</span>
        </div>
      </div>
    </mat-expansion-panel>
  `,
  styles: [`
    .color {
      width: 15px;
      max-height: 15px;
      font-size: 13px;
      text-align: center;
      box-shadow: 1px 1px 1px #0006;
    }
  `]
})
export class ColorPrioComponent extends RxState<{
  colors: [string, string][]
}> {
  colorArr$ = this.select('colors');

  prioMap = {
    local: RxAngularPriorityLevel.NoPriority,
    global: RxAngularPriorityLevel.NoPriority,
    native: RxAngularPriorityLevel.NoPriority,
    noop: RxAngularPriorityLevel.Exclude,

    idleCallback: RxAngularPriorityLevel.IdlePriority,

    postTaskUserVisible: RxAngularPriorityLevel.NormalPriority,
    postTaskUserBlocking: RxAngularPriorityLevel.UserBlockingPriority,
    postTaskBackground: RxAngularPriorityLevel.NoPriority,

    reactNoPrio: RxAngularPriorityLevel.NoPriority,
    reactImmediate: RxAngularPriorityLevel.ImmediatePriority,
    reactUserBlocking: RxAngularPriorityLevel.UserBlockingPriority,
    reactNormal: RxAngularPriorityLevel.NormalPriority,
    reactLow: RxAngularPriorityLevel.LowPriority,
    reactIdle: RxAngularPriorityLevel.IdlePriority,

    chunk: RxAngularPriorityLevel.NormalPriority
  };

  @Input()
  set colors$(color$: Observable<Map<string, any>>) {
    this.connect('colors', color$.pipe(map(c => Array.from(c.entries()))));
  }
}
