import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Subject } from 'rxjs';
import { scan } from 'rxjs/operators';
import { VisualizerComponent } from '../../../shared/debug-helper/visualizer/visualizer/visualizer.component';
import { MatButton } from '@angular/material/button';
import { RxUnpatch } from '../../../../../../../libs/template/unpatch/src/lib/unpatch.directive';
import { OriginalLetDirective } from './original-let.directive';
import { Poc1LetDirective } from './poc1-let.directive';

@Component({
  selector: 'rxa-cd-embedded-view-parent01',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h2>Component Template vs Embedded View</h2>
        <div>
          <button mat-raised-button [unpatch] (click)="btn2Click$.next($event)">
            Directive cdRef#detectChanges
          </button>
          <button mat-raised-button [unpatch] (click)="btn1Click$.next($event)">
            EmbeddedView cdRef#detectChanges
          </button>
        </div>
      </ng-container>
    </rxa-visualizer>

    <div class="row w-100">
      <div class="col-sm-6">
        <h3>*rxLet Directive cdRef#detectChanges</h3>
        <ng-container *oLet="value2$; let value">
          <rxa-visualizer>
            {{ value }}
          </rxa-visualizer>
        </ng-container>
      </div>

      <div class="col-sm-6">
        <h3>*rxLet EmbeddedView cdRef#detectChanges</h3>
        <ng-container *poc1Let="value1$; let value">
          <rxa-visualizer [viewType]="'embedded-view'">
            {{ value }}
          </rxa-visualizer>
        </ng-container>
      </div>
    </div>
  `,
  changeDetection: environment.changeDetection,
  imports: [
    VisualizerComponent,
    MatButton,
    RxUnpatch,
    OriginalLetDirective,
    Poc1LetDirective,
  ],
})
export class ViewVsEmbeddedViewComponent {
  btn1Click$ = new Subject<Event>();
  btn2Click$ = new Subject<Event>();
  value1$ = this.btn1Click$.pipe(scan((a) => ++a, 0));
  value2$ = this.btn2Click$.pipe(scan((a) => ++a, 0));
}
