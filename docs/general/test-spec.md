# Test specs

## Metrics

- MS
- Layout work
- Scripting
- FlameChart depth
- Framerate
- Memory snapshots (?)

## Test scenarios

- Bootstrap time
- First update
- Subsequent updates
- Update \*nth items (sync)
- Add items
- Rearrange items
- Remove items
- Scripting work, layout work, painting work (?)

## General test cases:

### Static Template Structures
Test cases targeting the common scenarios in statically created template structures.

#### Passing Values through input bindings:

- statically/async/push/observable (dirtyCheck scripting work)

#### Eager vs Lazy Template:
- Bootstrap *ngIf vs *rxLet / *ngIf+placeholders *rxLet+placeholder
- Updating *ngIf vs *rxLet / *ngIf+placeholders *rxLet+placeholder

### Conditional Template Structures

Test cases targeting the common scenarios in conditionally created template structures. 
These are all kind of template expressions as well as structural directives used to 
conditionally set a value or render a template snippet. e.g. *ngIf, ngClass

#### EmbeddedView Caching vs No EmbeddedView Caching
  - *ngIf vs *rxLet / *ngIf+placeholder vs *rxLet+placeholder
  low num of components & high num of work load / high num of components & low num of work load

### Iterable Template Structures
  - *ngIf vs *rxLet / *ngIf+placeholder vs *rxLet+placeholder
  low num of components & high num of work load / high num of components & low num of work load


Lists: 
- creating 1,000 rows
- updating all 1,000 rows (5 warmup runs)
- updating every 10th row for 1,000 rows (3 warmup runs).
- highlighting a selected row. (no warmup runs).
- swap 2 rows for table with 1,000 rows. (5 warmup runs).
- removing one row. (5 warmup runs).
- creating 10,000 rows
- appending 1,000 to a table of 10,000 rows.
- clearing a table with 1,000 rows.

Version Specific:

## Evaluation

- Difference between using suspense or not. What performance impact has providing suspense template vs not providing it suspense. Behavior - emit first value immidiately or after 50/500 ms.
