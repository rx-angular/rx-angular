import { TSESLint } from '@typescript-eslint/utils';
import * as path from 'path';
import rule, { MessageIds } from './no-explicit-change-detection-apis';

const ruleTester = new TSESLint.RuleTester({
  parser: path.resolve('./node_modules/@typescript-eslint/parser'),
});

const valid: TSESLint.RunTests<MessageIds, never[]>['valid'] = [
  `
@Component({
  template: '<div>{{ data$ | async }}</div>'
})
class OkComponent {
  readonly data$: Observable<any>;

  constructor(service: SomeService) {
    data$ = service.getData();
  }
}
`,
  `
@Component({
  template: '<div>{{ data }}</div>'
})
class OkishComponent {
  data: any;

  constructor(service: SomeService) {
    service.getData().subscribe(data => {
      this.data = data;
    });
  }
}
`,
];

const invalid: TSESLint.RunTests<MessageIds, never[]>['invalid'] = [
  {
    code: `
@Component({
  template: '<div>{{ data }}</div>'
})
class NotOkDetectChangesComponent {
  data: any;
  constructor(service: SomeService, cdRef: ChangeDetectorRef) {
    service.getData().subscribe(data => {
      this.data = data;
      cdRef.detectChanges();
    });
  }
}
`,
    errors: [
      {
        messageId: MessageIds.NoDetectChanges,
        data: { name: 'detectChanges' },
      },
    ],
  },
  {
    code: `
@Component({
  template: '<div>{{ data }}</div>'
})
class NotOkMarkForCheckComponent {
  data: any;
  constructor(private service: SomeService, private cdRef: ChangeDetectorRef) {
    this.service.getData().subscribe(data => {
      this.data = data;
      this.cdRef.markForCheck();
    });
  }
}
`,
    errors: [
      { messageId: MessageIds.NoMarkForCheck, data: { name: 'markForCheck' } },
    ],
  },
  {
    code: `
@Component({
  template: '<div>{{ data }}</div>'
})
class NotOkIvyDetectChangesComponent {
  data: any;
  constructor(service: SomeService, cdRef: ChangeDetectorRef) {
    service.getData().subscribe(data => {
      this.data = data;
      ɵdetectChanges();
    });
  }
}
`,
    errors: [
      {
        messageId: MessageIds.NoDetectChanges,
        data: { name: 'ɵdetectChanges' },
      },
    ],
  },
  {
    code: `
@Component({
  template: '<div>{{ data }}</div>'
})
class NotOkIvyMarkDirtyComponent {
  data: any;
  constructor(service: SomeService, cdRef: ChangeDetectorRef) {
    service.getData().subscribe(data => {
      this.data = data;
      ɵmarkDirty();
    });
  }
}
`,
    errors: [
      { messageId: MessageIds.NoMarkForCheck, data: { name: 'ɵmarkDirty' } },
    ],
  },
];

ruleTester.run(path.parse(__filename).name, rule, {
  valid,
  invalid,
});
