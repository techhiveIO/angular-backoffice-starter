import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User, UserRole} from '../../../../shared/models/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordGeneratorService} from '../../../../core/services/password-generator.service';
import {Clipboard} from '@angular/cdk/clipboard';
import {NotificationsFacade} from '../../../../core/services';
import {NotificationLabelsInterface} from '../../../../shared/models/notifications.model';

@Component({
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})

export class UserDialogComponent implements OnInit {

  formGroup: FormGroup;
  availableRoles = [UserRole.Admin, UserRole.Employee];

  constructor(
    private readonly clipboard: Clipboard,
    private readonly notificationsFacade: NotificationsFacade,
    private readonly formBuilder: FormBuilder,
    private readonly passwordGeneratorService: PasswordGeneratorService,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: [],
      role: ['', Validators.required],
    });

    this.formGroup.patchValue({
      firstName: this.data?.firstName,
      lastName: this.data?.lastName,
      email: this.data?.email,
      phoneNumber: this.data?.phoneNumber,
      role: this.data?.role,
    });
  }

  onConfirm() {
    this.dialogRef.close({
      confirmed: true,
      data: this.formGroup.getRawValue(),
    });
  }

  getPassword() {
    const newPass = this.passwordGeneratorService.generatePassword();
    this.formGroup.patchValue({
      password: newPass,
    });

    this.clipboard.copy(newPass);

    const notification: NotificationLabelsInterface = {
      message: 'Password Copied to Clipboard.',
      action: 'Thank you',
    };
    this.notificationsFacade.displaySuccessMessage(
      notification
    );
  }
}
