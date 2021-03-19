import { getGlobalThis } from '../utils';
import { requestAnimationFrame } from '@rx-angular/cdk';

function getProp<T>(prop: string): unknown {
  const w = getGlobalThis();
  if (w[RxA] === undefined) {
    addWindowProp(RxA, {})
  }
  return w[prop];
}

function addWindowProp<T>(prop: string, value: T): T {
  getGlobalThis()[prop] = value;
  return value;
}

const RxA = '__rxa';
function addRxAProp<T>(prop: string, value: T): T {
  const w = getGlobalThis();
  if (w[RxA] === undefined) {
    addWindowProp(RxA, {})
  }
  w[RxA][prop] = value;
  return value;
}
const queue = 'queue';
export const getQueue = () => {
  const win = getGlobalThis();

  if (getProp(RxA)[queue] !== undefined) {
    return win[RxA].queue;
  }
  return addRxAProp(queue, {
    read: (cb: any) => requestAnimationFrame(cb),
    write: (cb: any) => requestAnimationFrame(cb)
  });
};
