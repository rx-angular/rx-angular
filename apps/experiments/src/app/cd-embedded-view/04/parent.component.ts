import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { map, scan } from 'rxjs/operators';

@Component({
  selector: 'app-cd-embedded-view-parent04',
  template: `
    <h2>
      CD EmbeddedView 04
      <renders></renders>
    </h2>

    <button [unpatch] (click)="toggleClick$.next($event)">
      toggle
    </button>
    <button [unpatch] (click)="case1Click$.next($event)">
      case1 toggle
    </button>
    <button [unpatch] (click)="case2Click$.next($event)">
      case2 toggle
    </button>

    <div class="row">
      <div class="col">
        <ng-container *ngFor="let value of [switchValue$ | async]">
          <ng-container [ngSwitch]="value">
            <p *ngSwitchCase="true">
              TRUE
              {{value}}
            </p>
            <p *ngSwitchCase="false">
              FALSE
              {{value}}
            </p>
          </ng-container>
        </ng-container>
      </div>
      <div class="col">
        <ng-container *poc1Switch="switchValue$; let value">
          <div *poc1SwitchCase="case1Value$">
            <renders></renders>
            Case1
            {{value}}
          </div>
          <div *poc2SwitchCase="case2Value$">
            <renders></renders>
            Case2
            {{value}}
          </div>
        </ng-container>
      </div>
    </div>
  `,
  changeDetection: environment.changeDetection
})
export class CdEmbeddedViewParent04Component {
  toggleClick$ = new Subject<Event>();
  case1Click$ = new Subject<Event>();
  case2Click$ = new Subject<Event>();
  switchValue$ = this.toggleClick$.pipe(
    scan(a => !a, false)
  );
  case1Value$ = this.toggleClick$.pipe(
    map(a => Math.random() < 0.5)
  );
  case2Value$ = this.toggleClick$.pipe(
    map(a => Math.random() < 0.5)
  );
}
