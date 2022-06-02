import { Immediate } from './Immediate';

const { setImmediate, clearImmediate } = Immediate;

type SetImmediateFunction = (handler: () => void, ...args: any[]) => number;
type ClearImmediateFunction = (handle: number) => void;

interface ImmediateProvider {
  setImmediate: SetImmediateFunction;
  clearImmediate: ClearImmediateFunction;
  delegate?: Omit<ImmediateProvider, 'delegate'>;
}

export const immediateProvider: ImmediateProvider = {
  setImmediate(...args): number {
    const { delegate } = immediateProvider;
    return (delegate?.setImmediate || setImmediate)(...args);
  },

  clearImmediate(handle: number): void {
    const { delegate } = immediateProvider;
    return (delegate?.clearImmediate || clearImmediate)(handle as any);
  },
};
