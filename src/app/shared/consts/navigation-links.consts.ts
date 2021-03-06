import {NavigationLinkInterface} from '../models/navigation-link.model';
import {ROUTES_GENERAL} from './routes.consts';

export const NavigationMenuLinks: NavigationLinkInterface[] = [
  {
    label: 'LABELS.DASHBOARD',
    path: ROUTES_GENERAL.DASHBOARD,
  },
  {
    label: 'LABELS.USERS',
    path: ROUTES_GENERAL.USERS,
  },
];
