import { ElementRef, Type } from '@angular/core';
import { HEADER_OFFSET, QUERIES } from '../utils/view-constants';

export function extractParentElements(cdRef: any, eRef: ElementRef): Type<any>[] {
  const parentDetectorView = (cdRef as any)._cdRefInjectingView;
  const parentElements = new Set<Type<any>>();
  if(parentDetectorView[QUERIES] === null) {
   return [];
  }
  const queries = parentDetectorView[QUERIES]['queries'];

  for (const query of queries) {
    if (query['queryList']['_results']?.length > 0) {
      const comp = query['queryList']['_results'][0];
      if(!comp['__ngContext__'] || !comp['__ngContext__'][HEADER_OFFSET]) {
        continue;
      }
      const el = comp['__ngContext__'][HEADER_OFFSET][0];
      if (comp.__proto__?.constructor?.ɵcmp && el?.contains(eRef.nativeElement)) {
        parentElements.add(comp);
      }
    }
  }
  return Array.from(parentElements);
}
