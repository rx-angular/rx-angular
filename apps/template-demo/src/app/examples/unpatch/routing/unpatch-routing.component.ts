import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';

@Component({
  selector: 'demo-basics',
  template: `
    renders: {{ rerenders() }}

    ---

    <button (click)="nativeAngular()">Native Angular</button>
    <br />
    <button [runOutsideZone] (click)="runOutSideAngular()">
      Zone Run Outside Angular
    </button>
    <br />
    <button [unpatch] (click)="unpatch()">Rx-Angular Unpatch</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: []
})
export class UnpatchRoutingComponent {
  numRenders = 0;

  constructor(private cdRef: ChangeDetectorRef) {}

  nativeAngular() {
    console.log('nativeAngular');
  }
  runOutSideAngular() {
    console.log('runOutSideAngular');
  }
  unpatch() {
    console.log('unpatch');
  }

  rerenders() {
    return ++this.numRenders;
  }
}
