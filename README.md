# RxAngular ![rx-angular CI](https://github.com/rx-angular/rx-angular/workflows/rx-angular%20CI/badge.svg?branch=master)

RxAngular offers a comprehensive toolset for handling fully reactive Angular applications with the main focus on runtime
performance and template rendering.

RxAngular is divided into different packages:

- [📦@rx-angular/cdk](https://github.com/rx-angular/rx-angular/tree/master/libs/cdk/README.md)
- [📦@rx-angular/state](https://github.com/rx-angular/rx-angular/tree/master/libs/state/README.md)
- [📦@rx-angular/template](https://github.com/rx-angular/rx-angular/tree/master/libs/template/README.md)

Used together, you get a powerful tool for developing high-performance angular applications with or without NgZone.

This repository holds a set of helpers to create **fully reactive** as well as **fully zone-less** applications.

[![rx-angular logo](https://raw.githubusercontent.com/rx-angular/rx-angular/master/docs/images/rx-angular_logo.png)](https://www.rx-angular.io/)
## Links

- [📚 Official docs](https://www.rx-angular.io/)
- [![Discord](https://icongr.am/material/discord.svg?size=16&color=7289da) Discord channel](https://discord.com/invite/XWWGZsQ)

## Packages

Find details in the linked readme files below for installation and setup instructions, examples and resources.

- [📦@rx-angular/cdk](https://github.com/rx-angular/rx-angular/tree/master/libs/cdk/README.md) - Component Development Kit
- [📦@rx-angular/state](https://github.com/rx-angular/rx-angular/tree/master/libs/state/README.md) - Imperative&Reactive Component State-Management
- [📦@rx-angular/template](https://github.com/rx-angular/rx-angular/tree/master/libs/template/README.md) - High-Performance Reactive Rendering

## Install

Using schematics:

```bash
ng add @rx-angular/template --project my-project
npm install --save @rx-angular/state 
```

```bash
npm install --save @rx-angular/state
npm install --save @rx-angular/template @rx-angular/cdk
# or
yarn add @rx-angular/state
yarn add @rx-angular/template @rx-angular/cdk
```

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last version| last version| last 2 versions| last 2 versions
