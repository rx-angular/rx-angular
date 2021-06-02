import { RemoveChange, ReplaceChange } from '@nrwl/workspace/src/utils/ast-utils';
import * as ts from 'typescript';

export function createRemoveChange(
  sourceFile: ts.SourceFile,
  node: ts.Node,
  pos = node.getStart(sourceFile),
  toRemove = node.getFullText(sourceFile)
): RemoveChange {
  return new RemoveChange(sourceFile.fileName, pos, toRemove);
}

export function createReplaceChange(
  sourceFile: ts.SourceFile,
  node: ts.Node,
  oldText: string,
  newText: string
): ReplaceChange {
  return new ReplaceChange(
    sourceFile.fileName,
    node.getStart(sourceFile),
    oldText,
    newText
  );
}
