import { eslintPlugin } from './eslint-plugin';

describe('eslintPlugin', () => {
  it('should work', () => {
    expect(eslintPlugin()).toEqual('eslint-plugin');
  });
});
