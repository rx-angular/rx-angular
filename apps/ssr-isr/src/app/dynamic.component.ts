import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-dynamic-page',
  template: `
    @if (post$ | async; as post) {
      <div>
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
      </div>
    }
    <div>
      <h2>
        Dynamically Modification (controlled by modifyGeneratedHtml in
        ISRHandlerConfig)
      </h2>
      <p>Original content</p>
    </div>
  `,
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicPageComponent {
  private http = inject(HttpClient);

  private postId$ = inject(ActivatedRoute).params.pipe(
    map((p) => p['id'] as string),
  );

  post$ = this.postId$.pipe(
    switchMap((id) =>
      this.http.get<{ title: string; body: string }>(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      ),
    ),
  );
}
