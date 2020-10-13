import { ChangeDetectionStrategy, Component } from '@angular/core';
import { schedulingHelper } from '../../../shared/debug-helper/value-provider/scheduling-helper';
import { SchedulingPriority } from '@rx-angular/template';

@Component({
  selector: 'rxa-cd-parent13',
  template: `
    <rxa-visualizer>
      <h2 visualizerHeader>
        AnimationFrames triggers zone
      </h2>
      <rxa-value-provider [changes$]="sh.ticks$" #valP="rxaValueProvider">
      </rxa-value-provider>
      {{sh.ticks$ | push }}
      <button mat-raised-button [unpatch] (click)="sh.scheduler(p.animationFrame); sh.duration(1000)">
        AnimationFrame
      </button>
      <button mat-raised-button [unpatch] (click)="sh.scheduler(p.setTimeout); sh.tick(100)">
        setTimeout
      </button>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class ZonePatchedApisComponent {
  p = SchedulingPriority;
  sh = schedulingHelper();
}
