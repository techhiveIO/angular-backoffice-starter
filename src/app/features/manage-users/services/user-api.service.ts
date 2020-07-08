import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User, UserApiInterface} from '../../../shared/models/user.model';

@Injectable()
export class UserApiService {
  private readonly API_USERS = `${environment.API}/users`;

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<User[]> {
    return this.http
      .get(this.API_USERS)
      .pipe(
        map((users: UserApiInterface[]) => {
          return users.map((user: UserApiInterface) => new User(user));
        }),
      );
  }

  public getOne(userID: string): Observable<User> {
    const params = {id: userID};

    return this.http
      .get(this.API_USERS, {params})
      .pipe(
        map((res: any) => res.data),
        map(data => data.user),
        map((user: UserApiInterface) => new User(user)),
      );
  }

  public addUser(fields: Partial<UserApiInterface>): Observable<any> {
    return this.http.post(this.API_USERS, fields);
  }

  public editUser(userID: string, fields: Partial<UserApiInterface>): Observable<any> {
    return this.http.patch(this.API_USERS, {id: userID, ...fields});
  }

  public deleteUser(userID: string): Observable<any> {
    return this.http.delete(`${this.API_USERS}/${userID}`);
  }
}
