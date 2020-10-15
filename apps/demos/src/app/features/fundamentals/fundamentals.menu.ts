import { MENU_ITEMS as CD_MENU_ITEMS } from './change-detection/change-detection.menu';
import { RENDERCALLBACK_MENU } from './render-callback/render-callback.menu';

export const FUNDAMENTALS_MENU = [
  ...CD_MENU_ITEMS,
  ...RENDERCALLBACK_MENU
];
