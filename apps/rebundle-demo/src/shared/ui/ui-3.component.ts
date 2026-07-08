import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-ui-3',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `<p>UI 3</p>`,
})
export class Ui3Component {}
