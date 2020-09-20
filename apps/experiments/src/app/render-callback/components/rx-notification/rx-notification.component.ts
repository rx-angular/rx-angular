import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { RxState } from '@rx-angular/state';
import { RxNotification } from '@rx-angular/template';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'rx-notification',
  templateUrl: './rx-notification.component.html',
  styleUrls: ['./rx-notification.component.scss']
})
export class RxNotificationComponent extends RxState<{ notification: RxNotification }>{

  notification$ = this.select('notification');
  @Input()
  log = false;

  @Input()
  set notification(notification$: Observable<RxNotification>) {
    this.connect('notification', notification$.pipe(
      tap((v) => {
        if(this.log) {
          console.log('notification:', v)
        }
      }))
    )
  }

}
