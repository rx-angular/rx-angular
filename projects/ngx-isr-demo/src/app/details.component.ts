import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { useParams } from './helpers';

const API_URL = 'https://jsonplaceholder.typicode.com';

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
  standalone: true,
  imports: [CommonModule]
})
export class DetailsComponent {
  private http = inject(HttpClient);
  detailsId = useParams('id');

  time = new Date();

  todo$ = this.http.get<{ title: string }>(
    `${API_URL}/todos/${this.detailsId ?? ''}`
  );
}
