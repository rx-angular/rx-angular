import { TSESLint } from '@typescript-eslint/utils';
import * as path from 'path';
import rule, {
  MessageIds,
  Options,
} from './no-rxstate-subscriptions-outside-constructor';

const ruleTester = new TSESLint.RuleTester({
  parser: path.resolve('./node_modules/@typescript-eslint/parser'),
});

const valid: TSESLint.RunTests<MessageIds, Options>['valid'] = [
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
  {
    code: `
@Component({
  template: '...',
})
class OkComponent {
  @Input() noDataFetching = false;

  constructor(private state: RxState<MyState>, private service: SomeService) {}

  ngOnInit() {
    if (!this.noDataFetching) {
      this.state.connect('data', service.getData());
    }
  }
}
`,
    options: [{ allowedMethods: ['ngOnInit'] }],
  },
];

const invalid: TSESLint.RunTests<MessageIds, Options>['invalid'] = [
  {
    code: `
@Component({
  template: '<button (click)="handleClick()">...</button> ...',
})
class NotOkComponent {
  constructor(private service: SomeService, private state: RxState<MyState>) {}

  handleClick() {
    this.state.connect('something', this.service.doSomething());
  }
}
`,
    errors: [
      {
        messageId: 'no-rxstate-subscriptions-outside-constructor',
        data: { name: 'connect', allowed: 'constructor' },
      },
    ],
  },
  {
    code: `
@Component({
  template: '<button (click)="handleClick()">...</button> ...',
})
class NotOkComponent {
  constructor(private service: SomeService, private state: RxState<MyState>) {}

  handleClick() {
    this.state.hold(this.service.doSomething());
  }
}
`,
    options: [{ allowedMethods: ['ngOnInit'] }],
    errors: [
      {
        messageId: 'no-rxstate-subscriptions-outside-constructor',
        data: { name: 'hold', allowed: 'constructor, ngOnInit' },
      },
    ],
  },
];

ruleTester.run(path.parse(__filename).name, rule, {
  valid,
  invalid,
});
