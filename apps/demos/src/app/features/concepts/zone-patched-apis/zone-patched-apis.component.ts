import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RxPush } from '@rx-angular/template/push';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { PushPipe } from '../../../rx-angular-pocs/template/pipes/push/push.pipe';
import { schedulingHelper } from '../../../shared/debug-helper/value-provider/scheduling-helper';
import { ValueProviderComponent } from '../../../shared/debug-helper/value-provider/value-provider/value-provider.component';
import { VisualizerComponent } from '../../../shared/debug-helper/visualizer/visualizer/visualizer.component';

export enum SchedulingPriority {
  sync,
  animationFrame,
  Promise,
  setTimeout,
  setInterval,
  postMessage,
  idleCallback,
  userBlocking,
  userVisible,
  background,
}

@Component({
  selector: 'rxa-cd-parent13',
  template: `
    <rxa-visualizer>
      <h2 visualizerHeader>AnimationFrames triggers zone</h2>
      <rxa-value-provider [changes$]="sh.ticks$" #valP="rxaValueProvider">
      </rxa-value-provider>
      {{ sh.ticks$ | push }}
      <button
        mat-raised-button
        [unpatch]
        (click)="sh.scheduler(p.animationFrame); sh.duration(1000)"
      >
        AnimationFrame
      </button>
      <button
        mat-raised-button
        [unpatch]
        (click)="sh.scheduler(p.setTimeout); sh.tick(100)"
      >
        setTimeout
      </button>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    VisualizerComponent,
    ValueProviderComponent,
    MatButton,
    RxUnpatch,
    RxPush,
    PushPipe,
  ],
})
export class ZonePatchedApisComponent {
  p = SchedulingPriority;
  sh = schedulingHelper();
}
