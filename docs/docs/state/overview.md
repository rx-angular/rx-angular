# @rx-angular/state

[![npm](https://img.shields.io/npm/v/%40rx-angular%2Fstate.svg)](https://www.npmjs.com/package/%40rx-angular%2Fstate)
[![rx-angular circleci-status](https://circleci.com/gh/BioPhoton/rx-angular.svg?style=shield)](https://circleci.com/gh/BioPhoton/rx-angular)
[![Coverage Status](https://coveralls.io/repos/github/BioPhoton/rx-angular/badge.svg?branch=master)](https://coveralls.io/github/BioPhoton/rx-angular?branch=master)

## Reactive Component State for Angular

RxState is a light-weight, flexible, strongly typed and tested tool dedicated to reduce the complexity of managing component state in angular.

![state logo](https://raw.githubusercontent.com/BioPhoton/rx-angular/master/libs/state/images/state_logo.png)

## Description

Developing modern, **reactive** user interfaces imposes a variety of challenging tasks. Naming some of those:

- reacting to events from different sources
- transforming and composing state
- handling state lifetime
- handling subscriptions

There are plenty of solutions available for managing these challenges on a **global level** (Akita, NgRx, NgXs, ...).
None of them is dedicated targeting the special needs of the **component level**.

`@rx-angular/state` was specifically designed to give developers a tool for mastering **component state** without forcing
them to use complex design patterns.

It's light-weight and intuitive API and the automatic subscription handling making `@rx-angular/state`
the **perfect fit** for handling state in any angular component.

Using this library allows you to implement things like:

- merge global into local state
- shared state selections
- subscription-less interaction
- hook into imperative functions (e.g. component lifecycle or HostBindings)

with very little effort in any component.

<p float="left">
  <img src="https://raw.githubusercontent.com/BioPhoton/rx-angular/master/libs/state/images/state_API-names.png" width="49%" />
  <img src="https://raw.githubusercontent.com/BioPhoton/rx-angular/master/libs/state/images/state_API-types.png" width="49%" />
</p>

## Key features

- Slim and intuitive API
- Automated subscription handling
- Intuitive way for handling ViewModels
- Connect any Observable source to the state
- Partial state updates
- Reactive state selection
- Lazy state (no BehaviourSubject)
- Foundation for zone-less Angular applications
