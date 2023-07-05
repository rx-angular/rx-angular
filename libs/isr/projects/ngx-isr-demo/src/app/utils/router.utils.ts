import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export const useParams = (param: string): string | null => {
  const route = inject(ActivatedRoute);
  return route.snapshot.paramMap.get(param);
}