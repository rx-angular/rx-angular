import { TSESLint } from '@typescript-eslint/utils';
import * as path from 'path';
import rule, { MessageIds } from './no-rxstate-imperative-in-reactive';

const ruleTester = new TSESLint.RuleTester({
  parser: path.resolve('./node_modules/@typescript-eslint/parser'),
});

const valid: TSESLint.RunTests<MessageIds, never[]>['valid'] = [
  `
@Component({
  template: '...',
})
class OkComponent {
  constructor(state: RxState<never>, service: SomeService) {
    state.hold(service.onRefresh$, () => {
      window.location.href = '/';
    });
  }
}
`,
  `
@Component({
  template: '...',
})
class OkComponent {
  constructor(private state: RxState<MyState>, service: SomeService) {
    this.state.connect('data', service.getData());
  }

  handleClick() {
    this.state.set({ clicked: true });
  }
}
`,
];

const invalid: TSESLint.RunTests<MessageIds, never[]>['invalid'] = [
  {
    code: `
@Component({
  template: '...',
})
class NotOkComponent implements OnInit {
  constructor(
    private service: SomeService,
    private state: RxState<{ something: any; somethingElse: any }>
  ) {}

  ngOnInit(): void {
    this.state.connect(
      'something',
      this.service.something$.pipe(
        map((something) => ({
          ...something,
          ...this.state.get('somethingElse'),
        }))
      )
    );
  }
}
`,
    errors: [
      {
        messageId: 'no-rxstate-imperative-in-reactive',
      },
    ],
  },
  {
    code: `
@Component({
  template: '...',
})
class NotOkComponent {
  constructor(private service: SomeService, private state: RxState<MyState>) {
    state.hold(this.service.getData(), (data) => {
      state.set({ data });
    });
  }
}
`,
    errors: [{ messageId: 'no-rxstate-imperative-in-reactive' }],
  },
];

ruleTester.run(path.parse(__filename).name, rule, {
  valid,
  invalid,
});
