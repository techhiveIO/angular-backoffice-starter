import {UserApiService} from './user-api.service';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {async, TestBed} from '@angular/core/testing';
import {take} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {UserApiInterface} from '../../../core/models/user.model';
import {MOCKED_API_USER} from '../../../core/mocks/users.mocks';

describe('UsersApiService', () => {
  let service: UserApiService;
  let httpMock: HttpTestingController;

  const configureTestingModule: () => void = () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        UserApiService,
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserApiService);
  };

  afterEach(() => {
    httpMock.verify();
  });

  beforeEach(async(() => {
    configureTestingModule();
  }));

  describe('getAll', () => {
    it('should make a get requests to the correct end point', () => {
      service.getAll()
        .pipe(take(1))
        .subscribe();

      const getUsersRequest: TestRequest = httpMock.expectOne({
        method: 'GET',
        url: `${environment.API}/users`,
      });

      getUsersRequest.flush({data: {users: []}});
    });
  });

  describe('getOne', () => {
    it('should make a get request to the correct end point', () => {
      const mockedUserId = '123';

      service.getOne(mockedUserId)
        .pipe(take(1))
        .subscribe();

      const getUsersRequest: TestRequest = httpMock.expectOne({
        method: 'GET',
        url: `${environment.API}/users?id=${mockedUserId}`,
      });

      expect(getUsersRequest.request.params.get('id')).toEqual(mockedUserId);

      getUsersRequest.flush({data: {user: MOCKED_API_USER}});
    });
  });

  describe('deleteUser', () => {
    it('should make a delete request to the correct end point', () => {
      const mockedUserId = '123';

      service.deleteUser(mockedUserId)
        .pipe(take(1))
        .subscribe();

      const getUsersRequest: TestRequest = httpMock.expectOne({
        method: 'DELETE',
        url: `${environment.API}/users?id=${mockedUserId}`,
      });

      expect(getUsersRequest.request.params.get('id')).toEqual(mockedUserId);

      getUsersRequest.flush({data: {users: []}});
    });
  });

  describe('addUser', () => {
    it('should make a delete request to the correct end point', () => {
      const mockedUserData: Partial<UserApiInterface> = {
        firstName: 'Ali',
        lastName: 'Obaji',
      };

      service.addUser(mockedUserData)
        .pipe(take(1))
        .subscribe();

      const getUsersRequest: TestRequest = httpMock.expectOne({
        method: 'POST',
        url: `${environment.API}/users`,
      });

      expect(getUsersRequest.request.body).toEqual(mockedUserData);

      getUsersRequest.flush({data: {users: []}});
    });
  });

  describe('editUser', () => {
    it('should make a patch request to the correct end point', () => {
      const mockedUserId = '123';
      const mockedUserData: Partial<UserApiInterface> = {
        firstName: 'Ali',
        lastName: 'Obaji',
      };

      service.editUser(mockedUserId, mockedUserData)
        .pipe(take(1))
        .subscribe();

      const patchUserRequest: TestRequest = httpMock.expectOne({
        method: 'PATCH',
        url: `${environment.API}/users`,
      });

      expect(patchUserRequest.request.body).toEqual({id: mockedUserId, ...mockedUserData});

      patchUserRequest.flush({data: {users: []}});
    });
  });
});
