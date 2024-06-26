import { Request } from 'express';
import { ISRHandlerConfig, RenderVariant } from '../../../models/src';

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
