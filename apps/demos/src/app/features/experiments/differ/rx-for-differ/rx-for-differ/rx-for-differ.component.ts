import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { ArrayProviderService } from '../../../../../shared/debug-helper/value-provider';
import { RxState } from '@rx-angular/state';


@Component({
  selector: 'rxa-rx-for-differ',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <div class="col-sm-12"><h2>rxFor with Differ</h2></div>
        <rxa-array-provider [buttons]="true" #arrayP="rxaArrayProvider"></rxa-array-provider>
      </ng-container>
      <div>
        <ng-container *rxForDiffer="arrayP.array$;
                      trackBy: trackByKey
                      distinctBy:distinctByKey
                      let i;
        ">
          <rxa-dirty-check>{{i | json}}</rxa-dirty-check>
          <pre>
            {{i | json}}
        </pre>
        </ng-container>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: environment.changeDetection,
  encapsulation: ViewEncapsulation.None,
  providers: [ArrayProviderService]
})
export class RxForDifferComponent extends RxState<any> {
  trackByKey = 'id';
  distinctByKey = 'value';
  trackByFn = (a) => a.id;
  distinctByFn = (a) => a.value;

  constructor(public arrayP: ArrayProviderService) {
    super();
  }

}
