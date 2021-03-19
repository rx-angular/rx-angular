import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxa-read-write-read',
  template: `
    <rxa-visualizer>
      <div class="d-flex w-100">
        <rxa-read-write-read-default></rxa-read-write-read-default>
        <router-outlet></router-outlet>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadWriteReadComponent {
}
