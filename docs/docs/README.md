# RxAngular

RxAngular offers a comprehensive toolset for handling fully reactive Angular applications with the main focus on runtime
performance and template rendering.

RxAngular is divided into two initially independent packages:

- [📦@rx-angular/template](https://github.com/BioPhoton/rx-angular/tree/master/libs/template/README.md)
- [📦@rx-angular/state](https://github.com/BioPhoton/rx-angular/tree/master/libs/state/README.md)

Used together, you get a powerful tool for developing high-performance angular applications with or without NgZone.

## @rx-angular/template

[![npm version](https://badge.fury.io/js/%40rx-angular%2Ftemplate.svg)](https://www.npmjs.com/@rx-angular/template)
[![rx-angular](https://circleci.com/gh/BioPhoton/rx-angular.svg?style=shield)](https://circleci.com/gh/BioPhoton/rx-angular)

A comprehensive toolset for fully reactive rendering in Angular.
It leverages the latest Browser APIs (while still being backwards compatible) to maximize the rendering performance and thus
the user experience of your angular application.
The functionalities are provided by
structural directives, pipes, RxJS operators, or imperative functions to manage the rendering in Angular.

## Key features

- Optimized rendering performance
- Configurable change detection strategies
- Works in zone-full as well as zone-less applications

## @rx-angular/state

[![npm](https://img.shields.io/npm/v/%40rx-angular%2Fstate.svg)](https://www.npmjs.com/package/%40rx-angular%2Fstate)
[![rx-angular circleci-status](https://circleci.com/gh/BioPhoton/rx-angular.svg?style=shield)](https://circleci.com/gh/BioPhoton/rx-angular)
[![Coverage Status](https://coveralls.io/repos/github/BioPhoton/rx-angular/badge.svg?branch=master)](https://coveralls.io/github/BioPhoton/rx-angular?branch=master)

A light-weight, flexible, strongly typed and tested tool dedicated to reduce the complexity of managing component state in Angular applications.

## Key features

- Slim and intuitive API
- Automated subscription handling
- Intuitive way for handling ViewModels
- Connect any Observable source to the state
- Partial state updates
- Reactive state selection
- Lazy state (no BehaviourSubject)
- Foundation for zone-less Angular applications
