---
sidebar_label: Presenter Pattern
title: Micro Architecture and the MVVM Design Pattern
# Renamed from apps/demos/src/app/features/tutorials/basics/5-side-effects/Readme.md
---

# Micro Architecture and the MVVM Design Pattern

1. Create an interface DemoBasicsView and implement all UI interaction like buttons etc.

```typescript

```

2. Create an interface DemoBasicsBaseModel this is basically a copy of your previous ComponentState.

```typescript

```

3. Implement a property `baseModel$: Observable<DemoBasicsBaseModel>;` to provide the base model state.

```typescript

```

4. Create a service called DemoBasicsViewModel

```typescript

```

- extend `LocalState<DemoBasicsBaseModel>`

```typescript

```

- implement DemoBasicsView

```typescript

```

5. Inject `DemoBasicsViewModel` as service into `MutateStateComponent` constructor under property `vm`

```typescript

```

- remove everything related to the view

```typescript

```

- Refactor to use the vm connectState method

```typescript

```

- Refactor to use the vm refreshListSideEffect\$ property

```typescript

```

6. Refactor to use the vm.setState

```typescript

```
