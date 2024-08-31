import { Request } from 'express';
import { ModifyHtmlCallbackFn } from '../../models/src';

export const defaultModifyGeneratedHtml: ModifyHtmlCallbackFn = (
  req: Request,
  html: string,
  revalidateTime?: number | null,
): string => {
  const time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

  let msg = '<!-- ';
  msg += `\n🚀 ISR: Served from cache! \n⌛ Last updated: ${time}. `;
  if (revalidateTime)
    msg += `\n⏭️ Next refresh is after ${revalidateTime} seconds. `;
  msg += ' \n-->';
  return html + msg;
};
