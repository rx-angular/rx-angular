---
id: rebundle-architecture
title: 'Architecture & problem statement'
diataxis_type: explanation
package: rebundle
legacy_guard: false
sidebar_label: 'Architecture'
sidebar_position: 1
tags: [rebundle, content]
---

# Architecture and problem statement

## The problem

The esbuild chunking algorithm considers each dynamic entry point as its own
entry point. Because it does not distinguish between entry points, it optimizes
each to reduce the amount of code required to load it.

```mermaid
graph TD
    main
    dynamic
    shared

    main --> shared
    dynamic --> shared
    main -.-> dynamic
```

However, in the context of single page applications (SPAs) like Angular, there is
only one true entry point (`main.ts`), and the rest of the dynamic entry points
cannot load or function outside that context. This means we do not need to
optimize for each entry point in isolation, but instead optimize them considering
their reachability from the main entry point.

```mermaid
graph TD
    subgraph G1["main context"]
        main
        shared
    end

    subgraph G2["dynamic context"]
        dynamic
    end

    G1 -.-> G2
    G2 --> G1
```

### Transpiled source

Consider the following source files:

```typescript
// main.ts
import('./dynamic1');
import('./dynamic2');

// dynamic1.ts
import './static1';
import './static2';
import './static3';

// dynamic2.ts
import './static1';
import './static2';
import './static3';
```

When bundled by esbuild, the output becomes fragmented:

```mermaid
graph TD
    subgraph main.js
        main.ts
    end
    subgraph dynamic1.js
        dynamic1.ts
    end
    subgraph dynamic2.js
        dynamic2.ts
    end
    subgraph static1.js
        static1.ts
    end
    subgraph static2.js
        static2.ts
    end
    subgraph static3.js
        static3.ts
    end

    main.js -.-> dynamic1.js
    main.js -.-> dynamic2.js

    dynamic1.js --> static1.js
    dynamic1.js --> static2.js

    dynamic2.js --> static1.js
    dynamic2.js --> static2.js
    dynamic2.js --> static3.js
```

This fragmentation can result in hundreds of small files being requested at
application startup.

## The solution: advanced chunking strategies

`@rx-angular/rebundle` applies several strategies to merge these fragmented
chunks back into logical groupings. See the
[merge strategies reference](../reference/merge-strategies.md) for how the
strategies apply a sequence of decisions to solve this issue (such as the default
[reachability strategy](../reference/reachability.md)).

### How the strategies are applied

The chunking policy lives entirely in the
[merge strategy configuration](../reference/merge-strategies.md), not in your
application source. `@rx-angular/rebundle` does not rely on source-level import
hints; it works on the build output instead:

1. esbuild emits its chunks and a metafile.
2. The plugin reads the metafile to reconstruct the output module graph.
3. It runs the configured merge strategies against that graph to produce a merge
   map (an output chunk mapped to the chunks that should be merged into it).
4. It hands that merge map to rolldown as code-splitting groups, which regroup
   the chunks in memory before they are written to disk.

The default [reachability strategy](../reference/reachability.md) groups each
dynamic entry point with the chunks only reachable through it. For targeted
grouping you can layer the [static closure](../reference/static-closure.md) and
[common](../reference/common.md) strategies. See the
[merge strategies reference](../reference/merge-strategies.md) for the full
contract.

### Rolldown considerations

While rolldown can achieve some of this by default, configuring it to handle
Angular's rebundling pipeline seamlessly requires analyzing the module graph and
applying these advanced chunking strategies dynamically.

## Bundle issues tracked

To ensure long-term stability and optimization, the following considerations
should be monitored:

- **Chunk size:** Ensure max size limits are respected so we don't end up with
  massive single chunks.
- **Cache invalidation:** Aggressive merging can lead to frequent cache busting.
- **Typechecking:** Import attributes should ideally be typed correctly in the
  global scope.
