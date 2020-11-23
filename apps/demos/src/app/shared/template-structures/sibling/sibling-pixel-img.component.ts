import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { RX_CUSTOM_STRATEGIES, RX_PRIMARY_STRATEGY } from '../../rx-angular-pocs/render-stragegies';
import { RxState } from '@rx-angular/state';
import { combineLatest, map } from 'rxjs/operators';
import { toInt } from '../../debug-helper/value-provider';
import { ImgInfo } from '../../image-array';
import { computeColorPrio } from '../../image-array/pixel-image';

const chunk = (arr, n) => arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : [];

@Component({
  selector: 'rxa-sibling-pixel-img',
  template: `
    <div class="pixel-map" [style.width.px]="width" *rxLet="width$, let width; strategy:'reactNormal'">
      <ng-container *ngFor="let sibling of pixelArray$ | push; trackBy:trackBy">
        <div class="pixel"
             [style.width.px]="pixelSize$ | push"
             [style.height.px]="pixelSize$ | push">
          <div *rxLet="filled$; let f; strategy: get('colorPriority').get(sibling)"
               [ngStyle]="{background: f ? sibling : 'red'}">
          </div>
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
    .pixel-map {
      display: flex;
      flex-wrap: wrap;
    }

    .pixel {
      position: relative;
      min-width: 3px;
      min-height: 3px;
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
export class SiblingPixelImgComponent extends RxState<{
  pixelArray: string[],
  pixelSize: number,
  width: number,
  colorPriority: Map<string, string>,
  filled: boolean
} & ImgInfo> {

  width$ = this.select(map(s => s.width * s.pixelSize));
  pixelArray$ = this.select('pixelArray');
  pixelSize$ = this.select('pixelSize');
  filled$ = this.select('filled');

  @Input()
  set imgInfo(imgInfo$: Observable<ImgInfo>) {
    this.connect(imgInfo$.pipe(map(i => ({
      ...i,
      colorPriority: computeColorPrio(i.colors)
    }))));
  };

  @Input()
  set pixelSize(pixelSize$: Observable<number | string>) {
    // tslint:disable-next-line:no-bitwise
    this.connect('pixelSize', pixelSize$.pipe(map(v => +v)));
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
      width: 5
    });
  }

  getStrategy(color: any) {
    return this.get('colorPriority').get(color);
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

    return transparency ? 'reactIdle' : black ? 'reactImmediate' : 'reactNormal';
  }

}

