import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval, pipe, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, share, switchMapTo, tap } from 'rxjs/operators';

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
          toRandom
        </div>
        <div> {{ value$ | pipe:toRandom | push}}</div>
      </div>
      <div class="col-4">
        <div class="mat-headline">
          debounce350
        </div>
        <div *rxLet="value$ | pipe:debounce350; let value"> {{value}}</div>
      </div>
      <div class="col-4">
        <div class="mat-headline">
          toInterval
        </div>
        <div> {{ value$ | pipe:toInterval | push}}</div>
      </div>
    </div>
  `,
  styles: [`

  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PipePocComponent {

  readonly updateClick = new Subject<void>();

  readonly value$ = this.updateClick.pipe(
    map(() => Math.ceil(Math.random() * 100)),
    distinctUntilChanged(),
    tap(console.log),
    // share()
  );

  toRandom = pipe(map(() => Math.random()));
  debounce350 = pipe(debounceTime(350));
  toInterval = pipe(switchMapTo(interval(1000)));
}

