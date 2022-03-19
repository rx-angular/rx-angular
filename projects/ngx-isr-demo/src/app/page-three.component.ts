import { Component } from '@angular/core';

@Component({
  selector: 'app-page-three',
  template: `
    <p class="page-1234">
      page-three works!
      <span>{{ time | date:'medium' }} </span>
    </p>
  `
})
export class PageThreeComponent {

  time = new Date();
}
