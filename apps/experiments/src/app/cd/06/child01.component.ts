import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseComponent } from '../../base.component.ts/base.component';

@Component({
  selector: 'app-cd06-child01-default',
  template: `
    <div class="case-info">
      <span>CD: <b class="cds">Default</b></span>
      <span
        >dirty: <b class="dirty">{{ isMarkedDirty }}</b></span
      >
      <span
        >render: <b class="num-renders">{{ getNumOfRenderings() }}</b></span
      >
    </div>
    <div class="case-content">
      <app-cd06-child0101-push></app-cd06-child0101-push>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class Child0601Component extends BaseComponent {}
