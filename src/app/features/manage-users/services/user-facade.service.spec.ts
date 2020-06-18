import {UserFacadeService} from './user-facade.service';
import {UserApiService} from './user-api.service';
import {async, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NotificationsFacade} from '../../../core/services';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {UserStateInterface} from '../store/users.reducer';
import {MOCKED_API_USER} from '../../../core/mocks/users.mocks';
import {User} from '../../../core/models/user.model';

describe('UsersFacadeService', () => {
  const mockedInitialUsersState: UserStateInterface = {
    users: [new User(MOCKED_API_USER)],
  };

  let service: UserFacadeService;
  let store: MockStore;
  let mockedUserApiService: jasmine.SpyObj<UserApiService>;
  let mockedNotificationsFacade: jasmine.SpyObj<NotificationsFacade>;

  const configureTestingModule: () => void = () => {
    mockedUserApiService = jasmine.createSpyObj(UserApiService, ['getAll', 'editUser', 'deleteUser']);
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
  };

  describe('getAll', () => {
    beforeEach(async(() => {
      configureTestingModule();
    }));

    it('should return an observable with the selector to fetch all stored users', () => {

    });
  });
});
