import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxa-cd',
  template: `
    <div class="row">
      <div class="col-sm-6">
        <h3>Nested</h3>
        <rxa-cd-nested></rxa-cd-nested>
      </div>
      <div class="col-sm-6">
        <h3>Injected</h3>
        <rxa-cd-injected></rxa-cd-injected>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DetectChangesComponent {

}
