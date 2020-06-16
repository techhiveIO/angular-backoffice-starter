import {Injectable} from '@angular/core';

export const TOKEN_KEY = 'token';

@Injectable()
export class LocalStorageFacade {
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
