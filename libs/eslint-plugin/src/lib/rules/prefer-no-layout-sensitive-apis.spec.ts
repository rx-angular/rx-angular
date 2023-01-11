import { TSESLint } from '@typescript-eslint/utils';
import * as path from 'path';
import rule, { MessageIds } from './prefer-no-layout-sensitive-apis';

const ruleTester = new TSESLint.RuleTester({
  parser: path.resolve('./node_modules/@typescript-eslint/parser'),
});

const valid: TSESLint.RunTests<MessageIds, never[]>['valid'] = [
  `
function greet(name: string): void {
  console.log('Hello, ' + name + '!');
}
`,
  `
const el = document.getElementById('myEl');
el.addEventListener('click', () => {
  console.log('element clicked');
});
`,
];

const invalid: TSESLint.RunTests<MessageIds, never[]>['invalid'] = [
  {
    code: 'el.offsetLeft += 10;',
    errors: [
      { messageId: 'no-layout-sensitive-apis', data: { name: 'offsetLeft' } },
    ],
  },
  {
    code: 'el.scrollTop = 0;',
    errors: [
      { messageId: 'no-layout-sensitive-apis', data: { name: 'scrollTop' } },
    ],
  },
  {
    code: 'const { innerWidth: elemWidth } = elem;',
    errors: [
      { messageId: 'no-layout-sensitive-apis', data: { name: 'innerWidth' } },
    ],
  },
  {
    code: `
const maxChildWidth = Array.from(el.children).reduce(
  (acc, { clientWidth }) => Math.max(acc, clientWidth),
  0
);
`,
    errors: [
      { messageId: 'no-layout-sensitive-apis', data: { name: 'clientWidth' } },
    ],
  },
  {
    code: "document.getElementById('foo').innerText = 'bar';",
    errors: [
      { messageId: 'no-layout-sensitive-apis', data: { name: 'innerText' } },
    ],
  },
  {
    code: "const orientation = el.clientHeight > el.clientWidth ? 'portrait' : 'landscape';",
    errors: [
      { messageId: 'no-layout-sensitive-apis', data: { name: 'clientHeight' } },
      { messageId: 'no-layout-sensitive-apis', data: { name: 'clientWidth' } },
    ],
  },
  {
    code: 'const { x, y, width, height } = el.getBoundingClientRect();',
    errors: [
      {
        messageId: 'no-layout-sensitive-apis',
        data: { name: 'getBoundingClientRect' },
      },
    ],
  },
  {
    code: 'el.scrollIntoView();',
    errors: [
      {
        messageId: 'no-layout-sensitive-apis',
        data: { name: 'scrollIntoView' },
      },
    ],
  },
  {
    code: `
function isElementInViewport(elem: HTMLElement): boolean {
  const rect = elem.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

if (!isElementInViewport(el)) {
  el.scrollIntoView();
  (el.firstChild as HTMLInputElement).focus();
}
`,
    errors: [
      {
        messageId: 'no-layout-sensitive-apis',
        data: { name: 'getBoundingClientRect' },
      },
      { messageId: 'no-layout-sensitive-apis', data: { name: 'innerHeight' } },
      { messageId: 'no-layout-sensitive-apis', data: { name: 'clientHeight' } },
      { messageId: 'no-layout-sensitive-apis', data: { name: 'innerWidth' } },
      { messageId: 'no-layout-sensitive-apis', data: { name: 'clientWidth' } },
      {
        messageId: 'no-layout-sensitive-apis',
        data: { name: 'scrollIntoView' },
      },
      { messageId: 'no-layout-sensitive-apis', data: { name: 'focus' } },
    ],
  },
];

ruleTester.run(path.parse(__filename).name, rule, {
  valid,
  invalid,
});
