import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxa-strategy-tokens-provide',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h2>Strategy controlled by this component</h2>
        <br/>
       <rxa-value-provider
          buttons="true"
          #vP="rxaValueProvider"
        ></rxa-value-provider>
      </div>
      <div class="row w-100">
        <div class="col">
          <div *rxLet="vP.incremental$; let counter">
            {{ counter }}
          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: {
    class: 'm-1 p-1',
    style: 'display: block;'
  },

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StrategyTokensProvideComponent {

}
