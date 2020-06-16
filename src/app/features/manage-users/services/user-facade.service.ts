import {Injectable} from '@angular/core';
import {UserApiService} from './user-api.service';
import {select, Store} from '@ngrx/store';
import {UserStateInterface} from '../store/users.reducer';
import {Observable, throwError} from 'rxjs';
import {User, UserRole} from '../../../core/models/user.model';
import {selectAllUsers} from '../store/users.selector';
import {catchError, take, tap} from 'rxjs/operators';
import {NotificationsFacade} from '../../../core/services';

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
      .pipe(take(1))
      .subscribe();
  }

  public updateUser(userID: string, firstName: string, lastName: string, email: string, role: UserRole): Observable<any> {
    const fields = {firstName, lastName, email, role};

    return this.userApi
      .editUser(userID, fields)
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
