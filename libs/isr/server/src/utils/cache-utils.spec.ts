import { RenderVariant } from '../../../models/src';
import { getCacheKey } from './cache-utils';

describe('getCacheKey', () => {
  it('should return the URL without query parameters when none are allowed', () => {
    const url = '/page?param1=value1&param2=value2';
    const result = getCacheKey(url, [], null);
    expect(result).toBe('/page');
  });

  it('should return the URL with query parameters when it is null or undefined', () => {
    const url = '/page?param1=value1&param2=value2';
    const result = getCacheKey(url, null, null);
    expect(result).toBe('/page?param1=value1&param2=value2');
  });

  it('should include only allowed query parameters in the result', () => {
    const url = '/page?allowed=value&disallowed=value';
    const result = getCacheKey(url, ['allowed'], null);
    expect(result).toBe('/page?allowed=value');
  });

  it('should exclude disallowed query parameters', () => {
    const url = '/page?allowed=value&disallowed=value';
    const result = getCacheKey(url, ['allowed'], null);
    expect(result).not.toContain('disallowed=value');
  });

  it('should append the variant identifier when a variant is provided', () => {
    const url = '/page?param=value';
    const variant: RenderVariant = {
      identifier: 'variant123',
      detectVariant: () => true,
    };
    const result = getCacheKey(url, ['param'], variant);
    expect(result).toBe('/page?param=value<variantId:variant123>');
  });
});
