import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-ui-1',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `<p>UI 1</p>`,
})
export class Ui1Component {}
