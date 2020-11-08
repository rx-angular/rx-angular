import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxa-bootstrap-time',
  styleUrls: ['./bootstrap-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <label class="padding">
        <input
          type="radio"
          name="components"
          value="none"
          (click)="setValue('none')"
          checked
        />
        None
      </label>
      <label class="padding">
        <input
          type="radio"
          name="components"
          (click)="setValue('pureComponent')"
          value="pure"
        />
        Pure Component
      </label>
      <label class="padding">
        <input
          type="radio"
          name="components"
          (click)="setValue('injectService')"
          value="injectService"
        />
        Inject Service
      </label>
      <label class="padding">
        <input
          type="radio"
          (click)="setValue('extendService')"
          name="components"
          value="extendService"
        />
        Extend Service
      </label>
      <label class="padding">
        <input
          type="radio"
          (click)="setValue('injectState')"
          name="components"
          value="injectState"
        />
        Inject State
      </label>
      <label class="padding">
        <input
          type="radio"
          (click)="setValue('extendState')"
          name="components"
          value="extendState"
        />
        Extend State
      </label>
      <label class="padding">
        <input
          type="radio"
          (click)="setValue('asyncPipe')"
          name="components"
          value="asyncPipe"
        />
        Async Pipe
      </label>
      <label class="padding">
        <input
          type="radio"
          (click)="setValue('pushPipe')"
          name="components"
          value="pushPipe"
        />
        Push Pipe
      </label>
      <label class="padding">
        <input
          type="radio"
          (click)="setValue('letDirective')"
          name="components"
          value="letDirective"
        />
        Let Directive
      </label>
    </div>
    <rxa-bootstrap-pure *ngIf="value === 'pureComponent'"></rxa-bootstrap-pure>
    <rxa-bootstrap-service-inject
      *ngIf="value === 'injectService'"
    ></rxa-bootstrap-service-inject>
    <rxa-bootstrap-service-extend
      *ngIf="value === 'extendService'"
    ></rxa-bootstrap-service-extend>
    <rxa-bootstrap-state-inject
      *ngIf="value === 'injectState'"
    ></rxa-bootstrap-state-inject>
    <rxa-bootstrap-state-extend
      *ngIf="value === 'extendState'"
    ></rxa-bootstrap-state-extend>
    <rxa-bootstrap-async-pipe
      *ngIf="value === 'asyncPipe'"
    ></rxa-bootstrap-async-pipe>
    <rxa-bootstrap-push-pipe
      *ngIf="value === 'pushPipe'"
    ></rxa-bootstrap-push-pipe>
    <rxa-bootstrap-let-directive
      *ngIf="value === 'letDirective'"
    ></rxa-bootstrap-let-directive>
  `,
})
export class BootstrapTimeComponent {
  value: string;

  setValue(val) {
    this.value = val;
  }
}
