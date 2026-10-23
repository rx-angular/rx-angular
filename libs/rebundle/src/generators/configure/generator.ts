import {
  formatFiles,
  type GeneratorCallback,
  type ProjectConfiguration,
  readProjectConfiguration,
  runTasksInSerial,
  type TargetConfiguration,
  type Tree,
  updateProjectConfiguration,
} from '@nx/devkit';
import initGenerator from '../init/generator';
import { ConfigureGeneratorSchema } from './schema';

const pluginPath = '@rx-angular/rebundle';
const nxApplicationExecutor = '@nx/angular:application';
const nxBrowserEsbuildExecutor = '@nx/angular:browser-esbuild';
const angularApplicationExecutor = '@angular/build:application';
const nxDevServerExecutor = '@nx/angular:dev-server';
const angularDevServerExecutor = '@angular/build:dev-server';

type EsbuildPluginSpec = string | { path: string; options?: unknown };

export async function configureGenerator(
  tree: Tree,
  options: ConfigureGeneratorSchema,
): Promise<GeneratorCallback> {
  const initTask = await initGenerator(tree, {
    skipFormat: true,
    skipPackageJson: options.skipPackageJson,
    keepExistingVersions: options.keepExistingVersions,
  });

  const project = readProjectConfiguration(tree, options.project);
  const buildTarget = getBuildTarget(project, options.project);

  migrateAngularBuildTargets(project);

  buildTarget.options ??= {};
  const plugins = normalizePlugins(buildTarget.options['plugins']);

  if (!plugins.some(isRebundlePlugin)) {
    plugins.push(pluginPath);
  }

  buildTarget.options['plugins'] = plugins;
  updateProjectConfiguration(tree, options.project, project);

  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  return runTasksInSerial(initTask);
}

function migrateAngularBuildTargets(project: ProjectConfiguration): void {
  const buildTarget = project.targets?.['build'];
  if (buildTarget?.executor === angularApplicationExecutor) {
    buildTarget.executor = nxApplicationExecutor;
  }

  const serveTarget = project.targets?.['serve'];
  if (serveTarget?.executor === angularDevServerExecutor) {
    serveTarget.executor = nxDevServerExecutor;
  }
}

export default configureGenerator;

function getBuildTarget(
  project: ProjectConfiguration,
  projectName: string,
): TargetConfiguration {
  const buildTarget = project.targets?.['build'];

  if (!buildTarget) {
    throw new Error(`Project "${projectName}" does not have a build target.`);
  }

  if (
    buildTarget.executor !== nxApplicationExecutor &&
    buildTarget.executor !== nxBrowserEsbuildExecutor &&
    buildTarget.executor !== angularApplicationExecutor
  ) {
    throw new Error(
      `Project "${projectName}" build target must use "@nx/angular:application", "@nx/angular:browser-esbuild", or "@angular/build:application".`,
    );
  }

  return buildTarget;
}

function normalizePlugins(plugins: unknown): EsbuildPluginSpec[] {
  if (plugins === undefined) {
    return [];
  }

  if (!Array.isArray(plugins)) {
    throw new Error('The build target "plugins" option must be an array.');
  }

  if (plugins.some((plugin) => !isPluginSpec(plugin))) {
    throw new Error(
      'The build target "plugins" option must contain string plugin paths or plugin spec objects.',
    );
  }

  return [...plugins];
}

function isPluginSpec(plugin: unknown): plugin is EsbuildPluginSpec {
  return (
    typeof plugin === 'string' ||
    (typeof plugin === 'object' &&
      plugin !== null &&
      typeof (plugin as { path?: unknown }).path === 'string')
  );
}

function isRebundlePlugin(plugin: EsbuildPluginSpec): boolean {
  return typeof plugin === 'string'
    ? plugin === pluginPath
    : plugin.path === pluginPath;
}
