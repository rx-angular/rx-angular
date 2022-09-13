# @rx-angular/cdk

[![npm](https://img.shields.io/npm/v/%40rx-angular%2Fcdk.svg)](https://www.npmjs.com/package/%40rx-angular%2Fcdk)
![rx-angular CI](https://github.com/rx-angular/rx-angular/workflows/rx-angular%20CI/badge.svg?branch=main)
[![Coverage Status](https://raw.githubusercontent.com/rx-angular/rx-angular/github-pages/docs/test-coverage/cdk/jest-coverage-badge.svg)](https://rx-angular.github.io/rx-angular/test-coverage/cdk/lcov-report/index.html)

## A Component Development Kit for High performance and ergonomic Angular UI libs and large scale applications

`@rx-angular/cdk` was specifically designed to help developers build directives, components and services for ergonomic and high performant Angular UI libs as well as large scale
applications

![rx-angular-cdk](https://user-images.githubusercontent.com/10064416/115325340-b8ed0800-a18b-11eb-9896-28c91c9e7801.png)

## Sub Modules


- [⛔ Zone Configuration](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/zone-configurations)
- [🚫 Zone Less](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/zone-less)
- [🛠 Coercing](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/coercing)
- [🛠 Coalescing](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/coalescing)
- [📡 Notifications](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/notifications)
- [🖌 Render-Strategies](https://github.com/rx-angular/rx-angular/tree/main/libs/cdk/render-strategies)
- [🔳 Template Management](https://github.com/rx-angular/rx-angular/tree/main/libs/cdk/template)
- [🔳 Transformations](https://github.com/rx-angular/rx-angular/tree/main/libs/cdk/transformations)


## Demos:

- ⛔ [Zone Flags](https://github.com/BioPhoton/rx-angular-cdk-zone-configuration)
- 🔳 [rxFor](https://stackblitz.com/edit/rx-angular-cdk-demos-c52q34)

## Install

```bash
npm install --save @rx-angular/cdk
# or
yarn add @rx-angular/cdk
```

## Update

If you are using `@rx-angular/cdk` already, please consider upgrading with the `@angular/cli update` command in order
to make sure all provided code migrations are processed properly.

```bash
ng update @rx-angular/cdk
# or with nx
nx migrate @rx-angular/cdk
```

## Version Compatibility

| Angular                | RxJS                 | @rx-angular/cdk     | 
|------------------------|----------------------|---------------------|
| `14`                   | `^7.4.0`             | `> 1.0.0-alpha.10`  |
| `^12.0.0` or `^13.0.0` | `^6.5.5` or `^7.4.0` | `> 1.0.0-alpha.10`  |
| `^11.0.0`              | `^6.5.5`             | `<= 1.0.0-alpha.10` |

Regarding the compatibility to RxJs, we generally stick to the compatibilities of the angular framework itself.
All the packages support RxJs versions `^6.5.5` || `^7.4.0`.
For more information about the compatibilities of angular itself see this [gist](https://gist.github.com/LayZeeDK/c822cc812f75bb07b7c55d07ba2719b3)
