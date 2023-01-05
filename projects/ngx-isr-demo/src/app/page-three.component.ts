import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-page-three',
  template: `
    <p class="page-1234">
      page-three works!
      <span>{{ time | date:'medium' }} </span>
    </p>
  `,
  standalone: true,
  imports: [CommonModule]
})
export default class PageThreeComponent {
  time = new Date();
}
