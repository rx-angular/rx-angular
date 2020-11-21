import { AfterViewInit, Component, ElementRef, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RxEffects } from '../../rx-effects.service';
import { Hooks } from '../../debug-helper/hooks';
import { RxState } from '@rx-angular/state';
import { fileReaderFromBlob, imageFromFileReader } from '../pixel-image';
import { ImgInfo } from '../model';
import { createImageConverter, ImgConverter } from '../image-converter';

interface ComponentState {
  loading: boolean;
  image: CanvasImageSource;
  pixelArray: number[][];
  width: number;
  height: number;
}


@Component({
  selector: 'rxa-image-array',
  template: `

    <input #fileInput (change)="filesChange$.next(fileInput.files[0])" type="file">
    <mat-progress-bar [mode]="'buffer'" *ngIf="imgConverter?.loading$ | push"></mat-progress-bar>
    <br>
    <div class="display">
      <!-- canvas bootstrapped here-->
    </div>
    <!--
        http://pixelartmaker.com
    http://pixelartmaker.com/gallery
    -->
  `,
  styles: [`
    .pixel-canvas {
      border: 1px solid red;
    }
  `],
  providers: [RxEffects, RxState]
})
export class ImageArrayComponent extends Hooks implements AfterViewInit {

  filesChange$ = new Subject<any>();
  canvas: HTMLCanvasElement;
  imgConverter: ImgConverter;


  @Output()
  imageChange: Observable<ImgInfo> = this.afterViewInit$.pipe(
    switchMap(() => this.imgConverter.imgInfoChange$)
  );

  constructor(
    private elemRef: ElementRef,
    private rxEf: RxEffects,
    private state: RxState<ComponentState>
  ) {
    super();
    this.state.connect('image', this.filesChange$.pipe(fileReaderFromBlob(), imageFromFileReader()));
    this.rxEf.hold(this.state.select(map(s => s.image)), (img: CanvasImageSource) => this.imgConverter.renderImage(img));

    this.rxEf.hold(this.afterViewInit$, () => {
      this.setupCanvas(this.elemRef.nativeElement.children[2], 50, 50);
      this.setupConverter();
    });
  }

  setupCanvas(parent: HTMLElement, w: number, h: number) {
    this.canvas = document.createElement('canvas') as HTMLCanvasElement;
    this.canvas.width = w;
    this.canvas.height = h;
    this.canvas.className = 'pixel-canvas';
    parent.appendChild(this.canvas);
  }

  setupConverter(): void {
    this.imgConverter = createImageConverter(this.canvas);
  }

}
