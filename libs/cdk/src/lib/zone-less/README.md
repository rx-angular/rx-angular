# @rx-angular/cdk/zone-less

[![npm](https://img.shields.io/npm/v/%40rx-angular%2Fcdk.svg)](https://www.npmjs.com/package/%40rx-angular%2Fcdk)
![rx-angular CI](https://github.com/rx-angular/rx-angular/workflows/rx-angular%20CI/badge.svg?branch=master)
[![Coverage Status](https://raw.githubusercontent.com/rx-angular/rx-angular/github-pages/docs/test-coverage/cdk/jest-coverage-badge.svg)](https://rx-angular.github.io/rx-angular/test-coverage/cdk/lcov-report/index.html)

## A set of wrappers for Browser native as well as RxJS functions to avoid unnessecary change detection and zone interference in Angular.

`@rx-angular/cdk/coalescing` is designed to help developers improve performance by not using zone.js patched API's.
Besides a well documented and typed API it provides way to use patched API's in a way that is independent of `ngZone runOutsideZone` usage.

## Key features

- ✅ unpatched Browser API's
- ✅ unpatched RxJS creators
- ✅ unpatched RxJS operators
- ✅ unpatched RxJS schedulers
- ✅ no need for `runOutsideAngular`

## Demos:

- [⚡ GitHub](https://github.com/BioPhoton/rx-angular-cdk-zone-less)

## Install

```bash
npm install --save @rx-angular/cdk
# or
yarn add @rx-angular/cdk
```

## Documentation

- [Zone-Less](https://github.com/rx-angular/rx-angular/tree/master/libs/cdk/zone-less/docs/Readme.md)
