import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { Subject } from 'rxjs';
import { ZonePatchedIconComponent } from '../../zone-patched-icon/zone-patched-icon.component';

@Component({
  selector: 'rxa-trigger-provider',
  exportAs: 'rxaTriggerProvider',
  template: ` <button mat-raised-button (click)="next$.next(undefined)">
      Next
      <rxa-zone-patched-icon
        class="mat-icon"
        [zoneState]="getZoneState()"
      ></rxa-zone-patched-icon>
    </button>
    <button mat-raised-button (click)="suspense$.next(undefined)">
      Suspense
      <rxa-zone-patched-icon
        class="mat-icon"
        [zoneState]="getZoneState()"
      ></rxa-zone-patched-icon>
    </button>
    <button
      mat-raised-button
      [unpatch]="unpatched"
      (click)="error$.next(error)"
    >
      Error
      <rxa-zone-patched-icon
        class="mat-icon"
        [zoneState]="getZoneState()"
      ></rxa-zone-patched-icon>
    </button>
    <button
      mat-raised-button
      [unpatch]="unpatched"
      (click)="complete$.next(undefined)"
    >
      Complete
      <rxa-zone-patched-icon
        class="mat-icon"
        [zoneState]="getZoneState()"
      ></rxa-zone-patched-icon>
    </button>
    <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton, ZonePatchedIconComponent, RxUnpatch],
})
export class TriggerProviderComponent {
  suspense$ = new Subject<void>();
  error$ = new Subject<any>();
  complete$ = new Subject<any>();
  next$ = new Subject<any>();

  @Input()
  unpatched;

  @Input()
  error = 'Custom error value';

  constructor() {}

  getZoneState() {
    return this.unpatched?.length === 0 ? 'patched' : 'unpatched';
  }
}
