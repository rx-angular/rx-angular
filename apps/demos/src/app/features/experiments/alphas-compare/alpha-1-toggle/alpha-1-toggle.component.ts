import { AfterViewInit, Component, Input } from '@angular/core';
import { tap, take, finalize } from 'rxjs/operators';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'rxa-alpha1',
  templateUrl: './alpha-1-toggle.component.html',
  changeDetection: environment.changeDetection,
})
export class Alpha1ToggleComponent implements AfterViewInit {
  private letEmitted = false;
  @Input() type: 'rxLet' | 'push';
  @Input() auto: boolean;

  pushLoading$ = new BehaviorSubject<boolean>(true);
  letLoading$ = new Subject<boolean>();
  done$ = new BehaviorSubject<boolean>(false);

  process$ = timer(1000, 2000);

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
