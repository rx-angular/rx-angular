import { computeAverageColor } from '../pixel-image';
import { RGBA, RGBAs } from '../model';

const RERUN_COUNT = 10;

type Clusters = RGBA[][];
type Groups = RGBA[][];
type Means = RGBA[];

interface ClusterResult {
  means: Means
  clusters: Clusters,
  error: number
}

interface MeanResult {
  means: Means,
  groups: Groups,
  error: number
}

interface KMeansResult {
  clusters: Clusters,
  error: number
}

class KMeansRunner {

  palette(result: KMeansResult): RGBAs {
    // tslint:disable-next-line:no-bitwise
    return result.clusters.map(rgba => computeAverageColor(rgba).map(v => ~~v) as RGBA)
  }

  run(k: number, pixels: RGBAs): KMeansResult {
    let clusters = null;
    let error = Infinity;

    // re-run several times and keep the best result
    for (let attempt = 0; attempt < RERUN_COUNT; attempt++) {
      const result = this.cluster(pixels, k);
      if (result.error < error) {
        clusters = result.clusters;
        error = result.error;
      }
    }

    return {
      clusters: clusters,
      error: error
    };
  }

  cluster(pixels: RGBAs, k: number): ClusterResult {
    // randomly initialize means
    let means = [];
    for (let i = 0; i <= k; i++) {
      const pixel = pixels[Math.floor(Math.random() * pixels.length)];
      means.push(pixel);
    }

    let done = false;
    let result: MeanResult = null;
    while (!done) {
      /* console.log("iterating...");*/
      result = this.groupPointsByMeans(means, pixels);
      const newMeans = this.computeMeans(result.groups);
      done = this.isDone(means, newMeans);
      means = newMeans;
    }
    /* console.log("DONE ===========================");*/
    return {
      clusters: result.groups,
      error: result.error,
      means: result.means
    };
  }

  computeMeans(groups: Groups): RGBAs {
    return groups.map((group) => {
      return computeAverageColor(group);
    });
  }

  isDone(meansA: Means, meansB: Means): boolean {
    let result = false;
    meansA.forEach((mean) => {
      let meanIsAlsoInMeansB = false;
      meansB.forEach((otherMean) => {
        if ((mean[0].toFixed(2) === otherMean[0].toFixed(2)) &&
          (mean[1].toFixed(2) === otherMean[1].toFixed(2)) &&
          (mean[2].toFixed(2) === otherMean[2].toFixed(2))) {
          meanIsAlsoInMeansB = true;
        }
      });
      // @ts-ignore
      // tslint:disable-next-line:no-bitwise
      result |= meanIsAlsoInMeansB;
    });
    return result;
  }

  groupPointsByMeans(means: Means, pixels: RGBAs): MeanResult {
    let totalError = 0;
    const groups = new Array(means.length).fill([]);

    pixels.forEach((pixel) => {
      let bestGroupIndex;
      let bestGroupError = Infinity;

      means.forEach((mean, index) => {
        const error = this.distance([pixel[0], pixel[1], pixel[2]], [mean[0], mean[1], mean[2]]);
        if (error < bestGroupError) {
          bestGroupError = error;
          bestGroupIndex = index;
        }
      });
      groups[bestGroupIndex].push(pixel);
      totalError += bestGroupError;
    });
    return {
      means: means,
      groups: groups,
      error: totalError
    };
  }

  distance(pointA, pointB): number {
    const squaredDiffs = pointA.map((dim, index) => {
      const diff = pointA[index] - pointB[index];
      return diff * diff;
    });
    return Math.sqrt(squaredDiffs.reduce((s, n) => s + n, 0));
  }

}

export const kMeansRunner = new KMeansRunner();
