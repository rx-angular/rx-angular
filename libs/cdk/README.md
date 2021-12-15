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
- 🔳 Template Management


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

## ⛔ Zone Configuration

[Zone Flags](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/zone-configurations/docs/zone-flags.md)

## 🛠 Coalescing

[Coalescing](https://github.com/rx-angular/rx-angular/tree/main/libs/cdk/coalescing)

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE11, Edge                                                                                                                                                                                                      | last version                                                                                                                                                                                                      | last version                                                                                                                                                                                                  | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                                               |
