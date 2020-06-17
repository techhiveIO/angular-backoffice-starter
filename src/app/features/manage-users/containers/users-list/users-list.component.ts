import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {User} from '../../../../core/models/user.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UsersListComponent implements OnInit, OnDestroy {
  @Input() users: Observable<User[]>;
  @Input() isLoading = false;
  @Output() deleteUser: EventEmitter<User> = new EventEmitter<User>();
  @Output() editUser: EventEmitter<User> = new EventEmitter<User>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  displayedColumns = [
    'firstName',
    'lastName',
    'email',
    'phoneNumber',
    'role',
    'actions',
  ];

  private usersSubscription: Subscription;

  ngOnInit(): void {
    this.usersSubscription = this.users.subscribe((users: User[]) => {
      this.dataSource = new MatTableDataSource<User>(users);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }

  onDeleteUser(user: User): void {
    this.deleteUser.emit(user);
  }

  onEditUserInfo(user: User): void {
    this.editUser.emit(user);
  }
}
