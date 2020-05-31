import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  getStrategies,
  renderChange,
  render,
  coalesce,
} from '@rx-angular/template';
import { asapScheduler, from, scheduled } from 'rxjs';
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
export class DemoBasicsComponent implements OnInit {
  numRenders = 0;
  strategies;

  constructor(private cdRef: ChangeDetectorRef) {}

  rerenders() {
    return ++this.numRenders;
  }

  rxRenderChange() {
    const resolvedP = Promise.resolve();

    from([1, 2])
      .pipe(
        tap(console.log)
        ///    coalesce(() => scheduled([1], asapScheduler), { context: { } as any })
      )
      .subscribe((v) => console.log('s', v));
    //  scheduled([1], asapScheduler).subscribe((v) => console.log('X', v));

    from(['a', 'b'])
      .pipe(
        tap(console.log)
        //   coalesce(() => scheduled([1], asapScheduler), { context: { } as any })
      )
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
    render(this.strategies.ɵlocal);
    render(this.strategies.ɵlocal);
    render(this.strategies.ɵlocal);
  }

  ngOnInit() {
    this.strategies = getStrategies<number>({ cdRef: this.cdRef });
  }
}
