import {UserFacadeService} from './user-facade.service';
import {UserApiService} from './user-api.service';
import {async, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NotificationsFacade} from '../../../core/services';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {UserStateInterface} from '../store/users.reducer';
import {MOCKED_API_USER, MOCKED_USER} from '../../../core/mocks/users.mocks';
import {User} from '../../../core/models/user.model';
import {actionStoreUsers} from '../store/users.actions';
import {of, throwError} from 'rxjs';
import {catchError, take} from 'rxjs/operators';
import {MemoizedSelector} from '@ngrx/store';
import {selectAllUsers} from '../store/users.selector';

describe('UsersFacadeService', () => {
  const mockedUsersArray: User[] = [new User(MOCKED_API_USER)];

  const mockedInitialUsersState: UserStateInterface = {
    users: mockedUsersArray,
  };

  let service: UserFacadeService;
  let store: MockStore;
  let mockedUserApiService: jasmine.SpyObj<UserApiService>;
  let mockedNotificationsFacade: jasmine.SpyObj<NotificationsFacade>;
  let mockedAllUsersSelector: MemoizedSelector<UserStateInterface, User[]>;

  const configureTestingModule: () => void = () => {
    mockedUserApiService = jasmine.createSpyObj(UserApiService, ['getAll', 'editUser', 'deleteUser']);
    mockedUserApiService.getAll.and.returnValue(of(mockedUsersArray));
    mockedUserApiService.deleteUser.and.returnValue(of(null));
    mockedUserApiService.editUser.and.returnValue(of(null));
    mockedNotificationsFacade = jasmine.createSpyObj(NotificationsFacade, ['displayErrorMessage']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        UserFacadeService,
        provideMockStore({initialState: mockedInitialUsersState}),
        {provide: UserApiService, useValue: mockedUserApiService},
        {provide: NotificationsFacade, useValue: mockedNotificationsFacade},
      ],
    });

    service = TestBed.inject(UserFacadeService);
    store = TestBed.inject(MockStore);
    mockedAllUsersSelector = store.overrideSelector(
      selectAllUsers,
      mockedUsersArray,
    );
  };

  describe('getAll', () => {
    beforeEach(async(() => {
      configureTestingModule();
    }));

    it('should return an observable with an array of users', () => {
      service.getAll().subscribe((users: User[]) => {
        expect(users).toEqual(mockedUsersArray);
      });
    });
  });

  describe('loadAllUsers', () => {
    beforeEach(async(() => {
      configureTestingModule();
    }));

    it('should call the correct api layer function for fetching all users', () => {
      service.loadAllUsers();

      expect(mockedUserApiService.getAll).toHaveBeenCalledTimes(1);
    });

    it('should dispatch an action to store the users in state on success', () => {
      spyOn(store, 'dispatch').and.callThrough();
      service.loadAllUsers();

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(actionStoreUsers({payload: {users: mockedUsersArray}}));
    });
  });

  describe('deleteUser', () => {
    beforeEach(async(() => {
      configureTestingModule();
    }));

    const mockedUserId = '123';

    it('should call the correct api layer function to delete a user', () => {
      service.deleteUser(mockedUserId).pipe(take(1)).subscribe();

      expect(mockedUserApiService.deleteUser).toHaveBeenCalledTimes(1);
      expect(mockedUserApiService.deleteUser).toHaveBeenCalledWith(mockedUserId);
    });

    describe('when an error occurs', () => {
      it('should call the notifications service error method', () => {
        mockedUserApiService.deleteUser.and.returnValue(throwError(''));
        service.deleteUser(mockedUserId).pipe(take(1), catchError(err => err)).subscribe();

        expect(mockedNotificationsFacade.displayErrorMessage).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('updateUser', () => {
    beforeEach(async(() => {
      configureTestingModule();
    }));

    const fieldsToUpdate = {firstName: MOCKED_USER.firstName, lastName: MOCKED_USER.lastName};

    it('should call the correct api layer function to update a user', () => {
      service.updateUser(MOCKED_USER.id, fieldsToUpdate).pipe(take(1)).subscribe();

      expect(mockedUserApiService.editUser).toHaveBeenCalledTimes(1);
      expect(mockedUserApiService.editUser).toHaveBeenCalledWith(MOCKED_USER.id, fieldsToUpdate);
    });

    describe('when an error occurs', () => {
      it('should call the notifications service error method', () => {
        mockedUserApiService.editUser.and.returnValue(throwError(''));
        service.updateUser(MOCKED_USER.id, fieldsToUpdate).pipe(take(1), catchError(err => err)).subscribe();

        expect(mockedNotificationsFacade.displayErrorMessage).toHaveBeenCalledTimes(1);
      });
    });
  });
});
