/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export interface Host {
  write(path: string, content: string): Promise<void>;
  read(path: string): Promise<string>;
}

export interface Change {
  // The file this change should be applied to. Some changes might not apply to
  // a file (maybe the config).
  readonly path: string | null;

  // The order this change should be applied. Normally the position inside the file.
  // Changes are applied from the bottom of a file to the top.
  readonly order: number;

  // The description of this change. This will be outputted in a dry or verbose run.
  readonly description: string;

  apply(host: Host): Promise<void>;
}

/**
 * An operation that does nothing.
 */
export class NoopChange implements Change {
  description = 'No operation.';
  order = Infinity;
  path = null;
  apply() {
    return Promise.resolve();
  }
}

/**
 * Will add text to the source code.
 */
export class InsertChange implements Change {
  order: number;
  description: string;

  constructor(public path: string, public pos: number, public toAdd: string) {
    if (pos < 0) {
      throw new Error('Negative positions are invalid');
    }
    this.description = `Inserted ${toAdd} into position ${pos} of ${path}`;
    this.order = pos;
  }

  /**
   * This method does not insert spaces if there is none in the original string.
   */
  apply(host: Host) {
    return host.read(this.path).then((content) => {
      const prefix = content.substring(0, this.pos);
      const suffix = content.substring(this.pos);

      return host.write(this.path, `${prefix}${this.toAdd}${suffix}`);
    });
  }
}
