import { TSESLint } from '@typescript-eslint/utils';
import * as path from 'path';
import rule, { MessageIds } from './no-zone-critical-browser-apis';

const ruleTester = new TSESLint.RuleTester({
  parser: path.resolve('./node_modules/@typescript-eslint/parser'),
});

const valid: TSESLint.RunTests<MessageIds, never[]>['valid'] = [
  `
import { setTimeout } from '@rx-angular/cdk/zone-less';

setTimeout(() => {
  console.log('hello');
}, 0);
`,
];

const invalid: TSESLint.RunTests<MessageIds, never[]>['invalid'] = [
  {
    code: `
setTimeout(() => {
  console.log('hello');
}, 0);
`,
    errors: [
      {
        messageId: 'no-zone-critical-browser-apis',
        data: { name: 'setTimeout' },
      },
    ],
  },
  {
    code: `
let nIntervId;

function changeColor() {
  if (!nIntervId) {
    nIntervId = setInterval(flashText, 1000);
  }
}

function flashText() {
  const oElem = document.getElementById("my_box");
  if (oElem.className === "go") {
    oElem.className = "stop";
  } else {
    oElem.className = "go";
  }
}

function stopTextColor() {
  clearInterval(nIntervId);
  nIntervId = null;
}

document.getElementById("start").addEventListener("click", changeColor);
document.getElementById("stop").addEventListener("click", stopTextColor);
`,
    errors: [
      {
        messageId: 'no-zone-critical-browser-apis',
        data: { name: 'setInterval' },
      },
      {
        messageId: 'no-zone-critical-browser-apis',
        data: { name: 'clearInterval' },
      },
    ],
  },
  {
    code: `
const element = document.getElementById('some-element-you-want-to-animate');
let start, previousTimeStamp;

function step(timestamp) {
  if (start === undefined)
    start = timestamp;
  const elapsed = timestamp - start;

  if (previousTimeStamp !== timestamp) {
    const count = Math.min(0.1 * elapsed, 200);
    element.style.transform = 'translateX(' + count + 'px)';
  }

  if (elapsed < 2000) {
    previousTimeStamp = timestamp
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
`,
    errors: [
      {
        messageId: 'no-zone-critical-browser-apis',
        data: { name: 'requestAnimationFrame' },
      },
      {
        messageId: 'no-zone-critical-browser-apis',
        data: { name: 'requestAnimationFrame' },
      },
    ],
  },
];

ruleTester.run(path.parse(__filename).name, rule, {
  valid,
  invalid,
});
