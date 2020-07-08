import {Component} from '@angular/core';
import {UserFacadeService} from '../../services/user-facade.service';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../../../../shared/components';
import {User, UserApiInterface} from '../../../../shared/models/user.model';
import {UserDialogComponent} from '../../containers';

@Component({
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})

export class UsersPageComponent {

  allUsers$: Observable<User[]>;
  isLoading = false;

  constructor(private readonly usersFacade: UserFacadeService, public dialog: MatDialog) {
    this.allUsers$ = this.usersFacade.getAll();
    this.usersFacade.loadAllUsers();
  }

  onDeleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res.confirmed) {
        this.isLoading = true;
        this.usersFacade.deleteUser(user.id)
          .subscribe(() => {
            this.isLoading = false;
          });
      }
    });
  }

  onCreateUser(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res.confirmed) {
        this.isLoading = true;
        this.usersFacade.createUser(res.data.firstName, res.data.lastName, res.data.email, res.data.password, res.data.role)
          .subscribe(() => {
            this.isLoading = false;
          });
      }
    });
  }

  onEditUserInfo(user: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '600px',
      data: user,
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res.confirmed) {
        const data: Partial<UserApiInterface> = {
          first_name: res.data.firstName,
          last_name: res.data.lastName,
          email: res.data.email,
          password: res.data.password,
          role: res.data.role,
        };

        this.isLoading = true;
        this.usersFacade.updateUser(user.id, data)
          .subscribe(() => {
            this.isLoading = false;
          });
      }
    });
  }
}
