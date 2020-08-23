import * as  conventionalRecommendedBump from 'conventional-recommended-bump';
import { execSync } from 'child_process';

const argv = require('yargs')
  .usage('Usage: $0 [-p preset]')
  .example('$0 -p angular', 'start conventional-bump with angular preset')
  .describe('version', 'Print current version')
  .help('h')
  .alias('h', 'help')
  .alias('p', 'preset')
  .nargs('p', 1)
  .default('p', 'angular')
  .describe('p', 'conventional-changelog preset to use')
  .argv;


const options = {
  preset: argv.preset,
};

const execNpmVersion = releaseType => (
  execSync(`npm version ${releaseType}`, { stdio: [0, 1, 2] })
);

conventionalRecommendedBump(options, (err, result) => {
  if (err) {
    throw err;
  }
 // execNpmVersion(result.releaseType);
});
