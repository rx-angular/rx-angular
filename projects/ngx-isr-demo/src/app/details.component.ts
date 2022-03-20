import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-details',
  template: `
    <p class="page-1234">
      Details!!
      <span>{{ time | date:'medium' }} </span>

      <span *ngIf="todo$ | async as todo">
        Title: {{ todo.title }}
      </span>
    </p>
  `,
})
export class DetailsComponent {
  time = new Date();

  todo$ = this.httpClient.get<{ title: string }>(
    `https://jsonplaceholder.typicode.com/todos/1`
  );

  constructor(private httpClient: HttpClient) {}
}
