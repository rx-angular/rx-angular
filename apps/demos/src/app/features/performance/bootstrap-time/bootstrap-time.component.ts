import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxa-bootstrap-time',
  styleUrls: ['./bootstrap-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <button
        class="padding"
        id="pureComponent"
        (click)="toggle('pureComponent')"
      >
        Pure Component
      </button>
      <button
        class="padding"
        id="injectService"
        (click)="toggle('injectService')"
      >
        Inject Service
      </button>
      <button
        class="padding"
        id="extendService"
        (click)="toggle('extendService')"
      >
        Extend Service
      </button>
      <button class="padding" id="injectState" (click)="toggle('injectState')">
        Inject State
      </button>
      <button class="padding" id="extendState" (click)="toggle('extendState')">
        Extend State
      </button>
      <button class="padding" id="asyncPipe" (click)="toggle('asyncPipe')">
        Async Pipe
      </button>
      <button class="padding" id="pushPipe" (click)="toggle('pushPipe')">
        Push Pipe
      </button>
      <button
        class="padding"
        id="letDirective"
        (click)="toggle('letDirective')"
      >
        Let Directive
      </button>
    </div>
    <rxa-bootstrap-pure *ngIf="pureComponent"></rxa-bootstrap-pure>
    <rxa-bootstrap-service-inject
      *ngIf="injectService"
    ></rxa-bootstrap-service-inject>
    <rxa-bootstrap-service-extend
      *ngIf="extendService"
    ></rxa-bootstrap-service-extend>
    <rxa-bootstrap-state-inject
      *ngIf="injectState"
    ></rxa-bootstrap-state-inject>
    <rxa-bootstrap-state-extend
      *ngIf="extendState"
    ></rxa-bootstrap-state-extend>
    <rxa-bootstrap-async-pipe *ngIf="asyncPipe"></rxa-bootstrap-async-pipe>
    <rxa-bootstrap-push-pipe *ngIf="pushPipe"></rxa-bootstrap-push-pipe>
    <rxa-bootstrap-let-directive
      *ngIf="letDirective"
    ></rxa-bootstrap-let-directive>
  `,
})
export class BootstrapTimeComponent {
  value: string;
  letDirective: boolean;
  pushPipe: boolean;
  asyncPipe: boolean;
  extendState: boolean;
  injectState: boolean;
  extendService: boolean;
  injectService: boolean;
  pureComponent: boolean;

  setValue(val) {
    this.value = val;
  }

  toggle(name: string) {
    this[name] = !this[name];
  }
}
