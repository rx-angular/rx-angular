import { AfterViewInit, Component, ElementRef, Output, ViewChild } from '@angular/core';
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
    <div class="row img-row w-100">
      <div class="col-12">
        <mat-progress-bar *ngIf="imgConverter?.loading$ | push" [mode]="'buffer'"></mat-progress-bar>
      </div>
      <div class="col-12 d-flex flex-wrap align-items-center">
        <div class="w-100 d-flex flex-row align-items-center flex-wrap mb-3">
          <img [alt]="name" class="mr-2" (click)="imgSelectionChange$.next($event.target)" [src]="'assets/'+name"
               *ngFor="let name of koopas">
          <button type="button" class="mr-2" mat-raised-button (click)="fileInput.click()">Choose File</button>
          <input hidden #fileInput (change)="filesChange$.next(fileInput.files[0])" type="file">

          <button mat-raised-button class="btn-link" href="http://pixelartmaker.com" target="_blank">Create</button>

        </div>
        <div #display class="dh-embedded-view mb-5">
          <!-- canvas bootstrapped here-->
        </div>
      </div>
    </div>
  `,
  styles: [`
    .progress-bar-row {
      height: 4px;
    }

    .progress-bar-row mat-progress-bar {
      width: 200px;
    }

    .img-row img, .img-row .upload-display {
      max-height: 100px;
      width: auto;
      cursor: pointer;
    }
  `],
  providers: [RxEffects, RxState]
})
export class ImageArrayComponent extends Hooks implements AfterViewInit {

  images = [
    'warrior.png',
    'sonic2.png',
    'dragon.png',
    'pokemon.png',
    'duck.png',
    'knight.png',
    'sure.png',
    'maroon.png',
  ];
  koopas = [
    'bowser-jr.png',
    'bowser-jr-clown-car.png',
    'dry-bowser-jr.png',
    'dry-lemmy.png',
    'dry-roy.png',
    'iggy-koopa.png',
    'lemmy-koopa.png',
    'motron-koopa-jr.png',
    'roy-koopa.png',
    'ludwig-von-koopa.png',
    'wendy-koopa.png',
    'parallel-larry.png',
    'parallel-wendy.png',
  ];
  filesChange$ = new Subject<any>();
  imgSelectionChange$ = new Subject<any>();
  canvas: HTMLCanvasElement;
  imgConverter: ImgConverter;

  @ViewChild('display')
  display;

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
    this.state.connect('image', this.imgSelectionChange$);
    this.rxEf.hold(this.state.select(map(s => s.image)), (img: CanvasImageSource) => this.imgConverter.renderImage(img));

    this.rxEf.hold(this.afterViewInit$, () => {
      this.setupCanvas(this.display.nativeElement, 50, 50);
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
