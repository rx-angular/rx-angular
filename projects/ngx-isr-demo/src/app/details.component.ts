import { Component } from '@angular/core';

@Component({
  selector: 'app-details',
  template: `
    <p class="page-1234">
      Details!!
      <span>{{ time | date:'medium' }} </span>
    </p>
  `
})
export class DetailsComponent {
  time = new Date()
}
