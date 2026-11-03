import { ParamMap } from '@angular/router';

export type BenchmarkMode = 'plain' | 'vv' | 'vv-cache';

export interface BenchmarkParams {
  mode: BenchmarkMode;
  items: number;
  cacheSize: number;
  /** empty divs rendered inside every card to mimic DOM-heavy components */
  nodes: number;
}

export const BENCHMARK_DEFAULTS: BenchmarkParams = {
  mode: 'vv-cache',
  items: 1000,
  cacheSize: 50,
  nodes: 200,
};

export function readBenchmarkParams(params: ParamMap): BenchmarkParams {
  const mode = params.get('mode');
  return {
    mode:
      mode === 'plain' || mode === 'vv' || mode === 'vv-cache'
        ? mode
        : BENCHMARK_DEFAULTS.mode,
    items: toInt(params.get('items'), BENCHMARK_DEFAULTS.items),
    cacheSize: toInt(params.get('cacheSize'), BENCHMARK_DEFAULTS.cacheSize),
    nodes: toInt(params.get('nodes'), BENCHMARK_DEFAULTS.nodes),
  };
}

function toInt(value: string | null, fallback: number) {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

/**
 * Plain counters, written by the cards and read on demand by the list page.
 * Not signals on purpose: cards are created during change detection and we
 * don't want the measurement itself to schedule extra work.
 */
export const benchmarkStats = {
  navStart: 0,
  created: 0,
  destroyed: 0,
  lastCreatedAt: 0,
  /** placeholder → content swaps (content view created or taken from cache) */
  swapIn: createSwapStats(),
  /** content → placeholder swaps (content view destroyed or moved to cache) */
  swapOut: createSwapStats(),
  reset() {
    this.created = 0;
    this.destroyed = 0;
    this.lastCreatedAt = 0;
    resetSwapStats(this.swapIn);
    resetSwapStats(this.swapOut);
  },
};

export interface SwapStats {
  count: number;
  /** summed main-thread time of the swaps */
  ms: number;
  lastEndAt: number;
}

function createSwapStats(): SwapStats {
  return { count: 0, ms: 0, lastEndAt: 0 };
}

function resetSwapStats(stats: SwapStats) {
  stats.count = 0;
  stats.ms = 0;
  stats.lastEndAt = 0;
}

export const NAV_START_MARK = 'vv-bench:nav-start';

export interface BenchmarkItem {
  id: number;
  title: string;
  description: string;
  tags: string[];
  stats: { label: string; value: number }[];
}

const WORDS = [
  'Apple',
  'Banana',
  'Orange',
  'House',
  'Boat',
  'Lake',
  'Car',
  'River',
  'Stone',
  'Cloud',
  'Forest',
  'Bridge',
];

/** Deterministic data (seeded PRNG), so every run renders the same DOM. */
export function createBenchmarkItems(count: number): BenchmarkItem[] {
  const random = mulberry32(42);
  const word = () => WORDS[Math.floor(random() * WORDS.length)];
  const words = (n: number) => Array.from({ length: n }, word).join(' ');

  return Array.from({ length: count }, (_, id) => ({
    id,
    title: `#${id} ${words(2)}`,
    description: words(18),
    tags: Array.from({ length: 6 }, word),
    stats: ['Views', 'Likes', 'Shares', 'Comments'].map((label) => ({
      label,
      value: Math.floor(random() * 10_000),
    })),
  }));
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
