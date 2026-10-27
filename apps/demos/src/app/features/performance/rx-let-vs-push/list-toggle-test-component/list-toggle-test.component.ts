import { AfterViewInit, Component, Input } from '@angular/core';
import { RxLet } from '@rx-angular/template/let';
import { RxPush } from '@rx-angular/template/push';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { finalize, take, tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { PushPipe } from '../../../../rx-angular-pocs/template/pipes/push/push.pipe';
import { RenderingWorkComponent } from '../../../../shared/debug-helper/rendering-work/rendering-work/rendering-work.component';

@Component({
  selector: 'rxa-list-toggle-test',
  templateUrl: './list-toggle-test.component.html',
  changeDetection: environment.changeDetection,
  imports: [RenderingWorkComponent, RxLet, RxPush, PushPipe],
})
export class ListToggleTestComponent implements AfterViewInit {
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
            this.type === 'push' ? this.togglePush() : this.toggleLet(),
          ),
          take(10),
          finalize(() => {
            this.done$.next(true);
          }),
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
