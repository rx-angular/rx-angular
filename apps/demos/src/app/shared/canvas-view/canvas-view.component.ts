import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Hooks } from '../debug-helper/hooks';
import { Observable } from 'rxjs';
import { RxState } from '../../../../../../libs/state/src/lib';

@Component({
  selector: 'rxa-canvas-view',
  template: `
    <div #display>
      <!-- canvas bootstrapped here-->
    </div>
  `,
  host: {
    class: 'd-block w-100'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class CanvasViewComponent extends Hooks {

  canvas: HTMLCanvasElement;

  @Input()
  set img$(img$: Observable<HTMLImageElement>) {
    this.rxState.connect('img', img$);
  }

  @ViewChild('display')
  display;

  constructor(
    private elemRef: ElementRef,
    private rxState: RxState<{ img: HTMLImageElement }>
  ) {
    super();
    this.rxState.hold(this.afterViewInit$, () => {
      this.setupCanvas(this.display.nativeElement, 50, 50);
    });
    this.rxState.hold(this.rxState.select('img'), (img) => {
      this.canvas.width = img.width;
      this.canvas.height = img.height;
      this.canvas.getContext('2d').drawImage(img, 0, 0);
    });
  }

  setupCanvas(parent: HTMLElement, w: number, h: number) {
    this.canvas = document.createElement('canvas') as HTMLCanvasElement;
    this.canvas.width = w;
    this.canvas.height = h;
    this.canvas.className = 'pixel-canvas';
    parent.appendChild(this.canvas);
  }

}
