import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {AuthStateApiInterface, AuthStateInterface} from '../../../shared/models/authState.model';
import {User} from '../../../shared/models/user.model';

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
