import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-one',
  template: `
    <p class="page-1234">
      page-one works!
      <span>{{ time | date:'medium' }} </span>
    </p>
  `,
})
export class PageOneComponent {
  time = new Date();
}
