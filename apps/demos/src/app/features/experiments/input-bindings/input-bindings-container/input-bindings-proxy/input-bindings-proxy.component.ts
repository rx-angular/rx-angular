import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { isObservable, Observable, of } from 'rxjs';

@Component({
  selector: 'rxa-input-bindings-proxy',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h2>Reactive input binding over proxy object</h2>
      </div>
      <div class="row w-100">
        <div class="col">
          <div class="dh-embedded-view" *rxLet="value$; let value">
            {{ value | json }}
          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputBindingsProxyComponent {

  @Input()
  value$;

  constructor() {
    return proxyProps(['value$'], this);
  }

}

function proxyProps(props: string[], target) {
  const observables: { [prop: string]: Observable<any> } = {};
  return new Proxy(target, {
    set(t, name: any, value): boolean {
      if (!props.includes(name)) {
        target[name] = value;
        return true;
      } else {
        if (isObservable(value)) {
          observables[name] = value;
        } else {
          observables[name] = of(value);
        }
        return true;
      }
    },
    get(t, name: any, _) {
      if (!props.includes(name as any)) {
        return target[name];
      } else {
        return observables[name];
      }
    }
  });
}
