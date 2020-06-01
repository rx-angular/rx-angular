import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { getStrategies, renderChange } from '@rx-angular/template';
import { concat, from, NEVER, Observable } from 'rxjs';

@Component({
  selector: 'demo-basics',
  template: `
    renders: {{ rerenders() }}
    <button (click)="renderChange()">renderChange</button>
    <button (click)="rxRenderChange()">rxRenderChange</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoBasicsComponent implements OnInit {
  numRenders = 0;
  strategies;

  constructor(private cdRef: ChangeDetectorRef) {}

  rerenders() {
    return ++this.numRenders;
  }

  rxRenderChange() {
    const resolvedP = Promise.resolve();

    toNever(from([1, 2]))
      .pipe(renderChange(this.strategies.ɵlocal))
      .subscribe((v) => console.log('s', v));
    toNever(from(['a', 'b']))
      .pipe(renderChange(this.strategies.ɵlocal))
      .subscribe((v) => console.log('s', v));
    toNever(from(['§', '$']))
      .pipe(renderChange(this.strategies.ɵlocal))
      .subscribe((v) => console.log('s', v));
    toNever(from(['ü', 'ä']))
      .pipe(renderChange(this.strategies.ɵlocal))
      .subscribe((v) => console.log('s', v));
  }

  renderChange() {
    this.strategies.ɵlocal.renderStatic();
    this.strategies.ɵlocal.renderStatic();
    this.strategies.ɵlocal.renderStatic();
    this.strategies.ɵlocal.renderStatic();
  }

  ngOnInit() {
    this.strategies = getStrategies<number>({ cdRef: this.cdRef });
  }
}

function toNever<T>(o: Observable<T>): Observable<T> {
  return concat(o, NEVER);
}
