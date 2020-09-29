import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { ConnectableObservable, isObservable, Observable, of, ReplaySubject, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, publish, scan, switchAll, switchMap, tap } from 'rxjs/operators';
import { isObject } from 'util';
import { Hooks } from '../hooks';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rxa-renders',
  template: `
    <div class="renderings" matRipple [matRippleColor]="color" [matRippleRadius]="radius">
      {{ numRenders$ | push }}
    </div>
  `,
  styleUrls: ['./renderings.component.scss']
})
export class RenderingsComponent extends Hooks {
  sub: Subscription;

  @ViewChild(MatRipple) ripple: MatRipple;
  changeO$ = new ReplaySubject<Observable<any>>(1);
  numRenders$ = this.afterViewInit$.pipe(
    switchMap(() => this.changeO$.pipe(
    distinctUntilChanged(),
    switchAll(),
   // distinctUntilChanged(),
    scan(n => ++n, 0),
    tap(() => this.ripple.launch({ centered: true }))
  )))
  @Input()
  radius = 40;

  @Input()
  color = 'rgba(253,255,0,0.24)'

  @Input()
  set value$(v$: Observable<any> | any) {
    if(isObservable(v$)) {
      this.changeO$.next(v$);
    }
    this.changeO$.next(of(v$));
  };

  constructor() {
    super();
    this.afterViewInit$.subscribe(() => this.ripple.launch({ centered: true }))
  }

}
