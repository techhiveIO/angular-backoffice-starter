import {Component} from '@angular/core';
import {UserFacadeService} from '../../services/user-facade.service';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../../../../shared/components';
import {User} from '../../../../shared/models/user.model';
import {UserDialogComponent} from '../../containers';
import {MOCKED_USER} from '../../../../shared/mocks/users.mocks';

@Component({
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})

export class UsersPageComponent {

  allUsers$: Observable<User[]>;

  constructor(private readonly usersFacade: UserFacadeService, public dialog: MatDialog) {
    this.allUsers$ = this.usersFacade.getAll();
    this.usersFacade.loadAllUsers();
  }

  onDeleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
    });
  }

  onCreateUser(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '600px',
      data: MOCKED_USER,
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log('wefoew', res);
    });
  }

  onEditUserInfo(user: User): void {
  }

}
