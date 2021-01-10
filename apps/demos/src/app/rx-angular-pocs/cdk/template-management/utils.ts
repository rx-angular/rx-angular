import { ElementRef, Type } from '@angular/core';
import { HEADER_OFFSET, QUERIES } from '../utils/view-constants';

export function extractParentElements(cdRef: any, eRef: ElementRef): Type<any>[] {
  const parentDetectorView = (cdRef as any)._cdRefInjectingView;
  const parentElements = new Set<Type<any>>();
  const queries = parentDetectorView[QUERIES]['queries'];
  // console.log(queries);
  for (const query of queries) {
    if (query['queryList']['_results']?.length > 0) {
      const comp = query['queryList']['_results'][0];
      const el = comp['__ngContext__'][HEADER_OFFSET][0];
      if (el?.contains(eRef.nativeElement)) {
        parentElements.add(comp);
      }
    }
  }
  return Array.from(parentElements);
}
