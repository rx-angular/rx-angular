import StackBlitzkSDK from '@stackblitz/sdk';
import { Injectable } from '@angular/core';
import { Project } from '@stackblitz/sdk/typings/interfaces';

interface StackBlitzExampleConfig {
  code: string;
  language: string;
  html?: string;
  dependencies: {
    [name: string]: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class StackblitzService {
  openProject(config: StackBlitzExampleConfig) {
    const codeExtension: 'js' | 'ts' = {
      'ts': 'ts',
      'typescript': 'ts'
    }[config.language] || 'js';

    const template: Project['template'] = 'typescript, ts'.split(',').includes(codeExtension)
      ? 'typescript'
      : 'javascript';

    StackBlitzkSDK.openProject({
      files: {
        'index.html': config.html || '',
        [`index.${codeExtension}`]: config.code
      },
      title: 'RxAngular example',
      description: 'RxAngular example',
      template,
      tags: ['rx-angular', 'demo'],
      dependencies: config.dependencies,
      settings: {
        compile: {
          trigger: 'auto',
          action: 'refresh',
          clearConsole: true,
        },
      }
    }, {
        devToolsHeight: 50
    });
  }
}
