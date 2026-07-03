import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RxLet } from '@rx-angular/template/let';
import { RxPush } from '@rx-angular/template/push';
import { RxEffects } from '@rx-angular/state/effects';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UnpatchEventsModule } from '../../../../rx-angular-pocs/template/directives/unpatch';

import { ImageArrayModule } from '../../../../shared/image-array/image-array.module';
import { createImageConverter } from '../../../../shared/image-array';
import { computeColorPrio } from '../../../../shared/image-array/pixel-image';
import { SiblingModule } from '../../../../shared/template-structures/sibling/sibling.module';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { DocsLinkComponent } from '../../../../shared/docs-link';
import { CanvasViewComponent } from '../../../../shared/canvas-view/canvas-view.component';

@Component({
  selector: 'rxa-concurrent-strategies',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    RxLet,
    RxPush,
    UnpatchEventsModule,
    CanvasViewComponent,
    ImageArrayModule,
    SiblingModule,
    VisualizerModule,
    DocsLinkComponent,
  ],
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <header class="rxa-demo-header">
          <div>
            <h2>Pixels With Priorities</h2>
            <p class="rxa-demo-subtitle">
              Repaint many pixel components at once and watch prioritized render
              strategies driven by each color's priority.
            </p>
          </div>
          <rxa-docs-link
            docs="packages/cdk/reference/concurrent-strategies"
            source="apps/demos/src/app/features/template/strategies"
          />
        </header>
        <rxa-image-array
          (img)="imgChange$.next($event)"
          class="mb-2"
        ></rxa-image-array>
      </ng-container>
      <div class="w-100 d-flex flex-wrap">
        <div class="w-100 mb-2">
          @if (imgConverter?.loading$ | push) {
            <mat-progress-bar [mode]="'buffer'"></mat-progress-bar>
          }

          <rxa-color-prio class="w-100" [colors$]="colors$"></rxa-color-prio>
        </div>
        <div class="w-100 d-flex flex-fill mb-5">
          <div class="d-flex flex-wrap mr-2" style="width: 300px">
            <rxa-canvas-view
              style="width: 100px"
              [img$]="imgChange$"
            ></rxa-canvas-view>

            <mat-form-field class="mr-2 w-100" *rxLet="pixelSize$; let size">
              <mat-label>Pixel Size {{ size }}</mat-label>
              <input
                matInput
                [unpatch]
                #i
                type="number"
                (input)="pixelSize$.next(i.value)"
                [value]="size"
              />
            </mat-form-field>
            <mat-form-field
              class="mr-2 w-100"
              *rxLet="fillColor$; let fillColor"
            >
              <mat-label>Overlay Color {{ fillColor }}</mat-label>
              <input
                matInput
                [unpatch]
                #i
                type="color"
                [value]="fillColor"
                (input)="fillColor$.next(i.value)"
              />
            </mat-form-field>
            <button
              *rxLet="pixelArray$; let a"
              class="btn btn-outline-primary btn-sm"
              style="width: 200px"
              [unpatch]
              (click)="filled$.next(!filled$.getValue())"
            >
              Repaint {{ a?.length }} Components
            </button>
          </div>
          <div>
            <rxa-sibling-pixel-img
              [pixelSize]="pixelSize$"
              [imgInfo]="imgInfoChange$"
              [filled]="filled$"
              [fillColor]="fillColor$"
            >
            </rxa-sibling-pixel-img>
          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxEffects],
})
export class PixelPriorityComponent {
  readonly rxEf = inject(RxEffects);

  selectedStrategies: { [name: string]: boolean } = {};

  filled$ = new BehaviorSubject<boolean>(true);
  fillColor$ = new BehaviorSubject<string>('#ff0000');
  pixelSize$ = new BehaviorSubject<string>('3');

  imgChange$ = new Subject<HTMLImageElement>();
  imgConverter = createImageConverter();
  imgInfoChange$ = this.imgConverter.imgInfoChange$;
  colors$ = this.imgInfoChange$.pipe(map((r) => computeColorPrio(r.colors)));
  pixelArray$ = this.imgInfoChange$.pipe(map((d) => d.pixelArray));

  constructor() {
    this.rxEf.register(this.imgChange$, (img: CanvasImageSource) =>
      this.imgConverter.renderImage(img),
    );
  }

  visible(choice) {
    return this.selectedStrategies[choice] === true;
  }
}
