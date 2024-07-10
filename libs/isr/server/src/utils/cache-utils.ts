import { ISRHandlerConfig, RenderVariant } from '@rx-angular/isr/models';
import { Request } from 'express';

export const getCacheKey = (
  url: string,
  variant: RenderVariant | null,
): string => {
  if (!variant) return url;
  return `${url}<variantId:${variant.identifier}>`;
};

export const getVariant = (
  req: Request,
  config: ISRHandlerConfig,
): RenderVariant | null => {
  if (!config.variants) {
    return null;
  }
  return (
    config.variants.find((variant: RenderVariant) =>
      variant.detectVariant(req),
    ) || null
  );
};
