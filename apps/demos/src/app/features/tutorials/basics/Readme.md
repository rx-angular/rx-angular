# Refactoring to a reactive component setup

In this tutorial we will learn how to refactor a component written in imperative style to a fully reactive implementation.

To setup the project locally run following steps:

- `git clone https://github.com/rx-angular/rx-angular.git rx-angular`
- `cd rx-angular`
- `npm install` or `yarn install`
- `npm run nx serve demos` or `yarn nx serve demos`

The source can be found under `apps/demos/src/app/features/tutorials/basics`

The example shows a simple component setup of a parent container and a child component displaying the data.

In the child component an expansion-panel is used to display the data. This panel can be opened and closed by clicking on the title.
The open/close state of the expansion-panel is forwarded to the parent component as output binding.

As input binding the parent container maintains a number over an input box. Every change of the number gets forwarded to the child component over an input binding.

In the child component there is a background process running. The input value from the parent gets used to start an interval and refresh the list data every [n] milliseconds.
Furthermore, there is a refresh button. A click on it also refreshes the list data.
