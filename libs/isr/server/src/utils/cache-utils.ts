import { RenderVariant } from '@rx-angular/isr/models';
import { Request } from 'express';

export const defaultCacheKeyGenerator = (
  url: string,
  allowedQueryParams: string[] | null | undefined,
  variant: RenderVariant | null,
): string => {
  let normalizedUrl = url;
  if (allowedQueryParams) {
    // Normalize the URL by removing disallowed query parameters
    // using http://localhost as the base URL to parse the URL
    // since the URL constructor requires a base URL to parse relative URLs
    // it will not be used in the final cache key
    const urlObj = new URL(url, 'http://localhost');
    const searchParams = urlObj.searchParams;
    const filteredSearchParams = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (allowedQueryParams.includes(key)) {
        filteredSearchParams.append(key, value);
      }
    });
    normalizedUrl = `${urlObj.pathname}${filteredSearchParams.toString() ? '?' + filteredSearchParams.toString() : ''}`;
  }
  if (!variant) return normalizedUrl;
  return `${normalizedUrl}<variantId:${variant.identifier}>`;
};

export const getVariant = (
  req: Request,
  variants: RenderVariant[] | undefined,
): RenderVariant | null => {
  if (!variants) {
    return null;
  }
  return (
    variants.find((variant: RenderVariant) => variant.detectVariant(req)) ||
    null
  );
};
