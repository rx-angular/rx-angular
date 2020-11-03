import { Component, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { RxEffects } from '../../../../shared/rx-effects.service';
import { switchMapTo, takeUntil, tap } from 'rxjs/operators';
import { Hooks } from '../../../../shared/debug-helper/hooks';

@Component({
  selector: 'rxa-drag-n-drop',
  template: `
    <div class="container" (mousemove)="mouseMove$.next($event)" (mouseup)="mouseUp$.next($event)">
      <div class="box" (mousedown)="mouseDown$.next($event)"></div>
    </div>`,
  styles: [`
    .container {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .box {
      top: 0;
      left: 0;
      position: absolute;
      background-color: red;
      width: 200px;
      height: 200px;
    }
  `],
  providers: [RxEffects]
})
export class DragNDropComponent extends Hooks {

  mouseDown$ = new Subject<Event>();
  mouseMove$ = new Subject<Event>();
  mouseUp$ = new Subject<Event>();

  constructor(private rxEf: RxEffects, private elem: ElementRef) {
    super();

    this.rxEf.hold(
      this.afterViewInit$.pipe(
        switchMapTo(this.mouseDown$.pipe(
          switchMapTo(this.mouseMove$.pipe(
            tap((e: any) => {
              const el = this.elem.nativeElement.children[0].children[0];
              el.style.top = `${e.offsetY - 100}px`;
              el.style.left = `${e.offsetX - 100}px`;
            }),
            takeUntil(this.mouseUp$)
          ))
          )
        )
      )
    );
  }


}
