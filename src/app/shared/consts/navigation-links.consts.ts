import {NavigationLinkInterface} from '../models/navigation-link.model';
import {ROUTES_GENERAL} from '../../app-routing.module';

export const NavigationMenuLinks: NavigationLinkInterface[] = [
  {
    label: 'Dashboard',
    path: ROUTES_GENERAL.DASHBOARD,
  },
  {
    label: 'Users',
    path: ROUTES_GENERAL.USERS,
  },
];
