import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { EMPTY, of, range, Subject, Subscription } from 'rxjs';
import { scan, takeUntil, tap } from 'rxjs/operators';
import { RxState } from '@rx-angular/state';
import { BaseComponent } from '../../base.component.ts/base.component';
import { SourceService } from './source.service';
import { SubscriptionHandlingService } from './subscription.service';

@Component({
  selector: 'app-rx-state-parent-composition',
  template: `
    <h2>Selection Handling</h2>

    <div class="case-content">numberOfEmissions{{ selection1$ }}</div>
  `,
  changeDetection: environment.changeDetection,
  //providers: [SubscriptionHandlingService]
})
export class RxStateParentCompositionSolutionComponent implements OnDestroy {
  subscription = new Subscription();
  onDestroy$ = new Subject<void>();

  selection1$ = this.source.$.pipe(
    scan((numOfEmissions) => ++numOfEmissions, 0)
  );

  constructor(private source: SourceService) {}

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
