import { AfterViewInit, Component, Input } from '@angular/core';
import { tap, take, finalize } from 'rxjs/operators';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'rxa-alpha0',
  templateUrl: './alpha-0-toggle.component.html',
  changeDetection: environment.changeDetection,
})
export class Alpha0ToggleComponent implements AfterViewInit {
  @Input() type: 'rxLet' | 'push';
  @Input() auto: boolean;

  pushLoading$ = new BehaviorSubject<boolean>(true);
  letLoading$ = new BehaviorSubject<boolean>(true);
  done$ = new BehaviorSubject<boolean>(false);

  process$ = timer(800, 1000);

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
    this.letLoading$.next(!this.letLoading$.getValue());
  }
}
