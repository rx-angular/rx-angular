import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { RX_CUSTOM_STRATEGIES, RX_PRIMARY_STRATEGY } from '../../rx-angular-pocs/render-stragegies';
import { RxState } from '@rx-angular/state';
import { map } from 'rxjs/operators';
import { toInt } from '../../debug-helper/value-provider';

const chunk = (arr, n) => arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : [];

@Component({
  selector: 'rxa-sibling-pixel-img',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h3>{{pixelColors.length}} Pixels</h3>
      </div>
      <div class="pixel-map" [style.width.px]="vm.imgWidth" *rxLet="$, let vm;">
        <div class="pixel" [style.width.px]="vm.pixelSize" [style.height.px]="vm.pixelSize"
             *ngFor="let sibling of vm.pixelColorStyles; trackBy:trackBy">
          <div *rxLet="filled$; let f; strategy: getStrategy(sibling)" [ngStyle]="{background: f ? sibling : 'red'}">
          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  styles: [`
    .pixel-map {
      display: flex;
      flex-wrap: wrap;
    }

    .pixel {
      position: relative;
      width: 3px;
      height: 3px;
      padding: 0px;
      background-color: transparent;
    }

    .pixel div {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .pixel div.filled {
      background-color: orange;
    }

  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiblingPixelImgComponent extends RxState<{ pixelColorStyles: string[], filled: boolean, pixelSize: number, imgWidth: number }> {
  $ = this.select();

  filled$ = this.select('filled');
  pixelColors = [];

  @Input()
  set pixelArray(pixelArray$: Observable<number[][]>) {
    this.connect('pixelColorStyles', pixelArray$.pipe(map(arr => arr.map(v => 'rgba(' + v[0] + ',' + v[1] + ',' + v[2] + ',' + v[3] + ')'))));
  };

  @Input()
  set imgWidth(imgWidth$: Observable<number>) {
    // tslint:disable-next-line:no-bitwise
    this.connect('imgWidth', combineLatest([imgWidth$, this.select('pixelSize')]).pipe(map(([imgWidth, pixelSize]) => ~~(imgWidth * pixelSize))));
  }

  @Input()
  set pixelSize(pixelSize$: Observable<number>) {
    // tslint:disable-next-line:no-bitwise
    this.connect('pixelSize', pixelSize$);
  }

  @Input()
  set filled(filled$: Observable<boolean>) {
    this.connect('filled', filled$);
  }

  trackBy = i => i;

  constructor(
    @Inject(RX_CUSTOM_STRATEGIES) private strategies: string,
    @Inject(RX_PRIMARY_STRATEGY) private defaultStrategy: string
  ) {
    super();
    this.set({
      filled: false,
      pixelSize: 5,
      imgWidth: 5
    });
  }

  getStrategy(color: any) {
    const [r, g, b, a] = color.replaceAll(')', '').replaceAll('rgba(', '').split(',');
    const transparency = a === '0';
    const black = [
      '000',
      '323232',
      '2061530',
      '137137137',
      '101101101',
      '858585',
      '206206206'
    ].includes([r, g, b].join(''));
    const rand = Object.keys(this.strategies[0])[toInt(undefined, 0, this.strategies.length)];

    return transparency ? 'postTaskBackground' : black ? 'postTaskUserBlocking' : 'postTaskUserVisible';
  }

}

