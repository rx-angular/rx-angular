import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  EMPTY,
  Observable,
  of,
  range,
  ReplaySubject,
  Subject,
  Subscription,
} from 'rxjs';
import {
  map,
  scan,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { RxState } from '@rx-angular/state';
import { BaseComponent } from '../../base.component.ts/base.component';
import { SourceService } from './source.service';
import { SubscriptionHandlingService } from './subscription.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rx-state-child-selections',
  template: `
    <div class="case-content">
      <form *ngIf="formGroup$ | async as formGroup" [formGroup]="formGroup">
        <mat-form-field *ngFor="let c of formGroup.controls | keyvalue">
          <label>{{ c.key }}</label>
          <input matInput [formControlName]="c.key" />
        </mat-form-field>
      </form>
    </div>
  `,
  changeDetection: environment.changeDetection,
  // providers: [SubscriptionHandlingService]
})
export class RxStateChildSelectionsComponent {
  state$ = new ReplaySubject(1);

  @Input()
  set formGroupModel(modelFromInput: { [key: string]: any }) {
    if (modelFromInput) {
      this.state$.next(modelFromInput);
    }
  }

  formGroup$: Observable<FormGroup> = this.state$.pipe(
    startWith({}),
    map((input) => this.getFormGroupFromConfig(input))
  );

  @Output() formValueChange = this.formGroup$.pipe(
    switchMap((fg: FormGroup) => fg.valueChanges)
  );

  constructor(private fb: FormBuilder) {}

  select(o$: Observable<any>) {
    return o$.pipe(shareReplay(1));
  }

  getFormGroupFromConfig(modelFromInput) {
    const config = Object.entries(modelFromInput).reduce(
      (c, [name, initialValue]) => ({ ...c, [name]: [initialValue] }),
      {}
    );
    return this.fb.group(config);
  }
}
