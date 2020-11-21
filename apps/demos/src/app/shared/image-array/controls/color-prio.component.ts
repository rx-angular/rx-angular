import { AfterViewInit, Component, ElementRef, Input, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RxEffects } from '../../rx-effects.service';
import { Hooks } from '../../debug-helper/hooks';
import { RxState } from '@rx-angular/state';
import { fileReaderFromBlob, imageFromFileReader} from '../pixel-image';
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
  selector: 'rxa-color-prio',
  template: `
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <div class="mr-1" style="width: 15px; height: 15px;" [style.background]="i.key" *ngFor="let i of colors$ | push | keyvalue">
          &nbsp;
        </div>
      </mat-expansion-panel-header>
      <div class="w-100 d-flex flex-wrap strategy-multiselect">
        <div class="d-flex w-25" *ngFor="let i of colors$ | push | keyvalue">
          <div class="mr-1" style="width: 15px; height: 15px;" [style.background]="i.key">
            &nbsp;
          </div>
          <span class="pt-1" style="line-height: 15px; font-size: 10px">{{ i.value }}</span>
        </div>
      </div>
    </mat-expansion-panel>
  `,
})
export class ColorPrioComponent  {
  @Input()
  colors$: Observable<Map<string, string>>
}
