import { disableGlobalAPIs, globalAPIs } from './zone-global-aps';
import { eventTargets, setupTargets } from './zone-events';

disableGlobalAPIs(globalAPIs);
setupTargets(eventTargets);
