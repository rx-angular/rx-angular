import {
  Component,
  computed,
  effect,
  inject,
  Injector,
  signal,
  untracked,
} from '@angular/core';
import { Subject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'rxa-let-template-binding-signal-example',
  template: `
    <mat-card class="card">
      <mat-card-header>
        <h1>Signal</h1>
        <button class="btn-reset" mat-button (click)="reset()">
          <mat-icon>refresh</mat-icon>RESET
        </button>
      </mat-card-header>

      <mat-card-content>
        <div
          *rxLet="
            value;
            let count;
            strategy: visibleStrategy;
            complete: complete;
            error: error;
            suspense: suspense
          "
        >
          value emitted
          <h2>{{ count | json }}</h2>
        </div>
      </mat-card-content>

      <mat-card-actions>
        <button mat-button [unpatch] (click)="value.set(random())">NEXT</button>
        <button mat-button (click)="setError()">ERROR</button>
      </mat-card-actions>
    </mat-card>

    <ng-template #complete let-value>
      <div>
        <mat-icon class="notification-icon complete-icon">thumb_up</mat-icon>
        <h2>Completed!</h2>
        <strong>Last valid value: {{ value }}</strong>
      </div>
    </ng-template>
    <ng-template #error let-value let-error="$error">
      <div>
        <mat-icon class="error-icon">thumb_down</mat-icon>
        <h2>{{ error }}</h2>
        <strong>Last valid value: {{ value }}</strong>
      </div>
    </ng-template>
    <ng-template #suspense>
      <mat-progress-spinner
        [diameter]="80"
        [color]="'primary'"
        [mode]="'indeterminate'"
      ></mat-progress-spinner>
    </ng-template>
  `,
  styles: [
    `
      h1 {
        margin: 0;
      }

      mat-card-content {
        min-height: 10rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .notification-icon {
        font-size: 5rem;
        height: initial;
        width: initial;
      }

      .btn-reset {
        margin-left: 2rem;
      }

      .card {
        margin: 2rem;
        text-align: center;
        width: 20rem;
      }

      .complete-icon {
        color: forestgreen;
      }

      .error-icon {
        color: darkred;
      }
    `,
  ],
  standalone: false,
})
export class LetTemplateBindingSignalExampleComponent {
  errorStub = new Error('Template observable error!');
  visibleStrategy = 'local';

  private injector = inject(Injector);

  value = signal<number | undefined>(undefined);

  valueCount = signal(0);

  constructor() {
    // this.reset();
    // effect(() => {
    //   this.value();
    //   untracked(() => {
    //     this.valueCount.update((v) => v + 1);
    //   })
    // });
  }

  random() {
    return Math.random();
  }

  reset() {
    this.value = signal(undefined);
  }

  setError() {
    const sub = new Subject<number>();
    const lastValue = this.value();
    // @ts-ignore
    this.value = toSignal(sub, { injector: this.injector });

    setTimeout(() => sub.next(lastValue), 1);
    setTimeout(() => sub.error('Best Error!'), 2);
  }
}
