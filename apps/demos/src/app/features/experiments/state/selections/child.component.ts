import { Component, Input, Output } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable, ReplaySubject } from 'rxjs';
import { map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'rxa-state-child-selections',
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

  formGroup$: Observable<UntypedFormGroup> = this.state$.pipe(
    startWith({}),
    map((input) => this.getFormGroupFromConfig(input))
  );

  @Output() formValueChange = this.formGroup$.pipe(
    switchMap((fg: UntypedFormGroup) => fg.valueChanges)
  );

  constructor(private fb: UntypedFormBuilder) {}

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
