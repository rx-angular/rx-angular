import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { getStrategies } from '@rx-angular/template';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'app-cd-embedded-view-parent01',
  template: `
    <h2>
      CD EmbeddedView 01 <renders></renders>
    </h2>

    <button mat-raised-button [unpatch] (click)="btn2Click$.next($event)">
      CD by Directive#cdRef
    </button>

    <button mat-raised-button [unpatch] (click)="btn1Click$.next($event)">
      CD by EmbeddedView#cdRef
    </button>

    <div class="row">
      <div class="col">
        <ng-container *poc1Let="value1$; let value">
          <renders></renders>
          {{value}}
        </ng-container>
      </div>

      <div class="col">
        <ng-container *oLet="value2$; let value">
          <renders></renders>
          {{value}}
        </ng-container>
      </div>
    </div>
  `,
  changeDetection: environment.changeDetection,
})
export class CdEmbeddedViewParent01Component {
  btn1Click$ = new Subject<Event>();
  btn2Click$ = new Subject<Event>();
  value1$ = this.btn1Click$.pipe(
    scan(a => ++a, 0)
  );
  value2$ = this.btn2Click$.pipe(
    scan(a => ++a, 0)
  );
}
