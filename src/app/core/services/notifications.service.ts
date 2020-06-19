import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {NotificationLabelsInterface} from '../../shared/models/notifications.model';

export const NotificationsConfig: MatSnackBarConfig = {
  verticalPosition: 'top',
  horizontalPosition: 'right',
  duration: 3000,
};

export const NotificationsSuccessLabels: NotificationLabelsInterface = {
  message: 'This action was successful.',
  action: 'Thank You',
};

export const NotificationsErrorLabels: NotificationLabelsInterface = {
  message: 'Something went wrong. Please try again later.',
  action: 'Dismiss.',
};

@Injectable({
  providedIn: 'root',
})
export class NotificationsFacade {
  constructor(
    private readonly matSnackBar: MatSnackBar,
  ) {
  }

  public displaySuccessMessage(
    labels: NotificationLabelsInterface = NotificationsSuccessLabels,
    config: MatSnackBarConfig = NotificationsConfig,
  ): void {
    this.matSnackBar.open(
      labels.message,
      labels.action,
      config,
    );
  }

  public displayErrorMessage(
    labels: NotificationLabelsInterface = NotificationsErrorLabels,
    config: MatSnackBarConfig = NotificationsConfig
  ): void {
    this.matSnackBar.open(
      labels.message,
      labels.action,
      config,
    );
  }
}
