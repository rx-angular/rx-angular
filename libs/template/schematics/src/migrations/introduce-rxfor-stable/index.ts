import { renamingRule } from '../../utils/renaming-rule';

const renames: Record<string, string | [string, string]> = {
  ForModule: '@rx-angular/template/for',
  RxFor: '@rx-angular/template/for',
  RxForViewContext: '@rx-angular/template/for',
};

export default renamingRule('@rx-angular/template/experimental/for', renames);
