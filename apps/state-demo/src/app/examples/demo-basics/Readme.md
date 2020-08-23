# Refactoring to a reactive component setup

In this tutorial we will learn how to refactor a component written in imperative style to a fully reactive implementation.

To setup the project locally run following steps:

- `git clone https://github.com/BioPhoton/rx-angular.git rx-angular`
- `cd rx-angular`
- `npm install` or `yarn install`
- `npm run nx serve state-demo` or `yarn nx serve state-demo`

The source can be found under `apps/state-demo/src/app/examples/demo-basics`

The example shows a simple component setup od a parent container and a child component displaying the data.

In the child component an expansion-panel is used to display the data. this panel can be opened and closed by clicking on the title.
The open/close state of the expansion-panel is forwarded to the parent component as output binding.

As input binding the parent container maintains a number over an input box. Every change od the number gets forwarded to the child component over an input binding.

In the child component there is a background process running. the input value from the parent gets used to start an interval and refresh the list data every [n] milliseconds.
Furthermore, there is a refresh button. A click on it also refreshes the list data.

Chapters we will discuss are:

- [Setup a reactive state, selections and, UI interactions](https://github.com/BioPhoton/rx-angular/tree/master/apps/state-demo/src/app/examples/demo-basics/1)
- [Handing Side Effects reactively](https://github.com/BioPhoton/rx-angular/tree/master/apps/state-demo/src/app/examples/demo-basics/2)
