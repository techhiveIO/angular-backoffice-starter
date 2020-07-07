import {NotificationLabelsInterface} from '../models/notifications.model';

export const loginErrorMessage: NotificationLabelsInterface = {
  message: 'Your email/password combination is wrong.',
  action: 'Thank you',
};

export const signUpErrorMessage: NotificationLabelsInterface = {
  message: 'This email address is already in use.',
  action: 'Thank you',
};
