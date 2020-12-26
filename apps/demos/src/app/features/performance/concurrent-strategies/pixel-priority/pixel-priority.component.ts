import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { createImageConverter } from '../../../../shared/image-array';
import { computeColorPrio } from '../../../../shared/image-array/pixel-image';
import { RxEffects } from '../../../../shared/rx-effects.service';

@Component({
  selector: 'rxa-concurrent-strategies',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h1 class="mat-headline">Pixels with priorities</h1>
        <rxa-image-array (img)="imgChange$.next($event)" class="mb-2"></rxa-image-array>
      </ng-container>
      <div class="w-100 d-flex flex-wrap">
        <div class="w-100 mb-2">
          <mat-progress-bar *ngIf="imgConverter?.loading$ | push" [mode]="'buffer'"></mat-progress-bar>

          <rxa-color-prio class="w-100" [colors$]="colors$"></rxa-color-prio>
        </div>
        <div class="w-100 d-flex flex-fill mb-5">
          <div class="d-flex flex-wrap mr-2" style="width: 300px">
            <rxa-canvas-view style="width: 100px" [img$]="imgChange$"></rxa-canvas-view>

            <mat-form-field class="mr-2 w-100" *rxLet="pixelSize$; let size">
              <mat-label>Pixel Size {{size}}</mat-label>
              <input matInput [unpatch] #i type="number"
                     (input)="pixelSize$.next(i.value)" [value]="size">
            </mat-form-field>
            <mat-form-field class="mr-2 w-100" *rxLet="fillColor$; let fillColor">
              <mat-label>Overlay Color {{fillColor}}</mat-label>
              <input matInput [unpatch] #i type="color" [value]="fillColor"
                     (input)="fillColor$.next(i.value)">
            </mat-form-field>
            <button *rxLet="pixelArray$; let a" style="width: 200px" mat-raised-button color="primary" [unpatch]
                    (click)="filled$.next(!filled$.getValue())">
              Repaint {{a?.length}} Components
            </button>
          </div>
          <div>
            <rxa-sibling-pixel-img
              [pixelSize]="pixelSize$"
              [imgInfo]="imgInfoChange$"
              [filled]="filled$"
              [fillColor]="fillColor$">
            </rxa-sibling-pixel-img>
          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxEffects]
})
export class PixelPriorityComponent {
  selectedStrategies: { [name: string]: boolean } = {};

  filled$ = new BehaviorSubject<boolean>(true);
  fillColor$ = new BehaviorSubject<string>('#ff0000');
  pixelSize$ = new BehaviorSubject<string>('3');

  imgChange$ = new Subject<HTMLImageElement>();
  imgConverter = createImageConverter();
  imgInfoChange$ = this.imgConverter.imgInfoChange$;
  colors$ = this.imgInfoChange$.pipe(map(r => computeColorPrio(r.colors)));
  pixelArray$ = this.imgInfoChange$.pipe(map(d => d.pixelArray));

  constructor(public rxEf: RxEffects) {
    this.rxEf.hold(this.imgChange$, (img: CanvasImageSource) => this.imgConverter.renderImage(img));
  }

  visible(choice) {
    return this.selectedStrategies[choice] === true;
  }

}
