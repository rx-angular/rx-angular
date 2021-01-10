import { AnimationFrameAction } from './AnimationFrameAction';
import { AnimationFrameScheduler } from 'rxjs/internal/scheduler/AnimationFrameScheduler';

export const animationFrame = new AnimationFrameScheduler(AnimationFrameAction);
