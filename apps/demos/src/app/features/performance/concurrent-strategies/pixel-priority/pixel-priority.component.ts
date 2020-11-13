import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { StrategyProvider } from '../../../../shared/rx-angular-pocs/render-stragegies/strategy-provider.service';
import { PixelArrayData } from '../../../../shared/image-array/image-array/image-array.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rxa-concurrent-strategies',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h1 class="mat-headline">Concurrent Strategies</h1>
        <div class="row">
          <div class="col-12 d-flex">
            <mat-form-field class="mr-2">
              <mat-label>Pixel Size</mat-label>
              <input matInput #i type="number" [value]="pixelSize$ | push" (input)="pixelSize$.next(i.value)">
            </mat-form-field>
            <rxa-image-array
              (imageChange)="pixelDataChange$.next($event)"></rxa-image-array>
            <img width="32px" height="32px" src="./assets/aaa.png">
            <button mat-button [unpatch] (click)="filled$.next(!filled$.getValue())">
              do change
            </button>


          </div>
          <div class="col-12">
            <!--
             <div style="width: 15px; height: 15px;" *ngFor="let c of colors$ | push" [style.background]="c">
            &nbsp;{{ c }}
          </div>
            <div class="w-100 strategy-multiselect">
              <mat-select #i [value]="strategyProvider.primaryStrategy" *ngFor="let color of colors$ | push"
                          (valueChange)="strategyProvider.primaryStrategy = i.value">
                <mat-select-trigger>
                  {{ color }}
                  <div [style.background]="color">{{ color }}</div>
                </mat-select-trigger>
                <mat-option
                  [value]="s"
                  *ngFor="let s of strategyProvider.strategyNames">
                 {{ s }}
                </mat-option>
              </mat-select>
              <mat-selection-list #c *ngFor="let strategy of strategyProvider.strategyNames"
                            (change)="selectedStrategies[strategy] = c.checked">
                {{strategy}}
              </mat-selection-list>
            </div>
            -->
          </div>
        </div>
      </ng-container>
      <div class="w-100">
        <h2 class="mat-subheader">Image</h2>
        <div class="d-flex w-100 flex-wrap">

        </div>
        <rxa-sibling-pixel-img [pixelSize]="pixelSize$"
                               [imgWidth]="imgWidth$"
                               [pixelArray]="pixelArray$"
                               [filled]="filled$"></rxa-sibling-pixel-img>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  styles: [`
    .strategy-multiselect {
      display: flex;
      flex-wrap: wrap;
    }

    .strategy-multiselect .mat-checkbox {
      flex-grow: 1;
      width: 200px;
    }
  `]
})
export class PixelPriorityComponent {
  selectedStrategies: { [name: string]: boolean } = {};

  colors$ = new BehaviorSubject<number[][]>([]);
  pixelDataChange$ = new Subject<PixelArrayData>();


  pixelSize$ = new BehaviorSubject<string>('3');
  imgWidth$ = this.pixelDataChange$.pipe(map(d => d.width));
  pixelArray$ = this.pixelDataChange$.pipe(map(d => d.pixelArray));
  filled$ = new BehaviorSubject<boolean>(true);

  constructor(public strategyProvider: StrategyProvider) {
  }

  visible(choice) {
    return this.selectedStrategies[choice] === true;
  }

}
