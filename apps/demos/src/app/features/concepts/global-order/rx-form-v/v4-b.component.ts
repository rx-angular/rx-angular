import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { FormGhostComponent } from '../../../../shared/ghost-elements';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'rxa-v4-b',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>B<small>v4</small></h1>
      </div>
      <div class="row w-100">
        <div class="col">
          <button [unpatch] mat-raised-button (click)="valueChange.next(1)">
            increment
          </button>
          <form [formGroup]="form">
            <label for="phone"
              >Value
              <span *ngIf="!form.get('value').valid"
                >- {{ form.get('value').value }}</span
              >
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              formControlName="value"
              #value
            />
          </form>
        </div>
      </div>
      <div class="row w-100">
        <div class="col"></div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class V4BComponent {
  form = this.fb.group({ value: ['t', Validators.minLength(2)] });

  @Output()
  valueChange = new Subject<number>();

  constructor(private fb: UntypedFormBuilder) {}
}
