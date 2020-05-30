import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { getStrategies, renderChangeWith } from '@rx-angular/template';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'demo-basics',
  template: `
    renders: {{ rerenders() }}
    <button (click)="renderChange()">renderChange</button>
    <button (click)="rxRenderChange()">rxRenderChange</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoBasicsComponent {
  numRenders = 0;
  strategies;

  constructor(private cdRef: ChangeDetectorRef) {
    this.strategies = getStrategies<number>({ cdRef });
  }

  rerenders() {
    return ++this.numRenders;
  }

  rxRenderChange() {
    const resolvedP = Promise.resolve();

    from([1, 2])
      .pipe(tap(console.log), renderChangeWith(this.strategies.ɵlocal))
      .subscribe((v) => console.log('s', v));
    from(['a', 'b'])
      .pipe(tap(console.log), renderChangeWith(this.strategies.ɵlocal))
      .subscribe((v) => console.log('s', v));
    /*
    from([1, 2]).pipe(tap(console.log), debounce(() => from(getUnpatchedResolvedPromise()).pipe(observeOn(asapScheduler)))).subscribe(v => console.log('s', v));
    from(['a', 'b']).pipe(tap(console.log), debounce(() => from(getUnpatchedResolvedPromise()).pipe(observeOn(asapScheduler)))).subscribe(v => console.log('s', v));

    // Received: 1,2,s 2, a,b,s b
    // Expected: 1,2,a,b,s 2,s b

    console.log('1');
    console.log('2');
    Promise.resolve('2').then((v) => console.log('p', v));
    console.log('a');
    console.log('b');
    Promise.resolve('b').then((v) => console.log('p', v));
    // Received: 1,2,a,b,p 2,p b
    // Expected: 1,2,a,b,p 2,p b

     */
  }

  renderChange() {
    renderChangeWith(this.strategies.ɵlocal);
    renderChangeWith(this.strategies.ɵlocal);
    renderChangeWith(this.strategies.ɵlocal);
  }
}
