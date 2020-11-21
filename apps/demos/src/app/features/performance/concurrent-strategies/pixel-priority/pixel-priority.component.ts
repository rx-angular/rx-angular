import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { StrategyProvider } from '../../../../shared/rx-angular-pocs/render-stragegies/strategy-provider.service';
import { map } from 'rxjs/operators';
import { ImgInfo } from '../../../../shared/image-array';
import { computeColorPrio } from '../../../../shared/image-array/pixel-image';

@Component({
  selector: 'rxa-concurrent-strategies',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h1 class="mat-headline">Pixels with priorities</h1>
        <div class="row">
          <div class="col-12 d-flex">
            <!-- <mat-form-field class="mr-2">
              <mat-label>Pixel Size</mat-label>
              <input matInput #i type="number" *rxLet="pixelSize$; let size" [value]="size" (input)="pixelSize$.next(i.value)">
            </mat-form-field> -->
            <rxa-image-array (imageChange)="imgInfoChange$.next($event)"></rxa-image-array>
          </div>
          <div class="col-12 d-flex flex-wrap">
            <rxa-color-prio class="w-100" [colors$]="colors$"></rxa-color-prio>
          </div>
        </div>
      </ng-container>
      <div class="col-12 d-flex">
        <button *rxLet="pixelArray$; let a" style="width: 200px" mat-raised-button color="primary" [unpatch] (click)="filled$.next(!filled$.getValue())">
          Repaint {{a?.length}} Components
        </button>
        <rxa-sibling-pixel-img
          [pixelSize]="pixelSize$"
                               [imgWidth]="imgWidth$"
                               [colorPriority]="colors$"
                               [pixelArray]="pixelArray$"
                               [filled]="filled$">
        </rxa-sibling-pixel-img>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class PixelPriorityComponent {
  selectedStrategies: { [name: string]: boolean } = {};

  imgInfoChange$ = new Subject<ImgInfo>();

  pixelSize$ = new BehaviorSubject<string>('3');
  imgWidth$ = this.imgInfoChange$.pipe(map(d => d.width));
  colors$ = this.imgInfoChange$.pipe(map(r => computeColorPrio(r.colors)));
  pixelArray$ = this.imgInfoChange$.pipe(map(d => d.pixelArray));
  filled$ = new BehaviorSubject<boolean>(true);

  constructor(public strategyProvider: StrategyProvider) {
  }

  visible(choice) {
    return this.selectedStrategies[choice] === true;
  }

}
