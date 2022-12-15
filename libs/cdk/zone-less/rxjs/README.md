# @rx-angular/cdk/zone-less/rxjs

[![npm](https://img.shields.io/npm/v/%40rx-angular%2Fcdk.svg)](https://www.npmjs.com/package/%40rx-angular%2Fcdk)
![rx-angular CI](https://github.com/rx-angular/rx-angular/workflows/rx-angular%20CI/badge.svg?branch=main)

> A set of wrappers for RxJS to avoid unnecessary change detection and zone interference in Angular.

`@rx-angular/cdk/zone-less/rxjs` is designed to help developers improve performance by avoiding the use of zone.js patched API's.
Besides a well documented and typed API it provides a way to use patched API's in a way that is independent of `ngZone runOutsideZone` usage.

## Key features

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

- [Zone-less](https://rx-angular.io/docs/cdk/zone-less)
