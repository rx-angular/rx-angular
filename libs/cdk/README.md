# @rx-angular/cdk

[![npm](https://img.shields.io/npm/v/%40rx-angular%2Fcdk.svg)](https://www.npmjs.com/package/%40rx-angular%2Fcdk)
![rx-angular CI](https://github.com/rx-angular/rx-angular/workflows/rx-angular%20CI/badge.svg?branch=main)
[![codecov](https://codecov.io/gh/rx-angular/rx-angular/branch/main/graph/badge.svg?token=Jxy4xLJSs1&flag=cdk)](https://codecov.io/gh/rx-angular/rx-angular)

> A Component Development Kit for High performance and ergonomic Angular UI libs and large scale applications.

`@rx-angular/cdk` was specifically designed to help developers build directives, components and services for ergonomic and high performant Angular UI libs as well as large scale
applications

![rx-angular-cdk](https://user-images.githubusercontent.com/10064416/115325340-b8ed0800-a18b-11eb-9896-28c91c9e7801.png)

## Sub Modules

- [⛔ Zone Configuration](https://rx-angular.io/docs/cdk/zone-configurations)
- [🚫 Zone Less](https://rx-angular.io/docs/cdk/zone-less)
- [🛠 Coercing](https://rx-angular.io/docs/cdk/coercing)
- [🛠 Coalescing](https://rx-angular.io/docs/cdk/coalescing)
- [📡 Notifications](https://rx-angular.io/docs/cdk/notifications)
- [🖌 Render-Strategies](https://rx-angular.io/docs/cdk/render-strategies)
- [🔳 Template Management](https://rx-angular.io/docs/cdk/template-management)
- [🔳 Transformations](https://rx-angular.io/docs/cdk/transformations)

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

If you are using `@rx-angular/cdk` already, please consider upgrading with the `@angular/cli update` command in order to make sure all provided code migrations are processed properly.

```bash
ng update @rx-angular/cdk
# or with nx
nx migrate @rx-angular/cdk
```

## Version Compatibility

| RxAngular | Angular    |
| --------- | ---------- |
| `^1.0.0`  | `>=12.0.0` |
| `^2.0.0`  | `>=13.0.0` |
| `^14.0.0` | `^14.0.0`  |
| `^15.0.0` | `^15.0.0`  |

Regarding the compatibility with RxJS, we generally stick to the compatibilities of the Angular framework itself, for more information about the compatibilities of Angular itself see this [matrix](https://gist.github.com/LayZeeDK/c822cc812f75bb07b7c55d07ba2719b3).
