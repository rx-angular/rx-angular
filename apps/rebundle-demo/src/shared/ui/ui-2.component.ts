import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-ui-2',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `<p>UI 2</p>`,
})
export class Ui2Component {}
