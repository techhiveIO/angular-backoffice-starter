import {MatSnackBarConfig} from '@angular/material/snack-bar';
import {NotificationLabelsInterface} from '../models/notifications.model';

export const MOCKED_SNACKBAR_CONFIG: MatSnackBarConfig = {
  horizontalPosition: 'right',
  verticalPosition: 'top',
  duration: 3000,
};

export const MOCKED_NOTIFICATION_LABELS: NotificationLabelsInterface = {
  message: 'Mocked Message',
  action: 'Mocked Action',
};
