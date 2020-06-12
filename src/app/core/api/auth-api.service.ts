import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthStateApiInterface, AuthStateInterface} from '../models/authState.model';
import {map} from 'rxjs/operators';
import {User} from '../models/user.model';

@Injectable()
export class AuthApi {
  private readonly API_LOGIN = `${environment.API}/login`;

  constructor(private http: HttpClient) {
  }

  public login(email: string, password: string): Observable<AuthStateInterface> {
    const body = {
      email,
      password,
    };

    return this.http.post(this.API_LOGIN, body)
      .pipe(
        map((res: any) => res.data),
        map((authState: AuthStateApiInterface) => ({
          token: authState.token,
          user: new User(authState.user),
        })),
      );
  }
}
