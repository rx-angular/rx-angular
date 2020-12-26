import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RxState } from '@rx-angular/state';

@Component({
  selector: 'rxa-b2',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <rxa-visualizer cDS="OnPush">
      <ng-container visualizerHeader>
        <h1 class="mat-headline">Component B (Child)</h1>
      </ng-container>
      <div class="row w-100">
        <div class="col">
          <div>
            <button mat-raised-button [unpatch] (click)="increment.emit($event)">fetch random</button>
          </div>
          <span class="dh-embedded-view" *rxLet="this.select('rand'); let rand">
            <rxa-ripple [name]="'B EmbeddedView render'"></rxa-ripple>
             <rxa-dirty-check></rxa-dirty-check>
            {{rand}}
          </span>
        </div>
      </div>
    </rxa-visualizer>
  `
})
export class B2Component extends RxState<{ rand: number }> {

  prop;

  @Input()
  set prop$(rand$: any) {
    this.connect('rand', rand$);
  }


  @Output()
  increment = new EventEmitter();

}
