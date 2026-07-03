import { Component } from '@angular/core';
import { Ui1Component } from '../ui/ui-1.component';

@Component({
  standalone: true,
  template: `
    <h2>Feature 1</h2>
    <app-ui-1 />
  `,
  imports: [Ui1Component],
})
export default class Feature1Component {}
