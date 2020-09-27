import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ApplicationRef, Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { RxState } from '@rx-angular/state';

export type GrowAnimationState = 'grown' | 'shrinked';

export interface GrowComponentState {
  animationState: GrowAnimationState;
}

@Component({
  selector: 'app-grow',
  templateUrl: './grow.component.html',
  styleUrls: ['./grow.component.scss'],
  changeDetection: environment.changeDetection,
  animations: [
    trigger('grow', [
      state(
        'shrinked',
        style({
          height: '100px',
          width: '100px',
        })
      ),
      state(
        'grown',
        style({
          height: '500px',
          width: '500px',
        })
      ),
      transition(
        'grown <=> shrinked',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
  ],
})
export class GrowComponent extends RxState<GrowComponentState> {
  @Input() set animationState(animationState: GrowAnimationState) {
    this.set({ animationState });
  }

  @Output() readonly animationDone = new Subject<AnimationEvent>();
  @Output() readonly animationStarted = new Subject<AnimationEvent>();

  readonly viewState$ = this.select();

  constructor(private appRef: ApplicationRef) {
    super();
  }
}
