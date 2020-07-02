import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss', '../../auth.theme.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RegistrationFormComponent implements OnInit {
  @Input() isLoading = false;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  formGroup: FormGroup;
  passwordHidden = true;

  constructor(
    private readonly formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  toggleHidePassword(): void {
    this.passwordHidden = !this.passwordHidden;
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const data = this.formGroup.getRawValue();
      this.submit.emit(data);
    }
  }
}
