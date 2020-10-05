import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxa-cd-parent13',
  template: `
    <rxa-visualizer>
      <h2 visualizerHeader>
        AnimationFrames triggers zone
      </h2>
      <rxa-value-provider #valP="rxaValueProvider">
        <h3>Value: {{ valP.incremental$ | push }}</h3>
        <button mat-raised-button [unpatch] (click)="valP.schedule$.next(!running ? scheduleConfig : undefined); running = !running">
          Run AF for 1 sec
        </button>
      </rxa-value-provider>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class ZonePatchedApisComponent {
  running = false;
  scheduleConfig = {scheduler: 'animationFrame', duration: 2000};

}
