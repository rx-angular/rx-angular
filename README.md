# NgxRx

[![ngx-rx](https://circleci.com/gh/BioPhoton/ngx-rx.svg?style=shield)](https://circleci.com/gh/BioPhoton/ngx-rx)

This repository holds a set of helpers to create fully reactive applications.
The target Framework is Angular but the features are designed to get reused in other frameworks too.

![ngx-rx logo](https://raw.githubusercontent.com/BioPhoton/ngx-rx/master/images/ngx-rx_logo.png)

**Packages included:**

- [TypeScript](https://www.typescriptlang.org/)
  - [💾 @ngx-rx/core](https://github.com/BioPhoton/ngx-rx/tree/master/libs/core/Readme.md) - Reusable Typescript code
- [RxJS](https://rxjs.dev)
  - [💾 @ngx-rx/rxjs-etc](https://github.com/BioPhoton/ngx-rx/tree/master/libs/rxjs-etc/Readme.md) - Reusable RxJS code
- [Angular](https://angular.io)
  - [📦 @ngx-rx/state](https://github.com/BioPhoton/ngx-rx/tree/master/libs/state/Readme.md) - A Toolset for Reactive Component State-Management for Angular
    - RxState Service - Flexible Reactive Component State
    - Operators
      - stateful - filter undefined, distinct valuers, shareReplay
      - select - pluck properties and apply stateful operator
