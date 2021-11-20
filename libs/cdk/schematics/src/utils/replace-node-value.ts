import { Tree } from '@angular-devkit/schematics';
import * as ts from 'typescript';

import { ReplaceChange } from './changes';
import { insert } from './insert';

export function replaceNodeValue(
  host: Tree,
  modulePath: string,
  node: ts.Node,
  content: string
) {
  insert(host, modulePath, [
    new ReplaceChange(
      modulePath,
      node.getStart(node.getSourceFile()),
      node.getText(),
      content
    ),
  ]);
}
