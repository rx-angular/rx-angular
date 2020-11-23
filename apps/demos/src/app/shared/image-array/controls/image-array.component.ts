import { AfterViewInit, Component, ElementRef, Output, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RxEffects } from '../../rx-effects.service';
import { Hooks } from '../../debug-helper/hooks';
import { RxState } from '@rx-angular/state';
import { fileReaderFromBlob, imageFromFileReader } from '../pixel-image';
import { ImgConverter } from '../image-converter';

interface ComponentState {
  loading: boolean;
  image: HTMLImageElement;
  pixelArray: number[][];
  width: number;
  height: number;
}


@Component({
  selector: 'rxa-image-array',
  template: `
    <div class="row img-row w-100">
      <div class="col-12 d-flex flex-wrap align-items-center">
        <div class="w-100 d-flex flex-row align-items-center flex-wrap mb-3">
          <img [alt]="name" class="mr-2" (click)="imgSelectionChange$.next($event.target)" [src]="'assets/'+name"
               *ngFor="let name of koopas">
          <button type="button" class="mr-2" mat-raised-button (click)="fileInput.click()">Choose File</button>
          <input hidden #fileInput (change)="filesChange$.next(fileInput.files[0])" type="file">

          <button mat-raised-button class="btn-link" href="http://pixelartmaker.com" target="_blank">Create</button>

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
    'maroon.png'
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
    'parallel-wendy.png'
  ];
  filesChange$ = new Subject<any>();
  imgSelectionChange$ = new Subject<any>();
  canvas: HTMLCanvasElement;
  imgConverter: ImgConverter;

  @ViewChild('display')
  display;

  @Output()
  img: Observable<HTMLImageElement> = this.state.select('image');


  constructor(
    private elemRef: ElementRef,
    private rxEf: RxEffects,
    private state: RxState<ComponentState>
  ) {
    super();
    this.state.connect('image', this.filesChange$.pipe(fileReaderFromBlob(), imageFromFileReader()));
    this.state.connect('image', this.imgSelectionChange$);
  }

}
