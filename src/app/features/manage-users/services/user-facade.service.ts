import {Injectable} from '@angular/core';
import {UserApiService} from './user-api.service';
import {select, Store} from '@ngrx/store';
import {UserStateInterface} from '../store/users.reducer';
import {Observable, throwError} from 'rxjs';
import {User, UserRole} from '../../../core/models/user.model';
import {selectAllUsers} from '../store/users.selector';
import {catchError, take, tap} from 'rxjs/operators';
import {NotificationsFacade} from '../../../core/services';
import {actionStoreUsers} from '../store/users.actions';

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

  public updateUser(userID: string, userFields: Partial<Omit<User, 'id'>>): Observable<any> {

    return this.userApi
      .editUser(userID, userFields)
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
