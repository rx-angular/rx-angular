import { renamingRule } from '../../utils/renaming-rule';

const renames: Record<string, string | [string, string]> = {
  IfModule: '@rx-angular/template/if',
  RxIf: '@rx-angular/template/if',
  RxIfViewContext: '@rx-angular/template/if',
};

export default renamingRule('@rx-angular/template/experimental/if', renames);
