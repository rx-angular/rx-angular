import type { Metafile, OutputFile } from 'esbuild';
import { basename } from 'node:path';
import type { OutputChunk, RolldownOutput } from 'rolldown';
import { toEsbuildOutputFile } from '../utils/output-file';

export function rolldownOutputsToEsbuildOutputs(
  rolldownOutput: RolldownOutput['output'],
  { outputs }: Metafile,
): {
  newMetafileOutputs: Metafile['outputs'];
  newOutputFiles: OutputFile[];
} {
  const newMetafileOutputs: Metafile['outputs'] = {};
  const newOutputFiles: OutputFile[] = [];
  const outputsByFilename = createOutputsByFilename(outputs);

  for (const output of rolldownOutput) {
    if (output.type !== 'chunk') {
      continue;
    }

    const file = toEsbuildOutputFile(
      output.fileName,
      output.code,
      getHashFromFileName(output.fileName),
    );

    newOutputFiles.push(file);
    newMetafileOutputs[output.fileName] = {
      bytes: file.contents.length,
      imports: mergeImports(output.imports, output.dynamicImports),
      inputs: mergeInputs(
        output.moduleIds.map((moduleId) =>
          getInputsForModule(moduleId, outputs, outputsByFilename),
        ),
      ),
      exports: output.exports,
    };

    if (output.facadeModuleId) {
      newMetafileOutputs[output.fileName].entryPoint = getOutputForModule(
        output.facadeModuleId,
        outputs,
        outputsByFilename,
      )?.entryPoint;
    }

    addSourceMapOutput(output, newMetafileOutputs, newOutputFiles);
  }

  return { newMetafileOutputs, newOutputFiles };
}

function createOutputsByFilename(
  outputs: Metafile['outputs'],
): Map<string, Metafile['outputs'][string]> {
  return new Map(
    Object.entries(outputs).map(([outputPath, output]) => [
      basename(outputPath),
      output,
    ]),
  );
}

function getInputsForModule(
  moduleId: string,
  outputs: Metafile['outputs'],
  outputsByFilename: Map<string, Metafile['outputs'][string]>,
): Metafile['outputs'][string]['inputs'] {
  const output = getOutputForModule(moduleId, outputs, outputsByFilename);

  if (output) {
    return output.inputs;
  }

  return {
    [moduleId]: {
      bytesInOutput: 0,
    },
  };
}

function getOutputForModule(
  moduleId: string,
  outputs: Metafile['outputs'],
  outputsByFilename: Map<string, Metafile['outputs'][string]>,
): Metafile['outputs'][string] | undefined {
  return outputs[moduleId] ?? outputsByFilename.get(basename(moduleId));
}

function mergeImports(
  imports: OutputChunk['imports'],
  dynamicImports: OutputChunk['dynamicImports'],
): Metafile['outputs'][string]['imports'] {
  return [
    imports.map((path): Metafile['outputs'][string]['imports'][number] => ({
      path,
      kind: 'import-statement',
    })),
    dynamicImports.map(
      (path): Metafile['outputs'][string]['imports'][number] => ({
        path,
        kind: 'dynamic-import',
      }),
    ),
  ].flat();
}

function mergeInputs(
  chunkInputs: Metafile['outputs'][string]['inputs'][],
): Metafile['outputs'][string]['inputs'] {
  const inputs: Metafile['outputs'][string]['inputs'] = {};

  for (const chunkInput of chunkInputs) {
    for (const [key, value] of Object.entries(chunkInput)) {
      if (Object.prototype.hasOwnProperty.call(inputs, key)) {
        inputs[key].bytesInOutput += value.bytesInOutput;
      } else {
        inputs[key] = value;
      }
    }
  }

  return inputs;
}

function addSourceMapOutput(
  output: OutputChunk,
  newMetafileOutputs: Metafile['outputs'],
  newOutputFiles: OutputFile[],
): void {
  if (!output.map || !output.sourcemapFileName) {
    return;
  }

  const mapFile = toEsbuildOutputFile(
    output.sourcemapFileName,
    output.map.toString(),
    getHashFromFileName(output.sourcemapFileName),
  );

  newOutputFiles.push(mapFile);
  newMetafileOutputs[output.sourcemapFileName] = {
    imports: [],
    exports: [],
    inputs: {},
    bytes: mapFile.contents.length,
  };
}

function getHashFromFileName(name: string): string {
  return name.replace(/(\.js(\.map)?)$/, '').slice(-8);
}
