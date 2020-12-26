import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RxState } from '@rx-angular/state';

@Component({
  selector: 'rxa-b1',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <rxa-visualizer cDS="OnPush">
      <ng-container visualizerHeader>
        <h1 class="mat-headline">Component B (Child)</h1>
      </ng-container>
      <div class="row w-100">
        <div class="col">
          <div>
            <button mat-raised-button (click)="increment.emit($event)">fetch random</button>
          </div>
          <rxa-ripple [name]="'B Component render'"></rxa-ripple>
          <span>{{prop}}</span>
        </div>
      </div>
    </rxa-visualizer>
  `
})
export class B1Component {

  @Input()
  prop;

  @Output()
  increment = new EventEmitter();

}
