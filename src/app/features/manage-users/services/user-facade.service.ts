import {Injectable} from '@angular/core';
import {UserApiService} from './user-api.service';
import {select, Store} from '@ngrx/store';
import {UserStateInterface} from '../store/users.reducer';
import {Observable, throwError} from 'rxjs';
import {selectAllUsers} from '../store/users.selector';
import {catchError, take, tap} from 'rxjs/operators';
import {NotificationsFacade} from '../../../core/services';
import {actionStoreUsers} from '../store/users.actions';
import {User, UserApiInterface} from '../../../shared/models/user.model';

@Injectable()
export class UserFacadeService {

  constructor(
    private readonly userApi: UserApiService,
    private readonly store: Store<UserStateInterface>,
    private readonly notificationsFacade: NotificationsFacade
  ) {
  }

  public getAll(): Observable<User[]> {
    return this.store.pipe(select(selectAllUsers));
  }

  public loadAllUsers(): void {
    this.userApi.getAll()
      .pipe(take(1), tap((users: User[]) => this.store.dispatch(actionStoreUsers({payload: {users}}))))
      .subscribe();
  }

  public createUser(firstName, lastName, email, password, role): Observable<any> {
    return this.userApi
      .addUser({first_name: firstName, last_name: lastName, email, password, role})
      .pipe(
        tap(() => this.loadAllUsers()),
        catchError(
          err => {
            this.notificationsFacade.displayErrorMessage();
            return throwError(err);
          },
        ),
      );
  }

  public updateUser(userID: string, userFields: Partial<Omit<UserApiInterface, 'id'>>): Observable<any> {
    return this.userApi
      .editUser(userID, userFields)
      .pipe(
        tap(() => this.loadAllUsers()),
        catchError(
          err => {
            this.notificationsFacade.displayErrorMessage();
            return throwError(err);
          },
        ),
      );
  }

  public deleteUser(userID: string): Observable<any> {
    return this.userApi
      .deleteUser(userID)
      .pipe(
        tap(() => this.loadAllUsers()),
        catchError(
          err => {
            this.notificationsFacade.displayErrorMessage();
            return throwError(err);
          },
        )
      );
  }
}
