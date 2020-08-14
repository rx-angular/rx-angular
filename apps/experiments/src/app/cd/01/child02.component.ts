import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BaseComponent } from '../../base.component.ts/base.component';

@Component({
  selector: 'app-cd01-child02-push',
  template: `
    <div class="base-info">
      <span>CD: <b class="cds">OnPush</b></span>
      <span
        >dirty: <b class="dirty">{{ isMarkedDirty }}</b></span
      >
      <span
        >render: <b class="num-renders">{{ getNumOfRenderings() }}</b></span
      >
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Child0102Component extends BaseComponent {}
