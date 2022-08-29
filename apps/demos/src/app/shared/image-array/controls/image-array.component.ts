import { AfterViewInit, Component, ElementRef, Output, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RxEffects } from '@rx-angular/state/effects';
import { Hooks } from '../../debug-helper/hooks';
import { RxState } from '@rx-angular/state';
import { fileReaderFromBlob, imageFromFileReader } from '../pixel-image';

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
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              Select Image
            </mat-expansion-panel-header>
            <div class="w-100 d-flex align-items-center" *ngFor="let imgSet of all; let setIdx = index">
              <img [tabindex]="0" (keydown.enter)="imgSelectionChange$.next($event.target)" [alt]="name" class="mr-2"
                   (click)="imgSelectionChange$.next($event.target)" [src]="'assets/'+name"
                   *ngFor="let name of imgSet[1]; let idx = index">
            </div>
            <button type="button" class="mr-2" mat-raised-button (click)="fileInput.click()">Choose File</button>
            <input hidden #fileInput (change)="filesChange$.next(fileInput.files[0])" type="file">

            <button mat-raised-button class="btn-link" href="http://pixelartmaker.com" target="_blank">Create</button>

          </mat-expansion-panel>


        </div>

      </div>
    </div>
  `,
  providers: [RxEffects, RxState]
})
export class ImageArrayComponent extends Hooks implements AfterViewInit {
  big = [
    'doom-hunter-2.png',
    'reinhardt-reinhardt-reinhardt.png',
    'rainbow-skull.png'
  ].map(n => 'big/' + n);
  monster = [
    'monster-1.png',
    'monster-2.png',
    'monster-3.png',
    'monster-4.png',
    'darth-maul-1.png'
  ].map(n => 'monster/' + n);
  random = [
    'warrior.png',
    'sonic2.png',
    'dragon.png',
    'pokemon.png',
    'duck.png',
    'knight.png',
    'sure.png',
    'maroon.png'
  ];
  koopa = [
    'bowser-jr.png',
    'bowser-jr-clown-car.png',
    'dry-bowser-jr.png',
    'dry-lemmy.png',
    'dry-morton.png',
    'dry-roy.png',
    'iggy-koopa.png',
    'larry-koopa.png',
    'lemmy-koopa.png',
    'ludwig-von-koopa.png',
    'motron-koopa-jr.png',
    'parallel-larry.png',
    'parallel-wendy.png',
    'wendy-koopa.png'
  ].map(n => 'koopa/' + n);
  pokemon = [
    'pokemon-1.png',
    'pokemon-2.png',
    'pokemon-3.png',
    'pokemon-4.png',
    'pokemon-5.png',
    'pokemon-6.png',
    'pokemon-7.png',
    'pokemon-8.png',
    'pokemon-9.png'
  ].map(n => 'pokemon/' + n);
  zombi = [
    'zombi-1.png',
    'zombi-2.png',
    'zombi-3.png',
    'zombi-4.png',
    'zombi-5.png',
    'zombi-6.png'
  ].map(n => 'zombi/' + n);
  superMario = [
    'super-mario-1.png',
    'super-mario-2.png',
    'super-mario-3.png',
    'super-mario-4.png',
    'super-mario-5.png',
    'super-mario-6.png',
    'super-mario-7.png',
    'super-mario-8.png',
    'super-mario-9.png'
  ].map(n => 'super-mario/' + n);

  all = [
    ['superMario', this.superMario],
    ['monster', this.monster],
    ['koopa', this.koopa],
    ['pokemon', this.pokemon],
      ['big', this.big]
  ];

  filesChange$ = new Subject<any>();
  imgSelectionChange$ = new Subject<any>();

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
