## [1.4.1](https://github.com/rx-angular/rx-angular/compare/state@1.4.0...state@1.4.1) (2020-09-03)

### Bug Fixes

* **selectSlice:** fixed undefined selected key behavior ([#284](https://github.com/rx-angular/rx-angular/issues/284)) ([8a385f7](https://github.com/rx-angular/rx-angular/commit/8a385f7149e3ad04a59466d2930686fb3dabe75c))


# [1.4.0](https://github.com/rx-angular/rx-angular/compare/state@1.3.4...state@1.4.0) (2020-08-28)

### Features

[Docs page](https://rx-angular.github.io/rx-angular/#/web/state/general/overview) for @rx-angular/state

### Bug Fixes

* **coverage:** exclude index files from coverage, adopted state config ([#242](https://github.com/rx-angular/rx-angular/issues/242)) ([3bb60da](https://github.com/rx-angular/rx-angular/commit/3bb60dad76af807ef7dde45dbce3081b23916db9))
* **state:** array length check strict ([#210](https://github.com/rx-angular/rx-angular/issues/210)) ([f57b46f](https://github.com/rx-angular/rx-angular/commit/f57b46f896fa387d6bb1f6a416405e46496733c7))
* **state:** inferred type from `selectSlice` for the subtype of state correctly ([#200](https://github.com/rx-angular/rx-angular/issues/200)) ([c0bd296](https://github.com/rx-angular/rx-angular/commit/c0bd296f206246a3790d487796dfdde46f56d3aa))

## [1.3.4](https://github.com/rx-angular/rx-angular/compare/state@1.3.4...state@1.3.4) (2020-08-22)

### Bug Fixes

- **state:** array length check strict ([#210](https://github.com/rx-angular/rx-angular/issues/210)) ([f57b46f](https://github.com/rx-angular/rx-angular/commit/f57b46f896fa387d6bb1f6a416405e46496733c7))
- **state:** inferred type from `selectSlice` for the subtype of state correctly ([#200](https://github.com/rx-angular/rx-angular/issues/200)) ([c0bd296](https://github.com/rx-angular/rx-angular/commit/c0bd296f206246a3790d487796dfdde46f56d3aa))

## [1.3.3](https://github.com/rx-angular/rx-angular/compare/state@1.3.2...state@1.3.3) (2020-07-26)

### Bug Fixes

- **rx-angular:** ignore nx boundaries in tests ([#190](https://github.com/rx-angular/rx-angular/issues/190)) ([8062980](https://github.com/rx-angular/rx-angular/commit/8062980928bc5959b486958c35c2833a5a4f0544))

## [1.3.2](https://github.com/rx-angular/rx-angular/compare/state@1.3.1...state@1.3.2) (2020-07-26)

### Features

- **rx-angular:** update libraries to Angular 10

## 1.3.1 (2020-07-26)

### Bug Fixes

- **state:** fix tests in selectSlice and distinctUntilSomeChanges ([#189](https://github.com/rx-angular/rx-angular/issues/189)) ([47d6bb1](https://github.com/rx-angular/rx-angular/commit/47d6bb1d62d851dab706041053553d764478a87e))
- **state:** fixed selectSlice typing ([#179](https://github.com/rx-angular/rx-angular/issues/179)) ([0f9ba78](https://github.com/rx-angular/rx-angular/commit/0f9ba785e899a1924bc572c627e1e9701561195d))
- **state:** remove and test filter undefined ([#168](https://github.com/rx-angular/rx-angular/pull/168)) ([a3df99e8](https://github.com/rx-angular/rx-angular/commit/a3df99e8cc688af2656b1116225c65f831ec672b))
- **state:** log errors in accumulator ([#175](https://github.com/rx-angular/rx-angular/pull/175)) ([562e46e](https://github.com/rx-angular/rx-angular/commit/562e46ee6a5f9481b1a58dcf79f5d082e8f19c1b))

# [1.3.0](https://github.com/rx-angular/rx-angular/compare/state@1.2.2...state@1.3.0) (2020-07-09)

### Bug Fixes

- **state:** improved return types for selectSlice operator ([#150](https://github.com/rx-angular/rx-angular/issues/150)) ([1ffd5f7](https://github.com/rx-angular/rx-angular/commit/1ffd5f78f4c3c2b31dcbc41bb458e6bdbdf25624))
- fix typo in function name ([#135](https://github.com/rx-angular/rx-angular/issues/135)) ([e6df35e](https://github.com/rx-angular/rx-angular/commit/e6df35ecda96e986fcdf868be80290773c947bd3))

### Features

- **state:** add perf target ([#134](https://github.com/rx-angular/rx-angular/issues/134)) ([744147f](https://github.com/rx-angular/rx-angular/commit/744147f4e3b6610c779258ac3edc160640edbb62))
- **state:** transformation helpers ([169](https://github.com/rx-angular/rx-angular/pull/169)) ([78c626c](https://github.com/rx-angular/rx-angular/commit/78c626c80818182f5ddb0ba16cab512b4ca8fa4e))

## [1.2.2](https://github.com/rx-angular/rx-angular/compare/state@1.2.1...state@1.2.2) (2020-06-07)

### Bug Fixes

- **state:** exports ([c96156b](https://github.com/rx-angular/rx-angular/commit/c96156b9560557ecbbb51a4a3dfacd40ad81d8c7))
- **state:** exports, bump version to 1.2.2 ([8337f1e](https://github.com/rx-angular/rx-angular/commit/8337f1e24e96bae0586d2a516bb7a8504072bfb8))

## [1.2.1](https://github.com/rx-angular/rx-angular/compare/state@1.2.0...state@1.2.1) (2020-06-04)

### Features

- **state:** documentation improvements

# [1.2.0](https://github.com/rx-angular/rx-angular/compare/state@1.1.1...state@1.2.0) (2020-06-04)

### Bug Fixes

- **distinctUntilSomeChanged:** fixed typing issues, docs and added 100% test coverage ([#116](https://github.com/rx-angular/rx-angular/issues/116)) ([d094220](https://github.com/rx-angular/rx-angular/commit/d0942203789e789d311bdabe2ecc10429060f41c))
- **state:** improve typings ([aba611a](https://github.com/rx-angular/rx-angular/commit/aba611acedbadb09c7e3233a5d9b7bd74f73d259))

### Features

- **state:** extend accumulator observable to take accumulation functions at runtime ([#120](https://github.com/rx-angular/rx-angular/issues/120)) ([7fb8415](https://github.com/rx-angular/rx-angular/commit/7fb84158261ed8f652699be4af687fdba95bb2ec))

## [1.1.1](https://github.com/rx-angular/rx-angular/compare/state@1.1.0...state@1.1.1) (2020-05-12)

### Bug Fixes

- **state:** fix distinctUntilSomeChanged operator export

# [1.1.0](https://github.com/rx-angular/rx-angular/compare/state@1.0.4...state@1.1.0) (2020-05-12)

### Features

- **state:** state behavior adoption ([#90](https://github.com/rx-angular/rx-angular/pull/90)) ([6d5eb61](https://github.com/rx-angular/rx-angular/commit/6d5eb61bbd1cae2652e8ab7c9f278c362fa270a3))
- **state:** distinctUntilSomeChanged operator ([#81](https://github.com/rx-angular/rx-angular/pull/81)) ([61a0169](https://github.com/rx-angular/rx-angular/commit/61a0169e5f9fab0f642ed48347a9cf36e3d82a68))
- **state:** add signal\$ to accumulationObservable

## [1.0.4](https://github.com/rx-angular/rx-angular/compare/state@1.0.3...state@1.0.4) (2020-05-04)

### Bug Fixes

- **state:** fix typing of connect overload ([#73](https://github.com/rx-angular/rx-angular/pull/73)) ([1b14436](https://github.com/rx-angular/rx-angular/commit/1b144367e75ac2a68bfb3eb9bdd7e7ffddc65585))

## [1.0.3](https://github.com/rx-angular/rx-angular/compare/state@1.0.2...state@1.0.3) (2020-04-29)

### Other

- **state:** fix documentation links

## [1.0.2](https://github.com/rx-angular/rx-angular/compare/state@1.0.1...state@1.0.2) (2020-04-29)

### Other

- **state:** fix documentation links

## [1.0.1](https://github.com/rx-angular/rx-angular/compare/state@1.0.0...state@1.0.1) (2020-04-29)

### Other

- **state:** update package description

# [1.0.0](https://github.com/rx-angular/rx-angular/compare/state@1.0.0-rc.2...state@1.0.0) (2020-04-29)

### Other

- **state:** state documentation

# [1.0.0-rc.2](https://github.com/rx-angular/rx-angular/compare/state@1.0.0-rc.1...state@1.0.0-rc.2) (2020-04-29)

### Features

- add back tslib dependency ([615c4e3](https://github.com/rx-angular/rx-angular/commit/615c4e37654d97e90d301bfdeacef4cb86c9426b))

# [1.0.0-rc.1](https://github.com/rx-angular/rx-angular/compare/state@0.0.7-beta.1...state@1.0.0-rc.1) (2020-04-22)

### Bug Fixes

- **state:** fix usage of deprecated api
- **state:** fix imports
