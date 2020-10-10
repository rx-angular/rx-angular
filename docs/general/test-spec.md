# Test specs

## Metrics

- MS
- Layout work
- Scripting
- Flamechart depth
- Framerate
- Memory snapshots (?)

## Test scenarios

- Bootstrap time
- First update
- Subsiquent updates
- Update \*nth items (sync)
- Add items
- Rearrange items
- Remove items
- Scripting work, layout work, painting work (?)

## Test cases

- creating 1,000 rows
- updating all 1,000 rows (5 warmup runs)
- updating every 10th row for 1,000 rows (3 warmup runs).
- highlighting a selected row. (no warmup runs).
- swap 2 rows for table with 1,000 rows. (5 warmup runs).
- removing one row. (5 warmup runs).
- creating 10,000 rows
- appending 1,000 to a table of 10,000 rows.
- clearing a table with 1,000 rows.

## Evaluation

- Difference between using suspense or not. What performance impact has providing suspense template vs not providing it suspense. Behavior - emit first value immidiately or after 50/500 ms.
