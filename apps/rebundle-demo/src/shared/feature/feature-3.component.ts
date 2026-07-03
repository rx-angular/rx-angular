import { Component } from '@angular/core';
import { Ui3Component } from '../ui/ui-3.component';

@Component({
  standalone: true,
  template: `
    <h2>Feature 3</h2>
    <app-ui-3 />
  `,
  imports: [Ui3Component],
})
export default class Feature3Component {}
