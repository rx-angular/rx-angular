# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

# [1.7.0](https://github.com/rx-angular/rx-angular/compare/state@1.6.1...state@1.7.0) (2022-09-13)


### Bug Fixes

* **docs:** rename vidoes to videos ([bc8f650](https://github.com/rx-angular/rx-angular/commit/bc8f65059d0fd8c53d22c0dbc5e0b74c8ca1df77))
* **state:** exclude `undefined` from return type of `stateful` ([#1073](https://github.com/rx-angular/rx-angular/issues/1073)) ([4329422](https://github.com/rx-angular/rx-angular/commit/43294225bff997a7a20f086527ac2e1c2db465c4)), closes [#837](https://github.com/rx-angular/rx-angular/issues/837)
* **state:** fix build error ([3626463](https://github.com/rx-angular/rx-angular/commit/36264636da4cbcb639385e403aa840433b63691c))
* **state:** fix overload declaration order ([75d1bd8](https://github.com/rx-angular/rx-angular/commit/75d1bd8229328266ca29c1aa6204897ba02167b6))
* **state:** make rxjs imports to be compatible with rxjs v6 ([#1378](https://github.com/rx-angular/rx-angular/issues/1378)) ([7379994](https://github.com/rx-angular/rx-angular/commit/7379994aa372716994387fb7b075b3eca724bb04))


### Features

* **state:** add key and map function overload to select ([f00e943](https://github.com/rx-angular/rx-angular/commit/f00e9436720cb4dbcd71d243523abb9da7dd8eaa))
* **state:** add keyCompareMap option to select's keys+fn overload ([b1b5370](https://github.com/rx-angular/rx-angular/commit/b1b5370511064b4265f2b0714af97c3e982032c0))
* **state:** add keys array and map function overload to select ([2b9c819](https://github.com/rx-angular/rx-angular/commit/2b9c819557f02519bdd8c160b2469a71ac92e362))
* **state:** introduce RxActions ([a63e01a](https://github.com/rx-angular/rx-angular/commit/a63e01a891204be4087472fa808371bd85590171))



## [1.6.1](https://github.com/rx-angular/rx-angular/compare/state@1.6.0...state@1.6.1) (2022-06-07)


### Bug Fixes

* add missing peerDependencies ([223b751](https://github.com/rx-angular/rx-angular/commit/223b751b9c14f67fe803d84872ffe56b005373c6)), closes [#1261](https://github.com/rx-angular/rx-angular/issues/1261)


### Performance Improvements

* **state:** improve connect checks performance ([916014c](https://github.com/rx-angular/rx-angular/commit/916014c744b45f7f629b7f249dff323c2c53fd27))



# [1.6.0](/compare/state@1.5.1...state@1.6.0) (2022-03-05)


### Features

* add effects sum-module to docs 9586e09



## [1.5.1](/compare/state@1.5.0...state@1.5.1) (2022-02-27)


### Bug Fixes

* **cdk:** compat for jest and Angular 12

# [1.5.0](/compare/state@1.4.5...state@1.5.0) (2022-02-08)


### Bug Fixes

* drop `@nrwl/tao` deep import 6eeae5e
* deprecate `src` content
* state migrations (#1132) 974a6d0, closes #1132
* **state:** make migrations keep rxstate (#1133) 76ce6c6, closes #1133


### Features

* enable Ivy with partial compilation mode (#1186) eddaf20, closes #1186


### Performance Improvements

* improve migrations perf 44eccda
* move getUnpatchedApi into sun-package and avoid zone-less package (#1035) 170ab7a, closes #1035
* **state:** extract values comparer default compare fn be9401c
* **state:** insert helper conditions and result concat b86a2bd
* **state:** isKeyOf guard typeof check optimization 007a13a
* **state:** update helper iteration and custom find fn 9e4d530
* **state:** update helper updates object keys check removed 1e2dfc3
* **state:** upsert helper iteration, conditions and result concat d851fb9
* zone less sub modules f765336



## [1.4.6](https://github.com/rx-angular/rx-angular/compare/state@1.4.5...state@1.4.6) (2021-09-23)


### Bug Fixes

* **state:** disable Ivy + partial compilation ([#953](https://github.com/rx-angular/rx-angular/issues/953)) ([379524f](https://github.com/rx-angular/rx-angular/commit/379524ff89d7ff49114629c2fe594e2cdffef2d1)), closes [#928](https://github.com/rx-angular/rx-angular/issues/928)



## [1.4.5](https://github.com/rx-angular/rx-angular/compare/state@1.4.4...state@1.4.5) (2021-08-27)


### Bug Fixes

* **state:** fix imports ([#925](https://github.com/rx-angular/rx-angular/pull/925))


### Performance Improvements

* **state:** improve toDictionary & extract performance ([#901](https://github.com/rx-angular/rx-angular/issues/901)) ([930aa4f](https://github.com/rx-angular/rx-angular/commit/930aa4f52a43c9c117c96af7f551d49913783d5a))



## [1.4.4](https://github.com/rx-angular/rx-angular/compare/state@1.4.2...state@1.4.4) (2021-08-23)


### Bug Fixes

* **state:** adopt build ([cbc59d3](https://github.com/rx-angular/rx-angular/commit/cbc59d3b05032154ef7829822a6d5fd59ce82010))
* **RxState#hold:** stop stream when throw error in hold method ([#437](https://github.com/rx-angular/rx-angular/issues/437)) ([6ca27b1](https://github.com/rx-angular/rx-angular/commit/6ca27b1f6f75eb80b7193529035ead70f52e77c8))
* **schematics:** remove undefined collection ref ([#454](https://github.com/rx-angular/rx-angular/issues/454)) ([bdea627](https://github.com/rx-angular/rx-angular/commit/bdea627ca6c721b123cb5d0897c3849b9e7fa8e3))
* **transformation-helper:** fix update behavior on invalid source data ([8ebbc44](https://github.com/rx-angular/rx-angular/commit/8ebbc44cfc6054578d1928216f52a803f06289f6))
* **transformation-helper:** simplify update helper ([#694](https://github.com/rx-angular/rx-angular/issues/694)) ([f38cd20](https://github.com/rx-angular/rx-angular/commit/f38cd20b16f55f608ff08f1a469d7e59fb446ea5))


### Features

* **state:** docs and tests ([ce29d15](https://github.com/rx-angular/rx-angular/commit/ce29d15916c676b29d5159121d35605cbcc96885))
* **state:** move `coercing` into lib ([#730](https://github.com/rx-angular/rx-angular/issues/730)) ([803412b](https://github.com/rx-angular/rx-angular/commit/803412b8f00d1e0b31f07ced1a2951e445b48546))
* **transformation-helpers:** add upsert transformation helper ([#392](https://github.com/rx-angular/rx-angular/issues/392)) ([fd52555](https://github.com/rx-angular/rx-angular/commit/fd52555d6af1c81ec666e6554ceab33a95097f43))



## [1.4.3](https://github.com/rx-angular/rx-angular/compare/state@1.4.2...state@1.4.3) (2020-12-26)


### Bug Fixes

* **RxState#hold:** stop stream when throw error in hold method ([#437](https://github.com/rx-angular/rx-angular/issues/437)) ([6ca27b1](https://github.com/rx-angular/rx-angular/commit/6ca27b1f6f75eb80b7193529035ead70f52e77c8))



## [1.4.2](https://github.com/rx-angular/rx-angular/compare/state@1.4.1...state@1.4.2) (2020-12-26)

### Bug Fixes

* **state:** fixed return value of get when state is empty ([#391](https://github.com/rx-angular/rx-angular/issues/391)) ([ec1efa8](https://github.com/rx-angular/rx-angular/commit/ec1efa8c5e34989ce243435f6db82476b18f38ed))
* **transformation-helpers:** log warning only if source is not empty. ([#349](https://github.com/rx-angular/rx-angular/issues/349)) ([291a834](https://github.com/rx-angular/rx-angular/commit/291a83468bec574397ef6aa88b93afbec10d4d12))
* **cdk-folder:** intro cdk folder ([#296](https://github.com/rx-angular/rx-angular/issues/296)) ([72e315f](https://github.com/rx-angular/rx-angular/commit/72e315f98980e599186324681a05c992ac130c3f))

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
