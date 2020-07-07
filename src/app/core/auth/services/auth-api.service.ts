import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {AuthStateApiInterface, AuthStateInterface, ConfirmationTokenInterface} from '../../../shared/models/authState.model';
import {User, UserApiInterface} from '../../../shared/models/user.model';
import {MOCKED_CONFIRMATION_EMAIL_TOKEN} from '../../../shared/mocks/auth.mocks';
import {HttpResponseInterface} from '../../../shared/models/api.models';

@Injectable()
export class AuthApi {
  private readonly API_LOGIN = `${environment.API}/auth/login`;
  private readonly API_REGISTER = `${environment.API}/auth/register`;
  private readonly API_FETCH_TOKEN_INFO = `${environment.API}/auth/token`;
  private readonly API_REQUEST_NEW_PASSWORD = `${environment.API}/auth/forgot-password`;
  private readonly API_VERIFY_REGISTRATION = `${environment.API}/auth/verify`;

  constructor(private http: HttpClient) {
  }

  public login(email: string, password: string): Observable<Pick<AuthStateInterface, 'user' | 'token'>> {
    const body = {
      email,
      password,
    };

    return this.http.post(this.API_LOGIN, body)
      .pipe(
        switchMap((res: HttpResponseInterface) => res.success ? of(res.data) : throwError(res.message)),
        map((authState: AuthStateApiInterface) => ({
          token: authState.access_token,
          user: new User(authState.user),
        })),
      );
  }

  public register(firstName: string, lastName: string, email: string, password: string): Observable<User> {
    const body = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    };

    return this.http.post(this.API_REGISTER, body)
      .pipe(
        switchMap((res: HttpResponseInterface) => res.success ? of(res.data) : throwError(res.message)),
        map((user: UserApiInterface) => new User(user)),
      );
  }

  // TODO: should implement proper error message when the server does so.
  public confirmRegistration(token: string): Observable<any> {
    return this.http.get(`${this.API_VERIFY_REGISTRATION}?token=${token}`)
      .pipe(
        switchMap(res => res ? of(res) : throwError('Error')),
      );
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
