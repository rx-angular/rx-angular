import { Component } from '@angular/core';
import { Ui2Component } from '../ui/ui-2.component';

@Component({
  standalone: true,
  template: `
    <h2>Feature 2</h2>
    <app-ui-2 />
  `,
  imports: [Ui2Component],
})
export default class Feature2Component {}
