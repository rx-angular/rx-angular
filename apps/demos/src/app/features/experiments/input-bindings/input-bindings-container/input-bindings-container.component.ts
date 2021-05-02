import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxa-input-bindings-container',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h2>Reactive input bindings</h2>
        <rxa-value-provider [buttons]="true" #vP="rxaValueProvider"></rxa-value-provider>
      </div>
      <div class="row w-100">
        <div class="col-6">
          <rxa-input-bindings-proxy [value$]="3"></rxa-input-bindings-proxy>
        </div>
        <div class="col-6">
          <rxa-input-bindings-decorator [value$]="vP.incremental$"></rxa-input-bindings-decorator>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputBindingsContainerComponent {

}
