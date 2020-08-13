import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';

@Component({
  selector: 'demo-basics',
  template: `
    renders: {{ rerenders() }}

    ---

    <button (click)="nativeAngular()">UpdateValue</button>
    <br />
    <button [runOutsideZone] (click)="runOutSideAngular()">
      updatePattern
    </button>
    <br />
    <button [unpatch] (click)="unpatch()">unpatch</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class ComparisonUnpatchComponent {
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
