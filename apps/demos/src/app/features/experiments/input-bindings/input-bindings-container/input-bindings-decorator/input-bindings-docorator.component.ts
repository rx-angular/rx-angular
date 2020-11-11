import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'rxa-input-bindings-decorator',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h2>Reactive input binding over decorator</h2>
      </div>
      <div class="row w-100">
        <div class="col">
          <div class="dh-embedded-view" *rxLet="value$; let counter">
            {{ counter }}
          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputBindingsDecoratorComponent {

  @Input()
  value$;

}
