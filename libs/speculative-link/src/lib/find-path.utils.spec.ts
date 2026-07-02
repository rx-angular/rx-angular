import { Route } from '@angular/router';
import { findPath } from './find-path.utils';

const BASE_ROUTE: Route = {
  path: 'home',
};
const NAMED_OUTLET_ROUTE: Route = {
  path: 'aside',
  outlet: 'side',
};

describe('findPath', () => {
  it('should correctly build base route', () => {
    expect(findPath([BASE_ROUTE], BASE_ROUTE)).toBe('/home');
  });

  it('should correctly build route with named outlet', () => {
    expect(findPath([NAMED_OUTLET_ROUTE], NAMED_OUTLET_ROUTE)).toBe(
      '/(side:aside)',
    );
  });

  it('should correctly build route with one empty parent path', () => {
    expect(
      findPath(
        [
          {
            path: '',
            children: [BASE_ROUTE],
          },
        ],
        BASE_ROUTE,
      ),
    ).toBe('/home');
  });

  it('should correctly build route with more than one empty parent path', () => {
    expect(
      findPath(
        [
          {
            path: '',
            children: [
              {
                path: '',
                children: [BASE_ROUTE],
              },
            ],
          },
        ],
        BASE_ROUTE,
      ),
    ).toBe('/home');
  });

  it('should correctly build route with more than one empty parent path and nested outlet', () => {
    expect(
      findPath(
        [
          {
            path: '',
            children: [
              {
                path: '',
                children: [BASE_ROUTE],
              },
              NAMED_OUTLET_ROUTE,
            ],
          },
        ],
        NAMED_OUTLET_ROUTE,
      ),
    ).toBe('/(side:aside)');
  });
});
