// tslint:disable:no-unused-expression

import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { isObservable, Observable, of, Subject } from 'rxjs';
import { map, scan, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { RxState, selectSlice } from '@rx-angular/state';
import { Hooks } from '../hooks';

type workType = 'scripting' | 'layouting';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rxa-work',
  template: `
    <p class="type" *rxLet="state$, let s">
      Type: {{s.type}}<br/>
      Base: {{s.base}}<br/>
      Load: {{s.load}}
    </p>
    <div class="w-100 layouting-work">
    </div>
    {{dirtyCheck()}}
  `,
  styleUrls: ['./work.component.scss'],
  providers: [RxState]
})
export class WorkComponent extends Hooks {

  dirtyCheckSubject = new Subject<number>();
  dirtyCheck$ = this.dirtyCheckSubject.pipe(scan(a => ++a, 0));
  state$ = this.state.select();
  iterations$ = this.state.select(
    selectSlice(['base', 'load']),
    map(({ base, load }) => base * load)
  );
  displayElem;

  @Input()
  set load(o: Observable<number> | number) {
    console.log('load', o);
    this.state.connect('load', isObservable(o) ? o : of(o));
  }

  @Input()
  set type(o: Observable<workType> | workType) {
    console.log('type', o);
    this.state.connect('type', isObservable(o) ? o : of(o));
  }


  @Input()
  set base(o: Observable<number> | number) {
    this.state.connect('base', isObservable(o) ? o : of(o));
  }

  constructor(public state: RxState<{ load: number, base: number, type: workType }>,
              private elementRef: ElementRef, private renderer: Renderer2) {
    super();
    this.state.set({
      base: 100,
      load: 1,
      type: 'scripting'
    });

    this.state.hold(this.state.select('type').pipe(
      switchMap(t => {
        const ef$ = this.dirtyCheck$.pipe(toLatestWith([this.iterations$]));
        switch (t) {
          case 'layouting':
            return ef$.pipe(tap(iterations => this.layoutingWork(iterations)));
          case 'scripting':
            return ef$.pipe(tap(iterations => this.scriptingWork(iterations)));
          default:
            return ef$.pipe(tap(iterations => this.scriptingWork(iterations)));
        }
      })
    ));

    this.afterViewInit$.subscribe(() => {
      this.displayElem = this.elementRef.nativeElement.children[1];
    });
  }

  dirtyCheck() {
    this.dirtyCheckSubject.next();
  }

  scriptingWork(iterations: number) {
    console.log('scriptingWork: ', iterations);
    let n = 0;
    while (n < iterations * 10000) {
      n = n + 1;
    }
  }

  layoutingWork(iterations: number) {
    // https://gist.github.com/paulirish/5d52fb081b3570c81e3a
    if (this.displayElem) {
      this.displayElem.offsetLeft;
      this.displayElem.style.background = `rgb(${(30) % 255}, ${(15) % 255}, ${(30) % 255})`;
      for (let x = 0; x < iterations; x++) {

        let c = this.displayElem.children[x];
        if (!c) {
          c = document.createElement('DIV');
          this.displayElem.appendChild(c);
        }
        c.className = 'box';
        c.style.height = '1px';
        c.style.width = 100 / iterations + '%';
        c.style.float = 'left';
        c.style.background = `rgb(${(x + 30) * x % 255}, ${(x + 60) * x % 255}, ${(x + 10) * x % 255})`;
        this.displayElem.offsetLeft;
      }
    }
  }
}

function toColor(n) {
  return;
}

function toLatestWith<I, O>(target$: Observable<O>[]): (o: Observable<I>) => Observable<O> {
  return o$ => o$.pipe(
    withLatestFrom(...target$),
    map(([_, iterations]) => iterations)
  );
}
