import {Component} from '@angular/core';
import {UserFacadeService} from '../../services/user-facade.service';
import {Observable, of} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../../../../shared/components';
import {User} from '../../../../shared/models/user.model';
import {MOCKED_API_USER} from '../../../../shared/mocks/users.mocks';

@Component({
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})

export class UsersPageComponent {

  allUsers$: Observable<User[]>;

  constructor(private readonly usersFacade: UserFacadeService, public dialog: MatDialog) {
    this.allUsers$ = this.usersFacade.getAll();
    this.allUsers$ = of([new User(MOCKED_API_USER)]);
    this.usersFacade.loadAllUsers();
  }

  onDeleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
    });
  }

  onEditUserInfo(user: User): void {
  }

}
