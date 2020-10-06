import { Component, Input, AfterViewInit } from '@angular/core';
import { environment } from 'apps/demos/src/environments/environment';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { finalize, take, tap } from 'rxjs/operators';

@Component({
  selector: 'rxa-list-toggle-test-component',
  templateUrl: './list-toggle-test-component.component.html',
  styleUrls: ['./list-toggle-test-component.component.scss'],
  changeDetection: environment.changeDetection,
})
export class ListToggleTestComponentComponent implements AfterViewInit {
  private letEmitted = false;
  @Input() type: 'rxLet' | 'push';
  @Input() auto: boolean;

  pushLoading$ = new BehaviorSubject<boolean>(true);
  letLoading$ = new Subject<boolean>();
  done$ = new BehaviorSubject<boolean>(false);

  process$ = timer(1000, 3000);

  constructor() {}

  ngAfterViewInit() {
    if (this.auto) {
      this.process$
        .pipe(
          tap(() =>
            this.type === 'push' ? this.togglePush() : this.toggleLet()
          ),
          take(10),
          finalize(() => {
            this.done$.next(true);
          })
        )
        .subscribe();
    }
  }

  toggleList() {
    this.type === 'push' ? this.togglePush() : this.toggleLet();
  }

  togglePush() {
    this.pushLoading$.next(!this.pushLoading$.getValue());
  }

  toggleLet() {
    if (!this.letEmitted) {
      this.letEmitted = true;
      return this.letLoading$.next(true);
    }

    this.letLoading$ = new Subject();
    this.letEmitted = false;
  }
}
