import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RxStrategyNames } from '@rx-angular/cdk/render-strategies';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'template-triggers',
  templateUrl: 'template-triggers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateTriggersComponent implements OnInit {
  strategy$ = new ReplaySubject<RxStrategyNames<any>>(1);

  heroes$;

  constructor() {}

  ngOnInit() {}
}
