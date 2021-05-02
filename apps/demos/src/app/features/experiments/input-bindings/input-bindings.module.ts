import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './input-bindings.routes';
import { ValueProvidersModule } from '../../../shared/debug-helper/value-provider';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { InputBindingsProxyComponent } from './input-bindings-container/input-bindings-proxy/input-bindings-proxy.component';
import { InputBindingsDecoratorComponent } from './input-bindings-container/input-bindings-decorator/input-bindings-docorator.component';
import { InputBindingsContainerComponent } from './input-bindings-container/input-bindings-container.component';
import { StrategySelectModule } from '../../../shared/debug-helper/strategy-select';
import { PushModule, RxLetModule } from '../../../rx-angular-pocs';


@NgModule({
  declarations: [InputBindingsContainerComponent, InputBindingsProxyComponent, InputBindingsDecoratorComponent],
  exports: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ValueProvidersModule,
    StrategySelectModule,
    VisualizerModule,
    RxLetModule,
    PushModule
  ]
})
export class InputBindingsModule {
}
