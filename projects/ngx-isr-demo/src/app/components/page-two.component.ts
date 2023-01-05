import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-two',
  template: `
    <p class="page-1234">
      page-two works!
      <span>{{ time | date:'medium' }} </span>
    </p>

    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export default class PageTwoComponent {
  time = new Date()
}
