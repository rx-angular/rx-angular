import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, share, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'rxa-push-basic-example',
  template: `
    <div class="row mb-2">
      <div class="col">
        <button mat-raised-button unpatch (click)="updateClick.next()">Update</button>
      </div>
    </div>
    <rxa-dirty-check></rxa-dirty-check>
    <div class="row">
      <div class="col-4">
        <div class="mat-headline">
          Value
        </div>
        <div> {{ value$ | push }}</div>
      </div>
      <div class="col-4">
        <div class="mat-headline">
          Value
        </div>
        <div> {{ value$ | push }}</div>
      </div>
      <div class="col-4">
        <div class="mat-headline">
          Value
        </div>
        <div> {{ value$ | push }}</div>
      </div>
    </div>
  `,
  styles: [`

  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PushBasicExampleComponent {

  readonly updateClick = new Subject<void>();

  readonly value$ = this.updateClick.pipe(
    map(() => Math.ceil(Math.random() * 100)),
    distinctUntilChanged(),
    share()
  )
}
