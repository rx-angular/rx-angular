import { Component } from '@angular/core';

@Component({
  selector: 'app-page-two',
  template: `
    <p class="page-1234">
      page-two works!
      <span>{{ time | date:'medium' }} </span>
    </p>

    <router-outlet></router-outlet>
  `
})
export class PageTwoComponent {
  time = new Date()
}
