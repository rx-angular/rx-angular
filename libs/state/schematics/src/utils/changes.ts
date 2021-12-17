import { Change } from '@schematics/angular/utility/change';
import * as ts from 'typescript';

export function createRemoveChange(
  sourceFile: ts.SourceFile,
  node: ts.Node,
  pos = node.getStart(sourceFile),
  toRemove = node.getFullText(sourceFile)
): RemoveChange {
  return new RemoveChange(sourceFile.fileName, pos, toRemove);
}

export class RemoveChange implements Change {
  type = 'remove';
  order: number;
  description: string;

  constructor(
    public path: string,
    public pos: number,
    public toRemove: string
  ) {
    if (pos < 0) {
      throw new Error('Negative positions are invalid');
    }
    this.description = `Removed ${toRemove} into position ${pos} of ${path}`;
    this.order = pos;
  }

  apply(host: any): Promise<void> {
    return host.read(this.path).then((content: string) => {
      const prefix = content.substring(0, this.pos);
      const suffix = content.substring(this.pos + this.toRemove.length);
      return host.write(this.path, `${prefix}${suffix}`);
    });
  }
}

export class InsertChange implements Change {
  type = 'insert';
  order: number;
  description: string;

  constructor(public path: string, public pos: number, public toAdd: string) {
    if (pos < 0) {
      throw new Error('Negative positions are invalid');
    }
    this.description = `Inserted ${toAdd} into position ${pos} of ${path}`;
    this.order = pos;
  }

  apply(host: any) {
    return host.read(this.path).then((content: string) => {
      const prefix = content.substring(0, this.pos);
      const suffix = content.substring(this.pos);

      return host.write(this.path, `${prefix}${this.toAdd}${suffix}`);
    });
  }
}

export class NoopChange implements Change {
  type = 'noop';
  description = 'No operation.';
  order = Infinity;
  path = null;

  apply() {
    return Promise.resolve();
  }
}

export class ReplaceChange implements Change {
  type = 'replace';
  order: number;
  description: string;

  constructor(
    public path: string,
    public pos: number,
    public oldText: string,
    public newText: string
  ) {
    if (pos < 0) {
      throw new Error('Negative positions are invalid');
    }
    this.description = `Replaced ${oldText} into position ${pos} of ${path} with ${newText}`;
    this.order = pos;
  }

  apply(host: any): Promise<void> {
    return host.read(this.path).then((content: string) => {
      const prefix = content.substring(0, this.pos);
      const suffix = content.substring(this.pos + this.oldText.length);
      const text = content.substring(this.pos, this.pos + this.oldText.length);
      if (text !== this.oldText) {
        return Promise.reject(
          new Error(`Invalid replace: "${text}" != "${this.oldText}".`)
        );
      }
      return host.write(this.path, `${prefix}${this.newText}${suffix}`);
    });
  }
}
