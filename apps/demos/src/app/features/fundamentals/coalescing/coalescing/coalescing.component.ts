import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { getStrategies } from '@rx-angular/template';
import { CoalescingTestService } from './coalescing-test.service';

@Component({
  selector: 'rxa-demo-basics',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h2>Coalescing Tests</h2>
        <rxa-value-provider [buttons]="true" [unpatched]="[]" #vP="rxaValueProvider"></rxa-value-provider>
        <div>
          <mat-form-field>
            <label>Render Strategy: {{ strategy$ | push | json}}</label>
            <mat-select #select formControlName="strategy" id="strategy" (selectionChange)="strategy$.next(select.value)">
              <mat-option
                [value]="s"
                *ngFor="let s of strategies">
                {{ s }}
              </mat-option>
            </mat-select>
          </mat-form-field>
          <br>
          <button mat-raised-button (click)="vP.next()">UpdateValue</button>
          <button mat-raised-button [unpatch] (click)="vP.next()">UpdateValue (unpatched)</button>
        </div>
      </ng-container>
      <rxa-visualizer class="w-100">
        <div class="col-sm-3">
          <h3>Push 1</h3>
          <br/>
          {{ vP.incremental$ | push: strategy$ }}<br/>
        </div>
        <rxa-visualizer viewType="embedded-view" *rxLet="vP.incremental$; let value; strategy: strategy$" class="col-sm-3">
          <h3 visualizerHeader>rxLet 1</h3>
          {{ value }}
        </rxa-visualizer>
        <div class="col-sm-3">
          <h3>Push 2</h3>
          <br/>
          {{ vP.incremental$ | push: strategy$ }}
        </div>
        <rxa-visualizer viewType="embedded-view" *rxLet="vP.incremental$; let value; strategy: strategy$" class="col-sm-3">
          <h3 visualizerHeader>rxLet 2</h3>
          {{ value }}
        </rxa-visualizer>
      </rxa-visualizer>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CoalescingTestService]
})
export class CoalescingComponent implements OnInit {
  strategy$ = this.s.strategy$;

  strategies = Object.keys(getStrategies({ cdRef: { context: {} } } as any));

  constructor(
    private cdRef: ChangeDetectorRef,
    public s: CoalescingTestService
  ) {
  }

  updateValue() {
    this.s.updateValue();
  }

  ngOnInit() {
    this.s.toggleTick.subscribe();
  }
}

