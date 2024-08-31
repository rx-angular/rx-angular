import { ModifyHtmlCallbackFn } from '@rx-angular/isr/models';
import { Request } from 'express';

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
