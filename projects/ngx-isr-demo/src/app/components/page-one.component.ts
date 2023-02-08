import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page-one',
  template: `
    <p class="page-1234">
      page-one works!
      <span>{{ time | date:'medium' }} </span>

      <button
          (click)="invalidate()"
          class="bg-amber-500 text-amber-900 rounded-md ml-5 px-2 py-1">
        Invalidate
      </button>
    </p>
  `,
  standalone: true,
  imports: [ CommonModule ]
})
export default class PageOneComponent {
  time = new Date();

  constructor(private http: HttpClient) {}

  invalidate() {
    this.http.post('/api/invalidate', {
      token: 'MY_TOKEN',
      urlsToInvalidate: [ '/one', '/two' ]
    }).subscribe(res => {
      console.log('invalidate', res);
    });
  }
}
