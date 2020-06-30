import {Injectable} from '@angular/core';

export const localStorageKey = '__app_storage__';
export const TOKEN_KEY = 'token';

@Injectable()
export class LocalStorageFacade {
  public static setSavedState(state: any, key: string = localStorageKey) {
    localStorage.setItem(key, JSON.stringify(state));
  }

  public static returnSavedState(key: string = localStorageKey) {
    return JSON.parse(localStorage.getItem(key));
  }

  public setAuthToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getAuthToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public clearAuthData(): void {
    localStorage.clear();
  }
}
