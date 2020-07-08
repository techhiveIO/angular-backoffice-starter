import {LocalStorageFacade, TOKEN_KEY} from './local-storage.service';
import {async, TestBed} from '@angular/core/testing';

describe('localStorageService', () => {
  let service: LocalStorageFacade;

  const configureTestingModule: () => void = () => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageFacade,
      ],
    });

    service = TestBed.inject(LocalStorageFacade);
  };

  describe('setAuthToken', () => {
    beforeEach(async(() => {
      configureTestingModule();
      service.clearAuthData();
    }));

    it('should save the token to localstorage', () => {
      spyOn(localStorage, 'setItem').and.callThrough();
      const mockedToken = 'exampleToken';
      service.setAuthToken(mockedToken);

      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith(TOKEN_KEY, mockedToken);
      expect(localStorage.getItem(TOKEN_KEY)).toEqual(mockedToken);
    });
  });

  describe('getAuthToken', () => {
    beforeEach(async(() => {
      configureTestingModule();
      service.clearAuthData();
    }));

    it('should return null for non-existing token', () => {
      spyOn(localStorage, 'getItem').and.callThrough();
      service.getAuthToken();

      expect(localStorage.getItem).toHaveBeenCalledTimes(1);
      expect(service.getAuthToken()).toBeNull();
    });

    it('should retrieve the token', () => {
      spyOn(localStorage, 'getItem').and.callThrough();
      const mockedToken = 'exampleToken';
      localStorage.setItem(TOKEN_KEY, mockedToken);

      const token = service.getAuthToken();
      expect(token).toEqual(mockedToken);
      expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    });
  });

  describe('clearAuthData', () => {
    beforeEach(async(() => {
      configureTestingModule();
      service.setAuthToken('token');
    }));

    it('should clear the auth token', () => {
      service.clearAuthData();

      expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
    });
  });
});
