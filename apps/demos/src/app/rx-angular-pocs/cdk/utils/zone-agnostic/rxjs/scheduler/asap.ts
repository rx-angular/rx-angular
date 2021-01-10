import { AsapAction } from './AsapAction';
import { AsapScheduler } from 'rxjs/internal/scheduler/AsapScheduler';

export const asap = new AsapScheduler(AsapAction);
