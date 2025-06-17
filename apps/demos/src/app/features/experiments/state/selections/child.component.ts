import { Component, Input, Output } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable, ReplaySubject } from 'rxjs';
import { map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'rxa-state-child-selections',
  template: `
    <div class="case-content">
      @if (formGroup$ | async; as formGroup) {
        <form [formGroup]="formGroup">
          @for (c of formGroup.controls | keyvalue; track c) {
            <mat-form-field>
              <label>{{ c.key }}</label>
              <input matInput [formControlName]="c.key" />
            </mat-form-field>
          }
        </form>
      }
    </div>
  `,
  changeDetection: environment.changeDetection,
  standalone: false,
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
    map((input) => this.getFormGroupFromConfig(input)),
  );

  @Output() formValueChange = this.formGroup$.pipe(
    switchMap((fg: UntypedFormGroup) => fg.valueChanges),
  );

  constructor(private fb: UntypedFormBuilder) {}

  select(o$: Observable<any>) {
    return o$.pipe(shareReplay(1));
  }

  getFormGroupFromConfig(modelFromInput) {
    const config = Object.entries(modelFromInput).reduce(
      (c, [name, initialValue]) => ({ ...c, [name]: [initialValue] }),
      {},
    );
    return this.fb.group(config);
  }
}
