import {NotificationsConfig, NotificationsErrorLabels, NotificationsFacade, NotificationsSuccessLabels} from './notifications.service';
import {async, TestBed} from '@angular/core/testing';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  MOCKED_SNACKBAR_CONFIG,
  MOCKED_NOTIFICATION_LABELS
} from '../mocks/notifications.mocks';

describe('Notifications Facade', () => {
  let service: NotificationsFacade;
  let mockedSnackBar: jasmine.SpyObj<MatSnackBar>;

  const configureTestingModule: () => void = () => {
    mockedSnackBar = jasmine.createSpyObj(MatSnackBar, ['open']);

    TestBed.configureTestingModule({
      providers: [
        NotificationsFacade,
        {provide: MatSnackBar, useValue: mockedSnackBar}
      ],
    });

    service = TestBed.inject(NotificationsFacade);
  };

  describe('displaySuccessMessage', () => {
    beforeEach(async(() => {
      configureTestingModule();
    }));

    describe('with default values', () => {
      it('should open the snackBar with the default success labels', () => {
        service.displaySuccessMessage();

        expect(mockedSnackBar.open).toHaveBeenCalledTimes(1);
        expect(mockedSnackBar.open).toHaveBeenCalledWith(
          NotificationsSuccessLabels.message,
          NotificationsSuccessLabels.action,
          NotificationsConfig
        );
      });
    });

    describe('with custom values', () => {
      it('should open the snackBar with the provided labels and config', () => {
        service.displaySuccessMessage(MOCKED_NOTIFICATION_LABELS, MOCKED_SNACKBAR_CONFIG);

        expect(mockedSnackBar.open).toHaveBeenCalledTimes(1);
        expect(mockedSnackBar.open).toHaveBeenCalledWith(MOCKED_NOTIFICATION_LABELS, MOCKED_SNACKBAR_CONFIG);
      });
    });
  });

  describe('displayErrorMessage', () => {
    beforeEach(async(() => {
      configureTestingModule();
    }));

    describe('with default values', () => {
      it('should open the snackBar with the default error labels', () => {
        service.displayErrorMessage();

        expect(mockedSnackBar.open).toHaveBeenCalledTimes(1);
        expect(mockedSnackBar.open).toHaveBeenCalledWith(
          NotificationsErrorLabels.message,
          NotificationsErrorLabels.action,
          NotificationsConfig
        );
      });
    });

    describe('with custom values', () => {
      it('should open the snackBar with the provided labels and config', () => {
        service.displayErrorMessage(MOCKED_NOTIFICATION_LABELS, MOCKED_SNACKBAR_CONFIG);

        expect(mockedSnackBar.open).toHaveBeenCalledTimes(1);
        expect(mockedSnackBar.open).toHaveBeenCalledWith(MOCKED_NOTIFICATION_LABELS, MOCKED_SNACKBAR_CONFIG);
      });
    });
  });
});
