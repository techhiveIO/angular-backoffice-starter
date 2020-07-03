import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {AuthStateApiInterface, ConfirmationTokenInterface} from '../../../shared/models/authState.model';
import {User} from '../../../shared/models/user.model';
import {MOCKED_CONFIRMATION_EMAIL_TOKEN} from '../../../shared/mocks/auth.mocks';

@Injectable()
export class AuthApi {
  private readonly API_LOGIN = `${environment.API}/auth/login`;
  private readonly API_REGISTER = `${environment.API}/auth/register`;
  private readonly API_FETCH_TOKEN_INFO = `${environment.API}/auth/token`;
  private readonly API_REQUEST_NEW_PASSWORD = `${environment.API}/auth/forgot-password`;

  constructor(private http: HttpClient) {
  }

  public login(email: string, password: string): Observable<any> {
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

  public register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const body = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    };

    return this.http.post(this.API_REGISTER, body);
  }

  public fetchVerificationTokenInfo(token: string): Observable<ConfirmationTokenInterface> {
    return of(MOCKED_CONFIRMATION_EMAIL_TOKEN);
    return this.http.get(`${this.API_FETCH_TOKEN_INFO}/${token}`)
      .pipe(
        map((res: any) => res.data),
      );
  }

  public requestNewPassword(email: string): Observable<any> {
    return this.http.get(`${this.API_REQUEST_NEW_PASSWORD}/${email}`);
  }
}
