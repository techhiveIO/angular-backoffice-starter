import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfirmationWindowInterface, DefaultConfirmationWindowMessage} from '../../models/confirmation-dialog.model';

@Component({
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})

export class ConfirmationDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationWindowInterface,
  ) {
  }

  ngOnInit(): void {
    this.data = this.data ? this.data : DefaultConfirmationWindowMessage;
  }

  onConfirm() {
    this.dialogRef.close({confirmed: true});
  }
}
