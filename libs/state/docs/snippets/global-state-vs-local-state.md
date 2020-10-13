# Difference between Global and Local state

## Global state

- **Lifetime**. Static and, beside lazy instantiation, equal to the app lifetime. It never gets destroyed.
- **Sharing**. Shared globally in the app. In Angular global state is nearly always shared over global singleton services.
- **Processed Sources**. In most cases process external sources (REST API's, Web Sockets, Browser URL).

## Local state

- **Lifetime**. Dynamic and bound to some components, pipes, directives, or services that will be created and destroyed over time. When the state owner is destroyed state is no longer needed.
- **Sharing**. This state can only be shared with children.
- **Processed Sources**. Nearly always focus on the process of the following sources: Data from @InputBindings, UI Events, Component level Side-Effects, Parsing global state to local.

## Detecting state type

To understand the state type it might be enough to answer 2 simple questions:

- Do I need to keep this data during the whole lifetime of my application?
- Do other parts of my app cares about this state? (other views for example)

If both answers are "no", most probably you're working with local state.

## Example

Let's take a look at a simple todo app. This app has 2 views.

### To do

- Renders a list of `tasks` that must be completed and a `counter` that shows how many tasks left to do.
- The list can be expanded or collapsed and has property `isExpanded`.
- Gets tasks array from endpoint _tasks/get_ and filters out tasks that already answered.

### Setup

- Renders a list of all existing `tasks` and a `counter` that shows the total amount of tasks.
- The list can be expanded or collapsed and has property `isExpanded`.
- Gets tasks as array from endpoint _tasks/get_.

### What is global and what is local?

- `counter` property is a part of **local** state of each view. The counter value is specific for each view.
- `isExpanded` property is also part of **local** state. Both lists can be expanded/collapsed but this status isn't shared between them and they don't care about this status of each other.
- `tasks` array is a part of our app **global** state. This array needed for each view and received from the same endpoint. We don't need to load it twice. It is time to introduce a global layer to our application and move tasks array and retrieving logic there.

Resources:
_[Research on Reactive-Ephemeral-State in component-oriented frameworks](https://dev.to/rxjs/research-on-reactive-ephemeral-state-in-component-oriented-frameworks-38lk), Dev.to, Michael Hladky_