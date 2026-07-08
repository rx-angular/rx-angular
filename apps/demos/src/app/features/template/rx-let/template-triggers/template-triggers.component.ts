import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RxStrategyNames } from '@rx-angular/cdk/render-strategies';
import { RxLet } from '@rx-angular/template/let';
import { ReplaySubject } from 'rxjs';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select/index';
import { TriggerProviderComponent } from '../../../../shared/debug-helper/trigger-provider/trigger-provider.component';
import { ValueProviderComponent } from '../../../../shared/debug-helper/value-provider/value-provider/value-provider.component';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer/index';
import { DocsLinkComponent } from '../../../../shared/docs-link';

@Component({
  selector: 'template-triggers',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    RxLet,
    VisualizerModule,
    StrategySelectModule,
    ValueProviderComponent,
    TriggerProviderComponent,
    MatProgressSpinnerModule,
    MatIconModule,
    DocsLinkComponent,
  ],
  templateUrl: 'template-triggers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateTriggersComponent {
  strategy$ = new ReplaySubject<RxStrategyNames<any>>(1);

  heroes$;
}
