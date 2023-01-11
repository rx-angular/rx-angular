import { TSESLint } from '@typescript-eslint/utils';
import * as path from 'path';
import rule, { MessageIds } from './no-zone-run-apis';

const ruleTester = new TSESLint.RuleTester({
  parser: path.resolve('./node_modules/@typescript-eslint/parser'),
});

const valid: TSESLint.RunTests<MessageIds, never[]>['valid'] = ['run();'];

const invalid: TSESLint.RunTests<MessageIds, never[]>['invalid'] = [
  {
    code: `
import { Component, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFoo } from '../../store/foo/foo.selectors';

@Component({
  templateUrl: './foo.component.html',
})
export class FooComponent {
  constructor(
    private zone: NgZone,
    private store: Store,
  ) {
    setTimeout(() => {
      this.zone.runOutsideAngular(() => {
        // ...
      });
    }, 500);
  }

  handleEvent(event: any) {
    this.store.select(selectFoo).subscribe(value => {
      this.zone.run(() => {
        // ...
      });
    });
  }
}
`,
    errors: [
      {
        messageId: MessageIds.NoRunOutsideZone,
        data: {
          name: 'runOutsideAngular',
        },
      },
      {
        messageId: MessageIds.NoRunInsideZone,
        data: {
          name: 'run',
        },
      },
    ],
  },
];

ruleTester.run(path.parse(__filename).name, rule, {
  valid,
  invalid,
});
